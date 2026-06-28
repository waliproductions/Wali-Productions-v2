import {
  getContactAuditEvents,
  getContactDashboardSubmissions,
} from "@/lib/admin/contact-dashboard";
import { AdminWidget, AdminWidgetList, AdminWidgetMetric } from "@/components/admin/AdminWidget";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard" };

const PLATFORM_MODULES = [
  { label: "CRM", description: "Organizations, contacts, pipeline, meetings", href: "/admin/crm" },
  { label: "Operations", description: "Tasks, proposals, clients, and reports", href: "/admin/operations" },
  { label: "Gov Contracts", description: "Opportunities, proposals, certifications, teaming", href: "/admin/contracts" },
  { label: "Projects", description: "Active delivery, risks, deliverables, lessons learned", href: "/admin/projects" },
  { label: "Contract Records", description: "Active contracts, task orders, deliverables, invoices", href: "/admin/contract-records" },
  { label: "Knowledge Base", description: "SOPs, policies, standards, templates", href: "/admin/knowledge" },
  { label: "Portfolio", description: "Public project showcase", href: "/admin/portfolio" },
  { label: "Government", description: "Public government contracting profile", href: "/admin/government" },
  { label: "Reports", description: "Business intelligence across all domains", href: "/admin/reports" },
  { label: "Analytics", description: "Website traffic and engagement", href: "/admin/analytics" },
] as const;

export default async function AdminDashboardPage() {
  const [submissions, auditEvents] = await Promise.all([
    getContactDashboardSubmissions(),
    getContactAuditEvents(),
  ]);

  const processedCount = submissions.filter((s) => s.lifecycleStatus === "processed").length;
  const failedCount = submissions.filter((s) => s.lifecycleStatus === "failed").length;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
          Internal Operations
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-50">
          Wali Productions Admin
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Enterprise operations platform — CRM, government contracting, project delivery, and business intelligence.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminWidget title="Contact Inquiries" action={{ label: "View all", href: "/admin/contact" }}>
          <AdminWidgetMetric label="Total" value={submissions.length} hint="All time" />
        </AdminWidget>

        <AdminWidget title="Processed" action={{ label: "View", href: "/admin/contact?status=processed" }}>
          <AdminWidgetMetric label="Processed" value={processedCount} hint="Successfully delivered" />
        </AdminWidget>

        <AdminWidget title="Failed" action={{ label: "Review", href: "/admin/contact?status=failed" }}>
          <AdminWidgetMetric
            label="Failed"
            value={failedCount}
            hint="Needs follow-up"
            trend={failedCount > 0 ? { value: "Attention needed", direction: "down" } : undefined}
          />
        </AdminWidget>

        <AdminWidget title="Audit Events" action={{ label: "View log", href: "/admin/audit" }}>
          <AdminWidgetMetric label="Events" value={auditEvents.length} hint="Contact pipeline" />
        </AdminWidget>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdminWidget title="Platform Modules" action={{ label: "Reports →", href: "/admin/reports" }}>
            <AdminWidgetList
              items={PLATFORM_MODULES.map(({ label, description, href }) => ({
                label,
                value: description,
                href,
              }))}
            />
          </AdminWidget>
        </div>

        <div className="flex flex-col gap-6">
          <AdminWidget title="Recent Contact Inquiries" action={{ label: "View all", href: "/admin/contact" }} size="compact">
            {submissions.length === 0 ? (
              <p className="text-sm text-zinc-600">No submissions yet.</p>
            ) : (
              <AdminWidgetList
                items={submissions.slice(0, 5).map((s) => ({
                  label: s.requester?.name ?? "Unknown",
                  value: s.lifecycleStatus,
                  href: "/admin/contact",
                }))}
              />
            )}
          </AdminWidget>

          <AdminWidget title="Quick Links" size="compact">
            <AdminWidgetList
              items={[
                { label: "CRM Pipeline", href: "/admin/crm/pipeline" },
                { label: "Risk Register", href: "/admin/projects/risks" },
                { label: "Active Contracts", href: "/admin/contract-records/active" },
                { label: "Knowledge Base", href: "/admin/knowledge" },
                { label: "Settings", href: "/admin/settings" },
              ]}
            />
          </AdminWidget>
        </div>
      </div>
    </div>
  );
}
