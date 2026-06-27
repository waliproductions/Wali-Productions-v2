import { homeContent } from "@/config/home";
import { Section, SectionEyebrow } from "./Section";

export function WhyChooseUs() {
  const { eyebrow, heading, items } = homeContent.whyChoose;

  return (
    <Section
      labelledById="why-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
        <h2
          id="why-heading"
          className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="h-0.5 w-8 bg-gold" />
            <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
