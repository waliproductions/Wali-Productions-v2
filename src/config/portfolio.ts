/**
 * Portfolio page content model — single source of truth.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * IMPORTANT: The values below are PLACEHOLDERS, not approved copy.
 *
 * Per the Phase 7 brief, this file does NOT invent client names, testimonials,
 * project results, or claims. Portfolio entries, project outcomes, and past
 * performance positioning must be populated ONLY from verified canonical
 * documentation (`docs/01-Business/PORTFOLIO.md` and
 * `docs/02-Government/PAST_PERFORMANCE.md`).
 *
 * Each placeholder names the source it must come from. Replace every value with
 * verified, documented detail before this page is published.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Marks unfilled copy and records which approved source it must come from. */
const pending = (note: string, source: string) =>
  `[ pending verified detail: ${note} — source: ${source} ]`;

/** Canonical source locations (for placeholder annotations only). */
const PORTFOLIO_DOC = "docs/01-Business/PORTFOLIO.md";
const PAST_PERF_DOC = "docs/02-Government/PAST_PERFORMANCE.md";
const CONTENT_DIR = "docs/07-Content";

export type Cta = {
  label: string;
  /** Placeholder target ("#") until approved routes exist. */
  href: string;
};

export type PortfolioItem = {
  title: string;
  description: string;
};

export type PortfolioContent = {
  hero: {
    /** Provided directly in the Phase 7 brief; placed verbatim, not authored. */
    identity: string;
    headline: string;
    subhead: string;
  };
  overview: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  categories: {
    eyebrow: string;
    heading: string;
    items: PortfolioItem[];
  };
  featured: {
    eyebrow: string;
    heading: string;
    /** Visible disclaimer that entries are placeholders, not real projects. */
    note: string;
    items: PortfolioItem[];
  };
  pastPerformance: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  documentation: {
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

export const portfolioContent: PortfolioContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: pending("portfolio headline", `${CONTENT_DIR}/CORE_MESSAGES.md`),
    subhead: pending("portfolio supporting statement", PORTFOLIO_DOC),
  },
  overview: {
    eyebrow: "Portfolio",
    heading: pending("portfolio overview heading", PORTFOLIO_DOC),
    paragraphs: [pending("portfolio overview narrative", PORTFOLIO_DOC)],
  },
  categories: {
    eyebrow: "Project Categories",
    heading: pending("project categories heading", PORTFOLIO_DOC),
    items: [
      { title: pending("category 1 title", PORTFOLIO_DOC), description: pending("category 1 description", PORTFOLIO_DOC) },
      { title: pending("category 2 title", PORTFOLIO_DOC), description: pending("category 2 description", PORTFOLIO_DOC) },
      { title: pending("category 3 title", PORTFOLIO_DOC), description: pending("category 3 description", PORTFOLIO_DOC) },
    ],
  },
  featured: {
    eyebrow: "Featured Work",
    heading: pending("featured projects heading", PORTFOLIO_DOC),
    note: "Projects are shown only when documented and approved. The entries below are placeholders — no client names, results, or claims are represented.",
    items: [
      { title: pending("featured project 1 title", PORTFOLIO_DOC), description: pending("featured project 1 summary", PORTFOLIO_DOC) },
      { title: pending("featured project 2 title", PORTFOLIO_DOC), description: pending("featured project 2 summary", PORTFOLIO_DOC) },
      { title: pending("featured project 3 title", PORTFOLIO_DOC), description: pending("featured project 3 summary", PORTFOLIO_DOC) },
    ],
  },
  pastPerformance: {
    eyebrow: "Past Performance",
    heading: pending("past performance positioning heading", PAST_PERF_DOC),
    paragraphs: [pending("past performance positioning narrative", PAST_PERF_DOC)],
  },
  documentation: {
    eyebrow: "How We Document Work",
    heading: pending("portfolio documentation heading", PORTFOLIO_DOC),
    paragraphs: [pending("how portfolio work is documented", PORTFOLIO_DOC)],
  },
  cta: {
    heading: pending("portfolio CTA heading", `${CONTENT_DIR}/CORE_MESSAGES.md`),
    body: pending("portfolio CTA supporting line", `${CONTENT_DIR}/CORE_MESSAGES.md`),
    primaryCta: { label: pending("portfolio CTA label", `${CONTENT_DIR}/CORE_MESSAGES.md`), href: "#" },
  },
};
