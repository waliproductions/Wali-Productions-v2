import { contactContent } from "@/config/contact";
import { Section, SectionEyebrow } from "@/components/home/Section";
import { ConsultationForm } from "./ConsultationForm";

/**
 * Consultation request section. Wraps the (presentational-only) consultation
 * form with its heading and intro. The form is not connected to a backend.
 */
export function ConsultationRequest() {
  const { eyebrow, heading, intro } = contactContent.consultation;

  return (
    <Section
      id="consultation"
      labelledById="consultation-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="consultation-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-300">
          {intro}
        </p>
      </div>
      <div className="mt-10">
        <ConsultationForm />
      </div>
    </Section>
  );
}
