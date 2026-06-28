import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Policies — Knowledge Base" };

const POLICY_AREAS = [
  {
    area: "Data and Privacy",
    description: "Client data handling, retention, and privacy obligations",
    enforcement: "Mandatory",
  },
  {
    area: "Client Authorization",
    description: "Rules for using client information in proposals and public materials",
    enforcement: "Mandatory",
  },
  {
    area: "Subcontracting",
    description: "Vendor and subcontractor engagement standards",
    enforcement: "Mandatory",
  },
  {
    area: "Government Ethics",
    description: "Representations, certifications, and conflict of interest requirements",
    enforcement: "Mandatory",
  },
  {
    area: "Intellectual Property",
    description: "Work product ownership and licensing terms",
    enforcement: "Mandatory",
  },
  {
    area: "Communications",
    description: "External communications standards and approval process",
    enforcement: "Recommended",
  },
] as const;

export default function AdminPoliciesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Policies"
        description="Company policies governing operations, client relationships, and compliance."
        actions={
          <AdminButton href="/admin/knowledge" variant="ghost" size="md">
            Back to knowledge base
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total policies" value="0" />
        <AdminStatCard label="Mandatory" value="0" hint="Required compliance" />
        <AdminStatCard label="Recommended" value="0" hint="Best practice guidance" />
        <AdminStatCard label="Under review" value="0" hint="Pending approval" />
      </section>

      <AdminCard
        title="Policy Library"
        description="All company policies by area and enforcement level"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No policies documented"
          description="Company policies will be created here with effective dates, enforcement levels, and review cycles. Policies inform proposal terms, client agreements, and operational decisions."
        />
      </AdminCard>

      <AdminCard title="Policy Areas" description="Operational domains requiring formal policy">
        <div className="space-y-3">
          {POLICY_AREAS.map(({ area, description, enforcement }) => (
            <div
              key={area}
              className="flex items-start justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-200">{area}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              </div>
              <AdminBadge variant={enforcement === "Mandatory" ? "danger" : "neutral"}>
                {enforcement}
              </AdminBadge>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Effective date and expiration tracking",
            "Mandatory vs. recommended enforcement",
            "Version control with change summaries",
            "Owner role and review assignment",
            "Cross-references to SOPs and standards",
            "Review cycle reminders",
            "Compliance audit trail",
            "Export for client agreements and proposals",
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
