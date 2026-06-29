import { proposalRepository } from "@/lib/repositories/proposal.repository";
import { opportunityRepository } from "@/lib/repositories/opportunity.repository";
import { projectRepository } from "@/lib/repositories/project.repository";
import { captureRepository } from "@/lib/repositories/capture.repository";
import { organizationRepository } from "@/lib/repositories/organization.repository";
import { contactRepository } from "@/lib/repositories/contact.repository";
import { knowledgeRepository } from "@/lib/repositories/knowledge.repository";
import { activityRepository } from "@/lib/repositories/activity.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reports" };

function currency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

function pct(num: number, den: number) {
  if (!den) return "—";
  return `${Math.round((num / den) * 100)}%`;
}

function MetricRow({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
      <span className="text-sm text-zinc-400">{label}</span>
      <div className="text-right">
        <span className="text-sm font-semibold text-zinc-100">{value}</span>
        {sub && <p className="text-xs text-zinc-600">{sub}</p>}
      </div>
    </div>
  );
}

export default async function AdminReportsHubPage() {
  const [
    proposalStats,
    pipelineStats,
    projectStats,
    captureStats,
    orgStats,
    contactStats,
    knowledgeStats,
    activityStats,
  ] = await Promise.all([
    proposalRepository.getStats(),
    opportunityRepository.getPipelineStats(),
    projectRepository.getStats(),
    captureRepository.getStats(),
    organizationRepository.getStats(),
    contactRepository.getStats(),
    knowledgeRepository.getStats(),
    activityRepository.getStats(),
  ]);

  const winRate = pct(proposalStats.accepted, proposalStats.total);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Reports"
        description="Enterprise intelligence across all operational domains — live data from the full platform."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Pipeline value" value={currency(pipelineStats.totalValue)} hint="Open opportunities" />
        <AdminStatCard label="Gov pipeline" value={currency(captureStats.weightedPipelineValue)} hint="Weighted by PWin" />
        <AdminStatCard label="Win rate" value={winRate} hint="Accepted proposals" />
        <AdminStatCard label="Activity (7d)" value={activityStats.thisWeek} hint="Platform events" />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Business Development Report */}
        <AdminCard
          title="Business Development"
          actions={<AdminBadge variant="info">Live</AdminBadge>}
        >
          <MetricRow label="Active clients" value={orgStats.activeClients} />
          <MetricRow label="Total organizations" value={orgStats.total} />
          <MetricRow label="Decision makers" value={contactStats.decisionMakers} />
          <MetricRow label="Total contacts" value={contactStats.total} />
          <MetricRow label="Open opportunities" value={pipelineStats.activeCount} />
          <MetricRow
            label="Total pipeline value"
            value={currency(pipelineStats.totalValue)}
            sub="All open opportunities"
          />
        </AdminCard>

        {/* Proposal Intelligence Report */}
        <AdminCard
          title="Proposal Intelligence"
          actions={<AdminBadge variant="info">Live</AdminBadge>}
        >
          <MetricRow label="Total proposals" value={proposalStats.total} />
          <MetricRow label="Drafts" value={proposalStats.drafts} />
          <MetricRow label="In review" value={proposalStats.inReview} />
          <MetricRow label="Sent" value={proposalStats.sent} />
          <MetricRow label="Accepted (won)" value={proposalStats.accepted} />
          <MetricRow label="Win rate" value={winRate} />
        </AdminCard>

        {/* Government Pipeline Report */}
        <AdminCard
          title="Government Capture Pipeline"
          actions={<AdminBadge variant="info">Live</AdminBadge>}
        >
          <MetricRow label="Total capture records" value={captureStats.total} />
          <MetricRow label="Active pursuit" value={captureStats.activePursuit} />
          <MetricRow label="Total pipeline" value={currency(captureStats.totalPipelineValue)} />
          <MetricRow label="Weighted pipeline (PWin)" value={currency(captureStats.weightedPipelineValue)} />
          <MetricRow label="Upcoming gate reviews" value={captureStats.upcomingGateReviews} />
          <MetricRow label="Deadlines this month" value={captureStats.deadlinesThisMonth} />
        </AdminCard>

        {/* Project Status Report */}
        <AdminCard
          title="Project Status"
          actions={<AdminBadge variant="info">Live</AdminBadge>}
        >
          <MetricRow label="Active projects" value={projectStats.active} />
          <MetricRow label="At risk" value={projectStats.atRisk} sub="Needs review" />
          <MetricRow label="Blocked" value={projectStats.blocked} sub="Immediate action" />
          <MetricRow label="Completed (this year)" value={projectStats.completedThisYear} />
          <MetricRow label="Open risks" value={projectStats.openRisks} />
          <MetricRow label="Milestones due (14d)" value={projectStats.upcomingMilestones} />
        </AdminCard>

        {/* Knowledge Base Report */}
        <AdminCard
          title="Knowledge Repository"
          actions={<AdminBadge variant="info">Live</AdminBadge>}
        >
          <MetricRow label="Total articles" value={knowledgeStats.total} />
          <MetricRow label="Approved" value={knowledgeStats.approved} />
          <MetricRow label="Drafts" value={knowledgeStats.draftCount} />
          <MetricRow label="Due for review" value={knowledgeStats.dueForReview} />
        </AdminCard>

        {/* Platform Activity Report */}
        <AdminCard
          title="Platform Activity"
          actions={<AdminBadge variant="info">Live</AdminBadge>}
        >
          <MetricRow label="Total audit events" value={activityStats.total} />
          <MetricRow label="Activity today" value={activityStats.today} />
          <MetricRow label="Activity this week" value={activityStats.thisWeek} />
          {Object.entries(activityStats.byVerb)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([verb, count]) => (
              <MetricRow key={verb} label={verb} value={count} />
            ))}
        </AdminCard>
      </div>

      {/* Pipeline stage breakdown */}
      {pipelineStats.byStage && Object.keys(pipelineStats.byStage).length > 0 && (
        <AdminCard title="Opportunity Pipeline by Stage">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Object.entries(pipelineStats.byStage).map(([stage, count]) => (
              <div key={stage} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-center">
                <p className="text-xl font-bold text-zinc-100">{count as number}</p>
                <p className="mt-1 text-xs text-zinc-500 capitalize">{stage.replace(/-/g, " ")}</p>
              </div>
            ))}
          </div>
        </AdminCard>
      )}

      {/* Report coverage map */}
      <AdminCard title="Report Coverage" description="Domain status across the platform">
        <div className="divide-y divide-zinc-800">
          {[
            { domain: "Business Development", status: "live", desc: "Clients, contacts, opportunities, pipeline value" },
            { domain: "Proposal Intelligence", status: "live", desc: "Win rate, active proposals, expiry tracking" },
            { domain: "Government Capture", status: "live", desc: "Weighted pipeline, gate reviews, deadlines" },
            { domain: "Project Status", status: "live", desc: "Health, risks, milestones, blockers" },
            { domain: "Knowledge Repository", status: "live", desc: "Published articles, reviews, drafts" },
            { domain: "Platform Activity", status: "live", desc: "Audit events, logins, changes" },
            { domain: "Revenue & Invoicing", status: "planned", desc: "Invoiced, collected, projected revenue by period" },
            { domain: "Contract Lifecycle", status: "planned", desc: "Prime contracts, task orders, deliverables" },
            { domain: "Website Analytics", status: "existing", desc: "Traffic, conversion, SEO — see Analytics module", href: "/admin/analytics" },
          ].map(({ domain, status, desc }) => (
            <div key={domain} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-200">{domain}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
              </div>
              <AdminBadge
                variant={status === "live" ? "success" : status === "existing" ? "info" : "neutral"}
              >
                {status === "live" ? "Live" : status === "existing" ? "Linked" : "Planned"}
              </AdminBadge>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
