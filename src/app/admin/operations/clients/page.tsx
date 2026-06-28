import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Clients CRM — Operations" };

const CLIENT_STATS = [
  { label: "Total clients", value: "0" },
  { label: "Active", value: "0", hint: "Current engagements" },
  { label: "Prospects", value: "0", hint: "Pipeline leads" },
  { label: "Gov accounts", value: "0", hint: "Federal, state, local" },
] as const;

const CLIENT_TYPES = [
  { type: "Commercial", description: "Standard commercial engagements" },
  { type: "Enterprise", description: "Large-scale multi-contact accounts" },
  { type: "Government — Federal", description: "Federal agency clients" },
  { type: "Government — State", description: "State agency clients" },
  { type: "Government — Local", description: "Local government clients" },
  { type: "Nonprofit", description: "Mission-driven organizations" },
] as const;

export default function AdminClientsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Clients CRM"
        description="Client accounts, contacts, and relationship history."
        actions={
          <AdminButton href="/admin/operations" variant="ghost" size="md">
            Back to operations
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CLIENT_STATS.map((s, i) => (
          <AdminStatCard
            key={i}
            label={s.label}
            value={s.value}
            hint={"hint" in s ? s.hint : undefined}
          />
        ))}
      </section>

      <AdminCard
        title="Client Accounts"
        description="All active, prospect, and archived clients"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No clients added"
          description="Client accounts, contacts, and project associations will be managed here. Supports commercial, enterprise, government, and nonprofit accounts."
        />
      </AdminCard>

      <AdminCard title="Client Types" description="Account classification breakdown">
        <div className="divide-y divide-zinc-800">
          {CLIENT_TYPES.map(({ type, description }) => (
            <div
              key={type}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-zinc-200">{type}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              </div>
              <span className="text-sm text-zinc-600">0</span>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include" description="Planned capabilities">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Multi-contact accounts with role typing",
            "Status lifecycle: prospect → active → on-hold → inactive",
            "Government-specific fields: UEI, CAGE, NAICS, SAM",
            "Project and proposal history per client",
            "Billing contact designation",
            "Internal notes and tags",
            "Client type classification",
            "Account health and engagement tracking",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />
              {item}
            </li>
          ))}
        </ul>
      </AdminCard>
    </div>
  );
}
