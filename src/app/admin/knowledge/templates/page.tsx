import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Templates — Knowledge Base" };

const TEMPLATE_TYPES = [
  {
    type: "Commercial Proposal",
    description: "Fixed-price and retainer proposals for commercial clients",
    sections: ["Executive summary", "Scope of work", "Timeline", "Investment", "Terms"],
    status: "Planned",
  },
  {
    type: "Government Proposal",
    description: "RFP responses with technical and price volumes",
    sections: ["Technical approach", "Management approach", "Past performance", "Price volume"],
    status: "Planned",
  },
  {
    type: "Statement of Work",
    description: "Detailed delivery scope for contracted projects",
    sections: ["Objectives", "Deliverables", "Acceptance criteria", "Change process"],
    status: "Planned",
  },
  {
    type: "Client Onboarding Package",
    description: "Welcome materials, access setup, and kickoff agenda",
    sections: ["Welcome letter", "Access checklist", "Kickoff agenda", "Communication norms"],
    status: "Planned",
  },
  {
    type: "Project Status Report",
    description: "Weekly or milestone-based progress report for clients",
    sections: ["Progress summary", "Milestones", "Risks", "Next steps"],
    status: "Planned",
  },
  {
    type: "Capability Statement",
    description: "One-page capability statement for government outreach",
    sections: ["Core competencies", "Differentiators", "Past performance", "Contact"],
    status: "Source: docs/02-Government/CAPABILITY_STATEMENT.md",
  },
] as const;

export default function AdminTemplatesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Templates"
        description="Reusable proposal, document, and communication templates."
        actions={
          <AdminButton href="/admin/knowledge" variant="ghost" size="md">
            Back to knowledge base
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total templates" value="0" hint="Ready to use" />
        <AdminStatCard label="Proposal templates" value="0" hint="Commercial + gov" />
        <AdminStatCard label="Document templates" value="0" hint="SOW, reports" />
        <AdminStatCard label="Communication templates" value="0" hint="Onboarding, status" />
      </section>

      <AdminCard
        title="Template Library"
        description="All available templates for proposals and documents"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No templates available"
          description="Templates will be created here for proposals, statements of work, status reports, and client communications. Each template has versioned sections that can be customized per engagement."
        />
      </AdminCard>

      <AdminCard title="Template Types" description="Planned template library">
        <div className="space-y-4">
          {TEMPLATE_TYPES.map(({ type, description, sections, status }) => (
            <div
              key={type}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-zinc-100">{type}</h3>
                  <p className="mt-1 text-xs text-zinc-400">{description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {sections.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <AdminBadge variant="neutral">{status}</AdminBadge>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
