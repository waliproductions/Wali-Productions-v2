/**
 * Homepage content model — single source of truth for homepage copy.
 *
 * Content below is populated from approved canonical documentation:
 * CORE_MESSAGES, KINGDOM_MISSION, MISSION_VISION_VALUES, COMPANY_PROFILE,
 * COMPANY_STORY, VALUE_PROPOSITIONS, COMPETITIVE_ADVANTAGES, CLIENT_PROMISE,
 * and the SERVICES documentation.
 *
 * This copy must only be changed through the approved documentation process.
 * Do not author or alter mission, statement-of-faith, governance, identity, or
 * capability claims here; update the canonical documents first.
 */

export type Cta = {
  label: string;
  /** Links to built routes within the site. */
  href: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type HomeContent = {
  hero: {
    /** Approved business identity (COMPANY_PROFILE / CORE_MESSAGES). */
    identity: string;
    headline: string;
    subhead: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
  };
  mission: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: FeatureItem[];
  };
  government: {
    eyebrow: string;
    heading: string;
    body: string;
    items: FeatureItem[];
  };
  whyChoose: {
    eyebrow: string;
    heading: string;
    items: FeatureItem[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
  };
};

export const homeContent: HomeContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: "Technology with excellence, integrity, and purpose.",
    subhead:
      "Wali Productions LLC is a Christian Veteran-Owned technology and digital solutions company committed to solving real-world problems through engineering excellence, innovation, and faithful service.",
    primaryCta: { label: "Request a Consultation", href: "/contact" },
    secondaryCta: { label: "Explore Our Services", href: "/services" },
  },
  mission: {
    eyebrow: "Our Mission",
    heading: "Technology is our profession. Service is our calling.",
    body: "We exist to provide professional technology and digital solutions while honoring King Jesus The Christ through integrity, excellence, faithful stewardship, and service. Technology is the profession through which we serve, and faithfulness to Jesus Christ remains our highest priority.",
  },
  services: {
    eyebrow: "What We Do",
    heading: "Professional technology and digital solutions.",
    intro:
      "Wali Productions LLC provides professional technology and digital solutions built on integrity, technical excellence, and long-term client relationships.",
    items: [
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
        title: "AI Integration & Business Automation",
        description:
          "Practical AI and automation that improve productivity while preserving human oversight.",
      },
    ],
  },
  government: {
    eyebrow: "Government Contracting",
    heading: "Disciplined, standards-based government technology services.",
    body: "We provide professional technology services that support federal, state, and local government agencies through ethical, reliable, and standards-based solutions—delivered with disciplined planning, technical excellence, and thorough documentation.",
    items: [
      {
        title: "Veteran-Owned Discipline",
        description:
          "Military experience contributes to disciplined planning, accountability, and mission-focused execution.",
      },
      {
        title: "Documentation-Driven Delivery",
        description:
          "Projects are planned, documented, reviewed, and version controlled to improve quality and long-term maintainability.",
      },
      {
        title: "Standards-Based Solutions",
        description:
          "Solutions meet applicable contractual requirements and professional standards, with accountability, transparency, and security awareness.",
      },
    ],
  },
  whyChoose: {
    eyebrow: "Why Wali Productions",
    heading: "A trusted, long-term technology partner.",
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
  cta: {
    heading: "Let's start a conversation.",
    body: "When you work with Wali Productions LLC, you can expect honesty, professionalism, integrity, and a sincere commitment to serving your best interests.",
    primaryCta: { label: "Request a Consultation", href: "/contact" },
  },
};
