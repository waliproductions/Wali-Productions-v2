/**
 * Proposal workspace types — reusable proposal development system.
 *
 * Extends the base Proposal type with the structure needed for collaborative
 * proposal development: volumes, reusable sections, compliance matrices,
 * review cycles, and approval workflows.
 */

export type ProposalVolumeType =
  | "technical"
  | "management"
  | "pricing"
  | "past-performance"
  | "staffing"
  | "executive-summary"
  | "oral-presentation"
  | "other";

export type SectionTemplateCategory =
  | "company-background"
  | "technical-approach"
  | "management-approach"
  | "past-performance"
  | "staffing-plan"
  | "transition-plan"
  | "quality-assurance"
  | "risk-management"
  | "pricing-narrative"
  | "certifications"
  | "other";

export type ReviewType =
  | "pink-team"      // Early concept review
  | "red-team"       // Full proposal review against RFP
  | "gold-team"      // Final quality review
  | "compliance"     // Compliance check
  | "pricing"        // Pricing review
  | "executive";     // Leadership approval

export type ReviewStatus = "scheduled" | "in-progress" | "complete" | "cancelled";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "requires-revision";

export type ComplianceStatus = "compliant" | "non-compliant" | "not-addressed" | "not-applicable";

/** A reusable content block saved in the section library. */
export type SectionTemplate = {
  id: string;
  title: string;
  category: SectionTemplateCategory;
  content: string;
  wordCount?: number;
  version: string;
  approved: boolean;
  approvedAt?: string;
  usageCount?: number;
  tags?: string[];
  proposalIds?: string[];
  createdAt: string;
  updatedAt: string;
};

/** A volume within a specific proposal. */
export type ProposalVolume = {
  id: string;
  proposalId: string;
  type: ProposalVolumeType;
  title: string;
  pageLimit?: number;
  currentPageCount?: number;
  sections?: ProposalVolumeSection[];
  assignedTo?: string;
  status: "not-started" | "drafting" | "review" | "final" | "submitted";
  completionPct?: number;
};

export type ProposalVolumeSection = {
  id: string;
  volumeId: string;
  title: string;
  /** Reference to a reusable SectionTemplate. */
  templateId?: string;
  content?: string;
  wordLimit?: number;
  wordCount?: number;
  order: number;
  assignedTo?: string;
  status: "not-started" | "drafting" | "review" | "final";
  comments?: string;
};

export type StaffingEntry = {
  id: string;
  proposalId: string;
  name?: string;
  laborCategory: string;
  level?: string;
  clearanceRequired?: string;
  hoursPerYear?: number;
  billRate?: number;
  resumeUrl?: string;
  keyPersonnel?: boolean;
  notes?: string;
};

export type ProposalGraphic = {
  id: string;
  proposalId: string;
  volumeId?: string;
  title: string;
  description?: string;
  fileUrl: string;
  thumbnailUrl?: string;
  figureNumber?: string;
  type: "diagram" | "chart" | "table" | "photo" | "org-chart" | "other";
  createdAt: string;
};

export type ComplianceItem = {
  id: string;
  reference: string;
  requirement: string;
  responseLocation?: string;
  status: ComplianceStatus;
  notes?: string;
};

export type ComplianceMatrix = {
  id: string;
  proposalId: string;
  items: ComplianceItem[];
  completionPct?: number;
  lastReviewedAt?: string;
};

export type ReviewComment = {
  id: string;
  reviewId: string;
  section?: string;
  comment: string;
  severity: "critical" | "major" | "minor" | "suggestion";
  resolved?: boolean;
  resolvedAt?: string;
};

export type ProposalReview = {
  id: string;
  proposalId: string;
  type: ReviewType;
  status: ReviewStatus;
  scheduledDate?: string;
  completedDate?: string;
  reviewers?: string[];
  comments?: ReviewComment[];
  overallRating?: "go" | "conditional-go" | "no-go";
  summary?: string;
  createdAt: string;
};

export type ProposalApproval = {
  id: string;
  proposalId: string;
  approverName: string;
  approverTitle?: string;
  status: ApprovalStatus;
  requestedAt: string;
  respondedAt?: string;
  comments?: string;
};
