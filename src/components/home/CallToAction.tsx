"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

export function CallToAction() {
  const { heading, body, primaryCta, note } = homeContent.cta;

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden"
    >
      {/* Background */}
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
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0D1B2A] shadow-premium transition-all duration-300 hover:bg-white/95 hover:shadow-premium-blue focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B2A]"
            >
              {primaryCta.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Explore our services
            </Link>
          </motion.div>

          {note && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-sm text-white/35"
            >
              {note}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
