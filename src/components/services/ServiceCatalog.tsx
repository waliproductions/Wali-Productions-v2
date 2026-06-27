import { servicesContent } from "@/config/services";
import { Section, SectionEyebrow } from "@/components/home/Section";
import { FeatureGrid } from "@/components/home/FeatureGrid";

export function ServiceCatalog() {
  const { categories } = servicesContent;

  return (
    <Section
      id="service-catalog"
      labelledById="service-catalog-heading"
      className="border-t border-black/10 bg-[#F8FAFC] dark:border-white/10"
    >
      <SectionEyebrow variant="gold">Services</SectionEyebrow>
      <h2
        id="service-catalog-heading"
        className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Explore our services
      </h2>

      <div className="mt-14 space-y-16">
        {categories.map((category, index) => (
          <div key={index}>
            <div className="mb-5 h-0.5 w-10 bg-[#4A7DB5]" />
            <h3 className="font-display text-2xl font-bold tracking-tight">
              {category.title}
            </h3>
            <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
              {category.description}
            </p>
            <div className="mt-8">
              <FeatureGrid items={category.services} headingLevel="h4" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
