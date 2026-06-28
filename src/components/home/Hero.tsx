import Link from "next/link";
import { homeContent } from "@/config/home";

const DOT_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='white' fill-opacity='0.07'/%3E%3C/svg%3E")`;

const TRUST_LABELS = [
  "Christian Veteran-Owned",
  "Small Business & Government",
  "Excellence & Integrity",
];

const PREVIEW_SERVICES = [
  {
    label: "Software Development",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 6 1 9 4 12" /><polyline points="14 6 17 9 14 12" /><path d="M8 2l-2 14" />
      </svg>
    ),
  },
  {
    label: "Web Design & Development",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="9" r="7" /><path d="M2 9h14M9 2c-2.5 2.5-3.5 4.5-3.5 7s1 4.5 3.5 7M9 2c2.5 2.5 3.5 4.5 3.5 7s-1 4.5-3.5 7" />
      </svg>
    ),
  },
  {
    label: "AI & Business Automation",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="9" cy="9" r="2.5" /><path d="M9 2v4M9 12v4M2 9h4M12 9h4M4.2 4.2l2.8 2.8M11 11l2.8 2.8M13.8 4.2L11 7M7 11l-2.8 2.8" />
      </svg>
    ),
  },
  {
    label: "Government Contracting",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 16h14M2 9h14M4 9V6M9 9V6M14 9V6M1 6h16M9 2L1 6" />
      </svg>
    ),
  },
  {
    label: "Cybersecurity & Networking",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 2L2 5v4c0 4 3 7 7 8 4-1 7-4 7-8V5L9 2z" /><path d="M6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Media & Livestream Production",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="11" height="10" rx="1.5" /><path d="M17 6l-5 3 5 3V6z" />
      </svg>
    ),
  },
];

export function Hero() {
  const { identity, headline, subhead, primaryCta, secondaryCta } = homeContent.hero;

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#1E3A5F] to-[#2B4C7E]" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true" style={{ backgroundImage: DOT_BG }} />
      <div className="pointer-events-none absolute -right-60 -top-60 h-[700px] w-[700px] rounded-full bg-[#4A7DB5] opacity-[0.08] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Left: content */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {identity}
            </p>
            <h1
              id="hero-heading"
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {headline}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#94A3B8]">
              {subhead}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
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
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8h10M8 3l5 5-5 5" />
                  </svg>
                </Link>
              )}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-8">
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

          {/* Right: service preview cards — desktop only */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="grid grid-cols-1 gap-2.5">
              {PREVIEW_SERVICES.map((service) => (
                <div
                  key={service.label}
                  className="flex items-center gap-3.5 rounded-xl border border-white/[0.12] bg-white/[0.06] px-5 py-3.5 backdrop-blur-sm"
                >
                  <span className="shrink-0 text-steel">{service.icon}</span>
                  <span className="text-sm font-medium text-white/90">{service.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
