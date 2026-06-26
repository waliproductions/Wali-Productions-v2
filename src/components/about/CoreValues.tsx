import { aboutContent } from "@/config/about";
import { Section, SectionEyebrow } from "@/components/home/Section";
import { FeatureGrid } from "@/components/home/FeatureGrid";

/**
 * Core values section. Values are placeholders pending approved messaging.
 * Reuses the shared FeatureGrid for layout consistency with the homepage.
 */
export function CoreValues() {
  const { eyebrow, heading, items } = aboutContent.coreValues;

  return (
    <Section
      id="core-values"
      labelledById="core-values-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="core-values-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
      </div>
      <div className="mt-12">
        <FeatureGrid items={items} mdColumnsClass="md:grid-cols-2" />
      </div>
    </Section>
  );
}
