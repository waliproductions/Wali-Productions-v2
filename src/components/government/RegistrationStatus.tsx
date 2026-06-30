"use client";

import { motion } from "framer-motion";
import { governmentContent } from "@/config/government";

function isPending(value: string): boolean {
  return value.toLowerCase().includes("pending verified detail");
}

export function RegistrationStatus() {
  const { eyebrow, heading, note, items } = governmentContent.registration;

  return (
    <section
      id="registration"
      aria-labelledby="registration-heading"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/50"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
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
            id="registration-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
          >
            {heading}
          </h2>
          <p role="note" className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {note}
          </p>
        </motion.div>

        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex gap-4 rounded-xl border border-black/8 bg-white p-5 shadow-card dark:border-white/8 dark:bg-white/[0.03]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FA] dark:bg-white/[0.06]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="dark:[stroke:#60a5fa]" aria-hidden="true">
                  <path d="M8 1L1 4v3.5C1 11 3.5 14 8 15.5 12.5 14 15 11 15 7.5V4L8 1z" />
                </svg>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {item.label}
                </dt>
                <dd className="mt-1.5">
                  {isPending(item.value) ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4A7DB5]/25 bg-[#EEF3FA] px-2.5 py-1 text-xs font-medium text-[#1E3A5F] dark:bg-[#4A7DB5]/10 dark:text-[#60a5fa]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4A7DB5]" aria-hidden="true" />
                      In preparation
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-[#0D1B2A] dark:text-white">{item.value}</span>
                  )}
                </dd>
              </div>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
