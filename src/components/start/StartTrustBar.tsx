"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const TRUST_ITEMS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#4A7DB5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 1L2 4.5v5C2 13.5 5.5 17 10 18.5 14.5 17 18 13.5 18 9.5v-5L10 1z" />
        <path d="M6.5 10l2.5 2.5 5-5" />
      </svg>
    ),
    heading: "Veteran-Owned & Operated",
    body: "Military discipline applied to every project — clear objectives, defined deliverables, accountability throughout.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#4A7DB5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" />
        <path d="M10 6v5l3 3" />
      </svg>
    ),
    heading: "Response Within 24 Hours",
    body: "Every inquiry is reviewed personally. You'll hear from us promptly with honest, direct feedback.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#4A7DB5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10l5 5 9-9" />
      </svg>
    ),
    heading: "No Commitment Required",
    body: "Submitting an inquiry is just a conversation starter. No obligation until you decide to move forward.",
  },
];

export function StartTrustBar() {
  return (
    <section
      aria-label="Why work with us"
      className="relative border-t border-black/8 bg-[#F8FAFC] dark:border-white/8 dark:bg-navy-950/40"
    >
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-card dark:bg-white/[0.06]">
                {item.icon}
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-[#0D1B2A] dark:text-white">
                  {item.heading}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 border-t border-black/8 pt-8 dark:border-white/8">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Prefer to reach out another way?{" "}
            <Link
              href="/contact"
              className="font-medium text-[#1E3A5F] underline-offset-4 hover:underline dark:text-[#60a5fa]"
            >
              Visit the contact page
            </Link>{" "}
            or check out our{" "}
            <Link
              href="/services"
              className="font-medium text-[#1E3A5F] underline-offset-4 hover:underline dark:text-[#60a5fa]"
            >
              full service catalog
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
