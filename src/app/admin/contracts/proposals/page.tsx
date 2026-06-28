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
export const metadata = { title: "Proposals — Gov Contracts" };

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
        {p.opportunityRef && (
          <p className="mt-0.5 font-mono text-xs text-zinc-600">{p.opportunityRef}</p>
        )}
      </div>
    ),
  },
  {
    key: "type",
    header: "Track",
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
    key: "naics",
    header: "NAICS",
    render: (p) => (
      <span className="text-sm text-zinc-400">
        {p.naicsCodes?.slice(0, 2).join(", ") ?? "—"}
      </span>
    ),
    hideOnMobile: true,
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
    render: (p) => (
      <span className="text-sm text-zinc-400">{formatDate(p.expiresAt)}</span>
    ),
    hideOnMobile: true,
  },
];

export default async function AdminContractProposalsPage() {
  const govTypes: string[] = ["government-federal", "government-state", "government-local"];

  const [allGov, statsAll] = await Promise.all([
    proposalRepository.findAll({
      filters: [{ field: "type", operator: "in", value: govTypes }],
      sort: { field: "updatedAt", order: "desc" },
      perPage: 100,
    }),
    proposalRepository.getStats(),
  ]);

  const govItems = allGov.items;
  const stats = {
    total: govItems.length,
    inDevelopment: govItems.filter((p) => p.status === "draft" || p.status === "in-review").length,
    submitted: govItems.filter((p) => p.status === "sent").length,
    accepted: govItems.filter((p) => p.status === "accepted").length,
    totalValue: govItems.reduce((sum, p) => sum + (p.total ?? 0), 0),
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Government Proposals"
        description="Federal, state, and local proposal development workspace."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Total gov proposals" value={stats.total} />
        <AdminStatCard label="In development" value={stats.inDevelopment} hint="Draft + in review" />
        <AdminStatCard label="Submitted" value={stats.submitted} hint="Awaiting award" />
        <AdminStatCard label="Won" value={stats.accepted} hint="Accepted proposals" />
      </section>

      <AdminCard title={`${govItems.length} government proposal${govItems.length !== 1 ? "s" : ""}`} padded={false}>
        {govItems.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-zinc-500">No government proposals yet.</p>
            <p className="mt-1 text-xs text-zinc-600">
              Government proposals (federal, state, local) will appear here once created.
            </p>
          </div>
        ) : (
          <AdminTable columns={COLS} rows={govItems} getRowKey={(p) => p.id} />
        )}
      </AdminCard>

      <AdminCard title="Government Proposal Fields" description="Fields unique to gov proposals">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { field: "NAICS Code", note: "Primary code for the procurement" },
            { field: "PSC Code", note: "Product and Service Code" },
            { field: "Set-Aside Category", note: "SDVOSB, 8(a), small business, etc." },
            { field: "Solicitation Number", note: "RFP / RFQ reference number" },
            { field: "Pricing Strategy", note: "Fixed-price, T&M, NTE, IDIQ" },
            { field: "Compliance Notes", note: "FAR clauses and special requirements" },
            { field: "Past Performance Refs", note: "Authorized performance records" },
            { field: "Technical Approach", note: "Proposal section with methodology" },
          ].map(({ field, note }) => (
            <div key={field} className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3">
              <p className="text-sm font-semibold text-zinc-200">{field}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{note}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
