"use client";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8831A]">
            {eyebrow}
          </p>
          <h2
            id="contact-information-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
          >
            {heading}
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="16" height="12" rx="1.5" /><path d="M2 7l8 5 8-5" />
                </svg>
              ),
              label: "Email",
              value: "Via consultation form",
              sub: note,
            },
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 rounded-2xl border border-black/8 bg-white p-6 dark:border-white/8 dark:bg-white/[0.03]"
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
      </div>
    </section>
  );
}
