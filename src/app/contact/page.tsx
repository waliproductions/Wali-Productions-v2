import { buildMetadata } from "@/lib/seo";
import { contactContent } from "@/config/contact";
import { ContactHero } from "@/components/contact/ContactHero";
import { ConsultationRequest } from "@/components/contact/ConsultationRequest";
import { ServiceInquiryCategories } from "@/components/contact/ServiceInquiryCategories";
import { ContactInformation } from "@/components/contact/ContactInformation";
import { ContactCallToAction } from "@/components/contact/ContactCallToAction";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Request a consultation with Wali Productions LLC — enterprise technology consulting, cybersecurity, AI integration, and government IT services. Veteran-Owned. Response within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  const { clientPromise } = contactContent;
  void clientPromise;
  return (
    <>
      <ContactHero />
      <ConsultationRequest />
      <ServiceInquiryCategories />
      <ContactInformation />
      <ContactCallToAction />
    </>
  );
}
