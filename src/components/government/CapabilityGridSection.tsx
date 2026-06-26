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
};

/**
 * Shared grid layout for the government sections that render capability cards
 * (core competencies and differentiators). Reuses the shared FeatureGrid for
 * layout consistency. Authors no content.
 */
export function CapabilityGridSection({
  id,
  eyebrow,
  heading,
  items,
  mdColumnsClass = "md:grid-cols-2",
  tone = "default",
}: CapabilityGridSectionProps) {
  const toneClass =
    tone === "muted"
      ? "border-t border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03]"
      : "border-t border-black/10 dark:border-white/10";

  return (
    <Section id={id} labelledById={`${id}-heading`} className={toneClass}>
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id={`${id}-heading`}
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
      </div>
      <div className="mt-12">
        <FeatureGrid items={items} mdColumnsClass={mdColumnsClass} />
      </div>
    </Section>
  );
}
