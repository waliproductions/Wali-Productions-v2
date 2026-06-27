import { servicesContent } from "@/config/services";

export function ServicesHero() {
  const { identity, headline, subhead } = servicesContent.hero;

  return (
    <section aria-labelledby="services-hero-heading" className="bg-[#0A0A0A]">
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {identity}
        </p>
        <h1
          id="services-hero-heading"
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
