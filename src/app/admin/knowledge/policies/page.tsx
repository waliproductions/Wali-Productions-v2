import { knowledgeRepository } from "@/lib/repositories/knowledge.repository";
import type { StoredKnowledgeEntry } from "@/lib/repositories/knowledge.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Policies — Knowledge Base" };

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
    header: "Policy",
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
    key: "status",
    header: "Status",
    render: (e) => (
      <AdminBadge variant={STATUS_VARIANT[e.status] ?? "neutral"}>{e.status}</AdminBadge>
    ),
  },
  {
    key: "owner",
    header: "Owner",
    render: (e) => <span className="text-sm text-zinc-400">{e.ownerRole ?? "—"}</span>,
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
    render: (e) => <span className="text-sm text-zinc-500">{formatDate(e.updatedAt)}</span>,
    hideOnMobile: true,
  },
];

export default async function AdminPoliciesPage() {
  const policies = await knowledgeRepository.findByCategory("policy");
  const today = new Date().toISOString().slice(0, 10);

  const stats = {
    total: policies.length,
    approved: policies.filter((e) => e.status === "approved").length,
    draft: policies.filter((e) => e.status === "draft").length,
    dueForReview: policies.filter((e) => e.nextReviewAt && e.nextReviewAt <= today).length,
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Policies"
        description="Company policies governing operations, client relationships, and compliance."
        actions={
          <AdminButton href="/admin/knowledge" variant="ghost" size="md">
            Knowledge Base
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Total policies" value={stats.total} />
        <AdminStatCard label="Approved" value={stats.approved} />
        <AdminStatCard label="Drafts" value={stats.draft} />
        <AdminStatCard
          label="Due for review"
          value={stats.dueForReview}
          trend={stats.dueForReview > 0 ? { value: "Review needed", direction: "down" } : undefined}
        />
      </section>

      <AdminCard title={`${policies.length} polic${policies.length !== 1 ? "ies" : "y"}`} padded={false}>
        {policies.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-zinc-500">No policies documented yet.</p>
            <p className="mt-1 text-xs text-zinc-600">
              Add knowledge entries with category &ldquo;policy&rdquo; to see them here.
            </p>
          </div>
        ) : (
          <AdminTable columns={COLS} rows={policies} getRowKey={(e) => e.id} />
        )}
      </AdminCard>
    </div>
  );
}
