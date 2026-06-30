"use client";

import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

const STEP_ICONS = [
  <svg key="0" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="9.5" /><path d="M7 11l3 3 5-5" />
  </svg>,
  <svg key="1" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 20h18M3 6h16v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z" /><path d="M8 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 7 1 10 4 13" /><polyline points="18 7 21 10 18 13" /><path d="M9 3l-2 16" /><path d="M13 3l2 16" />
  </svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 2L2 6v5c0 5.5 3.5 9 9 10.5C17 19 20.5 15.5 20.5 11V6L11 2z" />
    <circle cx="11" cy="11" r="3" />
  </svg>,
];

export function ProcessSection() {
  const { eyebrow, heading, subhead, steps } = homeContent.process;

  return (
    <section
      aria-labelledby="process-heading"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/50"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
          <h2
            id="process-heading"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0D1B2A] sm:text-5xl dark:text-white"
          >
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {subhead}
          </p>
        </motion.div>

        <ol
          className="relative mt-16 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
        >
          {steps.map((step, i) => (
            <motion.li
              key={step.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" as const, delay: i * 0.1 }}
              className="group relative flex flex-col items-center px-4 pb-10 pt-4 last:pb-0 sm:px-6 lg:pb-0"
            >
              {/* Connector line between steps (hidden on last) */}
              {i < steps.length - 1 && (
                <div
                  className="absolute left-1/2 top-[2.75rem] hidden h-px w-full translate-x-[1.75rem] bg-gradient-to-r from-[#CBD5E1] via-[#4A7DB5]/30 to-[#CBD5E1] dark:from-white/10 dark:via-[#4A7DB5]/20 dark:to-white/10 lg:block"
                  aria-hidden="true"
                />
              )}

              {/* Icon circle */}
              <div className="relative z-10 flex h-[3.5rem] w-[3.5rem] shrink-0 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white shadow-card transition-all duration-300 group-hover:border-[#4A7DB5] group-hover:shadow-card-blue dark:border-white/10 dark:bg-navy-800">
                <span className="text-[#1E3A5F] transition-colors group-hover:text-[#4A7DB5] dark:text-[#60a5fa]">
                  {STEP_ICONS[i] ?? STEP_ICONS[0]}
                </span>
              </div>

              {/* Step number */}
              <div className="mt-4 mb-2 font-display text-[0.65rem] font-bold uppercase tracking-widest text-[#4A7DB5]">
                Step {step.step}
              </div>

              <h3 className="text-center font-display text-base font-semibold leading-snug text-[#0D1B2A] dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-center text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
