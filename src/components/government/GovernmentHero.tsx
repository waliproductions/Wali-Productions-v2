import { governmentContent } from "@/config/government";
import { PageHero } from "@/components/ui/PageHero";

export function GovernmentHero() {
  const { identity, headline, subhead } = governmentContent.hero;
  return (
    <PageHero
      headingId="government-hero-heading"
      identity={identity}
      headline={headline}
      subhead={subhead}
      badges={[
        "Veteran-Owned Small Business",
        "SAM.gov Registered",
        "Federal, State & Local",
        "Security-First Delivery",
      ]}
    />
  );
}
