"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { governmentContent } from "@/config/government";

export function ProcurementReadiness() {
  const { eyebrow, heading, body, setAsideNote, steps } =
    governmentContent.procurementReadiness;

  return (
    <section
      id="procurement"
      aria-labelledby="procurement-heading"
      className="relative border-t border-black/8 dark:border-white/8"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {eyebrow}
            </p>
            <h2
              id="procurement-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
            >
              {heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {body}
            </p>

            {/* Set-aside callout */}
            <div className="mt-8 rounded-xl border border-[#4A7DB5]/20 bg-[#EEF3FA] p-5 dark:border-[#4A7DB5]/25 dark:bg-[#1E3A5F]/20">
              <div className="flex gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="#1E3A5F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 dark:[stroke:#60a5fa]"
                  aria-hidden="true"
                >
                  <path d="M9 1L1 4.5v4C1 13 4.5 16.5 9 18c4.5-1.5 8-5 8-9.5v-4L9 1z" />
                </svg>
                <p className="text-sm leading-relaxed text-[#1E3A5F] dark:text-[#93c5fd]">
                  {setAsideNote}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/capability-statement"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3A5F] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2B4C7E]"
              >
                View Capability Statement
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/15 px-6 py-3 text-sm font-semibold text-[#0D1B2A] transition-all hover:border-[#4A7DB5]/40 hover:bg-[#EEF3FA] dark:border-white/15 dark:text-white dark:hover:bg-white/5"
              >
                Submit a Requirement
              </Link>
            </div>
          </motion.div>

          {/* Right: Steps */}
          <div>
            <ol className="space-y-6" role="list">
              {steps.map((step, i) => (
                <motion.li
                  key={step.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                  className="group flex gap-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white shadow-card transition-all duration-200 group-hover:border-[#4A7DB5]/40 group-hover:shadow-card-blue dark:border-white/10 dark:bg-white/[0.04]">
                    <span className="font-display text-xs font-bold text-[#4A7DB5]">
                      {step.step}
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <p className="font-display text-sm font-semibold text-[#0D1B2A] dark:text-white">
                      {step.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
