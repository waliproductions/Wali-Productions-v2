import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Task Orders — Contract Records" };

export default function AdminTaskOrdersPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Task Orders"
        description="Individual task orders under IDIQ and GWAC contract vehicles."
        actions={
          <AdminButton href="/admin/contract-records" variant="ghost" size="md">
            Back to contract records
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total task orders" value="0" />
        <AdminStatCard label="Active" value="0" hint="In performance" />
        <AdminStatCard label="Total value" value="$0" hint="All task orders" />
        <AdminStatCard label="Pending deliverables" value="0" hint="Next 30 days" />
      </section>

      <AdminCard
        title="Task Order Register"
        description="All task orders across IDIQ vehicles"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No task orders recorded"
          description="Task orders are created when work is assigned under an IDIQ vehicle. Each task order tracks its own deliverables, milestones, and invoices independently."
        />
      </AdminCard>

      <AdminCard title="Task Order Structure" description="How task orders relate to parent contracts">
        <div className="space-y-4 text-sm text-zinc-400">
          <p>
            An <strong className="text-zinc-300">IDIQ contract</strong> (Indefinite Delivery Indefinite
            Quantity) establishes a ceiling value and period. Individual work assignments are issued as{" "}
            <strong className="text-zinc-300">Task Orders</strong> against that ceiling.
          </p>
          <p>
            Each task order has its own: period of performance, funded value, deliverables, reporting
            requirements, COR assignment, and invoice schedule. Task orders generate{" "}
            <strong className="text-zinc-300">Projects</strong> in the delivery system and{" "}
            <strong className="text-zinc-300">Invoices</strong> in the billing system.
          </p>
        </div>
      </AdminCard>

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Task order number and parent contract linkage",
            "Funded value and ceiling tracking",
            "Period of performance with option years",
            "COR and program manager assignment",
            "Deliverable schedule and compliance tracking",
            "Milestone and payment schedule",
            "Project delivery system linkage",
            "Invoice history per task order",
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
