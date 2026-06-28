import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Contract Records" };

const MODULES = [
  {
    label: "Active Contracts",
    value: "0",
    hint: "In performance",
    href: "/admin/contract-records/active",
  },
  {
    label: "Task Orders",
    value: "0",
    hint: "Across all IDIQ vehicles",
    href: "/admin/contract-records/task-orders",
  },
  {
    label: "Deliverables",
    value: "0 due",
    hint: "Next 30 days",
    href: "/admin/contract-records/deliverables",
  },
  {
    label: "Open Invoices",
    value: "$0",
    hint: "Awaiting payment",
    href: "/admin/contract-records/invoices",
  },
] as const;

export default function AdminContractRecordsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contract Records"
        description="Post-award contract management — active contracts, task orders, deliverables, and invoices."
        actions={
          <>
            <AdminButton href="/admin/contracts" variant="outline" size="md">
              Gov contracting workspace
            </AdminButton>
            <AdminButton href="/admin" variant="ghost" size="md">
              Back to dashboard
            </AdminButton>
          </>
        }
      />

      <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/20 px-5 py-4">
        <p className="text-sm font-semibold text-zinc-300">Post-award management</p>
        <p className="mt-1 text-xs text-zinc-500">
          This section manages active contract performance. Pre-award operations (opportunities,
          proposals, certifications) are managed in{" "}
          <a href="/admin/contracts" className="text-amber-400/80 underline hover:text-amber-400">
            Gov Contracting
          </a>
          .
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((m) => (
          <AdminStatCard
            key={m.href}
            label={m.label}
            value={m.value}
            hint={m.hint}
            href={m.href}
          />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard
          title="Upcoming Deliverables"
          description="Due in the next 30 days"
          actions={
            <AdminButton href="/admin/contract-records/deliverables" variant="ghost" size="sm">
              View all
            </AdminButton>
          }
        >
          <AdminEmptyState
            title="No upcoming deliverables"
            description="Contract deliverables and reporting requirements will surface here as contracts are added."
          />
        </AdminCard>

        <AdminCard
          title="Outstanding Invoices"
          actions={
            <AdminButton href="/admin/contract-records/invoices" variant="ghost" size="sm">
              View invoices
            </AdminButton>
          }
        >
          <AdminEmptyState
            title="No outstanding invoices"
            description="Submitted and pending invoices across all contracts will appear here."
          />
        </AdminCard>
      </div>

      <AdminCard title="Contract Lifecycle" description="How contracts flow through this system">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          {[
            { phase: "Pre-Award", tools: "Gov Contracting workspace", link: "/admin/contracts" },
            { phase: "Award", tools: "Contract record created, project initiated", link: null },
            { phase: "Performance", tools: "Task orders, deliverables, invoices", link: "/admin/contract-records/active" },
            { phase: "Closeout", tools: "Final invoice, performance report, lessons learned", link: null },
          ].map(({ phase, tools, link }) => (
            <div
              key={phase}
              className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <p className="text-sm font-bold text-amber-400">{phase}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{tools}</p>
              {link ? (
                <a
                  href={link}
                  className="mt-2 block text-xs text-zinc-600 hover:text-amber-400"
                >
                  Go →
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
