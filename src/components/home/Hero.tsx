import Link from "next/link";
import { homeContent } from "@/config/home";

/**
 * Hero section. Provides the page's single <h1>. Copy is sourced from
 * `homeContent.hero` (currently placeholders pending approved messaging).
 */
export function Hero() {
  const { identity, headline, subhead, primaryCta, secondaryCta } =
    homeContent.hero;

  return (
    <section
      aria-labelledby="hero-heading"
      className="border-b border-black/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {identity}
        </p>
        <h1
          id="hero-heading"
          className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          {subhead}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-base font-medium text-background transition-opacity hover:opacity-90"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-md border border-black/15 px-6 py-3 text-base font-medium transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
