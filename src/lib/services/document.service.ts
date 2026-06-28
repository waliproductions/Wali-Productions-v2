/**
 * Document Intelligence Service interface.
 *
 * Defines the contract for document template management, version comparison,
 * approval workflows, archival operations, and semantic search preparation.
 * The underlying storage (filesystem, S3, SharePoint, Google Drive) is
 * abstracted — calling code never references a specific store.
 */

import type {
  ArchivalPolicy,
  DocumentApprovalHistoryEntry,
  DocumentRelationship,
  DocumentSearchIndex,
  DocumentTemplate,
  DocumentTemplateType,
  SemanticChunk,
  VersionComparison,
} from "@/types";
import type { ServiceResult, PaginatedResult, QueryParams } from "./index";

export type DocumentSearchQuery = {
  query: string;
  documentTypes?: string[];
  tags?: string[];
  entityType?: string;
  entityId?: string;
  limit?: number;
  semanticSearch?: boolean;
};

export type DocumentSearchResult = {
  documentId: string;
  documentType: string;
  title: string;
  snippet: string;
  score: number;
  tags: string[];
};

export type TemplateRenderInput = {
  templateId: string;
  variables: Record<string, string>;
  outputFormat: "markdown" | "html" | "plain-text";
};

export type DocumentStats = {
  totalTemplates: number;
  activeTemplates: number;
  templatesByType: Record<DocumentTemplateType, number>;
  totalVersionComparisons: number;
  pendingApprovals: number;
  indexedDocuments: number;
  semanticChunks: number;
};

export interface IDocumentService {
  // Templates
  listTemplates(params?: QueryParams & { type?: DocumentTemplateType; isActive?: boolean }): Promise<ServiceResult<PaginatedResult<DocumentTemplate>>>;
  getTemplate(id: string): Promise<ServiceResult<DocumentTemplate>>;
  createTemplate(template: Omit<DocumentTemplate, "id" | "usageCount" | "createdAt" | "updatedAt" | "archivedAt">): Promise<ServiceResult<DocumentTemplate>>;
  updateTemplate(id: string, updates: Partial<DocumentTemplate>): Promise<ServiceResult<DocumentTemplate>>;
  archiveTemplate(id: string, performedBy: string): Promise<ServiceResult<void>>;
  renderTemplate(input: TemplateRenderInput): Promise<ServiceResult<{ content: string; format: string }>>;

  // Document Relationships
  listRelationships(documentId: string): Promise<ServiceResult<DocumentRelationship[]>>;
  createRelationship(relationship: Omit<DocumentRelationship, "id" | "createdAt">): Promise<ServiceResult<DocumentRelationship>>;
  deleteRelationship(id: string): Promise<ServiceResult<void>>;

  // Version Comparison
  compareVersions(documentId: string, versionA: string, versionB: string): Promise<ServiceResult<VersionComparison>>;
  listVersionComparisons(documentId: string): Promise<ServiceResult<VersionComparison[]>>;

  // Approval History
  getApprovalHistory(documentId: string): Promise<ServiceResult<DocumentApprovalHistoryEntry[]>>;
  recordApprovalAction(entry: Omit<DocumentApprovalHistoryEntry, "id">): Promise<ServiceResult<DocumentApprovalHistoryEntry>>;

  // Archival
  listArchivalPolicies(): Promise<ServiceResult<ArchivalPolicy[]>>;
  getArchivalPolicy(id: string): Promise<ServiceResult<ArchivalPolicy>>;
  createArchivalPolicy(policy: Omit<ArchivalPolicy, "id" | "createdAt">): Promise<ServiceResult<ArchivalPolicy>>;
  updateArchivalPolicy(id: string, updates: Partial<ArchivalPolicy>): Promise<ServiceResult<ArchivalPolicy>>;

  // Search
  indexDocument(index: Omit<DocumentSearchIndex, "isIndexed" | "indexedAt">): Promise<ServiceResult<DocumentSearchIndex>>;
  search(query: DocumentSearchQuery): Promise<ServiceResult<DocumentSearchResult[]>>;
  getSearchIndex(documentId: string): Promise<ServiceResult<DocumentSearchIndex>>;

  // Semantic / RAG
  createChunks(documentId: string, documentType: string, text: string, strategy: SemanticChunk["chunkingStrategy"]): Promise<ServiceResult<SemanticChunk[]>>;
  listChunks(documentId: string): Promise<ServiceResult<SemanticChunk[]>>;
  updateChunkEmbedding(chunkId: string, embeddingModel: string, dimensions: number): Promise<ServiceResult<SemanticChunk>>;

  // Stats
  getStats(): Promise<ServiceResult<DocumentStats>>;
}
