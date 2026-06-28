/**
 * Contract management types — post-award lifecycle.
 *
 * A Contract represents an awarded agreement. It generates Task Orders
 * (for IDIQ/GWAC vehicles) and Projects (for each active engagement).
 * Distinct from Proposal (pre-award) and Project (delivery execution).
 */

export type ContractStatus =
  | "pending-award"
  | "active"
  | "on-hold"
  | "expired"
  | "completed"
  | "terminated";

export type ContractType =
  | "firm-fixed-price"
  | "time-and-materials"
  | "cost-plus"
  | "indefinite-delivery-indefinite-quantity"
  | "blanket-purchase-agreement"
  | "basic-ordering-agreement"
  | "task-order"
  | "purchase-order";

export type ContractVehicleCategory =
  | "gsa-schedule"
  | "gwac"
  | "mac"
  | "idiq"
  | "open-market"
  | "other";

export type InvoiceStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "paid"
  | "disputed"
  | "overdue"
  | "cancelled";

export type OptionYearStatus = "unexercised" | "exercised" | "expired" | "declined";

export type DeliverableFrequency =
  | "one-time"
  | "weekly"
  | "bi-weekly"
  | "monthly"
  | "quarterly"
  | "annual"
  | "upon-request";

export type OptionYear = {
  year: number;
  startDate: string;
  endDate: string;
  status: OptionYearStatus;
  exerciseDeadline?: string;
  value?: number;
  notes?: string;
};

export type ContractMilestone = {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  completedDate?: string;
  completed: boolean;
  paymentAmount?: number;
  deliverableIds?: string[];
};

export type ContractDeliverable = {
  id: string;
  contractId: string;
  taskOrderId?: string;
  title: string;
  description?: string;
  frequency: DeliverableFrequency;
  dueDate?: string;
  submittedDate?: string;
  acceptedDate?: string;
  status: "pending" | "submitted" | "accepted" | "rejected" | "waived";
  submissionUrl?: string;
  governmentPointOfContact?: string;
  cdrlNumber?: string;
};

export type InvoiceLineItem = {
  description: string;
  quantity?: number;
  unitPrice?: number;
  amount: number;
  laborCategory?: string;
  hours?: number;
  periodStart?: string;
  periodEnd?: string;
};

export type InvoiceRecord = {
  id: string;
  contractId: string;
  taskOrderId?: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  amount: number;
  currency: string;
  periodStart?: string;
  periodEnd?: string;
  issuedDate: string;
  dueDate?: string;
  paidDate?: string;
  lineItems?: InvoiceLineItem[];
  submittedTo?: string;
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type ContractModificationType =
  | "scope-change"
  | "period-extension"
  | "funding-adjustment"
  | "administrative"
  | "termination";

export type ContractModification = {
  id: string;
  contractId: string;
  modificationNumber: string;
  type: ContractModificationType;
  effectiveDate: string;
  description: string;
  valueChange?: number;
  newTotalValue?: number;
  newEndDate?: string;
  governmentSignatory?: string;
  vendorSignatory?: string;
  signedAt?: string;
  createdAt: string;
};

export type ReportingRequirement = {
  id: string;
  title: string;
  description?: string;
  frequency: DeliverableFrequency;
  nextDueDate?: string;
  recipientEmail?: string;
  cdrlNumber?: string;
};

export type TaskOrder = {
  id: string;
  contractId: string;
  taskOrderNumber: string;
  title: string;
  description?: string;
  status: ContractStatus;
  type: ContractType;
  startDate: string;
  endDate: string;
  value: number;
  currency: string;
  projectId?: string;
  deliverables?: ContractDeliverable[];
  milestones?: ContractMilestone[];
  reportingRequirements?: ReportingRequirement[];
  contractionOfficerRepresentative?: string;
  programManager?: string;
  createdAt: string;
  updatedAt: string;
};

export type PerformanceRating = "exceptional" | "very-good" | "satisfactory" | "marginal" | "unsatisfactory";

export type PerformanceReport = {
  id: string;
  contractId: string;
  taskOrderId?: string;
  periodStart: string;
  periodEnd: string;
  rating?: PerformanceRating;
  evaluatorName?: string;
  evaluatorTitle?: string;
  summary?: string;
  strengths?: string[];
  areasForImprovement?: string[];
  submittedAt?: string;
  responseSubmittedAt?: string;
};

export type Contract = {
  id: string;
  contractNumber: string;
  title: string;
  description?: string;
  status: ContractStatus;
  type: ContractType;
  vehicleCategory?: ContractVehicleCategory;
  vehicleName?: string;
  clientId?: string;
  organizationId?: string;
  agency?: string;
  office?: string;
  contractingOfficer?: string;
  contractingOfficerRepresentative?: string;
  programManager?: string;
  proposalId?: string;
  opportunityId?: string;
  naicsCode?: string;
  pscCode?: string;
  setAside?: string;
  awardDate?: string;
  startDate: string;
  endDate: string;
  baseValue: number;
  totalValue?: number;
  currency: string;
  optionYears?: OptionYear[];
  taskOrders?: TaskOrder[];
  milestones?: ContractMilestone[];
  deliverables?: ContractDeliverable[];
  invoices?: InvoiceRecord[];
  modifications?: ContractModification[];
  performanceReports?: PerformanceReport[];
  reportingRequirements?: ReportingRequirement[];
  securityRequirements?: string;
  clearanceRequired?: string;
  internalNotes?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};
