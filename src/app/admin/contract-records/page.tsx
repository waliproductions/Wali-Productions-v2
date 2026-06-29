import { contractRepository } from "@/lib/repositories/contract.repository";
import type { StoredContract, ContractType, ContractStatus } from "@/lib/repositories/contract.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contract Records" };

function currency(n?: number) {
  if (!n) return "—";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

const TYPE_LABELS: Record<ContractType, string> = {
  prime: "Prime",
  subcontract: "Sub",
  idiq: "IDIQ",
  bpa: "BPA",
  "task-order": "Task Order",
  "delivery-order": "DO",
  other: "Other",
};

const STATUS_VARIANT: Record<ContractStatus, "success" | "info" | "neutral" | "warning" | "danger"> = {
  draft: "neutral",
  "pending-award": "warning",
  active: "success",
  completed: "neutral",
  terminated: "danger",
  expired: "neutral",
  suspended: "warning",
};

const COLS: AdminTableColumn<StoredContract>[] = [
  {
    key: "contract",
    header: "Contract",
    render: (c) => (
      <div>
        <p className="font-medium text-zinc-100">{c.title}</p>
        <p className="mt-0.5 font-mono text-xs text-zinc-500">{c.contractNumber}</p>
        {c.awardingAgency && <p className="text-xs text-zinc-600">{c.awardingAgency}</p>}
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    render: (c) => <AdminBadge variant="neutral">{TYPE_LABELS[c.type] ?? c.type}</AdminBadge>,
  },
  {
    key: "status",
    header: "Status",
    render: (c) => (
      <AdminBadge variant={STATUS_VARIANT[c.status] ?? "neutral"}>{c.status}</AdminBadge>
    ),
  },
  {
    key: "value",
    header: "Value",
    render: (c) => (
      <div>
        <p className="text-sm font-medium text-zinc-200">{currency(c.currentValue)}</p>
        {c.ceilingValue && c.ceilingValue !== c.currentValue && (
          <p className="text-xs text-zinc-600">ceiling {currency(c.ceilingValue)}</p>
        )}
      </div>
    ),
    hideOnMobile: true,
  },
  {
    key: "end",
    header: "End Date",
    render: (c) => {
      if (!c.endDate) return <span className="text-zinc-600">—</span>;
      const soon = c.endDate < new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10);
      return (
        <span className={`text-sm ${soon && c.status === "active" ? "font-medium text-amber-300" : "text-zinc-400"}`}>
          {formatDate(c.endDate)}
        </span>
      );
    },
    hideOnMobile: true,
  },
  {
    key: "deliverables",
    header: "Deliverables",
    render: (c) => {
      const pending = (c.deliverables ?? []).filter(
        (d) => d.status === "pending" || d.status === "in-progress"
      ).length;
      const overdue = (c.deliverables ?? []).filter((d) => d.status === "overdue").length;
      if (!pending && !overdue) return <span className="text-zinc-600">—</span>;
      return (
        <div className="flex flex-col gap-0.5">
          {pending > 0 && <span className="text-xs text-zinc-400">{pending} pending</span>}
          {overdue > 0 && <span className="text-xs font-medium text-red-300">{overdue} overdue</span>}
        </div>
      );
    },
    hideOnMobile: true,
  },
];

export default async function AdminContractRecordsPage() {
  const [stats, result] = await Promise.all([
    contractRepository.getStats(),
    contractRepository.findAll({
      sort: { field: "updatedAt", order: "desc" },
      perPage: 100,
    }),
  ]);

  const activeContracts = result.items.filter((c) => c.status === "active");

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contract Records"
        description="Post-award contract lifecycle — prime contracts, task orders, deliverables, and invoices."
        actions={
          <>
            <AdminButton href="/admin/contracts" variant="outline" size="md">
              Gov Contracting
            </AdminButton>
            <AdminButton href="/admin" variant="ghost" size="md">
              Dashboard
            </AdminButton>
          </>
        }
      />

      <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/20 px-5 py-4">
        <p className="text-sm font-semibold text-zinc-300">Post-award management</p>
        <p className="mt-1 text-xs text-zinc-500">
          This section manages contract performance after award. Pre-award capture and proposals are in{" "}
          <a href="/admin/contracts" className="text-amber-400/80 underline hover:text-amber-400">
            Gov Contracting
          </a>
          .
        </p>
      </div>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <AdminStatCard label="Total contracts" value={stats.total} />
        <AdminStatCard label="Active" value={stats.active} hint="In performance" />
        <AdminStatCard
          label="Contract value"
          value={currency(stats.totalCurrentValue)}
          hint="Current total"
        />
        <AdminStatCard
          label="Invoiced to date"
          value={currency(stats.totalInvoiced)}
        />
        <AdminStatCard
          label="Open invoices"
          value={stats.openInvoices}
          hint={currency(stats.openInvoiceValue)}
          trend={stats.openInvoices > 0 ? { value: "Awaiting payment", direction: "up" } : undefined}
        />
        <AdminStatCard
          label="Overdue deliverables"
          value={stats.overdueDeliverables}
          trend={stats.overdueDeliverables > 0 ? { value: "Action needed", direction: "down" } : undefined}
        />
      </section>

      {stats.expiringThisMonth > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
          <p className="text-sm font-semibold text-amber-300">
            {stats.expiringThisMonth} contract{stats.expiringThisMonth !== 1 ? "s" : ""} expire this month
          </p>
          <p className="mt-1 text-xs text-amber-300/70">
            Review option exercise or closeout procedures for contracts ending this month.
          </p>
        </div>
      )}

      <AdminCard
        title={`${result.total} contract record${result.total !== 1 ? "s" : ""}`}
        padded={false}
      >
        {result.items.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-zinc-500">No contracts recorded yet.</p>
            <p className="mt-1 text-xs text-zinc-600">
              Create a contract record when a contract is awarded. Link it to the capture record and project.
            </p>
          </div>
        ) : (
          <AdminTable columns={COLS} rows={result.items} getRowKey={(c) => c.id} />
        )}
      </AdminCard>

      {activeContracts.length > 0 && stats.pendingDeliverables > 0 && (
        <AdminCard title="Pending Deliverables">
          <ul className="divide-y divide-zinc-800">
            {activeContracts.flatMap((c) =>
              (c.deliverables ?? [])
                .filter((d) => d.status === "pending" || d.status === "in-progress" || d.status === "overdue")
                .map((d) => (
                  <li key={d.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{d.title}</p>
                      <p className="text-xs text-zinc-500">{c.title} · {c.contractNumber}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <AdminBadge variant={d.status === "overdue" ? "danger" : "info"}>
                        {d.status}
                      </AdminBadge>
                      {d.dueDate && (
                        <span className="text-xs text-zinc-500">{formatDate(d.dueDate)}</span>
                      )}
                    </div>
                  </li>
                ))
            )}
          </ul>
        </AdminCard>
      )}

      <AdminCard title="Contract Lifecycle" description="Four-phase performance model">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { phase: "Capture", desc: "Market research, bid/no-bid, teaming", link: "/admin/contracts/capture" },
            { phase: "Pre-Award", desc: "Proposal development, pricing, submission", link: "/admin/contracts" },
            { phase: "Performance", desc: "Task orders, deliverables, invoices, mods", link: null },
            { phase: "Closeout", desc: "Final invoice, performance record, lessons learned", link: "/admin/projects/lessons" },
          ].map(({ phase, desc, link }) => (
            <div key={phase} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-sm font-bold text-amber-400">{phase}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{desc}</p>
              {link && (
                <a href={link} className="mt-2 block text-xs text-zinc-600 hover:text-amber-400">
                  Go →
                </a>
              )}
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
