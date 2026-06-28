/**
 * Enterprise Security types.
 *
 * Covers security events, audit infrastructure, rate limiting policies,
 * CSRF protection config, secure headers config, input validation rules,
 * and security alerting. These types define the security configuration
 * contract — implementation lives in middleware and lib/security/.
 */

// ─── Security Events ──────────────────────────────────────────────────────────

export type SecuritySeverity = "info" | "low" | "medium" | "high" | "critical";

export type SecurityEventType =
  | "login-success"
  | "login-failed"
  | "login-locked"
  | "logout"
  | "password-changed"
  | "password-reset-requested"
  | "password-reset-completed"
  | "mfa-enabled"
  | "mfa-disabled"
  | "mfa-failed"
  | "session-created"
  | "session-revoked"
  | "session-expired"
  | "permission-denied"
  | "account-suspended"
  | "account-unlocked"
  | "role-assigned"
  | "role-removed"
  | "admin-action"
  | "data-export"
  | "api-key-created"
  | "api-key-revoked"
  | "suspicious-activity"
  | "rate-limit-exceeded"
  | "csrf-violation"
  | "validation-error";

export type SecurityEvent = {
  id: string;
  type: SecurityEventType;
  severity: SecuritySeverity;
  userId: string | null;
  email: string | null;
  ipAddress: string;
  userAgent: string;
  resource: string | null;
  description: string;
  metadata: Record<string, string>;
  occurredAt: string;
  resolved: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
};

// ─── Rate Limiting ────────────────────────────────────────────────────────────

export type RateLimitStrategy = "fixed-window" | "sliding-window" | "token-bucket";

export type RateLimitScope = "ip" | "user" | "api-key" | "global";

export type RateLimitPolicy = {
  id: string;
  name: string;
  scope: RateLimitScope;
  strategy: RateLimitStrategy;
  maxRequests: number;
  windowSeconds: number;
  paths: string[];
  skipAuthenticatedUsers: boolean;
  blockDurationSeconds: number;
};

// ─── CSRF ─────────────────────────────────────────────────────────────────────

export type CsrfStrategy = "double-submit-cookie" | "synchronizer-token" | "samesite-cookie";

export type CsrfConfig = {
  strategy: CsrfStrategy;
  cookieName: string;
  headerName: string;
  tokenExpiryMinutes: number;
  excludedPaths: string[];
};

// ─── Secure Headers ───────────────────────────────────────────────────────────

export type ContentSecurityPolicyDirective = {
  directive: string;
  values: string[];
};

export type SecureHeadersConfig = {
  contentSecurityPolicy: ContentSecurityPolicyDirective[];
  strictTransportSecurity: { maxAge: number; includeSubDomains: boolean; preload: boolean };
  xFrameOptions: "DENY" | "SAMEORIGIN";
  xContentTypeOptions: boolean;
  referrerPolicy: string;
  permissionsPolicy: string[];
  crossOriginOpenerPolicy: string;
  crossOriginResourcePolicy: string;
};

// ─── Input Validation ─────────────────────────────────────────────────────────

export type ValidationRuleType =
  | "required"
  | "min-length"
  | "max-length"
  | "pattern"
  | "email"
  | "url"
  | "uuid"
  | "numeric"
  | "alphanumeric"
  | "no-html"
  | "enum"
  | "range";

export type ValidationRule = {
  field: string;
  rule: ValidationRuleType;
  value?: string | number | string[];
  message: string;
};

export type ValidationSchema = {
  name: string;
  rules: ValidationRule[];
  stripUnknownFields: boolean;
};

// ─── Security Alerts ──────────────────────────────────────────────────────────

export type SecurityAlertStatus = "open" | "acknowledged" | "investigating" | "resolved" | "false-positive";

export type SecurityAlert = {
  id: string;
  triggerEventId: string;
  severity: SecuritySeverity;
  title: string;
  description: string;
  status: SecurityAlertStatus;
  assignedTo: string | null;
  createdAt: string;
  acknowledgedAt: string | null;
  resolvedAt: string | null;
  relatedEventIds: string[];
};

// ─── Security Configuration ───────────────────────────────────────────────────

export type SecretRotationPolicy = {
  secretName: string;
  rotationIntervalDays: number;
  lastRotatedAt: string | null;
  nextRotationAt: string | null;
  autoRotate: boolean;
  notifyBeforeDays: number;
};

export type SecurityConfig = {
  rateLimiting: RateLimitPolicy[];
  csrf: CsrfConfig;
  secureHeaders: SecureHeadersConfig;
  sessionTtlSeconds: number;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumber: boolean;
    requireSpecialChar: boolean;
    maxAgeDays: number | null;
    preventReuseCount: number;
  };
  lockoutPolicy: {
    maxFailedAttempts: number;
    lockoutDurationMinutes: number | null;
    resetCountAfterMinutes: number;
  };
  secretRotation: SecretRotationPolicy[];
};

// ─── Audit Trail ─────────────────────────────────────────────────────────────

export type AuditAction =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "export"
  | "import"
  | "approve"
  | "reject"
  | "submit"
  | "archive"
  | "restore"
  | "share"
  | "revoke";

export type AuditRecord = {
  id: string;
  userId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  ipAddress: string;
  userAgent: string;
  occurredAt: string;
  requestId: string;
  metadata: Record<string, string>;
};
