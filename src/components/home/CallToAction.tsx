"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

const PATHS = [
  {
    label: "Start a Project",
    href: "/start",
    description: "Share your goals, timeline & budget",
    primary: true,
  },
  {
    label: "Explore Our Services",
    href: "/services",
    description: "See our full capability catalog",
    primary: false,
  },
  {
    label: "Government Contracting",
    href: "/government",
    description: "Federal, state & local agencies",
    primary: false,
  },
];

export function CallToAction() {
  const { heading, body, note } = homeContent.cta;

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#060d1a] via-[#0d1b38] to-[#1e3a5f]" aria-hidden="true" />
      <div className="absolute inset-0 bg-dot-pattern" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#4A7DB5] opacity-[0.12] blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#2b4c7e] opacity-[0.15] blur-[80px]" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/30 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A7DB5]">
              Get Started
            </p>
            <h2
              id="cta-heading"
              className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#94A3B8]">
              {body}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {PATHS.map((path, i) => (
              path.primary ? (
                <Link
                  key={path.href}
                  href={path.href}
                  className="group flex flex-col items-center gap-1 rounded-xl bg-white px-6 py-5 text-[#0D1B2A] shadow-premium transition-all duration-300 hover:bg-white/95 hover:shadow-premium-blue sm:col-span-1"
                >
                  <span className="text-sm font-bold">{path.label}</span>
                  <span className="text-xs text-neutral-500">{path.description}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-1 transition-transform group-hover:translate-x-1">
                    <path d="M3 8h10M8 3l5 5-5 5" />
                  </svg>
                </Link>
              ) : (
                <Link
                  key={path.href}
                  href={path.href}
                  className="group flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-6 py-5 text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  <span className="text-sm font-semibold">{path.label}</span>
                  <span className="text-xs text-white/50">{path.description}</span>
                </Link>
              )
            ))}
          </motion.div>

          {note && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-sm text-white/35"
            >
              {note}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
