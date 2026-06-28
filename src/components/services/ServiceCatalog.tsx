import { servicesContent } from "@/config/services";
import { Section, SectionEyebrow } from "@/components/home/Section";

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

      <div className="mt-14 space-y-20">
        {categories.map((category, index) => (
          <div key={index}>
            {/* Category header */}
            <div className="flex items-center gap-4 pb-6 border-b border-black/10 dark:border-white/10">
              <div className="h-8 w-0.5 rounded-full bg-[#4A7DB5]" aria-hidden="true" />
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {category.description}
                </p>
              </div>
            </div>

            {/* Service cards */}
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.services.map((service, si) => (
                <li
                  key={si}
                  className="rounded-xl border border-black/10 bg-white p-6 shadow-card transition-all hover:shadow-card-hover hover:border-[#4A7DB5]/25 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <h4 className="font-display text-base font-semibold tracking-tight">
                    {service.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {service.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
