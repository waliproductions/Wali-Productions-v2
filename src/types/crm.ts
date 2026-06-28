/**
 * CRM data model — relationship and business development tracking.
 *
 * Distinct from Client (delivery) — an Organization here represents any
 * relationship target: prospect, active client, partner, or former client.
 * When an Organization is awarded work, a Client record is created and linked
 * via clientId. Contacts, meetings, and communications all live here.
 */

export type OrganizationStatus =
  | "prospect"
  | "qualified"
  | "active-client"
  | "former-client"
  | "partner"
  | "competitor"
  | "inactive";

export type OrganizationSize =
  | "solo"
  | "small"         // 2–49
  | "mid-market"    // 50–499
  | "enterprise"    // 500–4999
  | "large";        // 5000+

export type OrganizationSector =
  | "federal-government"
  | "state-government"
  | "local-government"
  | "defense"
  | "intelligence"
  | "healthcare"
  | "education"
  | "financial-services"
  | "technology"
  | "nonprofit"
  | "media"
  | "other";

export type Organization = {
  id: string;
  name: string;
  legalName?: string;
  status: OrganizationStatus;
  sector?: OrganizationSector;
  size?: OrganizationSize;
  website?: string;
  linkedinUrl?: string;
  hqCity?: string;
  hqState?: string;
  hqCountry?: string;
  /** Links to a Client record once work is active. */
  clientId?: string;
  primaryContactId?: string;
  annualRevenueEstimate?: number;
  currency?: string;
  description?: string;
  internalNotes?: string;
  tags?: string[];
  /** Government-specific identifiers. */
  uei?: string;
  cageCode?: string;
  naicsCodes?: string[];
  /** Relationship health score 0–100. */
  relationshipScore?: number;
  createdAt: string;
  updatedAt: string;
  lastActivityAt?: string;
};

export type CrmContactRole =
  | "executive"
  | "decision-maker"
  | "influencer"
  | "champion"
  | "gatekeeper"
  | "technical"
  | "contracting-officer"
  | "program-manager"
  | "other";

export type CrmContact = {
  id: string;
  organizationId?: string;
  firstName: string;
  lastName: string;
  title?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  role?: CrmContactRole;
  isPrimary?: boolean;
  decisionAuthority?: boolean;
  notes?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  lastContactedAt?: string;
};

export type MeetingType =
  | "intro-call"
  | "discovery"
  | "demo"
  | "proposal-review"
  | "negotiation"
  | "kickoff"
  | "check-in"
  | "debrief"
  | "networking"
  | "other";

export type MeetingStatus = "scheduled" | "completed" | "cancelled" | "no-show";

export type Meeting = {
  id: string;
  title: string;
  type: MeetingType;
  status: MeetingStatus;
  organizationId?: string;
  contactIds?: string[];
  opportunityId?: string;
  scheduledAt: string;
  durationMinutes?: number;
  location?: string;
  videoUrl?: string;
  agenda?: string;
  notes?: string;
  actionItems?: string[];
  followUpDate?: string;
  recordingUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type CommunicationChannel = "email" | "phone" | "video" | "in-person" | "linkedin" | "text";

export type CommunicationRecord = {
  id: string;
  organizationId?: string;
  contactId?: string;
  opportunityId?: string;
  channel: CommunicationChannel;
  subject?: string;
  summary: string;
  direction: "inbound" | "outbound";
  occurredAt: string;
  followUpRequired?: boolean;
  followUpDate?: string;
  createdAt: string;
};

export type SalesPipelineStage =
  | "prospect"
  | "initial-contact"
  | "discovery"
  | "proposal"
  | "negotiation"
  | "closed-won"
  | "closed-lost"
  | "on-hold";

export type SalesPipelineEntry = {
  id: string;
  title: string;
  organizationId?: string;
  contactIds?: string[];
  stage: SalesPipelineStage;
  estimatedValue?: number;
  currency?: string;
  winProbability?: number;
  expectedCloseDate?: string;
  proposalId?: string;
  source?: string;
  lostReason?: string;
  competitors?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CrmActivityType =
  | "email-sent"
  | "email-received"
  | "call"
  | "meeting"
  | "note"
  | "task-created"
  | "stage-change"
  | "proposal-sent"
  | "contract-signed";

export type CrmActivity = {
  id: string;
  type: CrmActivityType;
  organizationId?: string;
  contactId?: string;
  opportunityId?: string;
  summary: string;
  occurredAt: string;
  createdBy?: string;
};
