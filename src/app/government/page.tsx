import { buildMetadata } from "@/lib/seo";
import { governmentContent } from "@/config/government";
import { GovernmentHero } from "@/components/government/GovernmentHero";
import { GovNarrative } from "@/components/government/GovNarrative";
import { CapabilityGridSection } from "@/components/government/CapabilityGridSection";
import { RegistrationStatus } from "@/components/government/RegistrationStatus";
import { PastPerformance } from "@/components/government/PastPerformance";
import { GovernmentCallToAction } from "@/components/government/GovernmentCallToAction";

export const metadata = buildMetadata({
  title: "Government Contracting",
  description:
    "Wali Productions LLC — Veteran-Owned small business offering technology services for federal, state, and local government agencies. Software engineering, cybersecurity, AI integration, and IT consulting. VOSB-eligible, government contracting ready.",
  path: "/government",
});

/**
 * Wali Productions LLC — Government Contracting page.
 *
 * Composes the government sections in order. All copy is sourced from
 * `src/config/government.ts`, which holds placeholders pending verified
 * documentation. Official identifiers (UEI, CAGE, NAICS, certifications,
 * SAM.gov status) and past performance are never authored here.
 */
export default function GovernmentPage() {
  const { readiness, competencies, differentiators, capabilityStatement } =
    governmentContent;

  return (
    <>
      <GovernmentHero />
      <GovNarrative
        id="readiness"
        eyebrow={readiness.eyebrow}
        heading={readiness.heading}
        paragraphs={readiness.paragraphs}
      />
      <CapabilityGridSection
        id="competencies"
        eyebrow={competencies.eyebrow}
        heading={competencies.heading}
        items={competencies.items}
        tone="muted"
      />
      <CapabilityGridSection
        id="differentiators"
        eyebrow={differentiators.eyebrow}
        heading={differentiators.heading}
        items={differentiators.items}
        layout="list"
      />
      <GovNarrative
        id="capability-statement"
        eyebrow={capabilityStatement.eyebrow}
        heading={capabilityStatement.heading}
        paragraphs={capabilityStatement.paragraphs}
        tone="muted"
      />
      <RegistrationStatus />
      <PastPerformance />
      <GovernmentCallToAction />
    </>
  );
}
