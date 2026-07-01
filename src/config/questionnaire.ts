/**
 * Discovery Questionnaire schema — Stage 2 of the intake process.
 *
 * Source: docs/client-intake-questionnaire.pdf ("Website Feature Discovery
 * Questionnaire"). The source PDF is a single-page content-planning form;
 * this schema extracts its questions, normalizes duplicates, and groups
 * them alongside the broader project-discovery categories a full
 * engagement needs (business, marketing, infrastructure, budget, timeline,
 * technical requirements, future plans) so one structured flow covers both
 * a full website project and a single-page content request.
 *
 * This is content, not user data — it lives in config like every other
 * site copy. Answers are stored separately per lead in a
 * QuestionnaireResponse record, keyed by "sectionId.questionId".
 */

export type QuestionType = "text" | "textarea" | "select" | "multiselect" | "radio";

export type QuestionOption = {
  value: string;
  label: string;
};

export type QuestionnaireQuestion = {
  id: string;
  label: string;
  type: QuestionType;
  helpText?: string;
  options?: QuestionOption[];
  required?: boolean;
  /** Rendered after an "Other" / free-text style option is selected. */
  allowOther?: boolean;
};

export type QuestionnaireSection = {
  id: string;
  title: string;
  description: string;
  questions: QuestionnaireQuestion[];
};

