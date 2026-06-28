import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Tasks — Operations" };

const CATEGORIES = [
  { label: "All tasks", value: "0", href: "/admin/operations/tasks" },
  { label: "High priority", value: "0", hint: "Urgent + high" },
  { label: "Blocked", value: "0", hint: "Needs resolution" },
  { label: "Done this week", value: "0", hint: "Completed" },
] as const;

const CATEGORY_LABELS = [
  "Client",
  "Proposal",
  "Project",
  "Admin",
  "Government",
  "Internal",
] as const;

export default function AdminTasksPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Tasks"
        description="Actionable work items across all operational categories."
        actions={
          <AdminButton href="/admin/operations" variant="ghost" size="md">
            Back to operations
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => (
          <AdminStatCard
            key={i}
            label={c.label}
            value={c.value}
            hint={"hint" in c ? c.hint : undefined}
            href={"href" in c ? c.href : undefined}
          />
        ))}
      </section>

      <AdminCard
        title="Open Tasks"
        description="Backlog, todo, in-progress, and blocked"
        actions={
          <div className="flex items-center gap-2">
            <AdminBadge variant="neutral">Coming soon</AdminBadge>
          </div>
        }
      >
        <AdminEmptyState
          title="No open tasks"
          description="Tasks will be created here once the task management system is active. Categories: client, proposal, project, admin, government, internal."
        />
      </AdminCard>

      <AdminCard title="Categories" description="Work breakdown by type">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CATEGORY_LABELS.map((cat) => (
            <div
              key={cat}
              className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3"
            >
              <span className="text-sm font-medium text-zinc-300">{cat}</span>
              <span className="text-sm text-zinc-600">0</span>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include" description="Planned capabilities">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Priority levels: low, medium, high, urgent",
            "Status workflow: backlog → todo → in-progress → done",
            "Category tagging: client, proposal, project, admin, gov, internal",
            "Due date tracking and overdue alerts",
            "Client and project associations",
            "Blocked status with resolution notes",
            "Task assignment and ownership",
            "Weekly completion reports",
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
