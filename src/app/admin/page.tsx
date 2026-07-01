import Link from "next/link";
import { leadRepository } from "@/lib/repositories/lead.repository";
import { organizationRepository } from "@/lib/repositories/organization.repository";
import { contactRepository } from "@/lib/repositories/contact.repository";
import { meetingRepository } from "@/lib/repositories/meeting.repository";
import { opportunityRepository } from "@/lib/repositories/opportunity.repository";
import { projectRepository } from "@/lib/repositories/project.repository";
import { proposalRepository } from "@/lib/repositories/proposal.repository";
import { knowledgeRepository } from "@/lib/repositories/knowledge.repository";
import { notificationRepository } from "@/lib/repositories/notification.repository";
import { activityRepository } from "@/lib/repositories/activity.repository";
import { captureRepository } from "@/lib/repositories/capture.repository";
import { workflowRepository, workflowInstanceRepository } from "@/lib/repositories/workflow.repository";
import { getContactDashboardSubmissions } from "@/lib/admin/contact-dashboard";
import { AdminWidget, AdminWidgetList, AdminWidgetMetric } from "@/components/admin/AdminWidget";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Executive Dashboard" };

function currency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

function pct(num: number, den: number): string {
  if (den === 0) return "—";
  return `${Math.round((num / den) * 100)}%`;
}

function healthScore(active: number, atRisk: number, blocked: number): number {
  if (active === 0) return 100;
  const riskWeight = atRisk * 0.5 + blocked * 1.0;
  return Math.max(0, Math.round(100 - (riskWeight / active) * 100));
}

