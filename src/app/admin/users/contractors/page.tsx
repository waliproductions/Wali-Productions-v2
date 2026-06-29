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
export const metadata = { title: "Contractors — Users" };

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
    key: "company",
    header: "Company",
    hideOnMobile: true,
    render: (u) => (
      <span className="text-sm text-zinc-400">{u.company ?? "—"}</span>
    ),
  },
  {
    key: "expires",
    header: "Access Expires",
    hideOnMobile: true,
    render: (u) => {
      if (!u.accessExpiresAt) return <span className="text-sm text-zinc-600">—</span>;
      const daysLeft = Math.ceil(
        (new Date(u.accessExpiresAt).getTime() - Date.now()) / 86400000,
      );
      return (
        <div>
          <p className="text-sm text-zinc-300">{u.accessExpiresAt}</p>
          {daysLeft <= 30 && daysLeft > 0 && (
            <p className="text-xs text-amber-400">{daysLeft}d remaining</p>
          )}
          {daysLeft <= 0 && <p className="text-xs text-red-400">Expired</p>}
        </div>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    render: (u) => (
      <AdminBadge variant={STATUS_VARIANT[u.status] ?? "neutral"}>{u.status}</AdminBadge>
    ),
  },
];

export default async function AdminContractorsPage() {
  const contractors = await userAccountRepository.findByType("contractor");
  const today = new Date().toISOString().slice(0, 10);
  const cutoff30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);

  const active = contractors.filter((u) => u.status === "active").length;
  const expiring = contractors.filter(
    (u) => u.accessExpiresAt && u.accessExpiresAt >= today && u.accessExpiresAt <= cutoff30,
  ).length;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contractors"
        description="External contractor accounts with time-limited, scoped access tied to active contract records."
        actions={
          <AdminButton href="/admin/users" variant="ghost" size="md">
            Back to users
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total contractors" value={String(contractors.length)} />
        <AdminStatCard label="Active" value={String(active)} hint="With current access" />
        <AdminStatCard label="Expiring within 30d" value={String(expiring)} hint="Access auto-revokes" />
        <AdminStatCard label="Companies" value={String(new Set(contractors.map((u) => u.company).filter(Boolean)).size)} hint="Distinct organizations" />
      </section>

      <AdminCard title="Contractor Registry">
        {contractors.length === 0 ? (
          <AdminEmptyState
            title="No contractors registered"
            description="Contractor accounts are created with an explicit access expiration date tied to a contract record. All contractor accounts require a sponsor and are scoped to their project."
          />
        ) : (
          <AdminTable columns={columns} rows={contractors} getRowKey={(u) => u.id} />
        )}
      </AdminCard>

      <AdminCard title="Contractor Access Policy">
        <ul className="space-y-2 text-sm text-zinc-400">
          {[
            "All contractor accounts must be linked to a contract record in /admin/contract-records.",
            "Every contractor account requires an internal sponsor (employee) responsible for access oversight.",
            "Access automatically expires at the contract end date — no manual revocation needed.",
            "Contractor accounts cannot be assigned the founder or admin roles.",
            "Contractor sessions are recorded in the security audit log.",
          ].map((policy, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/60" />
              {policy}
            </li>
          ))}
        </ul>
      </AdminCard>
    </div>
  );
}
