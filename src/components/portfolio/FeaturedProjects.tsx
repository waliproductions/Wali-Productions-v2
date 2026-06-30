"use client";

import { motion } from "framer-motion";
import { portfolioContent } from "@/config/portfolio";

export function FeaturedProjects() {
  const { projects, featured } = portfolioContent;
  const publishedProjects = projects.filter((p) => p.status === "published");

  return (
    <section
      id="featured-projects"
      aria-labelledby="featured-projects-heading"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/50"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {featured.eyebrow}
          </p>
          <h2
            id="featured-projects-heading"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0D1B2A] sm:text-5xl dark:text-white"
          >
            {featured.heading}
          </h2>
        </motion.div>

        {publishedProjects.length > 0 ? (
          <ul className="mt-14 space-y-8" role="list">
            {publishedProjects.map((project, i) => (
              <motion.li
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white shadow-card transition-all duration-300 hover:border-[#4A7DB5]/25 hover:shadow-card-hover dark:border-white/8 dark:bg-white/[0.03]"
              >
                <div className="p-8 lg:p-10">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">

                    {/* Left: Project info */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-md bg-[#EEF3FA] px-2.5 py-1 text-xs font-semibold text-[#1E3A5F] dark:bg-[#4A7DB5]/10 dark:text-[#60a5fa]">
                          {project.category}
                        </span>
                        {project.govApplicable && (
                          <span className="rounded-md border border-[#1E3A5F]/15 bg-[#EEF3FA] px-2.5 py-1 text-xs font-semibold text-[#1E3A5F] dark:border-[#4A7DB5]/30 dark:bg-[#4A7DB5]/10 dark:text-[#60a5fa]">
                            Gov-Ready
                          </span>
                        )}
                        {project.year && (
                          <span className="text-xs text-neutral-500">{project.year}</span>
                        )}
                      </div>

                      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {project.description}
                      </p>

                      {/* Services performed */}
                      {project.servicesPerformed && (
                        <div className="mt-5">
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            Services Performed
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {project.servicesPerformed.map((s) => (
                              <span
                                key={s}
                                className="rounded-full border border-black/8 bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-neutral-700 dark:border-white/8 dark:bg-white/[0.04] dark:text-neutral-300"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies */}
                      {project.technologies.length > 0 && (
                        <div className="mt-5">
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            Technologies
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md bg-[#0D1B2A]/5 px-2.5 py-1 font-mono text-xs text-[#0D1B2A] dark:bg-white/8 dark:text-neutral-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Outcomes */}
                    {project.outcomes && project.outcomes.length > 0 && (
                      <div className="rounded-xl border border-black/8 bg-[#F8FAFC] p-6 dark:border-white/8 dark:bg-white/[0.03]">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#1E3A5F] dark:text-[#60a5fa]">
                          Key Outcomes
                        </p>
                        <ul className="mt-4 space-y-3">
                          {project.outcomes.map((outcome, oi) => (
                            <li key={oi} className="flex items-start gap-2.5">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4A7DB5" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                                <path d="M2 7l3.5 3.5L12 3" />
                              </svg>
                              <span className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                                {outcome}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#1E3A5F] to-[#4A7DB5] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 rounded-2xl border border-black/8 bg-white p-10 dark:border-white/8 dark:bg-white/[0.03]"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#EEF3FA] flex items-center justify-center dark:bg-white/[0.06]">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="9" cy="9" r="7.5" /><path d="M9 6v3M9 12h.01" />
                </svg>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {featured.note}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
