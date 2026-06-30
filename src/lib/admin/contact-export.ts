import type { ContactDashboardSubmission } from "./contact-dashboard";

function escapeCsvValue(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export function contactSubmissionsToCsv(submissions: ContactDashboardSubmission[]) {
  const headers = [
    "submissionId",
    "submittedAtUtc",
    "submittedAtLocal",
    "lifecycleStatus",
    "emailDeliveryStatus",
    "folder",
    "name",
    "email",
    "company",
    "phone",
    "service",
    "budget",
    "timeline",
    "preferredContact",
    "message",
    "error",
    "fileName",
  ];

  const rows = submissions.map((submission) => [
    submission.submissionId,
    submission.submittedAtUtc,
    submission.submittedAtLocal,
    submission.lifecycleStatus,
    submission.emailDeliveryStatus,
    submission.folder,
    submission.requester.name,
    submission.requester.email,
    submission.requester.company,
    submission.requester.phone,
    submission.inquiry.service,
    submission.inquiry.budget ?? null,
    submission.inquiry.timeline ?? null,
    submission.inquiry.preferredContact ?? null,
    submission.inquiry.message,
    submission.processing.error,
    submission.fileName,
  ]);

  return [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) => row.map(escapeCsvValue).join(",")),
  ].join("\n");
}
