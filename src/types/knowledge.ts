export type KnowledgeStatus =
  | "draft"
  | "review"
  | "approved"
  | "archived"
  | "superseded";

export type KnowledgeCategory =
  | "sop"
  | "policy"
  | "standard"
  | "template"
  | "manual"
  | "playbook";

export type EnforcementLevel = "mandatory" | "recommended" | "optional";

export type DocumentVersion = {
  version: string;
  summary?: string;
  authorId?: string;
  createdAt: string;
  fileUrl?: string;
};

export type SopStep = {
  order: number;
  title: string;
  description?: string;
  notes?: string;
};

export type KnowledgeEntry = {
  id: string;
  title: string;
  category: KnowledgeCategory;
  status: KnowledgeStatus;
  description?: string;
  content?: string;
  fileUrl?: string;
  filePath?: string;
  tags?: string[];
  ownerRole?: string;
  reviewCycleMonths?: number;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  versions?: DocumentVersion[];
  relatedIds?: string[];
  createdAt: string;
  updatedAt: string;
};

export type SopEntry = Omit<KnowledgeEntry, "category"> & {
  category: "sop";
  steps?: SopStep[];
  applicableRoles?: string[];
  estimatedDurationMinutes?: number;
};

export type PolicyRecord = Omit<KnowledgeEntry, "category"> & {
  category: "policy";
  effectiveDate?: string;
  expiresAt?: string;
  enforcementLevel?: EnforcementLevel;
};

export type DocumentRecord = {
  id: string;
  title: string;
  category: KnowledgeCategory;
  status: KnowledgeStatus;
  filePath: string;
  fileUrl?: string;
  mimeType?: string;
  sizeBytes?: number;
  tags?: string[];
  description?: string;
  versions: DocumentVersion[];
  retentionYears?: number;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
};
