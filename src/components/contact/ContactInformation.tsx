import { contactContent } from "@/config/contact";
import { Section, SectionEyebrow } from "@/components/home/Section";

function isPending(value: string): boolean {
  return value.toLowerCase().includes("pending verified detail");
}

export function ContactInformation() {
  const { eyebrow, heading, note, items } = contactContent.contactInfo;

  return (
    <Section
      id="contact-information"
      labelledById="contact-information-heading"
      className="border-t border-black/10 bg-gold-subtle dark:border-white/10 dark:bg-gold-subtle"
    >
      <div className="max-w-3xl">
        <SectionEyebrow variant="gold">{eyebrow}</SectionEyebrow>
        <h2
          id="contact-information-heading"
          className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <p role="note" className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          {note}
        </p>
      </div>

      <dl className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {item.label}
            </dt>
            <dd className="mt-2">
              {isPending(item.value) ? (
                <span className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-500 dark:bg-white/10 dark:text-neutral-400">
                  Not yet published
                </span>
              ) : (
                <span className="text-sm font-medium">{item.value}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
