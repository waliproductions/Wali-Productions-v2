import { workflowRepository, workflowInstanceRepository } from "@/lib/repositories/workflow.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";

export const dynamic = "force-dynamic";
export const metadata = { title: "Business Automation" };

const AUTOMATION_EVENTS = [
  {
    module: "CRM",
    events: [
      { name: "contact.created", desc: "New contact added to the CRM" },
      { name: "opportunity.stage-changed", desc: "Opportunity moves to a new stage" },
      { name: "opportunity.won", desc: "Opportunity marked as won" },
      { name: "opportunity.lost", desc: "Opportunity marked as lost" },
    ],
  },
  {
    module: "Proposals",
    events: [
      { name: "proposal.created", desc: "New proposal drafted" },
      { name: "proposal.sent", desc: "Proposal sent to client" },
      { name: "proposal.accepted", desc: "Proposal accepted / contract awarded" },
      { name: "proposal.rejected", desc: "Proposal rejected or declined" },
      { name: "proposal.expiring", desc: "Proposal nearing expiration window" },
    ],
  },
  {
    module: "Projects",
    events: [
      { name: "project.kickoff", desc: "Project moved to active status" },
      { name: "project.milestone-due", desc: "Milestone due date reached" },
      { name: "project.health-changed", desc: "Project health changes to at-risk or blocked" },
      { name: "project.closed", desc: "Project completed or closed" },
    ],
  },
  {
    module: "Contracts",
    events: [
      { name: "contract.awarded", desc: "Contract award recorded" },
      { name: "contract.deliverable-due", desc: "Deliverable approaching due date" },
      { name: "contract.expiring", desc: "Contract performance period ending" },
      { name: "contract.invoice-submitted", desc: "Invoice submitted for payment" },
    ],
  },
  {
    module: "Documents",
    events: [
      { name: "document.uploaded", desc: "New document added to the DMS" },
      { name: "document.expiring", desc: "Document nearing expiration date" },
      { name: "document.review-due", desc: "Document due for periodic review" },
    ],
  },
  {
    module: "Government Capture",
    events: [
      { name: "capture.gate-review-due", desc: "Gate review date approaching" },
      { name: "capture.proposal-due", desc: "Proposal submission deadline approaching" },
      { name: "capture.bid-decision", desc: "Bid/no-bid decision recorded" },
    ],
  },
  {
    module: "Knowledge",
    events: [
      { name: "knowledge.review-due", desc: "Knowledge article needs periodic review" },
      { name: "knowledge.published", desc: "Article approved and published" },
    ],
  },
  {
    module: "System",
    events: [
      { name: "manual", desc: "Manually triggered workflow instance" },
      { name: "schedule.daily", desc: "Daily scheduled automation run" },
      { name: "schedule.weekly", desc: "Weekly scheduled automation run" },
    ],
  },
];

