import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { taskRepository } from "@/lib/repositories";
import type { AdminTableColumn } from "@/lib/admin/types";
import type { StoredTask, TaskPriority, TaskStatus } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tasks" };

const PRIORITY_VARIANT: Record<TaskPriority, "danger" | "warning" | "info" | "neutral"> = {
  critical: "danger",
  high: "warning",
  medium: "info",
  low: "neutral",
};

const STATUS_VARIANT: Record<TaskStatus, "neutral" | "success" | "warning" | "danger" | "info" | "neutral"> = {
  backlog: "neutral",
  todo: "neutral",
  "in-progress": "info",
  "in-review": "warning",
  done: "success",
  cancelled: "neutral",
  blocked: "danger",
};

const columns: AdminTableColumn<StoredTask>[] = [
  {
    key: "title",
    header: "Task",
    render: (t) => (
      <div>
        <p className="text-sm font-medium text-zinc-200">{t.title}</p>
        {t.entityTitle && (
          <p className="text-xs text-zinc-500">{t.entityTitle}</p>
        )}
      </div>
    ),
  },
  {
    key: "priority",
    header: "Priority",
    render: (t) => (
      <AdminBadge variant={PRIORITY_VARIANT[t.priority]}>{t.priority}</AdminBadge>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (t) => (
      <AdminBadge variant={STATUS_VARIANT[t.status]}>{t.status}</AdminBadge>
    ),
  },
  {
    key: "assignee",
    header: "Assignee",
    hideOnMobile: true,
    render: (t) => (
      <span className="text-sm text-zinc-400">{t.assigneeName ?? "Unassigned"}</span>
    ),
  },
  {
    key: "due",
    header: "Due",
    hideOnMobile: true,
    render: (t) => {
      if (!t.dueDate) return <span className="text-sm text-zinc-600">—</span>;
      const isOverdue = t.dueDate < new Date().toISOString().slice(0, 10) &&
        t.status !== "done" && t.status !== "cancelled";
      return (
        <span className={`text-sm ${isOverdue ? "text-red-400" : "text-zinc-400"}`}>
          {t.dueDate}
        </span>
      );
    },
  },
];

const MODULES = [
  { label: "Active Tasks", href: "/admin/tasks/active", description: "All open and in-progress tasks" },
  { label: "Overdue", href: "/admin/tasks/overdue", description: "Past due date with no completion" },
  { label: "Templates", href: "/admin/tasks/templates", description: "Reusable task bundles" },
] as const;

export default async function AdminTasksPage() {
  const [stats, overdueTasks, recent] = await Promise.all([
    taskRepository.getStats(),
    taskRepository.getOverdue(),
    taskRepository.findAll({
      sort: { field: "createdAt", order: "desc" },
      perPage: 10,
    }),
  ]);

  const dueSoon = await taskRepository.getDueSoon(7);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Task Management"
        description="Cross-entity task tracking — projects, proposals, contracts, and operational work."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total tasks" value={String(stats.total)} />
        <AdminStatCard label="Open" value={String(stats.open)} hint="Not done or cancelled" />
        <AdminStatCard
          label="Overdue"
          value={String(stats.overdue)}
          hint="Past due date"
        />
        <AdminStatCard label="Due within 7d" value={String(dueSoon.length)} hint="Upcoming deadlines" />
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {MODULES.map(({ label, href, description }) => (
          <a
            key={href}
            href={href}
            className="group flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors hover:border-amber-400/40 hover:bg-zinc-900"
          >
            <p className="text-sm font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
              {label}
            </p>
            <p className="text-xs leading-relaxed text-zinc-500">{description}</p>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
        {(["critical", "high", "medium", "low"] as TaskPriority[]).map((p) => (
          <div key={p} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{stats.byPriority[p]}</p>
            <p className="mt-1 text-xs capitalize text-zinc-500">{p}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard title="Status Breakdown">
          <div className="space-y-2">
            {(Object.entries(stats.byStatus) as [TaskStatus, number][]).map(([status, count]) => {
              const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              return (
                <div key={status} className="flex items-center gap-3">
                  <div className="w-28 shrink-0">
                    <AdminBadge variant={STATUS_VARIANT[status]}>{status}</AdminBadge>
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-zinc-800">
                      <div
                        className="h-1.5 rounded-full bg-amber-500/60"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-xs text-zinc-500">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard title={`Overdue (${overdueTasks.length})`}>
          {overdueTasks.length === 0 ? (
            <AdminEmptyState compact title="No overdue tasks" description="All tasks are on schedule." />
          ) : (
            <div className="divide-y divide-zinc-800">
              {overdueTasks.slice(0, 5).map((t) => (
                <div key={t.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{t.title}</p>
                    <p className="text-xs text-red-400">Due {t.dueDate}</p>
                  </div>
                  <AdminBadge variant={PRIORITY_VARIANT[t.priority]}>{t.priority}</AdminBadge>
                </div>
              ))}
              {overdueTasks.length > 5 && (
                <p className="pt-3 text-xs text-zinc-600">+{overdueTasks.length - 5} more</p>
              )}
            </div>
          )}
        </AdminCard>
      </div>

      <AdminCard title="All Tasks">
        {recent.items.length === 0 ? (
          <AdminEmptyState
            title="No tasks yet"
            description="Tasks are created from projects, proposals, contracts, and manual entry. Each task can be assigned, scheduled, and linked to any entity."
          />
        ) : (
          <AdminTable columns={columns} rows={recent.items} getRowKey={(t) => t.id} />
        )}
      </AdminCard>
    </div>
  );
}
