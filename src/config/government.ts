/**
 * Government Contracting page content model — single source of truth.
 *
 * Populated from approved canonical documentation: GOVERNMENT_CONTRACTING,
 * CAPABILITY_STATEMENT, CERTIFICATIONS, NAICS_CODES, PAST_PERFORMANCE,
 * GOVERNMENT_TECHNOLOGY_SERVICES, COMPETITIVE_ADVANTAGES, BUSINESS_CAPABILITIES,
 * BUSINESS_INFORMATION, COMPANY_PROFILE, and CORE_MESSAGES.
 *
 * Per canonical policy and the founder's instructions, official identifiers
 * (UEI, CAGE, NAICS) and specific past performance are NOT invented; they remain
 * `pending()` placeholders until issued/documented. Registration items that are
 * documented as in progress are shown accurately as "in preparation"
 * (CERTIFICATIONS policy permits describing pending items as in progress when
 * accurate). This copy must only be changed through the approved documentation
 * process.
 */

/** Marks detail that is not yet documented/verified and records its source. */
const pending = (note: string, source: string) =>
  `[ pending verified detail: ${note} — source: ${source} ]`;

export type Cta = {
  label: string;
  /** Links to built routes within the site. */
  href: string;
};

export type Capability = {
  title: string;
  description: string;
};

/** A labeled official-data row (e.g., UEI, CAGE). */
export type RegistrationItem = {
  label: string;
  value: string;
};

export type ProcurementStep = {
  step: string;
  title: string;
  description: string;
};

