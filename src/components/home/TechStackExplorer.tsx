"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="3.5 5 1 8 3.5 11" /><polyline points="12.5 5 15 8 12.5 11" /><path d="M7 2l-2 12" />
      </svg>
    ),
    description: "Modern, performant interfaces built for usability and scale.",
    items: [
      { name: "Next.js 16", detail: "App Router, RSC, static & dynamic rendering" },
      { name: "React 19", detail: "Component architecture, concurrent features" },
      { name: "TypeScript", detail: "Type-safe development across the full stack" },
      { name: "Tailwind CSS", detail: "Utility-first design systems" },
      { name: "Framer Motion", detail: "Production-grade animations and interactions" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="2" width="14" height="5" rx="1.5" /><rect x="1" y="9" width="14" height="5" rx="1.5" /><circle cx="4" cy="4.5" r="0.75" fill="currentColor" stroke="none" /><circle cx="4" cy="11.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
    description: "Scalable APIs and data systems engineered for enterprise workloads.",
    items: [
      { name: "Node.js", detail: "High-throughput event-driven services" },
      { name: "Python", detail: "Data pipelines, scripting, ML backends" },
      { name: "PostgreSQL", detail: "Relational data with ACID guarantees" },
      { name: "REST & GraphQL", detail: "Flexible, standards-based API design" },
      { name: "Redis", detail: "Caching, sessions, message queues" },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="8" cy="8" r="2" /><path d="M8 2v3M8 11v3M2 8h3M11 8h3M4 4l2 2M10 10l2 2M12 4l-2 2M6 10l-2 2" />
      </svg>
    ),
    description: "Intelligent systems that automate decisions and drive measurable outcomes.",
    items: [
      { name: "Large Language Models", detail: "OpenAI, Anthropic — integrated purposefully" },
      { name: "LangChain / Orchestration", detail: "AI workflow and agent pipelines" },
      { name: "Process Automation", detail: "RPA, business workflow engines" },
      { name: "Predictive Analytics", detail: "ML-driven forecasting and insights" },
      { name: "Computer Vision", detail: "Image recognition and analysis pipelines" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Infra",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 11H4a3 3 0 1 1 .4-5.97 4 4 0 1 1 7.2 2.47A3 3 0 0 1 13 11z" />
      </svg>
    ),
    description: "Reliable, cost-optimized cloud infrastructure built to scale and recover.",
    items: [
      { name: "AWS", detail: "EC2, S3, RDS, Lambda, ECS, CloudFront" },
      { name: "Docker & Kubernetes", detail: "Container orchestration at scale" },
      { name: "CI/CD Pipelines", detail: "GitHub Actions, automated testing & deploy" },
      { name: "Infrastructure as Code", detail: "Terraform, AWS CDK — repeatable environments" },
      { name: "Observability", detail: "Logging, alerting, APM, uptime monitoring" },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 1L1.5 4v4c0 3.5 2.8 6 6.5 7 3.7-1 6.5-3.5 6.5-7V4L8 1z" /><path d="M5 8l2 2 4-3.5" />
      </svg>
    ),
    description: "Defense-in-depth architecture aligned to federal and industry frameworks.",
    items: [
      { name: "NIST Cybersecurity Framework", detail: "Risk assessment, controls mapping" },
      { name: "Zero-Trust Architecture", detail: "Identity-first, least-privilege access" },
      { name: "Penetration Testing", detail: "Vulnerability identification and remediation" },
      { name: "FISMA / FedRAMP Alignment", detail: "Federal compliance frameworks" },
      { name: "Secure SDLC", detail: "Security by design from day one" },
    ],
  },
] as const;

type CategoryId = typeof CATEGORIES[number]["id"];

export function TechStackExplorer() {
  const [active, setActive] = useState<CategoryId>("frontend");

  const current = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section
      aria-labelledby="tech-heading"
      className="relative border-t border-black/8 dark:border-white/8"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
            Technology Stack
          </p>
          <h2
            id="tech-heading"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0D1B2A] sm:text-5xl dark:text-white"
          >
            Built on proven, modern technology.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            Every solution is engineered with the right tool for the job — not the technology du jour. Here&apos;s what we work with across domains.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12"
        >
          {/* Tab navigation */}
          <div
            role="tablist"
            aria-label="Technology categories"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={active === cat.id}
                aria-controls={`techpanel-${cat.id}`}
                id={`techtab-${cat.id}`}
                onClick={() => setActive(cat.id)}
                className={[
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  active === cat.id
                    ? "bg-[#1E3A5F] text-white shadow-sm dark:bg-[#2B4C7E]"
                    : "border border-black/8 bg-white text-neutral-600 hover:border-[#4A7DB5]/30 hover:bg-[#F0F4F8] hover:text-[#1E3A5F] dark:border-white/8 dark:bg-white/[0.03] dark:text-neutral-400 dark:hover:bg-white/[0.08] dark:hover:text-white",
                ].join(" ")}
              >
                <span className={active === cat.id ? "text-[#94BBDD]" : ""}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div
            id={`techpanel-${active}`}
            role="tabpanel"
            aria-labelledby={`techtab-${active}`}
            className="mt-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" as const }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {/* Description card */}
                <div className="flex flex-col justify-between rounded-2xl border border-[#4A7DB5]/20 bg-gradient-to-br from-[#1E3A5F] to-[#2B4C7E] p-6 text-white lg:col-span-1">
                  <div>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <span className="text-white">{current.icon}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold">{current.label}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      {current.description}
                    </p>
                  </div>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-[#4A7DB5]">
                    {current.items.length} capabilities
                  </div>
                </div>

                {/* Tech items */}
                {current.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="group flex flex-col gap-2 rounded-2xl border border-black/8 bg-white p-5 shadow-card transition-all duration-200 hover:border-[#4A7DB5]/30 hover:shadow-card-blue dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-display text-sm font-semibold text-[#0D1B2A] dark:text-white">
                        {item.name}
                      </h4>
                      <svg
                        width="12" height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-[#4A7DB5] opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <path d="M2 6h8M6 2l4 4-4 4" />
                      </svg>
                    </div>
                    <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
