"use client";

import { motion } from "framer-motion";

const BADGES = [
  "No commitment required",
  "Response within 24 hours",
  "Veteran-Owned",
];

export function StartHero() {
  return (
    <section
      aria-labelledby="start-hero-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#060d1a] via-[#0d1b38] to-[#1e3a5f]" aria-hidden="true" />
      <div className="absolute inset-0 bg-dot-pattern" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-[#2b4c7e] opacity-[0.15] blur-[100px]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/40 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4A7DB5]/30 bg-[#4A7DB5]/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A7DB5]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94c5f8]">
              Start a Project
            </span>
          </div>

          <h1
            id="start-hero-heading"
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Tell us about your{" "}
            <span className="text-gradient-blue">project.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#94A3B8]">
            Share your goals, timeline, and budget and we&apos;ll give you an honest
            assessment and a clear proposal — no sales pressure, no obligation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <circle cx="5" cy="5" r="4" stroke="#4A7DB5" strokeWidth="1.25" />
                  <path d="M3 5l1.5 1.5L7 3.5" stroke="#4A7DB5" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
