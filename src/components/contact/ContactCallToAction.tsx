import { contactContent } from "@/config/contact";
import { GradientCTA } from "@/components/ui/GradientCTA";

export function ContactCallToAction() {
  const { heading, body, primaryCta, note } = contactContent.cta;
  return (
    <GradientCTA
      id="contact-cta"
      heading={heading}
      body={body}
      primaryCta={primaryCta}
      note={note}
    />
  );
}
