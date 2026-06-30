import { buildMetadata } from "@/lib/seo";
import { aboutContent } from "@/config/about";
import { AboutHero } from "@/components/about/AboutHero";
import { NarrativeSection } from "@/components/about/NarrativeSection";
import { CoreValues } from "@/components/about/CoreValues";
import { TechCapabilities } from "@/components/about/TechCapabilities";
import { AboutCallToAction } from "@/components/about/AboutCallToAction";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Wali Productions LLC — Veteran-Owned enterprise technology consulting founded on integrity, engineering excellence, and faithful service. Learn about our mission, values, and commitment to government agencies, businesses, nonprofits, and churches.",
  path: "/about",
});

export default function AboutPage() {
  const {
    companyStory,
    founderStory,
    faithFoundation,
    veteranService,
    technologyJourney,
    clientPromise,
  } = aboutContent;

  return (
    <>
      <AboutHero />
      <NarrativeSection
        id="company-story"
        eyebrow={companyStory.eyebrow}
        heading={companyStory.heading}
        paragraphs={companyStory.paragraphs}
      />
      <NarrativeSection
        id="founder-story"
        eyebrow={founderStory.eyebrow}
        heading={founderStory.heading}
        paragraphs={founderStory.paragraphs}
        tone="muted"
      />
      <NarrativeSection
        id="veteran-service"
        eyebrow={veteranService.eyebrow}
        heading={veteranService.heading}
        paragraphs={veteranService.paragraphs}
      />
      <TechCapabilities />
      <NarrativeSection
        id="technology-journey"
        eyebrow={technologyJourney.eyebrow}
        heading={technologyJourney.heading}
        paragraphs={technologyJourney.paragraphs}
        tone="muted"
      />
      <NarrativeSection
        id="faith-foundation"
        eyebrow={faithFoundation.eyebrow}
        heading={faithFoundation.heading}
        paragraphs={faithFoundation.paragraphs}
      />
      <CoreValues />
      <NarrativeSection
        id="client-promise"
        eyebrow={clientPromise.eyebrow}
        heading={clientPromise.heading}
        paragraphs={clientPromise.paragraphs}
        tone="muted"
      />
      <AboutCallToAction />
    </>
  );
}
