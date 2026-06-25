import type { FeatureItem } from "@/config/home";

type FeatureGridProps = {
  items: FeatureItem[];
  /** Heading level for each card title, for correct document outline. */
  headingLevel?: "h3" | "h4";
  /** Tailwind columns class for the md+ breakpoint. */
  mdColumnsClass?: string;
};

/**
 * Presentational grid of feature cards. Content is passed in; this component
 * authors none of it.
 */
export function FeatureGrid({
  items,
  headingLevel = "h3",
  mdColumnsClass = "md:grid-cols-3",
}: FeatureGridProps) {
  const Heading = headingLevel;

  return (
    <ul className={`grid grid-cols-1 gap-6 ${mdColumnsClass}`}>
      {items.map((item, index) => (
        <li
          key={index}
          className="rounded-lg border border-black/10 p-6 dark:border-white/10"
        >
          <Heading className="text-lg font-semibold tracking-tight">
            {item.title}
          </Heading>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
