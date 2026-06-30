import { buildMetadata } from "@/lib/seo";
import { governmentContent } from "@/config/government";
import { GovernmentHero } from "@/components/government/GovernmentHero";
import { GovNarrative } from "@/components/government/GovNarrative";
import { CapabilityGridSection } from "@/components/government/CapabilityGridSection";
import { ProcurementReadiness } from "@/components/government/ProcurementReadiness";
import { RegistrationStatus } from "@/components/government/RegistrationStatus";
import { PastPerformance } from "@/components/government/PastPerformance";
import { GovernmentCallToAction } from "@/components/government/GovernmentCallToAction";

export const metadata = buildMetadata({
  title: "Government Contracting",
  description:
    "Wali Productions LLC — Veteran-Owned Small Business (VOSB) providing technology services for federal, state, and local government agencies. Software engineering, cybersecurity, AI integration, cloud solutions, and IT consulting. SAM.gov registration in preparation. VOSB set-aside eligible.",
  path: "/government",
});

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
      <ProcurementReadiness />
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
