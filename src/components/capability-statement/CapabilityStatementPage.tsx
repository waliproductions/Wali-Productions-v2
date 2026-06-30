"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { governmentContent } from "@/config/government";

const TECH_STACK = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 / CSS3"],
  },
  {
    category: "Backend & APIs",
    items: ["Node.js", "Python", "REST APIs", "GraphQL", "Serverless"],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "Azure", "Linux", "Docker", "CI/CD Pipelines"],
  },
  {
    category: "Security",
    items: ["NIST Frameworks", "Zero Trust Architecture", "OWASP", "FISMA Alignment", "Vulnerability Assessment"],
  },
  {
    category: "AI & Data",
    items: ["OpenAI / LLM Integration", "LangChain", "Machine Learning", "Business Process Automation", "Data Pipelines"],
  },
  {
    category: "Media & Broadcast",
    items: ["OBS Studio", "Live Streaming", "Multi-platform Broadcast", "Video Production", "Podcast Production"],
  },
];

const CORE_SERVICES = [
  "Custom Software Development",
  "Web Application Development",
  "AI Integration & Intelligent Automation",
  "Business Process Automation",
  "Cybersecurity Assessment & Architecture",
  "Compliance Framework Implementation (NIST, FISMA, HIPAA)",
  "Cloud Migration & Infrastructure Modernization",
  "IT Consulting & Technology Strategy",
  "Linux & Systems Administration",
  "Government Technology Services",
  "Digital Transformation Consulting",
  "Media & Livestream Production",
];

const INDUSTRIES = [
  "Federal Government (Civilian & Defense)",
  "State & Local Government",
  "Healthcare & Life Sciences",
  "Financial Services",
  "Nonprofit & Faith-Based Organizations",
  "Education & Research",
  "Small & Mid-Size Business",
  "Professional Services",
];

const DIFFERENTIATORS = [
  {
    title: "Veteran-Owned Small Business (VOSB)",
    body: "Eligible for government set-aside contracting under veteran-owned small business preferences. Government contracting registrations in preparation.",
  },
  {
    title: "Senior-Level Technical Delivery",
    body: "Every engagement is handled by senior practitioners — no junior developers, no knowledge transfer tax. Clients work with the decision-maker.",
  },
  {
    title: "Security-First Architecture",
    body: "All solutions are designed with security by design — not patched in after delivery. Federal security frameworks (NIST, FISMA) guide our approach.",
  },
  {
    title: "Documentation-Driven Engineering",
    body: "Projects are planned, version-controlled, and documented to standards required for enterprise and government acceptance.",
  },
  {
    title: "Transparent Communication",
    body: "Honest assessments, clear reporting, and no surprises. We tell clients what they need to hear, not just what they want to hear.",
  },
];

export function CapabilityStatementPage() {
  const { competencies } = governmentContent;

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="cap-heading" className="relative overflow-hidden">
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
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8831A]/30 bg-[#B8831A]/10 px-4 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a84b]">
                Capability Statement
              </span>
            </div>
            <h1
              id="cap-heading"
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Wali Productions LLC
            </h1>
            <p className="mt-3 text-lg font-medium text-[#60a5fa]">
              Enterprise Technology Consulting · Veteran-Owned Small Business
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#94A3B8]">
              We deliver advanced technology consulting, cybersecurity, AI integration, software engineering, and digital transformation services for government agencies and commercial enterprises.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["VOSB — Veteran-Owned Small Business", "Government Contracting Ready", "Enterprise-Grade Security", "Section 508 Accessibility"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <section
        aria-labelledby="services-heading"
        className="border-t border-black/8 dark:border-white/8"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
              Core Competencies
            </p>
            <h2
              id="services-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
            >
              Services & capabilities
            </h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-center gap-3 rounded-xl border border-black/8 bg-white px-4 py-3.5 shadow-card dark:border-white/8 dark:bg-white/[0.03]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4A7DB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 7l3.5 3.5 5.5-7" />
                </svg>
                <span className="text-sm font-medium text-[#0D1B2A] dark:text-white">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section
        aria-labelledby="tech-heading"
        className="border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/40"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
              Technical Depth
            </p>
            <h2
              id="tech-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
            >
              Technology stack
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              Our practitioners work across the full enterprise technology spectrum with deep expertise in modern, production-grade tools.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border border-black/8 bg-white p-6 shadow-card dark:border-white/8 dark:bg-white/[0.03]"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#4A7DB5]">
                  {group.category}
                </p>
                <ul className="mt-4 space-y-2" role="list">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#0D1B2A] dark:text-neutral-200">
                      <span className="h-1 w-1 rounded-full bg-[#4A7DB5] shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section
        aria-labelledby="industries-heading"
        className="border-t border-black/8 dark:border-white/8"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
                Markets Served
              </p>
              <h2
                id="industries-heading"
                className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
              >
                Industries & sectors
              </h2>
              <ul className="mt-8 space-y-3" role="list">
                {INDUSTRIES.map((industry) => (
                  <li key={industry} className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4A7DB5] shrink-0" aria-hidden="true" />
                    {industry}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
                {competencies.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white">
                Core competency areas
              </h3>
              <div className="mt-8 space-y-5">
                {competencies.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <p className="font-display text-sm font-semibold text-[#0D1B2A] dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section
        aria-labelledby="diff-heading"
        className="border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/40"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
              Why Wali Productions
            </p>
            <h2
              id="diff-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
            >
              Competitive differentiators
            </h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border border-black/8 bg-white p-6 shadow-card dark:border-white/8 dark:bg-white/[0.03]"
              >
                <div className="mb-3 h-0.5 w-6 rounded-full bg-[#4A7DB5]" />
                <h3 className="font-display text-sm font-semibold text-[#0D1B2A] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
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
              Ready to discuss your requirements?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#94A3B8]">
              Contact us to discuss government contracting opportunities, request a full capability statement document, or begin a technology engagement.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/start"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0D1B2A] shadow-premium transition-all duration-300 hover:bg-white/95 hover:shadow-premium-blue"
              >
                Start a Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 8h10M8 3l5 5-5 5" />
                </svg>
              </Link>
              <Link
                href="/government"
                className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                View government page
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/35">
              VOSB · Government Contracting Ready · Response within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
