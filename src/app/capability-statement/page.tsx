import { buildMetadata } from "@/lib/seo";
import { CapabilityStatementPage } from "@/components/capability-statement/CapabilityStatementPage";

export const metadata = buildMetadata({
  title: "Capability Statement",
  description:
    "Wali Productions LLC capability statement — Veteran-Owned Small Business (VOSB) technology consulting. Core services: custom software, cybersecurity, AI integration, cloud solutions, IT consulting, and government IT. SAM.gov registration in preparation. VOSB set-aside eligible.",
  path: "/capability-statement",
});

export default function CapabilityStatement() {
  return <CapabilityStatementPage />;
}
