"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const TOPIC_CARDS = [
  {
    category: "Buyer Education",
    title: "How to Choose a Technology Consultant",
    description:
      "Key questions to ask before engaging an IT firm — and what honest, professional answers look like. Covers scope clarity, pricing transparency, past performance, and communication standards.",
    tags: ["IT Consulting", "Procurement", "Small Business"],
    cta: { label: "Start a Project", href: "/start" },
  },
  {
    category: "Government Contracting",
    title: "What Is a Capability Statement and Why Does It Matter?",
    description:
      "A capability statement is the standard one-page document that government contracting officers use to evaluate vendors. Learn what it contains, why accuracy matters, and how to use it effectively.",
    tags: ["Government", "VOSB", "Procurement"],
    cta: { label: "View Ours", href: "/capability-statement" },
  },
  {
    category: "AI & Automation",
    title: "AI Integration: What It Is and What It Isn't",
    description:
      "Practical AI integration is about solving specific problems — not deploying AI for its own sake. This overview covers what modern AI tools actually do, where they create value, and what governance looks like in practice.",
    tags: ["AI", "Automation", "Strategy"],
    cta: { label: "Learn About AI Services", href: "/services/ai-integration" },
  },
  {
    category: "Cybersecurity",
    title: "Cybersecurity Basics for Small Businesses and Nonprofits",
    description:
      "Most small organizations don't need a six-figure security program — they need a few key controls implemented correctly. This guide covers the fundamentals: access controls, backups, email security, and patch management.",
    tags: ["Cybersecurity", "Small Business", "Nonprofits"],
    cta: { label: "Security Services", href: "/services/security-assessment" },
  },
  {
    category: "Government Contracting",
    title: "How Government Technology Procurement Works",
    description:
      "An overview of the federal and state procurement process — from solicitation types (RFQ, RFP, IDIQ) to small business set-asides, past performance, and what contracting officers look for in vendors.",
    tags: ["Government", "Federal IT", "Contracting"],
    cta: { label: "Government Services", href: "/government" },
  },
  {
    category: "Digital Transformation",
    title: "Digital Transformation: A Plain-Language Guide",
    description:
      "Digital transformation doesn't mean buying new software. It means redesigning how your organization uses technology to deliver value. This primer cuts through the jargon and explains what it actually requires.",
    tags: ["Digital Transformation", "Strategy", "Leadership"],
    cta: { label: "Consulting Services", href: "/services/technology-strategy" },
  },
  {
    category: "Cloud Solutions",
    title: "Cloud Migration: Questions to Answer Before You Start",
    description:
      "Cloud migration projects fail when organizations skip planning. This guide covers the critical questions to answer before moving any workload: cost, compliance, security, vendor lock-in, and transition risk.",
    tags: ["Cloud", "Migration", "Infrastructure"],
    cta: { label: "Cloud Services", href: "/services/cloud-migration" },
  },
  {
    category: "Security & Compliance",
    title: "Understanding NIST and Why It Matters for Your Organization",
    description:
      "The NIST Cybersecurity Framework is the most widely referenced security standard in the U.S. — for government contractors, healthcare organizations, and increasingly all businesses. Here's what it is and how to use it.",
    tags: ["NIST", "Compliance", "Cybersecurity"],
    cta: { label: "Compliance Services", href: "/services/compliance-framework" },
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Buyer Education": "bg-[#EEF3FA] text-[#1E3A5F] dark:bg-[#1E3A5F]/30 dark:text-[#93c5fd]",
  "Government Contracting": "bg-[#FEF9EE] text-[#92650E] dark:bg-[#B8831A]/20 dark:text-[#D4A634]",
  "AI & Automation": "bg-[#F0FDF4] text-[#166534] dark:bg-green-900/30 dark:text-green-300",
  "Cybersecurity": "bg-[#FFF1F2] text-[#9F1239] dark:bg-rose-900/30 dark:text-rose-300",
  "Digital Transformation": "bg-[#EEF3FA] text-[#1E3A5F] dark:bg-[#1E3A5F]/30 dark:text-[#93c5fd]",
  "Cloud Solutions": "bg-[#F5F3FF] text-[#5B21B6] dark:bg-violet-900/30 dark:text-violet-300",
  "Security & Compliance": "bg-[#FFF1F2] text-[#9F1239] dark:bg-rose-900/30 dark:text-rose-300",
};

export function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="resources-hero-heading" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d1a] via-[#0d1b38] to-[#1e3a5f]" aria-hidden="true" />
        <div className="absolute inset-0 bg-dot-pattern" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-[#2b4c7e] opacity-[0.15] blur-[100px]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/40 to-transparent" aria-hidden="true" />

        <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
                Resources & Insights
              </span>
            </div>
            <h1
              id="resources-hero-heading"
              className="max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Buyer education and technology guidance.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#94A3B8]">
              Practical overviews on technology consulting, government procurement, cybersecurity, AI, and digital transformation — written to help buyers make better decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Topic cards */}
      <section
        aria-labelledby="topics-heading"
        className="border-t border-black/8 dark:border-white/8"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-xl"
          >
            <h2
              id="topics-heading"
              className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white"
            >
              Topic overviews
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Each topic is designed to give buyers honest, accurate context — not a sales pitch. These aren't blog posts; they're reference guides on questions we hear most often.
            </p>
          </motion.div>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2" role="list">
            {TOPIC_CARDS.map((card, i) => (
              <motion.li
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                className="group flex flex-col rounded-2xl border border-black/8 bg-white shadow-card transition-all duration-300 hover:border-[#4A7DB5]/25 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03]"
              >
                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${CATEGORY_COLORS[card.category] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"}`}
                    >
                      {card.category}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold tracking-tight text-[#0D1B2A] dark:text-white">
                    {card.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {card.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-black/8 px-2.5 py-0.5 text-[11px] font-medium text-neutral-500 dark:border-white/8 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-black/8 pt-5 dark:border-white/8">
                    <Link
                      href={card.cta.href}
                      className="group/cta inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A5F] transition-colors hover:text-[#4A7DB5] dark:text-[#60a5fa] dark:hover:text-[#93c5fd]"
                    >
                      {card.cta.label}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="transition-transform group-hover/cta:translate-x-0.5"
                      >
                        <path d="M2 6h8M6 2l4 4-4 4" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="h-0.5 w-full rounded-b-2xl bg-gradient-to-r from-[#1E3A5F] to-[#4A7DB5] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/40">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
              Ready to Act?
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white">
              Have a specific question or project?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              The fastest way to get clarity is a direct conversation. Tell us about your challenge and we'll give you an honest assessment.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/start"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#1E3A5F] px-8 py-4 text-base font-semibold text-white shadow-card transition-all duration-300 hover:bg-[#2B4C7E] hover:shadow-card-blue"
              >
                Start a Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 8h10M8 3l5 5-5 5" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-black/15 px-8 py-4 text-base font-semibold text-[#0D1B2A] transition-all hover:border-[#4A7DB5]/40 hover:bg-[#EEF3FA] dark:border-white/15 dark:text-white dark:hover:bg-white/5"
              >
                Browse Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
