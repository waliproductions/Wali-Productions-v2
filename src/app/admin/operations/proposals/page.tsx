import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Proposals Pipeline — Operations" };

const STAGE_STATS = [
  { label: "Total proposals", value: "0" },
  { label: "In drafting", value: "0", hint: "Draft / in-review" },
  { label: "Sent / active", value: "0", hint: "Awaiting response" },
  { label: "Closed this quarter", value: "0", hint: "Won + lost" },
] as const;

const STAGES = [
  { stage: "Draft", description: "Being written or awaiting internal review", count: 0 },
  { stage: "In Review", description: "Under internal review before sending", count: 0 },
  { stage: "Sent", description: "Delivered to client, awaiting response", count: 0 },
  { stage: "Negotiation", description: "Terms under discussion", count: 0 },
  { stage: "Accepted", description: "Signed and moving to project", count: 0 },
  { stage: "Rejected", description: "Declined by client or expired", count: 0 },
] as const;

export default function AdminProposalsPipelinePage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Proposals Pipeline"
        description="Track all proposals from draft through close across commercial and government work."
        actions={
          <AdminButton href="/admin/operations" variant="ghost" size="md">
            Back to operations
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAGE_STATS.map((s, i) => (
          <AdminStatCard
            key={i}
            label={s.label}
            value={s.value}
            hint={"hint" in s ? s.hint : undefined}
          />
        ))}
      </section>

      <AdminCard
        title="Active Pipeline"
        description="Proposals currently in progress"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No proposals in pipeline"
          description="Create a proposal to start tracking it through the pipeline. Both commercial and government proposals will appear here."
        />
      </AdminCard>

      <AdminCard title="Stage Breakdown" description="Pipeline distribution by stage">
        <div className="divide-y divide-zinc-800">
          {STAGES.map(({ stage, description, count }) => (
            <div
              key={stage}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-zinc-200">{stage}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              </div>
              <span className="text-sm font-semibold text-zinc-400">{count}</span>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include" description="Planned capabilities">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Full lifecycle: draft → sent → accepted / rejected",
            "Commercial and government proposal tracking",
            "Revision history and version comparison",
            "Expiration tracking and renewal prompts",
            "Line-item value and win/loss metrics",
            "Pipeline value by stage",
            "Client association and contact threading",
            "Link to project creation on acceptance",
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
