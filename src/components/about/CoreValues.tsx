import { aboutContent } from "@/config/about";
import { Section, SectionEyebrow } from "@/components/home/Section";

export function CoreValues() {
  const { eyebrow, heading, items } = aboutContent.coreValues;

  return (
    <Section
      id="core-values"
      labelledById="core-values-heading"
      className="border-t border-black/10 bg-[#F8FAFC] dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
        <h2
          id="core-values-heading"
          className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-black/10 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F4F8] dark:bg-white/[0.06]">
                <span className="text-xs font-bold text-[#1E3A5F]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