export const QUESTIONNAIRE_SECTIONS: QuestionnaireSection[] = [
  {
    id: "business",
    title: "Business",
    description: "Tell us about the business, product, or service this project supports.",
    questions: [
      { id: "product-name", label: "What is the name of this product, service, or business?", type: "text", required: true },
      { id: "description", label: "In one or two sentences, how would you describe it?", type: "textarea", required: true },
      { id: "problem-solved", label: "What problem does it solve?", type: "textarea", required: true },
      { id: "ideal-customer", label: "Who is the ideal customer?", type: "textarea", required: true },
      { id: "differentiator", label: "Why would someone choose this instead of other options?", type: "textarea" },
      { id: "competitors", label: "Who are your main competitors, if any?", type: "textarea" },
    ],
  },
  {
    id: "goals",
    title: "Goals",
    description: "What should visitors do, and what should they remember?",
    questions: [
      {
        id: "visitor-actions",
        label: "What do you want visitors to do after viewing this site or page?",
        type: "multiselect",
        required: true,
        allowOther: true,
        options: [
          { value: "request-quote", label: "Request a quote" },
          { value: "schedule-consultation", label: "Schedule a consultation" },
          { value: "contact-you", label: "Contact you" },
          { value: "download-info", label: "Download information" },
          { value: "watch-demo", label: "Watch a demonstration" },
          { value: "learn-tech", label: "Learn about the technology" },
        ],
      },
      {
        id: "must-include",
        label: "What information must be included? Select all that apply.",
        type: "multiselect",
        allowOther: true,
        options: [
          { value: "features", label: "Features" },
          { value: "benefits", label: "Benefits" },
          { value: "case-studies", label: "Case studies" },
          { value: "testimonials", label: "Customer testimonials" },
          { value: "technical-info", label: "Technical information" },
          { value: "pricing", label: "Pricing" },
          { value: "faq", label: "Frequently Asked Questions" },
          { value: "certifications", label: "Certifications" },
          { value: "awards", label: "Awards" },
          { value: "industries-served", label: "Industries served" },
        ],
      },
      { id: "memorable-takeaway", label: "If there's one thing visitors remember after leaving your website, what should it be?", type: "textarea" },
    ],
  },
  {
    id: "branding",
    title: "Branding",
    description: "Colors, existing assets, and brand voice.",
    questions: [
      { id: "brand-colors", label: "Are there specific colors you'd like us to use?", type: "text" },
      {
        id: "brand-assets",
        label: "Which of these do you already have and can provide?",
        type: "multiselect",
        options: [
          { value: "company-logo", label: "Company logo" },
          { value: "product-logo", label: "Product logo" },
          { value: "brand-guidelines", label: "Brand guidelines" },
          { value: "fonts", label: "Fonts" },
          { value: "icons", label: "Icons" },
          { value: "existing-website", label: "Existing website" },
          { value: "photography", label: "Photography" },
          { value: "marketing-materials", label: "Marketing materials" },
          { value: "business-cards", label: "Business cards" },
          { value: "capability-statement", label: "Capability statement" },
          { value: "logo-source-files", label: "Logo source files (AI/EPS/SVG/PNG)" },
          { value: "social-media-graphics", label: "Social media graphics" },
        ],
      },
      { id: "brand-instructions", label: "Any other brand instructions or preferences?", type: "textarea" },
    ],
  },
  {
    id: "website",
    title: "Website & Pages",
    description: "Structure and scope of the site itself.",
    questions: [
      { id: "existing-website-url", label: "Do you have an existing website? If so, what's the URL?", type: "text" },
      { id: "pages-needed", label: "What pages or sections do you expect to need?", type: "textarea", helpText: "E.g. Home, About, Services, Portfolio, Contact." },
      { id: "must-have-features", label: "Are there specific features the site must have?", type: "textarea", helpText: "E.g. booking, e-commerce, member login, search, multi-language." },
      {
        id: "cms-needed",
        label: "Will you need to update content yourself after launch?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes — I'll need a content management system" },
          { value: "no", label: "No — updates can go through Wali Productions" },
          { value: "not-sure", label: "Not sure yet" },
        ],
      },
    ],
  },
  {
    id: "media",
    title: "Media & Visual Assets",
    description: "Images, graphics, video, and motion.",
    questions: [
      {
        id: "photos",
        label: "Do you already have photos you'd like us to use?",
        type: "radio",
        required: true,
        options: [
          { value: "yes-provided", label: "Yes — I will provide high-quality images" },
          { value: "no-ai-generated", label: "No — please provide AI-generated images" },
          { value: "not-sure", label: "Not sure — we can discuss during the discovery call" },
        ],
      },
      { id: "photo-subjects", label: "If we're sourcing images, what should visitors see?", type: "textarea", helpText: "E.g. buildings, team members, equipment, job sites, product shots." },
      {
        id: "custom-graphics",
        label: "Would you like custom graphics or diagrams to explain your product?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      { id: "graphics-explain", label: "If yes, what should they explain?", type: "textarea" },
      {
        id: "videos",
        label: "Would you like video on the site?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "video-types",
        label: "If yes, select all that apply.",
        type: "multiselect",
        allowOther: true,
        options: [
          { value: "have-videos", label: "We already have videos" },
          { value: "drone-footage", label: "Drone footage" },
          { value: "testimonials", label: "Customer interviews / testimonials" },
          { value: "promotional", label: "Create promotional / animated videos" },
          { value: "demonstration", label: "Demonstration videos" },
        ],
      },
      {
        id: "animations",
        label: "Would you like subtle animations to make the page more engaging?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "animation-types",
        label: "If yes, select all that apply.",
        type: "multiselect",
        options: [
          { value: "moving-backgrounds", label: "Moving backgrounds" },
          { value: "scroll-animations", label: "Scroll animations" },
          { value: "interactive-timelines", label: "Interactive timelines" },
          { value: "sliders-carousels", label: "Image sliders / carousels" },
          { value: "animated-icons", label: "Animated icons" },
          { value: "animated-statistics", label: "Animated statistics" },
        ],
      },
      { id: "animations-avoid", label: "Are there animations you do NOT want?", type: "textarea" },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "How people find you, and how the site fits your broader marketing.",
    questions: [
      { id: "marketing-channels", label: "Where do you currently market or advertise?", type: "textarea", helpText: "E.g. Google Ads, social media, referrals, trade shows, direct mail." },
      { id: "seo-goals", label: "Do you have specific SEO or search visibility goals?", type: "textarea" },
      { id: "social-profiles", label: "What social media profiles should we link to or integrate?", type: "text" },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Technical Requirements",
    description: "Hosting, domains, and integrations.",
    questions: [
      {
        id: "domain-status",
        label: "Domain status",
        type: "radio",
        options: [
          { value: "have-domain", label: "I already own a domain" },
          { value: "need-domain", label: "I need help registering a domain" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "hosting-status",
        label: "Hosting status",
        type: "radio",
        options: [
          { value: "have-hosting", label: "I already have hosting" },
          { value: "need-hosting", label: "I need hosting set up" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      { id: "integrations-needed", label: "Any systems that need to integrate with the site?", type: "textarea", helpText: "E.g. CRM, payment processor, email marketing, scheduling, accounting." },
      { id: "compliance-requirements", label: "Any security, accessibility, or compliance requirements?", type: "textarea", helpText: "E.g. ADA/WCAG, HIPAA, government/FedRAMP, PCI." },
    ],
  },
  {
    id: "budget-timeline",
    title: "Budget & Timeline",
    description: "Helps us scope the right solution for your situation.",
    questions: [
      {
        id: "budget-range",
        label: "What's your approximate budget range for this project?",
        type: "select",
        required: true,
        options: [
          { value: "under-5k", label: "Under $5,000" },
          { value: "5k-15k", label: "$5,000 – $15,000" },
          { value: "15k-50k", label: "$15,000 – $50,000" },
          { value: "50k-plus", label: "$50,000+" },
          { value: "not-sure", label: "Not sure yet" },
        ],
      },
      {
        id: "desired-launch",
        label: "Is there a target launch date or deadline?",
        type: "text",
        helpText: "A specific date, or 'as soon as possible', or 'flexible'.",
      },
      {
        id: "urgency",
        label: "How would you describe the urgency of this project?",
        type: "radio",
        options: [
          { value: "flexible", label: "Flexible — no hard deadline" },
          { value: "moderate", label: "Moderate — targeting a specific quarter" },
          { value: "urgent", label: "Urgent — hard deadline approaching" },
        ],
      },
    ],
  },
  {
    id: "assets",
    title: "Assets",
    description: "What you can hand off to us now.",
    questions: [
      { id: "existing-copy", label: "Do you have existing website copy or content we should use as a starting point?", type: "textarea" },
      { id: "supporting-docs", label: "Any supporting documents we should reference?", type: "textarea", helpText: "E.g. capability statements, brochures, case studies, past proposals. Files can be uploaded from your lead record after this questionnaire." },
    ],
  },
  {
    id: "future-plans",
    title: "Future Plans",
    description: "Where this project might grow next.",
    questions: [
      { id: "phase-two", label: "Are there features you'd like to add in a later phase?", type: "textarea" },
      { id: "growth-plans", label: "Any planned business changes that should influence this build?", type: "textarea", helpText: "E.g. new locations, new service lines, funding round, rebrand." },
      {
        id: "ecommerce-plans",
        label: "Do you anticipate needing e-commerce or a client portal in the future?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
    ],
  },
];

export function getQuestionnaireQuestionCount(): number {
  return QUESTIONNAIRE_SECTIONS.reduce((sum, s) => sum + s.questions.length, 0);
}

export function getQuestionnaireRequiredCount(): number {
  return QUESTIONNAIRE_SECTIONS.reduce(
    (sum, s) => sum + s.questions.filter((q) => q.required).length,
    0,
  );
}
