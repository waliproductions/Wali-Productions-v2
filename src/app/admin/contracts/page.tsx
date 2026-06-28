import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Government Contracts" };

const MODULES = [
  {
    label: "Opportunities",
    value: "0 tracked",
    hint: "Active pipeline",
    href: "/admin/contracts/opportunities",
  },
  {
    label: "Proposals",
    value: "0 active",
    hint: "Gov-specific proposals",
    href: "/admin/contracts/proposals",
  },
  {
    label: "Past Performance",
    value: "0 entries",
    hint: "Authorized records",
    href: "/admin/contracts/past-performance",
  },
  {
    label: "Certifications",
    value: "In progress",
    hint: "SAM.gov, SBA, SDVOSB",
    href: "/admin/contracts/certifications",
  },
  {
    label: "Compliance",
    value: "—",
    hint: "Regulatory requirements",
    href: "/admin/contracts/compliance",
  },
  {
    label: "Teaming",
    value: "0 partners",
    hint: "Subcontractors and primes",
    href: "/admin/contracts/teaming",
  },
] as const;

export default function AdminContractsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Government Contracts"
        description="Internal workspace for federal, state, and local government contracting operations. Separate from the public-facing government page."
        actions={
          <>
            <AdminButton href="/admin/government" variant="outline" size="md">
              Gov public admin
            </AdminButton>
            <AdminButton href="/admin" variant="ghost" size="md">
              Back to dashboard
            </AdminButton>
          </>
        }
      />

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
        <p className="text-sm font-semibold text-amber-300">Internal contracting workspace</p>
        <p className="mt-1 text-xs text-amber-300/70">
          This section is for internal proposal development, opportunity tracking, and compliance
          management. The public-facing government page is managed under{" "}
          <a href="/admin/government" className="underline hover:text-amber-200">
            Government
          </a>
          .
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          title="Active Opportunities"
          actions={
            <AdminButton href="/admin/contracts/opportunities" variant="ghost" size="sm">
              View pipeline
            </AdminButton>
          }
        >
          <AdminEmptyState
            title="No opportunities tracked"
            description="Add government contract opportunities to start managing your pipeline from identification through award."
          />
        </AdminCard>

        <AdminCard
          title="Upcoming Deadlines"
          actions={
            <AdminButton href="/admin/contracts/opportunities" variant="ghost" size="sm">
              View all
            </AdminButton>
          }
        >
          <AdminEmptyState
            title="No upcoming deadlines"
            description="Response deadlines and key milestones for active opportunities will appear here."
          />
        </AdminCard>
      </div>
    </div>
  );
}
