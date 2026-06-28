import { opportunityRepository } from "@/lib/repositories/opportunity.repository";
import { proposalRepository } from "@/lib/repositories/proposal.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Government Contracts" };

function currency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default async function AdminContractsPage() {
  const [pipelineStats, proposalStats, oppResult] = await Promise.all([
    opportunityRepository.getPipelineStats(),
    proposalRepository.getStats(),
    opportunityRepository.findAll({
      filters: [
        { field: "track", operator: "neq", value: "commercial" },
        { field: "stage", operator: "in", value: ["lead", "qualified", "proposal", "negotiation"] },
      ],
      sort: { field: "responseDeadline", order: "asc" },
      perPage: 5,
    }),
  ]);

  const modules = [
    {
      label: "Opportunities",
      value: `${pipelineStats.activeCount} active`,
      hint: "Active pipeline",
      href: "/admin/contracts/opportunities",
    },
    {
      label: "Proposals",
      value: String(proposalStats.total),
      hint: "Gov-specific proposals",
      href: "/admin/contracts/proposals",
    },
    {
      label: "Past Performance",
      value: "0 entries",
      hint: "Authorized records",
      href: "/admin/contracts/past-performance",
    },
    {
      label: "Certifications",
      value: "In progress",
      hint: "SAM.gov, SBA, SDVOSB",
      href: "/admin/contracts/certifications",
    },
    {
      label: "Compliance",
      value: "—",
      hint: "Regulatory requirements",
      href: "/admin/contracts/compliance",
    },
    {
      label: "Teaming",
      value: "0 partners",
      hint: "Subcontractors and primes",
      href: "/admin/contracts/teaming",
    },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Government Contracts"
        description="Internal workspace for federal, state, and local government contracting operations."
        actions={
          <>
            <AdminButton href="/admin/government" variant="outline" size="md">
              Gov public admin
            </AdminButton>
            <AdminButton href="/admin" variant="ghost" size="md">
              Dashboard
            </AdminButton>
          </>
        }
      />

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
        <p className="text-sm font-semibold text-amber-300">Internal contracting workspace</p>
        <p className="mt-1 text-xs text-amber-300/70">
          This section is for internal proposal development, opportunity tracking, and compliance
          management. The public-facing government page is managed under{" "}
          <a href="/admin/government" className="underline hover:text-amber-200">
            Government
          </a>
          .
        </p>
      </div>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {modules.map((m) => (
          <AdminStatCard
            key={m.href}
            label={m.label}
            value={m.value}
            hint={m.hint}
            href={m.href}
          />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard
          title="Active Opportunities"
          actions={
            <AdminButton href="/admin/contracts/opportunities" variant="ghost" size="sm">
              View pipeline
            </AdminButton>
          }
        >
          {oppResult.items.length === 0 ? (
            <p className="text-sm text-zinc-600">No government opportunities tracked.</p>
          ) : (
            <ul className="space-y-3">
              {oppResult.items.map((o) => (
                <li key={o.id} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
                  <p className="text-sm font-medium text-zinc-100">{o.title}</p>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-zinc-500">
                    <span className="capitalize">{o.track.replace(/-/g, " ")}</span>
                    <span className="capitalize">{o.stage}</span>
                    {o.estimatedValue && (
                      <span className="text-zinc-400">{currency(o.estimatedValue)}</span>
                    )}
                    {o.responseDeadline && (
                      <span className="text-amber-300/80">Due {formatDate(o.responseDeadline)}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        <AdminCard
          title="Pipeline Summary"
          actions={
            <AdminButton href="/admin/contracts/opportunities" variant="ghost" size="sm">
              View all
            </AdminButton>
          }
        >
          <div className="space-y-3">
            {(["lead", "qualified", "proposal", "negotiation"] as const).map((stage) => (
              <div key={stage} className="flex items-center justify-between">
                <p className="text-sm capitalize text-zinc-400">{stage}</p>
                <span className="text-sm font-semibold text-zinc-200">
                  {pipelineStats.byStage[stage] ?? 0}
                </span>
              </div>
            ))}
            <div className="mt-2 border-t border-zinc-800 pt-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">Total pipeline value</p>
                <span className="text-sm font-semibold text-zinc-200">
                  {currency(pipelineStats.totalValue)}
                </span>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
