import { portfolioContent } from "@/config/portfolio";
import { Section, SectionEyebrow } from "@/components/home/Section";
import { FeatureGrid } from "@/components/home/FeatureGrid";

/**
 * Featured projects.
 *
 * Entries are documented, approved projects only. The items below are
 * placeholders with a visible disclaimer; no client names, results, or claims
 * are authored here.
 */
export function FeaturedProjects() {
  const { eyebrow, heading, note, items } = portfolioContent.featured;

  return (
    <Section
      id="featured-projects"
      labelledById="featured-projects-heading"
      className="border-t border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03]"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="featured-projects-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <p
          role="note"
          className="mt-4 text-sm text-neutral-500 dark:text-neutral-400"
        >
          {note}
        </p>
      </div>
      <div className="mt-12">
        <FeatureGrid items={items} />
      </div>
    </Section>
  );
}
