import type { Metadata } from "next";
import { siteConfig, getBaseUrl } from "@/config/site";

/**
 * SEO helpers — centralizes per-page metadata so canonical URLs, OpenGraph, and
 * Twitter cards stay consistent across pages.
 *
 * No business claims, contact details, certifications, or identifiers are
 * authored here; only structural SEO metadata (titles, descriptions, canonical
 * paths). Absolute URL resolution depends on `metadataBase`, which is derived
 * from NEXT_PUBLIC_SITE_URL in the root layout.
 */

/**
 * Shared Open Graph / Twitter image. The file lives in /public and must be
 * supplied (see public/README.md). Resolved to an absolute URL via metadataBase.
 */
export const OG_IMAGE = {
  url: "/opengraph/og-image.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.identity}`,
} as const;

type BuildMetadataArgs = {
  /** Page title segment (e.g., "About"); templated as "About | Wali Productions". */
  title?: string;
  /** Overrides the title template entirely (used for the home page). */
  absoluteTitle?: string;
  /** Concise, factual page description. */
  description: string;
  /** Canonical path for the page, e.g. "/about" (use "/" for home). */
  path: string;
};

/**
 * JSON-LD Organization schema for the root layout.
 * Only structural identity fields — no certifications, identifiers, or claims
 * that haven't been verified in official documentation.
 */
export function buildOrganizationJsonLd() {
  const baseUrl = getBaseUrl() || "https://waliproductions.com";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description: siteConfig.identity,
    url: baseUrl,
    logo: `${baseUrl}/opengraph/og-image.png`,
    foundingDate: "2024",
    sameAs: [] as string[],
  };
}

/**
 * JSON-LD WebPage schema for individual pages.
 */
export function buildWebPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const baseUrl = getBaseUrl() || "https://waliproductions.com";
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${baseUrl}${path}`,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: baseUrl },
  };
}

export function buildMetadata({
  title,
  absoluteTitle,
  description,
  path,
}: BuildMetadataArgs): Metadata {
  const ogTitle = absoluteTitle ?? title ?? siteConfig.name;

  return {
    ...(absoluteTitle
      ? { title: { absolute: absoluteTitle } }
      : title
        ? { title }
        : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: ogTitle,
      description,
      url: path,
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
