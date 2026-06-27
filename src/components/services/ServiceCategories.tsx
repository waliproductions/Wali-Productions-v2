import { servicesContent } from "@/config/services";
import { Section, SectionEyebrow } from "@/components/home/Section";

export function ServiceCategories() {
  const { categories } = servicesContent;

  return (
    <Section
      id="service-categories"
      labelledById="service-categories-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <SectionEyebrow variant="gold">Service Categories</SectionEyebrow>
      <h2
        id="service-categories-heading"
        className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        What we offer
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {categories.map((category, i) => (
          <div key={i}>
            <span
              className="select-none font-display text-5xl font-bold leading-none text-gold/20"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
              {category.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
