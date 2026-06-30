"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { contactContent } from "@/config/contact";

export function ContactInformation() {
  const { eyebrow, heading, responseTime, businessHours, note } = contactContent.contactInfo;

  return (
    <section
      id="contact-information"
      aria-labelledby="contact-information-heading"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/50"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {eyebrow}
            </p>
            <h2
              id="contact-information-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
            >
              {heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {note}
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="10" cy="10" r="8.5" /><path d="M10 5.5v5l3 3" />
                    </svg>
                  ),
                  label: "Response Time",
                  value: responseTime,
                  sub: "Business days only",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="3" width="16" height="15" rx="1.5" /><path d="M7 1.5V4M13 1.5V4M2 8h16" />
                    </svg>
                  ),
                  label: "Business Hours",
                  value: businessHours,
                  sub: "Eastern Time",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 rounded-xl border border-black/8 bg-white p-5 dark:border-white/8 dark:bg-white/[0.03]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FA] text-[#1E3A5F] dark:bg-white/[0.06] dark:text-[#60a5fa]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0D1B2A] dark:text-white">
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-2xl border border-[#4A7DB5]/20 bg-gradient-to-br from-[#EEF3FA] to-white p-8 dark:border-white/8 dark:from-white/[0.04] dark:to-white/[0.02]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Ready to begin?
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white">
                Start a project today.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Our dedicated project intake form lets you share your goals, timeline, and budget upfront — so our first conversation is focused and productive.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/start"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0D1B2A] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1E3A5F] dark:bg-[#1E3A5F] dark:hover:bg-[#2B4C7E]"
                >
                  Start a Project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </Link>
                <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                  No commitment required · Response within 24 hours
                </p>
              </div>

              <div className="mt-6 border-t border-black/8 pt-6 dark:border-white/8">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Need to discuss something first?{" "}
                  <Link
                    href="#consultation"
                    className="font-medium text-[#1E3A5F] underline-offset-4 hover:underline dark:text-[#60a5fa]"
                  >
                    Use the form above
                  </Link>{" "}
                  or email us directly via the consultation form.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
