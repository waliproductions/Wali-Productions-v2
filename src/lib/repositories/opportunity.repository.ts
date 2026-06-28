import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";
import type { GovOpportunity, OpportunityStatus } from "@/types/opportunity";

export type OpportunityTrack =
  | "commercial"
  | "government-federal"
  | "government-state"
  | "government-local"
  | "enterprise";

export type OpportunityStage =
  | "lead"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "awarded"
  | "lost"
  | "archived";

export type StoredOpportunity = EntityRecord &
  Omit<GovOpportunity, "status"> & {
    track: OpportunityTrack;
    stage: OpportunityStage;
    status: OpportunityStatus;
    organizationId?: string;
    contactIds?: string[];
    notes?: string;
    estimatedValue?: number;
    currency?: string;
    winProbability?: number;
    expectedCloseDate?: string;
    responseDeadline?: string;
  };

class OpportunityRepository extends BaseRepository<StoredOpportunity> {
  constructor() {
    super(COLLECTION_PATHS.opportunity, "opportunity");
  }

  protected buildSearchKeywords(e: StoredOpportunity): string[] {
    return [
      e.title,
      e.agency ?? "",
      e.track,
      e.stage,
      e.solicitationNumber ?? "",
      e.notes ?? "",
      e.description ?? "",
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async findByStage(stage: OpportunityStage): Promise<StoredOpportunity[]> {
    const result = await this.findAll({
      filters: [{ field: "stage", operator: "eq", value: stage }],
      perPage: 200,
    });
    return result.items;
  }

  async findByTrack(track: OpportunityTrack): Promise<StoredOpportunity[]> {
    const result = await this.findAll({
      filters: [{ field: "track", operator: "eq", value: track }],
      perPage: 200,
    });
    return result.items;
  }

  async getPipelineStats(): Promise<{
    total: number;
    byStage: Record<OpportunityStage, number>;
    totalValue: number;
    activeCount: number;
    deadlinesThisWeek: number;
  }> {
    const all = await this.listAll();
    const active = all.filter((o) => !o.deleted && !o.archived);
    const now = new Date();
    const weekAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const byStage = {
      lead: 0,
      qualified: 0,
      proposal: 0,
      negotiation: 0,
      awarded: 0,
      lost: 0,
      archived: 0,
    } as Record<OpportunityStage, number>;

    let totalValue = 0;
    let deadlinesThisWeek = 0;

    for (const o of active) {
      byStage[o.stage] = (byStage[o.stage] ?? 0) + 1;
      if (o.estimatedValue) totalValue += o.estimatedValue;
      if (o.responseDeadline && o.responseDeadline <= weekAhead) deadlinesThisWeek++;
    }

    const openStages: OpportunityStage[] = ["lead", "qualified", "proposal", "negotiation"];
    return {
      total: active.length,
      byStage,
      totalValue,
      activeCount: active.filter((o) => openStages.includes(o.stage)).length,
      deadlinesThisWeek,
    };
  }
}

export const opportunityRepository = new OpportunityRepository();
