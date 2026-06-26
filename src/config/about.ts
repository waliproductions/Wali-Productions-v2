/**
 * About page content model — single source of truth for About page copy.
 *
 * Populated from approved canonical documentation: COMPANY_STORY,
 * COMPANY_PROFILE, KINGDOM_MISSION, STATEMENT_OF_FAITH, MISSION_VISION_VALUES,
 * CORE_MESSAGES, VALUE_PROPOSITIONS, COMPETITIVE_ADVANTAGES, BUSINESS_CAPABILITIES,
 * and CLIENT_PROMISE.
 *
 * Where a detail is not yet documented (e.g., the expanded founder story —
 * FOUNDER_STORY.md is currently empty), a `pending()` placeholder remains.
 * This copy must only be changed through the approved documentation process.
 */

/** Marks copy that is not yet documented and records its source. */
const pending = (note: string, source: string) =>
  `[ pending approved copy: ${note} — source: ${source} ]`;

export type Cta = {
  label: string;
  /** Links to built routes within the site. */
  href: string;
};

export type ValueItem = {
  title: string;
  description: string;
};

export type AboutContent = {
  hero: {
    /** Approved business identity (COMPANY_PROFILE / BUSINESS_INFORMATION). */
    identity: string;
    headline: string;
    subhead: string;
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
  };
};

export const aboutContent: AboutContent = {
  hero: {
    identity: "Christian Veteran-Owned Technology & Digital Solutions",
    headline:
      "A Christian veteran-owned technology company built on integrity and service.",
    subhead:
      "Wali Productions LLC exists to provide professional technology and digital solutions with integrity, excellence, and a commitment to honoring Jesus Christ in both business and service.",
  },
  companyStory: {
    eyebrow: "Our Story",
    heading: "Technology that solves real problems and serves people.",
    paragraphs: [
      "Wali Productions LLC was founded on the belief that technology should solve real problems, improve organizations, and serve people with honesty and professionalism. Rather than pursuing technology for its own sake, we focus on delivering practical solutions that help clients operate more effectively and confidently.",
      "As a Christian Veteran-Owned business, Wali Productions LLC is committed to disciplined execution, ethical business practices, and long-term relationships built on trust.",
      "Our work spans technology consulting, software development, website development, automation, artificial intelligence, digital media, streaming technology, and government contracting support. Every service is approached with the same objective: deliver quality solutions while maintaining integrity in every engagement.",
    ],
  },
  founderStory: {
    eyebrow: "Founder",
    heading: "Led by a Christian, veteran technologist.",
    paragraphs: [
      "Wali Productions LLC was founded by Wali Johnson—a Christian, veteran, software engineering student, technologist, creator, and business owner. The Founder retains final authority over the company's mission, direction, values, services, branding, and technology strategy.",
      pending(
        "expanded founder story narrative",
        "FOUNDER_STORY.md (currently empty — not yet documented)",
      ),
    ],
  },
  faithFoundation: {
    eyebrow: "Kingdom Mission",
    heading: "Faithfulness to Jesus Christ is our foundation.",
    paragraphs: [
      "Wali Productions LLC exists first and foremost to honor King Jesus The Christ. The company was founded on the conviction that professional excellence and faithful Christian living are not competing pursuits—technology, business, engineering, and innovation are opportunities to serve others while remaining obedient to biblical principles.",
      "Jesus Christ is the foundation of Wali Productions LLC. The company does not place business success, financial gain, public approval, or opportunity above faithfulness to Christ, and seeks to conduct business according to biblical principles of truthfulness, integrity, stewardship, diligence, service, and excellence.",
    ],
  },
  veteranService: {
    eyebrow: "Veteran-Owned",
    heading: "Veteran-owned discipline and service.",
    paragraphs: [
      "As a veteran-owned company, Wali Productions LLC values discipline, responsibility, structure, and follow-through. Military experience contributes to disciplined planning, accountability, and mission-focused execution.",
      "That discipline shows up as ethical business practices, dependable communication, and long-term relationships built on trust.",
    ],
  },
  technologyJourney: {
    eyebrow: "Technology Journey",
    heading: "A commitment to continual learning and growth.",
    paragraphs: [
      "Our capabilities span software engineering, website development, artificial intelligence, information technology, business automation, streaming and media technology, and government contracting support.",
      "Wali Productions LLC is committed to expanding its capabilities through education, practical experience, disciplined engineering, and continual learning—growing as the organization grows while remaining aligned with the company's mission and biblical principles.",
    ],
  },
  coreValues: {
    eyebrow: "Core Values",
    heading: "The values that guide our work.",
    items: [
      {
        title: "Christ First",
        description:
          "Jesus Christ is the foundation of Wali Productions LLC. The company exists to honor Him before profit, popularity, opportunity, or growth.",
      },
      {
        title: "Integrity",
        description:
          "We operate with honesty, transparency, and dependability. Clients should be able to trust both the work and the word of the company.",
      },
      {
        title: "Excellence",
        description:
          "We pursue high-quality work because excellence reflects discipline, care, and service. The goal is not merely to complete projects, but to complete them well.",
      },
      {
        title: "Service",
        description:
          "We use technology to serve people and organizations, helping each client move forward, solve a problem, communicate better, or accomplish a meaningful mission.",
      },
      {
        title: "Stewardship",
        description:
          "Skills, knowledge, tools, time, and opportunities are responsibilities entrusted to the company, to be used wisely and faithfully.",
      },
      {
        title: "Discipline",
        description:
          "As a veteran-owned company, we value discipline, responsibility, structure, and follow-through.",
      },
      {
        title: "Purpose",
        description:
          "Technology should not be used aimlessly. Every solution should have a clear reason, a practical function, and a meaningful outcome.",
      },
    ],
  },
  clientPromise: {
    eyebrow: "Our Promise",
    heading: "Our promise to every client.",
    paragraphs: [
      "When you work with Wali Productions LLC, you can expect honesty, professionalism, integrity, and a sincere commitment to serving your best interests.",
      "Success is measured not only by completed work, but by the trust we build, the quality we deliver, and the integrity with which we conduct ourselves. We strive to leave every client better equipped than when we began.",
    ],
  },
  cta: {
    heading: "Let's work together.",
    body: "We seek to become trusted advisors and long-term technology partners who consistently provide value through professional service and faithful stewardship.",
    primaryCta: { label: "Request a Consultation", href: "/contact" },
  },
};
