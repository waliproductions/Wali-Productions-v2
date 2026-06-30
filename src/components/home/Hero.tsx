"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

const CAPABILITIES = [
  {
    label: "Software Engineering",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="3.5 5 1 8 3.5 11" /><polyline points="12.5 5 15 8 12.5 11" /><path d="M7 2l-2 12" />
      </svg>
    ),
  },
  {
    label: "AI & Intelligent Automation",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="8" cy="8" r="2" /><path d="M8 2v3M8 11v3M2 8h3M11 8h3M4 4l2 2M10 10l2 2M12 4l-2 2M6 10l-2 2" />
      </svg>
    ),
  },
  {
    label: "Cybersecurity & Compliance",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 1L1.5 4v4c0 3.5 2.8 6 6.5 7 3.7-1 6.5-3.5 6.5-7V4L8 1z" /><path d="M5 8l2 2 4-3.5" />
      </svg>
    ),
  },
  {
    label: "Cloud Solutions & Infrastructure",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 11H4a3 3 0 1 1 .4-5.97 4 4 0 1 1 7.2 2.47A3 3 0 0 1 13 11z" />
      </svg>
    ),
  },
  {
    label: "Government IT Contracting",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 15h14M1 9h14M3.5 9V7M8 9V7M12.5 9V7M1 7h14M8 1L1 7" />
      </svg>
    ),
  },
  {
    label: "Digital Transformation",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 8h4.5M10.5 8H15M8 1v4.5M8 10.5V15" /><circle cx="8" cy="8" r="2.5" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
  }),
};

export function Hero() {
  const { eyebrow, headline, subhead, primaryCta, secondaryCta, trustBadges } = homeContent.hero;

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-navy" aria-hidden="true" />
      <div className="absolute inset-0 bg-dot-pattern" aria-hidden="true" />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -right-48 -top-48 h-[800px] w-[800px] rounded-full bg-[#2b4c7e] opacity-[0.12] blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[500px] w-[500px] rounded-full bg-[#4A7DB5] opacity-[0.10] blur-[100px]" aria-hidden="true" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/50 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-36">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* Left: content */}
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4A7DB5]" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
                  {eyebrow}
                </p>
              </div>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
              className="mt-7 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {headline.split(". ").map((part, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? (
                    <span className="text-gradient-blue">{part}</span>
                  ) : (
                    part + ". "
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
              className="mt-7 max-w-xl text-lg leading-relaxed text-[#94A3B8]"
            >
              {subhead}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.3}
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0D1B2A] shadow-premium transition-all duration-300 hover:bg-white/95 hover:shadow-premium-blue focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B2A]"
              >
                {primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 8h10M8 3l5 5-5 5" />
                </svg>
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/8 hover:text-white"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.4}
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-8"
            >
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1L1 3.5v3.5C1 10.5 3.5 13 7 14c3.5-1 6-3.5 6-7V3.5L7 1z" fill="none" stroke="rgba(74,125,181,0.7)" strokeWidth="1" />
                    <path d="M4.5 7l2 2 3-3" stroke="rgba(74,125,181,0.7)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs font-medium text-[#64748B]">{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: capability cards */}
          <div className="hidden lg:block" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.2 }}
            >
              {/* Glass container */}
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/40 to-transparent" />

                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#4A7DB5]">
                  Core Capabilities
                </p>

                <div className="space-y-2">
                  {CAPABILITIES.map((cap, i) => (
                    <motion.div
                      key={cap.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 + i * 0.07 }}
                      className="group flex items-center gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3.5 transition-all duration-300 hover:border-[#4A7DB5]/30 hover:bg-white/[0.08]"
                    >
                      <span className="shrink-0 text-[#4A7DB5] transition-colors group-hover:text-[#60a5fa]">
                        {cap.icon}
                      </span>
                      <span className="text-sm font-medium text-white/80 transition-colors group-hover:text-white">
                        {cap.label}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-[#4A7DB5]">
                        <path d="M2 6h8M6 2l4 4-4 4" />
                      </svg>
                    </motion.div>
                  ))}
                </div>

                <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
}
