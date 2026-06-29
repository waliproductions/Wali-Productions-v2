// ─── Enterprise Role Definitions ─────────────────────────────────────────────

export type UserRole =
  | "founder"
  | "admin"
  | "executive"
  | "project-manager"
  | "business-development"
  | "proposal-manager"
  | "government-contracts"
  | "operations"
  | "sales"
  | "marketing"
  | "developer"
  | "contractor"
  | "client"
  | "viewer"
  | "contracts"  // legacy alias kept for backwards compatibility
  | "knowledge"; // legacy alias kept for backwards compatibility

export const ROLE_LABELS: Record<UserRole, string> = {
  founder: "Founder",
  admin: "Administrator",
  executive: "Executive",
  "project-manager": "Project Manager",
  "business-development": "Business Development",
  "proposal-manager": "Proposal Manager",
  "government-contracts": "Government Contracts",
  operations: "Operations",
  sales: "Sales",
  marketing: "Marketing",
  developer: "Developer",
  contractor: "Contractor",
  client: "Client",
  viewer: "Viewer",
  contracts: "Contracts", // legacy
  knowledge: "Knowledge", // legacy
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  founder: "Unrestricted access to all platform features and settings",
  admin: "Full administrative access excluding founder-only controls",
  executive: "Read access to all modules with executive analytics and reporting",
  "project-manager": "Full project, task, and delivery access with team management",
  "business-development": "CRM, opportunities, proposals, and pipeline management",
  "proposal-manager": "Full proposal lifecycle with section ownership and color reviews",
  "government-contracts": "Government contracting, capture, compliance, and teaming",
  operations: "Project delivery, client management, and operational reporting",
  sales: "CRM, pipeline, and opportunity management",
  marketing: "Portfolio, case studies, and public-facing content management",
  developer: "Technical access, integrations, and knowledge base",
  contractor: "Scoped project access tied to active contract period",
  client: "Client portal access limited to their own projects and documents",
  viewer: "Read-only access to analytics and dashboard",
  contracts: "Contract administration and proposal management", // legacy
  knowledge: "Knowledge base creation and management", // legacy
};

// ─── Permission Definitions ───────────────────────────────────────────────────

export type Permission =
  // Admin
  | "admin:read"
  | "admin:write"
  | "settings:read"
  | "settings:write"
  // IAM
  | "users:read"
  | "users:write"
  | "users:invite"
  | "roles:read"
  | "roles:write"
  // CRM
  | "clients:read"
  | "clients:write"
  | "crm:read"
  | "crm:write"
  // Projects
  | "projects:read"
  | "projects:write"
  | "tasks:read"
  | "tasks:write"
  // Business Development
  | "opportunities:read"
  | "opportunities:write"
  | "proposals:read"
  | "proposals:write"
  // Contracts
  | "contracts:read"
  | "contracts:write"
  | "capture:read"
  | "capture:write"
  // Documents
  | "documents:read"
  | "documents:write"
  | "documents:approve"
  // Knowledge
  | "knowledge:read"
  | "knowledge:write"
  | "knowledge:approve"
  // Analytics
  | "analytics:read"
  | "reports:read"
  | "reports:export"
  // Audit
  | "audit:read"
  // Messaging
  | "messages:read"
  | "messages:write"
  // Workflow
  | "workflows:read"
  | "workflows:write"
  // Marketing / Portfolio
  | "portfolio:read"
  | "portfolio:write"
  // Client Portal (scoped)
  | "portal:read"
  | "portal:write";

export type SystemPermissions = Record<UserRole, Permission[]>;

const ALL_PERMISSIONS: Permission[] = [
  "admin:read", "admin:write", "settings:read", "settings:write",
  "users:read", "users:write", "users:invite", "roles:read", "roles:write",
  "clients:read", "clients:write", "crm:read", "crm:write",
  "projects:read", "projects:write", "tasks:read", "tasks:write",
  "opportunities:read", "opportunities:write", "proposals:read", "proposals:write",
  "contracts:read", "contracts:write", "capture:read", "capture:write",
  "documents:read", "documents:write", "documents:approve",
  "knowledge:read", "knowledge:write", "knowledge:approve",
  "analytics:read", "reports:read", "reports:export",
  "audit:read",
  "messages:read", "messages:write",
  "workflows:read", "workflows:write",
  "portfolio:read", "portfolio:write",
  "portal:read", "portal:write",
];

