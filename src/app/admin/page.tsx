import Link from "next/link";
import { organizationRepository } from "@/lib/repositories/organization.repository";
import { contactRepository } from "@/lib/repositories/contact.repository";
import { meetingRepository } from "@/lib/repositories/meeting.repository";
import { opportunityRepository } from "@/lib/repositories/opportunity.repository";
import { projectRepository } from "@/lib/repositories/project.repository";
import { proposalRepository } from "@/lib/repositories/proposal.repository";
import { knowledgeRepository } from "@/lib/repositories/knowledge.repository";
import { notificationRepository } from "@/lib/repositories/notification.repository";
import {
  getContactDashboardSubmissions,
} from "@/lib/admin/contact-dashboard";
import { AdminWidget, AdminWidgetList, AdminWidgetMetric } from "@/components/admin/AdminWidget";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate, formatRelativeTime } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Executive Dashboard" };

function currency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

export default async function AdminDashboardPage() {
  const now = Date.now();

  const [
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
  ] = await Promise.all([
    organizationRepository.getStats(),
    contactRepository.getStats(),
    meetingRepository.getStats(),
    opportunityRepository.getPipelineStats(),
    projectRepository.getStats(),
    proposalRepository.getStats(),
    knowledgeRepository.getStats(),
    notificationRepository.getUnreadCount(),
    getContactDashboardSubmissions(),
    meetingRepository.getUpcoming(4),
  ]);

  const recentSubmissions = submissions.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Command Center
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-50">
            Executive Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Wali Productions LLC — daily operating view
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="mt-1 flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {unreadCount} notification{unreadCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Top KPIs */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Organizations", value: orgStats.total, sub: `${orgStats.activeClients} clients`, href: "/admin/crm/organizations" },
          { label: "Open Pipeline", value: pipelineStats.activeCount, sub: currency(pipelineStats.totalValue), href: "/admin/crm/pipeline" },
          { label: "Active Projects", value: projectStats.active, sub: `${projectStats.atRisk} at risk`, href: "/admin/projects" },
          { label: "Proposals", value: proposalStats.total, sub: `${proposalStats.sent} sent`, href: "/admin/operations/proposals" },
          { label: "Gov Opps", value: pipelineStats.byStage.lead + pipelineStats.byStage.qualified + pipelineStats.byStage.proposal, sub: "pursuing", href: "/admin/contracts/opportunities" },
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

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Business Development */}
        <div className="flex flex-col gap-6">
          <AdminWidget title="Business Development" action={{ label: "CRM →", href: "/admin/crm" }}>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Prospects</span>
                <span className="font-semibold text-zinc-200">{orgStats.prospects}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Active clients</span>
                <span className="font-semibold text-zinc-200">{orgStats.activeClients}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Partners</span>
                <span className="font-semibold text-zinc-200">{orgStats.partners}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total contacts</span>
                <span className="font-semibold text-zinc-200">{contactStats.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Follow-ups due</span>
                <span className={`font-semibold ${contactStats.followUpsDue > 0 ? "text-amber-300" : "text-zinc-200"}`}>
                  {contactStats.followUpsDue}
                </span>
              </div>
            </div>
          </AdminWidget>

          <AdminWidget title="Opportunity Pipeline" action={{ label: "View all →", href: "/admin/crm/pipeline" }}>
            <div className="space-y-2">
              {(
                [
                  ["Lead", pipelineStats.byStage.lead, "text-zinc-400"],
                  ["Qualified", pipelineStats.byStage.qualified, "text-sky-400"],
                  ["Proposal", pipelineStats.byStage.proposal, "text-amber-400"],
                  ["Negotiation", pipelineStats.byStage.negotiation, "text-violet-400"],
                  ["Awarded", pipelineStats.byStage.awarded, "text-emerald-400"],
                ] as const
              ).map(([label, count, color]) => (
                <div key={label} className="flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${color.replace("text-", "bg-")}`} />
                    <span className="text-zinc-400">{label}</span>
                  </div>
                  <span className={`font-semibold ${color}`}>{count}</span>
                </div>
              ))}
              {pipelineStats.deadlinesThisWeek > 0 && (
                <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
                  <p className="text-xs font-medium text-amber-300">
                    {pipelineStats.deadlinesThisWeek} deadline{pipelineStats.deadlinesThisWeek !== 1 ? "s" : ""} this week
                  </p>
                </div>
              )}
            </div>
          </AdminWidget>
        </div>

        {/* Center column */}
        <div className="flex flex-col gap-6">
          <AdminWidget title="Project Health" action={{ label: "Projects →", href: "/admin/projects" }}>
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
              <div className="mt-2 border-t border-zinc-800 pt-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Open risks</span>
                  <span className={`font-semibold ${projectStats.openRisks > 0 ? "text-amber-300" : "text-zinc-200"}`}>
                    {projectStats.openRisks}
                  </span>
                </div>
                <div className="mt-1.5 flex justify-between">
                  <span className="text-zinc-400">Milestones (14d)</span>
                  <span className="font-semibold text-zinc-200">{projectStats.upcomingMilestones}</span>
                </div>
              </div>
            </div>
          </AdminWidget>

          <AdminWidget title="Upcoming Meetings" action={{ label: "View all →", href: "/admin/crm/meetings" }}>
            {upcomingMeetings.length === 0 ? (
              <p className="text-sm text-zinc-600">No upcoming meetings.</p>
            ) : (
              <ul className="divide-y divide-zinc-800/60">
                {upcomingMeetings.map((m) => (
                  <li key={m.id} className="py-2.5">
                    <p className="text-sm font-medium text-zinc-200 truncate">{m.title}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {formatDate(m.scheduledAt)} · {m.durationMinutes ?? "—"}m
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </AdminWidget>

          <AdminWidget title="Proposals" action={{ label: "View all →", href: "/admin/operations/proposals" }}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Drafts</span>
                <span className="font-semibold text-zinc-200">{proposalStats.drafts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">In review</span>
                <span className="font-semibold text-zinc-200">{proposalStats.inReview}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Sent</span>
                <span className="font-semibold text-amber-300">{proposalStats.sent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Accepted</span>
                <span className="font-semibold text-emerald-400">{proposalStats.accepted}</span>
              </div>
            </div>
          </AdminWidget>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <AdminWidget title="Contact Inquiries" action={{ label: "View all →", href: "/admin/contact" }}>
            <AdminWidgetMetric
              label="Total received"
              value={submissions.length}
              hint="All time"
            />
            {recentSubmissions.length > 0 && (
              <div className="mt-4">
                <AdminWidgetList
                  items={recentSubmissions.map((s) => ({
                    label: s.requester?.name ?? "Unknown",
                    value: s.lifecycleStatus,
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

          <AdminWidget title="Government" action={{ label: "Gov workspace →", href: "/admin/contracts" }}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Tracking</span>
                <span className="font-semibold text-zinc-200">
                  {pipelineStats.byStage.lead + pipelineStats.byStage.qualified}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Proposal phase</span>
                <span className="font-semibold text-amber-300">{pipelineStats.byStage.proposal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Deadlines this week</span>
                <span className={`font-semibold ${pipelineStats.deadlinesThisWeek > 0 ? "text-red-400" : "text-zinc-200"}`}>
                  {pipelineStats.deadlinesThisWeek}
                </span>
              </div>
            </div>
          </AdminWidget>

          <AdminWidget title="Knowledge Base" action={{ label: "View →", href: "/admin/knowledge" }}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Total documents</span>
                <span className="font-semibold text-zinc-200">{knowledgeStats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Approved</span>
                <span className="font-semibold text-emerald-400">{knowledgeStats.approved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Drafts</span>
                <span className="font-semibold text-zinc-200">{knowledgeStats.draftCount}</span>
              </div>
              {knowledgeStats.dueForReview > 0 && (
                <div className="mt-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
                  <p className="text-xs font-medium text-amber-300">
                    {knowledgeStats.dueForReview} due for review
                  </p>
                </div>
              )}
            </div>
          </AdminWidget>

          <AdminWidget title="Quick Access" size="compact">
            <AdminWidgetList
              items={[
                { label: "CRM Pipeline", href: "/admin/crm/pipeline" },
                { label: "Risk Register", href: "/admin/projects/risks" },
                { label: "Gov Opportunities", href: "/admin/contracts/opportunities" },
                { label: "Knowledge Base", href: "/admin/knowledge" },
                { label: "Platform Health", href: "/admin/health" },
                { label: "Settings", href: "/admin/settings" },
              ]}
            />
          </AdminWidget>
        </div>
      </div>
    </div>
  );
}
