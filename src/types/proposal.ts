/**
 * Proposal data model — supports commercial quotes and government proposal packages.
 *
 * Proposals progress through a lifecycle (draft → sent → accepted/rejected)
 * and maintain a revision history. Government proposals may include compliance
 * sections, past performance references, and team qualification blocks.
 */

export type ProposalStatus =
  | "draft"
  | "in-review"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired"
  | "revised"
  | "withdrawn";

export type PricingStrategy =
  | "fixed-price"
  | "time-and-materials"
  | "not-to-exceed"
  | "retainer"
  | "milestone-based"
  | "custom";

export type ProposalType = "commercial" | "government-federal" | "government-state" | "government-local";

export type ProposalLineItem = {
  id: string;
  description: string;
  category?: string;
  quantity?: number;
  unitPrice?: number;
  total?: number;
  notes?: string;
};

export type ProposalSection = {
  id: string;
  /** Section title (e.g. "Technical Approach", "Past Performance"). */
  title: string;
  content: string;
  /** Sort order within the proposal. */
  order: number;
};

export type ProposalMilestone = {
  id: string;
  title: string;
  description?: string;
  /** Weeks from project start date. */
  offsetWeeks?: number;
  /** Percentage of total project value. */
  paymentPercentage?: number;
  deliverables?: string[];
};

export type ProposalRevision = {
  version: number;
  createdAt: string;
  /** Brief description of what changed. */
  changeSummary: string;
};

export type Proposal = {
  id: string;
  title: string;
  type: ProposalType;
  status: ProposalStatus;
  pricingStrategy: PricingStrategy;
  clientId?: string;
  clientName?: string;
  /** Solicitation or opportunity reference number. */
  opportunityRef?: string;
  // Dates (ISO-8601)
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  sentAt?: string;
  // Scope definition
  scopeSummary?: string;
  assumptions?: string[];
  exclusions?: string[];
  // Financials
  lineItems?: ProposalLineItem[];
  subtotal?: number;
  discountAmount?: number;
  total?: number;
  currency?: string;
  // Structure
  sections?: ProposalSection[];
  milestones?: ProposalMilestone[];
  // Governance
  revisions?: ProposalRevision[];
  signedByClient?: boolean;
  signedByClientAt?: string;
  signedByVendor?: boolean;
  signedByVendorAt?: string;
  internalNotes?: string;
  // Government-specific
  naicsCodes?: string[];
  pscCodes?: string[];
  setAsideCategory?: string;
  complianceNotes?: string;
};
