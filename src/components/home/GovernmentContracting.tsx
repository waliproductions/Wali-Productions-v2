import { homeContent } from "@/config/home";
import { Section, SectionEyebrow } from "./Section";
import { FeatureGrid } from "./FeatureGrid";

/**
 * Government contracting readiness.
 *
 * NOTE: Readiness, certification, and capability statements are
 * representations about the business and MUST come from approved
 * documentation. Placeholders only until then — no claims are authored here.
 */
export function GovernmentContracting() {
  const { eyebrow, heading, body, items } = homeContent.government;

  return (
    <Section
      labelledById="government-heading"
      className="border-t border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03]"
    >
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          id="government-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-300">
          {body}
        </p>
      </div>
      <div className="mt-12">
        <FeatureGrid items={items} />
      </div>
    </Section>
  );
}
