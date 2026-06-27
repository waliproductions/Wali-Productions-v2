import { contactContent } from "@/config/contact";
import { Section, SectionEyebrow } from "@/components/home/Section";

export function ServiceInquiryCategories() {
  const { eyebrow, heading, items } = contactContent.inquiryCategories;

  return (
    <Section
      id="inquiry-categories"
      labelledById="inquiry-categories-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
      <h2
        id="inquiry-categories-heading"
        className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {heading}
      </h2>

      <ul className="mt-12 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={i}>
            <div className="h-0.5 w-8 bg-gold" />
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
