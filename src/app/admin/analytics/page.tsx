import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = {
  title: "Analytics",
};

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Analytics"
        description="Traffic, engagement, and conversion reporting for the public site and contact pipeline."
        actions={
          <AdminButton href="/admin" variant="outline" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <section aria-label="Headline metrics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard label="Visitors (30d)" value="—" hint="Awaiting data source" />
          <AdminStatCard label="Page views (30d)" value="—" hint="Awaiting data source" />
          <AdminStatCard label="Inquiries (30d)" value="—" hint="From contact pipeline" />
          <AdminStatCard label="Conversion" value="—" hint="Inquiries / visitors" />
        </div>
      </section>

      <AdminCard
        title="Reporting"
        description="Analytics integration will surface here once a data source is connected."
      >
        <AdminEmptyState
          title="No analytics connected yet"
          description="This view is wired to the shared admin layout. Connecting a privacy-respecting analytics source or deriving metrics from existing audit logs is planned for a later batch."
          action={
            <AdminButton href="/admin/audit" variant="outline" size="sm">
              Open audit log
            </AdminButton>
          }
        />
      </AdminCard>
    </div>
  );
}
