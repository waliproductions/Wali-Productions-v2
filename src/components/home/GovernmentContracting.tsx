import Link from "next/link";
import { homeContent } from "@/config/home";
import { SectionEyebrow } from "./Section";

const DOT_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='white' fill-opacity='0.07'/%3E%3C/svg%3E")`;

export function GovernmentContracting() {
  const { eyebrow, heading, body, items } = homeContent.government;

  return (
    <section aria-labelledby="government-heading" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#1E3A5F] to-[#2B4C7E]" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true" style={{ backgroundImage: DOT_BG }} />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#4A7DB5] opacity-10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <SectionEyebrow variant="light">{eyebrow}</SectionEyebrow>

        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + body + CTA */}
          <div>
            <h2
              id="government-heading"
              className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            >
              {heading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#94A3B8]">
              {body}
            </p>
            <Link
              href="/government"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Government capabilities
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
              >
                <path d="M2 7h10M7 2l5 5-5 5" />
              </svg>
            </Link>
          </div>

          {/* Right: numbered capability list */}
          <div className="space-y-8">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5">
                <span
                  className="shrink-0 select-none font-display text-4xl font-bold leading-none text-white/20"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
