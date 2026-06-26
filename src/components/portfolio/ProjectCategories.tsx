import { portfolioContent } from "@/config/portfolio";
import { Section, SectionEyebrow } from "@/components/home/Section";
import { FeatureGrid } from "@/components/home/FeatureGrid";

/**
 * Project categories. Categories are placeholders pending the approved
 * portfolio documentation.
 */
export function ProjectCategories() {
  const { eyebrow, heading, items } = portfolioContent.categories;

  return (
    <Section
      id="project-categories"
      labelledById="project-categories-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="project-categories-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
      </div>
      <div className="mt-12">
        <FeatureGrid items={items} />
      </div>
    </Section>
  );
}
