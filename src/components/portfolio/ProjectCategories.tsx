import { portfolioContent } from "@/config/portfolio";
import { Section, SectionEyebrow } from "@/components/home/Section";

export function ProjectCategories() {
  const { eyebrow, heading, items } = portfolioContent.categories;

  return (
    <Section
      id="project-categories"
      labelledById="project-categories-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
      <h2
        id="project-categories-heading"
        className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {heading}
      </h2>

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={i}
            className="rounded-xl border border-black/10 bg-white p-5 shadow-card dark:border-white/10 dark:bg-white/[0.03]"
          >
            <h3 className="font-display text-base font-semibold tracking-tight">
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
