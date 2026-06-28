import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Proposals — Gov Contracts" };

export default function AdminContractProposalsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Government Proposals"
        description="Federal, state, and local proposal development workspace."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Back to contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total gov proposals" value="0" />
        <AdminStatCard label="In development" value="0" hint="Draft + in-review" />
        <AdminStatCard label="Submitted" value="0" hint="Awaiting award" />
        <AdminStatCard label="Won" value="0" hint="Awarded contracts" />
      </section>

      <AdminCard
        title="Government Proposals"
        description="Proposals specific to federal and state contracting vehicles"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No government proposals"
          description="Government-specific proposals with NAICS, PSC, set-aside, and compliance fields will be managed here. Distinct from commercial proposals in the operations hub."
        />
      </AdminCard>

      <AdminCard title="Government Proposal Requirements" description="Fields unique to gov proposals">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { field: "NAICS Code", note: "Primary code for the procurement" },
            { field: "PSC Code", note: "Product and Service Code" },
            { field: "Set-Aside Category", note: "SDVOSB, 8(a), small business, etc." },
            { field: "Solicitation Number", note: "RFP / RFQ reference number" },
            { field: "Pricing Strategy", note: "Fixed-price, T&M, NTE, IDIQ" },
            { field: "Compliance Notes", note: "FAR clauses and special requirements" },
            { field: "Past Performance Refs", note: "Authorized performance records" },
            { field: "Technical Approach", note: "Proposal section with methodology" },
          ].map(({ field, note }) => (
            <div
              key={field}
              className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3"
            >
              <p className="text-sm font-semibold text-zinc-200">{field}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{note}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
