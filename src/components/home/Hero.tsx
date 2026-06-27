import Link from "next/link";
import { homeContent } from "@/config/home";

const TRUST_LABELS = [
  "Christian Veteran-Owned",
  "Small Business & Government",
  "Excellence & Integrity",
];

export function Hero() {
  const { identity, headline, subhead, primaryCta, secondaryCta } =
    homeContent.hero;

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-[#0A0A0A]">
      {/* Radial gold glow — top right */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-gold/[0.07] blur-3xl"
        aria-hidden="true"
      />

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
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
          {subhead}
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-lg bg-gold px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-gold/90 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10"
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

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
          {TRUST_LABELS.map((label) => (
            <div key={label} className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="7" cy="7" r="6.5" stroke="#B8831A" strokeOpacity="0.6" strokeWidth="1" />
                <path
                  d="M4 7l2 2 4-4"
                  stroke="#B8831A"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs text-neutral-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
