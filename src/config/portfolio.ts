export type Cta = {
  label: string;
  href: string;
};

export type PortfolioItem = {
  title: string;
  description: string;
};

export type PortfolioCapability = {
  title: string;
  description: string;
  icon?: string;
};

export type PortfolioProjectStatus = "published" | "draft" | "pending";

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: PortfolioProjectStatus;
  technologies: string[];
  featured: boolean;
  year?: number;
  client?: string;
  url?: string;
  industry?: string;
  outcomes?: string[];
  screenshots?: string[];
  govApplicable?: boolean;
  completionDate?: string;
  servicesPerformed?: string[];
  clientType?: string;
};

export type PortfolioContent = {
  hero: {
    identity: string;
    headline: string;
    subhead: string;
    badges: string[];
  };
  overview: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    subhead: string;
    items: PortfolioCapability[];
  };
  featured: {
    eyebrow: string;
    heading: string;
    note: string;
    items: PortfolioItem[];
  };
  pastPerformance: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  documentation: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
    note: string;
  };
  projects: PortfolioProject[];
};

export const portfolioContent: PortfolioContent = {
  hero: {
    identity: "Our Work",
    headline: "Capabilities demonstrated through results.",
    subhead:
      "Wali Productions LLC delivers technology solutions across software engineering, AI integration, cybersecurity, and government IT. Our portfolio reflects real work — accurate, documented, and honestly represented.",
    badges: [
      "Software Engineering",
      "AI Integration",
      "Government IT",
      "Cybersecurity",
    ],
  },
  overview: {
    eyebrow: "Portfolio",
    heading: "Work that speaks for itself.",
    paragraphs: [
      "Every entry in our portfolio represents real, completed work — not mockups, not aspirational capabilities. We document outcomes honestly and publish client work only when authorized.",
      "Our portfolio continues to grow as we complete engagements and earn authorization to share results. If you want to understand what we can do for a specific challenge, the most effective path is a direct conversation.",
    ],
  },
  capabilities: {
    eyebrow: "Practice Areas",
    heading: "What we build and deliver.",
    subhead: "Our work spans these practice areas — each demonstrated through completed engagements.",
    items: [
      {
        title: "Enterprise Web & Software",
        description: "Production-grade web applications, enterprise portals, custom software, and API platforms built with modern frameworks.",
      },
      {
        title: "AI & Process Automation",
        description: "Machine learning integration, intelligent automation pipelines, and AI-powered workflow systems that deliver measurable efficiency gains.",
      },
      {
        title: "Cybersecurity Engineering",
        description: "Security assessment, architecture hardening, compliance framework implementation, and vulnerability remediation.",
      },
      {
        title: "Cloud Architecture",
        description: "Cloud migration planning, infrastructure design, containerization, and cost-optimized cloud operations.",
      },
      {
        title: "Government IT Services",
        description: "Federal, state, and local government technology services delivered with appropriate security posture, documentation, and compliance standards.",
      },
      {
        title: "Systems & Infrastructure",
        description: "Linux systems administration, network configuration, monitoring setup, and infrastructure documentation.",
      },
    ],
  },
  featured: {
    eyebrow: "Featured Work",
    heading: "Selected engagements.",
    note: "Client projects are featured only when authorized. The portfolio grows as engagements are completed and authorization is obtained.",
    items: [],
  },
  pastPerformance: {
    eyebrow: "Past Performance",
    heading: "Representative experience, honestly stated.",
    paragraphs: [
      "The work shown here reflects real, completed engagements. For government procurement purposes, we distinguish between internal capability demonstrations (projects we built for ourselves) and formal client work. Client references and project details are provided upon request with appropriate authorization.",
      "We do not inflate past performance or claim work that isn't verifiable. Every entry is documented with the accuracy required for government contracting references. If you are evaluating us for a procurement opportunity, contact us directly for a tailored capability and past performance discussion.",
    ],
  },
  documentation: {
    eyebrow: "Our Standards",
    heading: "How we document and represent our work.",
    paragraphs: [
      "Every project at Wali Productions LLC is planned, executed, and documented to a consistent professional standard. Version control, technical documentation, and project records are maintained throughout the engagement lifecycle.",
      "Portfolio entries appear only when they accurately represent completed work. We don't inflate capabilities or claim work that isn't ours. This commitment to honest representation is part of what makes our past performance references credible.",
    ],
  },
  cta: {
    heading: "Ready to start your project?",
    body: "If you're evaluating technology partners, the most effective thing we can do is have a direct conversation about your specific challenge. We'll give you a straight answer.",
    primaryCta: { label: "Start a Project", href: "/start" },
    note: "No commitment required · Veteran-Owned · Response within 24 hours",
  },
  projects: [
    {
      id: "wali-productions-website",
      title: "Wali Productions LLC — Enterprise Business Platform",
      description:
        "Full-stack enterprise web platform for Wali Productions LLC. Next.js 16 application featuring a public marketing site, authenticated admin portal, contact form pipeline, analytics, government readiness dashboard, and CRM capabilities.",
      category: "Enterprise Web & Software",
      status: "published",
      technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "iron-session", "bcryptjs", "Nodemailer"],
      featured: true,
      year: 2025,
      client: "Wali Productions LLC (internal)",
      url: "https://waliproductions.com",
      industry: "Professional Services / Technology Consulting",
      outcomes: [
        "Full public marketing site with 6 content pages and premium UI/UX",
        "Admin portal with contact management, analytics dashboard, and IAM",
        "Government contracting readiness module with compliance tracking",
        "Secure session-based authentication with bcrypt password hashing",
        "Contact form pipeline with email delivery and admin notification",
        "CRM module with opportunity tracking and proposal management",
        "Deployed on Hostinger Node.js with automated GitHub deployment",
      ],
      govApplicable: true,
      completionDate: "2025-12-31",
      servicesPerformed: [
        "Software Engineering",
        "Web Application Development",
        "Linux & Systems Administration",
        "UI/UX Design",
      ],
      clientType: "internal",
    },
  ],
};
