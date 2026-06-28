/**
 * Identity & Access Management types.
 *
 * Covers the system identity layer — accounts, authentication, sessions,
 * password management, MFA, login auditing, and account lockout policies.
 * Separate from business roles (src/types/roles.ts) which govern what
 * an authenticated user is permitted to do.
 */

// ─── Account ─────────────────────────────────────────────────────────────────

export type AccountStatus =
  | "active"
  | "inactive"
  | "suspended"
  | "locked"
  | "pending-verification"
  | "archived";

export type AuthProvider =
  | "local"
  | "microsoft"
  | "google"
  | "saml"
  | "oidc";

export type UserAccount = {
  id: string;
  email: string;
  status: AccountStatus;
  authProvider: AuthProvider;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
  passwordChangedAt: string | null;
  mfaEnabled: boolean;
  mfaMethods: MfaMethod[];
  lockout: AccountLockout | null;
  roles: string[];
  metadata: Record<string, string>;
};

// ─── MFA ─────────────────────────────────────────────────────────────────────

export type MfaMethod = "totp" | "sms" | "email" | "backup-code" | "hardware-key";

export type MfaConfig = {
  userId: string;
  method: MfaMethod;
  configuredAt: string;
  lastUsedAt: string | null;
  backupCodesRemaining?: number;
};

// ─── Sessions ─────────────────────────────────────────────────────────────────

export type SessionRecord = {
  sessionId: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  lastActivityAt: string;
  ipAddress: string;
  userAgent: string;
  deviceFingerprint: string | null;
  revoked: boolean;
  revokedAt: string | null;
  revokedReason: "logout" | "admin-revoke" | "expired" | "suspicious" | null;
};

// ─── Password Management ─────────────────────────────────────────────────────

export type PasswordResetToken = {
  token: string;
  userId: string;
  email: string;
  createdAt: string;
  expiresAt: string;
  usedAt: string | null;
  ipAddress: string;
};

export type PasswordPolicy = {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  maxAgeDays: number | null;
  preventReuse: number;
};

// ─── Account Lockout ─────────────────────────────────────────────────────────

export type AccountLockout = {
  lockedAt: string;
  lockedUntil: string | null;
  reason: "max-attempts" | "admin-lock" | "suspicious-activity" | "policy";
  failedAttempts: number;
  unlockedAt: string | null;
  unlockedBy: string | null;
};

export type LockoutPolicy = {
  maxFailedAttempts: number;
  lockoutDurationMinutes: number | null;
  resetCountAfterMinutes: number;
  notifyUserOnLock: boolean;
  notifyAdminOnLock: boolean;
};

// ─── Login Auditing ───────────────────────────────────────────────────────────

export type LoginOutcome = "success" | "failed-password" | "failed-mfa" | "account-locked" | "account-suspended" | "account-unverified";

export type LoginAuditEvent = {
  id: string;
  userId: string | null;
  email: string;
  outcome: LoginOutcome;
  ipAddress: string;
  userAgent: string;
  authProvider: AuthProvider;
  mfaUsed: boolean;
  occurredAt: string;
  sessionId: string | null;
  metadata: Record<string, string>;
};

// ─── Permission Groups ────────────────────────────────────────────────────────

export type PermissionGroup = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  systemGroup: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserPermissionAssignment = {
  userId: string;
  groupId: string;
  assignedAt: string;
  assignedBy: string;
  expiresAt: string | null;
};
