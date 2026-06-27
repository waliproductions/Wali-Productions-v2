import { Section, SectionEyebrow } from "@/components/home/Section";

type GovNarrativeProps = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  tone?: "default" | "muted";
};

export function GovNarrative({
  id,
  eyebrow,
  heading,
  paragraphs,
  tone = "default",
}: GovNarrativeProps) {
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
        <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
