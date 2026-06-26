export type ContactSubmissionInput = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
};

export type ContactSubmissionRecord = {
  submissionId: string;
  submittedAt: string;
  submittedAtUtc: string;
  submittedAtLocal: string;
  timezone: "America/Chicago";
  lifecycleStatus: "received" | "processed" | "failed" | "archived";
  emailDeliveryStatus: "pending" | "sent" | "failed";
  source: "website-contact-form";
  formVersion: "contact-v1";
  requester: {
    name: string;
    email: string;
    company: string | null;
    phone: string | null;
  };
  inquiry: {
    service: string | null;
    message: string;
  };
  processing: {
    receivedAt: string;
    emailAttemptedAt: string | null;
    emailSentAt: string | null;
    emailFailedAt: string | null;
    archivedAt: string | null;
    error: string | null;
  };
};

export function validateContactSubmission(input: unknown): {
  ok: true;
  data: ContactSubmissionInput;
} | {
  ok: false;
  errors: string[];
} {
  if (!input || typeof input !== "object") {
    return { ok: false, errors: ["Invalid submission payload."] };
  }

  const value = input as Record<string, unknown>;
  const errors: string[] = [];

  const name = String(value.name ?? "").trim();
  const email = String(value.email ?? "").trim();
  const company = String(value.company ?? "").trim();
  const phone = String(value.phone ?? "").trim();
  const service = String(value.service ?? "").trim();
  const message = String(value.message ?? "").trim();

  if (name.length < 2) errors.push("Name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email is required.");
  if (message.length < 10) errors.push("Message must be at least 10 characters.");

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      company: company || undefined,
      phone: phone || undefined,
      service: service || undefined,
      message,
    },
  };
}
