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
  capabilityStatement: {
    eyebrow: "Capability Statement",
    heading: "Our capability statement.",
    paragraphs: [
      "Wali Productions LLC is a Christian Veteran-Owned technology and digital solutions company offering website and software development, technology and IT consulting, AI solutions, business automation, digital marketing, media production, and content creation.",
      "Our one-page capability statement is maintained as a separate business document and updated when government identifiers, certifications, NAICS codes, or past performance information changes.",
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
    heading: "Past performance.",
    note: "Past performance is published only when documented, verifiable, and authorized. Client names and project details are not shown without authorization.",
    items: [
      { title: pending("documented past performance entry", "02-Government/PAST_PERFORMANCE.md"), description: pending("entry summary (when authorized)", "02-Government/PAST_PERFORMANCE.md") },
      { title: pending("documented past performance entry", "02-Government/PAST_PERFORMANCE.md"), description: pending("entry summary (when authorized)", "02-Government/PAST_PERFORMANCE.md") },
    ],
  },
  cta: {
    heading: "Let's discuss your mission.",
    body: "We seek long-term partnerships that allow Wali Productions LLC to provide dependable technology services while supporting government missions with integrity and technical excellence.",
    primaryCta: { label: "Request a Consultation", href: "/contact" },
  },
};
