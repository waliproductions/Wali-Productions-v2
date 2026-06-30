"use client";

import { motion } from "framer-motion";
import { governmentContent } from "@/config/government";

function isPending(value: string): boolean {
  return value.toLowerCase().includes("pending verified detail");
}

export function PastPerformance() {
  const { eyebrow, heading, note, items } = governmentContent.pastPerformance;

  const confirmedItems = items.filter(
    (item) => !isPending(item.title) && !isPending(item.description)
  );

  return (
    <section
      id="past-performance"
      aria-labelledby="past-performance-heading"
      className="relative border-t border-black/8 dark:border-white/8"
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
            id="past-performance-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
          >
            {heading}
          </h2>
        </motion.div>

        {confirmedItems.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2" role="list">
            {confirmedItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-xl border border-black/8 bg-white p-7 shadow-card transition-all hover:border-[#4A7DB5]/25 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03]"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight text-[#0D1B2A] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex gap-4 rounded-xl border border-black/8 p-8 dark:border-white/8"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#4A7DB5" strokeWidth="1.5" strokeLinecap="round" className="mt-0.5 shrink-0" aria-hidden="true">
              <circle cx="10" cy="10" r="8.5" /><path d="M10 6.5v4M10 13h.01" />
            </svg>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {note}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
