import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import {
  opportunityRepository,
  proposalRepository,
  contractRepository,
  projectRepository,
  taskRepository,
  userAccountRepository,
  captureRepository,
  contactRepository,
} from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "Executive Analytics" };

function currency(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

function pct(a: number, b: number): string {
  if (b === 0) return "0%";
  return `${Math.round((a / b) * 100)}%`;
}

export default async function ExecutiveAnalyticsPage() {
  const [
    oppStats,
    propStats,
    contractStats,
    projectStats,
    taskStats,
    userStats,
    captureStats,
    contactStats,
  ] = await Promise.all([
    opportunityRepository.getPipelineStats(),
    proposalRepository.getStats(),
    contractRepository.getStats(),
    projectRepository.getStats(),
    taskRepository.getStats(),
    userAccountRepository.getStats(),
    captureRepository.getStats(),
    contactRepository.getStats(),
  ]);

  const pipelineValue = oppStats.totalValue ?? 0;
  const activeContractValue = contractStats.totalCurrentValue ?? 0;
  const proposalWinRate = pct(propStats.accepted, propStats.total);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Executive Analytics"
        description="Pipeline forecast, project health, and organizational growth metrics for leadership."
        actions={
          <AdminButton href="/admin/analytics" variant="ghost" size="md">
            Back to analytics
          </AdminButton>
        }
      />

      {/* Pipeline overview */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400/70">
          Pipeline & Revenue
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard
            label="Opportunity pipeline"
            value={pipelineValue > 0 ? currency(pipelineValue) : "—"}
            hint={`${oppStats.total} opportunities`}
          />
          <AdminStatCard
            label="Active contract value"
            value={activeContractValue > 0 ? currency(activeContractValue) : "—"}
            hint={`${contractStats.active} active contracts`}
          />
          <AdminStatCard
            label="Proposal win rate"
            value={propStats.total > 0 ? proposalWinRate : "—"}
            hint={`${propStats.accepted ?? 0} of ${propStats.total} proposals`}
          />
          <AdminStatCard
            label="Active captures"
            value={String(captureStats.activePursuit ?? 0)}
            hint={`${captureStats.total} total pursuits`}
          />
        </div>
      </section>

      {/* Project health */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400/70">
          Project Health
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard
            label="Active projects"
            value={String(projectStats.active)}
            hint={`${projectStats.completedThisYear} completed this year`}
          />
          <AdminStatCard
            label="Open tasks"
            value={String(taskStats.open)}
            hint={`${taskStats.total} total tasks`}
          />
          <AdminStatCard
            label="Overdue tasks"
            value={String(taskStats.overdue)}
            hint={taskStats.overdue > 0 ? "Attention required" : "On schedule"}
          />
          <AdminStatCard
            label="Critical tasks"
            value={String(taskStats.byPriority?.critical ?? 0)}
            hint="Highest priority"
          />
        </div>
      </section>

      {/* Org growth */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400/70">
          Organizational Growth
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard
            label="Total workforce"
            value={String(userStats.total)}
            hint={`${userStats.active} active accounts`}
          />
          <AdminStatCard
            label="Employees"
            value={String(userStats.employees)}
            hint="Internal staff"
          />
          <AdminStatCard
            label="Contractors"
            value={String(userStats.contractors)}
            hint="Active contractors"
          />
          <AdminStatCard
            label="Client accounts"
            value={String(userStats.clients)}
            hint="Portal access"
          />
        </div>
      </section>

      {/* Revenue & BD detail */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard title="Business Development Funnel">
          <div className="space-y-3">
            {[
              { stage: "CRM Contacts", count: contactStats.total, note: "Total in database" },
              { stage: "Opportunities", count: oppStats.total, note: "Active pipeline" },
              { stage: "Captures", count: captureStats.total, note: "BD pursuits" },
              { stage: "Proposals Submitted", count: propStats.sent ?? 0, note: "Under consideration" },
              { stage: "Proposals Won", count: propStats.accepted ?? 0, note: "Converted to contracts" },
              { stage: "Active Contracts", count: contractStats.active, note: "Revenue generating" },
            ].map(({ stage, count, note }) => (
              <div key={stage} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-300">{stage}</p>
                  <p className="text-xs text-zinc-600">{note}</p>
                </div>
                <span className="text-lg font-bold text-amber-400">{count}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Operational Pulse">
          <div className="space-y-3">
            {[
              {
                label: "Task completion rate",
                value: pct(taskStats.done, taskStats.total),
                sub: `${taskStats.done} of ${taskStats.total} tasks`,
                ok: taskStats.done > 0,
              },
              {
                label: "Overdue task ratio",
                value: pct(taskStats.overdue, taskStats.open),
                sub: `${taskStats.overdue} overdue of ${taskStats.open} open`,
                ok: taskStats.overdue === 0,
              },
              {
                label: "Workforce with MFA",
                value: pct(userStats.mfaEnabled, userStats.total),
                sub: `${userStats.mfaEnabled} of ${userStats.total} accounts`,
                ok: userStats.mfaEnabled === userStats.total,
              },
              {
                label: "Projects at risk",
                value: String(projectStats.atRisk + projectStats.blocked),
                sub: `${projectStats.atRisk} at risk · ${projectStats.blocked} blocked`,
                ok: (projectStats.atRisk + projectStats.blocked) === 0,
              },
              {
                label: "Contracts expiring this month",
                value: String(contractStats.expiringThisMonth ?? 0),
                sub: "Review and renew",
                ok: (contractStats.expiringThisMonth ?? 0) === 0,
              },
            ].map(({ label, value, sub, ok }) => (
              <div key={label} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3">
                <div>
                  <p className="text-sm text-zinc-300">{label}</p>
                  <p className="text-xs text-zinc-600">{sub}</p>
                </div>
                <div className="text-right">
                  <p className={`text-base font-bold ${ok ? "text-emerald-400" : "text-amber-400"}`}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      {/* BD stages */}
      <AdminCard title="Opportunity Stage Breakdown">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.entries(oppStats.byStage ?? {}) as [string, number][]).length === 0 ? (
            <p className="col-span-4 text-sm text-zinc-600">No opportunity data yet.</p>
          ) : (
            (Object.entries(oppStats.byStage ?? {}) as [string, number][]).map(([stage, count]) => (
              <div key={stage} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 text-center">
                <p className="text-2xl font-bold text-amber-400">{count}</p>
                <p className="mt-1 text-xs capitalize text-zinc-500">{stage.replace(/-/g, " ")}</p>
              </div>
            ))
          )}
        </div>
      </AdminCard>

      {/* Data freshness note */}
      <AdminCard title="Data Notes">
        <div className="space-y-2 text-xs text-zinc-500">
          <p>All figures are computed live from the JSON repository layer at page load time.</p>
          <p>Financial values (pipeline, contract ceiling) are sourced from individual record fields — accuracy depends on data entry completeness.</p>
          <p>Win rate = accepted proposals / total proposals. Does not include pipeline-stage withdrawals.</p>
          <p>
            For detailed module breakdowns, see{" "}
            <a href="/admin/reports" className="text-amber-400 hover:underline">Reports</a>
            {" "}or individual module pages.
          </p>
        </div>
      </AdminCard>
    </div>
  );
}
