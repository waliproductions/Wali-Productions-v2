import { buildMetadata } from "@/lib/seo";
import { portfolioContent } from "@/config/portfolio";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioNarrative } from "@/components/portfolio/PortfolioNarrative";
import { ProjectCategories } from "@/components/portfolio/ProjectCategories";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { PortfolioCallToAction } from "@/components/portfolio/PortfolioCallToAction";

export const metadata = buildMetadata({
  title: "Portfolio",
  description: "Portfolio of Wali Productions LLC — Christian Veteran-Owned Technology & Digital Solutions.",
  path: "/portfolio",
});

/**
 * Wali Productions LLC — Portfolio page.
 *
 * Composes the portfolio sections in order. All copy is sourced from
 * `src/config/portfolio.ts`, which holds placeholders pending verified
 * documentation. Client names, project results, and testimonials are never
 * authored here.
 */
export default function PortfolioPage() {
  const { overview, pastPerformance, documentation } = portfolioContent;

  return (
    <>
      <PortfolioHero />
      <PortfolioNarrative
        id="portfolio-overview"
        eyebrow={overview.eyebrow}
        heading={overview.heading}
        paragraphs={overview.paragraphs}
      />
      <ProjectCategories />
      <FeaturedProjects />
      <PortfolioNarrative
        id="past-performance"
        eyebrow={pastPerformance.eyebrow}
        heading={pastPerformance.heading}
        paragraphs={pastPerformance.paragraphs}
      />
      <PortfolioNarrative
        id="portfolio-documentation"
        eyebrow={documentation.eyebrow}
        heading={documentation.heading}
        paragraphs={documentation.paragraphs}
        tone="muted"
      />
      <PortfolioCallToAction />
    </>
  );
}
