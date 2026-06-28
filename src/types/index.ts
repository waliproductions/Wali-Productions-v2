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
