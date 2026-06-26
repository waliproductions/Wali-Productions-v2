/**
 * Government Contracting page content model — single source of truth.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * IMPORTANT: The values below are PLACEHOLDERS, not approved or official data.
 *
 * Per the Phase 6 brief and standard compliance practice, this file does NOT
 * invent UEI, CAGE codes, NAICS codes, certifications, SAM.gov registration
 * status, or past performance / contract history. Those are official
 * representations and must be populated ONLY from verified canonical
 * documentation under `docs/02-Government` (and the government services doc).
 *
 * Each placeholder names the source it must come from. Replace every value with
 * verified, documented detail before this page is published. Do not author
 * government readiness, capability, certification, or past-performance claims
 * in this file.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Marks unfilled copy and records which approved source it must come from. */
const pending = (note: string, source: string) =>
  `[ pending verified detail: ${note} — source: ${source} ]`;

/** Canonical source locations (for placeholder annotations only). */
const GOV_DIR = "docs/02-Government";
const GOV_SERVICES = "docs/07-Content/Services/GOVERNMENT_TECHNOLOGY_SERVICES.md";
const CONTENT_DIR = "docs/07-Content";

export type Cta = {
  label: string;
  /** Placeholder target ("#") until approved routes exist. */
  href: string;
};

export type Capability = {
  title: string;
  description: string;
};

/** A labeled official-data row (e.g., UEI, CAGE). Values stay unfilled. */
export type RegistrationItem = {
  label: string;
  value: string;
};

export type GovernmentContent = {
  hero: {
    /** Provided directly in the Phase 6 brief; placed verbatim, not authored. */
    identity: string;
    headline: string;
    subhead: string;
  };
  readiness: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  competencies: {
    eyebrow: string;
    heading: string;
    items: Capability[];
  };
  differentiators: {
    eyebrow: string;
    heading: string;
    items: Capability[];
  };
  capabilityStatement: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  registration: {
    eyebrow: string;
    heading: string;
    /** Visible disclaimer that values are unverified placeholders. */
    note: string;
    items: RegistrationItem[];
  };
  pastPerformance: {
    eyebrow: string;
    heading: string;
    note: string;
    items: Capability[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
  };
};

export const governmentContent: GovernmentContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: pending("government contracting headline", `${CONTENT_DIR}/CORE_MESSAGES.md`),
    subhead: pending("government contracting supporting statement", GOV_SERVICES),
  },
  readiness: {
    eyebrow: "Government Ready",
    heading: pending("readiness overview heading", `${GOV_DIR}`),
    paragraphs: [pending("government readiness overview narrative", `${GOV_DIR} / ${GOV_SERVICES}`)],
  },
  competencies: {
    eyebrow: "Core Competencies",
    heading: pending("core competencies heading", GOV_SERVICES),
    items: [
      { title: pending("competency 1 title", GOV_SERVICES), description: pending("competency 1 description", GOV_SERVICES) },
      { title: pending("competency 2 title", GOV_SERVICES), description: pending("competency 2 description", GOV_SERVICES) },
      { title: pending("competency 3 title", GOV_SERVICES), description: pending("competency 3 description", GOV_SERVICES) },
      { title: pending("competency 4 title", GOV_SERVICES), description: pending("competency 4 description", GOV_SERVICES) },
    ],
  },
  differentiators: {
    eyebrow: "Differentiators",
    heading: pending("differentiators heading", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`),
    items: [
      { title: pending("differentiator 1 title", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`), description: pending("differentiator 1 description", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`) },
      { title: pending("differentiator 2 title", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`), description: pending("differentiator 2 description", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`) },
      { title: pending("differentiator 3 title", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`), description: pending("differentiator 3 description", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`) },
    ],
  },
  capabilityStatement: {
    eyebrow: "Capability Statement",
    heading: pending("capability statement heading", `${GOV_DIR}`),
    paragraphs: [pending("capability statement summary", `${GOV_DIR}`)],
  },
  registration: {
    eyebrow: "Certifications & Registration",
    heading: pending("certifications and registration heading", `${GOV_DIR}`),
    note: "Official registration details are shown only when verified and documented. The values below are unverified placeholders.",
    items: [
      { label: "UEI (Unique Entity ID)", value: pending("verified UEI", `${GOV_DIR}`) },
      { label: "CAGE Code", value: pending("verified CAGE code", `${GOV_DIR}`) },
      { label: "SAM.gov Registration", value: pending("verified SAM.gov status", `${GOV_DIR}`) },
      { label: "NAICS Codes", value: pending("verified NAICS codes", `${GOV_DIR}`) },
      { label: "Certifications", value: pending("verified certifications", `${GOV_DIR}`) },
      { label: "Business Type", value: pending("verified business type / set-aside status", `${GOV_DIR}`) },
    ],
  },
  pastPerformance: {
    eyebrow: "Past Performance",
    heading: pending("past performance heading", `${GOV_DIR}`),
    note: "Past performance is listed only when documented and verified. The entries below are placeholders.",
    items: [
      { title: pending("past performance entry 1 title", `${GOV_DIR}`), description: pending("past performance entry 1 summary", `${GOV_DIR}`) },
      { title: pending("past performance entry 2 title", `${GOV_DIR}`), description: pending("past performance entry 2 summary", `${GOV_DIR}`) },
    ],
  },
  cta: {
    heading: pending("government CTA heading", `${CONTENT_DIR}/CORE_MESSAGES.md`),
    body: pending("government CTA supporting line", `${CONTENT_DIR}/CORE_MESSAGES.md`),
    primaryCta: { label: pending("government CTA label", `${CONTENT_DIR}/CORE_MESSAGES.md`), href: "#" },
  },
};
