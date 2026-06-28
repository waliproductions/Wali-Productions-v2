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

export type Project = {
  id: string;
  title: string;
  description?: string;
  clientId?: string;
  /** Reference to associated Proposal. */
  proposalId?: string;
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
