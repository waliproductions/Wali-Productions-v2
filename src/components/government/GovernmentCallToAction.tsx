import { governmentContent } from "@/config/government";
import { GradientCTA } from "@/components/ui/GradientCTA";

export function GovernmentCallToAction() {
  const { heading, body, primaryCta } = governmentContent.cta;
  return (
    <GradientCTA
      id="government-cta"
      heading={heading}
      body={body}
      primaryCta={{ label: "Start a Project", href: "/start" }}
      secondaryLink={{ label: "View capability statement", href: "/capability-statement" }}
      note="VOSB · Government Contracting Ready · Response within 24 hours"
    />
  );
}
