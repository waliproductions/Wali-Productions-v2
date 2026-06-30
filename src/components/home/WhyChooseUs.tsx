"use client";

import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

const ICONS = [
  <svg key="0" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 1L2 4.5v4C2 13.5 5.5 17 10 18.5 14.5 17 18 13.5 18 8.5v-4L10 1z" /><path d="M6.5 10l2.5 2.5 4.5-4.5" />
  </svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 7 1 10 4 13" /><polyline points="16 7 19 10 16 13" /><path d="M9 3l-2 14" />
  </svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="16" height="12" rx="1.5" /><path d="M7 4V2M13 4V2M2 8h16" />
  </svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 1L2 4.5v4C2 13.5 5.5 17 10 18.5 14.5 17 18 13.5 18 8.5v-4L10 1z" />
    <circle cx="10" cy="10" r="2.5" />
  </svg>,
  <svg key="4" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.5 10c0 4.14-3.36 7.5-7.5 7.5S2.5 14.14 2.5 10 5.86 2.5 10 2.5 17.5 5.86 17.5 10z" /><path d="M10 6.5v4l2.5 2.5" />
  </svg>,
  <svg key="5" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 10h16M10 2l8 8-8 8" />
  </svg>,
];

export function WhyChooseUs() {
  const { eyebrow, heading, subhead, items } = homeContent.whyChoose;

  return (
    <section
      aria-labelledby="why-heading"
      className="relative border-t border-black/8 dark:border-white/8"
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
            id="why-heading"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0D1B2A] sm:text-5xl dark:text-white"
          >
            {heading}
          </h2>
          <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-400">
            {subhead}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="group relative flex flex-col rounded-2xl border border-black/8 bg-white p-7 shadow-card transition-all duration-300 hover:border-[#4A7DB5]/25 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
            >
              {/* Icon */}
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF3FA] text-[#1E3A5F] transition-all duration-300 group-hover:bg-[#1E3A5F] group-hover:text-white dark:bg-white/[0.06] dark:text-[#60a5fa]">
                {ICONS[i]}
              </div>

              <h3 className="font-display text-lg font-semibold tracking-tight text-[#0D1B2A] dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>

              {/* Accent bar */}
              <div className="absolute left-0 top-1/4 h-1/2 w-0.5 rounded-r-full bg-gradient-to-b from-[#4A7DB5] to-[#4A7DB5]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
