/**
 * Notification Service interface.
 *
 * Defines the contract for sending, templating, and delivering notifications
 * across all channels. Providers are interchangeable — the service interface
 * never references a specific vendor. Concrete implementations handle SMTP,
 * Slack, Teams, SMS, and webhook delivery independently.
 */

import type {
  DeliveryChannel,
  NotificationDeliveryRecord,
  NotificationPreference,
  NotificationProvider,
  NotificationQueueEntry,
  NotificationStatus,
  NotificationTemplate,
  WebhookEvent,
  WebhookEventType,
} from "@/types";
import type { ServiceResult, PaginatedResult, QueryParams } from "./index";

export type SendNotificationInput = {
  templateSlug: string;
  channel: DeliveryChannel;
  recipientUserId: string | null;
  recipientAddress: string;
  variables: Record<string, string>;
  priority?: NotificationQueueEntry["priority"];
  scheduledAt?: string;
};

export type BroadcastNotificationInput = {
  templateSlug: string;
  channels: DeliveryChannel[];
  recipientUserIds: string[];
  variables: Record<string, string>;
  priority?: NotificationQueueEntry["priority"];
};

export type NotificationStats = {
  totalQueued: number;
  totalDelivered: number;
  totalFailed: number;
  deliveryRateByChannel: Record<DeliveryChannel, number>;
  activeProviders: number;
  pendingQueue: number;
};

export interface INotificationService {
  // Providers
  listProviders(): Promise<ServiceResult<NotificationProvider[]>>;
  getProvider(id: string): Promise<ServiceResult<NotificationProvider>>;
  updateProviderStatus(id: string, status: NotificationProvider["status"]): Promise<ServiceResult<NotificationProvider>>;

  // Templates
  listTemplates(params?: QueryParams): Promise<ServiceResult<PaginatedResult<NotificationTemplate>>>;
  getTemplate(id: string): Promise<ServiceResult<NotificationTemplate>>;
  getTemplateBySlug(slug: string): Promise<ServiceResult<NotificationTemplate>>;
  createTemplate(template: Omit<NotificationTemplate, "id" | "createdAt" | "updatedAt">): Promise<ServiceResult<NotificationTemplate>>;
  updateTemplate(id: string, updates: Partial<NotificationTemplate>): Promise<ServiceResult<NotificationTemplate>>;
  deleteTemplate(id: string): Promise<ServiceResult<void>>;

  // Preferences
  getPreferences(userId: string): Promise<ServiceResult<NotificationPreference[]>>;
  updatePreference(preference: NotificationPreference): Promise<ServiceResult<NotificationPreference>>;
  resetPreferences(userId: string): Promise<ServiceResult<void>>;

  // Sending
  send(input: SendNotificationInput): Promise<ServiceResult<NotificationQueueEntry>>;
  broadcast(input: BroadcastNotificationInput): Promise<ServiceResult<{ queued: number; failed: number }>>;

  // Queue management
  listQueue(params?: QueryParams & { status?: NotificationStatus }): Promise<ServiceResult<PaginatedResult<NotificationQueueEntry>>>;
  retryFailed(queueEntryId: string): Promise<ServiceResult<NotificationQueueEntry>>;
  cancelQueued(queueEntryId: string): Promise<ServiceResult<void>>;

  // Delivery records
  listDeliveryRecords(params?: QueryParams): Promise<ServiceResult<PaginatedResult<NotificationDeliveryRecord>>>;
  getDeliveryRecord(id: string): Promise<ServiceResult<NotificationDeliveryRecord>>;

  // Webhooks
  dispatchWebhookEvent(event: Omit<WebhookEvent, "id" | "occurredAt" | "deliveredTo" | "failedTo">): Promise<ServiceResult<WebhookEvent>>;
  listWebhookEvents(eventType?: WebhookEventType, params?: QueryParams): Promise<ServiceResult<PaginatedResult<WebhookEvent>>>;

  // Stats
  getStats(): Promise<ServiceResult<NotificationStats>>;
}
