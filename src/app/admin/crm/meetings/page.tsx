import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Meetings — CRM" };

const MEETING_TYPES = [
  { type: "Intro Call", description: "First conversation with a new contact", count: 0 },
  { type: "Discovery", description: "Understanding client needs and challenges", count: 0 },
  { type: "Demo", description: "Demonstrating capabilities or past work", count: 0 },
  { type: "Proposal Review", description: "Presenting or reviewing a proposal", count: 0 },
  { type: "Negotiation", description: "Discussing terms and conditions", count: 0 },
  { type: "Kickoff", description: "Starting a new project or engagement", count: 0 },
  { type: "Check-in", description: "Ongoing relationship maintenance", count: 0 },
  { type: "Debrief", description: "Post-award or post-project review", count: 0 },
] as const;

export default function AdminMeetingsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Meetings"
        description="Meeting log across all organizations — scheduled, completed, and follow-up required."
        actions={
          <AdminButton href="/admin/crm" variant="ghost" size="md">
            Back to CRM
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Scheduled" value="0" hint="Upcoming" />
        <AdminStatCard label="This month" value="0" hint="Completed" />
        <AdminStatCard label="Follow-up required" value="0" hint="Action items pending" />
        <AdminStatCard label="No-shows" value="0" hint="This quarter" />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard
          title="Upcoming Meetings"
          actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
        >
          <AdminEmptyState
            title="No upcoming meetings"
            description="Schedule meetings with prospects and clients. Meetings are linked to organizations, contacts, and pipeline opportunities."
          />
        </AdminCard>

        <AdminCard
          title="Action Items"
          description="Follow-ups from completed meetings"
        >
          <AdminEmptyState
            title="No action items"
            description="Action items from meeting notes will appear here until marked complete."
          />
        </AdminCard>
      </div>

      <AdminCard title="Meeting Types" description="Meetings by purpose and stage">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MEETING_TYPES.map(({ type, description, count }) => (
            <div
              key={type}
              className="flex items-start justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-200">{type}</p>
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
            "Meeting scheduling with organization and contact linkage",
            "Pre-meeting agenda tracking",
            "Post-meeting notes and action item capture",
            "Follow-up date assignment and alerts",
            "Recording and transcript URL storage",
            "Meeting type classification",
            "Duration and attendance tracking",
            "Calendar integration: Microsoft 365 / Google (future)",
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
