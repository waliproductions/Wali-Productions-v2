import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import {
  getContactAuditEvents,
  getContactDashboardSubmissions,
  type ContactAuditEvent,
} from "@/lib/admin/contact-dashboard";
import type { AdminTableColumn } from "@/lib/admin/types";
import { cn, formatDateTime, humanizeSegment } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Analytics",
};

const BAR_COLORS: Record<string, string> = {
  success: "bg-emerald-500",
  danger: "bg-red-500",
  warning: "bg-amber-500",
  neutral: "bg-zinc-500",
};

function eventBadgeVariant(event: string): "info" | "success" | "danger" | "neutral" {
  if (event === "email_sent") return "success";
  if (event === "email_failed") return "danger";
  if (event === "received") return "info";
  return "neutral";
}

const EVENT_COLUMNS: AdminTableColumn<ContactAuditEvent>[] = [
  {
    key: "timestamp",
    header: "Time",
    render: (event) => (
      <span className="whitespace-nowrap text-xs text-zinc-400">
        {formatDateTime(event.timestamp)}
      </span>
    ),
  },
  {
    key: "event",
    header: "Event",
    render: (event) => (
      <AdminBadge variant={eventBadgeVariant(event.event)}>
        {humanizeSegment(event.event)}
      </AdminBadge>
    ),
  },
  {
    key: "submissionId",
    header: "Submission",
    hideOnMobile: true,
    render: (event) => (
      <code className="text-xs text-zinc-400">
        {event.submissionId.slice(0, 8)}…
      </code>
    ),
  },
  {
    key: "actor",
    header: "Actor",
    hideOnMobile: true,
    render: (event) => <span className="text-zinc-400">{event.actor}</span>,
  },
];

export default async function AdminAnalyticsPage() {
  const [submissions, auditEvents] = await Promise.all([
    getContactDashboardSubmissions(),
    getContactAuditEvents(),
  ]);

  const now = Date.now();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayIso = todayStart.toISOString();

  const total = submissions.length;
  const last30 = submissions.filter((s) => s.submittedAtUtc >= thirtyDaysAgo).length;
  const last7 = submissions.filter((s) => s.submittedAtUtc >= sevenDaysAgo).length;
  const today = submissions.filter((s) => s.submittedAtUtc >= todayIso).length;

  const queueCount = submissions.filter((s) => s.folder === "queue").length;
  const processedCount = submissions.filter((s) => s.folder === "processed").length;
  const failedCount = submissions.filter((s) => s.folder === "failed").length;
  const archiveCount = submissions.filter((s) => s.folder === "archive").length;

  const attemptedCount = submissions.filter(
    (s) => s.emailDeliveryStatus !== "pending"
  ).length;
  const sentCount = submissions.filter(
    (s) => s.emailDeliveryStatus === "sent"
  ).length;
  const successRateDisplay =
    attemptedCount > 0
      ? `${Math.round((sentCount / attemptedCount) * 100)}%`
      : "—";

  // Service breakdown — group by inquiry.service
  const serviceMap = new Map<string, number>();
  for (const sub of submissions) {
    const svc = sub.inquiry.service ?? "Not specified";
    serviceMap.set(svc, (serviceMap.get(svc) ?? 0) + 1);
  }
  const services = [...serviceMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([service, count]) => ({ service, count }));
  const maxServiceCount = services[0]?.count ?? 1;

  const pipelineSummary = [
    { label: "Processed", count: processedCount, variant: "success" as const },
    { label: "Failed", count: failedCount, variant: "danger" as const },
    { label: "In queue", count: queueCount, variant: "warning" as const },
    { label: "Archived", count: archiveCount, variant: "neutral" as const },
  ];

  const recentEvents = auditEvents.slice(0, 10);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Analytics"
        description="Contact pipeline metrics and submission trends derived from production data."
        actions={
          <AdminButton href="/admin" variant="outline" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <section aria-label="Volume metrics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard
            label="All-time inquiries"
            value={total}
            hint="Total contact submissions"
            href="/admin/contact"
          />
          <AdminStatCard
            label="Last 30 days"
            value={last30}
            hint="Contact submissions"
          />
          <AdminStatCard
            label="Last 7 days"
            value={last7}
            hint="Contact submissions"
          />
          <AdminStatCard
            label="Today"
            value={today}
            hint="Contact submissions"
          />
        </div>
      </section>

      <section aria-label="Pipeline state">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard
            label="Email success rate"
            value={successRateDisplay}
            hint={
              attemptedCount > 0
                ? `${sentCount} of ${attemptedCount} delivered`
                : "No deliveries yet"
            }
          />
          <AdminStatCard
            label="Failed"
            value={failedCount}
            hint="Require attention"
            href={failedCount > 0 ? "/admin/contact?status=failed" : undefined}
          />
          <AdminStatCard
            label="In queue"
            value={queueCount}
            hint="Awaiting delivery"
          />
          <AdminStatCard
            label="Archived"
            value={archiveCount}
            hint="Closed submissions"
          />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard
          title="Service Breakdown"
          description="Inquiries grouped by requested service"
        >
          {services.length === 0 ? (
            <AdminEmptyState
              title="No submissions yet"
              description="Service breakdown will appear once contact submissions are received."
              compact
            />
          ) : (
            <div className="space-y-3">
              {services.map(({ service, count }) => {
                const pct = Math.round((count / maxServiceCount) * 100);
                return (
                  <div key={service} className="flex items-center gap-3 text-sm">
                    <div
                      className="w-40 truncate text-zinc-300"
                      title={service}
                    >
                      {service}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-amber-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-6 text-right text-xs font-medium text-zinc-400">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AdminCard>

        <AdminCard
          title="Pipeline Summary"
          description="Cumulative contact pipeline state"
        >
          {total === 0 ? (
            <AdminEmptyState
              title="No submissions yet"
              description="Pipeline state will appear once contact submissions are received."
              compact
            />
          ) : (
            <div className="space-y-3">
              {pipelineSummary.map(({ label, count, variant }) => {
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <div className="w-24 shrink-0">
                      <AdminBadge variant={variant}>{label}</AdminBadge>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            BAR_COLORS[variant]
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-xs text-zinc-400">
                      {count} ({pct}%)
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AdminCard>
      </div>

      <AdminCard
        title="Recent Audit Events"
        description="Last 10 contact pipeline events"
        padded={false}
        actions={
          <AdminButton href="/admin/audit" variant="ghost" size="sm">
            View all events
          </AdminButton>
        }
      >
        <AdminTable
          columns={EVENT_COLUMNS}
          rows={recentEvents}
          getRowKey={(event) => event.eventId}
          empty={
            <AdminEmptyState
              title="No audit events yet"
              description="Events appear here once the contact pipeline processes submissions."
              compact
            />
          }
        />
      </AdminCard>
    </div>
  );
}
