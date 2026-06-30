"use client";

import { motion } from "framer-motion";
import { contactContent } from "@/config/contact";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Software & Technology": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="5 7 2 10 5 13" /><polyline points="15 7 18 10 15 13" /><path d="M9 3l-2 14" />
    </svg>
  ),
  "AI & Automation": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="10" cy="10" r="2.5" /><path d="M10 3v3M10 14v3M3 10h3M14 10h3M5.6 5.6l2 2M12.4 12.4l2 2M14.4 5.6l-2 2M7.6 12.4l-2 2" />
    </svg>
  ),
  "Cybersecurity": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 1.5L2 5v4.5C2 14 5.5 17.5 10 19c4.5-1.5 8-5 8-9.5V5L10 1.5z" /><path d="M6.5 10l2.5 2.5 4-4" />
    </svg>
  ),
  "Cloud & Infrastructure": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 15H6a4 4 0 0 1-.5-8A5 5 0 0 1 16 9.5 3.5 3.5 0 0 1 17 15z" />
    </svg>
  ),
  "Government Services": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 18h18M1 11h18M3.5 11V8M10 11V8M16.5 11V8M1 8h18L10 2.5 1 8z" />
    </svg>
  ),
  "Consulting & Strategy": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="16" height="13" rx="1.5" /><path d="M2 8h16M7 17h6M10 13v4" />
    </svg>
  ),
};

export function ServiceInquiryCategories() {
  const { eyebrow, heading, items } = contactContent.inquiryCategories;

  return (
    <section
      id="inquiry-categories"
      aria-labelledby="inquiry-categories-heading"
      className="relative border-t border-black/8 dark:border-white/8"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
            {eyebrow}
          </p>
          <h2
            id="inquiry-categories-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
          >
            {heading}
          </h2>
        </motion.div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex flex-col rounded-2xl border border-black/8 bg-white p-6 shadow-card transition-all duration-300 hover:border-[#4A7DB5]/25 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3FA] text-[#1E3A5F] transition-all duration-300 group-hover:bg-[#1E3A5F] group-hover:text-white dark:bg-white/[0.06] dark:text-[#60a5fa]">
                {CATEGORY_ICONS[item.title] ?? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="10" cy="10" r="8.5" />
                  </svg>
                )}
              </div>
              <h3 className="font-display text-base font-semibold tracking-tight text-[#0D1B2A] dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
              {item.services && (
                <ul className="mt-4 space-y-1.5" aria-label={`${item.title} services`}>
                  {item.services.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-[#4A7DB5]" aria-hidden="true" />
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
