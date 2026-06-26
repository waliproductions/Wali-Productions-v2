import fs from "node:fs/promises";
import path from "node:path";
import type { ContactSubmissionRecord } from "@/lib/contact/schema";

const CONTACT_DATA_ROOT = path.join(
  process.cwd(),
  "app-data",
  "contact-submissions"
);

const SUBMISSION_FOLDERS = [
  "queue",
  "processed",
  "failed",
  "archive",
] as const;

export type ContactDashboardFolder = typeof SUBMISSION_FOLDERS[number];

export type ContactDashboardSubmission = ContactSubmissionRecord & {
  folder: ContactDashboardFolder;
  fileName: string;
  filePath: string;
};

export type ContactAuditEvent = {
  eventId: string;
  timestamp: string;
  submissionId: string;
  event: string;
  actor: string;
  source: string;
  details: Record<string, unknown>;
};

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

async function listJsonFiles(folder: ContactDashboardFolder): Promise<string[]> {
  const folderPath = path.join(CONTACT_DATA_ROOT, folder);

  try {
    const entries = await fs.readdir(folderPath, {
      withFileTypes: true,
    });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => path.join(folderPath, entry.name));
  } catch {
    return [];
  }
}

export async function getContactDashboardSubmissions(): Promise<ContactDashboardSubmission[]> {
  const submissions = await Promise.all(
    SUBMISSION_FOLDERS.map(async (folder) => {
      const files = await listJsonFiles(folder);

      const records = await Promise.all(
        files.map(async (filePath) => {
          const record = await readJsonFile<ContactSubmissionRecord>(filePath);

          if (!record) return null;

          return {
            ...record,
            folder,
            fileName: path.basename(filePath),
            filePath,
          };
        })
      );

      return records.filter((record): record is ContactDashboardSubmission => Boolean(record));
    })
  );

  return submissions
    .flat()
    .sort((a, b) => b.submittedAtUtc.localeCompare(a.submittedAtUtc));
}

export async function getContactAuditEvents(): Promise<ContactAuditEvent[]> {
  const logFile = path.join(CONTACT_DATA_ROOT, "logs", "events.jsonl");

  try {
    const content = await fs.readFile(logFile, "utf8");

    return content
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as ContactAuditEvent)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  } catch {
    return [];
  }
}
