import { organizationRepository } from "@/lib/repositories/organization.repository";
import type { StoredOrganization } from "@/lib/repositories/organization.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Organizations — CRM" };

type Props = { searchParams?: Promise<{ status?: string; q?: string }> };

const STATUS_VARIANT: Record<string, "success" | "info" | "neutral" | "warning"> = {
  "active-client": "success",
  qualified: "info",
  prospect: "neutral",
  partner: "warning",
  "former-client": "neutral",
  inactive: "neutral",
};

const COLS: AdminTableColumn<StoredOrganization>[] = [
  {
    key: "name",
    header: "Organization",
    render: (o) => (
      <div>
        <p className="font-medium text-zinc-100">{o.name}</p>
        {o.website && (
          <p className="mt-0.5 truncate text-xs text-zinc-500">
            {o.website.replace(/^https?:\/\//, "")}
          </p>
        )}
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (o) => (
      <AdminBadge variant={STATUS_VARIANT[o.status] ?? "neutral"}>
        {o.status.replace(/-/g, " ")}
      </AdminBadge>
    ),
  },
  {
    key: "sector",
    header: "Sector",
    render: (o) => (
      <span className="text-sm text-zinc-400">{o.sector?.replace(/-/g, " ") ?? "—"}</span>
    ),
    hideOnMobile: true,
  },
  {
    key: "location",
    header: "Location",
    render: (o) => (
      <span className="text-sm text-zinc-400">
        {[o.hqCity, o.hqState].filter(Boolean).join(", ") || "—"}
      </span>
    ),
    hideOnMobile: true,
  },
  {
    key: "score",
    header: "Score",
    render: (o) => (
      <span
        className={`text-sm font-semibold ${
          (o.relationshipScore ?? 0) >= 70
            ? "text-emerald-400"
            : (o.relationshipScore ?? 0) >= 40
              ? "text-amber-300"
              : "text-zinc-400"
        }`}
      >
        {o.relationshipScore ?? "—"}
      </span>
    ),
    align: "center",
    hideOnMobile: true,
  },
  {
    key: "updated",
    header: "Updated",
    render: (o) => (
      <span className="text-sm text-zinc-500">{formatDate(o.updatedAt)}</span>
    ),
    hideOnMobile: true,
  },
];

export default async function AdminOrganizationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const statusFilter = params?.status;
  const q = params?.q;

  const [stats, result] = await Promise.all([
    organizationRepository.getStats(),
    organizationRepository.findAll({
      search: q,
      filters: statusFilter
        ? [{ field: "status", operator: "eq", value: statusFilter }]
        : undefined,
      sort: { field: "updatedAt", order: "desc" },
      perPage: 100,
    }),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Organizations"
        description="All tracked companies, agencies, and partners."
        actions={
          <AdminButton href="/admin/crm" variant="ghost" size="md">
            Back to CRM
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total" value={stats.total} />
        <AdminStatCard label="Active clients" value={stats.activeClients} hint="Current work" />
        <AdminStatCard label="Prospects" value={stats.prospects} hint="In pipeline" />
        <AdminStatCard label="Partners" value={stats.partners} hint="Teaming & referrals" />
      </section>

      {/* Filter bar */}
      <form className="flex flex-wrap gap-2" method="GET">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search organizations…"
          className="min-w-48 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-amber-400"
        />
        {[
          { label: "All", value: "" },
          { label: "Clients", value: "active-client" },
          { label: "Prospects", value: "prospect" },
          { label: "Qualified", value: "qualified" },
          { label: "Partners", value: "partner" },
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
        title={`${result.total} organization${result.total !== 1 ? "s" : ""}`}
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
