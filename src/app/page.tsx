import { Hero } from "@/components/home/Hero";
import { CredibilityBar } from "@/components/home/CredibilityBar";
import { Mission } from "@/components/home/Mission";
import { ClientTypes } from "@/components/home/ClientTypes";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { GovernmentContracting } from "@/components/home/GovernmentContracting";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CallToAction } from "@/components/home/CallToAction";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  absoluteTitle:
    "Wali Productions — Enterprise Technology Consulting & Digital Transformation",
  description:
    "Wali Productions LLC delivers enterprise technology consulting, cybersecurity, AI integration, software engineering, and digital transformation for government agencies, nonprofits, churches, and private enterprises. Veteran-Owned.",
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
      <CallToAction />
    </>
  );
}
