import { organizationRepository } from "@/lib/repositories/organization.repository";
import { contactRepository } from "@/lib/repositories/contact.repository";
import { meetingRepository } from "@/lib/repositories/meeting.repository";
import { opportunityRepository } from "@/lib/repositories/opportunity.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "CRM" };

const STATUS_BADGE: Record<string, { label: string; variant: "success" | "info" | "neutral" | "warning" }> = {
  "active-client": { label: "Active Client", variant: "success" },
  qualified: { label: "Qualified", variant: "info" },
  prospect: { label: "Prospect", variant: "neutral" },
  partner: { label: "Partner", variant: "warning" },
  "former-client": { label: "Former", variant: "neutral" },
  inactive: { label: "Inactive", variant: "neutral" },
};

export default async function AdminCrmPage() {
  const [orgStats, contactStats, meetingStats, pipelineStats, recentOrgs, upcomingMeetings] =
    await Promise.all([
      organizationRepository.getStats(),
      contactRepository.getStats(),
      meetingRepository.getStats(),
      opportunityRepository.getPipelineStats(),
      organizationRepository.findAll({ sort: { field: "updatedAt", order: "desc" }, perPage: 6 }),
      meetingRepository.getUpcoming(5),
    ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="CRM"
        description="Client relationship management — organizations, contacts, pipeline, and meetings."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Organizations"
          value={orgStats.total}
          hint={`${orgStats.activeClients} active clients`}
          href="/admin/crm/organizations"
        />
        <AdminStatCard
          label="Contacts"
          value={contactStats.total}
          hint={`${contactStats.decisionMakers} decision makers`}
          href="/admin/crm/contacts"
        />
        <AdminStatCard
          label="Pipeline value"
          value={pipelineStats.totalValue > 0 ? `$${(pipelineStats.totalValue / 1000).toFixed(0)}k` : "$0"}
          hint={`${pipelineStats.activeCount} open opportunities`}
          href="/admin/crm/pipeline"
        />
        <AdminStatCard
          label="Meetings"
          value={meetingStats.upcoming}
          hint="Upcoming scheduled"
          href="/admin/crm/meetings"
          trend={meetingStats.upcoming > 0 ? { value: "Scheduled", direction: "up" } : undefined}
        />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Organizations */}
        <div className="lg:col-span-2">
          <AdminCard
            title="Recent Organizations"
            description="Last updated"
            actions={
              <AdminButton href="/admin/crm/organizations" variant="ghost" size="sm">
                View all
              </AdminButton>
            }
          >
            <ul className="divide-y divide-zinc-800/60">
              {recentOrgs.items.map((org) => {
                const badge = STATUS_BADGE[org.status] ?? { label: org.status, variant: "neutral" as const };
                return (
                  <li key={org.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-zinc-200">{org.name}</p>
                      <p className="text-xs text-zinc-500">
                        {org.sector?.replace(/-/g, " ") ?? "—"} · {org.hqState ?? "—"}
                      </p>
                    </div>
                    <AdminBadge variant={badge.variant}>{badge.label}</AdminBadge>
                  </li>
                );
              })}
            </ul>
          </AdminCard>
        </div>

        {/* Upcoming Meetings + Quick Nav */}
        <div className="flex flex-col gap-6">
          <AdminCard
            title="Upcoming Meetings"
            actions={
              <AdminButton href="/admin/crm/meetings" variant="ghost" size="sm">
                View all
              </AdminButton>
            }
          >
            {upcomingMeetings.length === 0 ? (
              <p className="text-sm text-zinc-600">No upcoming meetings.</p>
            ) : (
              <ul className="divide-y divide-zinc-800/60">
                {upcomingMeetings.map((m) => (
                  <li key={m.id} className="py-2.5">
                    <p className="text-sm font-medium text-zinc-200 truncate">{m.title}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{formatDate(m.scheduledAt)}</p>
                  </li>
                ))}
              </ul>
            )}
          </AdminCard>

          <AdminCard title="CRM Workspace">
            <ul className="space-y-1">
              {[
                { label: "Organizations", href: "/admin/crm/organizations" },
                { label: "Contacts", href: "/admin/crm/contacts" },
                { label: "Pipeline", href: "/admin/crm/pipeline" },
                { label: "Meetings", href: "/admin/crm/meetings" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <AdminButton href={href} variant="ghost" size="sm" className="w-full justify-start">
                    {label}
                  </AdminButton>
                </li>
              ))}
            </ul>
          </AdminCard>
        </div>
      </div>

      {/* Follow-ups callout */}
      {contactStats.followUpsDue > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
          <p className="text-sm font-semibold text-amber-300">
            {contactStats.followUpsDue} contact{contactStats.followUpsDue !== 1 ? "s" : ""} overdue for follow-up
          </p>
          <p className="mt-1 text-xs text-amber-300/70">
            Review contacts and schedule outreach to maintain relationship health.
          </p>
          <div className="mt-3">
            <AdminButton href="/admin/crm/contacts" variant="outline" size="sm">
              Review contacts
            </AdminButton>
          </div>
        </div>
      )}
    </div>
  );
}
