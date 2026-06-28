import { knowledgeRepository } from "@/lib/repositories/knowledge.repository";
import type { StoredKnowledgeEntry } from "@/lib/repositories/knowledge.repository";
import type { KnowledgeCategory } from "@/types/knowledge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Knowledge Base" };

type Props = { searchParams?: Promise<{ category?: string; status?: string; q?: string }> };

const CAT_LABELS: Record<KnowledgeCategory, string> = {
  sop: "SOP",
  policy: "Policy",
  standard: "Standard",
  template: "Template",
  manual: "Manual",
  playbook: "Playbook",
};

const STATUS_VARIANT: Record<string, "success" | "info" | "neutral" | "warning"> = {
  approved: "success",
  review: "warning",
  draft: "neutral",
  archived: "neutral",
  superseded: "neutral",
};

const COLS: AdminTableColumn<StoredKnowledgeEntry>[] = [
  {
    key: "title",
    header: "Document",
    render: (e) => (
      <div>
        <p className="font-medium text-zinc-100">{e.title}</p>
        {e.description && (
          <p className="mt-0.5 text-xs text-zinc-500 truncate max-w-xs">{e.description}</p>
        )}
      </div>
    ),
  },
  {
    key: "category",
    header: "Type",
    render: (e) => (
      <AdminBadge variant="neutral">{CAT_LABELS[e.category]}</AdminBadge>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (e) => (
      <AdminBadge variant={STATUS_VARIANT[e.status] ?? "neutral"}>{e.status}</AdminBadge>
    ),
  },
  {
    key: "owner",
    header: "Owner",
    render: (e) => (
      <span className="text-sm text-zinc-400">{e.ownerRole ?? "—"}</span>
    ),
    hideOnMobile: true,
  },
  {
    key: "review",
    header: "Next Review",
    render: (e) => {
      if (!e.nextReviewAt) return <span className="text-zinc-600">—</span>;
      const overdue = e.nextReviewAt < new Date().toISOString().slice(0, 10);
      return (
        <span className={`text-sm ${overdue ? "font-medium text-amber-300" : "text-zinc-400"}`}>
          {formatDate(e.nextReviewAt)}
        </span>
      );
    },
    hideOnMobile: true,
  },
  {
    key: "updated",
    header: "Updated",
    render: (e) => (
      <span className="text-sm text-zinc-500">{formatDate(e.updatedAt)}</span>
    ),
    hideOnMobile: true,
  },
];

export default async function AdminKnowledgePage({ searchParams }: Props) {
  const params = await searchParams;
  const categoryFilter = params?.category as KnowledgeCategory | undefined;
  const statusFilter = params?.status;
  const q = params?.q;

  const [stats, result, dueForReview] = await Promise.all([
    knowledgeRepository.getStats(),
    knowledgeRepository.findAll({
      search: q,
      filters: [
        ...(categoryFilter ? [{ field: "category", operator: "eq" as const, value: categoryFilter }] : []),
        ...(statusFilter ? [{ field: "status", operator: "eq" as const, value: statusFilter }] : []),
      ],
      sort: { field: "updatedAt", order: "desc" },
      perPage: 100,
    }),
    knowledgeRepository.getDueForReview(),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Knowledge Base"
        description="SOPs, policies, standards, templates, and internal documentation."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Total documents" value={stats.total} />
        <AdminStatCard label="Approved" value={stats.approved} />
        <AdminStatCard label="Drafts" value={stats.draftCount} />
        <AdminStatCard
          label="Due for review"
          value={stats.dueForReview}
          trend={stats.dueForReview > 0 ? { value: "Review needed", direction: "down" } : undefined}
        />
      </section>

      {/* Review callout */}
      {dueForReview.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
          <p className="text-sm font-semibold text-amber-300">
            {dueForReview.length} document{dueForReview.length !== 1 ? "s" : ""} due for review
          </p>
          <ul className="mt-2 space-y-1">
            {dueForReview.slice(0, 3).map((e) => (
              <li key={e.id} className="text-xs text-amber-300/80">
                {e.title} — due {formatDate(e.nextReviewAt)}
              </li>
            ))}
            {dueForReview.length > 3 && (
              <li className="text-xs text-amber-300/60">+{dueForReview.length - 3} more</li>
            )}
          </ul>
        </div>
      )}

      {/* Filters */}
      <form className="flex flex-wrap gap-2" method="GET">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search knowledge base…"
          className="min-w-48 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-amber-400"
        />
        {(["", "sop", "policy", "standard", "template"] as const).map((cat) => (
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
            {cat === "" ? "All" : CAT_LABELS[cat as KnowledgeCategory]}
          </button>
        ))}
      </form>

      <AdminCard title={`${result.total} document${result.total !== 1 ? "s" : ""}`} padded={false}>
        <AdminTable
          columns={COLS}
          rows={result.items}
          getRowKey={(e) => e.id}
        />
      </AdminCard>

      {/* Sub-pages */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "SOPs", href: "/admin/knowledge/sops", count: stats.byCategory?.sop ?? 0 },
          { label: "Policies", href: "/admin/knowledge/policies", count: stats.byCategory?.policy ?? 0 },
          { label: "Standards", href: "/admin/knowledge/standards", count: stats.byCategory?.standard ?? 0 },
          { label: "Templates", href: "/admin/knowledge/templates", count: stats.byCategory?.template ?? 0 },
        ].map(({ label, href, count }) => (
          <AdminStatCard key={href} label={label} value={count} href={href} />
        ))}
      </div>
    </div>
  );
}
