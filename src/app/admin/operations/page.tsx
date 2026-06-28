import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Operations" };

const MODULES = [
  {
    label: "Tasks",
    value: "0 open",
    hint: "Actionable work items",
    href: "/admin/operations/tasks",
  },
  {
    label: "Proposals Pipeline",
    value: "0 active",
    hint: "Drafts, sent, in negotiation",
    href: "/admin/operations/proposals",
  },
  {
    label: "Clients CRM",
    value: "0 clients",
    hint: "Active and prospect accounts",
    href: "/admin/operations/clients",
  },
  {
    label: "Reports",
    value: "—",
    hint: "Business metrics and reporting",
    href: "/admin/operations/reports",
  },
] as const;

export default function AdminOperationsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Operations"
        description="Centralized hub for tasks, proposals, clients, and business metrics."
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

      <AdminCard
        title="Operations Overview"
        description="Platform status as of today"
        actions={
          <AdminButton href="/admin/operations/reports" variant="ghost" size="sm">
            View reports
          </AdminButton>
        }
      >
        <AdminEmptyState
          title="No operational data yet"
          description="As you add tasks, proposals, and clients the operations hub will surface actionable insights here."
        />
      </AdminCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard
          title="Active Tasks"
          actions={
            <AdminButton href="/admin/operations/tasks" variant="ghost" size="sm">
              View all
            </AdminButton>
          }
        >
          <AdminEmptyState
            title="No active tasks"
            description="Open tasks across all categories will surface here."
          />
        </AdminCard>

        <AdminCard
          title="Proposals Pipeline"
          actions={
            <AdminButton href="/admin/operations/proposals" variant="ghost" size="sm">
              View pipeline
            </AdminButton>
          }
        >
          <AdminEmptyState
            title="No proposals in pipeline"
            description="Active proposals and their stage will appear here."
          />
        </AdminCard>
      </div>
    </div>
  );
}
