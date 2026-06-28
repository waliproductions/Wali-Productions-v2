import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Active Contracts — Contract Records" };

const CONTRACT_TYPES = [
  { type: "Firm Fixed Price", description: "Fixed scope and price", count: 0 },
  { type: "Time & Materials", description: "Labor hours at set rates", count: 0 },
  { type: "IDIQ", description: "Indefinite delivery / indefinite quantity vehicle", count: 0 },
  { type: "BPA", description: "Blanket purchase agreement", count: 0 },
  { type: "Cost Plus", description: "Allowable costs plus fee", count: 0 },
  { type: "Task Order", description: "Order under a parent IDIQ", count: 0 },
] as const;

export default function AdminActiveContractsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Active Contracts"
        description="All contracts currently in performance — direct awards, IDIQ vehicles, and task orders."
        actions={
          <AdminButton href="/admin/contract-records" variant="ghost" size="md">
            Back to contract records
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Active contracts" value="0" />
        <AdminStatCard label="Total base value" value="$0" hint="All active" />
        <AdminStatCard label="Expiring this year" value="0" hint="Option year decisions" />
        <AdminStatCard label="Modifications" value="0" hint="This year" />
      </section>

      <AdminCard
        title="Contract Register"
        description="All active contract records"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No contracts recorded"
          description="Add awarded contracts to track performance, task orders, deliverables, invoices, and option year decisions."
        />
      </AdminCard>

      <AdminCard title="Contract Types" description="Active contracts by contract vehicle type">
        <div className="divide-y divide-zinc-800">
          {CONTRACT_TYPES.map(({ type, description, count }) => (
            <div
              key={type}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-zinc-200">{type}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              </div>
              <span className="text-sm font-semibold text-zinc-400">{count}</span>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Full contract record with agency, CO, and COR details",
            "Period of performance and option year tracking",
            "Modification history with value changes",
            "IDIQ vehicle and task order relationships",
            "Performance rating and CPARS tracking",
            "Contract expiration alerts",
            "Security and clearance requirements",
            "NAICS code, PSC code, and set-aside classification",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />
              {item}
            </li>
          ))}
        </ul>
      </AdminCard>
    </div>
  );
}
