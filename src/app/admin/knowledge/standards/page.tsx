import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Standards — Knowledge Base" };

const STANDARDS_AREAS = [
  {
    area: "Code Quality",
    description: "TypeScript rules, component conventions, naming, and commit format",
    source: "docs/04-Engineering/CODING_STANDARDS.md",
    status: "Approved",
  },
  {
    area: "Design System",
    description: "Color usage, typography, page structure, and component patterns",
    source: "docs/04-Engineering/DESIGN_CONVENTIONS.md",
    status: "Approved",
  },
  {
    area: "Architecture",
    description: "Directory structure, data models, auth, routing, and SEO",
    source: "ARCHITECTURE.md",
    status: "Approved",
  },
  {
    area: "Security",
    description: "Headers, session management, input validation, and OWASP compliance",
    source: "next.config.mjs + auth layer",
    status: "Implemented",
  },
  {
    area: "API Design",
    description: "Request/response conventions, error handling, and rate limiting",
    source: "To be documented",
    status: "Pending",
  },
  {
    area: "Accessibility",
    description: "WCAG 2.1 AA standards for all public-facing interfaces",
    source: "docs/04-Engineering/DESIGN_CONVENTIONS.md",
    status: "Approved",
  },
] as const;

export default function AdminStandardsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Technical Standards"
        description="Engineering standards, architectural decisions, and quality benchmarks."
        actions={
          <AdminButton href="/admin/knowledge" variant="ghost" size="md">
            Back to knowledge base
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total standards" value="6" hint="Across all areas" />
        <AdminStatCard label="Approved" value="4" hint="Active and enforced" />
        <AdminStatCard label="Implemented" value="1" hint="In code, pending doc" />
        <AdminStatCard label="Pending" value="1" hint="Not yet documented" />
      </section>

      <AdminCard
        title="Standards Library"
        description="All technical and engineering standards"
        actions={<AdminBadge variant="neutral">Structural view only</AdminBadge>}
      >
        <AdminEmptyState
          title="Standards are documented externally"
          description="Technical standards live in the docs/ directory alongside the codebase. They will be indexed here for cross-referencing with proposals, SOPs, and project delivery requirements."
        />
      </AdminCard>

      <AdminCard title="Standards Areas" description="Engineering and quality domains">
        <div className="space-y-3">
          {STANDARDS_AREAS.map(({ area, description, source, status }) => (
            <div
              key={area}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-zinc-100">{area}</h3>
                  <p className="mt-1 text-xs text-zinc-400">{description}</p>
                  <p className="mt-1.5 font-mono text-xs text-zinc-600">{source}</p>
                </div>
                <AdminBadge
                  variant={
                    status === "Approved"
                      ? "success"
                      : status === "Implemented"
                      ? "info"
                      : "neutral"
                  }
                >
                  {status}
                </AdminBadge>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Cross-reference to docs/ source files",
            "Standard version and approval tracking",
            "Applicability scope per standard",
            "Enforcement level per standard",
            "Links from proposal deliverables to relevant standards",
            "Review reminders when standards age",
            "Client-deliverable standard citations",
            "Export for proposal technical approach sections",
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
