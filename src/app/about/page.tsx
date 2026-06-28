import { buildMetadata } from "@/lib/seo";
import { aboutContent } from "@/config/about";
import { AboutHero } from "@/components/about/AboutHero";
import { NarrativeSection } from "@/components/about/NarrativeSection";
import { CoreValues } from "@/components/about/CoreValues";
import { AboutCallToAction } from "@/components/about/AboutCallToAction";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn about Wali Productions LLC — a Christian Veteran-Owned technology firm founded on integrity, engineering excellence, and faithful service to clients and community.",
  path: "/about",
});

/**
 * Wali Productions LLC — About page.
 *
 * Composes the approved About sections in order. All copy is sourced from
 * `src/config/about.ts`, which currently holds placeholders pending approved
 * messaging from canonical documentation.
 */
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
        id="faith-foundation"
        eyebrow={faithFoundation.eyebrow}
        heading={faithFoundation.heading}
        paragraphs={faithFoundation.paragraphs}
      />
      <NarrativeSection
        id="veteran-service"
        eyebrow={veteranService.eyebrow}
        heading={veteranService.heading}
        paragraphs={veteranService.paragraphs}
        tone="muted"
      />
      <NarrativeSection
        id="technology-journey"
        eyebrow={technologyJourney.eyebrow}
        heading={technologyJourney.heading}
        paragraphs={technologyJourney.paragraphs}
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
