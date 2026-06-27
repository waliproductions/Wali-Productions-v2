import { homeContent } from "@/config/home";
import { Section, SectionEyebrow } from "./Section";

export function Mission() {
  const { eyebrow, heading, body } = homeContent.mission;

  return (
    <Section
      labelledById="mission-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
      <h2
        id="mission-heading"
        className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
      >
        {heading}
      </h2>
      <div className="mt-8 max-w-2xl">
        <p className="border-l-2 border-[#4A7DB5] pl-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          {body}
        </p>
      </div>
    </Section>
  );
}
