"use client";

import { motion } from "framer-motion";

type PageHeroProps = {
  headingId: string;
  identity: string;
  headline: string;
  subhead: string;
  eyebrowClass?: string;
  badges?: string[];
};

export function PageHero({
  headingId,
  identity,
  headline,
  subhead,
  eyebrowClass = "text-gold",
  badges,
}: PageHeroProps) {
  return (
    <section aria-labelledby={headingId} className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-navy" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-pattern" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#4A7DB5] opacity-[0.10] blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[300px] w-[400px] rounded-full bg-[#2b4c7e] opacity-[0.12] blur-[80px]" aria-hidden="true" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/30 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A7DB5]" aria-hidden="true" />
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowClass}`}>
              {identity}
            </p>
          </div>
        </motion.div>

        <motion.h1
          id={headingId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
          className="mt-7 max-w-4xl font-display text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-[#94A3B8]"
        >
          {subhead}
        </motion.p>

        {badges && badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {badges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70"
              >
                <span className="h-1 w-1 rounded-full bg-[#4A7DB5]" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
