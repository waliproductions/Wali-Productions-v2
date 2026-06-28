import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Deliverables — Projects" };

const DELIVERABLE_STATUSES = [
  { status: "Pending", description: "Not yet started", count: 0 },
  { status: "In Progress", description: "Currently in development", count: 0 },
  { status: "In Review", description: "Internal review before submission", count: 0 },
  { status: "Approved", description: "Client or government accepted", count: 0 },
  { status: "Rejected", description: "Returned for revision", count: 0 },
] as const;

export default function AdminProjectDeliverablesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Project Deliverables"
        description="Cross-project deliverable tracker — all work products due to clients."
        actions={
          <AdminButton href="/admin/projects" variant="ghost" size="md">
            Back to projects
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total deliverables" value="0" />
        <AdminStatCard label="Due this month" value="0" hint="Client-facing" />
        <AdminStatCard label="In review" value="0" hint="Awaiting approval" />
        <AdminStatCard label="Overdue" value="0" hint="Past due date" />
      </section>

      <AdminCard
        title="Deliverable Tracker"
        description="All project deliverables by status"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No deliverables tracked"
          description="Project deliverables will appear here once projects are active. Deliverables can be linked to milestones and customer approval workflows."
        />
      </AdminCard>

      <AdminCard title="Deliverable Status Breakdown">
        <div className="divide-y divide-zinc-800">
          {DELIVERABLE_STATUSES.map(({ status, description, count }) => (
            <div
              key={status}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-zinc-200">{status}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              </div>
              <span className="text-sm font-semibold text-zinc-400">{count}</span>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
