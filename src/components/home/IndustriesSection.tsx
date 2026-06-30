"use client";

import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  "Federal Government": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 18h18M1 11h18M4 11V9M10 11V9M16 11V9M1 9h18M10 2L1 9" />
    </svg>
  ),
  "State & Local Government": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" /><path d="M1.5 10h17M10 1.5C7.5 4.5 6 7 6 10s1.5 5.5 4 8.5M10 1.5C12.5 4.5 14 7 14 10s-1.5 5.5-4 8.5" />
    </svg>
  ),
  "Healthcare & Life Sciences": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2H12V8H18V12H12V18H8V12H2V8H8V2Z" />
    </svg>
  ),
  "Financial Services": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="16" height="12" rx="1.5" /><path d="M2 9h16M7 13h1.5M11 13h2" />
    </svg>
  ),
  "Defense & Intelligence": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 1L1.5 4.5v5C1.5 14.5 5 18 10 19.5 15 18 18.5 14.5 18.5 9.5v-5L10 1z" />
    </svg>
  ),
  "Nonprofit & Faith Organizations": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 17.5S2 12.5 2 6.5A4 4 0 0 1 10 4a4 4 0 0 1 8 2.5C18 12.5 10 17.5 10 17.5z" />
    </svg>
  ),
  "Education & Research": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 1.5L1 7l9 5.5L19 7 10 1.5z" /><path d="M1 7v6.5M4 8.5v6.5s2 2.5 6 2.5 6-2.5 6-2.5V8.5" />
    </svg>
  ),
  "Small & Mid-Size Business": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="16" height="11" rx="1" /><path d="M7 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="10" cy="10" r="8.5" />
  </svg>
);

export function IndustriesSection() {
  const { eyebrow, heading, items } = homeContent.industries;

  return (
    <section
      aria-labelledby="industries-heading"
      className="relative border-t border-black/8 dark:border-white/8"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
              {eyebrow}
            </p>
            <h2
              id="industries-heading"
              className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0D1B2A] sm:text-5xl dark:text-white"
            >
              {heading}
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 sm:text-right sm:max-w-xs">
            Serving clients across public and private sectors nationwide.
          </p>
        </motion.div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" role="list">
          {items.map((industry, i) => (
            <motion.li
              key={industry.name}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
              className="group flex flex-col gap-3 rounded-xl border border-black/8 bg-white p-5 transition-all duration-300 hover:border-[#4A7DB5]/30 hover:shadow-card-blue dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
            >
              <div className="text-[#1E3A5F] transition-colors group-hover:text-[#4A7DB5] dark:text-[#60a5fa]">
                {INDUSTRY_ICONS[industry.name] ?? DEFAULT_ICON}
              </div>
              <div>
                <p className="text-sm font-semibold leading-snug text-[#0D1B2A] dark:text-white">{industry.name}</p>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{industry.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
