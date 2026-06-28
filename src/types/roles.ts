export type UserRole =
  | "founder"
  | "admin"
  | "operations"
  | "contracts"
  | "knowledge"
  | "viewer";

export type Permission =
  | "admin:read"
  | "admin:write"
  | "clients:read"
  | "clients:write"
  | "projects:read"
  | "projects:write"
  | "proposals:read"
  | "proposals:write"
  | "contracts:read"
  | "contracts:write"
  | "knowledge:read"
  | "knowledge:write"
  | "analytics:read"
  | "audit:read"
  | "settings:read"
  | "settings:write";

export type SystemPermissions = Record<UserRole, Permission[]>;

export const ROLE_PERMISSIONS: SystemPermissions = {
  founder: [
    "admin:read",
    "admin:write",
    "clients:read",
    "clients:write",
    "projects:read",
    "projects:write",
    "proposals:read",
    "proposals:write",
    "contracts:read",
    "contracts:write",
    "knowledge:read",
    "knowledge:write",
    "analytics:read",
    "audit:read",
    "settings:read",
    "settings:write",
  ],
  admin: [
    "admin:read",
    "admin:write",
    "clients:read",
    "clients:write",
    "projects:read",
    "projects:write",
    "proposals:read",
    "proposals:write",
    "contracts:read",
    "contracts:write",
    "knowledge:read",
    "knowledge:write",
    "analytics:read",
    "audit:read",
    "settings:read",
  ],
  operations: [
    "admin:read",
    "clients:read",
    "clients:write",
    "projects:read",
    "projects:write",
    "proposals:read",
    "proposals:write",
    "analytics:read",
  ],
  contracts: [
    "admin:read",
    "contracts:read",
    "contracts:write",
    "proposals:read",
    "proposals:write",
    "analytics:read",
  ],
  knowledge: [
    "admin:read",
    "knowledge:read",
    "knowledge:write",
  ],
  viewer: [
    "admin:read",
    "analytics:read",
  ],
};
