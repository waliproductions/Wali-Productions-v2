import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Invoices — Contract Records" };

const INVOICE_STATUSES = [
  { status: "Draft", description: "Being prepared, not yet submitted", count: 0, value: 0 },
  { status: "Submitted", description: "Delivered to the government", count: 0, value: 0 },
  { status: "Approved", description: "Accepted, payment in process", count: 0, value: 0 },
  { status: "Paid", description: "Payment received", count: 0, value: 0 },
  { status: "Disputed", description: "Under government review or dispute", count: 0, value: 0 },
  { status: "Overdue", description: "Past payment due date", count: 0, value: 0 },
] as const;

export default function AdminContractInvoicesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Invoices"
        description="Contract invoicing across all active contracts and task orders."
        actions={
          <AdminButton href="/admin/contract-records" variant="ghost" size="md">
            Back to contract records
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total invoiced" value="$0" hint="All time" />
        <AdminStatCard label="Submitted / pending" value="$0" hint="Awaiting payment" />
        <AdminStatCard label="Paid this quarter" value="$0" hint="Collected" />
        <AdminStatCard label="Disputed" value="$0" hint="Under review" />
      </section>

      <AdminCard
        title="Invoice Register"
        description="All invoices across contracts and task orders"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No invoices recorded"
          description="Create and track invoices against contracts and task orders. Supports government payment portals (IPP, Wide Area WorkFlow) and standard commercial invoicing."
        />
      </AdminCard>

      <AdminCard title="Invoice Status Breakdown" description="Invoices and value by status">
        <div className="divide-y divide-zinc-800">
          {INVOICE_STATUSES.map(({ status, description, count, value }) => (
            <div
              key={status}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-200">{status}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-zinc-400">{count}</p>
                <p className="text-xs text-zinc-600">${value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Invoice creation with line-item detail",
            "Period of performance date ranges",
            "Labor category, hours, and bill rate tracking",
            "Contract and task order linkage",
            "Government payment system integration (future)",
            "Invoice aging and overdue alerts",
            "Dispute tracking and resolution log",
            "Revenue recognition by period",
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
