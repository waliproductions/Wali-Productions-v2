import Link from "next/link";
import { servicesContent } from "@/config/services";

export function ServicesCallToAction() {
  const { heading, body, primaryCta } = servicesContent.cta;

  return (
    <section
      aria-labelledby="services-cta-heading"
      className="relative overflow-hidden bg-[#0A0A0A]"
    >
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-gold/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="services-cta-heading"
            className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
          >
            {heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-400">
            {body}
          </p>
          <div className="mt-10">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-lg bg-gold px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-gold/90 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              {primaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
