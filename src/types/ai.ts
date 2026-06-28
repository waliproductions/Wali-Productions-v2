/**
 * AI readiness types — extension points for future AI integration.
 *
 * These types define the interfaces and audit structures that future
 * AI capabilities will use. Designed to avoid vendor lock-in:
 * the provider field allows swapping between OpenAI, Anthropic, Azure,
 * or on-premise models without changing downstream types.
 *
 * Planned capabilities: proposal drafting, contract summarization,
 * document search, CRM insights, meeting summaries, workflow automation,
 * knowledge retrieval.
 */

export type AiProvider = "anthropic" | "openai" | "azure" | "google" | "on-premise" | "unknown";

export type AiCapabilityType =
  | "proposal-drafting"
  | "proposal-review"
  | "contract-summarization"
  | "document-search"
  | "document-classification"
  | "crm-insights"
  | "meeting-summary"
  | "business-recommendation"
  | "workflow-automation"
  | "knowledge-retrieval"
  | "compliance-check"
  | "competitive-analysis"
  | "pricing-guidance";

export type AiIntegrationStatus =
  | "planned"
  | "prototyping"
  | "beta"
  | "active"
  | "deprecated";

export type AiIntegrationPoint = {
  id: string;
  capability: AiCapabilityType;
  status: AiIntegrationStatus;
  description: string;
  inputEntityTypes: string[];
  outputEntityTypes: string[];
  preferredProvider?: AiProvider;
  contextWindowTokens?: number;
  estimatedLatencyMs?: number;
  requiresHumanReview?: boolean;
  notes?: string;
};

export type AiRequestStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

/** Audit trail for AI-assisted actions. Enables review and rollback. */
export type AiRequestRecord = {
  id: string;
  capability: AiCapabilityType;
  provider: AiProvider;
  status: AiRequestStatus;
  entityType?: string;
  entityId?: string;
  promptTokens?: number;
  completionTokens?: number;
  requestedBy?: string;
  requestedAt: string;
  completedAt?: string;
  resultApplied?: boolean;
  resultReviewedBy?: string;
  resultReviewedAt?: string;
  humanOverrideApplied?: boolean;
};

export type AiKnowledgeChunk = {
  id: string;
  sourceType: "document" | "sop" | "policy" | "proposal-section" | "past-performance";
  sourceId: string;
  content: string;
  embeddingModel?: string;
  embeddedAt?: string;
  tokenCount?: number;
  tags?: string[];
};
