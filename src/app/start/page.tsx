import { buildMetadata } from "@/lib/seo";
import { StartHero } from "@/components/start/StartHero";
import { StartForm } from "@/components/start/StartForm";
import { StartTrustBar } from "@/components/start/StartTrustBar";

export const metadata = buildMetadata({
  title: "Start a Project",
  description:
    "Begin your technology project with Wali Productions LLC. Government agencies, nonprofits, churches, and businesses — share your goals, budget, and timeline. We respond within 24 hours with an honest assessment. Veteran-Owned Small Business.",
  path: "/start",
});

export default function StartPage() {
  return (
    <>
      <StartHero />
      <StartForm />
      <StartTrustBar />
    </>
  );
}
