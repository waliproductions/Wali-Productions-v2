import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Deliverables — Contract Records" };

const FREQUENCY_TYPES = [
  { label: "One-time", description: "Single submission required", count: 0 },
  { label: "Monthly", description: "Monthly status reports", count: 0 },
  { label: "Quarterly", description: "Quarterly performance reports", count: 0 },
  { label: "Annual", description: "Annual reviews or certifications", count: 0 },
  { label: "Weekly", description: "Ongoing weekly deliverables", count: 0 },
  { label: "Upon Request", description: "Ad hoc deliverables", count: 0 },
] as const;

export default function AdminContractDeliverablesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contract Deliverables"
        description="All deliverables and reporting requirements across active contracts and task orders."
        actions={
          <AdminButton href="/admin/contract-records" variant="ghost" size="md">
            Back to contract records
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total deliverables" value="0" />
        <AdminStatCard label="Due this month" value="0" hint="Requires submission" />
        <AdminStatCard label="Overdue" value="0" hint="Past due date" />
        <AdminStatCard label="Accepted this quarter" value="0" hint="Government approved" />
      </section>

      <AdminCard
        title="Deliverable Tracker"
        description="All contract data requirements and reporting obligations"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No deliverables tracked"
          description="Contract Data Requirements Lists (CDRLs) and reporting requirements will be tracked here with due dates, submission records, and government acceptance status."
        />
      </AdminCard>

      <AdminCard title="Deliverable Frequency" description="Recurring requirements by cadence">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FREQUENCY_TYPES.map(({ label, description, count }) => (
            <div
              key={label}
              className="flex items-start justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-200">{label}</p>
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
            "CDRL number, title, and frequency tracking",
            "Due date calendar with advance notifications",
            "Submission record with upload links",
            "Government acceptance or rejection tracking",
            "COR and recipient contact linkage",
            "Cross-contract deliverable dashboard",
            "Overdue alert escalation",
            "Reporting requirement audit trail",
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
