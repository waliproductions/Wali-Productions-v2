import { Section, SectionEyebrow } from "@/components/home/Section";

type ProseSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  tone?: "default" | "muted";
};

/**
 * Shared prose layout for the text-heavy Services sections (introduction and
 * client promise summary). Reuses the homepage Section primitive so spacing and
 * width stay aligned. Authors no content; renders whatever copy is passed in.
 */
export function ProseSection({
  id,
  eyebrow,
  heading,
  paragraphs,
  tone = "default",
}: ProseSectionProps) {
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
