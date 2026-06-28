/**
 * User Management types.
 *
 * Covers the business identity layer — the different categories of people who
 * interact with the platform (employees, contractors, clients, government
 * contacts), organization memberships, invitation workflows, and account
 * lifecycle tracking. All records link to a UserAccount via userId.
 */

import type { UserRole } from "./roles";

// ─── User Profile ─────────────────────────────────────────────────────────────

export type UserProfile = {
  userId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  pronouns: string | null;
  avatarUrl: string | null;
  phoneNumber: string | null;
  timezone: string;
  locale: string;
  bio: string | null;
  updatedAt: string;
};

// ─── Employee Accounts ────────────────────────────────────────────────────────

export type EmploymentType = "full-time" | "part-time" | "intern";

export type EmployeeStatus = "active" | "on-leave" | "terminated" | "pending-start";

export type EmployeeAccount = {
  userId: string;
  employeeId: string;
  title: string;
  department: string;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  managerId: string | null;
  startDate: string;
  endDate: string | null;
  clearanceLevel: string | null;
  govClearedAt: string | null;
  systemRoles: UserRole[];
  officeLocation: string | null;
  onboardingCompletedAt: string | null;
};

// ─── Contractor Accounts ──────────────────────────────────────────────────────

export type ContractorStatus = "active" | "inactive" | "access-expired" | "terminated";

export type ContractorAccount = {
  userId: string;
  contractorId: string;
  company: string | null;
  title: string;
  contractId: string;
  scopeOfWork: string;
  status: ContractorStatus;
  accessLevel: "limited" | "standard" | "elevated";
  accessExpiresAt: string;
  startDate: string;
  endDate: string | null;
  sponsorUserId: string;
  systemRoles: UserRole[];
  nda: boolean;
  ndaSignedAt: string | null;
};

// ─── Client Portal Access ─────────────────────────────────────────────────────

export type ClientPortalRole = "owner" | "stakeholder" | "viewer" | "approver";

export type ClientAccountAccess = {
  userId: string;
  clientId: string;
  portalRole: ClientPortalRole;
  projectAccess: string[];
  canApproveDeliverables: boolean;
  canViewInvoices: boolean;
  canViewContracts: boolean;
  canDownloadFiles: boolean;
  grantedAt: string;
  grantedBy: string;
  revokedAt: string | null;
};

// ─── Government Contacts ──────────────────────────────────────────────────────

export type GovContactRole = "contracting-officer" | "cor" | "program-manager" | "technical-poc" | "executive-sponsor" | "other";

export type GovContact = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  agency: string;
  department: string | null;
  officeSymbol: string | null;
  role: GovContactRole;
  email: string;
  phone: string | null;
  clearanceLevel: string | null;
  linkedContractIds: string[];
  linkedOpportunityIds: string[];
  linkedOrganizationId: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

// ─── Organization Memberships ─────────────────────────────────────────────────

export type MembershipStatus = "active" | "inactive" | "pending" | "removed";

export type OrgMembership = {
  id: string;
  userId: string;
  organizationId: string;
  role: string;
  status: MembershipStatus;
  joinedAt: string;
  removedAt: string | null;
  removedBy: string | null;
  isPrimary: boolean;
};

// ─── Invitations ──────────────────────────────────────────────────────────────

export type InvitationStatus = "pending" | "accepted" | "expired" | "cancelled" | "resent";

export type InvitationAccountType = "employee" | "contractor" | "client" | "partner";

export type InvitationRecord = {
  id: string;
  email: string;
  accountType: InvitationAccountType;
  intendedRole: UserRole;
  status: InvitationStatus;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  acceptedAt: string | null;
  cancelledAt: string | null;
  clientId: string | null;
  organizationId: string | null;
  personalNote: string | null;
  resendCount: number;
  lastResentAt: string | null;
};

// ─── Account Lifecycle ────────────────────────────────────────────────────────

export type AccountLifecycleEventType =
  | "account-created"
  | "email-verified"
  | "password-set"
  | "password-reset"
  | "role-assigned"
  | "role-removed"
  | "access-granted"
  | "access-revoked"
  | "account-suspended"
  | "account-reactivated"
  | "account-archived"
  | "mfa-enabled"
  | "mfa-disabled"
  | "profile-updated";

export type AccountLifecycleEvent = {
  id: string;
  userId: string;
  type: AccountLifecycleEventType;
  description: string;
  performedBy: string;
  occurredAt: string;
  metadata: Record<string, string>;
};
