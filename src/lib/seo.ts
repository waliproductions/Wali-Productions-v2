import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * SEO helpers — centralizes per-page metadata so canonical URLs, OpenGraph, and
 * Twitter cards stay consistent across pages.
 *
 * No business claims, contact details, certifications, or identifiers are
 * authored here; only structural SEO metadata (titles, descriptions, canonical
 * paths). Absolute URL resolution depends on `metadataBase`, which is derived
 * from NEXT_PUBLIC_SITE_URL in the root layout.
 */

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
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
