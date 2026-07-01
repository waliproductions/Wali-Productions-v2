import type {
  PreferredContactMethod,
  PreferredContactTime,
} from "@/types/lead";

export type ConsultationSubmissionInput = {
  fullName: string;
  email: string;
  companyName?: string;
  phone?: string;
  website?: string;
  servicesInterested: string[];
  preferredContactMethod?: PreferredContactMethod;
  preferredContactTime?: PreferredContactTime;
  projectDescription?: string;
};

const MAX_TEXT = 200;
const MAX_LONG_TEXT = 4000;
const MAX_SERVICES = 10;

const CONTACT_METHODS: PreferredContactMethod[] = ["email", "phone", "text", "video-call", "no-preference"];
const CONTACT_TIMES: PreferredContactTime[] = ["morning", "afternoon", "evening", "anytime"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Strip characters that have no legitimate place in a name/company/single-line
// field and could otherwise be used for header injection if a field is ever
// echoed into an email header.
const CONTROL_CHARS_RE = /[\r\n\t\0]/g;

function cleanLine(value: unknown, maxLength: number): string {
  return String(value ?? "")
    .replace(CONTROL_CHARS_RE, " ")
    .trim()
    .slice(0, maxLength);
}

export function validateConsultationSubmission(input: unknown):
  | { ok: true; data: ConsultationSubmissionInput }
  | { ok: false; errors: string[] } {
  if (!input || typeof input !== "object") {
    return { ok: false, errors: ["Invalid submission payload."] };
  }

  const value = input as Record<string, unknown>;
  const errors: string[] = [];

  const fullName = cleanLine(value.fullName, MAX_TEXT);
  const email = cleanLine(value.email, MAX_TEXT).toLowerCase();
  const companyName = cleanLine(value.companyName, MAX_TEXT);
  const phone = cleanLine(value.phone, 40);
  const website = cleanLine(value.website, MAX_TEXT);
  const projectDescription = String(value.projectDescription ?? "")
    .replace(/\0/g, "")
    .trim()
    .slice(0, MAX_LONG_TEXT);

  const rawServices = Array.isArray(value.servicesInterested) ? value.servicesInterested : [];
  const servicesInterested = rawServices
    .map((s) => cleanLine(s, MAX_TEXT))
    .filter(Boolean)
    .slice(0, MAX_SERVICES);

  const preferredContactMethodRaw = cleanLine(value.preferredContactMethod, 40);
  const preferredContactMethod = CONTACT_METHODS.includes(preferredContactMethodRaw as PreferredContactMethod)
    ? (preferredContactMethodRaw as PreferredContactMethod)
    : undefined;

  const preferredContactTimeRaw = cleanLine(value.preferredContactTime, 40);
  const preferredContactTime = CONTACT_TIMES.includes(preferredContactTimeRaw as PreferredContactTime)
    ? (preferredContactTimeRaw as PreferredContactTime)
    : undefined;

  if (fullName.length < 2) errors.push("Full name is required.");
  if (!EMAIL_RE.test(email) || email.length > MAX_TEXT) errors.push("A valid email address is required.");
  if (website && !/^https?:\/\/|^[a-z0-9.-]+\.[a-z]{2,}/i.test(website)) {
    errors.push("Website must be a valid URL.");
  }
  if (phone && phone.replace(/[^0-9]/g, "").length < 7) {
    errors.push("Phone number looks incomplete.");
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      fullName,
      email,
      companyName: companyName || undefined,
      phone: phone || undefined,
      website: website || undefined,
      servicesInterested,
      preferredContactMethod,
      preferredContactTime,
      projectDescription: projectDescription || undefined,
    },
  };
}
