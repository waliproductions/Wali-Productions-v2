import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Client Access — Users" };

const PORTAL_ROLES = [
  {
    role: "Owner",
    description: "Full client portal access — all projects, invoices, contracts, and approvals",
    count: 0,
  },
  {
    role: "Stakeholder",
    description: "Project progress, deliverables, and status updates. No financial data.",
    count: 0,
  },
  {
    role: "Approver",
    description: "Can approve deliverables and milestones. Typically the contracting or project authority.",
    count: 0,
  },
  {
    role: "Viewer",
    description: "Read-only access to assigned project content only",
    count: 0,
  },
] as const;

export default function AdminClientAccessPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Client Portal Access"
        description="Client accounts for the /portal/* experience — project visibility, deliverable approvals, and file access."
        actions={
          <AdminButton href="/admin/users" variant="ghost" size="md">
            Back to users
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Client accounts" value="0" />
        <AdminStatCard label="Active access" value="0" hint="Can currently log in" />
        <AdminStatCard label="Pending invitations" value="0" hint="Not yet accepted" />
        <AdminStatCard label="Revoked access" value="0" hint="Project concluded" />
      </section>

      <AdminCard
        title="Client Account Registry"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No client accounts configured"
          description="Client portal accounts are created when a project begins. Each account is scoped to a specific client record and grants access only to that client's projects, deliverables, and communications."
        />
      </AdminCard>

      <AdminCard title="Portal Roles" description="What each client role can access">
        <div className="divide-y divide-zinc-800">
          {PORTAL_ROLES.map(({ role, description, count }) => (
            <div key={role} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-zinc-200">{role}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>
              </div>
              <span className="text-sm font-semibold text-zinc-400">{count}</span>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Access Scope Controls" description="Per-account permission flags">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { control: "Project access", description: "Which project IDs the client can view" },
            { control: "Deliverable approval", description: "Can submit approval decisions" },
            { control: "Invoice visibility", description: "Can view billing and payment records" },
            { control: "Contract visibility", description: "Can view contract terms and modifications" },
            { control: "File download", description: "Can download project documents" },
            { control: "Meeting history", description: "Can view meeting notes and recordings" },
          ].map(({ control, description }) => (
            <div
              key={control}
              className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <p className="text-sm font-semibold text-zinc-200">{control}</p>
              <p className="mt-1 text-xs text-zinc-500">{description}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
