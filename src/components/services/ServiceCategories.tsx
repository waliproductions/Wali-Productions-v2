import { servicesContent } from "@/config/services";
import { Section, SectionEyebrow } from "@/components/home/Section";
import { FeatureGrid } from "@/components/home/FeatureGrid";

/**
 * Service Categories overview. Renders each category as a card (name +
 * description). Categories are placeholders pending the approved Services
 * directory.
 */
export function ServiceCategories() {
  const categories = servicesContent.categories.map((category) => ({
    title: category.title,
    description: category.description,
  }));

  return (
    <Section
      id="service-categories"
      labelledById="service-categories-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>Service Categories</SectionEyebrow>
        <h2
          id="service-categories-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          What we offer
        </h2>
      </div>
      <div className="mt-12">
        <FeatureGrid items={categories} mdColumnsClass="md:grid-cols-2" />
      </div>
    </Section>
  );
}
