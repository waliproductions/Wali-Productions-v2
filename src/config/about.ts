/**
 * About page content model — single source of truth for About page copy.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * IMPORTANT: The text values below are PLACEHOLDERS, not approved copy.
 *
 * The company story, founder story, kingdom mission, statement of faith,
 * veteran service history, technology journey, core values, and client promise
 * for Wali Productions LLC are governed by canonical documentation. They are
 * intentionally NOT authored here. Each placeholder names the source document
 * it must be populated from. Replace every `pending()` value with the approved
 * copy from that document before this page is published.
 *
 * Do not invent mission, statement-of-faith, governance, biographical, veteran-
 * service, capability, or identity claims in this file.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Marks unfilled copy and records which approved document it must come from. */
const pending = (note: string, source: string) =>
  `[ pending approved copy: ${note} — source: ${source} ]`;

export type Cta = {
  label: string;
  /** Placeholder target ("#") until approved routes exist. */
  href: string;
};

export type ValueItem = {
  title: string;
  description: string;
};

export type AboutContent = {
  hero: {
    /** Provided directly in the Phase 4 brief; placed verbatim, not authored. */
    identity: string;
    headline: string;
    subhead: string;
  };
  companyStory: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  founderStory: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  faithFoundation: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  veteranService: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  technologyJourney: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  coreValues: {
    eyebrow: string;
    heading: string;
    items: ValueItem[];
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

export const aboutContent: AboutContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: pending("About page headline", "CORE_MESSAGES.md"),
    subhead: pending("About page supporting statement", "CORE_MESSAGES.md"),
  },
  companyStory: {
    eyebrow: "Our Story",
    heading: pending("company story heading", "COMPANY_STORY.md"),
    paragraphs: [pending("company story narrative", "COMPANY_STORY.md")],
  },
  founderStory: {
    eyebrow: "Founder",
    heading: pending("founder story heading", "COMPANY_STORY.md / COMPANY_PROFILE.md"),
    paragraphs: [
      pending("founder story summary", "COMPANY_STORY.md / COMPANY_PROFILE.md"),
    ],
  },
  faithFoundation: {
    eyebrow: "Kingdom Mission",
    heading: pending("faith foundation heading", "KINGDOM_MISSION.md"),
    paragraphs: [
      pending(
        "kingdom mission and faith foundation",
        "KINGDOM_MISSION.md / STATEMENT_OF_FAITH.md",
      ),
    ],
  },
  veteranService: {
    eyebrow: "Veteran-Owned",
    heading: pending("veteran service heading", "COMPANY_PROFILE.md"),
    paragraphs: [
      pending(
        "veteran-owned discipline and service narrative",
        "COMPANY_PROFILE.md / COMPANY_STORY.md",
      ),
    ],
  },
  technologyJourney: {
    eyebrow: "Technology Journey",
    heading: pending("technology journey heading", "COMPANY_STORY.md"),
    paragraphs: [
      pending(
        "technology journey narrative",
        "COMPANY_STORY.md / SERVICE_DEVELOPMENT_GUIDE.md",
      ),
    ],
  },
  coreValues: {
    eyebrow: "Core Values",
    heading: pending("core values heading", "CORE_MESSAGES.md"),
    items: [
      {
        title: pending("value 1 title", "CORE_MESSAGES.md / VALUE_PROPOSITIONS.md"),
        description: pending("value 1 description", "CORE_MESSAGES.md / VALUE_PROPOSITIONS.md"),
      },
      {
        title: pending("value 2 title", "CORE_MESSAGES.md / VALUE_PROPOSITIONS.md"),
        description: pending("value 2 description", "CORE_MESSAGES.md / VALUE_PROPOSITIONS.md"),
      },
      {
        title: pending("value 3 title", "CORE_MESSAGES.md / VALUE_PROPOSITIONS.md"),
        description: pending("value 3 description", "CORE_MESSAGES.md / VALUE_PROPOSITIONS.md"),
      },
      {
        title: pending("value 4 title", "CORE_MESSAGES.md / VALUE_PROPOSITIONS.md"),
        description: pending("value 4 description", "CORE_MESSAGES.md / VALUE_PROPOSITIONS.md"),
      },
    ],
  },
  clientPromise: {
    eyebrow: "Our Promise",
    heading: pending("client promise heading", "CLIENT_PROMISE.md"),
    paragraphs: [pending("client promise narrative", "CLIENT_PROMISE.md")],
  },
  cta: {
    heading: pending("About CTA heading", "CORE_MESSAGES.md"),
    body: pending("About CTA supporting line", "CORE_MESSAGES.md / VALUE_PROPOSITIONS.md"),
    primaryCta: { label: pending("About CTA label", "CORE_MESSAGES.md"), href: "#" },
  },
};
