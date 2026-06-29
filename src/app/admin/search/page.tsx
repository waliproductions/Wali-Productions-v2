import "@/lib/repositories/index"; // ensure all repositories self-register with search
import { globalSearch } from "@/lib/store/search";
import type { SearchResult } from "@/lib/store/search";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";

export const dynamic = "force-dynamic";
export const metadata = { title: "Search — Admin" };

type Props = { searchParams?: Promise<{ q?: string; type?: string }> };

const ENTITY_CONFIG: Record<string, {
  label: string;
  variant: "success" | "info" | "neutral" | "warning" | "danger";
  module: string;
}> = {
  organization:      { label: "Organization",    variant: "info",    module: "CRM" },
  contact:           { label: "Contact",         variant: "info",    module: "CRM" },
  meeting:           { label: "Meeting",         variant: "info",    module: "CRM" },
  opportunity:       { label: "Opportunity",     variant: "warning", module: "Business Development" },
  proposal:          { label: "Proposal",        variant: "warning", module: "Business Development" },
  project:           { label: "Project",         variant: "success", module: "Project Delivery" },
  knowledge:         { label: "Knowledge",       variant: "neutral", module: "Knowledge Base" },
  workflow:          { label: "Workflow",        variant: "neutral", module: "Automation" },
  document:          { label: "Document",        variant: "neutral", module: "Documents" },
  capture:           { label: "Capture",         variant: "warning", module: "Gov Contracts" },
  activity:          { label: "Activity",        variant: "neutral", module: "Audit" },
  notification:      { label: "Notification",    variant: "neutral", module: "Notifications" },
};

function getEntityTitle(result: SearchResult): string {
  const e = result.entity as Record<string, unknown>;
  return (
    (e.title as string | undefined) ??
    (e.name as string | undefined) ??
    (e.opportunityTitle as string | undefined) ??
    (e.summary as string | undefined) ??
    result.id
  );
}

function getEntitySubtitle(result: SearchResult): string | null {
  const e = result.entity as Record<string, unknown>;
  switch (result.entityType) {
    case "contact":
      return (e.title as string | undefined) ?? null;
    case "opportunity":
      return (e.stage as string | undefined) ?? null;
    case "project":
      return (e.health as string | undefined)?.replace(/-/g, " ") ?? null;
    case "knowledge":
      return (e.category as string | undefined) ?? null;
    case "proposal":
      return (e.status as string | undefined)?.replace(/-/g, " ") ?? null;
    case "workflow":
      return (e.status as string | undefined) ?? null;
    case "document":
      return (e.category as string | undefined) ?? null;
    case "capture":
      return (e.stage as string | undefined)?.replace(/-/g, " ") ?? null;
    case "activity":
      return (e.verb as string | undefined) ?? null;
    default:
      return null;
  }
}

export default async function AdminSearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params?.q?.trim() ?? "";
  const typeFilter = params?.type;

  let results: SearchResult[] = [];
  if (q.length >= 2) {
    results = await globalSearch(q, { limit: 50 });
    if (typeFilter) {
      results = results.filter((r) => r.entityType === typeFilter);
    }
  }

  const byType = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    const key = r.entityType;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  const entityTypesFound = Object.keys(byType);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Global Search"
        description="Search across all modules — CRM, projects, contracts, knowledge, documents, and more."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      {/* Search form */}
      <form method="GET" className="flex gap-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search everything… (2+ characters)"
          autoFocus
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-amber-400"
        />
        {typeFilter && <input type="hidden" name="type" value={typeFilter} />}
        <button
          type="submit"
          className="rounded-lg border border-amber-500 bg-amber-500/10 px-4 py-2.5 text-sm font-medium text-amber-300 transition-colors hover:bg-amber-500/20"
        >
          Search
        </button>
      </form>

      {/* Entity type filter — shown when results are present */}
      {q.length >= 2 && results.length > 0 && entityTypesFound.length > 1 && (
        <form method="GET" className="flex flex-wrap gap-2">
          <input type="hidden" name="q" value={q} />
          <button
            type="submit"
            name="type"
            value=""
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              !typeFilter
                ? "border-amber-400 bg-amber-500/10 text-amber-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            All ({results.length})
          </button>
          {entityTypesFound.map((type) => {
            const cfg = ENTITY_CONFIG[type];
            if (!cfg) return null;
            return (
              <button
                key={type}
                type="submit"
                name="type"
                value={type}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  typeFilter === type
                    ? "border-amber-400 bg-amber-500/10 text-amber-300"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                {cfg.label} ({byType[type]?.length ?? 0})
              </button>
            );
          })}
        </form>
      )}

      {q.length > 0 && q.length < 2 && (
        <p className="text-sm text-zinc-500">Enter at least 2 characters to search.</p>
      )}

      {q.length >= 2 && results.length === 0 && (
        <div className="rounded-xl border border-zinc-800 py-12 text-center">
          <p className="text-sm text-zinc-400">No results for &ldquo;{q}&rdquo;{typeFilter ? ` in ${ENTITY_CONFIG[typeFilter]?.label ?? typeFilter}` : ""}</p>
          <p className="mt-1 text-xs text-zinc-600">Try different keywords, a shorter phrase, or remove the type filter.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-6">
          {Object.entries(byType).map(([type, items]) => {
            const cfg = ENTITY_CONFIG[type];
            if (!cfg) return null;
            return (
              <AdminCard
                key={type}
                title={cfg.label}
                description={`${items.length} match${items.length !== 1 ? "es" : ""} · ${cfg.module}`}
              >
                <ul className="divide-y divide-zinc-800/60">
                  {items.map((r) => {
                    const title = getEntityTitle(r);
                    const subtitle = getEntitySubtitle(r);
                    return (
                      <li key={r.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-zinc-100 truncate">{title}</p>
                          {subtitle && (
                            <p className="mt-0.5 text-xs capitalize text-zinc-500">{subtitle}</p>
                          )}
                          <p className="mt-0.5 font-mono text-xs text-zinc-700">{r.id}</p>
                        </div>
                        <AdminBadge variant={cfg.variant}>score {r.score}</AdminBadge>
                      </li>
                    );
                  })}
                </ul>
              </AdminCard>
            );
          })}
        </div>
      )}

      {q.length === 0 && (
        <AdminCard title="Search scope" description="All modules registered with global search">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Object.entries(ENTITY_CONFIG).map(([type, cfg]) => (
              <div
                key={type}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3"
              >
                <p className="text-sm font-semibold text-zinc-200">{cfg.label}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{cfg.module}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-zinc-600">
            12 entity types indexed · Type at least 2 characters to search
          </p>
        </AdminCard>
      )}
    </div>
  );
}
