"use client";

import { motion } from "framer-motion";

type NarrativeBlockProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  tone?: "light" | "muted";
};

export function NarrativeBlock({
  id,
  eyebrow,
  heading,
  paragraphs,
  tone = "light",
}: NarrativeBlockProps) {
  const headingId = id ? `${id}-heading` : undefined;
  const bgClass = tone === "muted" ? "bg-[#F8FAFC] dark:bg-navy-950/50" : "bg-white dark:bg-transparent";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative border-t border-black/8 dark:border-white/8 ${bgClass}`}
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">

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
              id={headingId}
              className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
            >
              {heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.1 }}
            className="relative pl-6 lg:pl-8"
          >
            <div
              className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-gradient-to-b from-[#4A7DB5] to-[#4A7DB5]/0"
              aria-hidden="true"
            />
            <div className="space-y-5 text-base leading-[1.85] text-neutral-700 dark:text-neutral-300">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
