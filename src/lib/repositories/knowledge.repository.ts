import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";
import type { KnowledgeEntry, KnowledgeCategory, KnowledgeStatus } from "@/types/knowledge";

export type StoredKnowledgeEntry = EntityRecord & KnowledgeEntry;

class KnowledgeRepository extends BaseRepository<StoredKnowledgeEntry> {
  constructor() {
    super(COLLECTION_PATHS.knowledge, "knowledge");
  }

  protected buildSearchKeywords(e: StoredKnowledgeEntry): string[] {
    return [
      e.title,
      e.category,
      e.status,
      e.description ?? "",
      e.content ?? "",
      e.ownerRole ?? "",
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async findByCategory(category: KnowledgeCategory): Promise<StoredKnowledgeEntry[]> {
    const result = await this.findAll({
      filters: [{ field: "category", operator: "eq", value: category }],
      perPage: 200,
    });
    return result.items;
  }

  async findByStatus(status: KnowledgeStatus): Promise<StoredKnowledgeEntry[]> {
    const result = await this.findAll({
      filters: [{ field: "status", operator: "eq", value: status }],
      perPage: 200,
    });
    return result.items;
  }

  async getDueForReview(): Promise<StoredKnowledgeEntry[]> {
    const today = new Date().toISOString().slice(0, 10);
    const all = await this.listAll();
    return all.filter(
      (e) =>
        !e.deleted &&
        !e.archived &&
        e.nextReviewAt &&
        e.nextReviewAt <= today,
    );
  }

  async getStats(): Promise<{
    total: number;
    approved: number;
    draftCount: number;
    dueForReview: number;
    byCategory: Record<KnowledgeCategory, number>;
  }> {
    const all = await this.listAll();
    const active = all.filter((e) => !e.deleted && !e.archived);
    const dueForReview = await this.getDueForReview();

    const byCategory: Record<string, number> = {};
    for (const e of active) {
      byCategory[e.category] = (byCategory[e.category] ?? 0) + 1;
    }

    return {
      total: active.length,
      approved: active.filter((e) => e.status === "approved").length,
      draftCount: active.filter((e) => e.status === "draft").length,
      dueForReview: dueForReview.length,
      byCategory: byCategory as Record<KnowledgeCategory, number>,
    };
  }
}

export const knowledgeRepository = new KnowledgeRepository();