export const ROLE_PERMISSIONS: SystemPermissions = {
  founder: ALL_PERMISSIONS,

  admin: ALL_PERMISSIONS.filter((p) => p !== "roles:write"),

  executive: [
    "admin:read", "settings:read",
    "users:read", "roles:read",
    "clients:read", "crm:read",
    "projects:read", "tasks:read",
    "opportunities:read", "proposals:read",
    "contracts:read", "capture:read",
    "documents:read",
    "knowledge:read",
    "analytics:read", "reports:read", "reports:export",
    "audit:read",
    "messages:read",
    "workflows:read",
    "portfolio:read",
  ],

  "project-manager": [
    "admin:read",
    "clients:read", "crm:read",
    "projects:read", "projects:write",
    "tasks:read", "tasks:write",
    "opportunities:read",
    "proposals:read",
    "contracts:read",
    "documents:read", "documents:write",
    "knowledge:read",
    "analytics:read", "reports:read",
    "messages:read", "messages:write",
    "workflows:read",
    "portfolio:read",
  ],

  "business-development": [
    "admin:read",
    "clients:read", "clients:write", "crm:read", "crm:write",
    "projects:read",
    "opportunities:read", "opportunities:write",
    "proposals:read", "proposals:write",
    "capture:read", "capture:write",
    "documents:read",
    "knowledge:read",
    "analytics:read", "reports:read",
    "messages:read", "messages:write",
    "workflows:read",
    "portfolio:read",
  ],

  "proposal-manager": [
    "admin:read",
    "clients:read", "crm:read",
    "opportunities:read",
    "proposals:read", "proposals:write",
    "capture:read",
    "contracts:read",
    "documents:read", "documents:write",
    "knowledge:read", "knowledge:write",
    "analytics:read", "reports:read",
    "messages:read", "messages:write",
    "workflows:read",
    "tasks:read", "tasks:write",
    "portfolio:read",
  ],

  "government-contracts": [
    "admin:read",
    "clients:read", "crm:read",
    "opportunities:read", "opportunities:write",
    "proposals:read", "proposals:write",
    "contracts:read", "contracts:write",
    "capture:read", "capture:write",
    "documents:read", "documents:write",
    "knowledge:read",
    "analytics:read", "reports:read",
    "messages:read", "messages:write",
    "workflows:read",
    "tasks:read", "tasks:write",
  ],

  operations: [
    "admin:read",
    "clients:read", "clients:write", "crm:read", "crm:write",
    "projects:read", "projects:write",
    "tasks:read", "tasks:write",
    "proposals:read", "proposals:write",
    "contracts:read",
    "documents:read", "documents:write",
    "analytics:read", "reports:read",
    "messages:read", "messages:write",
    "workflows:read",
    "knowledge:read",
  ],

  sales: [
    "admin:read",
    "clients:read", "clients:write", "crm:read", "crm:write",
    "opportunities:read", "opportunities:write",
    "proposals:read", "proposals:write",
    "analytics:read", "reports:read",
    "messages:read", "messages:write",
    "tasks:read", "tasks:write",
    "knowledge:read",
    "portfolio:read",
  ],

  marketing: [
    "admin:read",
    "portfolio:read", "portfolio:write",
    "knowledge:read", "knowledge:write",
    "analytics:read", "reports:read",
    "messages:read", "messages:write",
    "tasks:read",
    "documents:read",
  ],

  developer: [
    "admin:read",
    "projects:read", "projects:write",
    "tasks:read", "tasks:write",
    "knowledge:read", "knowledge:write",
    "documents:read",
    "analytics:read",
    "workflows:read", "workflows:write",
    "messages:read", "messages:write",
    "settings:read",
  ],

  contractor: [
    "projects:read",
    "tasks:read", "tasks:write",
    "documents:read",
    "messages:read", "messages:write",
    "knowledge:read",
  ],

  client: [
    "portal:read",
    "messages:read", "messages:write",
  ],

  viewer: [
    "admin:read",
    "analytics:read",
    "reports:read",
    "portfolio:read",
  ],

  // Legacy aliases
  contracts: [
    "admin:read",
    "contracts:read", "contracts:write",
    "proposals:read", "proposals:write",
    "capture:read", "capture:write",
    "analytics:read",
    "documents:read",
  ],

  knowledge: [
    "admin:read",
    "knowledge:read", "knowledge:write", "knowledge:approve",
    "documents:read",
  ],
};

// ─── Role hierarchy (for inheritance checks) ──────────────────────────────────

export const ROLE_HIERARCHY: Partial<Record<UserRole, UserRole[]>> = {
  founder: ["admin", "executive"],
  admin: ["executive", "operations"],
  executive: ["viewer"],
  "project-manager": ["operations"],
  "government-contracts": ["contracts"],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}
