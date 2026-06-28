import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Lessons Learned — Projects" };

const CATEGORIES = [
  { category: "Process", description: "Delivery workflow improvements", count: 0 },
  { category: "Technical", description: "Engineering and architecture insights", count: 0 },
  { category: "Client", description: "Client management and communication", count: 0 },
  { category: "Team", description: "Collaboration and staffing", count: 0 },
  { category: "Risk", description: "Risk identification and response", count: 0 },
  { category: "Communication", description: "Internal and external communication", count: 0 },
] as const;

export default function AdminLessonsLearnedPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Lessons Learned"
        description="Institutional knowledge from completed and active projects — what worked, what didn't, and what to do differently."
        actions={
          <AdminButton href="/admin/projects" variant="ghost" size="md">
            Back to projects
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total entries" value="0" />
        <AdminStatCard label="Process insights" value="0" hint="Workflow improvements" />
        <AdminStatCard label="Technical insights" value="0" hint="Engineering lessons" />
        <AdminStatCard label="Client insights" value="0" hint="Relationship lessons" />
      </section>

      <AdminCard
        title="Lessons Learned Library"
        description="All recorded insights from project delivery"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No lessons recorded"
          description="Lessons learned are captured at project closeout and during retrospectives. They feed back into SOPs, proposal approaches, and risk registers for future projects."
        />
      </AdminCard>

      <AdminCard title="Categories" description="Lessons by area of impact">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ category, description, count }) => (
            <div
              key={category}
              className="flex items-start justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-200">{category}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              </div>
              <span className="text-sm font-semibold text-zinc-400">{count}</span>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="How lessons learned feeds the platform">
        <div className="space-y-3 text-sm text-zinc-400">
          <p>
            Lessons learned entries connect to the broader knowledge management system. When a lesson is
            recorded here, it becomes a candidate for:
          </p>
          <ul className="space-y-1.5 pl-4">
            {[
              "A new or updated SOP in the Knowledge Base",
              "A risk entry in future project risk registers",
              "A proposal section improvement in the Section Template Library",
              "A client communication guideline update",
              "An engineering standard revision in docs/04-Engineering/",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </AdminCard>
    </div>
  );
}
