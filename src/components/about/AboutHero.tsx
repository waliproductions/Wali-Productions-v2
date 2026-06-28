import { aboutContent } from "@/config/about";
import { PageHero } from "@/components/ui/PageHero";

export function AboutHero() {
  const { identity, headline, subhead } = aboutContent.hero;
  return (
    <PageHero
      headingId="about-hero-heading"
      identity={identity}
      headline={headline}
      subhead={subhead}
    />
  );
}
