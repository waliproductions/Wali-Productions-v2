import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacyContent } from "@/config/legal";

export const metadata = buildMetadata({
  title: privacyContent.title,
  description: privacyContent.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage doc={privacyContent} />;
}
