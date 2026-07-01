import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord, EntityType } from "@/lib/store/types";

export type ActivityVerb =
  | "created"
  | "updated"
  | "deleted"
  | "archived"
  | "restored"
  | "approved"
  | "rejected"
  | "submitted"
  | "completed"
  | "assigned"
  | "commented"
  | "uploaded"
  | "downloaded"
  | "logged-in"
  | "logged-out"
  | "settings-changed"
  | "workflow-started"
  | "workflow-completed"
  | "workflow-failed"
  | "notification-sent"
  // Lead lifecycle
  | "consultation-requested"
  | "consultation-scheduled"
  | "status-changed"
  | "note-added"
  | "questionnaire-sent"
  | "questionnaire-progress-saved"
  | "questionnaire-completed"
  | "proposal-created"
  | "proposal-sent"
  | "contract-signed"
  | "deposit-received"
  | "development-started"
  | "delivered"
  | "project-closed"
  | "converted-to-project"
  | "leads-merged";

export type ActivityRecord = EntityRecord & {
  verb: ActivityVerb;
  actor: string;
  entityType: EntityType | "auth" | "system";
  entityId?: string;
  entityTitle?: string;
  summary: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
};

class ActivityRepository extends BaseRepository<ActivityRecord> {
  constructor() {
    super(COLLECTION_PATHS.activity, "activity");
  }

  protected buildSearchKeywords(e: ActivityRecord): string[] {
    return [e.verb, e.actor, e.entityType, e.entityId ?? "", e.summary].filter(Boolean);
  }

  async log(
    verb: ActivityVerb,
    actor: string,
    entityType: ActivityRecord["entityType"],
    summary: string,
    opts: {
      entityId?: string;
      entityTitle?: string;
      metadata?: Record<string, unknown>;
      ipAddress?: string;
    } = {},
  ): Promise<ActivityRecord> {
    return this.create({
      verb,
      actor,
      entityType,
      summary,
      entityId: opts.entityId,
      entityTitle: opts.entityTitle,
      metadata: opts.metadata,
      ipAddress: opts.ipAddress,
    });
  }

  async getRecent(limit = 20): Promise<ActivityRecord[]> {
    const result = await this.findAll({
      sort: { field: "createdAt", order: "desc" },
      perPage: limit,
    });
    return result.items;
  }

  async getByEntity(entityType: string, entityId: string, limit = 50): Promise<ActivityRecord[]> {
    const result = await this.findAll({
      filters: [
        { field: "entityType", operator: "eq", value: entityType },
        { field: "entityId", operator: "eq", value: entityId },
      ],
      sort: { field: "createdAt", order: "desc" },
      perPage: limit,
    });
    return result.items;
  }

  async getByActor(actor: string, limit = 50): Promise<ActivityRecord[]> {
    const result = await this.findAll({
      filters: [{ field: "actor", operator: "eq", value: actor }],
      sort: { field: "createdAt", order: "desc" },
      perPage: limit,
    });
    return result.items;
  }

  async getStats(): Promise<{
    today: number;
    thisWeek: number;
    total: number;
    byVerb: Partial<Record<ActivityVerb, number>>;
  }> {
    const all = await this.listAll();
    const active = all.filter((a) => !a.deleted);
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();

    const byVerb: Partial<Record<ActivityVerb, number>> = {};
    for (const a of active) {
      byVerb[a.verb] = (byVerb[a.verb] ?? 0) + 1;
    }

    return {
      total: active.length,
      today: active.filter((a) => a.createdAt.slice(0, 10) === todayStr).length,
      thisWeek: active.filter((a) => a.createdAt >= weekAgo).length,
      byVerb,
    };
  }
}

export const activityRepository = new ActivityRepository();
