import Link from "next/link";
import { governmentContent } from "@/config/government";

/**
 * Government page call to action. Copy and CTA target are placeholders pending
 * approved messaging and approved routes.
 */
export function GovernmentCallToAction() {
  const { heading, body, primaryCta } = governmentContent.cta;

  return (
    <section
      aria-labelledby="government-cta-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <h2
          id="government-cta-heading"
          className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600 dark:text-neutral-300">
          {body}
        </p>
        <div className="mt-8">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-base font-medium text-background transition-opacity hover:opacity-90"
          >
            {primaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
