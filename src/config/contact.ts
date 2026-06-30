export type Cta = {
  label: string;
  href: string;
};

export type InquiryCategory = {
  title: string;
  description: string;
  services: string[];
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  timeline: string;
};

export type ContactContent = {
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
  consultation: {
    eyebrow: string;
    heading: string;
    intro: string;
    serviceOptions: string[];
  };
  process: ProcessStep[];
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
    responseTime: string;
    businessHours: string;
    note: string;
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: Cta;
    note: string;
  };
};

export const contactContent: ContactContent = {
  hero: {
    identity: "Contact Wali Productions",
    headline: "Let's start a conversation.",
    subhead:
      "Whether you have a complex technology challenge, a government contract opportunity, or simply want to understand how we can help — reach out and we'll give you an honest assessment.",
    badges: [
      "No commitment required",
      "Response within 24 hours",
      "Veteran-Owned",
    ],
  },
  overview: {
    eyebrow: "Get in Touch",
    heading: "Every great engagement starts with a conversation.",
    paragraphs: [
      "We don't do discovery calls to pitch you — we do them to understand your problem. Our process begins with listening, asking the right questions, and giving you a straight answer about whether and how we can help.",
      "You can expect professional, timely communication and an honest assessment regardless of project size. Every inquiry is treated with the same attention.",
    ],
  },
  consultation: {
    eyebrow: "Request a Consultation",
    heading: "Tell us about your project.",
    intro:
      "Share a few details about your needs and we'll follow up to schedule a discovery conversation — no commitment required.",
    serviceOptions: [
      "Software Engineering & Development",
      "AI Integration & Business Automation",
      "Cybersecurity & Compliance",
      "Cloud Solutions & Infrastructure",
      "IT Consulting & Technology Strategy",
      "Digital Transformation",
      "Government Technology Services",
      "Web Application Development",
      "Linux & Systems Administration",
      "Media & Livestream Production",
      "Other / Not Sure",
    ],
  },
  process: [
    {
      step: "01",
      title: "Submit Your Inquiry",
      description: "Complete the form with details about your project, timeline, and goals. The more context you provide, the better we can prepare.",
      timeline: "5 minutes",
    },
    {
      step: "02",
      title: "Initial Response",
      description: "We review every inquiry carefully and respond with initial thoughts and a request to schedule a discovery conversation.",
      timeline: "Within 24 hours",
    },
    {
      step: "03",
      title: "Discovery Conversation",
      description: "A 30–60 minute call to understand your challenge, constraints, and objectives. No sales pressure — just honest dialogue.",
      timeline: "30–60 minutes",
    },
    {
      step: "04",
      title: "Proposal & Next Steps",
      description: "If we're a fit, we deliver a clear, honest proposal with scope, timeline, and pricing. You decide how to proceed.",
      timeline: "3–5 business days",
    },
  ],
  inquiryCategories: {
    eyebrow: "Areas of Service",
    heading: "What can we help you with?",
    items: [
      {
        title: "Software & Technology",
        description: "Custom software, web applications, API development, and systems integration.",
        services: ["Custom Software Development", "Web Application Development", "Systems Integration & APIs"],
      },
      {
        title: "AI & Automation",
        description: "Machine learning integration, business process automation, and intelligent workflow design.",
        services: ["AI Integration", "Business Process Automation", "Data Pipeline Development"],
      },
      {
        title: "Cybersecurity",
        description: "Security assessment, compliance frameworks, and security architecture for regulated industries.",
        services: ["Security Assessment", "Compliance Implementation", "Zero-Trust Architecture"],
      },
      {
        title: "Cloud & Infrastructure",
        description: "Cloud migration, infrastructure design, and systems administration.",
        services: ["Cloud Migration", "Infrastructure Design", "Linux Systems Administration"],
      },
      {
        title: "Government Services",
        description: "Federal, state, and local government technology services with appropriate compliance posture.",
        services: ["Federal Agency IT", "State & Local Government", "Defense Contractor Support"],
      },
      {
        title: "Consulting & Strategy",
        description: "Technology strategy, roadmap development, and executive technology advisory.",
        services: ["Technology Strategy", "Digital Transformation", "Vendor Selection"],
      },
    ],
  },
  clientPromise: {
    eyebrow: "Our Promise",
    heading: "What you can expect from every interaction.",
    paragraphs: [
      "Honesty, professionalism, and genuine care for your outcome — from the first email to the final deliverable. We will tell you what you need to hear, not just what you want to hear.",
      "If we're not the right fit for your project, we'll tell you that too. Our reputation depends on honest dealing, and we protect it in every engagement.",
    ],
  },
  contactInfo: {
    eyebrow: "Contact Details",
    heading: "Reach us directly.",
    responseTime: "Within 24 hours",
    businessHours: "Monday – Friday, 9:00 AM – 5:00 PM ET",
    note: "All inquiries are reviewed personally. We respond to every message.",
  },
  cta: {
    heading: "Ready to get started?",
    body: "Submit your inquiry and we'll follow up with a thoughtful, honest response. No commitment required.",
    primaryCta: { label: "Submit Your Inquiry", href: "#consultation" },
    note: "No commitment required · Veteran-Owned · Response within 24 hours",
  },
};
