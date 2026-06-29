/**
 * Core types for the enterprise persistence layer.
 *
 * Every stored entity extends EntityRecord. The repository layer
 * automatically manages all metadata fields — modules never set them directly.
 */

// ─── Base entity record ───────────────────────────────────────────────────────

export type EntityRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  version: number;
  archived: boolean;
  deleted: boolean;
  deletedAt?: string;
};

// ─── Query primitives ─────────────────────────────────────────────────────────

export type SortOrder = "asc" | "desc";

export type FilterOperator =
  | "eq"
  | "neq"
  | "contains"
  | "startsWith"
  | "in"
  | "gt"
  | "lt"
  | "gte"
  | "lte";

export type QueryFilter = {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | string[];
};

export type QueryOptions<SortField extends string = string> = {
  page?: number;
  perPage?: number;
  sort?: { field: SortField; order: SortOrder };
  filters?: QueryFilter[];
  search?: string;
  includeArchived?: boolean;
  includeDeleted?: boolean;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

// ─── Repository interface ─────────────────────────────────────────────────────

export interface IRepository<T extends EntityRecord> {
  findById(id: string): Promise<T | null>;
  findAll(options?: QueryOptions): Promise<PaginatedResult<T>>;
  create(data: Omit<T, keyof EntityRecord>, actor?: string): Promise<T>;
  update(id: string, data: Partial<Omit<T, keyof EntityRecord>>, actor?: string): Promise<T | null>;
  archive(id: string, actor?: string): Promise<T | null>;
  restore(id: string, actor?: string): Promise<T | null>;
  delete(id: string, actor?: string): Promise<boolean>;
  hardDelete(id: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  count(options?: Pick<QueryOptions, "filters" | "includeArchived" | "includeDeleted">): Promise<number>;
  search(query: string, options?: QueryOptions): Promise<PaginatedResult<T>>;
}

// ─── Attachment architecture ──────────────────────────────────────────────────

export type AttachmentType =
  | "document"
  | "image"
  | "spreadsheet"
  | "presentation"
  | "contract"
  | "proposal"
  | "other";

export type Attachment = {
  id: string;
  entityType: string;
  entityId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  type: AttachmentType;
  uploadedAt: string;
  uploadedBy: string;
  description?: string;
  url?: string;
};

// ─── Entity prefixes and collection paths ─────────────────────────────────────

export const ID_PREFIXES = {
  organization: "ORG",
  contact: "CNT",
  meeting: "MTG",
  opportunity: "OPP",
  proposal: "PROP",
  contract: "CTR",
  project: "PROJ",
  knowledge: "DOC",
  notification: "NTF",
  pastPerformance: "PP",
  teamingPartner: "TEAM",
  attachment: "ATT",
  task: "TASK",
  workflow: "WF",
  workflowInstance: "WFI",
  activity: "ACT",
  document: "DM",
  capture: "CAP",
  report: "RPT",
  // v1.3 additions
  userAccount: "USR",
  department: "DEPT",
  agency: "AGCY",
  contractVehicle: "CV",
  savedSearch: "SS",
  asset: "ASSET",
  calendarEvent: "CAL",
  invitation: "INV",
} as const;

export type EntityType = keyof typeof ID_PREFIXES;

export const COLLECTION_PATHS: Record<EntityType, string> = {
  organization: "crm/organizations",
  contact: "crm/contacts",
  meeting: "crm/meetings",
  opportunity: "opportunities",
  proposal: "proposals",
  contract: "contracts",
  project: "projects",
  knowledge: "knowledge",
  notification: "notifications",
  pastPerformance: "past-performance",
  teamingPartner: "teaming-partners",
  attachment: "attachments",
  task: "tasks",
  workflow: "workflows/definitions",
  workflowInstance: "workflows/instances",
  activity: "activity",
  document: "documents",
  capture: "capture",
  report: "reports",
  // v1.3 additions
  userAccount: "iam/users",
  department: "iam/departments",
  agency: "gov/agencies",
  contractVehicle: "gov/contract-vehicles",
  savedSearch: "search/saved",
  asset: "assets",
  calendarEvent: "calendar",
  invitation: "iam/invitations",
};

// ─── Search index ─────────────────────────────────────────────────────────────

export type SearchIndexEntry = {
  id: string;
  entityType: EntityType;
  title: string;
  keywords: string[];
  updatedAt: string;
};

// ─── Notification types ───────────────────────────────────────────────────────

export type NotificationPriority = "low" | "normal" | "high" | "urgent";
export type NotificationStatus = "unread" | "read" | "dismissed" | "archived";
export type NotificationCategory =
  | "crm"
  | "opportunity"
  | "proposal"
  | "project"
  | "contract"
  | "knowledge"
  | "system";

export type InAppNotification = EntityRecord & {
  category: NotificationCategory;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  body: string;
  entityType?: EntityType;
  entityId?: string;
  actionLabel?: string;
  actionHref?: string;
  readAt?: string;
};
