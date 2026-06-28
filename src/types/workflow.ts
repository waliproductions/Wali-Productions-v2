/**
 * Workflow engine types — configurable process definitions.
 *
 * Workflows are defined as configurations, not hardcoded procedures.
 * A WorkflowDefinition describes the template; a WorkflowInstance
 * tracks one running execution of that template.
 *
 * Future workflows: proposal approval, contract review, document approval,
 * client onboarding, project kickoff, closeout, internal reviews.
 */

export type WorkflowStatus =
  | "active"
  | "draft"
  | "archived"
  | "deprecated";

export type WorkflowInstanceStatus =
  | "pending"
  | "in-progress"
  | "paused"
  | "completed"
  | "cancelled"
  | "failed";

export type WorkflowStepStatus =
  | "waiting"
  | "active"
  | "completed"
  | "skipped"
  | "failed";

export type WorkflowStepType =
  | "approval"        // Requires human sign-off
  | "review"          // Requires human review (no formal sign-off)
  | "task"            // Assignable action item
  | "notification"    // Send notification only
  | "wait"            // Timed pause
  | "condition"       // Branch based on data
  | "webhook";        // Future: call external endpoint

export type WorkflowTriggerEvent =
  | "proposal.created"
  | "proposal.status-changed"
  | "contract.awarded"
  | "contract.expiring"
  | "document.uploaded"
  | "document.expiring"
  | "client.onboarded"
  | "project.kickoff"
  | "project.milestone-reached"
  | "project.closed"
  | "task.overdue"
  | "manual";

export type WorkflowStepCondition = {
  field: string;
  operator: "equals" | "not-equals" | "contains" | "greater-than" | "less-than";
  value: string | number | boolean;
};

export type WorkflowStep = {
  id: string;
  definitionId: string;
  order: number;
  type: WorkflowStepType;
  title: string;
  description?: string;
  assigneeRole?: string;
  durationHours?: number;
  requiresAll?: boolean;
  approvers?: string[];
  notificationTemplate?: string;
  conditions?: WorkflowStepCondition[];
  onComplete?: string;
  onReject?: string;
};

export type WorkflowDefinition = {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  trigger: WorkflowTriggerEvent;
  entityType: "proposal" | "contract" | "document" | "project" | "client" | "task";
  steps: WorkflowStep[];
  slaHours?: number;
  notifyOnComplete?: string[];
  notifyOnFail?: string[];
  version: string;
  createdAt: string;
  updatedAt: string;
};

export type WorkflowInstanceStep = {
  id: string;
  instanceId: string;
  stepId: string;
  status: WorkflowStepStatus;
  assignedTo?: string;
  startedAt?: string;
  completedAt?: string;
  comments?: string;
  decision?: "approved" | "rejected" | "skipped";
};

export type WorkflowInstance = {
  id: string;
  definitionId: string;
  status: WorkflowInstanceStatus;
  entityType: string;
  entityId: string;
  entityTitle?: string;
  triggeredBy?: string;
  currentStepId?: string;
  steps: WorkflowInstanceStep[];
  startedAt: string;
  completedAt?: string;
  cancelledAt?: string;
  notes?: string;
};
