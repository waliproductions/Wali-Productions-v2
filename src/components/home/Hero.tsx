import Link from "next/link";
import { homeContent } from "@/config/home";

const TRUST_LABELS = [
  "Christian Veteran-Owned",
  "Small Business & Government",
  "Excellence & Integrity",
];

const DOT_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='white' fill-opacity='0.07'/%3E%3C/svg%3E")`;

export function Hero() {
  const { identity, headline, subhead, primaryCta, secondaryCta } =
    homeContent.hero;

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#1E3A5F] to-[#2B4C7E]" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true" style={{ backgroundImage: DOT_BG }} />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#4A7DB5] opacity-10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {identity}
        </p>
        <h1
          id="hero-heading"
          className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {headline}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#94A3B8]">
          {subhead}
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-[#0D1B2A] transition-all hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B2A]"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              {secondaryCta.label}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
          )}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
          {TRUST_LABELS.map((label) => (
            <div key={label} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6.5" stroke="white" strokeOpacity="0.35" strokeWidth="1" />
                <path d="M4 7l2 2 4-4" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-[#94A3B8]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
