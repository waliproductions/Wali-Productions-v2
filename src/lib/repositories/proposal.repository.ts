import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";
import type { Proposal, ProposalStatus, ProposalType } from "@/types/proposal";

export type StoredProposal = EntityRecord & Proposal;

class ProposalRepository extends BaseRepository<StoredProposal> {
  constructor() {
    super(COLLECTION_PATHS.proposal, "proposal");
  }

  protected buildSearchKeywords(e: StoredProposal): string[] {
    return [
      e.title,
      e.type,
      e.status,
      e.clientName ?? "",
      e.opportunityRef ?? "",
      e.scopeSummary ?? "",
      ...(e.naicsCodes ?? []),
    ].filter(Boolean);
  }

  async findByStatus(status: ProposalStatus): Promise<StoredProposal[]> {
    const result = await this.findAll({
      filters: [{ field: "status", operator: "eq", value: status }],
      perPage: 200,
    });
    return result.items;
  }

  async findByType(type: ProposalType): Promise<StoredProposal[]> {
    const result = await this.findAll({
      filters: [{ field: "type", operator: "eq", value: type }],
      perPage: 200,
    });
    return result.items;
  }

  async getStats(): Promise<{
    total: number;
    drafts: number;
    inReview: number;
    sent: number;
    accepted: number;
    totalValue: number;
  }> {
    const all = await this.listAll();
    const active = all.filter((p) => !p.deleted && !p.archived);
    return {
      total: active.length,
      drafts: active.filter((p) => p.status === "draft").length,
      inReview: active.filter((p) => p.status === "in-review").length,
      sent: active.filter((p) => p.status === "sent").length,
      accepted: active.filter((p) => p.status === "accepted").length,
      totalValue: active.reduce((sum, p) => sum + (p.total ?? 0), 0),
    };
  }

  async getExpiringProposals(days = 14): Promise<StoredProposal[]> {
    const all = await this.listAll();
    const cutoff = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
    return all.filter(
      (p) =>
        !p.deleted &&
        !p.archived &&
        p.status === "sent" &&
        p.expiresAt &&
        p.expiresAt <= cutoff,
    );
  }
}

export const proposalRepository = new ProposalRepository();
