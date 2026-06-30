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
    "@type": ["Organization", "ProfessionalService"],
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description:
      "Enterprise technology consulting, cybersecurity, AI integration, software engineering, cloud solutions, and government IT services. Veteran-Owned Small Business (VOSB) serving federal, state, and local government agencies, nonprofits, churches, and private enterprises.",
    url: baseUrl,
    logo: `${baseUrl}/opengraph/og-image.png`,
    foundingDate: "2024",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Custom Software Development",
      "Web Application Development",
      "AI Integration & Intelligent Automation",
      "Business Process Automation",
      "Cybersecurity Assessment & Architecture",
      "Compliance Framework Implementation",
      "Cloud Migration & Infrastructure Modernization",
      "IT Consulting & Technology Strategy",
      "Linux & Systems Administration",
      "Government Technology Services",
      "Digital Transformation Consulting",
      "Media & Livestream Production",
    ],
    knowsAbout: [
      "NIST Cybersecurity Framework",
      "FISMA",
      "Section 508 Accessibility",
      "Zero Trust Architecture",
      "OWASP",
      "Cloud Architecture",
      "AI Governance",
      "Government Contracting",
      "Veteran-Owned Small Business",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${baseUrl}/start`,
      availableLanguage: "English",
    },
    sameAs: [] as string[],
  };
}

export function buildLocalBusinessJsonLd() {
  const baseUrl = getBaseUrl() || "https://waliproductions.com";
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description:
      "Enterprise technology consulting — Veteran-Owned Small Business. Custom software, cybersecurity, AI integration, cloud solutions, and government IT serving Springfield, Missouri and clients nationwide.",
    url: baseUrl,
    image: `${baseUrl}/opengraph/og-image.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Springfield",
      addressRegion: "MO",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "37.2153",
      longitude: "-93.2982",
    },
    areaServed: [
      { "@type": "City", "name": "Springfield, Missouri" },
      { "@type": "State", "name": "Missouri" },
      { "@type": "Country", "name": "United States" },
    ],
    priceRange: "$$–$$$",
    openingHours: "Mo-Fr 09:00-18:00",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${baseUrl}/start`,
      availableLanguage: "English",
    },
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
      "VOSB veteran-owned small business",
      "digital transformation",
      "federal technology services",
      "cloud solutions",
      "IT consulting",
      "business automation",
      "Section 508 compliance",
      "NIST cybersecurity",
      "nonprofit technology",
      "church technology services",
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
