"use client";

import { motion } from "framer-motion";
import { servicesContent } from "@/config/services";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "software": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 10 2 14 6 18" /><polyline points="22 10 26 14 22 18" /><path d="M12 4l-4 20" />
    </svg>
  ),
  "ai-automation": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="14" cy="14" r="4" /><path d="M14 3v5M14 20v5M3 14h5M20 14h5M6.9 6.9l3.5 3.5M17.6 17.6l3.5 3.5M21.1 6.9l-3.5 3.5M10.4 17.6l-3.5 3.5" />
    </svg>
  ),
  "cybersecurity": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2L3 7v7c0 7 5 12 11 14 6-2 11-7 11-14V7L14 2z" /><path d="M9.5 14l3.5 3.5 6-7" />
    </svg>
  ),
  "cloud": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 21H8a6 6 0 0 1-.7-11.96A7.5 7.5 0 0 1 22 13.5 5 5 0 0 1 23 21z" /><path d="M14 21v-8M11 16l3-3 3 3" />
    </svg>
  ),
  "consulting": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="24" height="17" rx="2" /><path d="M2 10h24M10 25h8M14 21v4" />
    </svg>
  ),
  "government": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 25h24M2 16h24M6 16V12M14 16V12M22 16V12M1 12h26L14 4 1 12z" />
    </svg>
  ),
};

export function ServiceCategories() {
  const { categories } = servicesContent;

  return (
    <section
      id="service-categories"
      aria-labelledby="service-categories-heading"
      className="relative border-t border-black/8 dark:border-white/8"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2
            id="service-categories-heading"
            className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white"
          >
            Practice Areas
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, i) => (
            <motion.a
              key={category.id}
              href={`#service-catalog`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex flex-col items-center gap-3 rounded-xl border border-black/8 bg-white p-5 text-center shadow-card transition-all duration-300 hover:border-[#4A7DB5]/30 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF3FA] text-[#1E3A5F] transition-all duration-300 group-hover:bg-[#1E3A5F] group-hover:text-white dark:bg-white/[0.06] dark:text-[#60a5fa]">
                {CATEGORY_ICONS[category.id] ?? (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="14" cy="14" r="11" />
                  </svg>
                )}
              </div>
              <span className="text-xs font-semibold leading-tight text-[#0D1B2A] dark:text-white">
                {category.title}
              </span>
              <span className="text-[10px] text-neutral-500">
                {category.services.length} service{category.services.length !== 1 ? "s" : ""}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
