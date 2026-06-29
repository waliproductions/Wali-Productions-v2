import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { userAccountRepository } from "@/lib/repositories";
import type { AdminTableColumn } from "@/lib/admin/types";
import type { StoredUserAccount } from "@/lib/repositories";
import { ROLE_LABELS } from "@/types/roles";

export const dynamic = "force-dynamic";
export const metadata = { title: "Employees — Users" };

const STATUS_VARIANT: Record<string, "neutral" | "success" | "warning" | "danger"> = {
  active: "success",
  inactive: "neutral",
  suspended: "danger",
  locked: "danger",
  "pending-verification": "warning",
  archived: "neutral",
};

const columns: AdminTableColumn<StoredUserAccount>[] = [
  {
    key: "name",
    header: "Name",
    render: (u) => (
      <div>
        <p className="text-sm font-medium text-zinc-200">{u.displayName}</p>
        <p className="text-xs text-zinc-500">{u.email}</p>
      </div>
    ),
  },
  {
    key: "title",
    header: "Title / Dept",
    hideOnMobile: true,
    render: (u) => (
      <div>
        <p className="text-sm text-zinc-300">{u.title ?? "—"}</p>
        <p className="text-xs text-zinc-500">{u.departmentName ?? "—"}</p>
      </div>
    ),
  },
  {
    key: "employment",
    header: "Type",
    hideOnMobile: true,
    render: (u) => (
      <span className="text-sm text-zinc-400 capitalize">{u.employmentType ?? "—"}</span>
    ),
  },
  {
    key: "roles",
    header: "Roles",
    hideOnMobile: true,
    render: (u) => (
      <div className="flex flex-wrap gap-1">
        {u.roles.slice(0, 2).map((r) => (
          <AdminBadge key={r} variant="info">
            {ROLE_LABELS[r] ?? r}
          </AdminBadge>
        ))}
        {u.roles.length > 2 && (
          <AdminBadge variant="neutral">+{u.roles.length - 2}</AdminBadge>
        )}
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (u) => (
      <AdminBadge variant={STATUS_VARIANT[u.status] ?? "neutral"}>
        {u.status}
      </AdminBadge>
    ),
  },
];

export default async function AdminEmployeesPage() {
  const employees = await userAccountRepository.findByType("employee");
  const active = employees.filter((u) => u.status === "active").length;
  const pending = employees.filter((u) => u.status === "pending-verification").length;
  const clearance = employees.filter((u) => u.clearanceLevel && u.clearanceLevel !== "none").length;

  const byType: Record<string, number> = { "full-time": 0, "part-time": 0, intern: 0 };
  for (const u of employees) {
    if (u.employmentType) byType[u.employmentType] = (byType[u.employmentType] ?? 0) + 1;
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Employees"
        description="Internal employee accounts — full-time, part-time, and intern platform access."
        actions={
          <AdminButton href="/admin/users" variant="ghost" size="md">
            Back to users
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total employees" value={String(employees.length)} />
        <AdminStatCard label="Active" value={String(active)} hint="With system access" />
        <AdminStatCard label="Pending verification" value={String(pending)} hint="Email unconfirmed" />
        <AdminStatCard label="Clearance holders" value={String(clearance)} hint="Gov clearance on file" />
      </section>

      <AdminCard title="Employee Directory">
        {employees.length === 0 ? (
          <AdminEmptyState
            title="No employees registered"
            description="Employee accounts are created during onboarding. Each account has an employment type, department, manager assignment, system roles, and an optional clearance level."
          />
        ) : (
          <AdminTable
            columns={columns}
            rows={employees}
            getRowKey={(u) => u.id}
          />
        )}
      </AdminCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard title="By Employment Type">
          <div className="divide-y divide-zinc-800">
            {[
              { type: "Full-time", key: "full-time", description: "Permanent salaried employees" },
              { type: "Part-time", key: "part-time", description: "Regular part-time staff" },
              { type: "Intern", key: "intern", description: "Time-limited training positions" },
            ].map(({ type, key, description }) => (
              <div key={type} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{type}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
                <span className="text-sm font-semibold text-zinc-400">{byType[key] ?? 0}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Onboarding Checklist" description="Steps completed during account provisioning">
          <ul className="space-y-2 text-sm text-zinc-400">
            {[
              "Email invitation sent",
              "Account created and email verified",
              "System roles assigned by admin",
              "Department and manager linkage confirmed",
              "Clearance level recorded (if applicable)",
              "Onboarding completion recorded",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-500">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </div>
  );
}
