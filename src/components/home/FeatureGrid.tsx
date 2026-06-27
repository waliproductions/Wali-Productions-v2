import type { ReactNode } from "react";
import type { FeatureItem } from "@/config/home";

type FeatureGridProps = {
  items: FeatureItem[];
  headingLevel?: "h3" | "h4";
  mdColumnsClass?: string;
  /** Optional: supply an icon node per card (keyed by title and index). */
  getIcon?: (title: string, index: number) => ReactNode;
  /** "dark" renders cards for use on dark section backgrounds. */
  variant?: "default" | "dark";
};

export function FeatureGrid({
  items,
  headingLevel = "h3",
  mdColumnsClass = "md:grid-cols-3",
  getIcon,
  variant = "default",
}: FeatureGridProps) {
  const Heading = headingLevel;

  const cardClass =
    variant === "dark"
      ? "rounded-xl border border-white/10 bg-white/[0.03] p-7 transition-all hover:border-white/20 hover:bg-white/[0.05]"
      : "rounded-xl border border-black/10 bg-white p-7 shadow-card transition-all hover:shadow-card-hover hover:border-black/[0.15] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20";

  return (
    <ul className={`grid grid-cols-1 gap-5 ${mdColumnsClass}`}>
      {items.map((item, index) => {
        const icon = getIcon ? getIcon(item.title, index) : null;
        return (
          <li key={index} className={cardClass}>
            {icon && <div className="mb-4 text-gold">{icon}</div>}
            <Heading className="font-display text-lg font-semibold tracking-tight">
              {item.title}
            </Heading>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {item.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
