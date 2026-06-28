import "@/lib/repositories/index"; // ensure all repositories self-register with search
import { globalSearch } from "@/lib/store/search";
import type { SearchResult } from "@/lib/store/search";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";

export const dynamic = "force-dynamic";
export const metadata = { title: "Search — Admin" };

type Props = { searchParams?: Promise<{ q?: string }> };

const ENTITY_CONFIG: Record<string, { label: string; href: (id: string) => string; variant: "success" | "info" | "neutral" | "warning" }> = {
  organization: { label: "Organization", href: (id) => `/admin/crm/organizations`, variant: "info" },
  contact: { label: "Contact", href: (id) => `/admin/crm/contacts`, variant: "info" },
  meeting: { label: "Meeting", href: (id) => `/admin/crm/meetings`, variant: "info" },
  opportunity: { label: "Opportunity", href: (id) => `/admin/crm/pipeline`, variant: "warning" },
  proposal: { label: "Proposal", href: (id) => `/admin/operations/proposals`, variant: "neutral" },
  project: { label: "Project", href: (id) => `/admin/projects`, variant: "success" },
  knowledge: { label: "Knowledge", href: (id) => `/admin/knowledge`, variant: "neutral" },
  notification: { label: "Notification", href: (id) => `/admin`, variant: "neutral" },
};

function getEntityTitle(result: SearchResult): string {
  const e = result.entity as Record<string, unknown>;
  return (
    (e.title as string | undefined) ??
    (e.name as string | undefined) ??
    (e.subject as string | undefined) ??
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
    default:
      return null;
  }
}

export default async function AdminSearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params?.q?.trim() ?? "";

  let results: SearchResult[] = [];
  if (q.length >= 2) {
    results = await globalSearch(q, { limit: 30 });
  }

  const byType = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    const key = r.entityType;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Global Search"
        description="Search across all entities — organizations, contacts, opportunities, projects, and more."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      <form method="GET" className="flex gap-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search everything…"
          autoFocus
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          className="rounded-lg border border-amber-500 bg-amber-500/10 px-4 py-2.5 text-sm font-medium text-amber-300 transition-colors hover:bg-amber-500/20"
        >
          Search
        </button>
      </form>

      {q.length > 0 && q.length < 2 && (
        <p className="text-sm text-zinc-500">Enter at least 2 characters to search.</p>
      )}

      {q.length >= 2 && results.length === 0 && (
        <div className="rounded-xl border border-zinc-800 py-12 text-center">
          <p className="text-sm text-zinc-400">No results for &ldquo;{q}&rdquo;</p>
          <p className="mt-1 text-xs text-zinc-600">Try different keywords or a shorter phrase.</p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="flex items-center gap-3">
            <p className="text-sm text-zinc-400">
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{q}&rdquo;
            </p>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(byType).map(([type, items]) => {
                const cfg = ENTITY_CONFIG[type];
                return cfg ? (
                  <AdminBadge key={type} variant={cfg.variant}>
                    {cfg.label} ({items.length})
                  </AdminBadge>
                ) : null;
              })}
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(byType).map(([type, items]) => {
              const cfg = ENTITY_CONFIG[type];
              if (!cfg) return null;
              return (
                <AdminCard
                  key={type}
                  title={cfg.label}
                  description={`${items.length} match${items.length !== 1 ? "es" : ""}`}
                >
                  <ul className="divide-y divide-zinc-800/60">
                    {items.map((r) => {
                      const title = getEntityTitle(r);
                      const subtitle = getEntitySubtitle(r);
                      return (
                        <li key={r.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                          <div>
                            <p className="text-sm font-medium text-zinc-100">{title}</p>
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
        </>
      )}

      {q.length === 0 && (
        <AdminCard title="Search scope" description="What global search covers">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Object.entries(ENTITY_CONFIG).slice(0, 6).map(([type, cfg]) => (
              <div
                key={type}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3"
              >
                <p className="text-sm font-medium text-zinc-200">{cfg.label}s</p>
                <p className="mt-0.5 text-xs capitalize text-zinc-500">{type}</p>
              </div>
            ))}
          </div>
        </AdminCard>
      )}
    </div>
  );
}
