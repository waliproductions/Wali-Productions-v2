import type { Metadata } from "next";
import { siteConfig, getBaseUrl } from "@/config/site";

export const OG_IMAGE = {
  url: "/opengraph/og-image.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Enterprise Technology Consulting`,
} as const;

type BuildMetadataArgs = {
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
};

export function buildOrganizationJsonLd() {
  const baseUrl = getBaseUrl() || "https://waliproductions.com";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description: "Enterprise technology consulting, cybersecurity, AI integration, and digital transformation for government agencies and private enterprises.",
    url: baseUrl,
    logo: `${baseUrl}/opengraph/og-image.png`,
    foundingDate: "2024",
    keywords: [
      "enterprise technology consulting",
      "cybersecurity",
      "AI integration",
      "software engineering",
      "government IT",
      "digital transformation",
      "veteran-owned business",
      "cloud solutions",
    ],
    areaServed: "United States",
    serviceType: [
      "Software Engineering",
      "AI Integration",
      "Cybersecurity",
      "Cloud Solutions",
      "IT Consulting",
      "Digital Transformation",
      "Government IT Services",
    ],
    sameAs: [] as string[],
  };
}

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
    keywords: [
      "enterprise technology consulting",
      "cybersecurity services",
      "AI integration",
      "software engineering",
      "government IT contracting",
      "digital transformation",
      "veteran-owned business",
      "cloud solutions",
      "IT consulting",
      "business automation",
    ],
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
