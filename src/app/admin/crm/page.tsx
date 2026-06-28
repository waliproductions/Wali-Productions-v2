import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "CRM" };

const MODULES = [
  {
    label: "Organizations",
    value: "0 tracked",
    hint: "Prospects and active clients",
    href: "/admin/crm/organizations",
  },
  {
    label: "Contacts",
    value: "0 people",
    hint: "Decision makers and influencers",
    href: "/admin/crm/contacts",
  },
  {
    label: "Pipeline",
    value: "$0 open",
    hint: "Sales pipeline value",
    href: "/admin/crm/pipeline",
  },
  {
    label: "Meetings",
    value: "0 scheduled",
    hint: "This month",
    href: "/admin/crm/meetings",
  },
] as const;

export default function AdminCrmPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="CRM"
        description="Client relationship management — organizations, contacts, pipeline, and communications."
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard
          title="Active Pipeline"
          description="Opportunities by stage"
          actions={
            <AdminButton href="/admin/crm/pipeline" variant="ghost" size="sm">
              View pipeline
            </AdminButton>
          }
        >
          <AdminEmptyState
            title="No pipeline entries"
            description="Sales opportunities will appear here as organizations are added and tracked through the pipeline."
          />
        </AdminCard>

        <AdminCard
          title="Upcoming Meetings"
          actions={
            <AdminButton href="/admin/crm/meetings" variant="ghost" size="sm">
              View all
            </AdminButton>
          }
        >
          <AdminEmptyState
            title="No upcoming meetings"
            description="Scheduled meetings with prospects and clients will appear here."
          />
        </AdminCard>
      </div>

      <AdminCard
        title="Recent Activity"
        description="Latest CRM interactions across all organizations"
      >
        <AdminEmptyState
          title="No recent activity"
          description="Emails sent, calls logged, meetings completed, and stage changes will appear in the activity feed."
        />
      </AdminCard>

      <AdminCard title="CRM Architecture" description="How the relationship data model is structured">
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
          {[
            {
              title: "Organization",
              description: "A company or agency. Can be a prospect, active client, partner, or former client. Links to a Client record when work begins.",
            },
            {
              title: "Contact",
              description: "An individual within an organization. Tracks role, decision authority, communication history, and relationship depth.",
            },
            {
              title: "Pipeline Entry",
              description: "An active sales opportunity within an organization. Tracks stage, value, probability, and expected close date.",
            },
          ].map(({ title, description }) => (
            <div
              key={title}
              className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <p className="text-sm font-semibold text-zinc-100">{title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{description}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
