import { buildMetadata } from "@/lib/seo";
import { CapabilityStatementPage } from "@/components/capability-statement/CapabilityStatementPage";

export const metadata = buildMetadata({
  title: "Capability Statement",
  description:
    "Wali Productions LLC capability statement — Veteran-Owned enterprise technology consulting. Core competencies, technology services, and government contracting information.",
  path: "/capability-statement",
});

export default function CapabilityStatement() {
  return <CapabilityStatementPage />;
}
