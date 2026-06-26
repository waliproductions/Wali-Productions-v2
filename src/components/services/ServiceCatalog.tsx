import { servicesContent } from "@/config/services";
import { Section, SectionEyebrow } from "@/components/home/Section";
import { FeatureGrid } from "@/components/home/FeatureGrid";

/**
 * Individual service cards, grouped under each category. Service names and
 * summaries are placeholders pending the approved Services directory.
 */
export function ServiceCatalog() {
  const { categories } = servicesContent;

  return (
    <Section
      id="service-catalog"
      labelledById="service-catalog-heading"
      className="border-t border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03]"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>Services</SectionEyebrow>
        <h2
          id="service-catalog-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Explore our services
        </h2>
      </div>

      <div className="mt-12 space-y-14">
        {categories.map((category, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold tracking-tight">
              {category.title}
            </h3>
            <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-300">
              {category.description}
            </p>
            <div className="mt-6">
              <FeatureGrid items={category.services} headingLevel="h4" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
