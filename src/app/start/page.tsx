import { buildMetadata } from "@/lib/seo";
import { StartHero } from "@/components/start/StartHero";
import { StartForm } from "@/components/start/StartForm";
import { StartTrustBar } from "@/components/start/StartTrustBar";

export const metadata = buildMetadata({
  title: "Start a Project",
  description:
    "Begin your technology project with Wali Productions LLC. Share your goals, budget, and timeline — we'll respond within 24 hours with an honest assessment. Veteran-Owned.",
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
