import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Pipeline — CRM" };

const PIPELINE_STAGES = [
  {
    stage: "Prospect",
    description: "Identified as a potential opportunity",
    count: 0,
    value: 0,
  },
  {
    stage: "Initial Contact",
    description: "First outreach made or received",
    count: 0,
    value: 0,
  },
  {
    stage: "Discovery",
    description: "Active conversation about needs",
    count: 0,
    value: 0,
  },
  {
    stage: "Proposal",
    description: "Proposal sent or in development",
    count: 0,
    value: 0,
  },
  {
    stage: "Negotiation",
    description: "Terms under discussion",
    count: 0,
    value: 0,
  },
  {
    stage: "Closed — Won",
    description: "Contract or agreement signed",
    count: 0,
    value: 0,
  },
  {
    stage: "Closed — Lost",
    description: "Declined or awarded to competitor",
    count: 0,
    value: 0,
  },
] as const;

export default function AdminCrmPipelinePage() {
  const totalOpenValue = 0;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Sales Pipeline"
        description="Commercial business development pipeline — from first contact to closed deal."
        actions={
          <AdminButton href="/admin/crm" variant="ghost" size="md">
            Back to CRM
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Open opportunities" value="0" />
        <AdminStatCard
          label="Pipeline value"
          value={`$${totalOpenValue.toLocaleString()}`}
          hint="Open stages"
        />
        <AdminStatCard label="Avg. win probability" value="—" hint="No data yet" />
        <AdminStatCard label="Closed won this quarter" value="0" hint="Deals signed" />
      </section>

      <AdminCard
        title="Pipeline Board"
        description="All opportunities by stage"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No pipeline entries"
          description="Create pipeline entries to track commercial opportunities from first contact through contract signature. Government opportunities are tracked separately in Gov Contracts."
        />
      </AdminCard>

      <AdminCard title="Stage Breakdown" description="Opportunity count and value by stage">
        <div className="divide-y divide-zinc-800">
          {PIPELINE_STAGES.map(({ stage, description, count, value }) => (
            <div
              key={stage}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-200">{stage}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-zinc-400">{count}</p>
                <p className="text-xs text-zinc-600">
                  ${value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Kanban-style pipeline board by stage",
            "Stage progression tracking with timestamps",
            "Estimated value and win probability per entry",
            "Expected close date and aging alerts",
            "Competitor tracking per opportunity",
            "Win/loss analysis with reasons",
            "Pipeline value forecasting by period",
            "Referral source attribution",
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
