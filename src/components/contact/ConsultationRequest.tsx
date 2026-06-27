import { contactContent } from "@/config/contact";
import { Section, SectionEyebrow } from "@/components/home/Section";
import { ConsultationForm } from "./ConsultationForm";

export function ConsultationRequest() {
  const { eyebrow, heading, intro } = contactContent.consultation;

  return (
    <Section
      id="consultation"
      labelledById="consultation-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
        <h2
          id="consultation-heading"
          className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">
          {intro}
        </p>
      </div>
      <div className="mt-10">
        <ConsultationForm />
      </div>
    </Section>
  );
}
