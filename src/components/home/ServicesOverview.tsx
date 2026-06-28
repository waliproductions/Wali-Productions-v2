import type { ReactNode } from "react";
import Link from "next/link";
import { homeContent } from "@/config/home";
import { Section, SectionEyebrow } from "./Section";

const SERVICE_ICONS: Record<string, ReactNode> = {
  "Website Design & Development": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="14" cy="14" r="11" />
      <path d="M3.5 14h21M14 3.5C11 7 9 10.5 9 14s2 7 5 10.5M14 3.5C17 7 19 10.5 19 14s-2 7-5 10.5" />
    </svg>
  ),
  "Software Development": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="24" height="18" rx="2" />
      <path d="M10 12l-3 3 3 3M18 12l3 3-3 3M14 10l-2 8" />
    </svg>
  ),
  "AI Integration & Business Automation": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="14" cy="14" r="3.5" />
      <path d="M14 3v7M14 18v7M3 14h7M18 14h7M6.2 6.2l4.9 4.9M16.9 16.9l4.9 4.9M21.8 6.2l-4.9 4.9M11.1 16.9l-4.9 4.9" />
    </svg>
  ),
};

const ICON_FALLBACK = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="14" cy="14" r="11" /><path d="M14 10v4l3 3" />
  </svg>
);

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
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 7h10M7 2l5 5-5 5" />
          </svg>
        </Link>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="group rounded-2xl border border-black/10 bg-white p-7 shadow-card transition-all hover:shadow-card-hover hover:border-[#4A7DB5]/25 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#1E3A5F] transition-colors group-hover:bg-[#E8EFF8] dark:bg-white/[0.06]">
              {SERVICE_ICONS[item.title] ?? ICON_FALLBACK}
            </div>
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
