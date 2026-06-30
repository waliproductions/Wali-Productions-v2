"use client";

import { motion } from "framer-motion";
import type { Capability } from "@/config/government";

type CapabilityGridSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  items: Capability[];
  mdColumnsClass?: string;
  tone?: "default" | "muted";
  layout?: "grid" | "list";
};

export function CapabilityGridSection({
  id,
  eyebrow,
  heading,
  items,
  tone = "default",
  layout = "grid",
}: CapabilityGridSectionProps) {
  const bgClass =
    tone === "muted"
      ? "bg-[#F8FAFC] dark:bg-navy-950/50"
      : "bg-white dark:bg-transparent";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative border-t border-black/8 dark:border-white/8 ${bgClass}`}
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
          >
            {heading}
          </h2>
        </motion.div>

        <div className="mt-12">
          {layout === "list" ? (
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <div className="h-0.5 w-8 rounded-full bg-[#4A7DB5]" />
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-[#0D1B2A] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2" role="list">
              {items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group rounded-xl border border-black/8 bg-white p-6 shadow-card transition-all duration-300 hover:border-[#4A7DB5]/25 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03]"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF3FA] transition-colors group-hover:bg-[#1E3A5F] dark:bg-white/[0.06]">
                    <span className="text-xs font-bold text-[#1E3A5F] transition-colors group-hover:text-white dark:text-[#60a5fa]" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-[#0D1B2A] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
