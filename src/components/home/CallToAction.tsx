import Link from "next/link";
import { homeContent } from "@/config/home";

export function CallToAction() {
  const { heading, body, primaryCta } = homeContent.cta;

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-[#0A0A0A]"
    >
      {/* Radial gold glow — bottom left */}
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="cta-heading"
            className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
          >
            {heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-400">
            {body}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-lg bg-gold px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-gold/90 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              {primaryCta.label}
            </Link>
            <span className="text-sm text-neutral-600">
              Christian Veteran-Owned · No commitment required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
