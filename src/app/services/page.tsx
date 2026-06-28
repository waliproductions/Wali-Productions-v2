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
  description: "Website development, software engineering, AI integration, IT consulting, streaming production, and government technology services from Wali Productions LLC — Christian Veteran-Owned.",
  path: "/services",
});

/**
 * Wali Productions LLC — Services page.
 *
 * Composes the approved Services sections in order. All copy is sourced from
 * `src/config/services.ts`, which currently holds placeholders pending approved
 * messaging from canonical documentation (docs/07-Content, incl. Services).
 */
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
