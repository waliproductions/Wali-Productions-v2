/**
 * Lead data model — the single source of truth for the intake pipeline.
 *
 * A Lead spans the full lifecycle from an anonymous website consultation
 * request through qualification, discovery, proposal, and (if won) into an
 * active client relationship. Not every Lead originates from the website —
 * admins can create one manually for referrals, government contacts, or
 * relationships sourced offline.
 *
 * A Lead is intentionally NOT split across Organization/Contact/Opportunity
 * at intake time — that CRM model exists for established business
 * development tracking. A Lead is the lighter-weight front door; once work
 * is won, it can be linked forward into a Project via convertToProject.
 */

export type LeadStatus =
  | "new"
  | "qualified"
  | "consultation-scheduled"
  | "discovery-in-progress"
  | "proposal-sent"
  | "awaiting-client"
  | "won"
  | "lost"
  | "archived";

export type LeadSource =
  | "website-consultation"
  | "manual"
  | "referral"
  | "government"
  | "partner"
  | "other";

export type LeadPriority = "low" | "normal" | "high" | "urgent";

export type LeadProposalStatus = "none" | "drafting" | "sent" | "accepted" | "declined";

export type LeadProjectStatus = "none" | "not-started" | "in-progress" | "completed";

export type PreferredContactMethod = "email" | "phone" | "text" | "video-call" | "no-preference";

export type PreferredContactTime = "morning" | "afternoon" | "evening" | "anytime";

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "qualified",
  "consultation-scheduled",
  "discovery-in-progress",
  "proposal-sent",
  "awaiting-client",
  "won",
  "lost",
  "archived",
];

export const LEAD_OPEN_STATUSES: LeadStatus[] = [
  "new",
  "qualified",
  "consultation-scheduled",
  "discovery-in-progress",
  "proposal-sent",
  "awaiting-client",
];

export type Lead = {
  id: string;

  // Contact information
  fullName: string;
  email: string;
  phone?: string;
  preferredContactMethod?: PreferredContactMethod;
  preferredContactTime?: PreferredContactTime;

  // Company information
  companyName?: string;
  website?: string;

  // Lead metadata
  status: LeadStatus;
  source: LeadSource;
  priority: LeadPriority;
  tags: string[];
  assignedUserId?: string;
  followUpDate?: string;

  // Inquiry
  servicesInterested: string[];
  projectDescription?: string;

  // Linked workflow state
  questionnaireResponseId?: string;
  proposalIds: string[];
  proposalStatus: LeadProposalStatus;
  projectId?: string;
  projectStatus: LeadProjectStatus;

  // Merge foundation
  mergedIntoId?: string;

  createdAt: string;
  updatedAt: string;
};