export default async function AdminDashboardPage() {
  const [
    leadStats,
    recentLeads,
    orgStats,
    contactStats,
    meetingStats,
    pipelineStats,
    projectStats,
    proposalStats,
    knowledgeStats,
    unreadCount,
    submissions,
    upcomingMeetings,
    activityStats,
    captureStats,
    wfStats,
    wfInstanceStats,
    recentActivity,
    expiringProposals,
  ] = await Promise.all([
    leadRepository.getStats(),
    leadRepository.getRecent(5),
    organizationRepository.getStats(),
    contactRepository.getStats(),
    meetingRepository.getStats(),
    opportunityRepository.getPipelineStats(),
    projectRepository.getStats(),
    proposalRepository.getStats(),
    knowledgeRepository.getStats(),
    notificationRepository.getUnreadCount(),
    getContactDashboardSubmissions(),
    meetingRepository.getUpcoming(5),
    activityRepository.getStats(),
    captureRepository.getStats(),
    workflowRepository.getStats(),
    workflowInstanceRepository.getStats(),
    activityRepository.getRecent(6),
    proposalRepository.getExpiringProposals(14),
  ]);

  const recentSubmissions = submissions.slice(0, 5);
  const projHealthScore = healthScore(projectStats.active, projectStats.atRisk, projectStats.blocked);
  const winRate = pct(proposalStats.accepted, proposalStats.total);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Command Center
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-50">
            Executive Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Wali Productions LLC · Enterprise Operating Platform v1.4
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {leadStats.followUpsDue > 0 && (
            <Link
              href="/admin/leads?followups=1"
              className="flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300 transition-colors hover:border-sky-400/50"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              {leadStats.followUpsDue} lead follow-up{leadStats.followUpsDue !== 1 ? "s" : ""} due
            </Link>
          )}
          {unreadCount > 0 && (
            <Link
              href="/admin/notifications"
              className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 transition-colors hover:border-amber-400/50"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {unreadCount} notification{unreadCount !== 1 ? "s" : ""}
            </Link>
          )}
          {expiringProposals.length > 0 && (
            <Link
              href="/admin/operations/proposals"
              className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300 transition-colors hover:border-red-400/50"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              {expiringProposals.length} proposal{expiringProposals.length !== 1 ? "s" : ""} expiring
            </Link>
          )}
          {captureStats.deadlinesThisMonth > 0 && (
            <Link
              href="/admin/contracts/capture"
              className="flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300 transition-colors hover:border-violet-400/50"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              {captureStats.deadlinesThisMonth} capture deadline{captureStats.deadlinesThisMonth !== 1 ? "s" : ""} this month
            </Link>
          )}
        </div>
      </div>

      {/* Top KPIs — Business Health */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
        {[
          { label: "Leads", value: leadStats.total, sub: `${leadStats.new} new · ${leadStats.qualified} qualified`, href: "/admin/leads" },
          { label: "Organizations", value: orgStats.total, sub: `${orgStats.activeClients} clients`, href: "/admin/crm/organizations" },
          { label: "Revenue Pipeline", value: currency(pipelineStats.totalValue), sub: `${pipelineStats.activeCount} active`, href: "/admin/crm/pipeline" },
          { label: "Proposal Win Rate", value: winRate, sub: `${proposalStats.accepted} won`, href: "/admin/operations/proposals" },
          { label: "Active Projects", value: projectStats.active, sub: `Health ${projHealthScore}%`, href: "/admin/projects" },
          { label: "Capture Plans", value: captureStats.activePursuit, sub: currency(captureStats.weightedPipelineValue), href: "/admin/contracts/capture" },
          { label: "Knowledge Docs", value: knowledgeStats.total, sub: `${knowledgeStats.dueForReview} for review`, href: "/admin/knowledge" },
        ].map(({ label, value, sub, href }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-sm transition-colors hover:border-zinc-700 hover:bg-zinc-900"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</span>
            <span className="text-2xl font-bold text-zinc-50">{value}</span>
            <span className="text-xs text-zinc-500">{sub}</span>
          </Link>
        ))}
      </section>

      {/* Project Health Score Banner */}
      {projectStats.active > 0 && (
        <div className={`flex items-center gap-4 rounded-xl border px-5 py-3 ${
          projHealthScore >= 80
            ? "border-emerald-500/20 bg-emerald-500/5"
            : projHealthScore >= 60
              ? "border-amber-500/20 bg-amber-500/5"
              : "border-red-500/20 bg-red-500/5"
        }`}>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Project Portfolio Health</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    projHealthScore >= 80 ? "bg-emerald-500" : projHealthScore >= 60 ? "bg-amber-400" : "bg-red-500"
                  }`}
                  style={{ width: `${projHealthScore}%` }}
                />
              </div>
              <span className={`text-lg font-bold ${
                projHealthScore >= 80 ? "text-emerald-400" : projHealthScore >= 60 ? "text-amber-300" : "text-red-400"
              }`}>{projHealthScore}%</span>
            </div>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="text-center">
              <p className="font-bold text-emerald-400">{projectStats.active - projectStats.atRisk - projectStats.blocked}</p>
              <p className="text-zinc-500">On Track</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-amber-400">{projectStats.atRisk}</p>
              <p className="text-zinc-500">At Risk</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-red-400">{projectStats.blocked}</p>
              <p className="text-zinc-500">Blocked</p>
            </div>
          </div>
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Column 1: Business Development */}
        <div className="flex flex-col gap-6">
          <AdminWidget title="Leads" action={{ label: "View all", href: "/admin/leads" }}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "New", value: leadStats.new },
                { label: "Qualified", value: leadStats.qualified },
                { label: "Open", value: leadStats.openCount },
                { label: "Follow-ups due", value: leadStats.followUpsDue },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-zinc-800/40 p-3">
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="mt-1 text-lg font-bold text-zinc-100">{value}</p>
                </div>
              ))}
            </div>
            {recentLeads.length > 0 && (
              <div className="mt-4 border-t border-zinc-800 pt-3">
                <AdminWidgetList
                  items={recentLeads.map((lead) => ({
                    label: lead.companyName ? `${lead.fullName} · ${lead.companyName}` : lead.fullName,
                    badge: (
                      <AdminBadge variant={lead.status === "won" ? "success" : lead.status === "lost" ? "danger" : "info"}>
                        {lead.status}
                      </AdminBadge>
                    ),
                    href: `/admin/leads/${lead.id}`,
                  }))}
                />
              </div>
            )}
          </AdminWidget>

          <AdminWidget title="Business Development" action={{ label: "CRM", href: "/admin/crm" }}>
            <div className="space-y-3 text-sm">
              {[
                ["Prospects", orgStats.prospects, "text-zinc-200"],
                ["Active clients", orgStats.activeClients, "text-emerald-400"],
                ["Partners", orgStats.partners, "text-sky-400"],
                ["Total contacts", contactStats.total, "text-zinc-200"],
                ["Follow-ups due", contactStats.followUpsDue, contactStats.followUpsDue > 0 ? "text-amber-300" : "text-zinc-200"],
                ["Decision makers", contactStats.decisionMakers, "text-zinc-200"],
              ].map(([label, value, color]) => (
                <div key={label as string} className="flex justify-between">
                  <span className="text-zinc-400">{label}</span>
                  <span className={`font-semibold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </AdminWidget>

          <AdminWidget title="Opportunity Pipeline" action={{ label: "Pipeline", href: "/admin/crm/pipeline" }}>
            <div className="space-y-2">
              {(
                [
                  ["Lead", pipelineStats.byStage.lead, "bg-zinc-400"],
                  ["Qualified", pipelineStats.byStage.qualified, "bg-sky-400"],
                  ["Proposal", pipelineStats.byStage.proposal, "bg-amber-400"],
                  ["Negotiation", pipelineStats.byStage.negotiation, "bg-violet-400"],
                  ["Awarded", pipelineStats.byStage.awarded, "bg-emerald-400"],
                ] as const
              ).map(([label, count, dot]) => (
                <div key={label} className="flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${dot}`} />
                    <span className="text-zinc-400">{label}</span>
                  </div>
                  <span className="font-semibold text-zinc-200">{count}</span>
                </div>
              ))}
              <div className="mt-2 border-t border-zinc-800 pt-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total value</span>
                  <span className="font-semibold text-zinc-200">{currency(pipelineStats.totalValue)}</span>
                </div>
              </div>
              {pipelineStats.deadlinesThisWeek > 0 && (
                <div className="mt-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2">
                  <p className="text-xs font-medium text-red-300">
                    {pipelineStats.deadlinesThisWeek} deadline{pipelineStats.deadlinesThisWeek !== 1 ? "s" : ""} this week
                  </p>
                </div>
              )}
            </div>
          </AdminWidget>

          <AdminWidget title="Proposal Intelligence" action={{ label: "Proposals", href: "/admin/operations/proposals" }}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Win Rate", value: winRate, hint: "of all proposals" },
                { label: "Pipeline", value: `${proposalStats.drafts + proposalStats.inReview + proposalStats.sent}`, hint: "active proposals" },
                { label: "Accepted", value: String(proposalStats.accepted), hint: "total won" },
                { label: "Sent", value: String(proposalStats.sent), hint: "awaiting response" },
              ].map(({ label, value, hint }) => (
                <div key={label} className="rounded-lg bg-zinc-800/40 p-3">
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="mt-1 text-lg font-bold text-zinc-100">{value}</p>
                  <p className="mt-0.5 text-xs text-zinc-600">{hint}</p>
                </div>
              ))}
            </div>
          </AdminWidget>
        </div>

        {/* Column 2: Projects + Operations */}
        <div className="flex flex-col gap-6">
          <AdminWidget title="Projects at Risk" action={{ label: "Projects", href: "/admin/projects" }}>
            <div className="space-y-2">
              {(
                [
                  ["Active", projectStats.active, "bg-emerald-500"],
                  ["At Risk", projectStats.atRisk, "bg-amber-500"],
                  ["Blocked", projectStats.blocked, "bg-red-500"],
                ] as const
              ).map(([label, count, dot]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${dot}`} />
                    <span className="text-zinc-400">{label}</span>
                  </div>
                  <span className="font-semibold text-zinc-200">{count}</span>
                </div>
              ))}
              <div className="mt-2 border-t border-zinc-800 pt-2 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Open risks</span>
                  <span className={`font-semibold ${projectStats.openRisks > 0 ? "text-amber-300" : "text-zinc-200"}`}>
                    {projectStats.openRisks}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Milestones (14d)</span>
                  <span className="font-semibold text-zinc-200">{projectStats.upcomingMilestones}</span>
                </div>
              </div>
            </div>
          </AdminWidget>

          <AdminWidget title="Contract Milestones" action={{ label: "Meetings", href: "/admin/crm/meetings" }}>
            {upcomingMeetings.length === 0 ? (
              <p className="text-sm text-zinc-600">No upcoming meetings.</p>
            ) : (
              <ul className="divide-y divide-zinc-800/60">
                {upcomingMeetings.map((m) => (
                  <li key={m.id} className="py-2.5">
                    <p className="truncate text-sm font-medium text-zinc-200">{m.title}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {formatDate(m.scheduledAt)} · {m.durationMinutes ?? "—"}m
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </AdminWidget>

          <AdminWidget title="Workflows" action={{ label: "Workflows", href: "/admin/workflows" }}>
            <div className="space-y-2 text-sm">
              {[
                ["Definitions", wfStats.total, "text-zinc-200"],
                ["Active", wfStats.active, "text-emerald-400"],
                ["Running instances", wfInstanceStats.active, "text-sky-400"],
                ["Completed", wfInstanceStats.completed, "text-zinc-200"],
                ["Failed", wfInstanceStats.failed, wfInstanceStats.failed > 0 ? "text-red-400" : "text-zinc-200"],
              ].map(([label, value, color]) => (
                <div key={label as string} className="flex justify-between">
                  <span className="text-zinc-400">{label}</span>
                  <span className={`font-semibold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </AdminWidget>
        </div>

        {/* Column 3: Intelligence + Activity */}
        <div className="flex flex-col gap-6">
          <AdminWidget title="Government Capture" action={{ label: "Capture", href: "/admin/contracts/capture" }}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Active Pursuit", value: captureStats.activePursuit },
                { label: "Gate Reviews", value: captureStats.upcomingGateReviews },
                { label: "Pipeline", value: currency(captureStats.totalPipelineValue) },
                { label: "Weighted", value: currency(captureStats.weightedPipelineValue) },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-zinc-800/40 p-3">
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="mt-1 text-base font-bold text-zinc-100">{value}</p>
                </div>
              ))}
            </div>
          </AdminWidget>

          <AdminWidget title="Contact Inquiries" action={{ label: "View all", href: "/admin/contact" }}>
            <AdminWidgetMetric label="Total received" value={submissions.length} hint="All time" />
            {recentSubmissions.length > 0 && (
              <div className="mt-4">
                <AdminWidgetList
                  items={recentSubmissions.map((s) => ({
                    label: s.requester?.name ?? "Unknown",
                    badge: (
                      <AdminBadge
                        variant={
                          s.lifecycleStatus === "processed"
                            ? "success"
                            : s.lifecycleStatus === "failed"
                              ? "danger"
                              : "neutral"
                        }
                      >
                        {s.lifecycleStatus}
                      </AdminBadge>
                    ),
                    href: `/admin/contact/${s.submissionId}`,
                  }))}
                />
              </div>
            )}
          </AdminWidget>

          <AdminWidget title="Knowledge Base Updates" action={{ label: "Knowledge", href: "/admin/knowledge" }}>
            <div className="space-y-2 text-sm">
              {[
                ["Total documents", knowledgeStats.total, "text-zinc-200"],
                ["Approved", knowledgeStats.approved, "text-emerald-400"],
                ["Drafts", knowledgeStats.draftCount, "text-zinc-200"],
                ["Due for review", knowledgeStats.dueForReview, knowledgeStats.dueForReview > 0 ? "text-amber-300" : "text-zinc-200"],
              ].map(([label, value, color]) => (
                <div key={label as string} className="flex justify-between">
                  <span className="text-zinc-400">{label}</span>
                  <span className={`font-semibold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </AdminWidget>

          <AdminWidget title="Recent Activity" action={{ label: "Audit log", href: "/admin/audit" }}>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-zinc-600">No recent activity.</p>
            ) : (
              <ul className="divide-y divide-zinc-800/60">
                {recentActivity.map((a) => (
                  <li key={a.id} className="py-2">
                    <p className="truncate text-xs font-medium text-zinc-300">{a.summary}</p>
                    <p className="mt-0.5 text-xs text-zinc-600">
                      {a.actor} · {formatDate(a.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </AdminWidget>

          <AdminWidget title="Quick Access" size="compact">
            <AdminWidgetList
              items={[
                { label: "CRM Pipeline", href: "/admin/crm/pipeline" },
                { label: "Capture Plans", href: "/admin/contracts/capture" },
                { label: "Risk Register", href: "/admin/projects/risks" },
                { label: "Document Manager", href: "/admin/documents" },
                { label: "Workflows", href: "/admin/workflows" },
                { label: "Notifications", href: "/admin/notifications" },
                { label: "Platform Health", href: "/admin/health" },
                { label: "Search", href: "/admin/search" },
              ]}
            />
          </AdminWidget>
        </div>
      </div>
    </div>
  );
}
