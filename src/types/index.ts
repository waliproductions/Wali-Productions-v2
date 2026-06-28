/**
 * Shared TypeScript types for the Wali Productions platform.
 *
 * Config-specific types (ServiceCard, PortfolioProject, GovernmentContent, etc.)
 * remain co-located with their config file for cohesion. This module exports
 * cross-cutting business types that span multiple features and surfaces.
 */

// Utility types
export type Cta = {
  label: string;
  href: string;
};

export type CodeEntry = {
  code: string;
  title: string;
  description?: string;
  primary?: boolean;
};

export type VerificationStatus = "verified" | "pending" | "in-preparation";

export type LabeledValue = {
  label: string;
  value: string;
};

// Business domain types
export type { Client, ClientContact, ClientStatus, ClientType, ContactRole } from "./client";
export type {
  Project,
  ProjectStatus,
  ProjectHealth,
  Milestone,
  MilestoneStatus,
  Deliverable,
  DeliverableStatus,
  TeamMember,
  TeamRole,
  ProjectDocument,
} from "./project";
export type {
  Proposal,
  ProposalStatus,
  ProposalType,
  ProposalSection,
  ProposalLineItem,
  ProposalMilestone,
  ProposalRevision,
  PricingStrategy,
} from "./proposal";
export type {
  NaicsCode,
  PscCode,
  Certification,
  CertificationStatus,
  ContractVehicle,
  ContractVehicleType,
  PastPerformanceRecord,
  TeamQualification,
  CapabilityStatementSnapshot,
  ClearanceLevel,
} from "./government";
export type {
  Risk,
  RiskProbability,
  RiskImpact,
  RiskStatus,
  ProjectIssue,
  IssueSeverity,
  IssueStatus,
  ChangeRequest,
  ChangeRequestStatus,
  WBSNode,
  LessonsLearnedRecord,
  CustomerApproval,
} from "./project";
export type { UserRole, Permission, SystemPermissions } from "./roles";
export { ROLE_PERMISSIONS } from "./roles";
export type {
  Task,
  TaskPriority,
  TaskStatus,
  TaskCategory,
  Notification,
  NotificationType,
  NotificationChannel,
  BusinessMetric,
  MetricPeriod,
  MetricTrend,
  PipelineEntry,
  PipelineStage,
} from "./operations";
export type {
  GovOpportunity,
  OpportunityStatus,
  SetAsideCategory,
  CaptureStage,
  Solicitation,
  SolicitationType,
  SolicitationAmendment,
  TeamingPartner,
  TeamingRole,
  AgencyContact,
  AgencyContactRole,
} from "./opportunity";
export type {
  KnowledgeEntry,
  KnowledgeCategory,
  KnowledgeStatus,
  SopEntry,
  SopStep,
  PolicyRecord,
  EnforcementLevel,
  DocumentRecord,
  DocumentVersion,
} from "./knowledge";
export type {
  Organization,
  OrganizationStatus,
  OrganizationSize,
  OrganizationSector,
  CrmContact,
  CrmContactRole,
  Meeting,
  MeetingType,
  MeetingStatus,
  CommunicationRecord,
  CommunicationChannel,
  SalesPipelineEntry,
  SalesPipelineStage,
  CrmActivity,
  CrmActivityType,
} from "./crm";
export type {
  Contract,
  ContractStatus,
  ContractType,
  ContractVehicleCategory,
  TaskOrder,
  ContractMilestone,
  ContractDeliverable,
  ContractModification,
  ContractModificationType,
  InvoiceRecord,
  InvoiceStatus,
  InvoiceLineItem,
  OptionYear,
  OptionYearStatus,
  PerformanceReport,
  PerformanceRating,
  ReportingRequirement,
  DeliverableFrequency,
} from "./contract";
export type {
  SectionTemplate,
  SectionTemplateCategory,
  ProposalVolume,
  ProposalVolumeType,
  ProposalVolumeSection,
  StaffingEntry,
  ProposalGraphic,
  ComplianceMatrix,
  ComplianceItem,
  ComplianceStatus,
  ProposalReview,
  ReviewType,
  ReviewStatus,
  ReviewComment,
  ProposalApproval,
  ApprovalStatus,
} from "./proposal-workspace";
export type {
  WorkflowDefinition,
  WorkflowStatus,
  WorkflowStep,
  WorkflowStepType,
  WorkflowStepCondition,
  WorkflowTriggerEvent,
  WorkflowInstance,
  WorkflowInstanceStatus,
  WorkflowInstanceStep,
  WorkflowStepStatus,
} from "./workflow";
export type {
  DashboardWidget,
  DashboardLayout,
  WidgetType,
  WidgetSize,
  WidgetRefreshInterval,
  MetricWidgetConfig,
  ChartWidgetConfig,
  TableWidgetConfig,
  ReportConfig,
  ReportDomain,
} from "./dashboard";
export type {
  AiProvider,
  AiCapabilityType,
  AiIntegrationStatus,
  AiIntegrationPoint,
  AiRequestRecord,
  AiRequestStatus,
  AiKnowledgeChunk,
} from "./ai";
// v0.9 — Enterprise Readiness
export type {
  AccountStatus,
  AuthProvider,
  UserAccount,
  MfaMethod,
  MfaConfig,
  SessionRecord,
  PasswordResetToken,
  PasswordPolicy,
  AccountLockout,
  LockoutPolicy,
  LoginOutcome,
  LoginAuditEvent,
  PermissionGroup,
  UserPermissionAssignment,
} from "./identity";
export type {
  UserProfile,
  EmploymentType,
  EmployeeStatus,
  EmployeeAccount,
  ContractorStatus,
  ContractorAccount,
  ClientPortalRole,
  ClientAccountAccess,
  GovContactRole,
  GovContact,
  MembershipStatus,
  OrgMembership,
  InvitationStatus,
  InvitationAccountType,
  InvitationRecord,
  AccountLifecycleEventType,
  AccountLifecycleEvent,
} from "./user-management";
export type {
  SecuritySeverity,
  SecurityEventType,
  SecurityEvent,
  RateLimitStrategy,
  RateLimitScope,
  RateLimitPolicy,
  CsrfStrategy,
  CsrfConfig,
  ContentSecurityPolicyDirective,
  SecureHeadersConfig,
  ValidationRuleType,
  ValidationRule,
  ValidationSchema,
  SecurityAlertStatus,
  SecurityAlert,
  SecretRotationPolicy,
  SecurityConfig,
  AuditAction,
  AuditRecord,
} from "./security";
export type {
  DeliveryChannel,
  NotificationProviderType,
  NotificationProviderStatus,
  NotificationProvider,
  SmtpConfig,
  SendGridConfig,
  TwilioConfig,
  SlackWebhookConfig,
  TeamsWebhookConfig,
  CustomWebhookConfig,
  TemplateVariableType,
  TemplateVariable,
  NotificationTemplate,
  NotificationPreference,
  NotificationPriority,
  NotificationStatus,
  NotificationQueueEntry,
  NotificationDeliveryRecord,
  WebhookEventType,
  WebhookEvent,
} from "./notification-provider";
export type {
  IntegrationCategory,
  IntegrationProviderType,
  IntegrationStatus,
  IntegrationHealthStatus,
  IntegrationHealthCheck,
  IntegrationSyncDirection,
  IntegrationSyncLog,
  IntegrationAdapter,
  Microsoft365Config,
  GoogleWorkspaceConfig,
  SamGovConfig,
  QuickBooksConfig,
  DocuSignConfig,
  StripeConfig,
  AnthropicConfig,
  IntegrationEventType,
  IntegrationEvent,
} from "./integration";
export type {
  DocumentTemplateType,
  TemplateVariableDataType,
  DocumentTemplateVariable,
  DocumentTemplate,
  DocumentRelationshipType,
  DocumentRelationship,
  DiffChangeType,
  DiffChunk,
  VersionComparison,
  DocumentApprovalAction,
  DocumentApprovalHistoryEntry,
  ArchivalTrigger,
  RetentionPeriod,
  ArchivalPolicy,
  ChunkingStrategy,
  SemanticChunk,
  DocumentSearchIndex,
} from "./document-platform";
