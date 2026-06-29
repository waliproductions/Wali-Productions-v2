import { captureRepository } from "@/lib/repositories/capture.repository";
import type { StoredCaptureRecord, CaptureStage } from "@/lib/repositories/capture.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Government Capture" };

type Props = { searchParams?: Promise<{ stage?: string; decision?: string }> };

function currency(n?: number) {
  if (!n) return "—";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

const STAGE_LABELS: Record<CaptureStage, string> = {
  "market-research": "Market Research",
  "sources-sought": "Sources Sought",
  "rfi-response": "RFI Response",
  "pre-proposal": "Pre-Proposal",
  "proposal-development": "Proposal Dev",
  "final-proposal-revision": "FPR",
  "submitted": "Submitted",
  "awarded": "Awarded",
  "no-bid": "No Bid",
  "not-awarded": "Not Awarded",
};

const STAGE_VARIANT: Record<CaptureStage, "success" | "info" | "neutral" | "warning" | "danger"> = {
  "market-research": "neutral",
  "sources-sought": "neutral",
  "rfi-response": "info",
  "pre-proposal": "info",
  "proposal-development": "warning",
  "final-proposal-revision": "warning",
  "submitted": "info",
  "awarded": "success",
  "no-bid": "neutral",
  "not-awarded": "danger",
};

const COLS: AdminTableColumn<StoredCaptureRecord>[] = [
  {
    key: "title",
    header: "Opportunity",
    render: (c) => (
      <div>
        <p className="font-medium text-zinc-100">{c.opportunityTitle}</p>
        {c.agency && <p className="mt-0.5 text-xs text-zinc-500">{c.agency}</p>}
        {c.solicitationNumber && (
          <p className="font-mono text-xs text-zinc-600">{c.solicitationNumber}</p>
        )}
      </div>
    ),
  },
  {
    key: "stage",
    header: "Stage",
    render: (c) => (
      <AdminBadge variant={STAGE_VARIANT[c.stage] ?? "neutral"}>{STAGE_LABELS[c.stage] ?? c.stage}</AdminBadge>
    ),
  },
  {
    key: "decision",
    header: "Decision",
    render: (c) => (
      <AdminBadge variant={c.bidDecision === "bid" ? "success" : c.bidDecision === "no-bid" ? "danger" : "neutral"}>
        {c.bidDecision}
      </AdminBadge>
    ),
    hideOnMobile: true,
  },
  {
    key: "value",
    header: "Est. Value",
    render: (c) => <span className="text-sm font-medium text-zinc-300">{currency(c.estimatedValue)}</span>,
    hideOnMobile: true,
  },
  {
    key: "pwin",
    header: "PWin",
    render: (c) => {
      if (!c.winProbability) return <span className="text-zinc-600">—</span>;
      const pct = c.winProbability;
      return (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-800">
            <div
              className={`h-full rounded-full ${pct >= 70 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-400" : "bg-red-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-sm text-zinc-400">{pct}%</span>
        </div>
      );
    },
    hideOnMobile: true,
  },
  {
    key: "deadline",
    header: "Proposal Due",
    render: (c) => {
      if (!c.proposalDueDate) return <span className="text-zinc-600">—</span>;
      const urgent = c.proposalDueDate < new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
      return (
        <span className={`text-sm ${urgent ? "font-medium text-red-300" : "text-zinc-400"}`}>
          {formatDate(c.proposalDueDate)}
        </span>
      );
    },
    hideOnMobile: true,
  },
];

const STAGE_ORDER: CaptureStage[] = [
  "market-research", "sources-sought", "rfi-response", "pre-proposal",
  "proposal-development", "final-proposal-revision", "submitted",
];

export default async function AdminCapturePage({ searchParams }: Props) {
  const params = await searchParams;
  const stageFilter = params?.stage as CaptureStage | undefined;
  const decisionFilter = params?.decision;

  const [stats, result] = await Promise.all([
    captureRepository.getStats(),
    captureRepository.findAll({
      filters: [
        ...(stageFilter ? [{ field: "stage", operator: "eq" as const, value: stageFilter }] : []),
        ...(decisionFilter ? [{ field: "bidDecision", operator: "eq" as const, value: decisionFilter }] : []),
      ],
      sort: { field: "proposalDueDate", order: "asc" },
      perPage: 100,
    }),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Government Capture Management"
        description="Professional capture planning — agencies, competitors, teaming, gate reviews, and bid decisions."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Total captures" value={stats.total} />
        <AdminStatCard label="Active pursuit" value={stats.activePursuit} />
        <AdminStatCard
          label="Pipeline value"
          value={stats.totalPipelineValue >= 1_000_000
            ? `$${(stats.totalPipelineValue / 1_000_000).toFixed(1)}M`
            : `$${(stats.totalPipelineValue / 1_000).toFixed(0)}k`}
          hint="Total estimated"
        />
        <AdminStatCard
          label="Weighted pipeline"
          value={stats.weightedPipelineValue >= 1_000_000
            ? `$${(stats.weightedPipelineValue / 1_000_000).toFixed(1)}M`
            : `$${(stats.weightedPipelineValue / 1_000).toFixed(0)}k`}
          hint="By win probability"
        />
      </section>

      {/* Pipeline funnel */}
      <AdminCard title="Capture Funnel">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-7">
          {STAGE_ORDER.map((stage) => {
            const count = stats.byStage[stage] ?? 0;
            return (
              <div key={stage} className="text-center">
                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
                  count > 0 ? "bg-amber-500/20 text-amber-300" : "bg-zinc-800 text-zinc-600"
                }`}>
                  {count}
                </div>
                <p className="mt-1 text-xs text-zinc-500">{STAGE_LABELS[stage]}</p>
              </div>
            );
          })}
        </div>
      </AdminCard>

      {/* Stage filter */}
      <form className="flex flex-wrap gap-2" method="GET">
        {([["", "All"], ["bid", "Bid"], ["no-bid", "No Bid"], ["pending", "Pending"]] as const).map(([val, label]) => (
          <button
            key={val}
            type="submit"
            name="decision"
            value={val}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              (decisionFilter ?? "") === val
                ? "border-amber-400 bg-amber-500/10 text-amber-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}
      </form>

      <AdminCard title={`${result.total} capture record${result.total !== 1 ? "s" : ""}`} padded={false}>
        {result.items.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-zinc-500">No capture records yet.</p>
            <p className="mt-1 text-xs text-zinc-600">
              Create a capture record for each government opportunity you are pursuing.
            </p>
          </div>
        ) : (
          <AdminTable columns={COLS} rows={result.items} getRowKey={(c) => c.id} />
        )}
      </AdminCard>

      {/* What this module covers */}
      <AdminCard title="Capture Management Framework">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { area: "Target Agencies", desc: "Track agencies, program offices, and contracting officers" },
            { area: "Capture Plans", desc: "Structured plans aligned to gate reviews and bid decision" },
            { area: "Customer Profiles", desc: "Agency requirements, pain points, and priorities" },
            { area: "Competitor Intelligence", desc: "Incumbent info, strengths, weaknesses, and PWin impact" },
            { area: "Contract Vehicles", desc: "GSA schedules, GWACs, and other contract vehicles" },
            { area: "Teaming Partners", desc: "Subs, primes, and JV partners with NDA and agreement status" },
            { area: "Gate Reviews", desc: "Structured go/no-go decision points with documented rationale" },
            { area: "Win Themes", desc: "Discriminators and messaging aligned to customer priorities" },
            { area: "Pipeline Forecast", desc: "Weighted pipeline value and monthly deadline tracking" },
          ].map(({ area, desc }) => (
            <div key={area} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
              <p className="text-sm font-semibold text-zinc-200">{area}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
