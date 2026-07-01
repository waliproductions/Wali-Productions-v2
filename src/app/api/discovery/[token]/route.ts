import { NextResponse } from "next/server";
import { questionnaireResponseRepository } from "@/lib/repositories/questionnaire-response.repository";
import { leadRepository } from "@/lib/repositories/lead.repository";
import { activityRepository } from "@/lib/repositories/activity.repository";
import { QUESTIONNAIRE_SECTIONS } from "@/config/questionnaire";
import { checkRateLimit, getClientIp } from "@/lib/leads/rate-limit";
import type { QuestionnaireAnswerValue } from "@/types/questionnaire";

const VALID_QUESTION_KEYS = new Set(
  QUESTIONNAIRE_SECTIONS.flatMap((section) =>
    section.questions.map((q) => `${section.id}.${q.id}`),
  ),
);

function errorToMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown discovery pipeline error.";
}

type RouteParams = { params: Promise<{ token: string }> };

export async function GET(request: Request, { params }: RouteParams) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`discovery-read:${ip}`, { limit: 60, windowMs: 10 * 60 * 1000 });
  if (!rate.allowed) {
    return NextResponse.json({ ok: false, errors: ["Too many requests. Please try again shortly."] }, { status: 429 });
  }

  const { token } = await params;
  if (!token || token.length < 16) {
    return NextResponse.json({ ok: false, errors: ["Not found."] }, { status: 404 });
  }

  const response = await questionnaireResponseRepository.findByToken(token);
  if (!response) {
    return NextResponse.json({ ok: false, errors: ["This questionnaire link is invalid or has expired."] }, { status: 404 });
  }

  const lead = await leadRepository.findById(response.leadId);

  if (response.status === "sent") {
    await questionnaireResponseRepository.update(response.id, {
      status: "in-progress",
      startedAt: response.startedAt ?? new Date().toISOString(),
    });
  }

  return NextResponse.json({
    ok: true,
    sections: QUESTIONNAIRE_SECTIONS,
    answers: response.answers,
    status: response.status,
    leadName: lead?.fullName ?? null,
    companyName: lead?.companyName ?? null,
  });
}

export async function POST(request: Request, { params }: RouteParams) {
  const { token } = await params;
  const ip = getClientIp(request);
  const rate = checkRateLimit(`discovery:${ip}`, { limit: 60, windowMs: 10 * 60 * 1000 });
  if (!rate.allowed) {
    return NextResponse.json({ ok: false, errors: ["Too many requests. Please try again shortly."] }, { status: 429 });
  }

  if (!token || token.length < 16) {
    return NextResponse.json({ ok: false, errors: ["Not found."] }, { status: 404 });
  }

  const response = await questionnaireResponseRepository.findByToken(token);
  if (!response) {
    return NextResponse.json({ ok: false, errors: ["This questionnaire link is invalid or has expired."] }, { status: 404 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid JSON payload."] }, { status: 400 });
  }

  const body = payload as { answers?: unknown; submit?: boolean };
  if (!body.answers || typeof body.answers !== "object") {
    return NextResponse.json({ ok: false, errors: ["Missing answers."] }, { status: 400 });
  }

  const rawAnswers = body.answers as Record<string, unknown>;
  const sanitized: Record<string, QuestionnaireAnswerValue> = { ...response.answers };

  for (const [key, value] of Object.entries(rawAnswers)) {
    if (!VALID_QUESTION_KEYS.has(key)) continue;
    if (typeof value === "string") {
      sanitized[key] = value.replace(/\0/g, "").slice(0, 4000);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.filter((v): v is string => typeof v === "string").slice(0, 50);
    } else if (typeof value === "boolean") {
      sanitized[key] = value;
    }
  }

  const submitting = body.submit === true;

  try {
    const updated = await questionnaireResponseRepository.update(response.id, {
      answers: sanitized,
      status: submitting ? "completed" : "in-progress",
      completedAt: submitting ? new Date().toISOString() : response.completedAt,
    });

    if (!updated) {
      return NextResponse.json({ ok: false, errors: ["Questionnaire response not found."] }, { status: 404 });
    }

    // Only the terminal "completed" transition is timeline-worthy — logging
    // every autosave would flood the activity feed with noise.
    if (submitting) {
      await activityRepository.log(
        "questionnaire-completed",
        "system",
        "lead",
        "Discovery questionnaire completed by client.",
        { entityId: response.leadId },
      );
    }

    return NextResponse.json({ ok: true, status: updated.status });
  } catch (error) {
    console.error("[discovery] failed to save answers:", errorToMessage(error));
    return NextResponse.json({ ok: false, errors: ["Could not save your answers. Please try again."] }, { status: 500 });
  }
}
