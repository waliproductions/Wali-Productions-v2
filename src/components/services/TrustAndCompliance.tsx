"use client";

import { motion } from "framer-motion";

const PRACTICES = [
  {
    title: "Secure Development Lifecycle",
    description:
      "Security is built into every phase — requirements, design, implementation, testing, and deployment. We follow OWASP and NIST guidance rather than treating security as a post-delivery concern.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 1L1.5 4.5v5C1.5 14.5 5 18 10 19.5 15 18 18.5 14.5 18.5 9.5v-5L10 1z" />
      </svg>
    ),
  },
  {
    title: "Documentation Standards",
    description:
      "Every engagement produces version-controlled documentation: architecture diagrams, API specifications, deployment runbooks, and user guides. Clients receive everything needed to operate or extend their system.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="2" width="14" height="16" rx="1.5" />
        <path d="M7 7h6M7 10h6M7 13h4" />
      </svg>
    ),
  },
  {
    title: "Change Management",
    description:
      "Scope changes are never executed without formal change order review and client approval. We maintain a change log throughout every engagement so there are no billing surprises or delivery surprises.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 10h12M10 4l6 6-6 6" />
      </svg>
    ),
  },
  {
    title: "Quality Assurance",
    description:
      "Acceptance criteria are defined at the start of every project phase. Deliverables go through code review, functional testing, and security review before client acceptance — not after.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" />
        <path d="M6.5 10l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
  {
    title: "Responsible AI Governance",
    description:
      "AI integrations are scoped with defined human oversight, auditability requirements, and output review processes. We do not deploy AI into high-stakes workflows without appropriate safeguards and transparency.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="10" height="7" rx="1.5" />
        <path d="M10 9v9M5 15h10" />
        <circle cx="10" cy="5.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Project Governance & Reporting",
    description:
      "Every engagement includes a structured kickoff, defined milestone checkpoints, written status updates, and a formal close-out package. Clients always know where their project stands.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="16" height="16" rx="1.5" />
        <path d="M2 7h16M6 2v5M14 2v5" />
      </svg>
    ),
  },
];

export function TrustAndCompliance() {
  return (
    <section
      id="trust-compliance"
      aria-labelledby="trust-heading"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/40"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Governance & Standards
          </p>
          <h2
            id="trust-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
          >
            How we deliver — and how you stay in control.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            Enterprise and government clients need more than technical capability — they need a partner with defined processes, documentation discipline, and proven governance. These are the standards we hold ourselves to on every engagement.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRACTICES.map((practice, i) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
              className="group rounded-xl border border-black/8 bg-white p-6 shadow-card transition-all duration-300 hover:border-[#4A7DB5]/25 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF3FA] text-[#1E3A5F] transition-colors group-hover:bg-[#4A7DB5]/10 group-hover:text-[#4A7DB5] dark:bg-white/[0.06] dark:text-[#60a5fa]">
                {practice.icon}
              </div>
              <h3 className="font-display text-sm font-semibold text-[#0D1B2A] dark:text-white">
                {practice.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {practice.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
