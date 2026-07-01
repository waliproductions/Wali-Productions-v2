import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";
import type { Lead, LeadStatus, LeadPriority, LeadSource } from "@/types/lead";
import { LEAD_OPEN_STATUSES } from "@/types/lead";

export type StoredLead = EntityRecord & Lead;

export type LeadSortField = "createdAt" | "updatedAt" | "followUpDate" | "priority" | "status" | "fullName";

class LeadRepository extends BaseRepository<StoredLead> {
  constructor() {
    super(COLLECTION_PATHS.lead, "lead");
  }

  protected buildSearchKeywords(e: StoredLead): string[] {
    return [
      e.fullName,
      e.email,
      e.companyName ?? "",
      e.website ?? "",
      e.status,
      e.source,
      e.projectDescription ?? "",
      ...(e.servicesInterested ?? []),
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async findByStatus(status: LeadStatus): Promise<StoredLead[]> {
    const result = await this.findAll({
      filters: [{ field: "status", operator: "eq", value: status }],
      perPage: 200,
    });
    return result.items;
  }

  async findByPriority(priority: LeadPriority): Promise<StoredLead[]> {
    const result = await this.findAll({
      filters: [{ field: "priority", operator: "eq", value: priority }],
      perPage: 200,
    });
    return result.items;
  }

  async findBySource(source: LeadSource): Promise<StoredLead[]> {
    const result = await this.findAll({
      filters: [{ field: "source", operator: "eq", value: source }],
      perPage: 200,
    });
    return result.items;
  }

  async getFollowUpsDue(): Promise<StoredLead[]> {
    const all = await this.listAll();
    const today = new Date().toISOString().slice(0, 10);
    return all.filter(
      (l) =>
        !l.deleted &&
        !l.archived &&
        LEAD_OPEN_STATUSES.includes(l.status) &&
        l.followUpDate &&
        l.followUpDate <= today,
    );
  }

  async getStats(): Promise<{
    total: number;
    new: number;
    qualified: number;
    openCount: number;
    followUpsDue: number;
    won: number;
    lost: number;
    byStatus: Record<LeadStatus, number>;
  }> {
    const all = await this.listAll();
    const active = all.filter((l) => !l.deleted && !l.archived);
    const today = new Date().toISOString().slice(0, 10);

    const byStatus = {
      new: 0,
      qualified: 0,
      "consultation-scheduled": 0,
      "discovery-in-progress": 0,
      "proposal-sent": 0,
      "awaiting-client": 0,
      won: 0,
      lost: 0,
      archived: 0,
    } as Record<LeadStatus, number>;

    let followUpsDue = 0;
    for (const l of active) {
      byStatus[l.status] = (byStatus[l.status] ?? 0) + 1;
      if (LEAD_OPEN_STATUSES.includes(l.status) && l.followUpDate && l.followUpDate <= today) {
        followUpsDue++;
      }
    }

    return {
      total: active.length,
      new: byStatus.new,
      qualified: byStatus.qualified,
      openCount: active.filter((l) => LEAD_OPEN_STATUSES.includes(l.status)).length,
      followUpsDue,
      won: byStatus.won,
      lost: byStatus.lost,
      byStatus,
    };
  }

  async getRecent(limit = 8): Promise<StoredLead[]> {
    const result = await this.findAll({
      sort: { field: "createdAt", order: "desc" },
      perPage: limit,
    });
    return result.items;
  }
}

export const leadRepository = new LeadRepository();
