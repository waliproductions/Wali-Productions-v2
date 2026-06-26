/**
 * Services page content model — single source of truth for Services page copy.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * IMPORTANT: The text values below are PLACEHOLDERS, not approved copy.
 *
 * The service categories, individual service offerings, value propositions, and
 * client promise for Wali Productions LLC are governed by canonical
 * documentation under `docs/07-Content` (including the Services directory).
 * They are intentionally NOT authored here. Each placeholder names the source
 * it must be populated from. Replace every `pending()` value with the approved
 * copy before this page is published.
 *
 * The category/service shape below is a scaffold; populate the real number of
 * categories and services from the Services directory. Do not invent service
 * offerings, capabilities, value claims, or client commitments in this file.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Marks unfilled copy and records which approved source it must come from. */
const pending = (note: string, source: string) =>
  `[ pending approved copy: ${note} — source: ${source} ]`;

/** Canonical source locations (for placeholder annotations only). */
const SERVICES_DIR = "docs/07-Content/Services";
const CONTENT_DIR = "docs/07-Content";

export type Cta = {
  label: string;
  /** Placeholder target ("#") until approved routes exist. */
  href: string;
};

export type ServiceCard = {
  title: string;
  description: string;
};

export type ServiceCategory = {
  title: string;
  description: string;
  services: ServiceCard[];
};

export type ServicesContent = {
  hero: {
    /** Provided directly in the Phase 5 brief; placed verbatim, not authored. */
    identity: string;
    headline: string;
    subhead: string;
  };
  intro: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  categories: ServiceCategory[];
  whyWork: {
    eyebrow: string;
    heading: string;
    items: ServiceCard[];
  };
  clientPromise: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
  };
};

export const servicesContent: ServicesContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: pending("Services headline", `${CONTENT_DIR}/CORE_MESSAGES.md`),
    subhead: pending("Services supporting statement", `${CONTENT_DIR}/CORE_MESSAGES.md`),
  },
  intro: {
    eyebrow: "Our Services",
    heading: pending("services introduction heading", `${CONTENT_DIR}/CORE_MESSAGES.md`),
    paragraphs: [
      pending(
        "services introduction narrative",
        `${CONTENT_DIR}/SERVICE_DEVELOPMENT_GUIDE.md`,
      ),
    ],
  },
  // Scaffold shape only — replace with the real categories and services from
  // the Services directory.
  categories: [
    {
      title: pending("category 1 name", `${SERVICES_DIR}`),
      description: pending("category 1 description", `${SERVICES_DIR}`),
      services: [
        { title: pending("service 1 name", `${SERVICES_DIR}`), description: pending("service 1 summary", `${SERVICES_DIR}`) },
        { title: pending("service 2 name", `${SERVICES_DIR}`), description: pending("service 2 summary", `${SERVICES_DIR}`) },
        { title: pending("service 3 name", `${SERVICES_DIR}`), description: pending("service 3 summary", `${SERVICES_DIR}`) },
      ],
    },
    {
      title: pending("category 2 name", `${SERVICES_DIR}`),
      description: pending("category 2 description", `${SERVICES_DIR}`),
      services: [
        { title: pending("service 4 name", `${SERVICES_DIR}`), description: pending("service 4 summary", `${SERVICES_DIR}`) },
        { title: pending("service 5 name", `${SERVICES_DIR}`), description: pending("service 5 summary", `${SERVICES_DIR}`) },
        { title: pending("service 6 name", `${SERVICES_DIR}`), description: pending("service 6 summary", `${SERVICES_DIR}`) },
      ],
    },
  ],
  whyWork: {
    eyebrow: "Why Wali Productions",
    heading: pending("why-work heading", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`),
    items: [
      { title: pending("reason 1 title", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`), description: pending("reason 1 description", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`) },
      { title: pending("reason 2 title", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`), description: pending("reason 2 description", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`) },
      { title: pending("reason 3 title", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`), description: pending("reason 3 description", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`) },
      { title: pending("reason 4 title", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`), description: pending("reason 4 description", `${CONTENT_DIR}/VALUE_PROPOSITIONS.md`) },
    ],
  },
  clientPromise: {
    eyebrow: "Our Promise",
    heading: pending("client promise heading", `${CONTENT_DIR}/CLIENT_PROMISE.md`),
    paragraphs: [pending("client promise summary", `${CONTENT_DIR}/CLIENT_PROMISE.md`)],
  },
  cta: {
    heading: pending("Services CTA heading", `${CONTENT_DIR}/CORE_MESSAGES.md`),
    body: pending("Services CTA supporting line", `${CONTENT_DIR}/CORE_MESSAGES.md`),
    primaryCta: { label: pending("Services CTA label", `${CONTENT_DIR}/CORE_MESSAGES.md`), href: "#" },
  },
};
