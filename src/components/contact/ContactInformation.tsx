import { contactContent } from "@/config/contact";
import { Section, SectionEyebrow } from "@/components/home/Section";

/**
 * Contact information.
 *
 * Renders contact-detail rows (email, phone, address, hours) as a description
 * list. Values are intentionally unverified placeholders, and a visible
 * disclaimer makes that explicit so placeholders are never mistaken for real
 * contact details. No contact details are authored here.
 */
export function ContactInformation() {
  const { eyebrow, heading, note, items } = contactContent.contactInfo;

  return (
    <Section
      id="contact-information"
      labelledById="contact-information-heading"
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="contact-information-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <p
          role="note"
          className="mt-4 text-sm text-neutral-500 dark:text-neutral-400"
        >
          {note}
        </p>
      </div>

      <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-black/10 bg-black/10 sm:grid-cols-2 dark:border-white/10 dark:bg-white/10">
        {items.map((item) => (
          <div key={item.label} className="bg-background p-5">
            <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {item.label}
            </dt>
            <dd className="mt-1 text-base">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
