import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Reports — Operations" };

const METRIC_CATEGORIES = [
  { label: "Revenue", description: "Invoiced and collected" },
  { label: "Pipeline value", description: "Proposals in active stages" },
  { label: "Win rate", description: "Accepted / total sent" },
  { label: "Active projects", description: "Engagements in flight" },
  { label: "Avg. project value", description: "Mean engagement size" },
  { label: "Avg. proposal to close", description: "Days from send to decision" },
] as const;

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Reports"
        description="Business metrics, revenue tracking, and operational reporting."
        actions={
          <AdminButton href="/admin/operations" variant="ghost" size="md">
            Back to operations
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Monthly revenue" value="—" hint="No data yet" />
        <AdminStatCard label="Pipeline value" value="—" hint="No proposals" />
        <AdminStatCard label="Win rate" value="—" hint="No closed proposals" />
        <AdminStatCard label="Active projects" value="0" hint="Current engagements" />
      </section>

      <AdminCard
        title="Business Metrics"
        description="Key performance indicators"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No metrics data"
          description="Business metrics will populate automatically as proposals are created, projects are tracked, and revenue is recorded."
        />
      </AdminCard>

      <AdminCard title="Tracked Metrics" description="What will be measured">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {METRIC_CATEGORIES.map(({ label, description }) => (
            <div
              key={label}
              className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <p className="text-sm font-semibold text-zinc-200">{label}</p>
              <p className="mt-1 text-xs text-zinc-500">{description}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include" description="Planned reporting features">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Monthly and quarterly revenue summaries",
            "Proposal win/loss rate tracking",
            "Pipeline value by stage",
            "Client acquisition and retention metrics",
            "Project delivery timeline adherence",
            "Government vs. commercial revenue split",
            "Period-over-period comparison",
            "Exportable reports for founder review",
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
