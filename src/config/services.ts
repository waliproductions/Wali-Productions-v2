export type Cta = {
  label: string;
  href: string;
};

export type ServiceDetail = {
  title: string;
  description: string;
  problem: string;
  solution: string;
  benefits: string[];
  deliverables: string[];
  idealFor: string[];
  outcomes: string;
  id?: string;
  govRelevant?: boolean;
};

export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  services: ServiceDetail[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicesContent = {
  hero: {
    identity: string;
    headline: string;
    subhead: string;
    badges: string[];
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
    items: { title: string; description: string }[];
  };
  clientPromise: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  faqs: {
    eyebrow: string;
    heading: string;
    subhead: string;
    items: FaqItem[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
    note: string;
  };
};

export const servicesContent: ServicesContent = {
  hero: {
    identity: "Our Services",
    headline: "Enterprise technology services that deliver results.",
    subhead:
      "From software engineering to cybersecurity to AI integration — Wali Productions LLC provides the full spectrum of technology services that enterprises and government agencies require.",
    badges: [
      "Software Engineering",
      "AI & Automation",
      "Cybersecurity",
      "Cloud Solutions",
      "Government IT",
    ],
  },
  intro: {
    eyebrow: "Our Approach",
    heading: "Practical solutions, engineered for impact.",
    paragraphs: [
      "Every service we offer is grounded in one principle: technology should solve real problems and create measurable value. We don't pitch complexity — we deliver clarity, capability, and results.",
      "As a Veteran-Owned firm, we bring military discipline to every engagement. That means defined scope, honest timelines, transparent communication, and accountability from kickoff to delivery.",
    ],
  },
  categories: [
    {
      id: "software",
      title: "Software Engineering",
      description: "Custom software built to enterprise standards — scalable, secure, and maintainable.",
      services: [
        {
          id: "custom-software",
          title: "Custom Software Development",
          description: "Enterprise-grade custom software engineered to solve your specific business challenges.",
          problem: "Off-the-shelf software can't accommodate your unique workflows, compliance requirements, or scale.",
          solution: "We design and build custom software from the ground up — tailored to your processes, integrated with your existing systems, and built to last.",
          benefits: [
            "Software built exactly to your specifications",
            "Full source code ownership",
            "Designed for security and compliance from day one",
            "Scalable architecture that grows with you",
          ],
          deliverables: [
            "Production-ready software system",
            "Full source code in version-controlled repository",
            "Architecture and system design documentation",
            "API documentation (where applicable)",
            "Deployment guide and runbook",
            "User or admin documentation",
            "30-day post-launch support period",
          ],
          idealFor: ["Government agencies", "Regulated industries", "Organizations with complex workflows"],
          outcomes: "A production-ready software system that solves your specific problem and can be maintained and extended by any competent team.",
          govRelevant: true,
        },
        {
          id: "web-development",
          title: "Web Application Development",
          description: "Modern, accessible web applications built for performance, security, and scale.",
          problem: "Your organization needs a web presence or platform that's fast, secure, accessible, and represents your brand professionally.",
          solution: "Full-stack web development using modern frameworks and best practices — from simple informational sites to complex enterprise portals.",
          benefits: [
            "WCAG 2.1 accessibility compliance",
            "Optimized Core Web Vitals and Lighthouse scores",
            "Mobile-first responsive design",
            "SEO-optimized architecture",
          ],
          deliverables: [
            "Full-stack web application",
            "Source code (Git repository)",
            "WCAG 2.1 accessibility compliance documentation",
            "Lighthouse performance baseline report",
            "CMS or admin interface (if scoped)",
            "Domain and hosting setup guidance",
            "30-day post-launch support",
          ],
          idealFor: ["Small businesses", "Government agencies", "Nonprofits", "Enterprises"],
          outcomes: "A fast, accessible, and professional web presence that serves your audience and achieves your goals.",
        },
        {
          id: "systems-integration",
          title: "Systems Integration & APIs",
          description: "Connect your existing systems, databases, and third-party services into a unified technology ecosystem.",
          problem: "Siloed systems create data inconsistencies, manual work, and operational inefficiency.",
          solution: "Custom API development and integration work that connects your tools and automates data flows between systems.",
          benefits: [
            "Eliminates manual data entry and transfers",
            "Real-time data synchronization",
            "Reduces errors from duplicate data",
            "Enables new automation workflows",
          ],
          deliverables: [
            "Working integration connecting specified systems",
            "API or middleware documentation",
            "Data flow diagrams",
            "Integration testing report",
            "Deployment and rollback guide",
          ],
          idealFor: ["Organizations with multiple legacy systems", "Businesses scaling operations"],
          outcomes: "A connected technology stack where your systems work together — reducing friction, errors, and manual overhead.",
          govRelevant: true,
        },
      ],
    },
    {
      id: "ai-automation",
      title: "AI & Intelligent Automation",
      description: "Practical AI and automation that transforms how your organization operates.",
      services: [
        {
          id: "ai-integration",
          title: "AI Integration & Implementation",
          description: "Integrate large language models and machine learning capabilities into your existing workflows and products.",
          problem: "Your organization is not yet leveraging AI — and competitors who are gaining real productivity advantages.",
          solution: "Strategic AI integration that identifies high-value automation opportunities and implements them with appropriate human oversight and governance.",
          benefits: [
            "Measurable productivity gains",
            "Reduced time on repetitive knowledge work",
            "Improved decision support",
            "Maintained human control and oversight",
          ],
          deliverables: [
            "Configured AI integration (LLM or ML pipeline)",
            "Governance and oversight documentation",
            "Prompt engineering specifications",
            "Human-in-the-loop workflow design",
            "Integration testing and validation report",
            "Staff training materials",
          ],
          idealFor: ["Knowledge-intensive organizations", "Content-heavy operations", "Data analysis teams"],
          outcomes: "AI-powered workflows that save real hours and improve output quality — with documentation and governance to support enterprise adoption.",
          govRelevant: true,
        },
        {
          id: "business-automation",
          title: "Business Process Automation",
          description: "Automate repetitive manual processes to reduce cost, improve accuracy, and free your team for higher-value work.",
          problem: "Manual, repetitive processes are consuming staff time, introducing errors, and limiting your capacity to scale.",
          solution: "End-to-end process analysis and automation implementation — from simple task automation to complex multi-system workflow orchestration.",
          benefits: [
            "Significant reduction in manual processing time",
            "Near-elimination of manual data entry errors",
            "24/7 process execution without staffing overhead",
            "Detailed process audit trails and reporting",
          ],
          deliverables: [
            "Implemented automation workflows",
            "Process documentation and flow diagrams",
            "Audit trail and logging configuration",
            "Testing and validation report",
            "User training materials",
            "Maintenance and monitoring guide",
          ],
          idealFor: ["Operations teams", "Finance and accounting", "HR and compliance", "Government agencies"],
          outcomes: "Automated workflows that run reliably in the background — saving hundreds of hours per year and improving data accuracy.",
          govRelevant: true,
        },
      ],
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity & Compliance",
      description: "Protect your organization from threats and meet compliance requirements without sacrificing operations.",
      services: [
        {
          id: "security-assessment",
          title: "Security Assessment & Architecture",
          description: "Comprehensive evaluation of your security posture with actionable remediation roadmap.",
          problem: "You don't know exactly what your security exposure is — or you've had an incident and need to understand how to prevent the next one.",
          solution: "Structured security assessment covering network architecture, access controls, endpoint security, data handling, and compliance gaps — with a prioritized remediation plan.",
          benefits: [
            "Clear picture of your current risk exposure",
            "Prioritized remediation roadmap",
            "Compliance gap analysis (NIST, FISMA, HIPAA, etc.)",
            "Executive and technical reporting",
          ],
          deliverables: [
            "Security assessment report (executive + technical)",
            "Risk register with ratings",
            "Prioritized remediation roadmap",
            "Compliance gap analysis",
            "Architecture diagram (current state)",
          ],
          idealFor: ["Government contractors", "Healthcare organizations", "Financial services", "Any organization handling sensitive data"],
          outcomes: "Documented understanding of your security posture, a prioritized list of actions, and a clear path to defensible compliance.",
          govRelevant: true,
        },
        {
          id: "compliance-framework",
          title: "Compliance Framework Implementation",
          description: "Build and document the security controls, policies, and procedures required for NIST, FedRAMP, FISMA, HIPAA, or SOC 2 compliance.",
          problem: "You need to achieve a compliance standard but don't have the internal expertise or documentation to get there.",
          solution: "Framework implementation from policy development through control implementation, documentation, and audit preparation.",
          benefits: [
            "Audit-ready documentation package",
            "Implemented and tested security controls",
            "Staff training and awareness programs",
            "Ongoing compliance maintenance guidance",
          ],
          deliverables: [
            "Policy and procedure documentation package",
            "Implemented and tested security controls",
            "Control mapping to framework (NIST, FISMA, HIPAA, SOC 2)",
            "Staff training program materials",
            "Audit preparation checklist",
            "Ongoing compliance maintenance guide",
          ],
          idealFor: ["Government contractors pursuing federal contracts", "Healthcare organizations", "Organizations under regulatory scrutiny"],
          outcomes: "A documented, implemented compliance posture ready to withstand audit scrutiny and support contract awards.",
          govRelevant: true,
        },
      ],
    },
    {
      id: "cloud",
      title: "Cloud Solutions",
      description: "Modern cloud architecture that reduces infrastructure cost and improves reliability.",
      services: [
        {
          id: "cloud-migration",
          title: "Cloud Migration & Modernization",
          description: "Migrate from on-premise or legacy infrastructure to modern cloud architecture with minimal disruption.",
          problem: "On-premise infrastructure is expensive, difficult to scale, and increasingly difficult to maintain securely.",
          solution: "Phased cloud migration strategy that moves workloads to AWS, Azure, or GCP with appropriate architecture patterns and security controls.",
          benefits: [
            "Reduced infrastructure operating costs",
            "Improved reliability and uptime",
            "Elastic scaling for variable workloads",
            "Enhanced disaster recovery capabilities",
          ],
          deliverables: [
            "Cloud architecture design document",
            "Migration plan and phased timeline",
            "Migrated workloads (per scope)",
            "Infrastructure-as-code configuration",
            "Cost optimization analysis",
            "Post-migration monitoring setup",
            "Operational runbook",
          ],
          idealFor: ["Organizations running aging on-premise infrastructure", "Businesses experiencing growth"],
          outcomes: "A modernized cloud infrastructure that is more cost-effective, scalable, and secure than your previous environment.",
          govRelevant: true,
        },
      ],
    },
    {
      id: "consulting",
      title: "IT Consulting & Strategy",
      description: "Strategic technology guidance that aligns your IT investments with your business objectives.",
      services: [
        {
          id: "technology-strategy",
          title: "Technology Strategy & Roadmap",
          description: "Executive-level technology consulting that clarifies your current state, defines your target architecture, and creates a practical roadmap.",
          problem: "Technology investments are not clearly connected to business outcomes, and you lack a coherent long-term direction.",
          solution: "Structured technology assessment and strategic planning engagement that produces a clear, prioritized technology roadmap aligned with your business goals.",
          benefits: [
            "Clear technology vision and architecture target",
            "Prioritized initiative roadmap with business case",
            "Vendor and technology selection guidance",
            "Budget and resource planning framework",
          ],
          deliverables: [
            "Current state technology assessment",
            "Target architecture document",
            "Prioritized technology roadmap (12–36 months)",
            "Business case summaries per initiative",
            "Vendor / technology evaluation matrix",
            "Budget and resource planning framework",
          ],
          idealFor: ["Executive teams planning technology investment", "Organizations undergoing digital transformation"],
          outcomes: "A documented technology strategy that guides decisions for the next 12-36 months and aligns your technology team with business leadership.",
          govRelevant: true,
        },
        {
          id: "linux-sysadmin",
          title: "Linux & Systems Administration",
          description: "Stable, secure, and well-documented Linux systems and infrastructure management.",
          problem: "Your Linux systems lack proper hardening, monitoring, documentation, or qualified administration.",
          solution: "Comprehensive Linux systems administration including configuration management, security hardening, monitoring setup, and documentation.",
          benefits: [
            "Properly hardened and documented systems",
            "Proactive monitoring and alerting",
            "Reduced risk of unplanned downtime",
            "Clear runbooks for operational procedures",
          ],
          deliverables: [
            "Hardened Linux system configuration",
            "Security baseline documentation",
            "Monitoring and alerting setup",
            "Operational runbooks for routine procedures",
            "Backup and recovery documentation",
          ],
          idealFor: ["Organizations running Linux-based infrastructure", "Government agencies requiring hardened systems"],
          outcomes: "Well-administered, documented, and monitored Linux infrastructure that your team can operate confidently.",
          govRelevant: true,
        },
      ],
    },
    {
      id: "government",
      title: "Government Technology Services",
      description: "Technology services designed specifically for the standards and requirements of public sector work.",
      services: [
        {
          id: "gov-technology",
          title: "Federal & State Agency IT Services",
          description: "Full-spectrum IT services delivered to federal, state, and local government agencies with appropriate security and compliance standards.",
          problem: "Government agencies need technology partners who understand procurement, security requirements, compliance mandates, and documentation standards.",
          solution: "Comprehensive IT services delivered with the standards-based approach, documentation discipline, and security posture that government work demands.",
          benefits: [
            "Alignment with federal security frameworks (NIST, FISMA)",
            "Section 508 accessibility compliance",
            "Detailed project documentation and reporting",
            "Veteran-Owned set-aside eligibility",
          ],
          deliverables: [
            "Technology deliverables per engagement scope",
            "Section 508 accessibility compliance documentation",
            "Security documentation aligned to NIST / FISMA",
            "Project management and status reporting",
            "Deliverable acceptance support package",
            "Post-delivery transition documentation",
          ],
          idealFor: ["Federal civilian agencies", "State and local governments", "Defense contractors", "Prime contractors seeking capable subcontractors"],
          outcomes: "Technology solutions delivered on time, on budget, with the documentation and compliance posture required for government acceptance.",
          govRelevant: true,
        },
        {
          id: "media-streaming",
          title: "Media & Livestream Production",
          description: "Professional streaming workflows, broadcast production, and media technology for organizations requiring reliable, high-quality live content.",
          problem: "Your organization needs reliable live streaming or broadcast capability without the complexity or failure risk of amateur setups.",
          solution: "Custom streaming infrastructure and production workflows using OBS Studio and professional broadcast tools designed for stability and quality.",
          benefits: [
            "Reliable, professionally configured streaming workflows",
            "Multi-platform simultaneous streaming",
            "Operator training and documentation",
            "Emergency failover procedures",
          ],
          deliverables: [
            "Configured streaming workflow",
            "Equipment recommendations list",
            "Operator training sessions",
            "Streaming setup documentation",
            "Emergency failover procedures",
          ],
          idealFor: ["Faith organizations", "Government agencies", "Conference and event producers", "Educational institutions"],
          outcomes: "A stable, documented streaming operation that your team can operate confidently and that reliably reaches your audience.",
        },
      ],
    },
  ],
  whyWork: {
    eyebrow: "Why Wali Productions",
    heading: "Why leading organizations choose us.",
    items: [
      {
        title: "Senior-Level Execution",
        description: "Every engagement is handled by senior practitioners — not junior developers billing hours to learn on your project.",
      },
      {
        title: "Honest Assessments",
        description: "We tell you what you actually need — even when that means recommending less work than we could propose.",
      },
      {
        title: "Veteran Discipline",
        description: "Military-trained project discipline: clear objectives, defined deliverables, consistent communication, and accountability.",
      },
      {
        title: "Security-First Approach",
        description: "Security architecture is built in from the beginning — not patched in after delivery.",
      },
    ],
  },
  clientPromise: {
    eyebrow: "Our Promise",
    heading: "What every client can expect.",
    paragraphs: [
      "When you engage Wali Productions LLC, you will receive honest assessments, professional execution, and complete accountability for every deliverable we commit to.",
      "We don't overpromise or underdeliver. We tell you what's achievable, agree to a clear scope, and deliver it — with transparent communication throughout.",
    ],
  },
  faqs: {
    eyebrow: "Common Questions",
    heading: "Frequently asked questions.",
    subhead: "Straightforward answers to what our clients want to know before engaging.",
    items: [
      {
        question: "How does an engagement with Wali Productions work?",
        answer: "It starts with a brief discovery conversation — no sales pitch, just honest questions about your challenge. If we're a fit, we define scope, timeline, and budget together, then you receive a clear proposal. Once approved, we move into delivery with structured checkpoints and transparent communication throughout.",
      },
      {
        question: "What size organizations do you work with?",
        answer: "We work with organizations of all sizes — from solo professionals and small churches to mid-size businesses and government agencies. Our approach scales to fit the engagement. A small business website and a federal IT consulting engagement are both done with the same discipline and professionalism.",
      },
      {
        question: "Do you work with government agencies?",
        answer: "Yes. Wali Productions LLC is structured and preparing for government contracting as a Veteran-Owned Small Business (VOSB). We deliver technology services with the documentation discipline, security posture, and compliance standards that government work requires. Our SAM.gov registration is in preparation.",
      },
      {
        question: "Do you serve churches, nonprofits, and ministries?",
        answer: "Absolutely. Serving mission-driven organizations is part of why Wali Productions was founded. We work with churches, nonprofits, and ministries at rates and scopes appropriate to their budgets, and we genuinely care about their missions succeeding.",
      },
      {
        question: "What does a project typically cost?",
        answer: "It depends on scope, complexity, and timeline. A simple website project might start at a few thousand dollars. A complex enterprise software engagement might be $50,000 or more. We give honest estimates after understanding your requirement — we don't publish pricing without context because it rarely helps either party.",
      },
      {
        question: "How quickly can you start?",
        answer: "Typically within one to two weeks of signed agreement for most engagements. We're a focused firm, not a large agency, so we don't queue projects for months. If your timeline is urgent, tell us — we'll let you know honestly what's possible.",
      },
      {
        question: "What happens after I submit a project inquiry?",
        answer: "We review every inquiry within 24 hours (usually faster). If your project aligns with our capabilities, we'll reach out to schedule a discovery call. We'll never pressure you to commit — the goal of the first conversation is mutual fit, not a sale.",
      },
      {
        question: "Do you offer ongoing support or retainers?",
        answer: "Yes. After project delivery, we offer ongoing support, maintenance retainers, and staff augmentation arrangements. Many clients retain us after initial engagements for continuous improvement, security monitoring, or advisory support.",
      },
      {
        question: "Where are you located and do you work remotely?",
        answer: "We are based in Springfield, Missouri and serve clients throughout Southwest Missouri, nationally, and with government agencies federally. All our services are available remotely — we have worked effectively with clients across the country and are set up for distributed collaboration.",
      },
      {
        question: "How do you handle security for sensitive or regulated projects?",
        answer: "Security is built into our process from the start, not added at the end. For regulated projects, we design systems with NIST, FISMA, or HIPAA alignment in mind from the requirements phase. We don't deliver sensitive systems without appropriate security review and documentation.",
      },
    ],
  },
  cta: {
    heading: "Ready to solve your technology challenge?",
    body: "Tell us about your project goals, timeline, and budget — we'll give you an honest assessment and a clear proposal. No sales pressure, no commitment required.",
    primaryCta: { label: "Start a Project", href: "/start" },
    note: "No commitment required · Veteran-Owned · Response within 24 hours",
  },
};
