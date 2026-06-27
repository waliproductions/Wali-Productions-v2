import Link from "next/link";

import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import {
  portfolioContent,
  type PortfolioProject,
  type PortfolioProjectStatus,
} from "@/config/portfolio";
import type { AdminTableColumn } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio",
};

const STATUS_VARIANT: Record<PortfolioProjectStatus, "success" | "warning" | "neutral"> = {
  published: "success",
  draft: "warning",
  pending: "neutral",
};

const STATUS_LABEL: Record<PortfolioProjectStatus, string> = {
  published: "Published",
  draft: "Draft",
  pending: "Pending",
};

const COLUMNS: AdminTableColumn<PortfolioProject>[] = [
  {
    key: "title",
    header: "Project",
    render: (project) => (
      <Link
        href={`/admin/portfolio/${project.id}`}
        className="font-medium text-amber-400 hover:text-amber-300"
      >
        {project.title}
      </Link>
    ),
  },
  {
    key: "category",
    header: "Category",
    hideOnMobile: true,
    render: (project) => (
      <span className="text-zinc-300">{project.category}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (project) => (
      <AdminBadge variant={STATUS_VARIANT[project.status]}>
        {STATUS_LABEL[project.status]}
      </AdminBadge>
    ),
  },
  {
    key: "featured",
    header: "Featured",
    align: "center",
    hideOnMobile: true,
    render: (project) =>
      project.featured ? (
        <AdminBadge variant="info">Featured</AdminBadge>
      ) : (
        <span className="text-zinc-700">—</span>
      ),
  },
  {
    key: "technologies",
    header: "Technologies",
    hideOnMobile: true,
    render: (project) => (
      <div className="flex flex-wrap gap-1">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 ? (
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
            +{project.technologies.length - 3}
          </span>
        ) : null}
      </div>
    ),
  },
  {
    key: "year",
    header: "Year",
    align: "right",
    hideOnMobile: true,
    render: (project) => (
      <span className="text-zinc-400">{project.year ?? "—"}</span>
    ),
  },
];

type PageProps = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    category?: string;
  }>;
};

export default async function AdminPortfolioPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = String(params?.q ?? "").trim().toLowerCase();
  const statusFilter = String(params?.status ?? "").trim();
  const categoryFilter = String(params?.category ?? "").trim();

  const projects = portfolioContent.projects;
  const categories = [...new Set(projects.map((p) => p.category))].sort();

  const filtered = projects.filter((project) => {
    const matchesStatus = !statusFilter || project.status === statusFilter;
    const matchesCategory = !categoryFilter || project.category === categoryFilter;
    const searchableText = [
      project.title,
      project.description,
      project.category,
      project.client ?? "",
      project.technologies.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || searchableText.includes(query);

    return matchesStatus && matchesCategory && matchesQuery;
  });

  const publishedCount = projects.filter((p) => p.status === "published").length;
  const draftCount = projects.filter((p) => p.status === "draft").length;
  const pendingCount = projects.filter((p) => p.status === "pending").length;
  const featuredCount = projects.filter((p) => p.featured).length;

  const hasFilter = Boolean(query || statusFilter || categoryFilter);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Portfolio"
        description="Manage the public production portfolio and featured work. Projects are defined in src/config/portfolio.ts."
        actions={
          <AdminButton href="/admin" variant="outline" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <section aria-label="Portfolio overview">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard
            label="Published"
            value={publishedCount}
            hint="Live on the public site"
            href="/admin/portfolio?status=published"
          />
          <AdminStatCard
            label="Drafts"
            value={draftCount}
            hint="Not yet published"
            href="/admin/portfolio?status=draft"
          />
          <AdminStatCard
            label="Pending"
            value={pendingCount}
            hint="Awaiting documentation"
            href="/admin/portfolio?status=pending"
          />
          <AdminStatCard
            label="Featured"
            value={featuredCount}
            hint="Highlighted on the portfolio page"
          />
        </div>
      </section>

      <AdminCard title="Filter Projects">
        <form className="grid gap-4 sm:grid-cols-[1fr_180px_180px_auto]">
          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Search
            </span>
            <input
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-amber-400"
              defaultValue={params?.q ?? ""}
              name="q"
              placeholder="Title, description, technology..."
              type="search"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Status
            </span>
            <select
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-amber-400"
              defaultValue={params?.status ?? ""}
              name="status"
            >
              <option value="">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Category
            </span>
            <select
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-amber-400"
              defaultValue={params?.category ?? ""}
              name="category"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end gap-2">
            <button
              className="h-9 flex-1 rounded-lg bg-amber-500 px-4 text-sm font-bold text-zinc-950 transition hover:bg-amber-400"
              type="submit"
            >
              Apply
            </button>
            {hasFilter ? (
              <a
                href="/admin/portfolio"
                className="flex h-9 items-center rounded-lg border border-zinc-700 px-3 text-sm text-zinc-400 transition hover:bg-zinc-800"
              >
                Clear
              </a>
            ) : null}
          </div>
        </form>
      </AdminCard>

      <AdminCard
        title="Projects"
        description={`Showing ${filtered.length} of ${projects.length}`}
        padded={false}
      >
        <AdminTable
          columns={COLUMNS}
          rows={filtered}
          getRowKey={(project) => project.id}
          empty={
            <AdminEmptyState
              title={
                projects.length === 0
                  ? "No projects configured"
                  : "No projects match your filter"
              }
              description={
                projects.length === 0
                  ? "Add entries to the projects array in src/config/portfolio.ts to manage them here."
                  : "Try adjusting your search or filter."
              }
              action={
                hasFilter ? (
                  <AdminButton href="/admin/portfolio" variant="outline" size="sm">
                    Clear filters
                  </AdminButton>
                ) : undefined
              }
            />
          }
        />
      </AdminCard>
    </div>
  );
}
