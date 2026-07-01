import { NextResponse } from "next/server";
import { leadRepository } from "@/lib/repositories/lead.repository";
import { activityRepository } from "@/lib/repositories/activity.repository";
import { dispatchNotification } from "@/lib/repositories/notification.repository";
import { validateConsultationSubmission } from "@/lib/leads/schema";
import { sendLeadNotificationEmail } from "@/lib/leads/mailer";
import { checkRateLimit, getClientIp } from "@/lib/leads/rate-limit";

function errorToMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown consultation pipeline error.";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`consultation:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, errors: ["Too many requests. Please try again later."] },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid JSON payload."] }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in. Bots that
  // autocomplete every field will trip it. Fail soft (pretend success)
  // rather than revealing the anti-spam mechanism.
  if (typeof (payload as Record<string, unknown>)?.website2 === "string" && (payload as Record<string, unknown>).website2) {
    return NextResponse.json({ ok: true, message: "Your inquiry was received." });
  }

  const validation = validateConsultationSubmission(payload);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  const data = validation.data;

  try {
    const lead = await leadRepository.create({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      preferredContactMethod: data.preferredContactMethod,
      preferredContactTime: data.preferredContactTime,
      companyName: data.companyName,
      website: data.website,
      status: "new",
      source: "website-consultation",
      priority: "normal",
      tags: [],
      servicesInterested: data.servicesInterested,
      projectDescription: data.projectDescription,
      proposalIds: [],
      proposalStatus: "none",
      projectStatus: "none",
    });

    await activityRepository.log(
      "consultation-requested",
      "system",
      "lead",
      `Consultation requested by ${lead.fullName}${lead.companyName ? ` (${lead.companyName})` : ""}.`,
      { entityId: lead.id, entityTitle: lead.fullName },
    );

    await dispatchNotification({
      category: "crm",
      priority: "normal",
      title: "New consultation request",
      body: `${lead.fullName}${lead.companyName ? ` — ${lead.companyName}` : ""} submitted a consultation request.`,
      entityType: "lead",
      entityId: lead.id,
      actionLabel: "View lead",
      actionHref: `/admin/leads/${lead.id}`,
    });

    try {
      await sendLeadNotificationEmail(lead);
    } catch (error) {
      // Email delivery is best-effort — the lead is already durably
      // recorded, so a mail failure should not fail the request.
      console.error("[consultation] admin notification email failed:", errorToMessage(error));
    }

    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      message: "Your inquiry was received.",
    });
  } catch (error) {
    console.error("[consultation] failed to record lead:", errorToMessage(error));
    return NextResponse.json(
      { ok: false, errors: ["Your inquiry could not be recorded. Please try again or email us directly."] },
      { status: 500 },
    );
  }
}
