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
      eyebrowClass="text-[#94A3B8]"
    />
  );
}
