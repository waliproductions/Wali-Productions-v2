"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

const ALL_SERVICES = [
  {
    title: "Software Engineering",
    description: "Custom enterprise software built for scale, security, and longevity — from microservices to full-stack applications.",
    problem: "Legacy systems and technical debt slowing your organization",
    href: "/services/custom-software",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><path d="M12 2l-3 20" />
      </svg>
    ),
  },
  {
    title: "AI & Intelligent Automation",
    description: "Machine learning integration, process automation, and AI-powered decision systems that drive measurable outcomes.",
    problem: "Manual processes consuming time and resources",
    href: "/services/ai-integration",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" /><path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21M6.3 6.3l3.2 3.2M14.5 14.5l3.2 3.2M17.7 6.3l-3.2 3.2M9.5 14.5l-3.2 3.2" />
      </svg>
    ),
  },
  {
    title: "Cybersecurity & Compliance",
    description: "Zero-trust architecture, threat assessment, vulnerability management, and compliance frameworks for regulated industries.",
    problem: "Exposure to threats and compliance risk",
    href: "/services/security-assessment",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 6v6c0 6 4 10.5 10 12 6-1.5 10-6 10-12V6L12 2z" /><path d="M8 12l3 3 5-6" />
      </svg>
    ),
  },
  {
    title: "Cloud Solutions",
    description: "Cloud migration, architecture design, and managed cloud infrastructure optimized for performance and cost.",
    problem: "Inefficient on-premise infrastructure limiting scalability",
    href: "/services/cloud-migration",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" /><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "IT Consulting & Strategy",
    description: "Strategic technology guidance to align your IT investments with business objectives and long-term growth.",
    problem: "Misalignment between technology investment and business value",
    href: "/services/it-strategy",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Digital Transformation",
    description: "End-to-end digital transformation programs that modernize operations, culture, and technology ecosystems.",
    problem: "Outdated processes preventing competitive advantage",
    href: "/services/digital-transformation",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export function ServicesOverview() {
  const { eyebrow, heading, intro } = homeContent.services;

  return (
    <section
      aria-labelledby="services-heading"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/50"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {eyebrow}
            </p>
            <h2
              id="services-heading"
              className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0D1B2A] sm:text-5xl dark:text-white"
            >
              {heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {intro}
            </p>
          </div>
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#1E3A5F] bg-[#1E3A5F] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2B4C7E] hover:border-[#2B4C7E]"
          >
            All capabilities
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              <path d="M2 7h10M7 2l5 5-5 5" />
            </svg>
          </Link>
        </motion.div>

        {/* Service cards grid */}
        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {ALL_SERVICES.map((service, i) => (
            <motion.li
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" as const, delay: i * 0.07 }}
            >
              <Link
                href={service.href}
                className="group relative flex h-full flex-col rounded-2xl border border-black/8 bg-white p-7 shadow-card transition-all duration-300 hover:border-[#4A7DB5]/30 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
              >
                {/* Icon */}
                <div className="mb-5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FA] text-[#1E3A5F] transition-all duration-300 group-hover:bg-[#1E3A5F] group-hover:text-white dark:bg-white/[0.08] dark:text-[#60a5fa]">
                  {service.icon}
                </div>

                <h3 className="font-display text-lg font-semibold tracking-tight text-[#0D1B2A] dark:text-white">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4 dark:border-white/8">
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#4A7DB5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                      <path d="M1 6l3 3 7-7" />
                    </svg>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">
                      {service.problem}
                    </p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-neutral-300 transition-colors group-hover:text-[#4A7DB5] dark:text-neutral-600">
                    <path d="M2.5 7h9M7 2.5L11.5 7 7 11.5" />
                  </svg>
                </div>

                {/* Hover accent */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl bg-gradient-to-r from-[#1E3A5F] to-[#4A7DB5] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
