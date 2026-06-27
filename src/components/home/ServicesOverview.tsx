import type { ReactNode } from "react";
import Link from "next/link";
import { homeContent } from "@/config/home";
import { Section, SectionEyebrow } from "./Section";
import { FeatureGrid } from "./FeatureGrid";

const SERVICE_ICONS: Record<string, ReactNode> = {
  "Website Design & Development": (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 12h17M12 3.5c-2.5 3-4 5.5-4 8.5s1.5 5.5 4 8.5M12 3.5c2.5 3 4 5.5 4 8.5s-1.5 5.5-4 8.5" />
    </svg>
  ),
  "Software Development": (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "AI Integration & Business Automation": (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M3 12h6M15 12h6M12 3v6M12 15v6" />
      <circle cx="12" cy="12" r="9" strokeOpacity="0.2" />
    </svg>
  ),
};

export function ServicesOverview() {
  const { eyebrow, heading, intro, items } = homeContent.services;

  return (
    <Section
      labelledById="services-heading"
      className="border-t border-black/10 bg-[#F8FAFC] dark:border-white/10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
          <h2
            id="services-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">
            {intro}
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#1E3A5F] transition-colors hover:text-[#2B4C7E]"
        >
          View all services
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 7h10M7 2l5 5-5 5" />
          </svg>
        </Link>
      </div>
      <div className="mt-12">
        <FeatureGrid
          items={items}
          getIcon={(title) => SERVICE_ICONS[title] ?? null}
        />
      </div>
    </Section>
  );
}
