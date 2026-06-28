import { projectRepository } from "@/lib/repositories/project.repository";
import type { Deliverable } from "@/types/project";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Deliverables — Projects" };

type DeliverableWithProject = Deliverable & { projectId: string; projectTitle: string };

const STATUS_VARIANT = {
  pending: "neutral" as const,
  "in-progress": "info" as const,
  "in-review": "warning" as const,
  approved: "success" as const,
  rejected: "danger" as const,
};

export default async function AdminDeliverablesPage() {
  const result = await projectRepository.findAll({ perPage: 100 });

  const allDeliverables: DeliverableWithProject[] = result.items.flatMap((p) =>
    (p.deliverables ?? []).map((d) => ({
      ...d,
      projectId: p.id,
      projectTitle: p.title,
    })),
  );

  const stats = {
    total: allDeliverables.length,
    pending: allDeliverables.filter((d) => d.status === "pending").length,
    inProgress: allDeliverables.filter((d) => d.status === "in-progress").length,
    inReview: allDeliverables.filter((d) => d.status === "in-review").length,
    approved: allDeliverables.filter((d) => d.status === "approved").length,
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Deliverables"
        description="All project deliverables across active engagements."
        actions={
          <AdminButton href="/admin/projects" variant="ghost" size="md">
            Back to Projects
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Total" value={stats.total} />
        <AdminStatCard label="In Progress" value={stats.inProgress} />
        <AdminStatCard label="In Review" value={stats.inReview} trend={stats.inReview > 0 ? { value: "Awaiting approval", direction: "neutral" } : undefined} />
        <AdminStatCard label="Approved" value={stats.approved} />
      </section>

      <AdminCard title="All Deliverables">
        {allDeliverables.length === 0 ? (
          <p className="text-sm text-zinc-600">
            No deliverables configured. Add deliverables to projects to track them here.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-800/60">
            {allDeliverables.map((d) => (
              <li key={`${d.projectId}-${d.id}`} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{d.title}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{d.projectTitle}</p>
                    {d.description && (
                      <p className="mt-1 text-xs text-zinc-400">{d.description}</p>
                    )}
                  </div>
                  <AdminBadge variant={STATUS_VARIANT[d.status] ?? "neutral"}>
                    {d.status.replace(/-/g, " ")}
                  </AdminBadge>
                </div>
                {d.dueDate && (
                  <p className="mt-1 text-xs text-zinc-500">Due {formatDate(d.dueDate)}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  );
}
