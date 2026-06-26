import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";
import { accessibilityContent } from "@/config/legal";

export const metadata = buildMetadata({
  title: accessibilityContent.title,
  description: accessibilityContent.description,
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return <LegalPage doc={accessibilityContent} />;
}
