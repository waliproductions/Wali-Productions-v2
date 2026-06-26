import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsContent } from "@/config/legal";

export const metadata = buildMetadata({
  title: termsContent.title,
  description: termsContent.description,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage doc={termsContent} />;
}
