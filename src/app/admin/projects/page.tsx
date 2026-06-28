import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Projects" };

const MODULES = [
  {
    label: "Active Projects",
    value: "0",
    hint: "In delivery",
    href: "/admin/projects/active",
  },
  {
    label: "Deliverables",
    value: "0 due",
    hint: "Across all projects",
    href: "/admin/projects/deliverables",
  },
  {
    label: "Risk Register",
    value: "0 open",
    hint: "Risks and issues",
    href: "/admin/projects/risks",
  },
  {
    label: "Lessons Learned",
    value: "0 entries",
    hint: "Institutional knowledge",
    href: "/admin/projects/lessons",
  },
] as const;

const HEALTH_STATUS = [
  { status: "On Track", color: "bg-emerald-500", count: 0 },
  { status: "At Risk", color: "bg-amber-500", count: 0 },
  { status: "Blocked", color: "bg-red-500", count: 0 },
  { status: "Completed", color: "bg-zinc-600", count: 0 },
] as const;

export default function AdminProjectsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Projects"
        description="Project delivery hub — milestones, deliverables, risks, issues, and lessons learned."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdminCard
            title="Active Projects"
            description="Projects currently in delivery"
            actions={
              <AdminButton href="/admin/projects/active" variant="ghost" size="sm">
                View all
              </AdminButton>
            }
          >
            <AdminEmptyState
              title="No active projects"
              description="Projects are created when a proposal is accepted or a contract is awarded. Each project tracks milestones, deliverables, team, risks, and client approvals."
            />
          </AdminCard>
        </div>

        <AdminCard title="Project Health" description="Status distribution">
          <div className="space-y-3">
            {HEALTH_STATUS.map(({ status, color, count }) => (
              <div key={status} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                  <span className="text-sm text-zinc-300">{status}</span>
                </div>
                <span className="text-sm font-semibold text-zinc-400">{count}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard
          title="Open Risks"
          actions={
            <AdminButton href="/admin/projects/risks" variant="ghost" size="sm">
              Risk register
            </AdminButton>
          }
        >
          <AdminEmptyState compact title="No open risks" description="Project risks will surface here." />
        </AdminCard>

        <AdminCard
          title="Pending Customer Approvals"
          description="Awaiting client sign-off"
        >
          <AdminEmptyState compact title="No pending approvals" description="Customer approval requests will appear here." />
        </AdminCard>
      </div>
    </div>
  );
}
