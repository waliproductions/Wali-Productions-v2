import { opportunityRepository } from "@/lib/repositories/opportunity.repository";
import type { StoredOpportunity, OpportunityStage } from "@/lib/repositories/opportunity.repository";
import { organizationRepository } from "@/lib/repositories/organization.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pipeline — CRM" };

type StageCfg = {
  label: string;
  dot: string;
  variant: "success" | "info" | "neutral" | "warning" | "danger";
};

const STAGE_CFG: Record<OpportunityStage, StageCfg> = {
  lead: { label: "Lead", dot: "bg-zinc-400", variant: "neutral" },
  qualified: { label: "Qualified", dot: "bg-sky-400", variant: "info" },
  proposal: { label: "Proposal", dot: "bg-amber-400", variant: "warning" },
  negotiation: { label: "Negotiation", dot: "bg-violet-400", variant: "info" },
  awarded: { label: "Awarded", dot: "bg-emerald-400", variant: "success" },
  lost: { label: "Lost", dot: "bg-red-400", variant: "danger" },
  archived: { label: "Archived", dot: "bg-zinc-600", variant: "neutral" },
};

function currency(n?: number): string {
  if (!n) return "—";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

function OppCard({ opp, orgName }: { opp: StoredOpportunity; orgName?: string }) {
  const cfg = STAGE_CFG[opp.stage];
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug text-zinc-100">{opp.title}</p>
        <AdminBadge variant={cfg.variant}>{cfg.label}</AdminBadge>
      </div>
      {orgName && <p className="mt-1 text-xs text-zinc-500">{orgName}</p>}
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
        {opp.estimatedValue !== undefined && (
          <span className="font-semibold text-zinc-300">{currency(opp.estimatedValue)}</span>
        )}
        {opp.winProbability !== undefined && <span>{opp.winProbability}% win probability</span>}
        {opp.responseDeadline && <span>Due {formatDate(opp.responseDeadline)}</span>}
      </div>
      <div className="mt-2">
        <AdminBadge variant="neutral">{opp.track.replace(/-/g, " ")}</AdminBadge>
      </div>
    </div>
  );
}

export default async function AdminPipelinePage() {
  const [stats, result, orgsResult] = await Promise.all([
    opportunityRepository.getPipelineStats(),
    opportunityRepository.findAll({
      sort: { field: "updatedAt", order: "desc" },
      perPage: 200,
    }),
    organizationRepository.findAll({ perPage: 200 }),
  ]);

  const orgMap = new Map(orgsResult.items.map((o) => [o.id, o.name]));
  const opps = result.items;
  const OPEN: OpportunityStage[] = ["lead", "qualified", "proposal", "negotiation"];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Opportunity Pipeline"
        description="All commercial, government, and enterprise opportunities across every stage."
        actions={
          <AdminButton href="/admin/crm" variant="ghost" size="md">
            Back to CRM
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <AdminStatCard label="Open" value={stats.activeCount} hint="In pipeline" />
        <AdminStatCard label="Pipeline value" value={currency(stats.totalValue)} hint="Open opps" />
        <AdminStatCard label="Proposal" value={stats.byStage.proposal} hint="In proposal stage" />
        <AdminStatCard label="Awarded" value={stats.byStage.awarded} hint="Won" />
        <AdminStatCard
          label="Deadlines (7d)"
          value={stats.deadlinesThisWeek}
          hint="This week"
          trend={stats.deadlinesThisWeek > 0 ? { value: "Attention needed", direction: "down" } : undefined}
        />
      </section>

      {/* Open stages kanban */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {OPEN.map((stage) => {
          const cfg = STAGE_CFG[stage];
          const items = opps.filter((o) => o.stage === stage);
          return (
            <AdminCard
              key={stage}
              title={
                <span className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                  <span className="ml-1 text-xs font-normal text-zinc-500">({items.length})</span>
                </span>
              }
            >
              {items.length === 0 ? (
                <p className="text-sm text-zinc-600">No opportunities at this stage.</p>
              ) : (
                <div className="space-y-3">
                  {items.map((o) => (
                    <OppCard key={o.id} opp={o} orgName={orgMap.get(o.organizationId ?? "")} />
                  ))}
                </div>
              )}
            </AdminCard>
          );
        })}
      </div>

      {/* Closed stages */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {(["awarded", "lost"] as OpportunityStage[]).map((stage) => {
          const cfg = STAGE_CFG[stage];
          const items = opps.filter((o) => o.stage === stage);
          return (
            <AdminCard key={stage} title={cfg.label}>
              {items.length === 0 ? (
                <p className="text-sm text-zinc-600">None recorded.</p>
              ) : (
                <div className="space-y-3">
                  {items.map((o) => (
                    <OppCard key={o.id} opp={o} orgName={orgMap.get(o.organizationId ?? "")} />
                  ))}
                </div>
              )}
            </AdminCard>
          );
        })}
      </div>
    </div>
  );
}
