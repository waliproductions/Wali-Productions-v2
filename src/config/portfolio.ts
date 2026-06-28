/**
 * Portfolio page content model — single source of truth.
 *
 * Populated from approved canonical documentation: PORTFOLIO, PAST_PERFORMANCE,
 * COMPANY_STORY, BUSINESS_CAPABILITIES, COMPETITIVE_ADVANTAGES, VALUE_PROPOSITIONS,
 * and CLIENT_PROMISE.
 *
 * Specific featured projects remain `pending()` placeholders: per PORTFOLIO and
 * PAST_PERFORMANCE policy, client projects are published only when documented and
 * authorized, and no specific projects/clients are documented. This copy must
 * only be changed through the approved documentation process.
 */

/** Marks detail that is not yet documented/authorized and records its source. */
const pending = (note: string, source: string) =>
  `[ pending verified detail: ${note} — source: ${source} ]`;

export type Cta = {
  label: string;
  /** Links to built routes within the site. */
  href: string;
};

export type PortfolioItem = {
  title: string;
  description: string;
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
  /** Industry vertical (e.g. "Government", "Healthcare", "Small Business"). */
  industry?: string;
  /** Measurable outcomes or results from this project. */
  outcomes?: string[];
  /** Public screenshot/image URLs (relative or absolute). */
  screenshots?: string[];
  /** Whether this project demonstrates government contracting applicability. */
  govApplicable?: boolean;
  /** ISO date string (YYYY-MM-DD) when the project was completed. */
  completionDate?: string;
  /** Service lines performed as part of this engagement. */
  servicesPerformed?: string[];
  /** e.g. "internal" | "small-business" | "nonprofit" | "government" | "enterprise" */
  clientType?: string;
};

export type PortfolioContent = {
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
  categories: {
    eyebrow: string;
    heading: string;
    items: PortfolioItem[];
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
  };
  projects: PortfolioProject[];
};

export const portfolioContent: PortfolioContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline: "Our work and capabilities.",
    subhead:
      "Wali Productions LLC delivers practical technology and digital solutions across a range of categories, approached with integrity and professionalism in every engagement.",
  },
  overview: {
    eyebrow: "Portfolio",
    heading: "The work we do.",
    paragraphs: [
      "Our portfolio spans the categories of work we deliver—from websites and software to consulting, AI, and media—each approached with the same commitment to quality and integrity.",
      "Portfolio entries accurately represent completed work and identify client projects only when appropriate and authorized.",
    ],
  },
  categories: {
    eyebrow: "Project Categories",
    heading: "Categories of work.",
    items: [
      { title: "Business Websites", description: "Professional, accessible websites for businesses and organizations." },
      { title: "Software Development", description: "Custom applications and tools built to solve real problems." },
      { title: "Technology Consulting", description: "Guidance to plan, implement, and improve technology." },
      { title: "Artificial Intelligence Solutions", description: "Practical AI integration and automation that improve operations." },
      { title: "Digital Marketing", description: "Digital marketing and social media support for organizations." },
      { title: "Government Contracting", description: "Technology services and capability development for government clients." },
      { title: "Media Production", description: "Streaming, live production, and media workflows." },
      { title: "Content Creation", description: "Content development that helps organizations communicate effectively." },
    ],
  },
  featured: {
    eyebrow: "Featured Work",
    heading: "Featured projects.",
    note: "Projects are shown only when documented and authorized. Specific client work is not published without authorization.",
    items: [
      { title: pending("featured project", "01-Business/PORTFOLIO.md (authorized entries only)"), description: pending("project summary (when authorized)", "01-Business/PORTFOLIO.md") },
      { title: pending("featured project", "01-Business/PORTFOLIO.md (authorized entries only)"), description: pending("project summary (when authorized)", "01-Business/PORTFOLIO.md") },
      { title: pending("featured project", "01-Business/PORTFOLIO.md (authorized entries only)"), description: pending("project summary (when authorized)", "01-Business/PORTFOLIO.md") },
    ],
  },
  pastPerformance: {
    eyebrow: "Past Performance",
    heading: "Past performance.",
    paragraphs: [
      "Past performance may include website, software, technology consulting, digital marketing, social media, media production, business support, and government contracting preparation work.",
      "Past performance entries are accurate, verifiable, and appropriate for the audience; client names, project details, and private information are not published without authorization.",
    ],
  },
  documentation: {
    eyebrow: "How We Document Work",
    heading: "How portfolio work is documented.",
    paragraphs: [
      "Projects are planned, documented, reviewed, and version controlled to improve quality and long-term maintainability.",
      "Portfolio and past performance entries are published only when they accurately represent completed work, and client projects appear only when appropriate and authorized for public display.",
    ],
  },
  cta: {
    heading: "Let's build your next project.",
    body: "We seek to become trusted partners who consistently provide value through dependable service, integrity, and consistent results.",
    primaryCta: { label: "Request a Consultation", href: "/contact" },
  },
  projects: [
    {
      id: "wali-productions-website",
      title: "Wali Productions LLC — Business Website",
      description:
        "Production business website for Wali Productions LLC. A Next.js 16 application with contact form pipeline, admin portal, SEO optimization, and Hostinger Node.js hosting.",
      category: "Business Websites",
      status: "published",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Nodemailer"],
      featured: false,
      year: 2025,
      client: "Wali Productions LLC (internal)",
      url: "https://waliproductions.com",
      industry: "Professional Services",
      outcomes: [
        "Full public marketing site with 6 content pages",
        "Admin portal with contact management, analytics, and government readiness dashboard",
        "Secure iron-session authentication with bcryptjs",
        "Contact form pipeline with email delivery via Nodemailer",
        "Deployed on Hostinger Node.js with GitHub auto-deploy",
      ],
      govApplicable: true,
      completionDate: "2025-12-31",
      servicesPerformed: ["Website Design & Development", "Software Development", "Linux & Systems Administration"],
      clientType: "internal",
    },
  ],
};
