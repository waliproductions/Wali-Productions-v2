/**
 * Site-wide structural configuration.
 *
 * Phase 1 bootstrap: this holds only the minimal, neutral values needed for the
 * application to render and be verified. Company messaging, branding, mission,
 * and navigation content are governed by canonical documentation and must be
 * added only once approved. Do not introduce business copy here ahead of approval.
 */
export const siteConfig = {
  name: "Wali Productions",
  // Placeholder navigation. Real navigation structure is pending approval.
  nav: [{ label: "Home", href: "/" }],
} as const;

export type SiteConfig = typeof siteConfig;
