import { servicesContent } from "@/config/services";
import { Section, SectionEyebrow } from "@/components/home/Section";
import { FeatureGrid } from "@/components/home/FeatureGrid";

/**
 * "Why Work With Wali Productions LLC" — value propositions are placeholders
 * pending approved messaging.
 */
export function WhyWork() {
  const { eyebrow, heading, items } = servicesContent.whyWork;

  return (
    <Section
      id="why-work"
      labelledById="why-work-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="why-work-heading"
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
