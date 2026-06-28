import { homeContent } from "@/config/home";
import { GradientCTA } from "@/components/ui/GradientCTA";

export function CallToAction() {
  const { heading, body, primaryCta } = homeContent.cta;
  return (
    <GradientCTA
      id="cta"
      heading={heading}
      body={body}
      primaryCta={primaryCta}
      note="Christian Veteran-Owned · No commitment required"
      glowSide="left"
    />
  );
}
