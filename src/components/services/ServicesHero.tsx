import { servicesContent } from "@/config/services";
import { PageHero } from "@/components/ui/PageHero";

export function ServicesHero() {
  const { identity, headline, subhead } = servicesContent.hero;
  return (
    <PageHero
      headingId="services-hero-heading"
      identity={identity}
      headline={headline}
      subhead={subhead}
    />
  );
}
