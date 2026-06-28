import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Contacts — CRM" };

const ROLE_TYPES = [
  { role: "Executive", description: "C-suite and senior leadership", count: 0 },
  { role: "Decision Maker", description: "Contract and budget authority", count: 0 },
  { role: "Influencer", description: "Shapes decisions without final authority", count: 0 },
  { role: "Champion", description: "Internal advocate for our work", count: 0 },
  { role: "Gatekeeper", description: "Controls access to decision makers", count: 0 },
  { role: "Technical", description: "Technical evaluators and SMEs", count: 0 },
  { role: "Contracting Officer", description: "Federal CO, PCO, or ACO", count: 0 },
  { role: "Program Manager", description: "Government COR or PM", count: 0 },
] as const;

export default function AdminContactsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contacts"
        description="Individual people across all organizations — decision makers, influencers, champions, and technical evaluators."
        actions={
          <AdminButton href="/admin/crm" variant="ghost" size="md">
            Back to CRM
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total contacts" value="0" />
        <AdminStatCard label="Decision makers" value="0" hint="Budget authority" />
        <AdminStatCard label="Champions" value="0" hint="Internal advocates" />
        <AdminStatCard label="Follow-ups due" value="0" hint="Overdue contact" />
      </section>

      <AdminCard
        title="Contact Directory"
        description="All tracked individuals"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No contacts added"
          description="Add individuals from your organization network. Each contact is linked to an organization and tracks role, communication history, and relationship depth."
        />
      </AdminCard>

      <AdminCard title="Contact Roles" description="People by role and influence type">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ROLE_TYPES.map(({ role, description, count }) => (
            <div
              key={role}
              className="flex items-start justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-200">{role}</p>
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
            "Full contact profile with title and role classification",
            "Organization linkage and primary contact designation",
            "Decision authority and influence tracking",
            "Communication channel preferences",
            "Meeting history and follow-up dates",
            "LinkedIn profile and contact details",
            "Government-specific: CO, COR, and PM roles",
            "Last contacted tracking and follow-up alerts",
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
