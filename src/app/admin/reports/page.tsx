import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Reports" };

const REPORT_DOMAINS = [
  {
    domain: "Business Development",
    description: "Pipeline value, win rate, outreach activity, and relationship health",
    href: "/admin/reports",
    status: "Planned",
  },
  {
    domain: "Revenue",
    description: "Invoiced, collected, and projected revenue by period and source",
    href: "/admin/reports",
    status: "Planned",
  },
  {
    domain: "Pipeline",
    description: "Open opportunities by stage, value, and probability-weighted forecast",
    href: "/admin/reports",
    status: "Planned",
  },
  {
    domain: "Proposal Success",
    description: "Win/loss rate, time to close, proposal volume, and revenue per win",
    href: "/admin/reports",
    status: "Planned",
  },
  {
    domain: "Project Status",
    description: "Project health, milestone adherence, budget variance, and delivery metrics",
    href: "/admin/reports",
    status: "Planned",
  },
  {
    domain: "Government Opportunities",
    description: "Pipeline of gov opportunities, capture stage, and submission metrics",
    href: "/admin/reports",
    status: "Planned",
  },
  {
    domain: "Client Growth",
    description: "Client acquisition, retention, account expansion, and lifecycle",
    href: "/admin/reports",
    status: "Planned",
  },
  {
    domain: "Website Analytics",
    description: "Traffic, engagement, lead conversion, and SEO performance",
    href: "/admin/analytics",
    status: "Existing",
  },
  {
    domain: "Support Activity",
    description: "Contact form volume, resolution time, and inquiry categories",
    href: "/admin/contact",
    status: "Existing",
  },
  {
    domain: "Operational Health",
    description: "Task completion, SLA adherence, deliverable on-time rate, and system uptime",
    href: "/admin/reports",
    status: "Planned",
  },
] as const;

export default function AdminReportsHubPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Reports"
        description="Business intelligence across all operational domains — revenue, pipeline, projects, government, and client growth."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Report domains" value="10" hint="Planned coverage" />
        <AdminStatCard label="Active reports" value="2" hint="Website + contact" />
        <AdminStatCard label="Pending data" value="8" hint="Awaiting data connection" />
        <AdminStatCard label="Dashboard widgets" value="—" hint="Configurable (coming)" />
      </section>

      <AdminCard
        title="Executive Dashboard"
        description="Founder-level summary across all domains"
      >
        <AdminEmptyState
          title="No data connected"
          description="The executive dashboard will surface key metrics from all domains — pipeline value, active contracts, project health, and revenue — in a single view. Data sources connect as each module is implemented."
        />
      </AdminCard>

      <AdminCard title="Report Domains" description="Coverage areas and availability status">
        <div className="divide-y divide-zinc-800">
          {REPORT_DOMAINS.map(({ domain, description, status }) => (
            <div
              key={domain}
              className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-200">{domain}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  status === "Existing"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Dashboard Widget Architecture" description="Reusable reporting components">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { widget: "Metric", description: "Single KPI with trend indicator" },
            { widget: "Pipeline Stage", description: "Deal count and value by stage" },
            { widget: "Line Chart", description: "Time-series data visualization" },
            { widget: "Bar Chart", description: "Comparative category data" },
            { widget: "Status Grid", description: "Multi-project health matrix" },
            { widget: "Activity Feed", description: "Recent events across modules" },
            { widget: "Progress Bar", description: "Goal achievement tracking" },
            { widget: "Calendar", description: "Deadline and milestone view" },
            { widget: "Data Table", description: "Sortable, filterable data lists" },
          ].map(({ widget, description }) => (
            <div
              key={widget}
              className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <p className="text-sm font-semibold text-zinc-200">{widget}</p>
              <p className="mt-1 text-xs text-zinc-500">{description}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
