export type Cta = {
  label: string;
  href: string;
};

export type ValueItem = {
  title: string;
  description: string;
};

export type AboutContent = {
  hero: {
    identity: string;
    headline: string;
    subhead: string;
    badges: string[];
  };
  companyStory: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  founderStory: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  faithFoundation: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  veteranService: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  technologyJourney: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  coreValues: {
    eyebrow: string;
    heading: string;
    subhead: string;
    items: ValueItem[];
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
    note: string;
  };
};

export const aboutContent: AboutContent = {
  hero: {
    identity: "About Wali Productions",
    headline: "Built on integrity. Driven by purpose.",
    subhead:
      "Wali Productions LLC is a Veteran-Owned technology consulting firm committed to delivering enterprise-grade solutions with the discipline, transparency, and integrity that demanding clients require.",
    badges: [
      "Veteran-Owned Small Business",
      "Enterprise Technology Consulting",
      "Government Contracting Ready",
    ],
  },
  companyStory: {
    eyebrow: "Our Story",
    heading: "Technology that serves people, not the other way around.",
    paragraphs: [
      "Wali Productions LLC was founded on a straightforward conviction: technology should solve real problems, improve organizations, and serve people with honesty and professionalism. We don't pursue complexity for its own sake — every solution we deliver is measured against the practical value it creates for the client.",
      "As a Veteran-Owned small business, we bring military-grade discipline to project execution, documentation, and accountability. Our clients — from government agencies to growing enterprises — choose us because they know what to expect: clear communication, honest assessments, and work that is done right.",
      "Our capabilities span software engineering, AI integration, cybersecurity, cloud architecture, IT consulting, digital transformation, and government technology services. Every engagement begins with understanding your mission and ends with measurable results.",
    ],
  },
  founderStory: {
    eyebrow: "Leadership",
    heading: "Led by a veteran technologist with a mission.",
    paragraphs: [
      "Wali Productions LLC was founded by Wali Johnson — a Christian, U.S. military veteran, software engineer, and technology leader. The company reflects his conviction that professional excellence and principled character are not competing values — they are inseparable.",
      "The founder maintains direct involvement in every client engagement, bringing senior-level technical depth, strategic clarity, and the accountability that comes from military training. Clients work with the decision-maker, not a sales layer.",
    ],
  },
  faithFoundation: {
    eyebrow: "Our Foundation",
    heading: "Faith as a foundation, not a barrier.",
    paragraphs: [
      "Wali Productions LLC was founded on Christian values — not as a marketing position, but as a genuine foundation for how we do business. We welcome clients of every background, belief, and industry. What our faith produces in practice is integrity, honest dealing, and a commitment to doing what's right even when it isn't profitable.",
      "We believe that faithful stewardship means delivering our best work, honoring our commitments, and treating every client relationship with the respect and transparency it deserves. Those values guide every project we touch.",
    ],
  },
  veteranService: {
    eyebrow: "Veteran-Owned",
    heading: "The discipline of service applied to technology.",
    paragraphs: [
      "Military service develops qualities that translate directly into exceptional consulting: disciplined planning, mission clarity, accountability under pressure, and the commitment to complete the objective regardless of obstacles. We apply that same standard to every client engagement.",
      "As a Veteran-Owned Small Business (VOSB), we are positioned to serve government agencies and prime contractors through set-aside contracting vehicles while bringing the professionalism and reliability that mission-critical work demands.",
    ],
  },
  technologyJourney: {
    eyebrow: "Technical Depth",
    heading: "Broad capabilities. Deep expertise.",
    paragraphs: [
      "Our technical practice spans the full spectrum of enterprise technology: custom software engineering, AI and machine learning integration, cybersecurity architecture, cloud infrastructure, systems administration, business process automation, and digital transformation consulting.",
      "We don't subcontract our core work or field junior developers on client projects. Every engagement is handled with senior-level technical judgment and backed by a commitment to continuous improvement and professional development.",
    ],
  },
  coreValues: {
    eyebrow: "Core Values",
    heading: "The values that guide every engagement.",
    subhead: "These aren't aspirational statements — they are the operating principles behind every decision we make.",
    items: [
      {
        title: "Integrity",
        description:
          "We operate with complete honesty — with clients, partners, and ourselves. We give accurate assessments even when they aren't what people want to hear.",
      },
      {
        title: "Excellence",
        description:
          "We pursue high-quality work because it reflects discipline and care. Our goal is not to complete projects, but to complete them exceptionally well.",
      },
      {
        title: "Accountability",
        description:
          "Veteran-trained discipline means we honor our commitments. Deadlines, deliverables, and communication standards are non-negotiable.",
      },
      {
        title: "Service",
        description:
          "We use technology to serve people and organizations — helping each client move forward, solve problems, and accomplish meaningful missions.",
      },
      {
        title: "Stewardship",
        description:
          "We treat client budgets, timelines, and trust as responsibilities, not resources. Sound stewardship produces long-term relationships.",
      },
      {
        title: "Innovation",
        description:
          "We embrace emerging technologies thoughtfully — applying AI, cloud, and modern architectures where they create genuine value.",
      },
      {
        title: "Faith",
        description:
          "Christ-centered values produce integrity, humility, and a commitment to doing what is right — qualities that make us a better partner.",
      },
    ],
  },
  clientPromise: {
    eyebrow: "Our Promise",
    heading: "What you can count on from every engagement.",
    paragraphs: [
      "When you engage Wali Productions LLC, you get honesty, professionalism, and a team that treats your mission as its own. We will tell you what you need to hear, deliver what we commit to, and remain accountable when challenges arise.",
      "We measure success not just by completed deliverables, but by the trust we earn and the lasting value we create. Our objective is to be the technology partner you call first — the one you know will give you a straight answer and do the work right.",
    ],
  },
  cta: {
    heading: "Let's build something that lasts.",
    body: "Whether you need an enterprise technology partner, a government contractor, or a trusted advisor for your most complex technology challenges — we are ready to have an honest conversation.",
    primaryCta: { label: "Schedule a Consultation", href: "/contact" },
    note: "No commitment required · Response within 24 hours",
  },
};
