"use client";

import { motion } from "framer-motion";
import { ConsultationForm } from "@/components/contact/ConsultationForm";

const WHAT_TO_EXPECT = [
  {
    step: "01",
    title: "We review your inquiry",
    body: "Every submission is read personally. We assess fit, complexity, and how we can best help.",
    timeline: "Same day",
  },
  {
    step: "02",
    title: "Initial response",
    body: "We'll reach out via your preferred contact method with initial thoughts and next steps.",
    timeline: "Within 24 hours",
  },
  {
    step: "03",
    title: "Discovery conversation",
    body: "A 30–60 minute conversation to understand your challenge in depth. No sales pitch — just honest dialogue.",
    timeline: "30–60 min",
  },
  {
    step: "04",
    title: "Proposal delivery",
    body: "If we're the right fit, you'll receive a clear written proposal with scope, timeline, and pricing.",
    timeline: "3–5 business days",
  },
];

export function StartForm() {
  return (
    <section
      id="project-inquiry"
      aria-labelledby="start-form-heading"
      className="relative border-t border-black/8 dark:border-white/8"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-20">

          {/* Left: What to expect */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
              What to expect
            </p>
            <h2
              id="start-form-heading"
              className="mt-4 font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white"
            >
              Simple, honest, no-pressure process
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              We don&apos;t do aggressive follow-ups or unsolicited calls. You reach out, we listen, we respond honestly.
            </p>

            <ol className="mt-10 space-y-0" role="list">
              {WHAT_TO_EXPECT.map((item, i) => (
                <li key={item.step} className="group relative flex gap-4 pb-8 last:pb-0">
                  {i < WHAT_TO_EXPECT.length - 1 && (
                    <div className="absolute left-4 top-9 bottom-0 w-px bg-gradient-to-b from-[#4A7DB5]/30 to-transparent" aria-hidden="true" />
                  )}
                  <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-xs font-bold text-[#1E3A5F] dark:border-white/10 dark:bg-navy-800 dark:text-[#60a5fa]">
                    {item.step}
                  </div>
                  <div className="pt-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-sm font-semibold text-[#0D1B2A] dark:text-white">
                        {item.title}
                      </span>
                      <span className="rounded-full bg-[#EEF3FA] px-2 py-0.5 text-xs font-medium text-[#1E3A5F] dark:bg-[#4A7DB5]/10 dark:text-[#60a5fa]">
                        {item.timeline}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-xl border border-[#4A7DB5]/20 bg-[#EEF3FA] p-5 dark:border-white/8 dark:bg-white/[0.03]">
              <p className="text-sm font-semibold text-[#0D1B2A] dark:text-white">
                Not sure what you need?
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                That&apos;s completely fine. Describe your problem or goal in your own words — we&apos;ll help you figure out the right approach.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-black/8 bg-white p-8 shadow-premium dark:border-white/8 dark:bg-white/[0.03]">
              <div className="mb-7 border-b border-black/8 pb-7 dark:border-white/8">
                <h3 className="font-display text-xl font-bold tracking-tight text-[#0D1B2A] dark:text-white">
                  Project inquiry
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Complete this form to begin. The more context you share, the better we can prepare for our conversation.
                </p>
              </div>
              <ConsultationForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
