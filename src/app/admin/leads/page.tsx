import Link from "next/link";
import { leadRepository } from "@/lib/repositories/lead.repository";
import type { StoredLead } from "@/lib/repositories/lead.repository";
import type { LeadStatus, LeadPriority } from "@/types/lead";
import { LEAD_STATUSES } from "@/types/lead";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate, formatRelativeTime, humanizeSegment, truncate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Leads" };

const STATUS_VARIANT: Record<LeadStatus, "neutral" | "info" | "success" | "warning" | "danger"> = {
  new: "info",
  qualified: "info",
  "consultation-scheduled": "info",
  "discovery-in-progress": "warning",
  "proposal-sent": "warning",
  "awaiting-client": "warning",
  won: "success",
  lost: "danger",
  archived: "neutral",
};

const PRIORITY_VARIANT: Record<LeadPriority, "neutral" | "info" | "success" | "warning" | "danger"> = {
  low: "neutral",
  normal: "neutral",
  high: "warning",
  urgent: "danger",
};

type LeadsPageProps = {
  searchParams?: Promise<{ q?: string; status?: string; priority?: string; followups?: string }>;
};

function LeadRow({ lead }: { lead: StoredLead }) {
  const isFollowUpDue = Boolean(lead.followUpDate && lead.followUpDate <= new Date().toISOString().slice(0, 10));

  return (
    <Link
      href={`/admin/leads/${lead.id}`}
      className="flex flex-col gap-3 border-b border-zinc-800 px-5 py-4 transition-colors last:border-b-0 hover:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-zinc-100">{lead.fullName}</p>
          {lead.companyName && <span className="text-xs text-zinc-500">· {lead.companyName}</span>}
        </div>
        <p className="mt-0.5 truncate text-xs text-zinc-500">{lead.email}</p>
        {lead.projectDescription && (
          <p className="mt-1 max-w-xl truncate text-xs text-zinc-600">{truncate(lead.projectDescription, 100)}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        {isFollowUpDue && <AdminBadge variant="danger">Follow-up due</AdminBadge>}
        <AdminBadge variant={PRIORITY_VARIANT[lead.priority]}>{humanizeSegment(lead.priority)}</AdminBadge>
        <AdminBadge variant={STATUS_VARIANT[lead.status]}>{humanizeSegment(lead.status)}</AdminBadge>
        <span className="text-xs text-zinc-600">{formatRelativeTime(lead.createdAt)}</span>
      </div>
    </Link>
  );
}

export default async function AdminLeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const query = String(params?.q ?? "").trim().toLowerCase();
  const status = String(params?.status ?? "").trim();
  const priority = String(params?.priority ?? "").trim();
  const followupsOnly = params?.followups === "1";

  const [stats, allResult, followUpsDue] = await Promise.all([
    leadRepository.getStats(),
    leadRepository.findAll({ sort: { field: "createdAt", order: "desc" }, perPage: 200 }),
    leadRepository.getFollowUpsDue(),
  ]);

  const followUpIds = new Set(followUpsDue.map((l) => l.id));

  const filtered = allResult.items.filter((lead) => {
    if (status && lead.status !== status) return false;
    if (priority && lead.priority !== priority) return false;
    if (followupsOnly && !followUpIds.has(lead.id)) return false;
    if (query) {
      const haystack = [
        lead.fullName,
        lead.email,
        lead.companyName ?? "",
        lead.website ?? "",
        lead.projectDescription ?? "",
        ...(lead.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Leads"
        description="Every consultation request and manually created lead, from first contact through close."
        actions={
          <AdminButton href="/admin/leads/new" variant="primary" size="md">
            New lead
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <AdminStatCard label="Total leads" value={stats.total} hint="All time" />
        <AdminStatCard label="New" value={stats.new} hint="Awaiting review" />
        <AdminStatCard label="Qualified" value={stats.qualified} hint="Ready for discovery" />
        <AdminStatCard
          label="Follow-ups due"
          value={stats.followUpsDue}
          hint="Need attention"
          trend={stats.followUpsDue > 0 ? { value: "Action needed", direction: "down" } : undefined}
        />
        <AdminStatCard label="Won" value={stats.won} hint={`${stats.lost} lost`} />
      </section>

      <form className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:grid-cols-[1fr_180px_160px_auto]">
        <label className="space-y-2">
          <span className="text-sm text-zinc-400">Search</span>
          <input
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
            defaultValue={params?.q ?? ""}
            name="q"
            placeholder="Name, email, company, tags..."
            type="search"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-zinc-400">Status</span>
          <select
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
            defaultValue={params?.status ?? ""}
            name="status"
          >
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {humanizeSegment(s)}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-zinc-400">Priority</span>
          <select
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
            defaultValue={params?.priority ?? ""}
            name="priority"
          >
            <option value="">All priorities</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>

        <div className="flex items-end">
          <button
            className="w-full rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
            type="submit"
          >
            Apply
          </button>
        </div>
      </form>

      <AdminCard
        title={`${filtered.length} lead${filtered.length === 1 ? "" : "s"}`}
        description={followupsOnly ? "Showing leads with a follow-up due today or earlier." : undefined}
        padded={false}
      >
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-zinc-500">No leads match these filters.</p>
          </div>
        ) : (
          <div>
            {filtered.map((lead) => (
              <LeadRow key={lead.id} lead={lead} />
            ))}
          </div>
        )}
      </AdminCard>

      <p className="text-xs text-zinc-600">Last refreshed {formatDate(new Date())}</p>
    </div>
  );
}
