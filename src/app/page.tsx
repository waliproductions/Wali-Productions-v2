import { Hero } from "@/components/home/Hero";
import { CredibilityBar } from "@/components/home/CredibilityBar";
import { Mission } from "@/components/home/Mission";
import { ClientTypes } from "@/components/home/ClientTypes";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { GovernmentContracting } from "@/components/home/GovernmentContracting";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FAQ } from "@/components/home/FAQ";
import { CallToAction } from "@/components/home/CallToAction";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  absoluteTitle:
    "Wali Productions — Enterprise Technology Consulting | Springfield, Missouri",
  description:
    "Wali Productions LLC — Veteran-Owned technology consulting based in Springfield, Missouri. Custom software, cybersecurity, AI integration, cloud solutions, and government IT for agencies, nonprofits, churches, and businesses nationwide. VOSB-eligible. Government contracting ready.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <Mission />
      <ClientTypes />
      <ServicesOverview />
      <GovernmentContracting />
      <ProcessSection />
      <IndustriesSection />
      <WhyChooseUs />
      <FAQ />
      <CallToAction />
    </>
  );
}
