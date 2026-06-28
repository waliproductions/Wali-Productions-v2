/**
 * Project data model — tracks engagements from proposal through delivery.
 *
 * Projects belong to a Client and may have milestones, deliverables, a team,
 * and linked proposals/invoices. All date fields are ISO-8601 strings.
 */

export type ProjectStatus =
  | "proposal"
  | "approved"
  | "active"
  | "on-hold"
  | "completed"
  | "cancelled";

export type ProjectHealth = "on-track" | "at-risk" | "blocked" | "completed";

export type MilestoneStatus = "pending" | "in-progress" | "completed" | "delayed";

export type DeliverableStatus =
  | "pending"
  | "in-progress"
  | "in-review"
  | "approved"
  | "rejected";

export type TeamRole =
  | "lead"
  | "developer"
  | "designer"
  | "consultant"
  | "project-manager"
  | "quality-assurance"
  | "subject-matter-expert";

export type Milestone = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completedDate?: string;
  status: MilestoneStatus;
  deliverableIds?: string[];
  /** Percentage of total project value tied to this milestone. */
  paymentPercentage?: number;
};

export type Deliverable = {
  id: string;
  title: string;
  description?: string;
  status: DeliverableStatus;
  dueDate?: string;
  completedDate?: string;
  fileUrl?: string;
  milestoneId?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: TeamRole;
  email?: string;
  clearanceLevel?: string;
};

export type ProjectDocument = {
  id: string;
  title: string;
  fileUrl: string;
  type: "contract" | "proposal" | "deliverable" | "report" | "specification" | "other";
  uploadedAt: string;
};

export type RiskProbability = "low" | "medium" | "high";
export type RiskImpact = "low" | "medium" | "high" | "critical";
export type RiskStatus = "open" | "mitigated" | "accepted" | "closed" | "realized";

export type Risk = {
  id: string;
  title: string;
  description?: string;
  probability: RiskProbability;
  impact: RiskImpact;
  status: RiskStatus;
  owner?: string;
  mitigationPlan?: string;
  contingencyPlan?: string;
  identifiedAt: string;
  reviewDate?: string;
  closedAt?: string;
};

export type IssueSeverity = "low" | "medium" | "high" | "critical";
export type IssueStatus = "open" | "in-progress" | "resolved" | "closed" | "wont-fix";

export type ProjectIssue = {
  id: string;
  title: string;
  description?: string;
  severity: IssueSeverity;
  status: IssueStatus;
  owner?: string;
  relatedRiskId?: string;
  resolution?: string;
  identifiedAt: string;
  resolvedAt?: string;
};

export type ChangeRequestStatus =
  | "pending"
  | "under-review"
  | "approved"
  | "rejected"
  | "implemented"
  | "withdrawn";

export type ChangeRequest = {
  id: string;
  title: string;
  description: string;
  requestedBy?: string;
  status: ChangeRequestStatus;
  impact?: string;
  scheduledImpactDays?: number;
  costImpact?: number;
  currency?: string;
  submittedAt: string;
  decisionAt?: string;
  implementedAt?: string;
  approvedBy?: string;
  rejectedReason?: string;
};

export type WBSNode = {
  id: string;
  code: string;
  title: string;
  description?: string;
  parentId?: string;
  level: number;
  estimatedHours?: number;
  actualHours?: number;
  assignedTo?: string;
  completionPct?: number;
};

export type LessonsLearnedRecord = {
  id: string;
  title: string;
  category: "process" | "technical" | "client" | "team" | "risk" | "communication" | "other";
  what: string;
  impact?: string;
  recommendation?: string;
  recordedBy?: string;
  recordedAt: string;
};

export type CustomerApproval = {
  id: string;
  title: string;
  deliverableId?: string;
  milestoneId?: string;
  status: "pending" | "approved" | "rejected" | "revision-requested";
  requestedAt: string;
  respondedAt?: string;
  approverName?: string;
  approverTitle?: string;
  comments?: string;
  signedDocumentUrl?: string;
};

export type Project = {
  id: string;
  title: string;
  description?: string;
  clientId?: string;
  /** Reference to associated Proposal. */
  proposalId?: string;
  contractId?: string;
  taskOrderId?: string;
  status: ProjectStatus;
  health: ProjectHealth;
  /** Service lines being performed. */
  servicesPerformed?: string[];
  technologies?: string[];
  startDate?: string;
  targetDate?: string;
  completedDate?: string;
  team?: TeamMember[];
  milestones?: Milestone[];
  deliverables?: Deliverable[];
  documents?: ProjectDocument[];
  wbs?: WBSNode[];
  risks?: Risk[];
  issues?: ProjectIssue[];
  changeRequests?: ChangeRequest[];
  customerApprovals?: CustomerApproval[];
  lessonsLearned?: LessonsLearnedRecord[];
  /** Estimated total budget in the project currency. */
  estimatedBudget?: number;
  /** Actual spend to date. */
  actualSpend?: number;
  currency?: string;
  internalNotes?: string;
  tags?: string[];
  /** Whether this project can be cited as past performance. */
  govPerformanceEligible?: boolean;
};
