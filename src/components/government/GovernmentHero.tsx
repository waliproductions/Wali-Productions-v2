import { governmentContent } from "@/config/government";

export function GovernmentHero() {
  const { identity, headline, subhead } = governmentContent.hero;

  return (
    <section aria-labelledby="government-hero-heading" className="bg-gov-slate">
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
          {identity}
        </p>
        <h1
          id="government-hero-heading"
          className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
          {subhead}
        </p>
      </div>
    </section>
  );
}
