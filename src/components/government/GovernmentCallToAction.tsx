import { governmentContent } from "@/config/government";
import { GradientCTA } from "@/components/ui/GradientCTA";

export function GovernmentCallToAction() {
  const { heading, body, primaryCta } = governmentContent.cta;
  return (
    <GradientCTA
      id="government-cta"
      heading={heading}
      body={body}
      primaryCta={primaryCta}
      secondaryLink={{ label: "View full capabilities", href: "/government" }}
    />
  );
}