export type GovernmentContent = {
  hero: {
    identity: string;
    headline: string;
    subhead: string;
  };
  readiness: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  competencies: {
    eyebrow: string;
    heading: string;
    items: Capability[];
  };
  differentiators: {
    eyebrow: string;
    heading: string;
    items: Capability[];
  };
  procurementReadiness: {
    eyebrow: string;
    heading: string;
    body: string;
    setAsideNote: string;
    steps: ProcurementStep[];
  };
  capabilityStatement: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  registration: {
    eyebrow: string;
    heading: string;
    note: string;
    items: RegistrationItem[];
  };
  pastPerformance: {
    eyebrow: string;
    heading: string;
    note: string;
    items: Capability[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
  };
};

export const governmentContent: GovernmentContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: "Government technology services, delivered with discipline.",
    subhead:
      "Wali Productions LLC is preparing and positioning itself to pursue government contracting opportunities as a Christian veteran-owned technology and digital solutions company.",
  },
  readiness: {
    eyebrow: "Government Ready",
    heading: "Positioned and preparing to support government missions.",
    paragraphs: [
      "Wali Productions LLC provides professional technology services that support federal, state, and local government agencies through ethical, reliable, and standards-based solutions, delivered with disciplined planning, technical excellence, and thorough documentation.",
      "The company is actively preparing for government contracting, maintaining its documentation, registrations, certifications, and identifiers accurately and updating them as official information changes.",
    ],
  },
  competencies: {
    eyebrow: "Core Competencies",
    heading: "Core competencies.",
    items: [
      {
        title: "Website Design & Development",
        description:
          "Modern, accessible, maintainable websites and web applications.",
      },
      {
        title: "Software Development",
        description:
          "Custom software engineered for reliability, security, and maintainability.",
      },
      {
        title: "Technology & IT Consulting",
        description:
          "Practical guidance to plan, implement, and improve technology.",
      },
      {
        title: "AI Solutions & Business Automation",
        description:
          "Responsible AI and automation that improve operations while preserving human oversight.",
      },
      {
        title: "Systems Administration",
        description:
          "Stable, secure, well-documented Linux and Windows systems and infrastructure.",
      },
      {
        title: "Media Production & Content Creation",
        description:
          "Streaming, media production, and content capabilities for organizational communication.",
      },
    ],
  },
  differentiators: {
    eyebrow: "Differentiators",
    heading: "What sets us apart.",
    items: [
      {
        title: "Christian Business Foundation",
        description:
          "We operate according to biblical principles of integrity, stewardship, honesty, and faithful service.",
      },
      {
        title: "Veteran-Owned Discipline",
        description:
          "Military experience contributes to disciplined planning, accountability, and mission-focused execution.",
      },
      {
        title: "Documentation-Driven Engineering",
        description:
          "Projects are planned, documented, reviewed, and version controlled to improve quality and long-term maintainability.",
      },
      {
        title: "Founder-Led Quality Control",
        description:
          "Founder-led oversight of quality and engineering standards on every engagement.",
      },
      {
        title: "Broad Technology & Media Capability",
        description:
          "The ability to support both technical and creative digital needs across many service areas.",
      },
      {
        title: "Mission-Focused Client Service",
        description:
          "Professional, mission-focused service throughout every engagement.",
      },
    ],
  },
  procurementReadiness: {
    eyebrow: "Procurement Pathway",
    heading: "How to engage Wali Productions LLC.",
    body: "Wali Productions LLC is structured and prepared to support government procurement — as a prime contractor for small business set-aside opportunities and as a subcontractor to prime contractors requiring specialized technology capabilities.",
    setAsideNote: "As a Veteran-Owned Small Business (VOSB), Wali Productions LLC is eligible for veteran-owned set-aside contracting opportunities under federal acquisition regulations. SAM.gov registration and full VOSB documentation are in preparation.",
    steps: [
      {
        step: "01",
        title: "Review Capabilities",
        description: "Download or review our capability statement to confirm alignment with your requirement. Our core competencies span software engineering, cybersecurity, AI integration, IT consulting, cloud solutions, and media production.",
      },
      {
        step: "02",
        title: "Submit Your Requirement",
        description: "Contact us with your scope, period of performance, and any applicable vehicle or set-aside type. We review all serious inquiries and respond within one business day.",
      },
      {
        step: "03",
        title: "Qualification Discussion",
        description: "We conduct a brief discovery call to assess fit, confirm qualifications, and discuss teaming arrangements if applicable. No obligation on either side.",
      },
      {
        step: "04",
        title: "Proposal or Quote",
        description: "For qualified opportunities, we prepare a responsive proposal or quotation including technical approach, past performance, pricing, and required representations and certifications.",
      },
    ],
  },
  capabilityStatement: {
    eyebrow: "Capability Statement",
    heading: "Our capability statement.",
    paragraphs: [
      "Wali Productions LLC is a Christian Veteran-Owned technology and digital solutions company offering website and software development, technology and IT consulting, AI solutions, business automation, digital marketing, media production, and content creation.",
      "Our capability statement is maintained as a separate business document and updated whenever government identifiers, certifications, NAICS codes, or past performance information changes. Contact us to request the current version.",
    ],
  },
  registration: {
    eyebrow: "Certifications & Registration",
    heading: "Certifications & registration status.",
    note: "Official identifiers are published only when verified. Wali Productions LLC is preparing its government registrations; items not yet issued are shown as in preparation or pending.",
    items: [
      { label: "UEI (Unique Entity ID)", value: pending("verified UEI", "02-Government/BUSINESS_INFORMATION (to be maintained as issued)") },
      { label: "CAGE Code", value: pending("verified CAGE code", "02-Government (to be maintained as issued)") },
      { label: "SAM.gov Registration", value: "In preparation" },
      { label: "NAICS Codes", value: pending("NAICS codes to be confirmed", "02-Government/NAICS_CODES.md (to be maintained per official registration)") },
      { label: "Certifications", value: "SAM.gov registration and SBA certification in preparation" },
      { label: "Business Type", value: "Veteran-Owned Limited Liability Company (LLC)" },
    ],
  },
  pastPerformance: {
    eyebrow: "Past Performance",
    heading: "Representative experience.",
    note: "Formal government past performance references are published only when documented, verifiable, and authorized. The entry below represents internal and direct client work used to demonstrate technical capability. Additional references are available upon request.",
    items: [
      {
        title: "Wali Productions LLC — Enterprise Web Platform (Internal, 2025)",
        description: "Full-stack enterprise platform built on Next.js 16, React 19, TypeScript, and Tailwind CSS. Includes a public-facing marketing site, authenticated admin portal, contact pipeline with lifecycle management, and static site generation for 48+ pages. Demonstrates: software architecture, security-conscious design, documentation discipline, accessibility (WCAG 2.1), and full product delivery lifecycle.",
      },
    ],
  },
  cta: {
    heading: "Let's discuss your mission.",
    body: "We seek long-term partnerships that allow Wali Productions LLC to provide dependable technology services while supporting government missions with integrity and technical excellence.",
    primaryCta: { label: "Request a Consultation", href: "/contact" },
  },
};
