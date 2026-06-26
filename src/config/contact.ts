/**
 * Contact page content model — single source of truth.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * IMPORTANT: The values below are PLACEHOLDERS, not approved copy or real
 * contact details.
 *
 * Per the Phase 8 brief, this file does NOT invent phone numbers, addresses,
 * emails, form endpoints, business hours, or contact details. Those must be
 * populated ONLY from verified canonical documentation
 * (`BUSINESS_INFORMATION.md`, `SERVICES_LIBRARY.md`, `CLIENT_PROMISE.md`,
 * `CORE_MESSAGES.md`).
 *
 * The consultation form is intentionally NOT wired to a backend (see the form
 * component). Each placeholder names the source it must come from. Replace every
 * value with verified, documented detail before this page is published.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Marks unfilled copy and records which approved source it must come from. */
const pending = (note: string, source: string) =>
  `[ pending verified detail: ${note} — source: ${source} ]`;

/** Canonical source locations (for placeholder annotations only). */
const BUSINESS_DOC = "docs/01-Business/BUSINESS_INFORMATION.md";
const SERVICES_LIBRARY = "docs/07-Content/Services/SERVICES_LIBRARY.md";
const CLIENT_PROMISE_DOC = "docs/07-Content/CLIENT_PROMISE.md";
const CORE_MESSAGES = "docs/07-Content/CORE_MESSAGES.md";

export type Cta = {
  label: string;
  /** Placeholder target ("#") until approved routes exist. */
  href: string;
};

export type InquiryCategory = {
  title: string;
  description: string;
};

/** A labeled contact-detail row (e.g., Email, Phone). Values stay unfilled. */
export type ContactDetail = {
  label: string;
  value: string;
};

export type ContactContent = {
  hero: {
    /** Provided directly in the Phase 8 brief; placed verbatim, not authored. */
    identity: string;
    headline: string;
    subhead: string;
  };
  overview: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  consultation: {
    eyebrow: string;
    heading: string;
    intro: string;
    /** Options for the "service of interest" select; sourced from docs. */
    serviceOptions: string[];
  };
  inquiryCategories: {
    eyebrow: string;
    heading: string;
    items: InquiryCategory[];
  };
  clientPromise: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  contactInfo: {
    eyebrow: string;
    heading: string;
    /** Visible disclaimer that values are unverified placeholders. */
    note: string;
    items: ContactDetail[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
  };
};

export const contactContent: ContactContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: pending("contact headline", CORE_MESSAGES),
    subhead: pending("contact supporting statement", CORE_MESSAGES),
  },
  overview: {
    eyebrow: "Get in Touch",
    heading: pending("contact overview heading", CORE_MESSAGES),
    paragraphs: [pending("contact overview narrative", CORE_MESSAGES)],
  },
  consultation: {
    eyebrow: "Request a Consultation",
    heading: pending("consultation heading", CORE_MESSAGES),
    intro: pending("consultation introduction", CORE_MESSAGES),
    serviceOptions: [
      pending("service option 1", SERVICES_LIBRARY),
      pending("service option 2", SERVICES_LIBRARY),
      pending("service option 3", SERVICES_LIBRARY),
    ],
  },
  inquiryCategories: {
    eyebrow: "Service Inquiries",
    heading: pending("service inquiry categories heading", SERVICES_LIBRARY),
    items: [
      { title: pending("inquiry category 1 title", SERVICES_LIBRARY), description: pending("inquiry category 1 description", SERVICES_LIBRARY) },
      { title: pending("inquiry category 2 title", SERVICES_LIBRARY), description: pending("inquiry category 2 description", SERVICES_LIBRARY) },
      { title: pending("inquiry category 3 title", SERVICES_LIBRARY), description: pending("inquiry category 3 description", SERVICES_LIBRARY) },
    ],
  },
  clientPromise: {
    eyebrow: "Our Promise",
    heading: pending("client promise heading", CLIENT_PROMISE_DOC),
    paragraphs: [pending("client promise summary", CLIENT_PROMISE_DOC)],
  },
  contactInfo: {
    eyebrow: "Contact Information",
    heading: pending("contact information heading", BUSINESS_DOC),
    note: "Official contact details are shown only when verified and documented. The values below are unverified placeholders.",
    items: [
      { label: "Email", value: pending("verified email address", BUSINESS_DOC) },
      { label: "Phone", value: pending("verified phone number", BUSINESS_DOC) },
      { label: "Address", value: pending("verified business address", BUSINESS_DOC) },
      { label: "Business Hours", value: pending("verified business hours", BUSINESS_DOC) },
    ],
  },
  cta: {
    heading: pending("contact CTA heading", CORE_MESSAGES),
    body: pending("contact CTA supporting line", CORE_MESSAGES),
    primaryCta: { label: pending("contact CTA label", CORE_MESSAGES), href: "#" },
  },
};
