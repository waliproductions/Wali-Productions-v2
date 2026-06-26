import { governmentContent } from "@/config/government";
import { Section, SectionEyebrow } from "@/components/home/Section";

/**
 * Past performance overview.
 *
 * Entries are documented, verified engagements only. The items below are
 * placeholders with a visible disclaimer; no contract history is authored here.
 */
export function PastPerformance() {
  const { eyebrow, heading, note, items } = governmentContent.pastPerformance;

  return (
    <Section
      id="past-performance"
      labelledById="past-performance-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="past-performance-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <p
          role="note"
          className="mt-4 text-sm text-neutral-500 dark:text-neutral-400"
        >
          {note}
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="rounded-lg border border-black/10 p-6 dark:border-white/10"
          >
            <h3 className="text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
