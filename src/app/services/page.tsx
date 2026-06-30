import { buildMetadata } from "@/lib/seo";
import { servicesContent } from "@/config/services";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ProseSection } from "@/components/services/ProseSection";
import { ServiceCategories } from "@/components/services/ServiceCategories";
import { ServiceCatalog } from "@/components/services/ServiceCatalog";
import { WhyWork } from "@/components/services/WhyWork";
import { ServicesCallToAction } from "@/components/services/ServicesCallToAction";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Enterprise technology services from Wali Productions LLC — custom software, AI integration, cybersecurity, cloud solutions, IT consulting, and government IT services. Veteran-Owned small business serving government, commercial, nonprofits, and churches.",
  path: "/services",
});

export default function ServicesPage() {
  const { intro, clientPromise } = servicesContent;

  return (
    <>
      <ServicesHero />
      <ProseSection
        id="services-intro"
        eyebrow={intro.eyebrow}
        heading={intro.heading}
        paragraphs={intro.paragraphs}
      />
      <ServiceCategories />
      <ServiceCatalog />
      <WhyWork />
      <ProseSection
        id="client-promise"
        eyebrow={clientPromise.eyebrow}
        heading={clientPromise.heading}
        paragraphs={clientPromise.paragraphs}
        tone="muted"
      />
      <ServicesCallToAction />
    </>
  );
}
