/**
 * Site-wide structural configuration — single source of truth for company
 * metadata and navigation. The Navbar and Footer render whatever these arrays
 * contain. Routes listed here are built, real pages.
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
  /** Approved business identity (BRAND_GUIDELINES / BUSINESS_INFORMATION). */
  identity: "Christian Veteran-Owned Technology & Digital Solutions",
  /**
   * Public site URL, supplied per environment. Used for metadata when present.
   * Configure via NEXT_PUBLIC_SITE_URL (see .env.example).
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  /** Primary navigation, rendered in the header and footer. */
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Government", href: "/government" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  /** Legal navigation, rendered in the footer. */
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ] satisfies NavItem[],
  /**
   * Routes that exist and should appear in the sitemap. Keep in sync as pages
   * are added.
   */
  routes: [
    "/",
    "/about",
    "/services",
    "/government",
    "/portfolio",
    "/contact",
    "/privacy",
    "/terms",
    "/accessibility",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Absolute base URL for SEO routes (sitemap, robots, canonical resolution).
 * Production MUST set NEXT_PUBLIC_SITE_URL; the localhost value is only a
 * development fallback and is never an invented business domain.
 */
export function getBaseUrl(): string {
  return (siteConfig.url || "http://localhost:3000").replace(/\/+$/, "");
}
