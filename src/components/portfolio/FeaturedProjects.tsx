import { portfolioContent } from "@/config/portfolio";
import { Section, SectionEyebrow } from "@/components/home/Section";

function isPending(value: string): boolean {
  return value.toLowerCase().includes("pending verified detail");
}

export function FeaturedProjects() {
  const { eyebrow, heading, note, items } = portfolioContent.featured;

  const confirmedItems = items.filter(
    (item) => !isPending(item.title) && !isPending(item.description)
  );

  return (
    <Section
      id="featured-projects"
      labelledById="featured-projects-heading"
      className="border-t border-black/10 bg-[#F8FAFC] dark:border-white/10"
    >
      <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
      <h2
        id="featured-projects-heading"
        className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {heading}
      </h2>

      {confirmedItems.length > 0 ? (
        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {confirmedItems.map((item, index) => (
            <li
              key={index}
              className="group rounded-2xl border border-black/10 bg-white p-7 shadow-card transition-all hover:shadow-card-hover hover:border-[#4A7DB5]/25 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="mb-4 h-1 w-10 rounded-full bg-[#4A7DB5]" />
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-10 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mb-4 h-0.5 w-10 bg-[#4A7DB5]" />
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {note}
          </p>
        </div>
      )}
    </Section>
  );
}
