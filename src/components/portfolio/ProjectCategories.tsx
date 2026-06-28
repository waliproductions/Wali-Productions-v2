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
            className="group rounded-xl border border-black/10 bg-white p-6 shadow-card transition-all hover:shadow-card-hover hover:border-[#4A7DB5]/25 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F4F8] dark:bg-white/[0.06]">
              <span className="text-xs font-bold text-[#1E3A5F]" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
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
