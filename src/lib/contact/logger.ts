import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { ContactSubmissionInput, ContactSubmissionRecord } from "./schema";

const CONTACT_DATA_ROOT = path.join(
  process.cwd(),
  "app-data",
  "contact-submissions"
);

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

export function createContactSubmissionRecord(
  input: ContactSubmissionInput
): ContactSubmissionRecord {
  const now = new Date();
  const submittedAtUtc = now.toISOString();
  const submittedAtLocal = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "long",
  }).format(now);

  return {
    submissionId: crypto.randomUUID(),
    submittedAt: submittedAtUtc,
    submittedAtUtc,
    submittedAtLocal,
    timezone: "America/Chicago",
    lifecycleStatus: "received",
    emailDeliveryStatus: "pending",
    source: "website-contact-form",
    formVersion: "contact-v2",
    requester: {
      name: input.name,
      email: input.email,
      company: input.company ?? null,
      phone: input.phone ?? null,
    },
    inquiry: {
      orgType: input.orgType ?? null,
      service: input.service ?? null,
      budget: input.budget ?? null,
      timeline: input.timeline ?? null,
      preferredContact: input.preferredContact ?? null,
      decisionMaker: input.decisionMaker ?? null,
      message: input.message,
    },
    processing: {
      receivedAt: submittedAtUtc,
      emailAttemptedAt: null,
      emailSentAt: null,
      emailFailedAt: null,
      archivedAt: null,
      error: null,
    },
  };
}

export function saveToQueue(record: ContactSubmissionRecord) {
  const queueDir = path.join(CONTACT_DATA_ROOT, "queue");
  ensureDir(queueDir);

  const fileName = `contact-${record.submittedAtUtc.replace(/[:.]/g, "-")}-${record.submissionId}.json`;
  const filePath = path.join(queueDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(record, null, 2), {
    encoding: "utf8",
    flag: "wx",
  });

  return filePath;
}

export function updateSubmissionFile(
  filePath: string,
  record: ContactSubmissionRecord
) {
  fs.writeFileSync(filePath, JSON.stringify(record, null, 2), {
    encoding: "utf8",
  });
}

export function appendContactEvent(
  event: string,
  record: ContactSubmissionRecord,
  details: Record<string, unknown> = {}
) {
  const logsDir = path.join(CONTACT_DATA_ROOT, "logs");
  ensureDir(logsDir);

  const logFile = path.join(logsDir, "events.jsonl");

  const line = {
    eventId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    submissionId: record.submissionId,
    event,
    actor: "system",
    source: record.source,
    details,
  };

  fs.appendFileSync(logFile, JSON.stringify(line) + "\n", "utf8");
}
