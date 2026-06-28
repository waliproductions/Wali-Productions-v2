import { homeContent } from "@/config/home";
import { Section, SectionEyebrow } from "./Section";

export function Mission() {
  const { eyebrow, heading, body } = homeContent.mission;

  return (
    <Section
      labelledById="mission-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
        {/* Left: heading */}
        <div>
          <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
          <h2
            id="mission-heading"
            className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            {heading}
          </h2>
        </div>

        {/* Right: body with accent */}
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#4A7DB5] to-[#4A7DB5]/10 rounded-full" aria-hidden="true" />
          <p className="pl-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 lg:text-lg">
            {body}
          </p>
        </div>
      </div>
    </Section>
  );
}
