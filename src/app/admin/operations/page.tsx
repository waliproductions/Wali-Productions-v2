import { proposalRepository } from "@/lib/repositories/proposal.repository";
import { organizationRepository } from "@/lib/repositories/organization.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Operations" };

function currency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

const STATUS_VARIANT: Record<string, "success" | "info" | "neutral" | "warning" | "danger"> = {
  draft: "neutral",
  "in-review": "warning",
  sent: "info",
  accepted: "success",
  rejected: "danger",
  expired: "neutral",
};

export default async function AdminOperationsPage() {
  const [proposalStats, orgStats, activeProposals, expiring] = await Promise.all([
    proposalRepository.getStats(),
    organizationRepository.getStats(),
    proposalRepository.findAll({
      filters: [{ field: "status", operator: "in", value: ["draft", "in-review", "sent"] }],
      sort: { field: "updatedAt", order: "desc" },
      perPage: 5,
    }),
    proposalRepository.getExpiringProposals(14),
  ]);

  const modules = [
    {
      label: "Tasks",
      value: "0 open",
      hint: "Actionable work items",
      href: "/admin/operations/tasks",
    },
    {
      label: "Proposals Pipeline",
      value: `${proposalStats.drafts + proposalStats.inReview + proposalStats.sent} active`,
      hint: "Drafts, sent, in negotiation",
      href: "/admin/operations/proposals",
    },
    {
      label: "Clients CRM",
      value: `${orgStats.activeClients} clients`,
      hint: "Active and prospect accounts",
      href: "/admin/operations/clients",
    },
    {
      label: "Reports",
      value: "—",
      hint: "Business metrics and reporting",
      href: "/admin/operations/reports",
    },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Operations"
        description="Centralized hub for tasks, proposals, clients, and business metrics."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {modules.map((m) => (
          <AdminStatCard key={m.href} label={m.label} value={m.value} hint={m.hint} href={m.href} />
        ))}
      </section>

      {expiring.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
          <p className="text-sm font-semibold text-amber-300">
            {expiring.length} proposal{expiring.length !== 1 ? "s" : ""} expiring within 14 days
          </p>
          <ul className="mt-2 space-y-1">
            {expiring.map((p) => (
              <li key={p.id} className="text-xs text-amber-300/80">
                {p.title} — expires {formatDate(p.expiresAt)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard
          title="Active Tasks"
          actions={
            <AdminButton href="/admin/operations/tasks" variant="ghost" size="sm">
              View all
            </AdminButton>
          }
        >
          <p className="text-sm text-zinc-600">
            Task tracking coming in a future update. Open tasks across all categories will surface here.
          </p>
        </AdminCard>

        <AdminCard
          title="Proposals Pipeline"
          actions={
            <AdminButton href="/admin/operations/proposals" variant="ghost" size="sm">
              View pipeline
            </AdminButton>
          }
        >
          {activeProposals.items.length === 0 ? (
            <p className="text-sm text-zinc-600">No active proposals.</p>
          ) : (
            <ul className="space-y-3">
              {activeProposals.items.map((p) => (
                <li key={p.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-200">{p.title}</p>
                    {p.clientName && (
                      <p className="mt-0.5 text-xs text-zinc-500">{p.clientName}</p>
                    )}
                  </div>
                  <AdminBadge variant={STATUS_VARIANT[p.status] ?? "neutral"}>
                    {p.status.replace(/-/g, " ")}
                  </AdminBadge>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </div>

      <AdminCard
        title="Proposal Summary"
        description="Lifetime totals"
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total proposals", value: proposalStats.total },
            { label: "Accepted", value: proposalStats.accepted },
            { label: "Total value", value: currency(proposalStats.totalValue) },
            { label: "In pipeline", value: proposalStats.drafts + proposalStats.inReview + proposalStats.sent },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-zinc-500">{label}</p>
              <p className="mt-1 text-lg font-semibold text-zinc-100">{value}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
