/**
 * Document Intelligence platform types.
 *
 * Covers document templates with typed variable placeholders, document
 * relationship graphs, semantic search preparation (chunking for RAG),
 * approval history chains, version comparison metadata, and archival
 * policies. This is the type layer for a future unified document store.
 */

// ─── Document Templates ───────────────────────────────────────────────────────

export type DocumentTemplateType =
  | "proposal-section"
  | "proposal-cover"
  | "statement-of-work"
  | "contract-clause"
  | "contract-exhibit"
  | "cover-letter"
  | "executive-summary"
  | "capability-statement"
  | "past-performance"
  | "management-approach"
  | "technical-approach"
  | "staffing-plan"
  | "transition-plan"
  | "quality-plan"
  | "nda"
  | "teaming-agreement"
  | "mou"
  | "meeting-agenda"
  | "meeting-minutes"
  | "status-report"
  | "closeout-report"
  | "lessons-learned-template"
  | "custom";

export type TemplateVariableDataType = "text" | "rich-text" | "date" | "number" | "currency" | "boolean" | "list" | "reference";

export type DocumentTemplateVariable = {
  key: string;
  label: string;
  dataType: TemplateVariableDataType;
  required: boolean;
  defaultValue: string | null;
  description: string;
  validationPattern: string | null;
  referenceEntityType: string | null;
};

export type DocumentTemplate = {
  id: string;
  type: DocumentTemplateType;
  name: string;
  description: string;
  version: string;
  isActive: boolean;
  variables: DocumentTemplateVariable[];
  bodyMarkdown: string;
  instructionNotes: string | null;
  relatedProposalIds: string[];
  usageCount: number;
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

// ─── Document Relationships ───────────────────────────────────────────────────

export type DocumentRelationshipType =
  | "supersedes"
  | "is-superseded-by"
  | "derived-from"
  | "references"
  | "is-referenced-by"
  | "attachment"
  | "exhibit"
  | "amendment"
  | "related";

export type DocumentRelationship = {
  id: string;
  sourceDocumentId: string;
  sourceDocumentType: string;
  targetDocumentId: string;
  targetDocumentType: string;
  relationshipType: DocumentRelationshipType;
  description: string | null;
  createdAt: string;
  createdBy: string;
};

// ─── Version Comparison ───────────────────────────────────────────────────────

export type DiffChangeType = "added" | "removed" | "modified" | "moved";

export type DiffChunk = {
  changeType: DiffChangeType;
  lineStart: number;
  lineEnd: number;
  beforeText: string | null;
  afterText: string | null;
};

export type VersionComparison = {
  id: string;
  documentId: string;
  versionA: string;
  versionB: string;
  generatedAt: string;
  totalChanges: number;
  additions: number;
  deletions: number;
  modifications: number;
  chunks: DiffChunk[];
  summary: string | null;
};

// ─── Approval History ─────────────────────────────────────────────────────────

export type DocumentApprovalAction = "submitted" | "approved" | "rejected" | "revision-requested" | "withdrawn" | "superseded";

export type DocumentApprovalHistoryEntry = {
  id: string;
  documentId: string;
  documentVersion: string;
  action: DocumentApprovalAction;
  performedBy: string;
  performedAt: string;
  comments: string | null;
  nextReviewerId: string | null;
};

// ─── Archival Policies ────────────────────────────────────────────────────────

export type ArchivalTrigger = "age" | "status-change" | "superseded" | "manual" | "contract-closeout";

export type RetentionPeriod = {
  years: number;
  months: number;
  reason: string;
};

export type ArchivalPolicy = {
  id: string;
  name: string;
  documentTypes: string[];
  trigger: ArchivalTrigger;
  triggerCondition: string | null;
  retentionPeriod: RetentionPeriod;
  deleteAfterRetention: boolean;
  requiresApprovalToDelete: boolean;
  legalHoldOverride: boolean;
  notifyBeforeDays: number;
  createdAt: string;
};

// ─── Semantic Search Preparation ──────────────────────────────────────────────

export type ChunkingStrategy = "paragraph" | "sentence" | "fixed-size" | "section-header" | "semantic";

export type SemanticChunk = {
  id: string;
  documentId: string;
  documentType: string;
  chunkIndex: number;
  text: string;
  startCharOffset: number;
  endCharOffset: number;
  sectionTitle: string | null;
  chunkingStrategy: ChunkingStrategy;
  tokenCount: number;
  embeddingModel: string | null;
  embeddingDimensions: number | null;
  embeddedAt: string | null;
  metadata: Record<string, string>;
};

export type DocumentSearchIndex = {
  documentId: string;
  documentType: string;
  title: string;
  description: string | null;
  fullTextSnippet: string;
  tags: string[];
  entityRefs: { type: string; id: string }[];
  isIndexed: boolean;
  indexedAt: string | null;
  chunkCount: number;
};
