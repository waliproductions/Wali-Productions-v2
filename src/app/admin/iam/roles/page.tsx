import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import {
  ROLE_LABELS,
  ROLE_DESCRIPTIONS,
  ROLE_PERMISSIONS,
  ROLE_HIERARCHY,
  type UserRole,
  type Permission,
} from "@/types/roles";

export const metadata = { title: "RBAC Matrix — IAM" };

const ALL_ROLES: UserRole[] = [
  "founder", "admin", "executive",
  "project-manager", "business-development", "proposal-manager",
  "government-contracts", "operations", "sales", "marketing", "developer",
  "contractor", "client", "viewer",
];

const PERMISSION_GROUPS: { label: string; permissions: Permission[] }[] = [
  {
    label: "Admin",
    permissions: ["admin:read", "admin:write", "settings:read", "settings:write"],
  },
  {
    label: "IAM",
    permissions: ["users:read", "users:write", "users:invite", "roles:read", "roles:write"],
  },
  {
    label: "CRM",
    permissions: ["clients:read", "clients:write", "crm:read", "crm:write"],
  },
  {
    label: "Projects",
    permissions: ["projects:read", "projects:write", "tasks:read", "tasks:write"],
  },
  {
    label: "Business Dev",
    permissions: ["opportunities:read", "opportunities:write", "proposals:read", "proposals:write"],
  },
  {
    label: "Contracts",
    permissions: ["contracts:read", "contracts:write", "capture:read", "capture:write"],
  },
  {
    label: "Documents",
    permissions: ["documents:read", "documents:write", "documents:approve"],
  },
  {
    label: "Knowledge",
    permissions: ["knowledge:read", "knowledge:write", "knowledge:approve"],
  },
  {
    label: "Analytics",
    permissions: ["analytics:read", "reports:read", "reports:export", "audit:read"],
  },
  {
    label: "Collaboration",
    permissions: ["messages:read", "messages:write", "workflows:read", "workflows:write"],
  },
  {
    label: "Marketing",
    permissions: ["portfolio:read", "portfolio:write"],
  },
  {
    label: "Portal",
    permissions: ["portal:read", "portal:write"],
  },
];

function PermCell({ has }: { has: boolean }) {
  return (
    <td className="px-2 py-1.5 text-center">
      {has ? (
        <span className="inline-block h-3 w-3 rounded-full bg-emerald-500/80" aria-label="granted" />
      ) : (
        <span className="inline-block h-3 w-3 rounded-full bg-zinc-800" aria-label="denied" />
      )}
    </td>
  );
}

export default function AdminRolesPage() {
  const totalPermissions = PERMISSION_GROUPS.reduce((s, g) => s + g.permissions.length, 0);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="RBAC Matrix"
        description="Role-based access control — permission assignments across all 13 enterprise roles."
        actions={
          <AdminButton href="/admin/users" variant="ghost" size="md">
            Back to users
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Enterprise roles" value={String(ALL_ROLES.length)} />
        <AdminStatCard label="Permission types" value={String(totalPermissions)} />
        <AdminStatCard label="Permission groups" value={String(PERMISSION_GROUPS.length)} />
        <AdminStatCard label="Legacy aliases" value="2" hint="contracts, knowledge" />
      </section>

      <AdminCard title="Role Definitions">
        <div className="space-y-3">
          {ALL_ROLES.map((role) => {
            const perms = ROLE_PERMISSIONS[role] ?? [];
            const inherited = ROLE_HIERARCHY[role];
            return (
              <div
                key={role}
                className="flex items-start justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-950/40 p-4"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-100">{ROLE_LABELS[role]}</p>
                    <AdminBadge variant="neutral">{role}</AdminBadge>
                    {(role === "founder" || role === "admin") && (
                      <AdminBadge variant="warning">elevated</AdminBadge>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    {ROLE_DESCRIPTIONS[role]}
                  </p>
                  {inherited && (
                    <p className="mt-1 text-xs text-zinc-600">
                      Inherits from: {inherited.join(", ")}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold text-amber-400">{perms.length}</p>
                  <p className="text-xs text-zinc-600">perms</p>
                </div>
              </div>
            );
          })}
        </div>
      </AdminCard>

      <AdminCard title="Permission Matrix" description="Green = granted · Gray = denied">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="pb-3 pr-4 text-left text-xs font-medium text-zinc-500">Permission</th>
                {ALL_ROLES.map((r) => (
                  <th
                    key={r}
                    className="pb-3 px-2 text-center font-medium text-zinc-500"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", minWidth: 28 }}
                  >
                    {ROLE_LABELS[r]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERMISSION_GROUPS.map((group) => (
                <>
                  <tr key={`group-${group.label}`}>
                    <td
                      colSpan={ALL_ROLES.length + 1}
                      className="py-2 text-xs font-semibold uppercase tracking-wider text-amber-400/70"
                    >
                      {group.label}
                    </td>
                  </tr>
                  {group.permissions.map((perm) => (
                    <tr key={perm} className="border-t border-zinc-800/40 hover:bg-zinc-900/30">
                      <td className="py-1.5 pr-4 font-mono text-zinc-400">{perm}</td>
                      {ALL_ROLES.map((role) => (
                        <PermCell
                          key={role}
                          has={ROLE_PERMISSIONS[role]?.includes(perm) ?? false}
                        />
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <AdminCard title="Legacy Role Aliases" description="Kept for backwards compatibility">
        <div className="space-y-3">
          {(["contracts", "knowledge"] as UserRole[]).map((role) => (
            <div key={role} className="rounded-lg border border-zinc-800/60 bg-zinc-950/30 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-zinc-300">{ROLE_LABELS[role]}</p>
                <AdminBadge variant="neutral">{role}</AdminBadge>
                <AdminBadge variant="neutral">legacy</AdminBadge>
              </div>
              <p className="mt-1 text-xs text-zinc-500">{ROLE_DESCRIPTIONS[role]}</p>
              <p className="mt-1.5 text-xs text-zinc-600">
                {ROLE_PERMISSIONS[role]?.length ?? 0} permissions · Retained for v1.0–v1.2 compatibility
              </p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
