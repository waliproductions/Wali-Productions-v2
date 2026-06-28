/**
 * Integration layer types.
 *
 * Defines provider-agnostic integration boundaries. Integrations are
 * implemented as adapters — the core platform never imports a vendor SDK
 * directly. Swapping from QuickBooks to Xero, or HubSpot to Salesforce,
 * requires only a new adapter implementation, not changes to calling code.
 */

// ─── Provider Registry ────────────────────────────────────────────────────────

export type IntegrationCategory =
  | "identity"
  | "productivity"
  | "government"
  | "crm"
  | "accounting"
  | "storage"
  | "calendar"
  | "esign"
  | "payment"
  | "ai"
  | "communication"
  | "analytics";

export type IntegrationProviderType =
  // Identity & Productivity
  | "microsoft-365"
  | "google-workspace"
  | "okta"
  | "auth0"
  // Government
  | "sam-gov"
  | "sba-connect"
  | "govwin-iq"
  | "fpds"
  | "beta-sam"
  // CRM
  | "hubspot"
  | "salesforce"
  | "pipedrive"
  // Accounting
  | "quickbooks"
  | "xero"
  | "freshbooks"
  // Storage
  | "sharepoint"
  | "google-drive"
  | "aws-s3"
  | "dropbox"
  // Calendar
  | "google-calendar"
  | "outlook-calendar"
  | "ical"
  // E-Sign
  | "docusign"
  | "adobe-sign"
  | "pandadoc"
  // Payment
  | "stripe"
  | "paypal"
  | "square"
  // AI
  | "anthropic"
  | "openai"
  | "azure-openai"
  | "google-vertex"
  // Communication
  | "slack"
  | "microsoft-teams"
  | "sendgrid"
  | "twilio"
  // Analytics
  | "google-analytics"
  | "mixpanel"
  | "posthog";

export type IntegrationStatus =
  | "not-configured"
  | "configured"
  | "active"
  | "degraded"
  | "error"
  | "disabled"
  | "deprecated";

// ─── Integration Record ───────────────────────────────────────────────────────

export type IntegrationHealthStatus = "healthy" | "degraded" | "unreachable" | "unknown";

export type IntegrationHealthCheck = {
  checkedAt: string;
  status: IntegrationHealthStatus;
  latencyMs: number | null;
  errorMessage: string | null;
};

export type IntegrationSyncDirection = "inbound" | "outbound" | "bidirectional";

export type IntegrationSyncLog = {
  id: string;
  integrationId: string;
  direction: IntegrationSyncDirection;
  entityType: string;
  recordsProcessed: number;
  recordsFailed: number;
  startedAt: string;
  completedAt: string | null;
  error: string | null;
};

export type IntegrationAdapter = {
  id: string;
  providerType: IntegrationProviderType;
  category: IntegrationCategory;
  name: string;
  description: string;
  status: IntegrationStatus;
  configuredAt: string | null;
  configuredBy: string | null;
  lastHealthCheck: IntegrationHealthCheck | null;
  syncEnabled: boolean;
  syncIntervalMinutes: number | null;
  lastSyncAt: string | null;
  webhookUrl: string | null;
  scopes: string[];
};

// ─── Provider-Specific Configs ────────────────────────────────────────────────

export type Microsoft365Config = {
  tenantId: string;
  clientIdRef: string;
  clientSecretRef: string;
  scopes: string[];
  sharepointSiteUrl: string | null;
  teamsWebhookUrlRef: string | null;
};

export type GoogleWorkspaceConfig = {
  clientIdRef: string;
  clientSecretRef: string;
  serviceAccountKeyRef: string | null;
  domain: string;
  scopes: string[];
  sharedDriveId: string | null;
};

export type SamGovConfig = {
  apiKeyRef: string;
  entityId: string | null;
  naicsCodes: string[];
  searchRadiusMiles: number;
  autoImportOpportunities: boolean;
  importFilters: {
    setAsideTypes: string[];
    awardTypes: string[];
    agencies: string[];
  };
};

export type QuickBooksConfig = {
  clientIdRef: string;
  clientSecretRef: string;
  realmId: string | null;
  environment: "sandbox" | "production";
  syncInvoices: boolean;
  syncExpenses: boolean;
  defaultIncomeAccountId: string | null;
};

export type DocuSignConfig = {
  accountIdRef: string;
  integrationKeyRef: string;
  userIdRef: string;
  basePath: string;
  defaultSignerRole: string;
  envelopeExpirationDays: number;
};

export type StripeConfig = {
  publishableKeyRef: string;
  secretKeyRef: string;
  webhookSecretRef: string;
  defaultCurrency: string;
  invoicePrefix: string | null;
};

export type AnthropicConfig = {
  apiKeyRef: string;
  defaultModel: string;
  maxTokens: number;
  temperature: number;
  systemPromptRef: string | null;
  allowedCapabilities: string[];
};

// ─── Integration Events ───────────────────────────────────────────────────────

export type IntegrationEventType =
  | "sync-started"
  | "sync-completed"
  | "sync-failed"
  | "webhook-received"
  | "webhook-sent"
  | "auth-refreshed"
  | "config-updated"
  | "health-check-failed"
  | "rate-limited"
  | "connection-restored";

export type IntegrationEvent = {
  id: string;
  integrationId: string;
  eventType: IntegrationEventType;
  description: string;
  metadata: Record<string, string>;
  occurredAt: string;
};
