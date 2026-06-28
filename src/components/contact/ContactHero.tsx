import { contactContent } from "@/config/contact";
import { PageHero } from "@/components/ui/PageHero";

export function ContactHero() {
  const { identity, headline, subhead } = contactContent.hero;
  return (
    <PageHero
      headingId="contact-hero-heading"
      identity={identity}
      headline={headline}
      subhead={subhead}
    />
  );
}
