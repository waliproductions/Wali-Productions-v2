import { documentRepository } from "@/lib/repositories/document.repository";
import type { StoredDocument, DocumentCategory } from "@/lib/repositories/document.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Document Management" };

type Props = { searchParams?: Promise<{ category?: string; status?: string; q?: string }> };

const CAT_LABELS: Record<DocumentCategory, string> = {
  contract: "Contract",
  proposal: "Proposal",
  sow: "SOW",
  report: "Report",
  certificate: "Certificate",
  policy: "Policy",
  procedure: "Procedure",
  template: "Template",
  correspondence: "Correspondence",
  financial: "Financial",
  legal: "Legal",
  technical: "Technical",
  other: "Other",
};

const STATUS_VARIANT: Record<string, "success" | "info" | "neutral" | "warning" | "danger"> = {
  draft: "neutral",
  "in-review": "warning",
  approved: "success",
  rejected: "danger",
  superseded: "neutral",
  expired: "neutral",
  archived: "neutral",
};

const COLS: AdminTableColumn<StoredDocument>[] = [
  {
    key: "title",
    header: "Document",
    render: (d) => (
      <div>
        <p className="font-medium text-zinc-100">{d.title}</p>
        {d.description && <p className="mt-0.5 text-xs text-zinc-500 truncate max-w-xs">{d.description}</p>}
      </div>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (d) => <AdminBadge variant="neutral">{CAT_LABELS[d.category] ?? d.category}</AdminBadge>,
  },
  {
    key: "status",
    header: "Status",
    render: (d) => (
      <AdminBadge variant={STATUS_VARIANT[d.status] ?? "neutral"}>{d.status.replace(/-/g, " ")}</AdminBadge>
    ),
  },
  {
    key: "owner",
    header: "Owner",
    render: (d) => <span className="text-sm text-zinc-400">{d.ownerRole ?? "—"}</span>,
    hideOnMobile: true,
  },
  {
    key: "expires",
    header: "Expires",
    render: (d) => {
      if (!d.expiresAt) return <span className="text-zinc-600">—</span>;
      const soon = d.expiresAt < new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
      return (
        <span className={`text-sm ${soon ? "font-medium text-amber-300" : "text-zinc-400"}`}>
          {formatDate(d.expiresAt)}
        </span>
      );
    },
    hideOnMobile: true,
  },
  {
    key: "version",
    header: "Ver.",
    render: (d) => <span className="text-sm text-zinc-500">{d.currentVersion ?? "1.0"}</span>,
    hideOnMobile: true,
  },
  {
    key: "updated",
    header: "Updated",
    render: (d) => <span className="text-sm text-zinc-500">{formatDate(d.updatedAt)}</span>,
    hideOnMobile: true,
  },
];

export default async function AdminDocumentsPage({ searchParams }: Props) {
  const params = await searchParams;
  const categoryFilter = params?.category as DocumentCategory | undefined;
  const statusFilter = params?.status;
  const q = params?.q;

  const [stats, result, expiring, dueForReview] = await Promise.all([
    documentRepository.getStats(),
    documentRepository.findAll({
      search: q,
      filters: [
        ...(categoryFilter ? [{ field: "category", operator: "eq" as const, value: categoryFilter }] : []),
        ...(statusFilter ? [{ field: "status", operator: "eq" as const, value: statusFilter }] : []),
      ],
      sort: { field: "updatedAt", order: "desc" },
      perPage: 100,
    }),
    documentRepository.getExpiring(30),
    documentRepository.getDueForReview(30),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Document Management"
        description="Centralized document lifecycle — categories, versions, ownership, review dates, and approvals."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Total documents" value={stats.total} />
        <AdminStatCard label="Approved" value={stats.approved} />
        <AdminStatCard label="In review" value={stats.inReview} />
        <AdminStatCard
          label="Expiring (30d)"
          value={stats.expiringSoon}
          trend={stats.expiringSoon > 0 ? { value: "Action needed", direction: "down" } : undefined}
        />
      </section>

      {(expiring.length > 0 || dueForReview.length > 0) && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {expiring.length > 0 && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4">
              <p className="text-sm font-semibold text-red-300">
                {expiring.length} document{expiring.length !== 1 ? "s" : ""} expiring within 30 days
              </p>
              <ul className="mt-2 space-y-1">
                {expiring.slice(0, 3).map((d) => (
                  <li key={d.id} className="text-xs text-red-300/80">
                    {d.title} — expires {formatDate(d.expiresAt)}
                  </li>
                ))}
                {expiring.length > 3 && <li className="text-xs text-red-300/60">+{expiring.length - 3} more</li>}
              </ul>
            </div>
          )}
          {dueForReview.length > 0 && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
              <p className="text-sm font-semibold text-amber-300">
                {dueForReview.length} document{dueForReview.length !== 1 ? "s" : ""} due for review
              </p>
              <ul className="mt-2 space-y-1">
                {dueForReview.slice(0, 3).map((d) => (
                  <li key={d.id} className="text-xs text-amber-300/80">
                    {d.title} — review by {formatDate(d.nextReviewAt)}
                  </li>
                ))}
                {dueForReview.length > 3 && <li className="text-xs text-amber-300/60">+{dueForReview.length - 3} more</li>}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <form className="flex flex-wrap gap-2" method="GET">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search documents…"
          className="min-w-48 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-amber-400"
        />
        {(["", "contract", "proposal", "sow", "policy", "report", "certificate"] as const).map((cat) => (
          <button
            key={cat}
            type="submit"
            name="category"
            value={cat}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              (categoryFilter ?? "") === cat
                ? "border-amber-400 bg-amber-500/10 text-amber-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            {cat === "" ? "All" : CAT_LABELS[cat as DocumentCategory]}
          </button>
        ))}
      </form>

      <AdminCard title={`${result.total} document${result.total !== 1 ? "s" : ""}`} padded={false}>
        {result.items.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-zinc-500">No documents yet.</p>
            <p className="mt-1 text-xs text-zinc-600">Upload documents to track them through the approval lifecycle.</p>
          </div>
        ) : (
          <AdminTable columns={COLS} rows={result.items} getRowKey={(d) => d.id} />
        )}
      </AdminCard>

      {/* Category distribution */}
      {stats.total > 0 && (
        <AdminCard title="Documents by Category">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(Object.entries(stats.byCategory) as [DocumentCategory, number][])
              .sort(([, a], [, b]) => b - a)
              .map(([cat, count]) => (
                <div key={cat} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 text-center">
                  <p className="text-lg font-bold text-zinc-100">{count}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{CAT_LABELS[cat] ?? cat}</p>
                </div>
              ))}
          </div>
        </AdminCard>
      )}
    </div>
  );
}
