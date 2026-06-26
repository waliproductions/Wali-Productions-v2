import { aboutContent } from "@/config/about";

/**
 * About page hero. Provides the page's single <h1>. Copy comes from
 * `aboutContent.hero` (placeholders pending approved messaging).
 */
export function AboutHero() {
  const { identity, headline, subhead } = aboutContent.hero;

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="border-b border-black/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {identity}
        </p>
        <h1
          id="about-hero-heading"
          className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          {subhead}
        </p>
      </div>
    </section>
  );
}
