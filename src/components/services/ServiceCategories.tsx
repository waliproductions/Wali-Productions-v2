import type { ReactNode } from "react";
import { servicesContent } from "@/config/services";
import { Section, SectionEyebrow } from "@/components/home/Section";

const CATEGORY_ICONS: Record<string, ReactNode> = {
  "Technology Services": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="26" height="20" rx="2" />
      <path d="M11 14l-3 3 3 3M21 14l3 3-3 3M16 12l-2 8" />
    </svg>
  ),
  "Digital & Media Services": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="18" height="14" rx="2" />
      <path d="M28 8l-8 5 8 5V8z" />
      <path d="M2 24h12M8 20v4" />
    </svg>
  ),
  "Government Services": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 28h26M3 14h26M7 14V10M16 14V10M25 14V10M1 10h30L16 3 1 10z" />
    </svg>
  ),
};

const ICON_FALLBACK = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="16" r="12" />
  </svg>
);

export function ServiceCategories() {
  const { categories } = servicesContent;

  return (
    <Section
      id="service-categories"
      labelledById="service-categories-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <SectionEyebrow variant="gold">Service Categories</SectionEyebrow>
      <h2
        id="service-categories-heading"
        className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        What we offer
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {categories.map((category, i) => (
          <div
            key={i}
            className="group rounded-2xl border border-black/10 bg-white p-8 shadow-card transition-all hover:shadow-card-hover hover:border-[#4A7DB5]/25 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#1E3A5F] transition-colors group-hover:bg-[#E8EFF8] dark:bg-white/[0.06]">
              {CATEGORY_ICONS[category.title] ?? ICON_FALLBACK}
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight">
              {category.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {category.description}
            </p>
            <p className="mt-4 text-xs font-semibold text-[#4A7DB5]">
              {category.services.length} service{category.services.length !== 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
