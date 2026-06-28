import { Section, SectionEyebrow } from "@/components/home/Section";
import type { Capability } from "@/config/government";

type CapabilityGridSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  items: Capability[];
  mdColumnsClass?: string;
  tone?: "default" | "muted";
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
      ? "border-t border-black/10 bg-gov-light dark:border-white/10"
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
                <div className="h-0.5 w-8 bg-[#4A7DB5]" />
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
          <ul className={`grid grid-cols-1 gap-4 ${mdColumnsClass}`}>
            {items.map((item, i) => (
              <li
                key={i}
                className="rounded-xl border border-black/10 bg-white p-6 shadow-card transition-all hover:shadow-card-hover hover:border-[#4A7DB5]/25 dark:border-white/10 dark:bg-white/[0.03]"
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
        )}
      </div>
    </Section>
  );
}
