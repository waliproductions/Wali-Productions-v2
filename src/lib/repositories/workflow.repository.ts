import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";

// ─── Stored types ─────────────────────────────────────────────────────────────

export type WorkflowStepType =
  | "approval"
  | "review"
  | "task"
  | "notification"
  | "wait"
  | "condition";

export type WorkflowStepStatus = "waiting" | "active" | "completed" | "skipped" | "failed";
export type WorkflowInstanceStatus = "pending" | "in-progress" | "paused" | "completed" | "cancelled" | "failed";

export type WorkflowTrigger =
  | "manual"
  | "proposal.created"
  | "contract.awarded"
  | "contract.expiring"
  | "document.expiring"
  | "project.kickoff"
  | "project.milestone-reached"
  | "project.closed"
  | "task.overdue";

export type WorkflowStep = {
  id: string;
  order: number;
  type: WorkflowStepType;
  title: string;
  description?: string;
  assigneeRole?: string;
  durationHours?: number;
  requiresAll?: boolean;
  approvers?: string[];
};

export type StoredWorkflowDefinition = EntityRecord & {
  name: string;
  description?: string;
  status: "active" | "draft" | "archived";
  trigger: WorkflowTrigger;
  entityType: string;
  steps: WorkflowStep[];
  slaHours?: number;
  notifyOnComplete?: string[];
};

export type WorkflowInstanceStep = {
  id: string;
  stepId: string;
  status: WorkflowStepStatus;
  assignedTo?: string;
  startedAt?: string;
  completedAt?: string;
  comments?: string;
  decision?: "approved" | "rejected" | "skipped";
};

export type StoredWorkflowInstance = EntityRecord & {
  definitionId: string;
  definitionName: string;
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

// ─── Definition repository ────────────────────────────────────────────────────

class WorkflowDefinitionRepository extends BaseRepository<StoredWorkflowDefinition> {
  constructor() {
    super(COLLECTION_PATHS.workflow, "workflow");
  }

  protected buildSearchKeywords(e: StoredWorkflowDefinition): string[] {
    return [e.name, e.description ?? "", e.trigger, e.entityType, e.status].filter(Boolean);
  }

  async getActive(): Promise<StoredWorkflowDefinition[]> {
    const r = await this.findAll({
      filters: [{ field: "status", operator: "eq", value: "active" }],
      perPage: 200,
    });
    return r.items;
  }

  async getStats(): Promise<{ total: number; active: number; draft: number; steps: number }> {
    const all = await this.listAll();
    const live = all.filter((d) => !d.deleted && !d.archived);
    return {
      total: live.length,
      active: live.filter((d) => d.status === "active").length,
      draft: live.filter((d) => d.status === "draft").length,
      steps: live.reduce((sum, d) => sum + (d.steps?.length ?? 0), 0),
    };
  }
}

// ─── Instance repository ──────────────────────────────────────────────────────

class WorkflowInstanceRepository extends BaseRepository<StoredWorkflowInstance> {
  constructor() {
    super(COLLECTION_PATHS.workflowInstance, "workflowInstance");
  }

  protected buildSearchKeywords(e: StoredWorkflowInstance): string[] {
    return [e.definitionName, e.entityType, e.entityTitle ?? "", e.status, e.triggeredBy ?? ""].filter(Boolean);
  }

  async getActive(): Promise<StoredWorkflowInstance[]> {
    const r = await this.findAll({
      filters: [{ field: "status", operator: "in", value: ["pending", "in-progress", "paused"] }],
      sort: { field: "startedAt", order: "desc" },
      perPage: 100,
    });
    return r.items;
  }

  async getStats(): Promise<{
    total: number;
    active: number;
    completed: number;
    failed: number;
  }> {
    const all = await this.listAll();
    const live = all.filter((i) => !i.deleted);
    return {
      total: live.length,
      active: live.filter((i) => ["pending", "in-progress", "paused"].includes(i.status)).length,
      completed: live.filter((i) => i.status === "completed").length,
      failed: live.filter((i) => i.status === "failed" || i.status === "cancelled").length,
    };
  }
}

export const workflowRepository = new WorkflowDefinitionRepository();
export const workflowInstanceRepository = new WorkflowInstanceRepository();
