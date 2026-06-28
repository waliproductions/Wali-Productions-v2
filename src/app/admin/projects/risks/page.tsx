import { projectRepository } from "@/lib/repositories/project.repository";
import type { Risk } from "@/types/project";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Risk Register — Projects" };

type Props = { searchParams?: Promise<{ status?: string }> };

type RiskWithProject = Risk & { projectId: string; projectTitle: string };

const IMPACT_VARIANT = {
  critical: "danger" as const,
  high: "danger" as const,
  medium: "warning" as const,
  low: "neutral" as const,
};

const PROBABILITY_VARIANT = {
  high: "danger" as const,
  medium: "warning" as const,
  low: "neutral" as const,
};

const STATUS_VARIANT = {
  open: "warning" as const,
  mitigated: "success" as const,
  accepted: "neutral" as const,
  closed: "neutral" as const,
  realized: "danger" as const,
};

export default async function AdminRisksPage({ searchParams }: Props) {
  const params = await searchParams;
  const statusFilter = params?.status ?? "open";

  const result = await projectRepository.findAll({ perPage: 100 });

  const allRisks: RiskWithProject[] = result.items.flatMap((p) =>
    (p.risks ?? []).map((r) => ({
      ...r,
      projectId: p.id,
      projectTitle: p.title,
    })),
  );

  const filtered = statusFilter
    ? allRisks.filter((r) => statusFilter === "all" ? true : r.status === statusFilter)
    : allRisks;

  const stats = {
    total: allRisks.length,
    open: allRisks.filter((r) => r.status === "open").length,
    mitigated: allRisks.filter((r) => r.status === "mitigated").length,
    critical: allRisks.filter((r) => r.impact === "critical" && r.status === "open").length,
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Risk Register"
        description="All project risks — open, mitigated, and accepted."
        actions={
          <AdminButton href="/admin/projects" variant="ghost" size="md">
            Back to Projects
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Total risks" value={stats.total} />
        <AdminStatCard
          label="Open"
          value={stats.open}
          trend={stats.open > 0 ? { value: "Active", direction: "down" } : undefined}
        />
        <AdminStatCard label="Mitigated" value={stats.mitigated} />
        <AdminStatCard
          label="Critical/Open"
          value={stats.critical}
          trend={stats.critical > 0 ? { value: "Immediate attention", direction: "down" } : undefined}
        />
      </section>

      {/* Status filter */}
      <form className="flex flex-wrap gap-2" method="GET">
        {[
          { label: "Open", value: "open" },
          { label: "All", value: "all" },
          { label: "Mitigated", value: "mitigated" },
          { label: "Accepted", value: "accepted" },
          { label: "Closed", value: "closed" },
        ].map(({ label, value }) => (
          <button
            key={value}
            type="submit"
            name="status"
            value={value}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              statusFilter === value
                ? "border-amber-400 bg-amber-500/10 text-amber-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}
      </form>

      <AdminCard title={`${filtered.length} risk${filtered.length !== 1 ? "s" : ""}`}>
        {filtered.length === 0 ? (
          <p className="text-sm text-zinc-600">No risks match this filter.</p>
        ) : (
          <ul className="divide-y divide-zinc-800/60">
            {filtered.map((r) => (
              <li key={`${r.projectId}-${r.id}`} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-zinc-100">{r.title}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{r.projectTitle}</p>
                    {r.description && (
                      <p className="mt-1 text-sm text-zinc-400">{r.description}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <AdminBadge variant={STATUS_VARIANT[r.status] ?? "neutral"}>
                      {r.status}
                    </AdminBadge>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <AdminBadge variant={PROBABILITY_VARIANT[r.probability]}>
                    {r.probability} probability
                  </AdminBadge>
                  <AdminBadge variant={IMPACT_VARIANT[r.impact]}>
                    {r.impact} impact
                  </AdminBadge>
                </div>

                {r.mitigationPlan && (
                  <div className="mt-2 rounded-md bg-zinc-800/40 px-3 py-2">
                    <p className="text-xs font-medium text-zinc-400">Mitigation</p>
                    <p className="mt-0.5 text-sm text-zinc-300">{r.mitigationPlan}</p>
                  </div>
                )}

                <div className="mt-2 text-xs text-zinc-500">
                  Identified {formatDate(r.identifiedAt)}
                  {r.owner && ` · Owner: ${r.owner}`}
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  );
}
