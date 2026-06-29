import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";

export type DocumentCategory =
  | "contract"
  | "proposal"
  | "sow"
  | "report"
  | "certificate"
  | "policy"
  | "procedure"
  | "template"
  | "correspondence"
  | "financial"
  | "legal"
  | "technical"
  | "other";

export type DocumentStatus =
  | "draft"
  | "in-review"
  | "approved"
  | "rejected"
  | "superseded"
  | "expired"
  | "archived";

export type DocumentVersion = {
  version: string;
  uploadedAt: string;
  uploadedBy: string;
  notes?: string;
  sizeBytes?: number;
};

export type StoredDocument = EntityRecord & {
  title: string;
  description?: string;
  category: DocumentCategory;
  status: DocumentStatus;
  ownerRole?: string;
  ownerId?: string;
  entityType?: string;
  entityId?: string;
  filename?: string;
  mimeType?: string;
  sizeBytes?: number;
  url?: string;
  currentVersion?: string;
  versions?: DocumentVersion[];
  expiresAt?: string;
  nextReviewAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  tags?: string[];
  relatedDocumentIds?: string[];
};

class DocumentRepository extends BaseRepository<StoredDocument> {
  constructor() {
    super(COLLECTION_PATHS.document, "document");
  }

  protected buildSearchKeywords(e: StoredDocument): string[] {
    return [
      e.title,
      e.description ?? "",
      e.category,
      e.status,
      e.ownerRole ?? "",
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async findByCategory(category: DocumentCategory): Promise<StoredDocument[]> {
    const r = await this.findAll({
      filters: [{ field: "category", operator: "eq", value: category }],
      perPage: 200,
    });
    return r.items;
  }

  async findByEntity(entityType: string, entityId: string): Promise<StoredDocument[]> {
    const r = await this.findAll({
      filters: [
        { field: "entityType", operator: "eq", value: entityType },
        { field: "entityId", operator: "eq", value: entityId },
      ],
      perPage: 200,
    });
    return r.items;
  }

  async getExpiring(days = 30): Promise<StoredDocument[]> {
    const cutoff = new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    const all = await this.listAll();
    return all.filter(
      (d) =>
        !d.deleted &&
        !d.archived &&
        d.status !== "expired" &&
        d.expiresAt &&
        d.expiresAt >= today &&
        d.expiresAt <= cutoff,
    );
  }

  async getDueForReview(days = 30): Promise<StoredDocument[]> {
    const cutoff = new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    const all = await this.listAll();
    return all.filter(
      (d) =>
        !d.deleted &&
        !d.archived &&
        d.nextReviewAt &&
        d.nextReviewAt >= today &&
        d.nextReviewAt <= cutoff,
    );
  }

  async getStats(): Promise<{
    total: number;
    approved: number;
    inReview: number;
    expiringSoon: number;
    byCategory: Partial<Record<DocumentCategory, number>>;
  }> {
    const [all, expiring] = await Promise.all([this.listAll(), this.getExpiring(30)]);
    const active = all.filter((d) => !d.deleted && !d.archived);

    const byCategory: Partial<Record<DocumentCategory, number>> = {};
    for (const d of active) {
      byCategory[d.category] = (byCategory[d.category] ?? 0) + 1;
    }

    return {
      total: active.length,
      approved: active.filter((d) => d.status === "approved").length,
      inReview: active.filter((d) => d.status === "in-review").length,
      expiringSoon: expiring.length,
      byCategory,
    };
  }
}

export const documentRepository = new DocumentRepository();
