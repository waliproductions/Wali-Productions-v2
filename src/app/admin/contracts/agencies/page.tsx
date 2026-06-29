import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { agencyRepository } from "@/lib/repositories";
import type { AdminTableColumn } from "@/lib/admin/types";
import type { StoredAgency, AgencyRelationshipStatus } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agency Directory — Contracts" };

const RELATIONSHIP_VARIANT: Record<AgencyRelationshipStatus, "neutral" | "success" | "warning" | "info" | "neutral"> = {
  target: "info",
  researching: "neutral",
  "active-pursuit": "warning",
  awarded: "success",
  inactive: "neutral",
};

const columns: AdminTableColumn<StoredAgency>[] = [
  {
    key: "name",
    header: "Agency",
    render: (a) => (
      <div>
        <p className="text-sm font-medium text-zinc-200">{a.name}</p>
        {a.acronym && <p className="text-xs text-zinc-500">{a.acronym}</p>}
      </div>
    ),
  },
  {
    key: "tier",
    header: "Tier",
    hideOnMobile: true,
    render: (a) => <span className="text-sm capitalize text-zinc-400">{a.tier}</span>,
  },
  {
    key: "parent",
    header: "Parent",
    hideOnMobile: true,
    render: (a) => <span className="text-sm text-zinc-400">{a.parentAgencyName ?? "—"}</span>,
  },
  {
    key: "naics",
    header: "NAICS Focus",
    hideOnMobile: true,
    render: (a) => (
      <span className="text-sm text-zinc-400">
        {a.naicsFocus?.slice(0, 2).join(", ") || "—"}
      </span>
    ),
  },
  {
    key: "relationship",
    header: "Status",
    render: (a) => (
      <AdminBadge variant={RELATIONSHIP_VARIANT[a.relationship]}>{a.relationship}</AdminBadge>
    ),
  },
];

const TIER_LABELS: Record<string, string> = {
  cabinet: "Cabinet-Level",
  independent: "Independent Agency",
  "cfo-act": "CFO Act Agency",
  "sub-agency": "Sub-Agency / Bureau",
  office: "Office / Program",
  other: "Other",
};

export default async function AdminAgenciesPage() {
  const [stats, agencies] = await Promise.all([
    agencyRepository.getStats(),
    agencyRepository.findAll({
      sort: { field: "name", order: "asc" },
      perPage: 100,
    }),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Agency Directory"
        description="Federal and state agency intelligence — mission areas, contacts, and pursuit tracking."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Back to contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total agencies" value={String(stats.total)} />
        <AdminStatCard label="Active pursuit" value={String(stats.active)} />
        <AdminStatCard label="Targets" value={String(stats.targets)} hint="Researching" />
        <AdminStatCard label="Awarded" value={String(stats.awarded)} hint="Contract won" />
      </section>

      <AdminCard title="Agency Directory">
        {agencies.items.length === 0 ? (
          <AdminEmptyState
            title="No agencies tracked"
            description="Add federal and state agencies to track mission alignment, contracting opportunities, contacts, and pursuit status."
          />
        ) : (
          <AdminTable columns={columns} rows={agencies.items} getRowKey={(a) => a.id} />
        )}
      </AdminCard>

      {stats.total > 0 && Object.keys(stats.byTier).length > 0 && (
        <AdminCard title="By Agency Tier">
          <div className="divide-y divide-zinc-800">
            {(Object.entries(stats.byTier) as [string, number][]).map(([tier, count]) => (
              <div key={tier} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <p className="text-sm text-zinc-300">{TIER_LABELS[tier] ?? tier}</p>
                <span className="text-sm font-semibold text-zinc-400">{count}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      )}

      <AdminCard title="Agency Intelligence Framework" description="What to track for each agency">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { field: "Mission Summary", desc: "Core mission and technology priorities" },
            { field: "Acquisition Office", desc: "Primary contracting office and contact" },
            { field: "NAICS Focus", desc: "NAICS codes used in their solicitations" },
            { field: "Annual IT Budget", desc: "Published IT spend from ITDB/USASpending" },
            { field: "Contract Vehicles", desc: "Preferred GWAC/IDIQ vehicles they use" },
            { field: "Relationship Status", desc: "Target → Researching → Active Pursuit → Awarded" },
          ].map(({ field, desc }) => (
            <div key={field} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
              <p className="text-sm font-semibold text-zinc-200">{field}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
