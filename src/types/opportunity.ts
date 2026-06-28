export type OpportunityStatus =
  | "identified"
  | "tracking"
  | "pursuing"
  | "proposal-prep"
  | "submitted"
  | "awarded"
  | "not-awarded"
  | "cancelled"
  | "no-bid";

export type SetAsideCategory =
  | "8a"
  | "hubzone"
  | "wosb"
  | "edwosb"
  | "sdvosb"
  | "vosb"
  | "small-business"
  | "full-and-open";

export type CaptureStage =
  | "market-research"
  | "sources-sought"
  | "rfi-response"
  | "pre-proposal"
  | "proposal-development"
  | "final-proposal-revision"
  | "submitted";

export type SolicitationType =
  | "rfp"
  | "rfq"
  | "rfi"
  | "sources-sought"
  | "idiq"
  | "bpa"
  | "sole-source";

export type TeamingRole =
  | "prime"
  | "subcontractor"
  | "mentor-protege"
  | "joint-venture";

export type AgencyContactRole =
  | "contracting-officer"
  | "cor"
  | "program-manager"
  | "small-business-rep"
  | "other";

export type SolicitationAmendment = {
  date: string;
  summary: string;
};

export type GovOpportunity = {
  id: string;
  title: string;
  agency: string;
  solicitationNumber?: string;
  naicsCode?: string;
  pscCode?: string;
  setAside?: SetAsideCategory;
  estimatedValue?: number;
  currency?: string;
  status: OpportunityStatus;
  captureStage?: CaptureStage;
  postedDate?: string;
  responseDeadline?: string;
  awardDate?: string;
  description?: string;
  sourceUrl?: string;
  proposalId?: string;
  teamingPartners?: string[];
  internalNotes?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};

export type Solicitation = {
  id: string;
  opportunityId: string;
  solicitationNumber: string;
  title: string;
  type: SolicitationType;
  agency: string;
  issuedDate?: string;
  dueDate: string;
  estimatedValue?: number;
  currency?: string;
  description?: string;
  attachmentUrls?: string[];
  setAside?: SetAsideCategory;
  naicsCodes?: string[];
  pscCodes?: string[];
  qaDeadline?: string;
  amendments?: SolicitationAmendment[];
};

export type TeamingPartner = {
  id: string;
  companyName: string;
  role: TeamingRole;
  capabilities?: string[];
  contactName?: string;
  contactEmail?: string;
  uei?: string;
  cageCode?: string;
  smallBusinessStatus?: string[];
  clearanceLevel?: string;
  pastPerformanceAreas?: string[];
  notes?: string;
  opportunityIds?: string[];
};

export type AgencyContact = {
  id: string;
  agency: string;
  office?: string;
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  role: AgencyContactRole;
  notes?: string;
  opportunityIds?: string[];
};
