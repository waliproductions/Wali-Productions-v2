"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CLIENT_TYPES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18M3 10L11 3l8 7M11 21V11" />
        <rect x="7" y="14" width="4" height="7" rx="0.5" />
      </svg>
    ),
    type: "Government Agencies",
    subtitle: "Federal, state & local",
    description:
      "Technology services built for public sector standards — NIST-aligned security, Section 508 accessibility, thorough documentation, and Veteran-Owned set-aside eligibility.",
    highlights: ["FISMA / NIST alignment", "Section 508 compliance", "VOSB set-aside eligible", "Detailed project documentation"],
    cta: { label: "Government capabilities", href: "/government" },
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="18" height="14" rx="2" />
        <path d="M7 7V5a4 4 0 0 1 8 0v2" />
        <circle cx="11" cy="14" r="2" />
      </svg>
    ),
    type: "Small & Mid-Size Business",
    subtitle: "Startups to established firms",
    description:
      "Enterprise-quality technology without enterprise overhead. We help growing businesses build the systems, automation, and digital infrastructure that scale with them.",
    highlights: ["Custom software & web applications", "Business process automation", "Technology strategy", "Scalable architecture"],
    cta: { label: "Explore our services", href: "/services" },
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 2L2 6v5c0 5 3.5 9 9 10.5C17 19 20 15 20 11V6L11 2z" />
      </svg>
    ),
    type: "Nonprofits & Ministries",
    subtitle: "Mission-driven organizations",
    description:
      "Technology that advances your mission without consuming your budget. We've served faith-based organizations and nonprofits with the same professionalism we bring to enterprise clients.",
    highlights: ["Mission-aligned pricing discussions", "Website & web applications", "Livestream & media production", "Donor & member systems"],
    cta: { label: "Start a conversation", href: "/start" },
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="9" />
        <path d="M11 6v5l4 2" />
      </svg>
    ),
    type: "Professional Services",
    subtitle: "Law, finance, consulting & more",
    description:
      "Specialized technology solutions for professional services firms — client portals, secure data handling, process automation, and digital presence that reflects your caliber.",
    highlights: ["Client-facing portals", "Secure data architecture", "Document automation", "Professional web presence"],
    cta: { label: "View our work", href: "/portfolio" },
  },
];

export function ClientTypes() {
  return (
    <section
      aria-labelledby="client-types-heading"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/40"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Who We Serve
          </p>
          <h2
            id="client-types-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
          >
            Technology for every mission type.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            We bring the same senior-level professionalism to every client — from federal agencies to local ministries.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CLIENT_TYPES.map((client, i) => (
            <motion.div
              key={client.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col rounded-2xl border border-black/8 bg-white p-7 shadow-card transition-all duration-300 hover:border-[#4A7DB5]/30 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FA] text-[#1E3A5F] transition-colors group-hover:bg-[#1E3A5F] group-hover:text-white dark:bg-white/[0.08] dark:text-[#60a5fa]">
                  {client.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-[#0D1B2A] dark:text-white">
                    {client.type}
                  </h3>
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {client.subtitle}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {client.description}
              </p>

              <ul className="mt-5 space-y-2" role="list">
                {client.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#4A7DB5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-black/8 dark:border-white/8">
                <Link
                  href={client.cta.href}
                  className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A5F] transition-colors hover:text-[#4A7DB5] dark:text-[#60a5fa] dark:hover:text-[#93c5fd]"
                >
                  {client.cta.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover/link:translate-x-0.5">
                    <path d="M2.5 7h9M7 2.5L11.5 7 7 11.5" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
