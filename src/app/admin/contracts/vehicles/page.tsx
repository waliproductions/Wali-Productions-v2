import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { contractVehicleRepository } from "@/lib/repositories";
import type { AdminTableColumn } from "@/lib/admin/types";
import type { StoredContractVehicle, VehicleStatus, VehicleType } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contract Vehicles — Contracts" };

const STATUS_VARIANT: Record<VehicleStatus, "neutral" | "success" | "warning" | "info" | "neutral" | "danger"> = {
  target: "info",
  "in-pursuit": "warning",
  "on-ramp-open": "warning",
  awarded: "success",
  expired: "danger",
  ineligible: "neutral",
};

const TYPE_LABELS: Record<VehicleType, string> = {
  gwac: "GWAC",
  mac: "MAC",
  bpa: "BPA",
  idiq: "IDIQ",
  fss: "FSS",
  seaport: "SeaPort",
  sbir: "SBIR/STTR",
  other: "Other",
};

const columns: AdminTableColumn<StoredContractVehicle>[] = [
  {
    key: "name",
    header: "Vehicle",
    render: (v) => (
      <div>
        <p className="text-sm font-medium text-zinc-200">{v.name}</p>
        {v.acronym && <p className="text-xs text-zinc-500">{v.acronym}</p>}
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    render: (v) => <span className="text-sm text-zinc-400">{TYPE_LABELS[v.type]}</span>,
  },
  {
    key: "setAside",
    header: "Set-Aside",
    hideOnMobile: true,
    render: (v) => (
      <span className="text-sm text-zinc-400 uppercase">
        {v.setAside === "none" ? "Full & Open" : v.setAside}
      </span>
    ),
  },
  {
    key: "ceiling",
    header: "Ceiling",
    hideOnMobile: true,
    render: (v) => (
      <span className="text-sm text-zinc-400">
        {v.ceilingValue
          ? `$${(v.ceilingValue / 1e9).toFixed(1)}B`
          : "—"}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (v) => (
      <AdminBadge variant={STATUS_VARIANT[v.status]}>{v.status}</AdminBadge>
    ),
  },
];

function currency(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}

export default async function AdminVehiclesPage() {
  const [stats, vehicles] = await Promise.all([
    contractVehicleRepository.getStats(),
    contractVehicleRepository.findAll({
      sort: { field: "name", order: "asc" },
      perPage: 100,
    }),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contract Vehicles"
        description="GWACs, MACs, IDIQs, and other contract vehicles tracked for pursuit and eligibility."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Back to contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total vehicles" value={String(stats.total)} />
        <AdminStatCard label="Awarded" value={String(stats.awarded)} hint="On-contract" />
        <AdminStatCard label="In pursuit" value={String(stats.inPursuit)} />
        <AdminStatCard
          label="Total ceiling"
          value={stats.totalCeiling > 0 ? currency(stats.totalCeiling) : "—"}
          hint="Combined vehicle ceiling"
        />
      </section>

      <AdminCard title="Vehicle Registry">
        {vehicles.items.length === 0 ? (
          <AdminEmptyState
            title="No contract vehicles tracked"
            description="Add GWACs, MACs, IDIQs, and BPAs to track pursuit status, set-aside eligibility, on-ramp windows, and ceiling values."
          />
        ) : (
          <AdminTable columns={columns} rows={vehicles.items} getRowKey={(v) => v.id} />
        )}
      </AdminCard>

      <AdminCard title="Vehicle Types" description="Common contract vehicle categories">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { type: "GWAC", desc: "Government-Wide Acquisition Contract — multi-agency IT vehicles" },
            { type: "MAC", desc: "Multi-Agency Contract — similar scope, often agency-specific" },
            { type: "IDIQ", desc: "Indefinite Delivery / Indefinite Quantity — task-order based" },
            { type: "BPA", desc: "Blanket Purchase Agreement — simplified repeat ordering" },
            { type: "FSS / GSA Schedule", desc: "Federal Supply Schedule — pre-negotiated price list" },
            { type: "SBIR / STTR", desc: "Small Business Innovation Research / Tech Transfer" },
          ].map(({ type, desc }) => (
            <div key={type} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
              <p className="text-sm font-semibold text-zinc-200">{type}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
