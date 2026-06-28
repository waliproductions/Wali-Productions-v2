/**
 * Proposal service interface.
 *
 * Covers both the base Proposal lifecycle and the richer
 * ProposalWorkspace types (volumes, section templates, reviews,
 * compliance matrices, staffing).
 */

import type { Proposal, ProposalStatus } from "@/types/proposal";
import type {
  SectionTemplate,
  ProposalVolume,
  ProposalReview,
  ComplianceMatrix,
  StaffingEntry,
  ProposalApproval,
  ReviewType,
} from "@/types/proposal-workspace";
import type {
  ServiceResult,
  QueryParams,
  PaginatedResult,
} from "./index";

export type ProposalSortField = "title" | "status" | "expiresAt" | "total" | "createdAt";
export type SectionTemplateSortField = "title" | "category" | "usageCount" | "updatedAt";

export interface IProposalService {
  // Proposals
  listProposals(params?: QueryParams<ProposalSortField>): Promise<ServiceResult<PaginatedResult<Proposal>>>;
  getProposal(id: string): Promise<ServiceResult<Proposal>>;
  createProposal(data: Omit<Proposal, "id" | "createdAt" | "updatedAt">): Promise<ServiceResult<Proposal>>;
  updateProposal(id: string, data: Partial<Proposal>): Promise<ServiceResult<Proposal>>;
  updateProposalStatus(id: string, status: ProposalStatus): Promise<ServiceResult<Proposal>>;

  // Volumes
  listVolumes(proposalId: string): Promise<ServiceResult<ProposalVolume[]>>;
  createVolume(data: Omit<ProposalVolume, "id">): Promise<ServiceResult<ProposalVolume>>;
  updateVolume(id: string, data: Partial<ProposalVolume>): Promise<ServiceResult<ProposalVolume>>;

  // Section Templates (reusable library)
  listSectionTemplates(params?: QueryParams<SectionTemplateSortField>): Promise<ServiceResult<PaginatedResult<SectionTemplate>>>;
  getSectionTemplate(id: string): Promise<ServiceResult<SectionTemplate>>;
  createSectionTemplate(data: Omit<SectionTemplate, "id" | "createdAt" | "updatedAt">): Promise<ServiceResult<SectionTemplate>>;
  updateSectionTemplate(id: string, data: Partial<SectionTemplate>): Promise<ServiceResult<SectionTemplate>>;

  // Reviews
  listReviews(proposalId: string): Promise<ServiceResult<ProposalReview[]>>;
  createReview(data: Omit<ProposalReview, "id" | "createdAt">): Promise<ServiceResult<ProposalReview>>;
  updateReviewStatus(id: string, status: ReviewType): Promise<ServiceResult<ProposalReview>>;

  // Compliance Matrix
  getComplianceMatrix(proposalId: string): Promise<ServiceResult<ComplianceMatrix>>;
  updateComplianceItem(matrixId: string, itemId: string, data: Partial<import("@/types/proposal-workspace").ComplianceItem>): Promise<ServiceResult<ComplianceMatrix>>;

  // Staffing
  listStaffing(proposalId: string): Promise<ServiceResult<StaffingEntry[]>>;
  upsertStaffingEntry(data: Omit<StaffingEntry, "id">): Promise<ServiceResult<StaffingEntry>>;

  // Approvals
  listApprovals(proposalId: string): Promise<ServiceResult<ProposalApproval[]>>;
  requestApproval(proposalId: string, approverName: string, approverTitle?: string): Promise<ServiceResult<ProposalApproval>>;
  respondToApproval(id: string, status: "approved" | "rejected", comments?: string): Promise<ServiceResult<ProposalApproval>>;

  // Stats
  getStats(): Promise<ServiceResult<{
    totalProposals: number;
    inDraft: number;
    awaitingResponse: number;
    winRate: number;
    avgDaysToClose: number;
    totalPipelineValue: number;
  }>>;
}
