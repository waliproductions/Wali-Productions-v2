import { buildMetadata } from "@/lib/seo";
import { contactContent } from "@/config/contact";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactNarrative } from "@/components/contact/ContactNarrative";
import { ConsultationRequest } from "@/components/contact/ConsultationRequest";
import { ServiceInquiryCategories } from "@/components/contact/ServiceInquiryCategories";
import { ContactInformation } from "@/components/contact/ContactInformation";
import { ContactCallToAction } from "@/components/contact/ContactCallToAction";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Wali Productions LLC — Christian Veteran-Owned Technology & Digital Solutions.",
  path: "/contact",
});

/**
 * Wali Productions LLC — Contact page.
 *
 * Composes the contact sections in order. All copy is sourced from
 * `src/config/contact.ts`, which holds placeholders pending verified
 * documentation. Contact details and the form endpoint are never authored here;
 * the consultation form is presentational only.
 */
export default function ContactPage() {
  const { overview, clientPromise } = contactContent;

  return (
    <>
      <ContactHero />
      <ContactNarrative
        id="contact-overview"
        eyebrow={overview.eyebrow}
        heading={overview.heading}
        paragraphs={overview.paragraphs}
      />
      <ConsultationRequest />
      <ServiceInquiryCategories />
      <ContactNarrative
        id="client-promise"
        eyebrow={clientPromise.eyebrow}
        heading={clientPromise.heading}
        paragraphs={clientPromise.paragraphs}
        tone="muted"
      />
      <ContactInformation />
      <ContactCallToAction />
    </>
  );
}
