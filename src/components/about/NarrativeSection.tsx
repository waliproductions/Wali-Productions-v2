import { Section, SectionEyebrow } from "@/components/home/Section";

type NarrativeSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  /** Subtle alternating background for visual rhythm between sections. */
  tone?: "default" | "muted";
};

/**
 * Shared layout for the narrative About sections (company story, founder,
 * faith foundation, veteran service, technology journey, client promise).
 * Reuses the homepage Section primitive so spacing and width stay aligned.
 * This component authors no content; it renders whatever copy is passed in.
 */
export function NarrativeSection({
  id,
  eyebrow,
  heading,
  paragraphs,
  tone = "default",
}: NarrativeSectionProps) {
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
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
