/**
 * Government Center extended configuration.
 *
 * Augments the Government Operations Center with capability inventory,
 * past performance categories, and document registry. Extends the
 * admin platform without modifying src/config/government.ts, which
 * remains the sole source of truth for the public government page model.
 *
 * Source: docs/01-Business/BUSINESS_CAPABILITIES.md (capability domains)
 *         docs/02-Government/PAST_PERFORMANCE.md (performance categories)
 */

export type CapabilitySkill = {
  title: string;
};

export type CapabilityDomain = {
  domain: string;
  skills: CapabilitySkill[];
  status: "current" | "future";
};

export type PastPerformanceCategory = {
  category: string;
  description: string;
};

export type GovDocument = {
  id: string;
  title: string;
  filename: string;
  description: string;
};

export type GovernmentCenterContent = {
  capabilities: {
    heading: string;
    source: string;
    domains: CapabilityDomain[];
  };
  naics: {
    heading: string;
    note: string;
    policyDoc: string;
  };
  psc: {
    heading: string;
    note: string;
  };
  pastPerformanceCategories: PastPerformanceCategory[];
  documents: GovDocument[];
};

export const governmentCenterContent: GovernmentCenterContent = {
  capabilities: {
    heading: "Technical Capability Inventory",
    source: "01-Business/BUSINESS_CAPABILITIES.md",
    domains: [
      // --- Current capabilities ---
      {
        domain: "Software Engineering",
        status: "current",
        skills: [
          { title: "Software Design" },
          { title: "Software Development" },
          { title: "Software Architecture" },
          { title: "Application Modernization" },
        ],
      },
      {
        domain: "Website Development",
        status: "current",
        skills: [
          { title: "Business Websites" },
          { title: "Corporate Websites" },
          { title: "Portfolio Websites" },
          { title: "Responsive Design" },
          { title: "Website Maintenance" },
        ],
      },
      {
        domain: "Artificial Intelligence",
        status: "current",
        skills: [
          { title: "AI Integration" },
          { title: "AI Workflow Development" },
          { title: "AI-Assisted Business Processes" },
          { title: "Local AI Deployments" },
        ],
      },
      {
        domain: "Information Technology",
        status: "current",
        skills: [
          { title: "Technical Consulting" },
          { title: "Systems Administration" },
          { title: "Linux Administration" },
          { title: "Windows Administration" },
          { title: "Network Configuration" },
          { title: "Technical Troubleshooting" },
        ],
      },
      {
        domain: "Business Automation",
        status: "current",
        skills: [
          { title: "Workflow Automation" },
          { title: "Process Improvement" },
          { title: "Documentation Systems" },
          { title: "Knowledge Management" },
        ],
      },
      {
        domain: "Streaming & Media Technology",
        status: "current",
        skills: [
          { title: "OBS Studio Configuration" },
          { title: "Multi-Platform Streaming" },
          { title: "Live Production" },
          { title: "Audio Routing" },
          { title: "Video Production Workflows" },
        ],
      },
      {
        domain: "Audio Engineering",
        status: "current",
        skills: [
          { title: "Digital Audio Workstations" },
          { title: "Recording" },
          { title: "Mixing" },
          { title: "Production Workflows" },
        ],
      },
      {
        domain: "Government Contracting",
        status: "current",
        skills: [
          { title: "Capability Statement Development" },
          { title: "SAM Registration Support" },
          { title: "Technical Services" },
          { title: "Veteran-Owned Business Development" },
        ],
      },
      // --- Future capabilities (under long-term development) ---
      {
        domain: "Cloud Engineering",
        status: "future",
        skills: [{ title: "Cloud Engineering" }],
      },
      {
        domain: "Cybersecurity",
        status: "future",
        skills: [{ title: "Cybersecurity" }],
      },
      {
        domain: "Enterprise Software",
        status: "future",
        skills: [{ title: "Enterprise Software" }],
      },
      {
        domain: "Mobile Applications",
        status: "future",
        skills: [{ title: "Mobile Applications" }],
      },
      {
        domain: "Data Analytics",
        status: "future",
        skills: [{ title: "Data Analytics" }],
      },
      {
        domain: "Machine Learning",
        status: "future",
        skills: [{ title: "Machine Learning" }],
      },
      {
        domain: "DevOps",
        status: "future",
        skills: [{ title: "DevOps" }],
      },
      {
        domain: "Infrastructure Automation",
        status: "future",
        skills: [{ title: "Infrastructure Automation" }],
      },
      {
        domain: "Digital Training Platforms",
        status: "future",
        skills: [{ title: "Digital Training Platforms" }],
      },
      {
        domain: "Technical Education",
        status: "future",
        skills: [{ title: "Technical Education" }],
      },
    ],
  },

  naics: {
    heading: "NAICS Codes",
    note: "NAICS codes will be confirmed and published upon completion of SAM.gov registration. No codes have been confirmed for this registration period. Codes must reflect actual services and be reviewed before use in official proposals or registrations.",
    policyDoc: "docs/02-Government/NAICS_CODES.md",
  },

  psc: {
    heading: "PSC Codes",
    note: "Product and Service Codes (PSC) identify federal procurement categories. PSC codes will be confirmed when actively pursuing federal contracts. No PSC codes are currently documented in the repository.",
  },

  pastPerformanceCategories: [
    {
      category: "Website Projects",
      description: "Business, corporate, and portfolio websites delivered for clients.",
    },
    {
      category: "Software Projects",
      description: "Custom applications, tools, and software solutions.",
    },
    {
      category: "Technology Consulting",
      description: "IT advisory, systems planning, and technical guidance engagements.",
    },
    {
      category: "Digital Marketing",
      description: "Digital marketing campaigns, strategy, and execution.",
    },
    {
      category: "Social Media Management",
      description: "Social media management, content creation, and channel strategy.",
    },
    {
      category: "Media Production",
      description: "Streaming setup, live production, and media production work.",
    },
    {
      category: "Business Support",
      description: "Business operations, documentation, and administrative support.",
    },
    {
      category: "Government Contracting Preparation",
      description: "SAM registration, capability statement development, and contracting readiness.",
    },
  ],

  documents: [
    {
      id: "capability-statement",
      title: "Capability Statement",
      filename: "CAPABILITY_STATEMENT.md",
      description: "Official capability statement framework and policy.",
    },
    {
      id: "certifications",
      title: "Certifications",
      filename: "CERTIFICATIONS.md",
      description: "Certification areas, policy, and sensitive information guidance.",
    },
    {
      id: "government-contracting",
      title: "Government Contracting",
      filename: "GOVERNMENT_CONTRACTING.md",
      description: "Government contracting identity, focus areas, and readiness posture.",
    },
    {
      id: "naics-codes",
      title: "NAICS Codes",
      filename: "NAICS_CODES.md",
      description: "NAICS code policy and review requirements.",
    },
    {
      id: "past-performance",
      title: "Past Performance",
      filename: "PAST_PERFORMANCE.md",
      description: "Past performance categories, policy, and authorization requirements.",
    },
  ],
};
