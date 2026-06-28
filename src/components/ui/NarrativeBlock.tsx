import { Section, SectionEyebrow } from "@/components/ui/Section";

type NarrativeBlockProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  /** "light" = white background; "muted" = #F8FAFC background. Defaults to "light". */
  tone?: "light" | "muted";
};

export function NarrativeBlock({
  id,
  eyebrow,
  heading,
  paragraphs,
  tone = "light",
}: NarrativeBlockProps) {
  const headingId = id ? `${id}-heading` : undefined;
  const bgClass = tone === "muted" ? "bg-[#F8FAFC] dark:bg-transparent" : "";

  return (
    <Section
      id={id}
      labelledById={headingId}
      className={`border-t border-black/10 dark:border-white/10 ${bgClass}`.trim()}
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
          <h2
            id={headingId}
            className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {heading}
          </h2>
        </div>
        <div className="relative pl-6 lg:pl-8">
          <div
            className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-gradient-to-b from-[#4A7DB5] to-[#4A7DB5]/10"
            aria-hidden="true"
          />
          <div className="space-y-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
