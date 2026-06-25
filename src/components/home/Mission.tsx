import { homeContent } from "@/config/home";
import { Section, SectionEyebrow } from "./Section";

/**
 * Mission section. Body copy is the approved mission statement (placeholder for
 * now). This component does not author mission content.
 */
export function Mission() {
  const { eyebrow, heading, body } = homeContent.mission;

  return (
    <Section labelledById="mission-heading">
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="mission-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          {body}
        </p>
      </div>
    </Section>
  );
}
