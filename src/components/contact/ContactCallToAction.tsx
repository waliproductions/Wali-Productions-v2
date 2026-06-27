import Link from "next/link";
import { contactContent } from "@/config/contact";

const DOT_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='white' fill-opacity='0.07'/%3E%3C/svg%3E")`;

export function ContactCallToAction() {
  const { heading, body, primaryCta } = contactContent.cta;

  return (
    <section aria-labelledby="contact-cta-heading" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#1E3A5F] to-[#2B4C7E]" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true" style={{ backgroundImage: DOT_BG }} />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#4A7DB5] opacity-10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="contact-cta-heading"
            className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
          >
            {heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#94A3B8]">
            {body}
          </p>
          <div className="mt-10">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-[#0D1B2A] transition-all hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B2A]"
            >
              {primaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
