import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";

export type TaskStatus = "backlog" | "todo" | "in-progress" | "in-review" | "done" | "cancelled" | "blocked";
export type TaskPriority = "critical" | "high" | "medium" | "low";
export type TaskType = "task" | "subtask" | "milestone" | "recurring" | "approval" | "review";

export type TaskDependency = {
  taskId: string;
  type: "blocks" | "blocked-by" | "related";
};

export type TaskComment = {
  id: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
  updatedAt?: string;
  mentions?: string[];
};

export type StoredTask = EntityRecord & {
  title: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assigneeName?: string;
  ownerId?: string;
  ownerName?: string;
  reviewerId?: string;
  // Entity linkage
  entityType?: string;
  entityId?: string;
  entityTitle?: string;
  // Project/proposal linkage
  projectId?: string;
  proposalId?: string;
  contractId?: string;
  // Scheduling
  dueDate?: string;
  startDate?: string;
  completedAt?: string;
  estimatedHours?: number;
  actualHours?: number;
  // Hierarchy
  parentTaskId?: string;
  // Recurrence
  recurringInterval?: "daily" | "weekly" | "biweekly" | "monthly" | "quarterly";
  recurringNextDue?: string;
  // Metadata
  dependencies?: TaskDependency[];
  comments?: TaskComment[];
  tags?: string[];
  checklist?: { id: string; label: string; done: boolean }[];
};

class TaskRepository extends BaseRepository<StoredTask> {
  constructor() {
    super(COLLECTION_PATHS.task, "task");
  }

  protected buildSearchKeywords(e: StoredTask): string[] {
    return [
      e.title,
      e.description ?? "",
      e.status,
      e.priority,
      e.type,
      e.assigneeName ?? "",
      e.ownerName ?? "",
      e.entityTitle ?? "",
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async findByAssignee(assigneeId: string): Promise<StoredTask[]> {
    const result = await this.findAll({
      filters: [{ field: "assigneeId", operator: "eq", value: assigneeId }],
      sort: { field: "dueDate", order: "asc" },
      perPage: 200,
    });
    return result.items;
  }

  async findByEntity(entityType: string, entityId: string): Promise<StoredTask[]> {
    const result = await this.findAll({
      filters: [
        { field: "entityType", operator: "eq", value: entityType },
        { field: "entityId", operator: "eq", value: entityId },
      ],
      sort: { field: "dueDate", order: "asc" },
      perPage: 200,
    });
    return result.items;
  }

  async getOverdue(): Promise<StoredTask[]> {
    const all = await this.listAll();
    const today = new Date().toISOString().slice(0, 10);
    return all.filter(
      (t) =>
        !t.deleted &&
        !t.archived &&
        t.status !== "done" &&
        t.status !== "cancelled" &&
        t.dueDate &&
        t.dueDate < today,
    );
  }

  async getDueSoon(days = 7): Promise<StoredTask[]> {
    const all = await this.listAll();
    const today = new Date().toISOString().slice(0, 10);
    const cutoff = new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
    return all.filter(
      (t) =>
        !t.deleted &&
        !t.archived &&
        t.status !== "done" &&
        t.status !== "cancelled" &&
        t.dueDate &&
        t.dueDate >= today &&
        t.dueDate <= cutoff,
    );
  }

  async getStats(): Promise<{
    total: number;
    open: number;
    inProgress: number;
    done: number;
    overdue: number;
    dueSoon: number;
    byPriority: Record<TaskPriority, number>;
    byStatus: Record<TaskStatus, number>;
  }> {
    const all = await this.listAll();
    const live = all.filter((t) => !t.deleted && !t.archived);
    const today = new Date().toISOString().slice(0, 10);
    const cutoff = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);

    const byPriority: Record<TaskPriority, number> = { critical: 0, high: 0, medium: 0, low: 0 };
    const byStatus: Record<TaskStatus, number> = {
      backlog: 0, todo: 0, "in-progress": 0, "in-review": 0, done: 0, cancelled: 0, blocked: 0,
    };

    let overdue = 0;
    let dueSoon = 0;

    for (const t of live) {
      byPriority[t.priority] = (byPriority[t.priority] ?? 0) + 1;
      byStatus[t.status] = (byStatus[t.status] ?? 0) + 1;
      const isOpen = t.status !== "done" && t.status !== "cancelled";
      if (isOpen && t.dueDate && t.dueDate < today) overdue++;
      if (isOpen && t.dueDate && t.dueDate >= today && t.dueDate <= cutoff) dueSoon++;
    }

    return {
      total: live.length,
      open: live.filter((t) => t.status !== "done" && t.status !== "cancelled").length,
      inProgress: byStatus["in-progress"],
      done: byStatus.done,
      overdue,
      dueSoon,
      byPriority,
      byStatus,
    };
  }
}

export const taskRepository = new TaskRepository();
