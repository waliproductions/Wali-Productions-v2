"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type GradientCTAProps = {
  id?: string;
  heading: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
  note?: string;
  glowSide?: "left" | "right";
};

export function GradientCTA({
  id,
  heading,
  body,
  primaryCta,
  secondaryLink,
  note,
  glowSide = "right",
}: GradientCTAProps) {
  const glowClass =
    glowSide === "left"
      ? "pointer-events-none absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-[#4A7DB5] opacity-[0.12] blur-[100px]"
      : "pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-[#4A7DB5] opacity-[0.12] blur-[100px]";

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-navy" aria-hidden="true" />
      <div className="absolute inset-0 bg-dot-pattern" aria-hidden="true" />
      <div className={glowClass} aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/30 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              id={id ? `${id}-heading` : undefined}
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              {heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#94A3B8]">{body}</p>
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
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0D1B2A] shadow-premium transition-all duration-300 hover:bg-white/95 hover:shadow-premium-blue"
            >
              {primaryCta.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
            {secondaryLink && (
              <Link
                href={secondaryLink.href}
                className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {secondaryLink.label}
              </Link>
            )}
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
