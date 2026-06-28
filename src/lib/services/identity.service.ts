/**
 * Identity Service interface.
 *
 * Defines the contract for authentication, account management, session
 * management, and access control operations. No implementation here —
 * concrete implementations (local auth, OAuth, SAML) satisfy this interface.
 */

import type {
  AccountLifecycleEvent,
  AccountStatus,
  InvitationRecord,
  LoginAuditEvent,
  MfaConfig,
  OrgMembership,
  PermissionGroup,
  SessionRecord,
  UserAccount,
  UserPermissionAssignment,
  UserProfile,
} from "@/types";
import type { ServiceResult, QueryParams, PaginatedResult } from "./index";

export type CreateAccountInput = {
  email: string;
  authProvider: "local" | "microsoft" | "google" | "saml" | "oidc";
  initialRoles: string[];
  invitationId?: string;
};

export type UpdateAccountStatusInput = {
  status: AccountStatus;
  reason: string;
  performedBy: string;
};

export type VerifyPasswordInput = {
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string;
};

export type ChangePasswordInput = {
  userId: string;
  currentPasswordHash: string;
  newPasswordHash: string;
  performedBy: string;
};

export type CreateSessionInput = {
  userId: string;
  ipAddress: string;
  userAgent: string;
  durationSeconds: number;
};

export type AccountStats = {
  totalAccounts: number;
  activeAccounts: number;
  pendingVerification: number;
  locked: number;
  suspended: number;
  activeSessions: number;
  openInvitations: number;
};

export interface IIdentityService {
  // Account management
  listAccounts(params?: QueryParams): Promise<ServiceResult<PaginatedResult<UserAccount>>>;
  getAccount(userId: string): Promise<ServiceResult<UserAccount>>;
  getAccountByEmail(email: string): Promise<ServiceResult<UserAccount>>;
  createAccount(input: CreateAccountInput): Promise<ServiceResult<UserAccount>>;
  updateAccountStatus(userId: string, input: UpdateAccountStatusInput): Promise<ServiceResult<UserAccount>>;
  deleteAccount(userId: string, performedBy: string): Promise<ServiceResult<void>>;

  // Profile management
  getProfile(userId: string): Promise<ServiceResult<UserProfile>>;
  updateProfile(userId: string, profile: Partial<UserProfile>): Promise<ServiceResult<UserProfile>>;

  // Authentication
  verifyPassword(input: VerifyPasswordInput): Promise<ServiceResult<{ match: boolean; lockoutApplied: boolean }>>;
  changePassword(input: ChangePasswordInput): Promise<ServiceResult<void>>;
  initiatePasswordReset(email: string, ipAddress: string): Promise<ServiceResult<void>>;
  completePasswordReset(token: string, newPasswordHash: string, ipAddress: string): Promise<ServiceResult<void>>;

  // Session management
  createSession(input: CreateSessionInput): Promise<ServiceResult<SessionRecord>>;
  getSession(sessionId: string): Promise<ServiceResult<SessionRecord>>;
  listActiveSessions(userId: string): Promise<ServiceResult<SessionRecord[]>>;
  revokeSession(sessionId: string, reason: SessionRecord["revokedReason"]): Promise<ServiceResult<void>>;
  revokeAllUserSessions(userId: string, performedBy: string): Promise<ServiceResult<number>>;

  // MFA
  getMfaConfig(userId: string): Promise<ServiceResult<MfaConfig[]>>;
  enableMfa(userId: string, method: MfaConfig["method"]): Promise<ServiceResult<MfaConfig>>;
  disableMfa(userId: string, method: MfaConfig["method"], performedBy: string): Promise<ServiceResult<void>>;

  // Permission groups
  listPermissionGroups(): Promise<ServiceResult<PermissionGroup[]>>;
  getPermissionGroup(groupId: string): Promise<ServiceResult<PermissionGroup>>;
  assignPermissionGroup(assignment: Omit<UserPermissionAssignment, "assignedAt">): Promise<ServiceResult<UserPermissionAssignment>>;
  removePermissionGroup(userId: string, groupId: string, removedBy: string): Promise<ServiceResult<void>>;

  // Organization memberships
  listMemberships(userId: string): Promise<ServiceResult<OrgMembership[]>>;
  addMembership(membership: Omit<OrgMembership, "id" | "joinedAt" | "removedAt" | "removedBy">): Promise<ServiceResult<OrgMembership>>;
  removeMembership(membershipId: string, removedBy: string): Promise<ServiceResult<void>>;

  // Invitations
  listInvitations(params?: QueryParams): Promise<ServiceResult<PaginatedResult<InvitationRecord>>>;
  getInvitation(id: string): Promise<ServiceResult<InvitationRecord>>;
  createInvitation(invitation: Omit<InvitationRecord, "id" | "invitedAt" | "status" | "acceptedAt" | "cancelledAt" | "resendCount" | "lastResentAt">): Promise<ServiceResult<InvitationRecord>>;
  resendInvitation(id: string, performedBy: string): Promise<ServiceResult<InvitationRecord>>;
  cancelInvitation(id: string, performedBy: string): Promise<ServiceResult<void>>;
  acceptInvitation(token: string, newAccountInput: CreateAccountInput): Promise<ServiceResult<UserAccount>>;

  // Audit
  listLoginAudit(params?: QueryParams): Promise<ServiceResult<PaginatedResult<LoginAuditEvent>>>;
  listLifecycleEvents(userId: string): Promise<ServiceResult<AccountLifecycleEvent[]>>;

  // Stats
  getStats(): Promise<ServiceResult<AccountStats>>;
}
