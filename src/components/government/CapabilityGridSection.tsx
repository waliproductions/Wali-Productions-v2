import { Section, SectionEyebrow } from "@/components/home/Section";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import type { Capability } from "@/config/government";

type CapabilityGridSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  items: Capability[];
  mdColumnsClass?: string;
  tone?: "default" | "muted";
  /** "list" renders gold-bar items instead of cards — use to vary adjacent sections. */
  layout?: "grid" | "list";
};

export function CapabilityGridSection({
  id,
  eyebrow,
  heading,
  items,
  mdColumnsClass = "md:grid-cols-2",
  tone = "default",
  layout = "grid",
}: CapabilityGridSectionProps) {
  const toneClass =
    tone === "muted"
      ? "border-t border-black/10 bg-gov-light dark:border-white/10 dark:bg-gov-light"
      : "border-t border-black/10 dark:border-white/10";

  return (
    <Section id={id} labelledById={`${id}-heading`} className={toneClass}>
      <div className="max-w-3xl">
        <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
        <h2
          id={`${id}-heading`}
          className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
      </div>

      <div className="mt-12">
        {layout === "list" ? (
          <div className={`grid grid-cols-1 gap-x-12 gap-y-8 ${mdColumnsClass}`}>
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
        ) : (
          <FeatureGrid items={items} mdColumnsClass={mdColumnsClass} />
        )}
      </div>
    </Section>
  );
}
