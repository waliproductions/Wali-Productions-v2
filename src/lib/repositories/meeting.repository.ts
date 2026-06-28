import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";
import type { Meeting, MeetingStatus } from "@/types/crm";

export type StoredMeeting = EntityRecord & Meeting;

class MeetingRepository extends BaseRepository<StoredMeeting> {
  constructor() {
    super(COLLECTION_PATHS.meeting, "meeting");
  }

  protected buildSearchKeywords(e: StoredMeeting): string[] {
    return [
      e.title,
      e.type,
      e.status,
      e.location ?? "",
      e.notes ?? "",
      ...(e.actionItems ?? []),
    ].filter(Boolean);
  }

  async findByOrganization(organizationId: string): Promise<StoredMeeting[]> {
    const result = await this.findAll({
      filters: [{ field: "organizationId", operator: "eq", value: organizationId }],
      perPage: 200,
    });
    return result.items;
  }

  async findByStatus(status: MeetingStatus): Promise<StoredMeeting[]> {
    const result = await this.findAll({
      filters: [{ field: "status", operator: "eq", value: status }],
      perPage: 200,
    });
    return result.items;
  }

  async getUpcoming(limit = 5): Promise<StoredMeeting[]> {
    const now = new Date().toISOString();
    const all = await this.listAll();
    return all
      .filter((m) => !m.deleted && !m.archived && m.scheduledAt >= now && m.status === "scheduled")
      .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
      .slice(0, limit);
  }

  async getStats(): Promise<{
    scheduled: number;
    completedThisMonth: number;
    upcoming: number;
  }> {
    const all = await this.listAll();
    const active = all.filter((m) => !m.deleted && !m.archived);
    const now = new Date().toISOString();
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    return {
      scheduled: active.filter((m) => m.status === "scheduled").length,
      completedThisMonth: active.filter(
        (m) => m.status === "completed" && m.scheduledAt >= monthStart,
      ).length,
      upcoming: active.filter((m) => m.scheduledAt >= now && m.status === "scheduled").length,
    };
  }
}

export const meetingRepository = new MeetingRepository();
