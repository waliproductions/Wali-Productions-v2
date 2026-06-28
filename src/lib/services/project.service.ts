/**
 * Project service interface.
 *
 * Manages project delivery operations: status, milestones, deliverables,
 * risks, issues, change requests, WBS, customer approvals, and lessons learned.
 */

import type {
  Project,
  ProjectStatus,
  ProjectHealth,
  Milestone,
  Deliverable,
  Risk,
  RiskStatus,
  ProjectIssue,
  IssueStatus,
  ChangeRequest,
  ChangeRequestStatus,
  LessonsLearnedRecord,
  CustomerApproval,
} from "@/types/project";
import type {
  ServiceResult,
  QueryParams,
  PaginatedResult,
} from "./index";

export type ProjectSortField = "title" | "status" | "health" | "targetDate" | "actualSpend" | "createdAt";

export interface IProjectService {
  // Projects
  listProjects(params?: QueryParams<ProjectSortField>): Promise<ServiceResult<PaginatedResult<Project>>>;
  getProject(id: string): Promise<ServiceResult<Project>>;
  createProject(data: Omit<Project, "id">): Promise<ServiceResult<Project>>;
  updateProject(id: string, data: Partial<Project>): Promise<ServiceResult<Project>>;
  updateProjectStatus(id: string, status: ProjectStatus): Promise<ServiceResult<Project>>;
  updateProjectHealth(id: string, health: ProjectHealth): Promise<ServiceResult<Project>>;

  // Milestones
  listMilestones(projectId: string): Promise<ServiceResult<Milestone[]>>;
  createMilestone(projectId: string, data: Omit<Milestone, "id">): Promise<ServiceResult<Milestone>>;
  updateMilestone(projectId: string, milestoneId: string, data: Partial<Milestone>): Promise<ServiceResult<Milestone>>;

  // Deliverables
  listDeliverables(projectId: string): Promise<ServiceResult<Deliverable[]>>;
  createDeliverable(projectId: string, data: Omit<Deliverable, "id">): Promise<ServiceResult<Deliverable>>;
  updateDeliverable(projectId: string, deliverableId: string, data: Partial<Deliverable>): Promise<ServiceResult<Deliverable>>;

  // Risks
  listRisks(projectId: string): Promise<ServiceResult<Risk[]>>;
  createRisk(projectId: string, data: Omit<Risk, "id">): Promise<ServiceResult<Risk>>;
  updateRiskStatus(projectId: string, riskId: string, status: RiskStatus): Promise<ServiceResult<Risk>>;

  // Issues
  listIssues(projectId: string): Promise<ServiceResult<ProjectIssue[]>>;
  createIssue(projectId: string, data: Omit<ProjectIssue, "id">): Promise<ServiceResult<ProjectIssue>>;
  updateIssueStatus(projectId: string, issueId: string, status: IssueStatus): Promise<ServiceResult<ProjectIssue>>;

  // Change Requests
  listChangeRequests(projectId: string): Promise<ServiceResult<ChangeRequest[]>>;
  submitChangeRequest(projectId: string, data: Omit<ChangeRequest, "id">): Promise<ServiceResult<ChangeRequest>>;
  updateChangeRequestStatus(projectId: string, changeRequestId: string, status: ChangeRequestStatus): Promise<ServiceResult<ChangeRequest>>;

  // Customer Approvals
  listCustomerApprovals(projectId: string): Promise<ServiceResult<CustomerApproval[]>>;
  requestCustomerApproval(projectId: string, data: Omit<CustomerApproval, "id">): Promise<ServiceResult<CustomerApproval>>;
  recordApprovalResponse(projectId: string, approvalId: string, status: "approved" | "rejected", comments?: string): Promise<ServiceResult<CustomerApproval>>;

  // Lessons Learned
  listLessonsLearned(projectId: string): Promise<ServiceResult<LessonsLearnedRecord[]>>;
  createLessonsLearned(projectId: string, data: Omit<LessonsLearnedRecord, "id">): Promise<ServiceResult<LessonsLearnedRecord>>;

  // Stats
  getStats(): Promise<ServiceResult<{
    activeProjects: number;
    atRisk: number;
    blocked: number;
    completedThisQuarter: number;
    openRisks: number;
    openIssues: number;
    pendingChangeRequests: number;
    pendingCustomerApprovals: number;
  }>>;
}
