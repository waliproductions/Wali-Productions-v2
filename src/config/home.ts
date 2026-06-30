export type Cta = {
  label: string;
  href: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type StatItem = {
  value: string;
  label: string;
  sublabel?: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type IndustryItem = {
  name: string;
  description: string;
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
    trustBadges: string[];
  };
  stats: StatItem[];
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
  process: {
    eyebrow: string;
    heading: string;
    subhead: string;
    steps: ProcessStep[];
  };
  industries: {
    eyebrow: string;
    heading: string;
    items: IndustryItem[];
  };
  whyChoose: {
    eyebrow: string;
    heading: string;
    subhead: string;
    items: FeatureItem[];
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
    note: string;
  };
};

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Enterprise Technology Consulting · Springfield, Missouri",
    headline: "Digital Transformation. Enterprise Results.",
    subhead:
      "Custom software, cybersecurity, AI integration, and government IT — delivered with military discipline and senior-level technical depth. Serving agencies, businesses, nonprofits, and ministries nationwide.",
    primaryCta: { label: "Start a Project", href: "/start" },
    secondaryCta: { label: "Explore Our Capabilities", href: "/services" },
    trustBadges: [
      "Veteran-Owned Small Business (VOSB)",
      "Government Contracting Ready",
      "Springfield, Missouri",
    ],
  },
  stats: [
    { value: "12+", label: "Technology Domains", sublabel: "Full-spectrum capabilities" },
    { value: "VOSB", label: "Veteran-Owned", sublabel: "SAM.gov registration in progress" },
    { value: "5", label: "Practice Areas", sublabel: "Software · Security · AI · Cloud · Gov" },
    { value: "24hr", label: "Response Time", sublabel: "Commitment to every inquiry" },
  ],
  mission: {
    eyebrow: "Our Mission",
    heading: "Technology is our profession. Service is our calling.",
    body: "We exist to provide enterprise-grade technology and digital transformation services while maintaining the highest standards of integrity, excellence, and faithful stewardship. Every engagement is approached with structured methodology, technical depth, and a genuine commitment to long-term client success.",
  },
  services: {
    eyebrow: "Core Capabilities",
    heading: "Enterprise solutions across every technology domain.",
    intro:
      "From AI-powered automation to hardened cybersecurity infrastructure — we deliver the full spectrum of technology services modern enterprises and government agencies require.",
    items: [
      {
        title: "Software Engineering",
        description:
          "Custom enterprise software built for scale, security, and longevity. From microservices architecture to full-stack applications.",
      },
      {
        title: "AI & Intelligent Automation",
        description:
          "Machine learning integration, process automation, and AI-powered decision systems that drive measurable business outcomes.",
      },
      {
        title: "Cybersecurity & Compliance",
        description:
          "Zero-trust architecture, threat assessment, vulnerability management, and compliance frameworks for regulated industries.",
      },
    ],
  },
  government: {
    eyebrow: "Government Contracting",
    heading: "Disciplined technology delivery for the public sector.",
    body: "We deliver standards-based technology services to federal, state, and local government agencies with the accountability, documentation, and security posture that mission-critical operations demand.",
    items: [
      {
        title: "Military-Grade Discipline",
        description:
          "Veteran-led delivery brings military precision to planning, execution, risk management, and mission accountability.",
      },
      {
        title: "Compliant Documentation",
        description:
          "Every project is planned, version-controlled, and documented to the standards required for government procurement and oversight.",
      },
      {
        title: "Security-First Architecture",
        description:
          "All solutions are designed with federal security frameworks in mind, including NIST, FedRAMP, and FISMA alignment.",
      },
    ],
  },
  process: {
    eyebrow: "Our Process",
    heading: "A proven delivery framework.",
    subhead: "Every engagement follows a structured methodology that ensures clarity, accountability, and measurable outcomes from day one.",
    steps: [
      {
        step: "01",
        title: "Discovery & Assessment",
        description: "We conduct a thorough analysis of your current technology environment, business objectives, and operational constraints to define a clear path forward.",
      },
      {
        step: "02",
        title: "Strategy & Architecture",
        description: "Our senior architects design a solution framework tailored to your requirements, with clear milestones, risk mitigation, and success metrics.",
      },
      {
        step: "03",
        title: "Execution & Delivery",
        description: "Agile delivery with continuous communication, rigorous testing, and documentation at every stage — keeping you informed and in control.",
      },
      {
        step: "04",
        title: "Support & Optimization",
        description: "Post-deployment support, performance monitoring, and continuous improvement to ensure your investment delivers lasting value.",
      },
    ],
  },
  industries: {
    eyebrow: "Industries Served",
    heading: "Expertise across critical sectors.",
    items: [
      { name: "Federal Government", description: "Civilian and defense agencies" },
      { name: "State & Local Government", description: "Municipal and regional agencies" },
      { name: "Healthcare & Life Sciences", description: "HIPAA-compliant systems" },
      { name: "Financial Services", description: "Secure fintech solutions" },
      { name: "Defense & Intelligence", description: "Mission-critical infrastructure" },
      { name: "Nonprofit & Faith Organizations", description: "Mission-aligned technology" },
      { name: "Education & Research", description: "Academic technology solutions" },
      { name: "Small & Mid-Size Business", description: "Scalable enterprise tools" },
    ],
  },
  whyChoose: {
    eyebrow: "Why Wali Productions",
    heading: "The partner enterprise clients choose.",
    subhead: "We combine the agility of a boutique firm with the discipline and technical depth of a major consultancy.",
    items: [
      {
        title: "Integrity Before Profit",
        description:
          "We believe long-term trust is more valuable than short-term revenue. We will tell you what you need, not what costs the most.",
      },
      {
        title: "Engineering Excellence",
        description:
          "Senior-level engineers who take ownership of outcomes — not junior developers billing hours on client time.",
      },
      {
        title: "Veteran-Led Discipline",
        description:
          "Military precision in project management means on-time delivery, clear communication, and zero ambiguity.",
      },
      {
        title: "Security-First Mindset",
        description:
          "Every solution is architected with security by design — not security as an afterthought.",
      },
      {
        title: "Long-Term Partnership",
        description:
          "We build relationships, not transactions. Our clients return because we deliver consistent, dependable results.",
      },
      {
        title: "Transparent Communication",
        description:
          "Clear, honest reporting on progress, risks, and budget — no surprises, no hidden costs, no excuses.",
      },
    ],
  },
  cta: {
    heading: "Ready to start your project?",
    body: "Share your goals, timeline, and budget — we'll respond within 24 hours with an honest assessment and a clear path forward.",
    primaryCta: { label: "Start a Project", href: "/start" },
    note: "Veteran-Owned · No commitment required · Response within 24 hours",
  },
};
