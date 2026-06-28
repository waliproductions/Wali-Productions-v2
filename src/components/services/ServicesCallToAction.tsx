import { servicesContent } from "@/config/services";
import { GradientCTA } from "@/components/ui/GradientCTA";

export function ServicesCallToAction() {
  const { heading, body, primaryCta } = servicesContent.cta;
  return (
    <GradientCTA
      id="services-cta"
      heading={heading}
      body={body}
      primaryCta={primaryCta}
    />
  );
}
