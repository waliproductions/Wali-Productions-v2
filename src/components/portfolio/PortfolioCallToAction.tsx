import { portfolioContent } from "@/config/portfolio";
import { GradientCTA } from "@/components/ui/GradientCTA";

export function PortfolioCallToAction() {
  const { heading, body, primaryCta } = portfolioContent.cta;
  return (
    <GradientCTA
      id="portfolio-cta"
      heading={heading}
      body={body}
      primaryCta={primaryCta}
      glowSide="left"
    />
  );
}
