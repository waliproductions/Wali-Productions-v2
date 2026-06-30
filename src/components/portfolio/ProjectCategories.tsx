"use client";

import { motion } from "framer-motion";
import { portfolioContent } from "@/config/portfolio";

export function ProjectCategories() {
  const { eyebrow, heading, subhead, items } = portfolioContent.capabilities;

  return (
    <section
      id="project-categories"
      aria-labelledby="project-categories-heading"
      className="relative border-t border-black/8 dark:border-white/8"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
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
            id="project-categories-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
          >
            {heading}
          </h2>
          {subhead && (
            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400">
              {subhead}
            </p>
          )}
        </motion.div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const, delay: i * 0.07 }}
              className="group flex flex-col rounded-2xl border border-black/8 bg-white p-6 shadow-card transition-all duration-300 hover:border-[#4A7DB5]/25 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03]"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF3FA] dark:bg-white/[0.06]">
                <span className="font-display text-xs font-bold text-[#1E3A5F] dark:text-[#60a5fa]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-base font-semibold tracking-tight text-[#0D1B2A] dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
