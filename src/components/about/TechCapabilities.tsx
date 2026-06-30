"use client";

import { motion } from "framer-motion";

const CAPABILITY_AREAS = [
  {
    area: "Web & Software Engineering",
    items: ["React / Next.js", "TypeScript", "Node.js", "Python", "REST & GraphQL APIs", "PostgreSQL / MongoDB"],
  },
  {
    area: "AI & Automation",
    items: ["Large Language Models", "LangChain / RAG pipelines", "Business process automation", "Machine learning integration", "Data pipeline engineering"],
  },
  {
    area: "Cybersecurity",
    items: ["NIST / FISMA alignment", "Zero-trust architecture", "Vulnerability assessment", "OWASP secure coding", "Compliance documentation", "Security hardening"],
  },
  {
    area: "Cloud & Infrastructure",
    items: ["AWS & Azure", "Linux systems administration", "Docker / containers", "CI/CD pipelines", "Cloud migration", "Monitoring & alerting"],
  },
  {
    area: "Government & Compliance",
    items: ["Section 508 accessibility", "FISMA / FedRAMP awareness", "HIPAA-conscious systems", "Federal documentation standards", "VOSB set-aside eligible"],
  },
  {
    area: "Media & Production",
    items: ["OBS Studio", "Live streaming / broadcast", "Multi-platform distribution", "Video production", "Podcast workflows", "Church & event streaming"],
  },
];

export function TechCapabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
            Technical Depth
          </p>
          <h2
            id="capabilities-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
          >
            Broad capabilities. Senior-level execution.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            Our practice spans the full enterprise technology spectrum. Every service is delivered by senior practitioners — not delegated to junior developers.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITY_AREAS.map((area, i) => (
            <motion.div
              key={area.area}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl border border-black/8 bg-white p-6 shadow-card dark:border-white/8 dark:bg-white/[0.03]"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[#4A7DB5]">
                {area.area}
              </p>
              <ul className="mt-4 space-y-2" role="list">
                {area.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#4A7DB5]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
