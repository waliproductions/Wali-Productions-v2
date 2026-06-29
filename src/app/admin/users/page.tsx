import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { userAccountRepository } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "User Management" };

const MODULES = [
  {
    label: "Employees",
    description: "Internal staff with operational platform access",
    href: "/admin/users/employees",
    accountType: "employee" as const,
  },
  {
    label: "Contractors",
    description: "External contractors with time-limited, scoped access",
    href: "/admin/users/contractors",
    accountType: "contractor" as const,
  },
  {
    label: "Client Access",
    description: "Client portal accounts scoped to their projects",
    href: "/admin/users/clients-access",
    accountType: "client" as const,
  },
  {
    label: "Invitations",
    description: "Pending and sent account invitations",
    href: "/admin/users/invitations",
    accountType: null,
  },
] as const;

const STATUS_VARIANT: Record<string, "neutral" | "success" | "warning" | "danger" | "info"> = {
  active: "success",
  inactive: "neutral",
  suspended: "danger",
  locked: "danger",
  "pending-verification": "warning",
  archived: "neutral",
};

export default async function AdminUsersPage() {
  const stats = await userAccountRepository.getStats();
  const allUsers = await userAccountRepository.findAll({
    sort: { field: "createdAt", order: "desc" },
    perPage: 5,
  });
  const recentUsers = allUsers.items;

  // Expiring access: contractors with accessExpiresAt within 30 days
  const allAccounts = await userAccountRepository.listAll();
  const today = new Date().toISOString().slice(0, 10);
  const cutoff30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
  const expiring = allAccounts.filter(
    (u) =>
      !u.deleted &&
      !u.archived &&
      u.accessExpiresAt &&
      u.accessExpiresAt >= today &&
      u.accessExpiresAt <= cutoff30,
  );

  const moduleCounts: Record<string, number> = {
    employee: stats.employees,
    contractor: stats.contractors,
    client: stats.clients,
    invitations: stats.pendingVerification,
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="User Management"
        description="Employee, contractor, and client account administration — identity, roles, and access control."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total accounts" value={String(stats.total)} hint="Across all types" />
        <AdminStatCard label="Active users" value={String(stats.active)} hint="With current access" />
        <AdminStatCard
          label="Pending verification"
          value={String(stats.pendingVerification)}
          hint="Awaiting email confirm"
        />
        <AdminStatCard
          label="Expiring access"
          value={String(expiring.length)}
          hint="Within 30 days"
        />
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map(({ label, description, href, accountType }) => {
          const count =
            accountType === null
              ? moduleCounts.invitations
              : moduleCounts[accountType] ?? 0;
          return (
            <a
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors hover:border-amber-400/40 hover:bg-zinc-900"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
                  {label}
                </p>
                <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                  {count}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500">{description}</p>
            </a>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard title="Recent Accounts">
          {recentUsers.length === 0 ? (
            <AdminEmptyState
              compact
              title="No accounts yet"
              description="User accounts will appear here once created."
            />
          ) : (
            <div className="divide-y divide-zinc-800">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{u.displayName}</p>
                    <p className="text-xs text-zinc-500">{u.email}</p>
                  </div>
                  <AdminBadge variant={STATUS_VARIANT[u.status] ?? "neutral"}>
                    {u.status}
                  </AdminBadge>
                </div>
              ))}
            </div>
          )}
        </AdminCard>

        <AdminCard title="Expiring Access">
          {expiring.length === 0 ? (
            <AdminEmptyState
              compact
              title="No expiring access"
              description="Accounts approaching their expiration date will appear here."
            />
          ) : (
            <div className="divide-y divide-zinc-800">
              {expiring.slice(0, 5).map((u) => (
                <div key={u.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{u.displayName}</p>
                    <p className="text-xs text-zinc-500">Expires {u.accessExpiresAt}</p>
                  </div>
                  <AdminBadge variant="warning">expiring</AdminBadge>
                </div>
              ))}
            </div>
          )}
        </AdminCard>
      </div>

      <AdminCard title="Security Overview">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "MFA enabled", value: stats.mfaEnabled },
            { label: "Clearance holders", value: stats.clearanceHolders },
            { label: "Suspended", value: stats.suspended },
            { label: "By role (unique)", value: Object.keys(stats.byRole).length },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 text-center">
              <p className="text-2xl font-bold text-amber-400">{value}</p>
              <p className="mt-1 text-xs text-zinc-500">{label}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Roles & Permissions" description="Navigate to the RBAC matrix">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-zinc-400">
              13 enterprise roles with granular permission assignments across 35 permissions.
            </p>
            <p className="text-xs text-zinc-600">
              Founder → Admin → Executive → role-specific scopes
            </p>
          </div>
          <AdminButton href="/admin/iam/roles" variant="outline" size="sm">
            View RBAC matrix
          </AdminButton>
        </div>
      </AdminCard>
    </div>
  );
}
