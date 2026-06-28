/**
 * Services page content model — single source of truth for Services page copy.
 *
 * Populated from approved canonical documentation: SERVICES, SERVICES_LIBRARY,
 * the individual service definitions under docs/07-Content/Services, CORE_MESSAGES,
 * VALUE_PROPOSITIONS, BUSINESS_CAPABILITIES, and CLIENT_PROMISE.
 *
 * This copy must only be changed through the approved documentation process.
 */

export type Cta = {
  label: string;
  /** Links to built routes within the site. */
  href: string;
};

export type ServiceCard = {
  title: string;
  description: string;
  /** URL-safe identifier used for deep-linking and future detail pages. */
  id?: string;
  slug?: string;
  technologies?: string[];
  deliverables?: string[];
  /** Industry verticals this service applies to. */
  industries?: string[];
  /** e.g. "fixed-price" | "hourly" | "retainer" | "custom" */
  pricingModel?: string;
  featured?: boolean;
  govRelevant?: boolean;
  /** e.g. "2–4 weeks", "1–3 months" */
  estimatedTimeline?: string;
};

export type ServiceCategory = {
  title: string;
  description: string;
  services: ServiceCard[];
};

export type ServicesContent = {
  hero: {
    identity: string;
    headline: string;
    subhead: string;
  };
  intro: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  categories: ServiceCategory[];
  whyWork: {
    eyebrow: string;
    heading: string;
    items: ServiceCard[];
  };
  clientPromise: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
  };
};

export const servicesContent: ServicesContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: "Professional technology and digital solutions.",
    subhead:
      "Wali Productions LLC provides professional technology and digital solutions built on integrity, technical excellence, and long-term client relationships.",
  },
  intro: {
    eyebrow: "Our Services",
    heading: "Practical solutions, delivered with integrity.",
    paragraphs: [
      "We deliver practical solutions that help clients operate more effectively and confidently—focusing on real business problems rather than technology for its own sake.",
      "Every service provided by Wali Productions LLC reflects professionalism, integrity, technical excellence, and faithful stewardship.",
    ],
  },
  categories: [
    {
      title: "Technology Services",
      description:
        "Engineering, consulting, and IT services that solve real business problems.",
      services: [
        {
          title: "Website Design & Development",
          description:
            "Modern, accessible websites built for performance, maintainability, and long-term growth.",
        },
        {
          title: "Software Development",
          description:
            "Custom software engineered to solve real problems—reliable, secure, scalable, and well-documented.",
        },
        {
          title: "Technology Consulting",
          description:
            "Strategic guidance to evaluate, plan, implement, and improve technology aligned with your objectives.",
        },
        {
          title: "AI Integration & Business Automation",
          description:
            "Practical AI and automation that improve productivity while preserving human oversight.",
        },
        {
          title: "Linux & Systems Administration",
          description:
            "Stable, secure, well-documented Linux systems and infrastructure built to support future growth.",
        },
      ],
    },
    {
      title: "Digital & Media Services",
      description:
        "Streaming, media, and training services that help organizations communicate and grow.",
      services: [
        {
          title: "OBS Studio & Multi-Platform Streaming",
          description:
            "Reliable live streaming workflows designed for stability, maintainability, and ease of operation.",
        },
        {
          title: "Technical Training & Mentorship",
          description:
            "Technical education and mentoring that help clients confidently use and maintain their technology.",
        },
      ],
    },
    {
      title: "Government Services",
      description:
        "Technology services that support government agencies and prime contractors.",
      services: [
        {
          title: "Government Technology Services",
          description:
            "Software, websites, consulting, AI, and automation for federal, state, and local agencies—ethical, reliable, and standards-based.",
        },
        {
          title: "Government Contracting Support",
          description:
            "Capability statement development and registration support as the company prepares for government contracting.",
        },
      ],
    },
  ],
  whyWork: {
    eyebrow: "Why Wali Productions",
    heading: "Why work with us.",
    items: [
      {
        title: "Integrity Before Profit",
        description:
          "We believe long-term trust is more valuable than short-term financial gain.",
      },
      {
        title: "Engineering Excellence",
        description:
          "We pursue continual learning and technical improvement to provide high-quality solutions.",
      },
      {
        title: "Practical Solutions",
        description:
          "Technology should solve real business problems rather than introduce unnecessary complexity.",
      },
      {
        title: "Long-Term Relationships",
        description:
          "We seek to become trusted partners rather than one-time vendors.",
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
  cta: {
    heading: "Let's discuss your project.",
    body: "Our objective is not simply to complete projects—it is to build lasting relationships through dependable service, integrity, and consistent results.",
    primaryCta: { label: "Request a Consultation", href: "/contact" },
  },
};
