"use client";

import { motion } from "framer-motion";
import { homeContent } from "@/config/home";

const ICONS: Record<string, React.ReactNode> = {
  "12+": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="8" height="8" rx="1.5" /><rect x="12" y="3" width="8" height="8" rx="1.5" /><rect x="2" y="13" width="8" height="8" rx="1.5" /><rect x="12" y="13" width="8" height="8" rx="1.5" />
    </svg>
  ),
  "VOSB": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 2L2 6v5c0 5 3.5 8.5 9 10 5.5-1.5 9-5 9-10V6L11 2z" /><path d="M7 11l3 3 5-5" />
    </svg>
  ),
  "5": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20h18M2 12h18M5 12V9M11 12V9M17 12V9M1 9h20M11 2L1 9" />
    </svg>
  ),
  "24hr": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="9" /><path d="M11 6v5l3.5 3.5" />
    </svg>
  ),
};

export function CredibilityBar() {
  const stats = homeContent.stats;

  return (
    <div className="relative border-y border-black/8 bg-white shadow-sm dark:border-white/8 dark:bg-navy-900/50">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="group relative flex items-center gap-4 px-6 py-7 first:pl-0 last:pr-0"
            >
              {i > 0 && (
                <div className="absolute left-0 top-1/4 h-1/2 w-px bg-black/10 dark:bg-white/10" aria-hidden="true" />
              )}
              <div className="shrink-0 rounded-lg bg-[#F0F4F8] p-2.5 text-[#1E3A5F] transition-colors group-hover:bg-[#E4EBF5] dark:bg-white/[0.06] dark:text-[#60a5fa]">
                {ICONS[stat.value] ?? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="11" cy="11" r="9" />
                  </svg>
                )}
              </div>
              <div>
                <dt className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white">
                  {stat.value}
                </dt>
                <dd className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {stat.label}
                </dd>
                {stat.sublabel && (
                  <dd className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-500">
                    {stat.sublabel}
                  </dd>
                )}
              </div>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  );
}
