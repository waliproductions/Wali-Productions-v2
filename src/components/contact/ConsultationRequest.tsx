"use client";

import { motion } from "framer-motion";
import { contactContent } from "@/config/contact";
import { ConsultationForm } from "./ConsultationForm";

export function ConsultationRequest() {
  const { eyebrow, heading, intro } = contactContent.consultation;
  const processSteps = contactContent.process;

  return (
    <section
      id="consultation"
      aria-labelledby="consultation-heading"
      className="relative border-t border-black/8 dark:border-white/8"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">

          {/* Left: Process */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
              Our Process
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white">
              What happens after you reach out
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              No black boxes, no sales games. Here&apos;s exactly what to expect.
            </p>

            <ol className="mt-10 space-y-0" role="list">
              {processSteps.map((step, i) => (
                <motion.li
                  key={step.step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex gap-5 pb-8 last:pb-0"
                >
                  {/* Connector line */}
                  {i < processSteps.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-0 w-px bg-gradient-to-b from-[#4A7DB5]/40 to-[#4A7DB5]/0" aria-hidden="true" />
                  )}

                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white font-display text-sm font-bold text-[#1E3A5F] dark:border-white/10 dark:bg-navy-800 dark:text-[#60a5fa]">
                    {step.step}
                  </div>

                  <div className="pt-1.5">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-base font-semibold text-[#0D1B2A] dark:text-white">
                        {step.title}
                      </h3>
                      <span className="rounded-full border border-[#4A7DB5]/25 bg-[#EEF3FA] px-2.5 py-0.5 text-xs font-medium text-[#1E3A5F] dark:bg-[#4A7DB5]/10 dark:text-[#60a5fa]">
                        {step.timeline}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-black/8 bg-white p-8 shadow-premium dark:border-white/8 dark:bg-white/[0.03]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
                {eyebrow}
              </p>
              <h2
                id="consultation-heading"
                className="mt-4 font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white"
              >
                {heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {intro}
              </p>
              <div className="mt-7">
                <ConsultationForm />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
