import { projectRepository } from "@/lib/repositories/project.repository";
import type { StoredProject } from "@/lib/repositories/project.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Active Projects" };

function budgetPercent(spent?: number, budget?: number): number | null {
  if (!spent || !budget || budget === 0) return null;
  return Math.round((spent / budget) * 100);
}

function ProjectDetail({ project }: { project: StoredProject }) {
  const milestones = project.milestones ?? [];
  const completedMs = milestones.filter((m) => m.status === "completed").length;
  const openRisks = (project.risks ?? []).filter((r) => r.status === "open").length;
  const bPct = budgetPercent(project.actualSpend, project.estimatedBudget);

  const healthColor =
    project.health === "on-track"
      ? "border-emerald-500/30 bg-emerald-500/5"
      : project.health === "at-risk"
        ? "border-amber-500/30 bg-amber-500/5"
        : project.health === "blocked"
          ? "border-red-500/30 bg-red-500/5"
          : "border-zinc-700";

  return (
    <div className={`rounded-xl border ${healthColor} p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-zinc-100">{project.title}</p>
          {project.description && (
            <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{project.description}</p>
          )}
        </div>
        <AdminBadge
          variant={
            project.health === "on-track"
              ? "success"
              : project.health === "at-risk"
                ? "warning"
                : "danger"
          }
        >
          {project.health.replace(/-/g, " ")}
        </AdminBadge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Status", value: project.status },
          { label: "Start", value: formatDate(project.startDate) },
          { label: "Target", value: formatDate(project.targetDate) },
          { label: "ID", value: project.id },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="mt-0.5 text-sm font-medium text-zinc-200 capitalize">{value}</p>
          </div>
        ))}
      </div>

      {/* Milestones */}
      {milestones.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Milestones ({completedMs}/{milestones.length})
          </p>
          <div className="space-y-1.5">
            {milestones.map((m) => (
              <div key={m.id} className="flex items-center gap-2 text-sm">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    m.status === "completed"
                      ? "bg-emerald-500"
                      : m.status === "in-progress"
                        ? "bg-amber-400"
                        : m.status === "delayed"
                          ? "bg-red-400"
                          : "bg-zinc-600"
                  }`}
                />
                <span className={m.status === "completed" ? "text-zinc-500 line-through" : "text-zinc-300"}>
                  {m.title}
                </span>
                {m.dueDate && (
                  <span className="ml-auto text-xs text-zinc-600">{formatDate(m.dueDate)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Budget bar */}
      {bPct !== null && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span>Budget utilization</span>
            <span>{bPct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className={`h-full rounded-full ${bPct > 90 ? "bg-red-500" : bPct > 70 ? "bg-amber-400" : "bg-emerald-500"}`}
              style={{ width: `${Math.min(100, bPct)}%` }}
            />
          </div>
        </div>
      )}

      {openRisks > 0 && (
        <div className="mt-3">
          <AdminBadge variant="warning">{openRisks} open risk{openRisks !== 1 ? "s" : ""}</AdminBadge>
        </div>
      )}
    </div>
  );
}

export default async function AdminActiveProjectsPage() {
  const [stats, result] = await Promise.all([
    projectRepository.getStats(),
    projectRepository.findAll({
      filters: [{ field: "status", operator: "eq", value: "active" }],
      sort: { field: "updatedAt", order: "desc" },
      perPage: 50,
    }),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Active Projects"
        description="Projects currently in delivery — milestones, health, and budget status."
        actions={
          <AdminButton href="/admin/projects" variant="ghost" size="md">
            Back to Projects
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Active" value={stats.active} />
        <AdminStatCard label="At risk" value={stats.atRisk} trend={stats.atRisk > 0 ? { value: "Needs review", direction: "down" } : undefined} />
        <AdminStatCard label="Open risks" value={stats.openRisks} href="/admin/projects/risks" />
        <AdminStatCard label="Milestones due" value={stats.upcomingMilestones} hint="Next 14 days" />
      </section>

      {result.items.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-12 text-center">
          <p className="text-zinc-400">No active projects. Projects appear here once started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {result.items.map((p) => (
            <ProjectDetail key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
