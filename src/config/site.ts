/**
 * Site-wide structural configuration — single source of truth for company
 * metadata and navigation.
 *
 * Phase 2 (layout foundation): values here are intentionally minimal and
 * neutral. Company messaging, branding, mission, and the full navigation
 * sitemap are governed by canonical documentation and are added only once
 * approved. Do not introduce business copy or unapproved routes here.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  /** Display name used in the header and metadata. */
  name: "Wali Productions",
  /** Legal entity name used for the footer copyright / identity. */
  legalName: "Wali Productions LLC",
  /**
   * Public site URL, supplied per environment. Used for metadata when present.
   * Configure via NEXT_PUBLIC_SITE_URL (see .env.example).
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  /**
   * Primary navigation. Only "Home" is an approved route today. Additional
   * entries are added here once the sitemap is approved in documentation; the
   * Navbar and Footer render whatever this array contains.
   */
  nav: [{ label: "Home", href: "/" }] satisfies NavItem[],
} as const;

export type SiteConfig = typeof siteConfig;
