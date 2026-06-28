import { Hero } from "@/components/home/Hero";
import { CredibilityBar } from "@/components/home/CredibilityBar";
import { Mission } from "@/components/home/Mission";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { GovernmentContracting } from "@/components/home/GovernmentContracting";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CallToAction } from "@/components/home/CallToAction";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  absoluteTitle:
    "Wali Productions — Christian Veteran-Owned Technology & Digital Solutions",
  description:
    "Wali Productions LLC — Christian Veteran-Owned Technology & Digital Solutions.",
  path: "/",
});

/**
 * Wali Productions LLC — homepage.
 *
 * Composes the approved homepage sections in order. All copy is sourced from
 * `src/config/home.ts`, which currently holds placeholders pending approved
 * messaging from canonical documentation.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <Mission />
      <ServicesOverview />
      <GovernmentContracting />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
}
