import { projectRepository } from "@/lib/repositories/project.repository";
import type { StoredProject } from "@/lib/repositories/project.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projects" };

const HEALTH_CONFIG = {
  "on-track": { label: "On Track", dot: "bg-emerald-500", badge: "success" as const },
  "at-risk": { label: "At Risk", dot: "bg-amber-500", badge: "warning" as const },
  blocked: { label: "Blocked", dot: "bg-red-500", badge: "danger" as const },
  completed: { label: "Completed", dot: "bg-zinc-600", badge: "neutral" as const },
};

function ProjectRow({ project }: { project: StoredProject }) {
  const health = HEALTH_CONFIG[project.health] ?? HEALTH_CONFIG["on-track"];
  const openRisks = (project.risks ?? []).filter((r) => r.status === "open").length;
  const milestones = project.milestones ?? [];
  const completed = milestones.filter((m) => m.status === "completed").length;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-zinc-100 truncate">{project.title}</p>
          {project.description && (
            <p className="mt-0.5 text-xs text-zinc-500 line-clamp-2">{project.description}</p>
          )}
        </div>
        <AdminBadge variant={health.badge}>{health.label}</AdminBadge>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-500">
        {project.startDate && (
          <span>Started {formatDate(project.startDate)}</span>
        )}
        {project.targetDate && (
          <span>Target {formatDate(project.targetDate)}</span>
        )}
        {milestones.length > 0 && (
          <span>{completed}/{milestones.length} milestones</span>
        )}
        {openRisks > 0 && (
          <span className="text-amber-300">{openRisks} open risk{openRisks !== 1 ? "s" : ""}</span>
        )}
      </div>

      {(project.servicesPerformed ?? []).length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {(project.servicesPerformed ?? []).slice(0, 3).map((s) => (
            <AdminBadge key={s} variant="neutral">{s}</AdminBadge>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function AdminProjectsPage() {
  const [stats, result] = await Promise.all([
    projectRepository.getStats(),
    projectRepository.findAll({
      sort: { field: "updatedAt", order: "desc" },
      perPage: 100,
    }),
  ]);

  const active = result.items.filter((p) => p.status === "active");
  const planning = result.items.filter((p) => p.status === "proposal" || p.status === "approved");
  const completed = result.items.filter((p) => p.status === "completed");

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Projects"
        description="Project delivery hub — milestones, deliverables, risks, and health tracking."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <AdminStatCard label="Active" value={stats.active} hint="In delivery" href="/admin/projects/active" />
        <AdminStatCard label="At risk" value={stats.atRisk} hint="Needs attention" trend={stats.atRisk > 0 ? { value: "Review needed", direction: "down" } : undefined} />
        <AdminStatCard label="Blocked" value={stats.blocked} href="/admin/projects/risks" />
        <AdminStatCard label="Open risks" value={stats.openRisks} href="/admin/projects/risks" />
        <AdminStatCard label="Milestones (14d)" value={stats.upcomingMilestones} hint="Upcoming" />
      </section>

      {/* Health overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AdminCard title="Project Health" description="Current status distribution">
          <div className="space-y-3">
            {(["on-track", "at-risk", "blocked", "completed"] as const).map((h) => {
              const cfg = HEALTH_CONFIG[h];
              const count = result.items.filter((p) => p.health === h).length;
              return (
                <div key={h} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                    <span className="text-sm text-zinc-400">{cfg.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-zinc-200">{count}</span>
                </div>
              );
            })}
          </div>
        </AdminCard>

        <div className="lg:col-span-2">
          <AdminCard
            title="Active Projects"
            actions={
              <AdminButton href="/admin/projects/active" variant="ghost" size="sm">
                View all
              </AdminButton>
            }
          >
            {active.length === 0 ? (
              <p className="text-sm text-zinc-600">No active projects.</p>
            ) : (
              <div className="space-y-3">
                {active.map((p) => (
                  <ProjectRow key={p.id} project={p} />
                ))}
              </div>
            )}
          </AdminCard>
        </div>
      </div>

      {planning.length > 0 && (
        <AdminCard title="Planning & Approved">
          <div className="space-y-3">
            {planning.map((p) => (
              <ProjectRow key={p.id} project={p} />
            ))}
          </div>
        </AdminCard>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard
          title="Open Risks"
          actions={
            <AdminButton href="/admin/projects/risks" variant="ghost" size="sm">
              Risk register
            </AdminButton>
          }
        >
          {stats.openRisks === 0 ? (
            <p className="text-sm text-zinc-600">No open risks.</p>
          ) : (
            <ul className="space-y-2">
              {result.items.flatMap((p) =>
                (p.risks ?? [])
                  .filter((r) => r.status === "open")
                  .map((r) => (
                    <li key={r.id} className="flex items-start gap-3">
                      <span
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                          r.impact === "critical" || r.impact === "high"
                            ? "bg-red-400"
                            : r.impact === "medium"
                              ? "bg-amber-400"
                              : "bg-zinc-400"
                        }`}
                      />
                      <div>
                        <p className="text-sm text-zinc-200">{r.title}</p>
                        <p className="text-xs text-zinc-500">{p.title}</p>
                      </div>
                    </li>
                  )),
              )}
            </ul>
          )}
        </AdminCard>

        <AdminCard title="Upcoming Milestones (14 days)">
          {stats.upcomingMilestones === 0 ? (
            <p className="text-sm text-zinc-600">No milestones due in the next 14 days.</p>
          ) : (
            <ul className="space-y-2">
              {result.items.flatMap((p) => {
                const today = new Date().toISOString();
                const cutoff = new Date(Date.now() + 14 * 86400000).toISOString();
                return (p.milestones ?? [])
                  .filter(
                    (m) =>
                      m.status !== "completed" &&
                      m.dueDate &&
                      m.dueDate >= today &&
                      m.dueDate <= cutoff,
                  )
                  .map((m) => (
                    <li key={m.id} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                      <div>
                        <p className="text-sm text-zinc-200">{m.title}</p>
                        <p className="text-xs text-zinc-500">
                          {p.title} · Due {formatDate(m.dueDate)}
                        </p>
                      </div>
                    </li>
                  ));
              })}
            </ul>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
