/**
 * Contact page content model — single source of truth.
 *
 * Populated from approved canonical documentation: CORE_MESSAGES, CLIENT_PROMISE,
 * CLIENT_WORKFLOW, SERVICES, SERVICES_LIBRARY, and BUSINESS_INFORMATION.
 *
 * Contact details (email, phone, address, business hours) remain `pending()`
 * placeholders: BUSINESS_INFORMATION.md records them as "to be maintained," so no
 * verified values are documented and none are invented. The consultation form is
 * presentational only (no backend). This copy must only be changed through the
 * approved documentation process.
 */

/** Marks detail that is not yet documented/verified and records its source. */
const pending = (note: string, source: string) =>
  `[ pending verified detail: ${note} — source: ${source} ]`;

export type Cta = {
  label: string;
  /** Links to built routes / on-page anchors within the site. */
  href: string;
};

export type InquiryCategory = {
  title: string;
  description: string;
};

/** A labeled contact-detail row (e.g., Email, Phone). */
export type ContactDetail = {
  label: string;
  value: string;
};

export type ContactContent = {
  hero: {
    identity: string;
    headline: string;
    subhead: string;
  };
  overview: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  consultation: {
    eyebrow: string;
    heading: string;
    intro: string;
    serviceOptions: string[];
  };
  inquiryCategories: {
    eyebrow: string;
    heading: string;
    items: InquiryCategory[];
  };
  clientPromise: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  contactInfo: {
    eyebrow: string;
    heading: string;
    note: string;
    items: ContactDetail[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
  };
};

export const contactContent: ContactContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: "Let's start a conversation.",
    subhead:
      "Tell us about your project or inquiry, and we'll respond with honesty, professionalism, and a sincere commitment to serving your best interests.",
  },
  overview: {
    eyebrow: "Get in Touch",
    heading: "Get in touch.",
    paragraphs: [
      "Every engagement begins with an initial inquiry and a discovery conversation to understand your goals.",
      "We communicate honestly, professionally, and respectfully throughout every project.",
    ],
  },
  consultation: {
    eyebrow: "Request a Consultation",
    heading: "Request a consultation.",
    intro:
      "Share a few details about your needs and the service you're interested in, and we'll follow up to discuss how we can help.",
    serviceOptions: [
      "Technology Consulting",
      "Software Development",
      "Website Design & Development",
      "AI Integration & Business Automation",
      "Business Automation",
      "OBS Studio & Live Streaming",
      "Government Technology Services",
      "Technical Training & Mentorship",
      "Other",
    ],
  },
  inquiryCategories: {
    eyebrow: "Service Inquiries",
    heading: "What can we help with?",
    items: [
      {
        title: "Technology & Software",
        description:
          "Websites, software, consulting, AI, automation, and systems administration.",
      },
      {
        title: "Digital & Media",
        description:
          "Streaming, media production, content, and technical training.",
      },
      {
        title: "Government Services",
        description:
          "Government technology services and contracting support.",
      },
    ],
  },
  clientPromise: {
    eyebrow: "Our Promise",
    heading: "Our promise to every client.",
    paragraphs: [
      "When you work with Wali Productions LLC, you can expect honesty, professionalism, integrity, and a sincere commitment to serving your best interests.",
    ],
  },
  contactInfo: {
    eyebrow: "Contact Information",
    heading: "Contact information.",
    note: "Official contact details are published only once finalized. They are maintained as official business information is confirmed.",
    items: [
      { label: "Email", value: pending("verified email address", "01-Business/BUSINESS_INFORMATION.md (to be maintained)") },
      { label: "Phone", value: pending("verified phone number", "01-Business/BUSINESS_INFORMATION.md (to be maintained)") },
      { label: "Address", value: pending("verified headquarters / business address", "01-Business/BUSINESS_INFORMATION.md (to be maintained)") },
      { label: "Business Hours", value: pending("verified business hours", "01-Business/BUSINESS_INFORMATION.md (not yet documented)") },
    ],
  },
  cta: {
    heading: "Ready to get started?",
    body: "When you work with Wali Productions LLC, you can expect honesty, professionalism, integrity, and a sincere commitment to serving your best interests.",
    primaryCta: { label: "Request a Consultation", href: "#consultation" },
  },
};
