import { opportunityRepository } from "@/lib/repositories/opportunity.repository";
import type { StoredOpportunity, OpportunityStage, OpportunityTrack } from "@/lib/repositories/opportunity.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Opportunities — Gov Contracts" };

type Props = { searchParams?: Promise<{ track?: string; stage?: string }> };

const STAGE_VARIANT: Record<OpportunityStage, "success" | "info" | "neutral" | "warning" | "danger"> = {
  lead: "neutral",
  qualified: "info",
  proposal: "warning",
  negotiation: "info",
  awarded: "success",
  lost: "danger",
  archived: "neutral",
};

const TRACK_LABELS: Record<OpportunityTrack, string> = {
  commercial: "Commercial",
  "government-federal": "Federal",
  "government-state": "State",
  "government-local": "Local",
  enterprise: "Enterprise",
};

function currency(n?: number): string {
  if (!n) return "—";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

const COLS: AdminTableColumn<StoredOpportunity>[] = [
  {
    key: "title",
    header: "Opportunity",
    render: (o) => (
      <div>
        <p className="font-medium text-zinc-100 leading-snug">{o.title}</p>
        {o.agency && <p className="mt-0.5 text-xs text-zinc-500">{o.agency}</p>}
      </div>
    ),
  },
  {
    key: "track",
    header: "Track",
    render: (o) => (
      <AdminBadge variant="neutral">{TRACK_LABELS[o.track]}</AdminBadge>
    ),
    hideOnMobile: true,
  },
  {
    key: "stage",
    header: "Stage",
    render: (o) => (
      <AdminBadge variant={STAGE_VARIANT[o.stage]}>
        {o.stage}
      </AdminBadge>
    ),
  },
  {
    key: "value",
    header: "Est. Value",
    render: (o) => (
      <span className="text-sm font-semibold text-zinc-200">{currency(o.estimatedValue)}</span>
    ),
    align: "right",
    hideOnMobile: true,
  },
  {
    key: "probability",
    header: "Win %",
    render: (o) => (
      <span className={`text-sm font-semibold ${
        (o.winProbability ?? 0) >= 60 ? "text-emerald-400" :
        (o.winProbability ?? 0) >= 30 ? "text-amber-300" : "text-zinc-400"
      }`}>
        {o.winProbability !== undefined ? `${o.winProbability}%` : "—"}
      </span>
    ),
    align: "center",
    hideOnMobile: true,
  },
  {
    key: "deadline",
    header: "Deadline",
    render: (o) => o.responseDeadline ? (
      <span className="text-sm text-zinc-300">{formatDate(o.responseDeadline)}</span>
    ) : <span className="text-zinc-600">—</span>,
    hideOnMobile: true,
  },
];

export default async function AdminOpportunitiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const trackFilter = params?.track as OpportunityTrack | undefined;
  const stageFilter = params?.stage as OpportunityStage | undefined;

  const [stats, result] = await Promise.all([
    opportunityRepository.getPipelineStats(),
    opportunityRepository.findAll({
      filters: [
        ...(trackFilter ? [{ field: "track", operator: "eq" as const, value: trackFilter }] : []),
        ...(stageFilter ? [{ field: "stage", operator: "eq" as const, value: stageFilter }] : []),
      ],
      sort: { field: "responseDeadline", order: "asc" },
      perPage: 200,
    }),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Opportunities"
        description="All tracked opportunities across commercial, government, and enterprise tracks."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Back to Gov Contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <AdminStatCard label="Total" value={stats.total} />
        <AdminStatCard label="Pipeline value" value={currency(stats.totalValue)} />
        <AdminStatCard label="Proposal stage" value={stats.byStage.proposal} />
        <AdminStatCard label="Awarded" value={stats.byStage.awarded} />
        <AdminStatCard
          label="Deadlines (7d)"
          value={stats.deadlinesThisWeek}
          trend={stats.deadlinesThisWeek > 0 ? { value: "Due soon", direction: "down" } : undefined}
        />
      </section>

      {/* Track filter */}
      <form className="flex flex-wrap gap-2" method="GET">
        {[
          { label: "All tracks", value: "" },
          { label: "Federal", value: "government-federal" },
          { label: "Commercial", value: "commercial" },
          { label: "State", value: "government-state" },
          { label: "Local", value: "government-local" },
          { label: "Enterprise", value: "enterprise" },
        ].map(({ label, value }) => (
          <button
            key={value}
            type="submit"
            name="track"
            value={value}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              (trackFilter ?? "") === value
                ? "border-amber-400 bg-amber-500/10 text-amber-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}
      </form>

      <AdminCard
        title={`${result.total} opportunit${result.total !== 1 ? "ies" : "y"}`}
        padded={false}
      >
        <AdminTable
          columns={COLS}
          rows={result.items}
          getRowKey={(o) => o.id}
        />
      </AdminCard>
    </div>
  );
}
