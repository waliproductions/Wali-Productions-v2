import { contactRepository } from "@/lib/repositories/contact.repository";
import { organizationRepository } from "@/lib/repositories/organization.repository";
import type { StoredContact } from "@/lib/repositories/contact.repository";
import type { StoredOrganization } from "@/lib/repositories/organization.repository";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminTable } from "@/components/admin/AdminTable";
import type { AdminTableColumn } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contacts — CRM" };

type Props = { searchParams?: Promise<{ role?: string; q?: string }> };

const ROLE_VARIANT: Record<string, "success" | "info" | "neutral" | "warning"> = {
  executive: "warning",
  "decision-maker": "info",
  champion: "success",
  "contracting-officer": "info",
  "program-manager": "neutral",
  influencer: "neutral",
  gatekeeper: "neutral",
  technical: "neutral",
  other: "neutral",
};

function buildCols(orgMap: Map<string, StoredOrganization>): AdminTableColumn<StoredContact>[] {
  return [
    {
      key: "name",
      header: "Contact",
      render: (c) => (
        <div>
          <p className="font-medium text-zinc-100">
            {c.firstName} {c.lastName}
          </p>
          {c.title && <p className="text-xs text-zinc-500">{c.title}</p>}
        </div>
      ),
    },
    {
      key: "organization",
      header: "Organization",
      render: (c) => {
        const org = c.organizationId ? orgMap.get(c.organizationId) : undefined;
        return (
          <span className="text-sm text-zinc-400">{org?.name ?? "—"}</span>
        );
      },
      hideOnMobile: true,
    },
    {
      key: "role",
      header: "Role",
      render: (c) => c.role ? (
        <AdminBadge variant={ROLE_VARIANT[c.role] ?? "neutral"}>
          {c.role.replace(/-/g, " ")}
        </AdminBadge>
      ) : <span className="text-zinc-600">—</span>,
    },
    {
      key: "authority",
      header: "Authority",
      render: (c) => c.decisionAuthority ? (
        <AdminBadge variant="info">Decision</AdminBadge>
      ) : <span className="text-zinc-600">—</span>,
      align: "center",
      hideOnMobile: true,
    },
    {
      key: "email",
      header: "Email",
      render: (c) => (
        <span className="text-sm text-zinc-400">{c.email ?? "—"}</span>
      ),
      hideOnMobile: true,
    },
    {
      key: "lastContacted",
      header: "Last Contact",
      render: (c) => (
        <span className="text-sm text-zinc-500">{formatDate(c.lastContactedAt)}</span>
      ),
      hideOnMobile: true,
    },
  ];
}

export default async function AdminContactsPage({ searchParams }: Props) {
  const params = await searchParams;
  const roleFilter = params?.role;
  const q = params?.q;

  const [stats, orgsResult, contactsResult] = await Promise.all([
    contactRepository.getStats(),
    organizationRepository.findAll({ perPage: 200 }),
    contactRepository.findAll({
      search: q,
      filters: roleFilter
        ? [{ field: "role", operator: "eq", value: roleFilter }]
        : undefined,
      sort: { field: "updatedAt", order: "desc" },
      perPage: 100,
    }),
  ]);

  const orgMap = new Map(orgsResult.items.map((o) => [o.id, o]));
  const COLS = buildCols(orgMap);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contacts"
        description="People across all organizations — decision makers, champions, and technical contacts."
        actions={
          <AdminButton href="/admin/crm" variant="ghost" size="md">
            Back to CRM
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total contacts" value={stats.total} />
        <AdminStatCard label="Decision makers" value={stats.decisionMakers} hint="Budget authority" />
        <AdminStatCard label="Champions" value={stats.champions} hint="Internal advocates" />
        <AdminStatCard
          label="Follow-ups due"
          value={stats.followUpsDue}
          hint="Overdue outreach"
          trend={stats.followUpsDue > 0 ? { value: "Action needed", direction: "down" } : undefined}
        />
      </section>

      {/* Role filter */}
      <form className="flex flex-wrap gap-2" method="GET">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search contacts…"
          className="min-w-48 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-amber-400"
        />
        {[
          { label: "All", value: "" },
          { label: "Decision Makers", value: "decision-maker" },
          { label: "Champions", value: "champion" },
          { label: "Executives", value: "executive" },
          { label: "Contracting Officers", value: "contracting-officer" },
        ].map(({ label, value }) => (
          <button
            key={value}
            type="submit"
            name="role"
            value={value}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              (roleFilter ?? "") === value
                ? "border-amber-400 bg-amber-500/10 text-amber-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}
      </form>

      <AdminCard
        title={`${contactsResult.total} contact${contactsResult.total !== 1 ? "s" : ""}`}
        padded={false}
      >
        <AdminTable
          columns={COLS}
          rows={contactsResult.items}
          getRowKey={(c) => c.id}
        />
      </AdminCard>
    </div>
  );
}
