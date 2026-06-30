import { aboutContent } from "@/config/about";
import { GradientCTA } from "@/components/ui/GradientCTA";

export function AboutCallToAction() {
  const { heading, body, primaryCta, note } = aboutContent.cta;
  return (
    <GradientCTA
      id="about-cta"
      heading={heading}
      body={body}
      primaryCta={primaryCta}
      note={note}
    />
  );
}
