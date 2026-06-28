import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "SOPs — Knowledge Base" };

const SOP_CATEGORIES = [
  { name: "Client Onboarding", description: "From signed proposal to kickoff call", count: 0 },
  { name: "Proposal Development", description: "Scope, pricing, review, delivery", count: 0 },
  { name: "Project Delivery", description: "Setup, milestone tracking, handoff", count: 0 },
  { name: "Invoicing and Billing", description: "Invoice creation, follow-up, collection", count: 0 },
  { name: "Government Contracting", description: "Opportunity identification to submission", count: 0 },
  { name: "Content and Media", description: "Production workflows and asset management", count: 0 },
  { name: "Administrative", description: "Internal operations and record-keeping", count: 0 },
] as const;

export default function AdminSOPsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Standard Operating Procedures"
        description="Step-by-step operational playbooks for all core business functions."
        actions={
          <AdminButton href="/admin/knowledge" variant="ghost" size="md">
            Back to knowledge base
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total SOPs" value="0" />
        <AdminStatCard label="Approved" value="0" hint="Active and in use" />
        <AdminStatCard label="In review" value="0" hint="Pending approval" />
        <AdminStatCard label="Due for review" value="0" hint="Past review cycle" />
      </section>

      <AdminCard
        title="SOP Library"
        description="All standard operating procedures"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No SOPs documented"
          description="Standard operating procedures will be created and maintained here. SOPs include step-by-step instructions, applicable roles, and estimated completion times."
        />
      </AdminCard>

      <AdminCard title="SOP Categories" description="Operational areas with documented procedures">
        <div className="divide-y divide-zinc-800">
          {SOP_CATEGORIES.map(({ name, description, count }) => (
            <div
              key={name}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-zinc-200">{name}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              </div>
              <span className="text-sm text-zinc-600">{count} SOPs</span>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Step-by-step numbered procedure format",
            "Applicable role assignments per SOP",
            "Estimated duration per procedure",
            "Related SOP cross-referencing",
            "Review cycle tracking (monthly, quarterly, annual)",
            "Version history with change summaries",
            "Status lifecycle: draft → review → approved",
            "Category-based organization and search",
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
