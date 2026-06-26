import { contactContent } from "@/config/contact";
import { Section, SectionEyebrow } from "@/components/home/Section";
import { FeatureGrid } from "@/components/home/FeatureGrid";

/**
 * Service inquiry categories. Categories are placeholders pending approved
 * documentation.
 */
export function ServiceInquiryCategories() {
  const { eyebrow, heading, items } = contactContent.inquiryCategories;

  return (
    <Section
      id="inquiry-categories"
      labelledById="inquiry-categories-heading"
      className="border-t border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03]"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="inquiry-categories-heading"
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
