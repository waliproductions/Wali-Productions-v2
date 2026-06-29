import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { userAccountRepository } from "@/lib/repositories";
import type { AdminTableColumn } from "@/lib/admin/types";
import type { StoredUserAccount } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "Client Access — Users" };

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
    header: "Client",
    render: (u) => (
      <div>
        <p className="text-sm font-medium text-zinc-200">{u.displayName}</p>
        <p className="text-xs text-zinc-500">{u.email}</p>
      </div>
    ),
  },
  {
    key: "org",
    header: "Organization",
    hideOnMobile: true,
    render: (u) => <span className="text-sm text-zinc-400">{u.company ?? "—"}</span>,
  },
  {
    key: "projects",
    header: "Projects",
    hideOnMobile: true,
    render: (u) => (
      <span className="text-sm text-zinc-400">{u.clientProjectIds?.length ?? 0} linked</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (u) => (
      <AdminBadge variant={STATUS_VARIANT[u.status] ?? "neutral"}>{u.status}</AdminBadge>
    ),
  },
];

const PORTAL_ROLES = [
  {
    role: "Owner",
    description: "Full client portal access — all projects, invoices, contracts, and approvals",
  },
  {
    role: "Stakeholder",
    description: "Project progress, deliverables, and status updates. No financial data.",
  },
  {
    role: "Approver",
    description: "Can approve deliverables and milestones. Typically the contracting authority.",
  },
  {
    role: "Viewer",
    description: "Read-only access to assigned project content only",
  },
] as const;

export default async function AdminClientAccessPage() {
  const clients = await userAccountRepository.findByType("client");
  const active = clients.filter((u) => u.status === "active").length;
  const pending = clients.filter((u) => u.status === "pending-verification").length;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Client Portal Access"
        description="Client accounts for portal access — project visibility, deliverable approvals, and file access."
        actions={
          <AdminButton href="/admin/users" variant="ghost" size="md">
            Back to users
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Client accounts" value={String(clients.length)} />
        <AdminStatCard label="Active" value={String(active)} hint="Can currently log in" />
        <AdminStatCard label="Pending" value={String(pending)} hint="Email unverified" />
        <AdminStatCard
          label="Organizations"
          value={String(new Set(clients.map((u) => u.company).filter(Boolean)).size)}
          hint="Distinct orgs"
        />
      </section>

      <AdminCard title="Client Account Registry">
        {clients.length === 0 ? (
          <AdminEmptyState
            title="No client accounts configured"
            description="Client portal accounts are created when a project begins. Each account is scoped to a specific client record and grants access only to that client's projects, deliverables, and communications."
          />
        ) : (
          <AdminTable columns={columns} rows={clients} getRowKey={(u) => u.id} />
        )}
      </AdminCard>

      <AdminCard title="Portal Roles" description="What each client role can access">
        <div className="divide-y divide-zinc-800">
          {PORTAL_ROLES.map(({ role, description }) => (
            <div key={role} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-zinc-200">{role}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
