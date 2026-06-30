"use client";

import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

const PILLARS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 1L2 4.5v4C2 13.5 5.5 17 10 18.5 14.5 17 18 13.5 18 8.5v-4L10 1z" /><path d="M6.5 10l2.5 2.5 4.5-4.5" />
      </svg>
    ),
    label: "Integrity",
    desc: "Honest, transparent relationships",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 3L7 14l-5-5" /><path d="M18 3l-8 8" />
      </svg>
    ),
    label: "Excellence",
    desc: "Senior-level technical execution",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" /><path d="M7 10l2 2 4-4" />
      </svg>
    ),
    label: "Accountability",
    desc: "Military-grade discipline",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 1v18M1 10h18M4.5 4.5l11 11M15.5 4.5l-11 11" />
      </svg>
    ),
    label: "Innovation",
    desc: "Forward-looking solutions",
  },
];

export function Mission() {
  const { eyebrow, heading, body } = homeContent.mission;

  return (
    <section
      aria-labelledby="mission-heading"
      className="relative overflow-hidden border-t border-black/8 dark:border-white/8"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {eyebrow}
            </p>
            <h2
              id="mission-heading"
              className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-[#0D1B2A] sm:text-5xl dark:text-white"
            >
              {heading}
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                  className="group flex flex-col gap-2.5 rounded-xl border border-black/8 bg-[#F8FAFC] p-4 transition-all hover:border-[#4A7DB5]/20 hover:bg-[#F0F4F8] dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                >
                  <span className="text-[#1E3A5F] dark:text-[#60a5fa]">{p.icon}</span>
                  <span className="text-sm font-semibold text-[#0D1B2A] dark:text-white">{p.label}</span>
                  <span className="text-xs text-neutral-500">{p.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -left-6 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-[#4A7DB5] via-[#4A7DB5]/50 to-transparent" aria-hidden="true" />
            <blockquote className="pl-8">
              <p className="text-lg leading-[1.75] text-neutral-700 dark:text-neutral-300">
                {body}
              </p>
              <footer className="mt-8 flex items-center gap-4 border-t border-black/8 pt-6 dark:border-white/8">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2B4C7E] flex items-center justify-center">
                  <span className="text-sm font-bold text-white">WP</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0D1B2A] dark:text-white">Wali Productions LLC</p>
                  <p className="text-xs text-neutral-500">Veteran-Owned Technology Consulting</p>
                </div>
              </footer>
            </blockquote>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
