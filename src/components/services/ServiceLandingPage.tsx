"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceDetail } from "@/config/services";

type Props = {
  service: ServiceDetail;
  categoryTitle: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

export function ServiceLandingPage({ service, categoryTitle }: Props) {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="service-hero-heading" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d1a] via-[#0d1b38] to-[#1e3a5f]" aria-hidden="true" />
        <div className="absolute inset-0 bg-dot-pattern" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-64 -top-64 h-[700px] w-[700px] rounded-full bg-[#2b4c7e] opacity-[0.15] blur-[120px]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/40 to-transparent" aria-hidden="true" />

        <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/50">
              <Link href="/services" className="transition-colors hover:text-white/80">
                Services
              </Link>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M4 2l4 4-4 4" />
              </svg>
              <span className="text-white/70">{categoryTitle}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M4 2l4 4-4 4" />
              </svg>
              <span className="text-white/90">{service.title}</span>
            </nav>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={0.05} variants={fadeUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
                {categoryTitle}
              </span>
            </div>
          </motion.div>

          <motion.h1
            id="service-hero-heading"
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[#94A3B8]"
          >
            {service.description}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href={`/start?service=${encodeURIComponent(service.title)}`}
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0D1B2A] shadow-premium transition-all duration-300 hover:bg-white/95 hover:shadow-premium-blue"
            >
              Request This Service
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white/90 transition-all duration-300 hover:border-white/40 hover:bg-white/8"
            >
              View All Services
            </Link>
          </motion.div>

          {service.govRelevant && (
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.4}
              variants={fadeUp}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#4A7DB5]/30 bg-[#4A7DB5]/10 px-4 py-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#60a5fa" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 1L1 3v2.5C1 8.5 3 11 6 12c3-1 5-3.5 5-6.5V3L6 1z" />
              </svg>
              <span className="text-xs font-medium text-[#93c5fd]">
                Government-relevant capability · VOSB eligible
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Challenge + Solution */}
      <section
        aria-labelledby="challenge-heading"
        className="border-t border-black/8 dark:border-white/8"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-[#FEF9EE] px-3 py-1.5 dark:bg-[#B8831A]/10">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#B8831A" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <circle cx="7" cy="7" r="5.5" /><path d="M7 4.5v3M7 9h.01" />
                </svg>
                <span className="text-xs font-semibold text-[#92650E] dark:text-[#D4A634]">
                  The Challenge
                </span>
              </div>
              <h2
                id="challenge-heading"
                className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white"
              >
                The problem we solve
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                {service.problem}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-[#EEF3FA] px-3 py-1.5 dark:bg-[#1E3A5F]/30">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" className="dark:[stroke:#60a5fa]" aria-hidden="true">
                  <path d="M2.5 7l3.5 3.5 5.5-6" />
                </svg>
                <span className="text-xs font-semibold text-[#1E3A5F] dark:text-[#93c5fd]">
                  Our Approach
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white">
                How we solve it
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                {service.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        aria-labelledby="benefits-heading"
        className="border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/40"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
              What You Get
            </p>
            <h2
              id="benefits-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
            >
              Key benefits
            </h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.06 }}
                className="flex items-start gap-4 rounded-xl border border-black/8 bg-white p-5 shadow-card dark:border-white/8 dark:bg-white/[0.03]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FA] dark:bg-[#4A7DB5]/10">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4A7DB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 7l3.5 3.5 6.5-7" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section
        aria-labelledby="deliverables-heading"
        className="border-t border-black/8 dark:border-white/8"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
                What We Deliver
              </p>
              <h2
                id="deliverables-heading"
                className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
              >
                Deliverables
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                Every engagement produces concrete, documented outputs your team can operate and extend.
              </p>
              <ul className="mt-8 space-y-3" aria-label="Deliverables list">
                {service.deliverables.map((d, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E3A5F] dark:bg-[#4A7DB5]/30">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M1.5 5l2.5 2.5 4.5-5" />
                      </svg>
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div>
              {/* Ideal Clients */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-xl border border-black/8 bg-[#F8FAFC] p-7 dark:border-white/8 dark:bg-white/[0.03]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
                  Best Fit For
                </p>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-[#0D1B2A] dark:text-white">
                  Who this service is for
                </h3>
                <ul className="mt-5 space-y-2.5" aria-label="Ideal clients">
                  {service.idealFor.map((client, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A7DB5]" aria-hidden="true" />
                      {client}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Outcome */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-5 rounded-xl border border-[#1E3A5F]/20 bg-[#EEF3FA] p-7 dark:border-[#4A7DB5]/25 dark:bg-[#1E3A5F]/20"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] dark:text-[#60a5fa]">
                  Expected Outcome
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#1E3A5F] dark:text-[#93c5fd]">
                  {service.outcomes}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d1a] via-[#0d1b38] to-[#1e3a5f]" aria-hidden="true" />
        <div className="absolute inset-0 bg-dot-pattern" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/30 to-transparent" aria-hidden="true" />

        <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started with {service.title.toLowerCase()}?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#94A3B8]">
              Tell us about your project and we'll respond within 24 hours with an honest assessment. No commitment required.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={`/start?service=${encodeURIComponent(service.title)}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0D1B2A] shadow-premium transition-all duration-300 hover:bg-white/95 hover:shadow-premium-blue"
              >
                Request This Service
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 8h10M8 3l5 5-5 5" />
                </svg>
              </Link>
              <Link
                href="/capability-statement"
                className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                View capability statement
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/35">
              Veteran-Owned · No commitment required · Response within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
