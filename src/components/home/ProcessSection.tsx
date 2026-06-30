"use client";

import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

export function ProcessSection() {
  const { eyebrow, heading, subhead, steps } = homeContent.process;

  return (
    <section
      aria-labelledby="process-heading"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/50"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
            {eyebrow}
          </p>
          <h2
            id="process-heading"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0D1B2A] sm:text-5xl dark:text-white"
          >
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {subhead}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connector line (desktop) */}
          <div
            className="absolute left-1/2 top-8 hidden h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#4A7DB5]/30 to-transparent lg:block"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {steps.map((step, i) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: "easeOut" as const, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Step number circle */}
                <div className="relative z-10 mb-6 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white shadow-card transition-all duration-300 group-hover:border-[#4A7DB5] group-hover:shadow-card-blue dark:border-white/10 dark:bg-navy-800">
                    <span className="font-display text-sm font-bold text-[#1E3A5F] dark:text-[#60a5fa]">
                      {step.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-center font-display text-lg font-semibold text-[#0D1B2A] dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
