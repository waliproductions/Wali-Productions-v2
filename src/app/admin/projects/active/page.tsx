import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Active Projects — Projects" };

const PROJECT_STATUSES = [
  { status: "Proposal", description: "Awaiting proposal acceptance", count: 0 },
  { status: "Approved", description: "Proposal accepted, project setup in progress", count: 0 },
  { status: "Active", description: "In delivery", count: 0 },
  { status: "On Hold", description: "Paused — client or internal", count: 0 },
  { status: "Completed", description: "Delivered and closed", count: 0 },
  { status: "Cancelled", description: "Terminated before completion", count: 0 },
] as const;

export default function AdminActiveProjectsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Active Projects"
        description="All projects across the full delivery lifecycle."
        actions={
          <AdminButton href="/admin/projects" variant="ghost" size="md">
            Back to projects
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Active projects" value="0" hint="In delivery" />
        <AdminStatCard label="On track" value="0" hint="Green health" />
        <AdminStatCard label="At risk or blocked" value="0" hint="Needs attention" />
        <AdminStatCard label="Budget variance" value="—" hint="No data yet" />
      </section>

      <AdminCard
        title="Project Register"
        description="All projects by status"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No projects recorded"
          description="Projects are created from accepted proposals or contract awards. Each project tracks team assignments, milestones, deliverables, budget, and health."
        />
      </AdminCard>

      <AdminCard title="Project Status Breakdown">
        <div className="divide-y divide-zinc-800">
          {PROJECT_STATUSES.map(({ status, description, count }) => (
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

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Project health: on-track, at-risk, blocked",
            "Milestone tracking with payment linkage",
            "Deliverable schedule and status",
            "Team roster with role assignments",
            "WBS (work breakdown structure) support",
            "Budget: estimated vs. actual spend",
            "Contract and task order linkage",
            "Gov performance eligibility flag",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />
              {item}
            </li>
          ))}
        </ul>
      </AdminCard>
    </div>
  );
}
