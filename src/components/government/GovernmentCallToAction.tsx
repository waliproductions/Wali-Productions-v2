import Link from "next/link";
import { governmentContent } from "@/config/government";

export function GovernmentCallToAction() {
  const { heading, body, primaryCta } = governmentContent.cta;

  return (
    <section
      aria-labelledby="government-cta-heading"
      className="bg-gov-slate"
    >
      <div className="mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="government-cta-heading"
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
              className="inline-flex items-center justify-center rounded-lg bg-gold px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-gold/90 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-gov-slate"
            >
              {primaryCta.label}
            </Link>
            <Link
              href="/government"
              className="text-sm font-medium text-neutral-400 underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              View full capabilities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
