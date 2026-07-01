"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/permissions";
import { leadRepository } from "@/lib/repositories/lead.repository";
import { questionnaireResponseRepository } from "@/lib/repositories/questionnaire-response.repository";
import { noteRepository } from "@/lib/repositories/note.repository";
import { activityRepository } from "@/lib/repositories/activity.repository";
import { projectRepository } from "@/lib/repositories/project.repository";
import { generateAccessToken } from "@/lib/leads/token";
import { sendQuestionnaireInviteEmail } from "@/lib/leads/mailer";
import type {
  LeadStatus,
  LeadPriority,
  LeadSource,
  LeadProposalStatus,
  PreferredContactMethod,
  PreferredContactTime,
} from "@/types/lead";
import { LEAD_STATUSES } from "@/types/lead";

function field(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

function revalidateLead(leadId: string) {
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin");
}

// ─── Create ────────────────────────────────────────────────────────────────

export async function createLeadAction(formData: FormData): Promise<void> {
  const session = await requireAdmin();

  const fullName = field(formData, "fullName");
  const email = field(formData, "email");
  if (fullName.length < 2 || !email.includes("@")) {
    throw new Error("Full name and a valid email are required.");
  }

  const servicesInterested = field(formData, "servicesInterested")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const lead = await leadRepository.create(
    {
      fullName,
      email,
      phone: field(formData, "phone") || undefined,
      companyName: field(formData, "companyName") || undefined,
      website: field(formData, "website") || undefined,
      status: "new",
      source: (field(formData, "source") as LeadSource) || "manual",
      priority: (field(formData, "priority") as LeadPriority) || "normal",
      tags: [],
      servicesInterested,
      projectDescription: field(formData, "projectDescription") || undefined,
      proposalIds: [],
      proposalStatus: "none",
      projectStatus: "none",
    },
    session.username,
  );

  await activityRepository.log(
    "created",
    session.username ?? "admin",
    "lead",
    `Lead manually created by ${session.username}.`,
    { entityId: lead.id, entityTitle: lead.fullName },
  );

  revalidateLead(lead.id);
  redirect(`/admin/leads/${lead.id}`);
}

// ─── Status / priority / details ──────────────────────────────────────────

export async function updateLeadStatusAction(leadId: string, formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const status = field(formData, "status") as LeadStatus;
  if (!LEAD_STATUSES.includes(status)) throw new Error("Invalid status.");

  const existing = await leadRepository.findById(leadId);
  if (!existing) throw new Error("Lead not found.");

  await leadRepository.update(leadId, { status }, session.username);
  await activityRepository.log(
    "status-changed",
    session.username ?? "admin",
    "lead",
    `Status changed from "${existing.status}" to "${status}".`,
    { entityId: leadId, metadata: { from: existing.status, to: status } },
  );

  revalidateLead(leadId);
}

export async function updateLeadDetailsAction(leadId: string, formData: FormData): Promise<void> {
  const session = await requireAdmin();

  const priority = field(formData, "priority") as LeadPriority;
  const followUpDate = field(formData, "followUpDate");
  const tags = field(formData, "tags")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const proposalStatus = field(formData, "proposalStatus") as LeadProposalStatus;
  const preferredContactMethod = field(formData, "preferredContactMethod") as PreferredContactMethod;
  const preferredContactTime = field(formData, "preferredContactTime") as PreferredContactTime;

  await leadRepository.update(
    leadId,
    {
      priority: priority || undefined,
      followUpDate: followUpDate || undefined,
      tags,
      proposalStatus: proposalStatus || undefined,
      preferredContactMethod: preferredContactMethod || undefined,
      preferredContactTime: preferredContactTime || undefined,
      companyName: field(formData, "companyName") || undefined,
      website: field(formData, "website") || undefined,
      phone: field(formData, "phone") || undefined,
    },
    session.username,
  );

  revalidateLead(leadId);
}

export async function archiveLeadAction(leadId: string): Promise<void> {
  const session = await requireAdmin();
  await leadRepository.archive(leadId, session.username);
  await activityRepository.log("archived", session.username ?? "admin", "lead", "Lead archived.", {
    entityId: leadId,
  });
  revalidateLead(leadId);
}

export async function restoreLeadAction(leadId: string): Promise<void> {
  const session = await requireAdmin();
  await leadRepository.restore(leadId, session.username);
  await activityRepository.log("restored", session.username ?? "admin", "lead", "Lead restored.", {
    entityId: leadId,
  });
  revalidateLead(leadId);
}

export async function deleteLeadAction(leadId: string): Promise<void> {
  const session = await requireAdmin();
  const existing = await leadRepository.findById(leadId);
  if (!existing) throw new Error("Lead not found.");

  await leadRepository.delete(leadId, session.username);
  await activityRepository.log("deleted", session.username ?? "admin", "lead", "Lead deleted.", {
    entityId: leadId,
    entityTitle: existing.fullName,
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  redirect("/admin/leads");
}

// ─── Notes ─────────────────────────────────────────────────────────────────

export async function addLeadNoteAction(leadId: string, formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const body = field(formData, "body");
  if (body.length < 1) throw new Error("Note cannot be empty.");

  await noteRepository.create(
    {
      entityType: "lead",
      entityId: leadId,
      body,
      author: session.username ?? "admin",
    },
    session.username,
  );

  await activityRepository.log("note-added", session.username ?? "admin", "lead", "Internal note added.", {
    entityId: leadId,
  });

  revalidateLead(leadId);
}

// ─── Questionnaire ─────────────────────────────────────────────────────────

export async function sendQuestionnaireInviteAction(leadId: string): Promise<void> {
  const session = await requireAdmin();
  const lead = await leadRepository.findById(leadId);
  if (!lead) throw new Error("Lead not found.");

  let response = await questionnaireResponseRepository.findByLead(leadId);

  if (!response) {
    response = await questionnaireResponseRepository.create(
      {
        leadId,
        accessToken: generateAccessToken(),
        status: "sent",
        answers: {},
        sentAt: new Date().toISOString(),
      },
      session.username,
    );
    await leadRepository.update(leadId, { questionnaireResponseId: response.id }, session.username);
  } else if (response.status === "not-sent") {
    response = await questionnaireResponseRepository.update(
      response.id,
      { status: "sent", sentAt: new Date().toISOString() },
      session.username,
    ) ?? response;
  }

  try {
    await sendQuestionnaireInviteEmail(lead, response.accessToken);
  } catch (error) {
    console.error("[leads] questionnaire invite email failed:", error);
  }

  await activityRepository.log(
    "questionnaire-sent",
    session.username ?? "admin",
    "lead",
    "Discovery questionnaire invite sent.",
    { entityId: leadId },
  );

  if (lead.status === "new" || lead.status === "consultation-scheduled") {
    await leadRepository.update(leadId, { status: "discovery-in-progress" }, session.username);
  }

  revalidateLead(leadId);
}

// ─── Conversion / merge ──────────────────────────────────────────────────

export async function convertLeadToProjectAction(leadId: string): Promise<void> {
  const session = await requireAdmin();
  const lead = await leadRepository.findById(leadId);
  if (!lead) throw new Error("Lead not found.");
  if (lead.projectId) throw new Error("This lead is already linked to a project.");

  const project = await projectRepository.create(
    {
      title: lead.companyName ? `${lead.companyName} — Website Project` : `${lead.fullName} — Website Project`,
      description: lead.projectDescription,
      status: "approved",
      health: "on-track",
      servicesPerformed: lead.servicesInterested,
      tags: lead.tags,
    },
    session.username,
  );

  await leadRepository.update(
    leadId,
    { projectId: project.id, projectStatus: "not-started", status: "won" },
    session.username,
  );

  await activityRepository.log(
    "converted-to-project",
    session.username ?? "admin",
    "lead",
    `Converted to project "${project.title}".`,
    { entityId: leadId, metadata: { projectId: project.id } },
  );

  revalidateLead(leadId);
  revalidatePath("/admin/projects");
}

export async function mergeLeadsAction(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const keepId = field(formData, "keepId");
  const mergeId = field(formData, "mergeId");
  if (!keepId || !mergeId || keepId === mergeId) {
    throw new Error("Two distinct leads are required to merge.");
  }

  const [keep, merge] = await Promise.all([
    leadRepository.findById(keepId),
    leadRepository.findById(mergeId),
  ]);
  if (!keep || !merge) throw new Error("One or both leads were not found.");

  // Foundation-level merge: carry forward tags and a combined description,
  // move the duplicate's notes onto the surviving lead, then archive it.
  const mergedTags = Array.from(new Set([...(keep.tags ?? []), ...(merge.tags ?? [])]));
  await leadRepository.update(
    keepId,
    {
      tags: mergedTags,
      projectDescription: [keep.projectDescription, merge.projectDescription].filter(Boolean).join("\n\n---\n\n") || undefined,
    },
    session.username,
  );

  const duplicateNotes = await noteRepository.findByEntity("lead", mergeId);
  for (const note of duplicateNotes) {
    await noteRepository.create(
      { entityType: "lead", entityId: keepId, body: `[merged] ${note.body}`, author: note.author },
      session.username,
    );
  }

  await leadRepository.update(mergeId, { mergedIntoId: keepId }, session.username);
  await leadRepository.archive(mergeId, session.username);

  await activityRepository.log(
    "leads-merged",
    session.username ?? "admin",
    "lead",
    `Merged lead ${mergeId} into ${keepId}.`,
    { entityId: keepId, metadata: { mergedFrom: mergeId } },
  );

  revalidateLead(keepId);
  revalidateLead(mergeId);
  redirect(`/admin/leads/${keepId}`);
}
