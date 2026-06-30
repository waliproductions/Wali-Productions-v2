"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { servicesContent } from "@/config/services";

export function FAQ() {
  const { eyebrow, heading, subhead, items } = servicesContent.faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative border-t border-black/8 dark:border-white/8"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          {/* Left: header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A] sm:text-4xl dark:text-white"
            >
              {heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {subhead}
            </p>
            <div className="mt-8">
              <Link
                href="/start"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A5F] transition-colors hover:text-[#4A7DB5] dark:text-[#60a5fa] dark:hover:text-[#93c5fd]"
              >
                Start a Project
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M2 7h10M7 2l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right: accordion */}
          <div className="lg:col-span-2">
            <dl className="space-y-1">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.04 }}
                  className="overflow-hidden rounded-xl border border-black/8 bg-white dark:border-white/8 dark:bg-white/[0.03]"
                >
                  <dt>
                    <button
                      type="button"
                      aria-expanded={openIndex === i}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#F8FAFC] dark:hover:bg-white/[0.03]"
                    >
                      <span className="font-display text-sm font-semibold leading-snug text-[#0D1B2A] dark:text-white">
                        {item.question}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="#4A7DB5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`mt-0.5 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-45" : ""}`}
                      >
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </button>
                  </dt>
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.dd
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-question-${i}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {item.answer}
                        </p>
                      </motion.dd>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
