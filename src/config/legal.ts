/**
 * Legal pages content model — Privacy, Terms, and Accessibility.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * IMPORTANT: These are STRUCTURAL pages only. No legal policy text, privacy
 * practices, or official policies are authored here. Section bodies are explicit
 * placeholders and each page renders a visible notice that official content will
 * replace the placeholders only after legal review. Do not fabricate legal
 * language, privacy practices, certifications, or contact details in this file.
 *
 * The accessibility page lists features that are actually implemented in this
 * codebase (verifiable, not claims of formal conformance); the formal
 * conformance statement and feedback contact remain placeholders.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDoc = {
  title: string;
  description: string;
  /** Placeholder until an effective date is set after review. */
  lastUpdated: string;
  /** Prominent notice shown at the top of the page. */
  notice: string;
  intro?: string;
  sections: LegalSection[];
};

const REVIEW_NOTICE =
  "This page is a structural placeholder. Official, legally reviewed content will replace the placeholder sections below. It is not yet in effect and does not represent the company's official policy.";

const PLACEHOLDER =
  "[ Placeholder — official content will be added here after legal review. ]";

const PENDING_EFFECTIVE = "Effective date: pending legal review.";

export const privacyContent: LegalDoc = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Wali Productions LLC — placeholder pending legal review.",
  lastUpdated: PENDING_EFFECTIVE,
  notice: REVIEW_NOTICE,
  intro:
    "This Privacy Policy will describe how Wali Productions LLC handles information in connection with this website. The final, reviewed policy will replace the placeholder sections below.",
  sections: [
    { heading: "Information We Collect", paragraphs: [PLACEHOLDER] },
    { heading: "How Information Is Used", paragraphs: [PLACEHOLDER] },
    { heading: "Cookies and Similar Technologies", paragraphs: [PLACEHOLDER] },
    { heading: "Third-Party Services", paragraphs: [PLACEHOLDER] },
    { heading: "Data Retention", paragraphs: [PLACEHOLDER] },
    { heading: "Your Rights and Choices", paragraphs: [PLACEHOLDER] },
    {
      heading: "Contact",
      paragraphs: [
        "Privacy questions can be directed through the contact page once official contact details are published.",
      ],
    },
  ],
};

export const termsContent: LegalDoc = {
  title: "Terms of Service",
  description:
    "Terms of Service for Wali Productions LLC — placeholder pending legal review.",
  lastUpdated: PENDING_EFFECTIVE,
  notice: REVIEW_NOTICE,
  intro:
    "These Terms of Service will govern use of this website. The final, reviewed terms will replace the placeholder sections below.",
  sections: [
    { heading: "Acceptance of Terms", paragraphs: [PLACEHOLDER] },
    { heading: "Use of the Website", paragraphs: [PLACEHOLDER] },
    { heading: "Intellectual Property", paragraphs: [PLACEHOLDER] },
    { heading: "Disclaimers", paragraphs: [PLACEHOLDER] },
    { heading: "Limitation of Liability", paragraphs: [PLACEHOLDER] },
    { heading: "Governing Law", paragraphs: [PLACEHOLDER] },
    { heading: "Changes to These Terms", paragraphs: [PLACEHOLDER] },
    {
      heading: "Contact",
      paragraphs: [
        "Questions about these terms can be directed through the contact page once official contact details are published.",
      ],
    },
  ],
};

export const accessibilityContent: LegalDoc = {
  title: "Accessibility",
  description:
    "Accessibility statement for Wali Productions LLC — placeholder pending review.",
  lastUpdated: PENDING_EFFECTIVE,
  notice:
    "The formal accessibility statement and conformance level below are placeholders pending review. The accessibility features listed describe how this website is currently built.",
  intro:
    "Wali Productions LLC intends for this website to be usable by as many people as possible. The features below are currently implemented; the formal conformance statement and feedback process will be finalized after review.",
  sections: [
    {
      heading: "Accessibility Features of This Website",
      paragraphs: [
        "This website is built with the following accessibility features:",
      ],
      bullets: [
        "Semantic landmarks (header, navigation, main, and footer regions).",
        "A skip link to jump directly to the main content.",
        "A single, ordered heading hierarchy on each page.",
        "Keyboard-operable navigation, including the mobile menu.",
        "Visible keyboard focus indicators.",
        "Reduced-motion support that respects the operating system setting.",
        "Labelled form fields on the contact form.",
        "Responsive layout that adapts to a range of screen sizes.",
      ],
    },
    { heading: "Conformance Status", paragraphs: [PLACEHOLDER] },
    {
      heading: "Feedback",
      paragraphs: [
        "Accessibility feedback can be directed through the contact page once official contact details are published.",
      ],
    },
  ],
};
