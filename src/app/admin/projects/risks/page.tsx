import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Risk Register — Projects" };

const RISK_MATRIX = [
  { probability: "High", critical: 0, high: 0, medium: 0, low: 0 },
  { probability: "Medium", critical: 0, high: 0, medium: 0, low: 0 },
  { probability: "Low", critical: 0, high: 0, medium: 0, low: 0 },
] as const;

const ISSUE_SEVERITIES = [
  { severity: "Critical", description: "Project cannot proceed", count: 0 },
  { severity: "High", description: "Significant impact on delivery", count: 0 },
  { severity: "Medium", description: "Manageable with active attention", count: 0 },
  { severity: "Low", description: "Minor impact", count: 0 },
] as const;

export default function AdminRiskRegisterPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Risk Register"
        description="Cross-project risks and issues — identification, mitigation, and resolution tracking."
        actions={
          <AdminButton href="/admin/projects" variant="ghost" size="md">
            Back to projects
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Open risks" value="0" hint="Requires attention" />
        <AdminStatCard label="Open issues" value="0" hint="Active problems" />
        <AdminStatCard label="Mitigated risks" value="0" hint="Under control" />
        <AdminStatCard label="Realized risks" value="0" hint="Became issues" />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard
          title="Risk Register"
          description="Identified project risks by probability and impact"
          actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
        >
          <AdminEmptyState
            title="No risks identified"
            description="Risks are identified at the project level and aggregated here. Each risk has a probability, impact, mitigation plan, and owner."
          />
        </AdminCard>

        <AdminCard
          title="Issue Log"
          description="Active project issues requiring resolution"
          actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
        >
          <AdminEmptyState
            title="No open issues"
            description="Issues are logged when a risk is realized or a new problem is identified. Issues have severity, status, and resolution tracking."
          />
        </AdminCard>
      </div>

      <AdminCard title="Risk Impact Matrix" description="Risks by probability vs. impact">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="pb-3 pr-4 text-left text-xs font-medium text-zinc-500">Probability ↓ / Impact →</th>
                <th className="pb-3 px-3 text-center text-xs font-medium text-red-400">Critical</th>
                <th className="pb-3 px-3 text-center text-xs font-medium text-amber-400">High</th>
                <th className="pb-3 px-3 text-center text-xs font-medium text-yellow-400">Medium</th>
                <th className="pb-3 px-3 text-center text-xs font-medium text-zinc-400">Low</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {RISK_MATRIX.map(({ probability, critical, high, medium, low }) => (
                <tr key={probability}>
                  <td className="py-3 pr-4 text-xs font-medium text-zinc-400">{probability}</td>
                  <td className="px-3 py-3 text-center text-zinc-500">{critical}</td>
                  <td className="px-3 py-3 text-center text-zinc-500">{high}</td>
                  <td className="px-3 py-3 text-center text-zinc-500">{medium}</td>
                  <td className="px-3 py-3 text-center text-zinc-500">{low}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <AdminCard title="Issue Severity Breakdown">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ISSUE_SEVERITIES.map(({ severity, description, count }) => (
            <div
              key={severity}
              className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <p className="text-sm font-bold text-zinc-100">{severity}</p>
              <p className="mt-1 text-xs text-zinc-500">{description}</p>
              <p className="mt-3 text-2xl font-bold text-zinc-400">{count}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
