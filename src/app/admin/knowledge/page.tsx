import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Knowledge Base" };

const MODULES = [
  {
    label: "SOPs",
    value: "0 active",
    hint: "Standard operating procedures",
    href: "/admin/knowledge/sops",
  },
  {
    label: "Policies",
    value: "0 active",
    hint: "Company policies",
    href: "/admin/knowledge/policies",
  },
  {
    label: "Standards",
    value: "0 active",
    hint: "Technical and engineering standards",
    href: "/admin/knowledge/standards",
  },
  {
    label: "Templates",
    value: "0 available",
    hint: "Proposal and document templates",
    href: "/admin/knowledge/templates",
  },
] as const;

export default function AdminKnowledgePage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Knowledge Base"
        description="SOPs, policies, technical standards, and proposal templates — the operational memory of Wali Productions."
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
        title="Recent Activity"
        description="Recently updated knowledge entries"
      >
        <AdminEmptyState
          title="No entries yet"
          description="Knowledge base entries will appear here as SOPs, policies, standards, and templates are added."
        />
      </AdminCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard
          title="Pending Review"
          description="Entries awaiting founder review"
          actions={
            <AdminButton href="/admin/knowledge/sops" variant="ghost" size="sm">
              View SOPs
            </AdminButton>
          }
        >
          <AdminEmptyState
            title="Nothing pending review"
            description="Entries in draft or review status will surface here."
          />
        </AdminCard>

        <AdminCard
          title="Due for Review"
          description="Entries past their scheduled review date"
        >
          <AdminEmptyState
            title="Nothing overdue"
            description="Entries are reviewed on a configurable cycle. Overdue reviews will appear here."
          />
        </AdminCard>
      </div>

      <AdminCard title="Knowledge Management System" description="About this module">
        <div className="space-y-4 text-sm text-zinc-400">
          <p>
            The Knowledge Base captures the institutional memory of Wali Productions — the
            processes, policies, and standards that govern how the company operates. Maintaining
            this knowledge enables consistent delivery, faster onboarding, and auditable operations.
          </p>
          <p>
            All entries go through a status lifecycle: <strong className="text-zinc-300">draft</strong> →{" "}
            <strong className="text-zinc-300">review</strong> →{" "}
            <strong className="text-zinc-300">approved</strong>. Approved entries become the authoritative
            source of truth and are linked to their relevant operational contexts (proposals, projects, clients).
          </p>
        </div>
      </AdminCard>
    </div>
  );
}
