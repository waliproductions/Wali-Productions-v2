import { homeContent } from "@/config/home";
import { Section, SectionEyebrow } from "./Section";
import { FeatureGrid } from "./FeatureGrid";

/**
 * "Why choose Wali Productions" — value propositions are placeholders pending
 * approved messaging.
 */
export function WhyChooseUs() {
  const { eyebrow, heading, items } = homeContent.whyChoose;

  return (
    <Section
      labelledById="why-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="why-heading"
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
