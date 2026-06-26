import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = {
  title: "Portfolio",
};

export default function AdminPortfolioPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Portfolio"
        description="Manage the public production portfolio and featured work."
        actions={
          <AdminButton href="/admin" variant="outline" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <section aria-label="Portfolio overview">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <AdminStatCard label="Published projects" value="0" hint="Live on the public site" />
          <AdminStatCard label="Drafts" value="0" hint="Not yet published" />
          <AdminStatCard label="Featured" value="0" hint="Highlighted on the homepage" />
        </div>
      </section>

      <AdminCard
        title="Projects"
        description="Production work shown on the public portfolio."
        actions={
          <AdminButton variant="primary" size="sm" disabled title="Project creation arrives in a later batch">
            New project
          </AdminButton>
        }
      >
        <AdminEmptyState
          title="No projects yet"
          description="Portfolio entries created here will appear on the public site. Authoring tools are part of an upcoming batch; this view is wired to the shared admin layout and components."
          action={
            <AdminButton href="/" external variant="outline" size="sm">
              View public site
            </AdminButton>
          }
        />
      </AdminCard>
    </div>
  );
}
