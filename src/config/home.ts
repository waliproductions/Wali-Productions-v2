/**
 * Homepage content model — single source of truth for homepage copy.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * IMPORTANT: The text values below are PLACEHOLDERS, not approved copy.
 *
 * The mission, faith-related messaging, service descriptions, government-
 * contracting capabilities, and value propositions for Wali Productions LLC are
 * governed by canonical documentation and must be supplied from approved
 * sources. They are intentionally NOT authored here. Replace each `pending()`
 * placeholder with approved copy before this page is published.
 *
 * Do not invent mission, statement-of-faith, governance, capability, or identity
 * claims in this file.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Wraps a note so unfilled copy is obvious on screen and in code review. */
const pending = (note: string) => `[ pending approved copy: ${note} ]`;

export type Cta = {
  label: string;
  /** Placeholder targets ("#") until approved routes exist. */
  href: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type HomeContent = {
  hero: {
    /** Provided directly in the Phase 3 brief; placed verbatim, not authored. */
    identity: string;
    headline: string;
    subhead: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
  };
  mission: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: FeatureItem[];
  };
  government: {
    eyebrow: string;
    heading: string;
    body: string;
    items: FeatureItem[];
  };
  whyChoose: {
    eyebrow: string;
    heading: string;
    items: FeatureItem[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
  };
};

export const homeContent: HomeContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: pending("hero headline"),
    subhead: pending("hero supporting statement"),
    primaryCta: { label: pending("primary CTA label"), href: "#" },
    secondaryCta: { label: pending("secondary CTA label"), href: "#" },
  },
  mission: {
    eyebrow: "Our Mission",
    heading: pending("mission heading"),
    body: pending("approved mission statement"),
  },
  services: {
    eyebrow: "What We Do",
    heading: pending("services heading"),
    intro: pending("services introduction"),
    items: [
      { title: pending("service 1 title"), description: pending("service 1 description") },
      { title: pending("service 2 title"), description: pending("service 2 description") },
      { title: pending("service 3 title"), description: pending("service 3 description") },
    ],
  },
  government: {
    eyebrow: "Government Contracting",
    heading: pending("government contracting heading"),
    body: pending("government contracting readiness statement"),
    items: [
      { title: pending("readiness point 1 title"), description: pending("readiness point 1 description") },
      { title: pending("readiness point 2 title"), description: pending("readiness point 2 description") },
      { title: pending("readiness point 3 title"), description: pending("readiness point 3 description") },
    ],
  },
  whyChoose: {
    eyebrow: "Why Wali Productions",
    heading: pending("why-choose heading"),
    items: [
      { title: pending("reason 1 title"), description: pending("reason 1 description") },
      { title: pending("reason 2 title"), description: pending("reason 2 description") },
      { title: pending("reason 3 title"), description: pending("reason 3 description") },
      { title: pending("reason 4 title"), description: pending("reason 4 description") },
    ],
  },
  cta: {
    heading: pending("final CTA heading"),
    body: pending("final CTA supporting line"),
    primaryCta: { label: pending("final CTA label"), href: "#" },
  },
};
