import { portfolioContent } from "@/config/portfolio";
import { PageHero } from "@/components/ui/PageHero";

export function PortfolioHero() {
  const { identity, headline, subhead, badges } = portfolioContent.hero;
  return (
    <PageHero
      headingId="portfolio-hero-heading"
      identity={identity}
      headline={headline}
      subhead={subhead}
      badges={badges}
    />
  );
}
