import { proposalRepository } from "@/lib/repositories/proposal.repository";
import type { StoredProposal } from "@/lib/repositories/proposal.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Proposals Pipeline — Operations" };

function currency(n?: number) {
  if (!n) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

const STATUS_VARIANT: Record<string, "success" | "info" | "neutral" | "warning" | "danger"> = {
  draft: "neutral",
  "in-review": "warning",
  sent: "info",
  accepted: "success",
  rejected: "danger",
  expired: "neutral",
  revised: "warning",
  withdrawn: "neutral",
};

const TYPE_LABEL: Record<string, string> = {
  commercial: "Commercial",
  "government-federal": "Federal",
  "government-state": "State",
  "government-local": "Local",
};

const COLS: AdminTableColumn<StoredProposal>[] = [
  {
    key: "title",
    header: "Proposal",
    render: (p) => (
      <div>
        <p className="font-medium text-zinc-100">{p.title}</p>
        {p.clientName && <p className="mt-0.5 text-xs text-zinc-500">{p.clientName}</p>}
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    render: (p) => (
      <AdminBadge variant="neutral">{TYPE_LABEL[p.type] ?? p.type}</AdminBadge>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (p) => (
      <AdminBadge variant={STATUS_VARIANT[p.status] ?? "neutral"}>{p.status.replace(/-/g, " ")}</AdminBadge>
    ),
  },
  {
    key: "total",
    header: "Value",
    render: (p) => <span className="text-sm font-medium text-zinc-300">{currency(p.total)}</span>,
    hideOnMobile: true,
  },
  {
    key: "expires",
    header: "Expires",
    render: (p) => {
      if (!p.expiresAt) return <span className="text-zinc-600">—</span>;
      const soon = p.expiresAt < new Date(Date.now() + 14 * 86400000).toISOString();
      return (
        <span className={`text-sm ${soon && p.status === "sent" ? "text-amber-300 font-medium" : "text-zinc-400"}`}>
          {formatDate(p.expiresAt)}
        </span>
      );
    },
    hideOnMobile: true,
  },
  {
    key: "updated",
    header: "Updated",
    render: (p) => <span className="text-sm text-zinc-500">{formatDate(p.updatedAt)}</span>,
    hideOnMobile: true,
  },
];

export default async function AdminProposalsPipelinePage() {
  const [stats, result, expiring] = await Promise.all([
    proposalRepository.getStats(),
    proposalRepository.findAll({
      filters: [{ field: "status", operator: "neq", value: "rejected" }],
      sort: { field: "updatedAt", order: "desc" },
      perPage: 50,
    }),
    proposalRepository.getExpiringProposals(14),
  ]);

  const byStage = [
    { stage: "Draft", count: stats.drafts },
    { stage: "In Review", count: stats.inReview },
    { stage: "Sent", count: stats.sent },
    { stage: "Accepted", count: stats.accepted },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Proposals Pipeline"
        description="Track all proposals from draft through close across commercial and government work."
        actions={
          <AdminButton href="/admin/operations" variant="ghost" size="md">
            Operations
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Total proposals" value={stats.total} />
        <AdminStatCard label="In drafting" value={stats.drafts + stats.inReview} hint="Draft + in review" />
        <AdminStatCard label="Sent / active" value={stats.sent} hint="Awaiting response" />
        <AdminStatCard
          label="Total value"
          value={currency(stats.totalValue)}
          hint="All non-rejected"
        />
      </section>

      {expiring.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
          <p className="text-sm font-semibold text-amber-300">
            {expiring.length} proposal{expiring.length !== 1 ? "s" : ""} expiring within 14 days
          </p>
          <ul className="mt-2 space-y-1">
            {expiring.map((p) => (
              <li key={p.id} className="text-xs text-amber-300/80">
                {p.title} — expires {formatDate(p.expiresAt)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <AdminCard title={`${result.total} proposal${result.total !== 1 ? "s" : ""}`} padded={false}>
        {result.items.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-zinc-500">No proposals yet.</p>
            <p className="mt-1 text-xs text-zinc-600">
              Create a proposal to start tracking it through the pipeline.
            </p>
          </div>
        ) : (
          <AdminTable columns={COLS} rows={result.items} getRowKey={(p) => p.id} />
        )}
      </AdminCard>

      <AdminCard title="Stage Breakdown" description="Pipeline distribution by stage">
        <div className="divide-y divide-zinc-800">
          {byStage.map(({ stage, count }) => (
            <div
              key={stage}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <p className="text-sm font-medium text-zinc-200">{stage}</p>
              <span className="text-sm font-semibold text-zinc-400">{count}</span>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
