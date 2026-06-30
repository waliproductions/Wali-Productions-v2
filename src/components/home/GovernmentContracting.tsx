"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

const GOV_CERTIFICATIONS = [
  { label: "Veteran-Owned Small Business", abbr: "VOSB" },
  { label: "SAM.gov Registration in Preparation", abbr: "SAM" },
  { label: "Government Contracting Ready", abbr: "GOV" },
];

export function GovernmentContracting() {
  const { eyebrow, heading, body, items } = homeContent.government;

  return (
    <section aria-labelledby="government-heading" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-navy" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-pattern" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-48 bottom-0 h-[600px] w-[600px] rounded-full bg-[#4A7DB5] opacity-[0.08] blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#2b4c7e] opacity-[0.12] blur-[80px]" aria-hidden="true" />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/30 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A7DB5]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
              {eyebrow}
            </p>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">

          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              id="government-heading"
              className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
            >
              {heading}
            </h2>
            <p className="mt-6 text-base leading-[1.8] text-[#94A3B8]">
              {body}
            </p>

            {/* Certifications */}
            <div className="mt-8 flex flex-wrap gap-3">
              {GOV_CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.abbr}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                >
                  <span className="text-xs font-bold text-[#4A7DB5]">{cert.abbr}</span>
                  <span className="text-xs text-white/60">{cert.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/government"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/15"
            >
              View government capabilities
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                <path d="M2 7h10M7 2l5 5-5 5" />
              </svg>
            </Link>
          </motion.div>

          {/* Right: numbered capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.15 }}
            className="space-y-0"
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group flex gap-6 border-b border-white/[0.07] py-7 first:pt-0 last:border-0 last:pb-0"
              >
                <div className="shrink-0 flex flex-col items-center">
                  <span
                    className="select-none font-display text-5xl font-bold text-white/10 transition-colors group-hover:text-white/20"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
