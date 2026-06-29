import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";

export type CaptureStage =
  | "market-research"
  | "sources-sought"
  | "rfi-response"
  | "pre-proposal"
  | "proposal-development"
  | "final-proposal-revision"
  | "submitted"
  | "awarded"
  | "no-bid"
  | "not-awarded";

export type CaptureDecision = "bid" | "no-bid" | "pending";

export type GateReview = {
  id: string;
  name: string;
  scheduledAt: string;
  completedAt?: string;
  decision?: "go" | "no-go" | "hold";
  notes?: string;
};

export type TeamingPartner = {
  organizationId?: string;
  name: string;
  role: "prime" | "sub" | "mentor" | "jv";
  capabilityFit?: string;
  status: "identified" | "contacted" | "under-nda" | "teaming-agreement" | "declined";
};

export type CompetitorProfile = {
  name: string;
  incumbent: boolean;
  strengths?: string[];
  weaknesses?: string[];
  estimatedWinProbability?: number;
};

export type StoredCaptureRecord = EntityRecord & {
  opportunityId: string;
  opportunityTitle: string;
  agency?: string;
  solicitationNumber?: string;
  stage: CaptureStage;
  bidDecision: CaptureDecision;
  captureManager?: string;
  estimatedValue?: number;
  winProbability?: number;
  proposalDueDate?: string;
  awardDate?: string;
  setAside?: string;
  contractType?: string;
  naicsCodes?: string[];
  pscCodes?: string[];
  incumbentName?: string;
  incumbentAdvantage?: string;
  customerPain?: string;
  winThemes?: string[];
  discriminators?: string[];
  teamingPartners?: TeamingPartner[];
  competitors?: CompetitorProfile[];
  gateReviews?: GateReview[];
  notes?: string;
  nextAction?: string;
  nextActionDate?: string;
};

class CaptureRepository extends BaseRepository<StoredCaptureRecord> {
  constructor() {
    super(COLLECTION_PATHS.capture, "capture");
  }

  protected buildSearchKeywords(e: StoredCaptureRecord): string[] {
    return [
      e.opportunityTitle,
      e.agency ?? "",
      e.solicitationNumber ?? "",
      e.stage,
      e.bidDecision,
      e.captureManager ?? "",
      e.incumbentName ?? "",
      ...(e.naicsCodes ?? []),
    ].filter(Boolean);
  }

  async getActive(): Promise<StoredCaptureRecord[]> {
    const r = await this.findAll({
      filters: [
        { field: "bidDecision", operator: "eq", value: "bid" },
        {
          field: "stage",
          operator: "in",
          value: [
            "market-research",
            "sources-sought",
            "rfi-response",
            "pre-proposal",
            "proposal-development",
            "final-proposal-revision",
          ],
        },
      ],
      sort: { field: "proposalDueDate", order: "asc" },
      perPage: 100,
    });
    return r.items;
  }

  async getStats(): Promise<{
    total: number;
    activePursuit: number;
    totalPipelineValue: number;
    weightedPipelineValue: number;
    byStage: Partial<Record<CaptureStage, number>>;
    upcomingGateReviews: number;
    deadlinesThisMonth: number;
  }> {
    const all = await this.listAll();
    const active = all.filter((c) => !c.deleted && !c.archived);
    const now = new Date();
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
    const today = now.toISOString().slice(0, 10);

    const byStage: Partial<Record<CaptureStage, number>> = {};
    let totalValue = 0;
    let weightedValue = 0;
    let gateReviews = 0;
    let deadlines = 0;

    for (const c of active) {
      byStage[c.stage] = (byStage[c.stage] ?? 0) + 1;
      if (c.estimatedValue) {
        totalValue += c.estimatedValue;
        weightedValue += c.estimatedValue * ((c.winProbability ?? 50) / 100);
      }
      if (c.proposalDueDate && c.proposalDueDate >= today && c.proposalDueDate <= monthEnd) {
        deadlines++;
      }
      const upcomingGates = (c.gateReviews ?? []).filter(
        (g) => !g.completedAt && g.scheduledAt >= today && g.scheduledAt <= monthEnd,
      );
      gateReviews += upcomingGates.length;
    }

    const activePursuit = active.filter(
      (c) =>
        c.bidDecision === "bid" &&
        !["submitted", "awarded", "no-bid", "not-awarded"].includes(c.stage),
    ).length;

    return {
      total: active.length,
      activePursuit,
      totalPipelineValue: totalValue,
      weightedPipelineValue: weightedValue,
      byStage,
      upcomingGateReviews: gateReviews,
      deadlinesThisMonth: deadlines,
    };
  }
}

export const captureRepository = new CaptureRepository();
