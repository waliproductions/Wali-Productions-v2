/**
 * Integration Service interface.
 *
 * Defines the contract for managing third-party integration adapters.
 * The service layer handles integration lifecycle, health monitoring,
 * sync orchestration, and event recording without any vendor-specific
 * imports. Concrete adapters are registered at startup and resolved by
 * provider type.
 */

import type {
  IntegrationAdapter,
  IntegrationEvent,
  IntegrationHealthCheck,
  IntegrationProviderType,
  IntegrationStatus,
  IntegrationSyncLog,
  WebhookEvent,
} from "@/types";
import type { ServiceResult, PaginatedResult, QueryParams } from "./index";

export type IntegrationConfigInput = {
  providerType: IntegrationProviderType;
  configuredBy: string;
  config: Record<string, unknown>;
};

export type SyncTriggerInput = {
  integrationId: string;
  entityType?: string;
  force?: boolean;
  triggeredBy: string;
};

export type IntegrationStats = {
  totalAdapters: number;
  activeAdapters: number;
  errorAdapters: number;
  totalSyncsToday: number;
  failedSyncsToday: number;
  webhooksReceivedToday: number;
  byCategory: Record<string, { total: number; active: number }>;
};

export interface IIntegrationService {
  // Adapter registry
  listAdapters(params?: QueryParams & { category?: string; status?: IntegrationStatus }): Promise<ServiceResult<PaginatedResult<IntegrationAdapter>>>;
  getAdapter(id: string): Promise<ServiceResult<IntegrationAdapter>>;
  getAdapterByProvider(providerType: IntegrationProviderType): Promise<ServiceResult<IntegrationAdapter>>;

  // Configuration
  configureAdapter(input: IntegrationConfigInput): Promise<ServiceResult<IntegrationAdapter>>;
  updateAdapterStatus(id: string, status: IntegrationStatus): Promise<ServiceResult<IntegrationAdapter>>;
  removeAdapter(id: string, performedBy: string): Promise<ServiceResult<void>>;

  // Health checks
  runHealthCheck(id: string): Promise<ServiceResult<IntegrationHealthCheck>>;
  runAllHealthChecks(): Promise<ServiceResult<Record<string, IntegrationHealthCheck>>>;

  // Sync
  triggerSync(input: SyncTriggerInput): Promise<ServiceResult<IntegrationSyncLog>>;
  listSyncLogs(integrationId: string, params?: QueryParams): Promise<ServiceResult<PaginatedResult<IntegrationSyncLog>>>;
  getSyncLog(id: string): Promise<ServiceResult<IntegrationSyncLog>>;

  // Events
  listEvents(integrationId: string, params?: QueryParams): Promise<ServiceResult<PaginatedResult<IntegrationEvent>>>;
  recordEvent(event: Omit<IntegrationEvent, "id" | "occurredAt">): Promise<ServiceResult<IntegrationEvent>>;

  // Inbound webhooks
  handleInboundWebhook(providerType: IntegrationProviderType, payload: unknown, signature: string | null): Promise<ServiceResult<WebhookEvent | null>>;

  // Stats
  getStats(): Promise<ServiceResult<IntegrationStats>>;
}
