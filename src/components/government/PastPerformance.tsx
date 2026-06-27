import { governmentContent } from "@/config/government";
import { Section, SectionEyebrow } from "@/components/home/Section";

function isPending(value: string): boolean {
  return value.toLowerCase().includes("pending verified detail");
}

export function PastPerformance() {
  const { eyebrow, heading, note, items } = governmentContent.pastPerformance;

  const confirmedItems = items.filter(
    (item) => !isPending(item.title) && !isPending(item.description)
  );

  return (
    <Section
      id="past-performance"
      labelledById="past-performance-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
        <h2
          id="past-performance-heading"
          className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
      </div>

      {confirmedItems.length > 0 ? (
        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {confirmedItems.map((item, index) => (
            <li
              key={index}
              className="rounded-xl border border-black/10 bg-white p-7 shadow-card dark:border-white/10 dark:bg-white/[0.03]"
            >
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
        <div className="mt-10 rounded-xl border border-black/10 p-8 dark:border-white/10">
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {note}
          </p>
        </div>
      )}
    </Section>
  );
}
