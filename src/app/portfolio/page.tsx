import { buildMetadata } from "@/lib/seo";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { ProjectCategories } from "@/components/portfolio/ProjectCategories";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { PortfolioNarrative } from "@/components/portfolio/PortfolioNarrative";
import { PortfolioCallToAction } from "@/components/portfolio/PortfolioCallToAction";
import { portfolioContent } from "@/config/portfolio";

export const metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Work and capabilities of Wali Productions LLC — enterprise software engineering, AI integration, cybersecurity, cloud solutions, and government IT services. Veteran-Owned technology consulting.",
  path: "/portfolio",
});

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
        tone="muted"
      />
      <PortfolioNarrative
        id="portfolio-documentation"
        eyebrow={documentation.eyebrow}
        heading={documentation.heading}
        paragraphs={documentation.paragraphs}
      />
      <PortfolioCallToAction />
    </>
  );
}