export default async function AdminAutomationPage() {
  const [defStats, instStats] = await Promise.all([
    workflowRepository.getStats(),
    workflowInstanceRepository.getStats(),
  ]);

  const totalEvents = AUTOMATION_EVENTS.reduce((s, m) => s + m.events.length, 0);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Business Automation"
        description="Event-driven automation framework — modular triggers connecting platform events to workflow execution."
        actions={
          <AdminButton href="/admin/workflows" variant="ghost" size="md">
            Workflow Engine
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Event types" value={totalEvents} hint="Platform-wide triggers" />
        <AdminStatCard label="Event modules" value={AUTOMATION_EVENTS.length} hint="Source systems" />
        <AdminStatCard label="Active workflows" value={defStats.active} hint="Listening for events" />
        <AdminStatCard label="Instances run" value={instStats.completed + instStats.active} hint="All time" />
      </section>

      <AdminCard title="Architecture" description="How the automation framework works">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              layer: "Event Sources",
              desc: "Every module in the platform emits typed events when state changes — contact created, proposal accepted, deliverable due, etc.",
              color: "border-amber-500/30 bg-amber-500/5",
            },
            {
              layer: "Automation Bus",
              desc: "Events are dispatched to the automation bus, which matches events to registered workflow triggers and queues instances for execution.",
              color: "border-zinc-600 bg-zinc-900/60",
            },
            {
              layer: "Workflow Engine",
              desc: "The Workflow Engine picks up queued instances, advances steps, sends notifications, assigns owners, and tracks completion.",
              color: "border-emerald-500/30 bg-emerald-500/5",
            },
          ].map(({ layer, desc, color }) => (
            <div key={layer} className={`rounded-xl border p-4 ${color}`}>
              <p className="text-sm font-bold text-zinc-200">{layer}</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Event Taxonomy — {totalEvents} event types across {AUTOMATION_EVENTS.length} modules
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {AUTOMATION_EVENTS.map(({ module, events }) => (
            <AdminCard key={module} title={module} description={`${events.length} event type${events.length !== 1 ? "s" : ""}`}>
              <ul className="divide-y divide-zinc-800/60">
                {events.map(({ name, desc }) => (
                  <li key={name} className="py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <code className="font-mono text-xs text-amber-300">{name}</code>
                        <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </AdminCard>
          ))}
        </div>
      </div>

      <AdminCard title="Automation Patterns" description="Pre-built integration patterns">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              pattern: "Lead Nurture",
              trigger: "opportunity.stage-changed",
              action: "Assign follow-up task and notify CRM owner",
            },
            {
              pattern: "Proposal Win Path",
              trigger: "proposal.accepted",
              action: "Start Client Onboarding workflow, create project record",
            },
            {
              pattern: "Proposal Loss Path",
              trigger: "proposal.rejected",
              action: "Log win/loss data, schedule debrief, archive proposal",
            },
            {
              pattern: "Contract Kickoff",
              trigger: "contract.awarded",
              action: "Start Contract Administration workflow, notify project team",
            },
            {
              pattern: "Deliverable Alert",
              trigger: "contract.deliverable-due",
              action: "Notify assigned team member, escalate if overdue",
            },
            {
              pattern: "Past Performance Creation",
              trigger: "project.closed",
              action: "Start Past Performance workflow, route for approval",
            },
            {
              pattern: "Document Expiry Alert",
              trigger: "document.expiring",
              action: "Notify document owner, start renewal review",
            },
            {
              pattern: "Capture Gate Review",
              trigger: "capture.gate-review-due",
              action: "Schedule gate review meeting, gather input from team",
            },
            {
              pattern: "Knowledge Review Cycle",
              trigger: "knowledge.review-due",
              action: "Start Knowledge Review workflow, assign to content owner",
            },
          ].map(({ pattern, trigger, action }) => (
            <div key={pattern} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-sm font-semibold text-zinc-200">{pattern}</p>
              <p className="mt-1.5">
                <code className="font-mono text-xs text-amber-300/80">{trigger}</code>
              </p>
              <p className="mt-1 text-xs text-zinc-500">{action}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Implementation Status">
        <div className="flex flex-wrap gap-2">
          {[
            { item: "Event taxonomy defined", status: "done" },
            { item: "Workflow Engine", status: "done" },
            { item: "Manual trigger", status: "done" },
            { item: "Event-driven trigger (runtime)", status: "planned" },
            { item: "Scheduled triggers (cron)", status: "planned" },
            { item: "Automation rule editor", status: "planned" },
            { item: "Digest emails", status: "planned" },
          ].map(({ item, status }) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2">
              <span className={`h-2 w-2 rounded-full ${status === "done" ? "bg-emerald-500" : "bg-zinc-600"}`} />
              <span className="text-xs text-zinc-300">{item}</span>
              <AdminBadge variant={status === "done" ? "success" : "neutral"}>{status === "done" ? "v1.2" : "future"}</AdminBadge>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
