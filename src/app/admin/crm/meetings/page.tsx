import { meetingRepository } from "@/lib/repositories/meeting.repository";
import type { StoredMeeting } from "@/lib/repositories/meeting.repository";
import { organizationRepository } from "@/lib/repositories/organization.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate, formatDateTime } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Meetings — CRM" };

type Props = { searchParams?: Promise<{ status?: string }> };

const STATUS_VARIANT: Record<string, "success" | "info" | "neutral" | "warning" | "danger"> = {
  scheduled: "info",
  completed: "success",
  cancelled: "neutral",
  "no-show": "danger",
};

function buildCols(orgMap: Map<string, string>): AdminTableColumn<StoredMeeting>[] {
  return [
    {
      key: "title",
      header: "Meeting",
      render: (m) => (
        <div>
          <p className="font-medium text-zinc-100">{m.title}</p>
          <p className="text-xs text-zinc-500 capitalize">{m.type.replace(/-/g, " ")}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (m) => (
        <AdminBadge variant={STATUS_VARIANT[m.status] ?? "neutral"}>
          {m.status}
        </AdminBadge>
      ),
    },
    {
      key: "organization",
      header: "Organization",
      render: (m) => (
        <span className="text-sm text-zinc-400">
          {m.organizationId ? (orgMap.get(m.organizationId) ?? "—") : "—"}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: "date",
      header: "Date",
      render: (m) => (
        <span className="text-sm text-zinc-400">{formatDate(m.scheduledAt)}</span>
      ),
    },
    {
      key: "duration",
      header: "Duration",
      render: (m) => (
        <span className="text-sm text-zinc-400">
          {m.durationMinutes ? `${m.durationMinutes}m` : "—"}
        </span>
      ),
      align: "center",
      hideOnMobile: true,
    },
    {
      key: "followUp",
      header: "Follow-up",
      render: (m) => m.followUpDate ? (
        <span className="text-sm text-amber-300">{formatDate(m.followUpDate)}</span>
      ) : <span className="text-zinc-600">—</span>,
      hideOnMobile: true,
    },
  ];
}

export default async function AdminMeetingsPage({ searchParams }: Props) {
  const params = await searchParams;
  const statusFilter = params?.status;

  const [stats, result, orgsResult] = await Promise.all([
    meetingRepository.getStats(),
    meetingRepository.findAll({
      filters: statusFilter
        ? [{ field: "status", operator: "eq", value: statusFilter }]
        : undefined,
      sort: { field: "scheduledAt", order: "desc" },
      perPage: 100,
    }),
    organizationRepository.findAll({ perPage: 200 }),
  ]);

  const orgMap = new Map(orgsResult.items.map((o) => [o.id, o.name]));
  const COLS = buildCols(orgMap);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Meetings"
        description="All scheduled and completed meetings with prospects, clients, and partners."
        actions={
          <AdminButton href="/admin/crm" variant="ghost" size="md">
            Back to CRM
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard label="Upcoming" value={stats.upcoming} hint="Scheduled" />
        <AdminStatCard label="Completed this month" value={stats.completedThisMonth} />
        <AdminStatCard label="Total scheduled" value={stats.scheduled} />
      </section>

      {/* Status filter */}
      <form className="flex flex-wrap gap-2" method="GET">
        {[
          { label: "All", value: "" },
          { label: "Scheduled", value: "scheduled" },
          { label: "Completed", value: "completed" },
          { label: "Cancelled", value: "cancelled" },
        ].map(({ label, value }) => (
          <button
            key={value}
            type="submit"
            name="status"
            value={value}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              (statusFilter ?? "") === value
                ? "border-amber-400 bg-amber-500/10 text-amber-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}
      </form>

      <AdminCard
        title={`${result.total} meeting${result.total !== 1 ? "s" : ""}`}
        padded={false}
      >
        <AdminTable
          columns={COLS}
          rows={result.items}
          getRowKey={(m) => m.id}
        />
      </AdminCard>

      {/* Action items summary */}
      {result.items.some((m) => (m.actionItems ?? []).length > 0) && (
        <AdminCard title="Open Action Items">
          <ul className="space-y-3">
            {result.items
              .filter((m) => (m.actionItems ?? []).length > 0 && m.status === "completed")
              .flatMap((m) =>
                (m.actionItems ?? []).map((item, i) => (
                  <li key={`${m.id}-${i}`} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <div>
                      <p className="text-sm text-zinc-200">{item}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        From: {m.title} · {formatDate(m.scheduledAt)}
                      </p>
                    </div>
                  </li>
                )),
              )}
          </ul>
        </AdminCard>
      )}
    </div>
  );
}
