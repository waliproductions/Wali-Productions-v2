"use client";

import { motion } from "framer-motion";
import { aboutContent } from "@/config/about";

const VALUE_ICONS = [
  <svg key="0" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 1L2 4.5v4C2 13.5 5.5 17 10 18.5 14.5 17 18 13.5 18 8.5v-4L10 1z" /><path d="M6.5 10l2.5 2.5 4.5-4.5" />
  </svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 3L7 14l-5-5" />
  </svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="16" height="12" rx="1.5" /><path d="M7 4V2.5M13 4V2.5M2 8h16" />
  </svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 2v16M2 10h16" /><circle cx="10" cy="10" r="4" />
  </svg>,
  <svg key="4" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10" cy="10" r="8.5" /><path d="M7 10l2 2 4-4" />
  </svg>,
  <svg key="5" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10" cy="10" r="3" /><path d="M10 2v3.5M10 14.5V18M2 10h3.5M14.5 10H18M4.6 4.6l2.5 2.5M12.9 12.9l2.5 2.5M15.4 4.6l-2.5 2.5M7.1 12.9l-2.5 2.5" />
  </svg>,
  <svg key="6" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 2l8 4.5v5C18 16 14.5 19 10 20 5.5 19 2 16 2 11.5V6.5L10 2z" />
    <path d="M10 7v5M10 14h.01" />
  </svg>,
];

export function CoreValues() {
  const { eyebrow, heading, subhead, items } = aboutContent.coreValues;

  return (
    <section
      id="core-values"
      aria-labelledby="core-values-heading"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/50"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
            {eyebrow}
          </p>
          <h2
            id="core-values-heading"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0D1B2A] sm:text-5xl dark:text-white"
          >
            {heading}
          </h2>
          {subhead && (
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {subhead}
            </p>
          )}
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const, delay: i * 0.07 }}
              className="group flex flex-col rounded-2xl border border-black/8 bg-white p-7 shadow-card transition-all duration-300 hover:border-[#4A7DB5]/25 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF3FA] text-[#1E3A5F] transition-all duration-300 group-hover:bg-[#1E3A5F] group-hover:text-white dark:bg-white/[0.06] dark:text-[#60a5fa]">
                {VALUE_ICONS[i] ?? VALUE_ICONS[0]}
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-[#0D1B2A] dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
