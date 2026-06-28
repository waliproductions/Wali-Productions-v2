import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Teaming — Gov Contracts" };

const TEAMING_ROLES = [
  {
    role: "Prime Contractor",
    description: "Wali Productions leads the contract. Subcontractors support delivery.",
    considerations: ["Full FAR compliance required", "Manages subcontractor relationships", "Directly accountable to agency"],
  },
  {
    role: "Subcontractor",
    description: "Wali Productions supports a prime contractor.",
    considerations: ["Reduced compliance burden", "Flow-down clauses apply", "Good path for past performance building"],
  },
  {
    role: "Mentor-Protégé",
    description: "Formal SBA program pairing with a large business mentor.",
    considerations: ["Joint venturing capability", "Technical and business development support", "Requires SBA approval"],
  },
  {
    role: "Joint Venture",
    description: "Formal joint venture entity with teaming partner.",
    considerations: ["Separate legal entity required", "Revenue attribution rules apply", "Can expand set-aside eligibility"],
  },
] as const;

export default function AdminTeamingPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Teaming"
        description="Subcontractor relationships, teaming partners, and joint venture management."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Back to contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Teaming partners" value="0" hint="All relationships" />
        <AdminStatCard label="Active opportunities" value="0" hint="With teaming plans" />
        <AdminStatCard label="Prime roles" value="0" hint="We lead" />
        <AdminStatCard label="Sub roles" value="0" hint="We support" />
      </section>

      <AdminCard
        title="Teaming Partners"
        description="Subcontractors, primes, and potential joint venture partners"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No teaming partners"
          description="Document teaming relationships here. Track partner capabilities, UEI, CAGE codes, small business statuses, and opportunity associations."
        />
      </AdminCard>

      <AdminCard title="Teaming Roles" description="How Wali Productions can structure contracting relationships">
        <div className="space-y-4">
          {TEAMING_ROLES.map(({ role, description, considerations }) => (
            <div
              key={role}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <h3 className="text-sm font-semibold text-zinc-100">{role}</h3>
              <p className="mt-1 text-sm text-zinc-400">{description}</p>
              <ul className="mt-3 space-y-1">
                {considerations.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-xs text-zinc-500">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Partner company profiles with UEI and CAGE",
            "Small business status and set-aside designations",
            "Capability and technology alignment",
            "Security clearance level tracking",
            "Opportunity association per partner",
            "Teaming agreement status tracking",
            "Past performance sharing arrangements",
            "Prime/sub/JV role designation",
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
