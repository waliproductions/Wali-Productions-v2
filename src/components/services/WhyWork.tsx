import { servicesContent } from "@/config/services";
import { Section, SectionEyebrow } from "@/components/home/Section";

export function WhyWork() {
  const { eyebrow, heading, items } = servicesContent.whyWork;

  return (
    <Section
      id="why-work"
      labelledById="why-work-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
        <h2
          id="why-work-heading"
          className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-black/10 bg-white p-6 shadow-card transition-all hover:shadow-card-hover hover:border-[#4A7DB5]/25 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="mb-4 h-0.5 w-8 bg-[#4A7DB5]" />
            <h3 className="font-display text-lg font-semibold tracking-tight">
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
