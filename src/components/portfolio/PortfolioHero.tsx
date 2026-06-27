import { portfolioContent } from "@/config/portfolio";

const DOT_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='white' fill-opacity='0.07'/%3E%3C/svg%3E")`;

export function PortfolioHero() {
  const { identity, headline, subhead } = portfolioContent.hero;

  return (
    <section aria-labelledby="portfolio-hero-heading" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#1E3A5F] to-[#2B4C7E]" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true" style={{ backgroundImage: DOT_BG }} />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#4A7DB5] opacity-10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {identity}
        </p>
        <h1
          id="portfolio-hero-heading"
          className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#94A3B8]">
          {subhead}
        </p>
      </div>
    </section>
  );
}
