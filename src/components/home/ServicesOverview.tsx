import { homeContent } from "@/config/home";
import { Section, SectionEyebrow } from "./Section";
import { FeatureGrid } from "./FeatureGrid";

/**
 * Services overview. Service titles and descriptions are placeholders pending
 * approved messaging.
 */
export function ServicesOverview() {
  const { eyebrow, heading, intro, items } = homeContent.services;

  return (
    <Section
      labelledById="services-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="services-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-300">
          {intro}
        </p>
      </div>
      <div className="mt-12">
        <FeatureGrid items={items} />
      </div>
    </Section>
  );
}
