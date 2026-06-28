import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Opportunities — Gov Contracts" };

const PIPELINE_STAGES = [
  { stage: "Identified", description: "On radar, not yet pursuing", count: 0 },
  { stage: "Tracking", description: "Actively monitoring for updates", count: 0 },
  { stage: "Pursuing", description: "Decision made to pursue", count: 0 },
  { stage: "Proposal Prep", description: "Proposal in active development", count: 0 },
  { stage: "Submitted", description: "Response delivered", count: 0 },
  { stage: "Awarded", description: "Contract awarded to us", count: 0 },
  { stage: "Not Awarded", description: "Awarded to competitor", count: 0 },
  { stage: "No Bid", description: "Opted not to pursue", count: 0 },
] as const;

export default function AdminOpportunitiesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Opportunities"
        description="Government contract pipeline from market research through award."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Back to contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total tracked" value="0" />
        <AdminStatCard label="Active pursuit" value="0" hint="Pursuing + proposal prep" />
        <AdminStatCard label="Submitted" value="0" hint="Awaiting award" />
        <AdminStatCard label="Awarded" value="0" hint="Win rate: —" />
      </section>

      <AdminCard
        title="Opportunity Pipeline"
        description="All tracked opportunities by stage"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No opportunities in pipeline"
          description="Track federal, state, and local government contracting opportunities here. Pull from SAM.gov, agency portals, and direct outreach."
        />
      </AdminCard>

      <AdminCard title="Pipeline Stages" description="Opportunity lifecycle tracking">
        <div className="divide-y divide-zinc-800">
          {PIPELINE_STAGES.map(({ stage, description, count }) => (
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

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "SAM.gov opportunity import and tracking",
            "NAICS and PSC code matching",
            "Set-aside category filtering",
            "Capture stage progression tracking",
            "Response deadline calendar",
            "Estimated contract value and sizing",
            "Agency and POC relationship tracking",
            "Win/loss analysis and lessons learned",
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
