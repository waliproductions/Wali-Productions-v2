import { activityRepository } from "@/lib/repositories/activity.repository";
import type { ActivityRecord, ActivityVerb } from "@/lib/repositories/activity.repository";
import { getContactAuditEvents } from "@/lib/admin/contact-dashboard";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Audit & Activity Log" };

type Props = {
  searchParams?: Promise<{ q?: string; verb?: string; entity?: string; tab?: string }>;
};

const VERB_VARIANT: Record<ActivityVerb, "success" | "info" | "neutral" | "warning" | "danger"> = {
  created: "success",
  updated: "info",
  deleted: "danger",
  archived: "neutral",
  restored: "success",
  approved: "success",
  rejected: "danger",
  submitted: "info",
  completed: "success",
  assigned: "info",
  commented: "neutral",
  uploaded: "info",
  downloaded: "neutral",
  "logged-in": "success",
  "logged-out": "neutral",
  "settings-changed": "warning",
  "workflow-started": "info",
  "workflow-completed": "success",
  "workflow-failed": "danger",
  "notification-sent": "neutral",
};

function ActivityRow({ a }: { a: ActivityRecord }) {
  return (
    <div className="px-5 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <AdminBadge variant={VERB_VARIANT[a.verb] ?? "neutral"}>{a.verb}</AdminBadge>
        <span className="text-sm font-medium text-zinc-200 capitalize">{a.entityType}</span>
        {a.entityTitle && (
          <span className="text-sm text-zinc-400 truncate">{a.entityTitle}</span>
        )}
        <span className="ml-auto text-xs text-zinc-600">{formatDate(a.createdAt)}</span>
      </div>
      <p className="mt-1.5 text-sm text-zinc-300">{a.summary}</p>
      <div className="mt-1 flex flex-wrap gap-3 text-xs text-zinc-500">
        <span>Actor: <span className="text-zinc-400">{a.actor}</span></span>
        {a.entityId && <span>ID: <span className="font-mono text-zinc-400">{a.entityId}</span></span>}
        {a.ipAddress && <span>IP: <span className="text-zinc-400">{a.ipAddress}</span></span>}
      </div>
    </div>
  );
}

export default async function AdminAuditPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params?.q?.trim() ?? "";
  const verbFilter = params?.verb;
  const entityFilter = params?.entity;
  const tab = params?.tab ?? "activity";

  const [stats, activityResult, contactEvents] = await Promise.all([
    activityRepository.getStats(),
    activityRepository.findAll({
      search: q || undefined,
      filters: [
        ...(verbFilter ? [{ field: "verb", operator: "eq" as const, value: verbFilter }] : []),
        ...(entityFilter ? [{ field: "entityType", operator: "eq" as const, value: entityFilter }] : []),
      ],
      sort: { field: "createdAt", order: "desc" },
      perPage: 50,
    }),
    getContactAuditEvents(),
  ]);

  const verbOptions = Object.keys(VERB_VARIANT) as ActivityVerb[];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Audit & Activity Log"
        description="Full platform audit trail — entity changes, logins, workflow events, and contact pipeline."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-3 gap-4">
        <AdminStatCard label="Total events" value={stats.total} />
        <AdminStatCard label="This week" value={stats.thisWeek} />
        <AdminStatCard label="Today" value={stats.today} />
      </section>

      {/* Tab selector */}
      <form className="flex gap-2" method="GET">
        {(["activity", "contact"] as const).map((t) => (
          <button
            key={t}
            type="submit"
            name="tab"
            value={t}
            className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "border-amber-400 bg-amber-500/10 text-amber-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            {t === "activity" ? "Enterprise Activity" : "Contact Pipeline"}
          </button>
        ))}
      </form>

      {tab === "activity" ? (
        <>
          {/* Filters */}
          <form className="flex flex-wrap gap-2" method="GET">
            <input name="tab" type="hidden" value="activity" />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search activity…"
              className="min-w-48 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-amber-400"
            />
            <select
              name="verb"
              defaultValue={verbFilter ?? ""}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-amber-400"
            >
              <option value="">All verbs</option>
              {verbOptions.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <select
              name="entity"
              defaultValue={entityFilter ?? ""}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-amber-400"
            >
              <option value="">All entities</option>
              {["auth", "system", "contact", "opportunity", "proposal", "project", "knowledge", "document", "workflow", "capture"].map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-300"
            >
              Filter
            </button>
          </form>

          <AdminCard
            title={`${activityResult.total} activity record${activityResult.total !== 1 ? "s" : ""}`}
            padded={false}
          >
            {activityResult.items.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm text-zinc-500">
                  {stats.total === 0
                    ? "No activity recorded yet. Actions you take in the portal will appear here."
                    : "No records match this filter."}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-800">
                {activityResult.items.map((a) => (
                  <ActivityRow key={a.id} a={a} />
                ))}
              </div>
            )}
          </AdminCard>

          {Object.keys(stats.byVerb).length > 0 && (
            <AdminCard title="Activity by Type">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(Object.entries(stats.byVerb) as [ActivityVerb, number][])
                  .sort(([, a], [, b]) => b - a)
                  .map(([verb, count]) => (
                    <div key={verb} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-center">
                      <p className="text-lg font-bold text-zinc-100">{count}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">{verb}</p>
                    </div>
                  ))}
              </div>
            </AdminCard>
          )}
        </>
      ) : (
        <AdminCard
          title={`${contactEvents.length} contact pipeline event${contactEvents.length !== 1 ? "s" : ""}`}
          padded={false}
        >
          {contactEvents.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-zinc-500">No contact pipeline events recorded.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {contactEvents.map((e) => (
                <div key={e.eventId} className="px-5 py-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300">
                      {e.event}
                    </span>
                    <span className="text-xs text-zinc-500">{e.timestamp}</span>
                  </div>
                  <div className="mt-2 grid gap-2 text-xs text-zinc-500 sm:grid-cols-3">
                    <span>Submission: <span className="font-mono text-zinc-400">{e.submissionId}</span></span>
                    <span>Event: <span className="font-mono text-zinc-400">{e.eventId}</span></span>
                    <span>Actor: <span className="text-zinc-400">{e.actor}</span></span>
                  </div>
                  {e.details && Object.keys(e.details).length > 0 && (
                    <details className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3">
                      <summary className="cursor-pointer text-xs font-medium text-amber-400">Details</summary>
                      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs text-zinc-400">
                        {JSON.stringify(e.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </AdminCard>
      )}
    </div>
  );
}
