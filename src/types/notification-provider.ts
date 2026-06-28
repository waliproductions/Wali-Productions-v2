/**
 * Notification provider and channel types.
 *
 * Defines the provider-agnostic notification architecture. Channels are
 * interchangeable — swapping from SMTP to SendGrid, or adding Slack without
 * touching notification-sending logic. Each provider type has its own config
 * shape; the NotificationAdapter pattern keeps core logic isolated.
 */

// ─── Channels & Providers ─────────────────────────────────────────────────────

export type DeliveryChannel =
  | "email"
  | "in-app"
  | "sms"
  | "slack"
  | "teams"
  | "webhook";

export type NotificationProviderType =
  | "smtp"
  | "sendgrid"
  | "mailgun"
  | "aws-ses"
  | "twilio"
  | "vonage"
  | "slack-webhook"
  | "teams-webhook"
  | "custom-webhook";

export type NotificationProviderStatus = "active" | "inactive" | "error" | "not-configured";

export type NotificationProvider = {
  id: string;
  channel: DeliveryChannel;
  providerType: NotificationProviderType;
  name: string;
  status: NotificationProviderStatus;
  isPrimary: boolean;
  configuredAt: string;
  lastSuccessAt: string | null;
  lastErrorAt: string | null;
  lastError: string | null;
};

// ─── Provider Configs ─────────────────────────────────────────────────────────

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  authUser: string;
  fromName: string;
  fromEmail: string;
  replyTo: string | null;
};

export type SendGridConfig = {
  apiKeyRef: string;
  fromName: string;
  fromEmail: string;
  replyTo: string | null;
  sendingDomain: string;
};

export type TwilioConfig = {
  accountSidRef: string;
  authTokenRef: string;
  fromPhoneNumber: string;
  messagingServiceSid: string | null;
};

export type SlackWebhookConfig = {
  webhookUrlRef: string;
  defaultChannel: string;
  botName: string;
  iconEmoji: string | null;
};

export type TeamsWebhookConfig = {
  webhookUrlRef: string;
  defaultThemeColor: string;
};

export type CustomWebhookConfig = {
  url: string;
  method: "GET" | "POST" | "PUT";
  headers: Record<string, string>;
  secretRef: string | null;
  signatureHeader: string | null;
  retryCount: number;
  timeoutMs: number;
};

// ─── Notification Templates ───────────────────────────────────────────────────

export type TemplateVariableType = "string" | "number" | "boolean" | "date" | "url";

export type TemplateVariable = {
  name: string;
  type: TemplateVariableType;
  required: boolean;
  defaultValue: string | null;
  description: string;
};

export type NotificationTemplate = {
  id: string;
  slug: string;
  name: string;
  description: string;
  channels: DeliveryChannel[];
  variables: TemplateVariable[];
  emailSubject: string | null;
  emailBodyHtml: string | null;
  emailBodyText: string | null;
  inAppTitle: string | null;
  inAppBody: string | null;
  smsBody: string | null;
  slackText: string | null;
  teamsText: string | null;
  webhookPayloadSchema: string | null;
  createdAt: string;
  updatedAt: string;
};

// ─── Notification Preferences ─────────────────────────────────────────────────

export type NotificationPreference = {
  userId: string;
  templateSlug: string;
  emailEnabled: boolean;
  inAppEnabled: boolean;
  smsEnabled: boolean;
  slackEnabled: boolean;
  teamsEnabled: boolean;
  frequency: "immediate" | "daily-digest" | "weekly-digest" | "disabled";
  updatedAt: string;
};

// ─── Notification Queue & Delivery ───────────────────────────────────────────

export type NotificationPriority = "low" | "normal" | "high" | "urgent";

export type NotificationStatus =
  | "queued"
  | "sending"
  | "delivered"
  | "failed"
  | "bounced"
  | "cancelled";

export type NotificationQueueEntry = {
  id: string;
  templateSlug: string;
  channel: DeliveryChannel;
  recipientUserId: string | null;
  recipientAddress: string;
  priority: NotificationPriority;
  variables: Record<string, string>;
  scheduledAt: string | null;
  queuedAt: string;
  status: NotificationStatus;
  providerId: string;
};

export type NotificationDeliveryRecord = {
  id: string;
  queueEntryId: string;
  channel: DeliveryChannel;
  providerId: string;
  recipientAddress: string;
  status: NotificationStatus;
  attemptCount: number;
  lastAttemptAt: string | null;
  deliveredAt: string | null;
  providerMessageId: string | null;
  errorMessage: string | null;
};

// ─── Webhook Events ───────────────────────────────────────────────────────────

export type WebhookEventType =
  | "contact.submitted"
  | "proposal.created"
  | "proposal.submitted"
  | "proposal.approved"
  | "proposal.rejected"
  | "contract.awarded"
  | "contract.modified"
  | "invoice.issued"
  | "invoice.paid"
  | "project.started"
  | "project.milestone-completed"
  | "project.completed"
  | "user.invited"
  | "user.registered"
  | "document.approved";

export type WebhookEvent = {
  id: string;
  type: WebhookEventType;
  payload: Record<string, unknown>;
  occurredAt: string;
  deliveredTo: string[];
  failedTo: string[];
};
