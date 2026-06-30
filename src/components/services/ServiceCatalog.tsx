"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { servicesContent } from "@/config/services";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "software": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="5 8 2 11 5 14" /><polyline points="17 8 20 11 17 14" /><path d="M10 3l-2 16" />
    </svg>
  ),
  "ai-automation": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="3" /><path d="M11 3v3.5M11 15.5V19M3 11h3.5M15.5 11H19M5.6 5.6l2.5 2.5M13.9 13.9l2.5 2.5M16.4 5.6l-2.5 2.5M8.1 13.9l-2.5 2.5" />
    </svg>
  ),
  "cybersecurity": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 2L2 6v5c0 5.5 4 9.5 9 11 5-1.5 9-5.5 9-11V6L11 2z" /><path d="M7.5 11l3 3 5-5" />
    </svg>
  ),
  "cloud": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 16H6a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 9.5 4 4 0 0 1 18 16z" />
    </svg>
  ),
  "consulting": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="18" height="14" rx="2" /><path d="M2 8h18M7 19h8M11 17v2" />
    </svg>
  ),
  "government": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20h18M2 13h18M5 13V10M11 13V10M17 13V10M1 10h20L11 3 1 10z" />
    </svg>
  ),
};

export function ServiceCatalog() {
  const { categories } = servicesContent;

  return (
    <section
      id="service-catalog"
      aria-labelledby="service-catalog-heading"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/50"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
            Service Catalog
          </p>
          <h2
            id="service-catalog-heading"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0D1B2A] sm:text-5xl dark:text-white"
          >
            Explore our capabilities
          </h2>
        </motion.div>

        <div className="mt-16 space-y-20">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.05 }}
            >
              {/* Category header */}
              <div className="flex items-start gap-5 border-b border-black/8 pb-7 dark:border-white/8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E3A5F] text-white">
                  {CATEGORY_ICONS[category.id] ?? (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <circle cx="11" cy="11" r="9" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white">
                    {category.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Service detail cards */}
              <ul className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2" role="list">
                {category.services.map((service, si) => (
                  <motion.li
                    key={service.id ?? si}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: si * 0.08 }}
                    className="group relative flex flex-col rounded-2xl border border-black/8 bg-white p-7 shadow-card transition-all duration-300 hover:border-[#4A7DB5]/25 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-display text-lg font-semibold tracking-tight text-[#0D1B2A] dark:text-white">
                        {service.title}
                      </h4>
                      {service.govRelevant && (
                        <span className="shrink-0 rounded-md border border-[#1E3A5F]/20 bg-[#EEF3FA] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#1E3A5F] dark:border-[#4A7DB5]/30 dark:bg-[#4A7DB5]/10 dark:text-[#60a5fa]">
                          Gov
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {service.description}
                    </p>

                    {/* Problem / Solution */}
                    <div className="mt-5 space-y-3">
                      <div className="flex gap-3 rounded-lg bg-[#FEF9EE] p-3.5 dark:bg-[#B8831A]/10">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#B8831A" strokeWidth="1.5" strokeLinecap="round" className="mt-0.5 shrink-0" aria-hidden="true">
                          <circle cx="8" cy="8" r="6.5" /><path d="M8 5v3M8 10.5h.01" />
                        </svg>
                        <p className="text-xs leading-relaxed text-[#92650E] dark:text-[#D4A634]">
                          <span className="font-semibold">Challenge: </span>{service.problem}
                        </p>
                      </div>
                      <div className="flex gap-3 rounded-lg bg-[#EEF3FA] p-3.5 dark:bg-[#1E3A5F]/20">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" className="mt-0.5 shrink-0 dark:[stroke:#60a5fa]" aria-hidden="true">
                          <path d="M13 3L6 10l-3-3" />
                        </svg>
                        <p className="text-xs leading-relaxed text-[#1E3A5F] dark:text-[#93c5fd]">
                          <span className="font-semibold">Solution: </span>{service.solution}
                        </p>
                      </div>
                    </div>

                    {/* Benefits */}
                    <ul className="mt-5 space-y-2" aria-label={`Benefits of ${service.title}`}>
                      {service.benefits.map((benefit, bi) => (
                        <li key={bi} className="flex items-start gap-2.5">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4A7DB5" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                            <path d="M2 7l3.5 3.5 6.5-7" />
                          </svg>
                          <span className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Outcomes */}
                    <div className="mt-5 border-t border-black/8 pt-4 dark:border-white/8">
                      <p className="text-xs text-neutral-500 dark:text-neutral-500">
                        <span className="font-semibold text-[#0D1B2A] dark:text-neutral-300">Outcome: </span>
                        {service.outcomes}
                      </p>
                    </div>

                    {/* CTAs */}
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      {service.id && (
                        <Link
                          href={`/services/${service.id}`}
                          className="group/cta inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A5F] transition-colors hover:text-[#4A7DB5] dark:text-[#60a5fa] dark:hover:text-[#93c5fd]"
                        >
                          Learn more
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover/cta:translate-x-0.5">
                            <path d="M2 6h8M5 2.5L9.5 6 5 9.5" />
                          </svg>
                        </Link>
                      )}
                      <Link
                        href={`/start?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition-all hover:border-[#4A7DB5]/30 hover:bg-[#EEF3FA] hover:text-[#1E3A5F] dark:border-white/10 dark:text-neutral-400 dark:hover:border-[#4A7DB5]/40 dark:hover:bg-[#1E3A5F]/20 dark:hover:text-white"
                      >
                        Request this service
                      </Link>
                    </div>

                    {/* Hover accent */}
                    <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl bg-gradient-to-r from-[#1E3A5F] to-[#4A7DB5] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
