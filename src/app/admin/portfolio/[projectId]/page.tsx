import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  portfolioContent,
  type PortfolioProjectStatus,
} from "@/config/portfolio";

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

type Props = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params;
  const project = portfolioContent.projects.find((p) => p.id === projectId);
  return { title: project?.title ?? "Portfolio Project" };
}

export default async function AdminPortfolioDetailPage({ params }: Props) {
  const { projectId } = await params;
  const project = portfolioContent.projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={project.title}
        description={project.category}
        actions={
          <AdminButton href="/admin/portfolio" variant="outline" size="md">
            Back to portfolio
          </AdminButton>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project overview */}
        <AdminCard
          title="Project Details"
          className="lg:col-span-2"
        >
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Description
              </dt>
              <dd className="mt-1.5 leading-6 text-zinc-200">
                {project.description}
              </dd>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Category
                </dt>
                <dd className="mt-1.5 text-zinc-200">{project.category}</dd>
              </div>

              {project.year !== undefined ? (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Year
                  </dt>
                  <dd className="mt-1.5 text-zinc-200">{project.year}</dd>
                </div>
              ) : null}

              {project.client ? (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Client
                  </dt>
                  <dd className="mt-1.5 text-zinc-200">{project.client}</dd>
                </div>
              ) : null}
            </div>
          </dl>
        </AdminCard>

        {/* Status & metadata */}
        <AdminCard title="Status">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Publication status
              </dt>
              <dd className="mt-1.5">
                <AdminBadge variant={STATUS_VARIANT[project.status]}>
                  {STATUS_LABEL[project.status]}
                </AdminBadge>
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Featured
              </dt>
              <dd className="mt-1.5">
                {project.featured ? (
                  <AdminBadge variant="info">Featured</AdminBadge>
                ) : (
                  <span className="text-zinc-500">Not featured</span>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Project ID
              </dt>
              <dd className="mt-1.5">
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                  {project.id}
                </code>
              </dd>
            </div>

            {project.url ? (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  URL
                </dt>
                <dd className="mt-1.5">
                  <AdminButton
                    href={project.url}
                    external
                    variant="outline"
                    size="sm"
                  >
                    View site
                  </AdminButton>
                </dd>
              </div>
            ) : null}
          </dl>
        </AdminCard>
      </div>

      {/* Technologies */}
      {project.technologies.length > 0 ? (
        <AdminCard title="Technologies" description="Stack and tools used in this project">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </AdminCard>
      ) : null}

      {/* Config note */}
      <AdminCard title="Configuration">
        <p className="text-sm leading-6 text-zinc-400">
          This project is defined in{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
            src/config/portfolio.ts
          </code>
          . To update project details, modify the entry with ID{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
            {project.id}
          </code>{" "}
          in that file. Runtime editing is planned for a future CMS phase.
        </p>
      </AdminCard>
    </div>
  );
}
