import { workflowRepository, workflowInstanceRepository } from "@/lib/repositories/workflow.repository";
import type { StoredWorkflowDefinition, StoredWorkflowInstance } from "@/lib/repositories/workflow.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Workflows" };

const INSTANCE_STATUS_VARIANT: Record<string, "success" | "info" | "neutral" | "warning" | "danger"> = {
  pending: "neutral",
  "in-progress": "info",
  paused: "warning",
  completed: "success",
  cancelled: "neutral",
  failed: "danger",
};

const DEF_COLS: AdminTableColumn<StoredWorkflowDefinition>[] = [
  {
    key: "name",
    header: "Workflow",
    render: (w) => (
      <div>
        <p className="font-medium text-zinc-100">{w.name}</p>
        {w.description && <p className="mt-0.5 text-xs text-zinc-500 truncate max-w-xs">{w.description}</p>}
      </div>
    ),
  },
  {
    key: "trigger",
    header: "Trigger",
    render: (w) => <span className="font-mono text-xs text-zinc-400">{w.trigger}</span>,
    hideOnMobile: true,
  },
  {
    key: "steps",
    header: "Steps",
    render: (w) => <span className="text-sm text-zinc-400">{w.steps?.length ?? 0}</span>,
    hideOnMobile: true,
  },
  {
    key: "status",
    header: "Status",
    render: (w) => (
      <AdminBadge variant={w.status === "active" ? "success" : w.status === "draft" ? "neutral" : "neutral"}>
        {w.status}
      </AdminBadge>
    ),
  },
  {
    key: "updated",
    header: "Updated",
    render: (w) => <span className="text-sm text-zinc-500">{formatDate(w.updatedAt)}</span>,
    hideOnMobile: true,
  },
];

const INST_COLS: AdminTableColumn<StoredWorkflowInstance>[] = [
  {
    key: "name",
    header: "Workflow",
    render: (i) => (
      <div>
        <p className="font-medium text-zinc-100">{i.definitionName}</p>
        {i.entityTitle && <p className="mt-0.5 text-xs text-zinc-500">{i.entityTitle}</p>}
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (i) => (
      <AdminBadge variant={INSTANCE_STATUS_VARIANT[i.status] ?? "neutral"}>
        {i.status.replace(/-/g, " ")}
      </AdminBadge>
    ),
  },
  {
    key: "entity",
    header: "Entity",
    render: (i) => <span className="text-sm capitalize text-zinc-400">{i.entityType}</span>,
    hideOnMobile: true,
  },
  {
    key: "started",
    header: "Started",
    render: (i) => <span className="text-sm text-zinc-500">{formatDate(i.startedAt)}</span>,
    hideOnMobile: true,
  },
];

const WORKFLOW_TEMPLATES = [
  { name: "Client Onboarding", trigger: "manual", steps: 5, purpose: "Guide new clients from signed proposal to active project" },
  { name: "Proposal Development", trigger: "proposal.created", steps: 6, purpose: "Draft → review → approval → submission lifecycle" },
  { name: "Project Delivery", trigger: "project.kickoff", steps: 8, purpose: "Kickoff through milestones to client acceptance" },
  { name: "Contract Administration", trigger: "contract.awarded", steps: 4, purpose: "Award through performance period management" },
  { name: "Past Performance Creation", trigger: "project.closed", steps: 3, purpose: "Document performance record after project close" },
  { name: "Knowledge Review", trigger: "manual", steps: 4, purpose: "Draft → SME review → approval → publish cycle" },
  { name: "Document Approval", trigger: "document.uploaded", steps: 3, purpose: "Review and approve uploaded documents" },
  { name: "Gov Opportunity Capture", trigger: "manual", steps: 7, purpose: "Market research through bid/no-bid gate decision" },
];

export default async function AdminWorkflowsPage() {
  const [defStats, instStats, definitions, instances] = await Promise.all([
    workflowRepository.getStats(),
    workflowInstanceRepository.getStats(),
    workflowRepository.findAll({ sort: { field: "updatedAt", order: "desc" }, perPage: 50 }),
    workflowInstanceRepository.findAll({ sort: { field: "startedAt", order: "desc" }, perPage: 20 }),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Workflow Engine"
        description="Configurable business processes with approval chains, owners, and status tracking."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Definitions" value={defStats.total} hint="Configured workflows" />
        <AdminStatCard label="Active" value={defStats.active} hint="Enabled workflows" />
        <AdminStatCard label="Running" value={instStats.active} hint="In progress" />
        <AdminStatCard label="Completed" value={instStats.completed} hint="All time" />
      </section>

      <AdminCard title={`${definitions.total} workflow definition${definitions.total !== 1 ? "s" : ""}`} padded={false}>
        {definitions.items.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-zinc-500">No workflows configured yet.</p>
            <p className="mt-1 text-xs text-zinc-600">Use the templates below to seed your first workflow.</p>
          </div>
        ) : (
          <AdminTable columns={DEF_COLS} rows={definitions.items} getRowKey={(w) => w.id} />
        )}
      </AdminCard>

      {instances.items.length > 0 && (
        <AdminCard title="Recent Workflow Instances" padded={false}>
          <AdminTable columns={INST_COLS} rows={instances.items} getRowKey={(i) => i.id} />
        </AdminCard>
      )}

      <AdminCard title="Workflow Templates" description="Pre-built workflow patterns ready to activate">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {WORKFLOW_TEMPLATES.map(({ name, trigger, steps, purpose }) => (
            <div key={name} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-100">{name}</p>
                  <p className="mt-1 text-xs text-zinc-400">{purpose}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <AdminBadge variant="neutral">{steps} steps</AdminBadge>
                    <AdminBadge variant="neutral">{trigger}</AdminBadge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
