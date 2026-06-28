import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Contractors — Users" };

const ACCESS_LEVELS = [
  {
    level: "Limited",
    description: "Read-only access to assigned project documents only",
    count: 0,
  },
  {
    level: "Standard",
    description: "Standard operational access within contract scope",
    count: 0,
  },
  {
    level: "Elevated",
    description: "Extended access requiring additional approval and NDA",
    count: 0,
  },
] as const;

const CONTRACTOR_STATUSES = [
  { status: "Active", description: "Within contract period with current access", count: 0 },
  { status: "Inactive", description: "Registered but not currently active", count: 0 },
  { status: "Access Expired", description: "Contract ended — access auto-revoked", count: 0 },
  { status: "Terminated", description: "Early termination — access immediately revoked", count: 0 },
] as const;

export default function AdminContractorsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contractors"
        description="External contractor accounts with time-limited, scoped access tied to active contract records."
        actions={
          <AdminButton href="/admin/users" variant="ghost" size="md">
            Back to users
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Active contractors" value="0" />
        <AdminStatCard label="Expiring within 30d" value="0" hint="Access auto-revokes" />
        <AdminStatCard label="NDA on file" value="0" hint="Signed agreements" />
        <AdminStatCard label="Elevated access" value="0" hint="Requires review" />
      </section>

      <AdminCard
        title="Contractor Registry"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No contractors registered"
          description="Contractor accounts are created with an explicit access expiration date tied to a contract record. All contractor accounts require a sponsor (employee) and an NDA before elevated access is granted."
        />
      </AdminCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard title="Access Levels">
          <div className="divide-y divide-zinc-800">
            {ACCESS_LEVELS.map(({ level, description, count }) => (
              <div key={level} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{level}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
                <span className="text-sm font-semibold text-zinc-400">{count}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard title="By Status">
          <div className="divide-y divide-zinc-800">
            {CONTRACTOR_STATUSES.map(({ status, description, count }) => (
              <div key={status} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{status}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
                <span className="text-sm font-semibold text-zinc-400">{count}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <AdminCard title="Contractor Access Policy">
        <ul className="space-y-2 text-sm text-zinc-400">
          {[
            "All contractor accounts must be linked to a contract record in /admin/contract-records.",
            "Every contractor account requires an internal sponsor (employee) responsible for access oversight.",
            "Access automatically expires at the contract end date — no manual revocation needed.",
            "NDA must be signed and recorded before Standard or Elevated access is granted.",
            "Elevated access requires explicit admin approval and is reviewed quarterly.",
            "Contractor sessions are recorded in the security audit log.",
            "Contractor accounts cannot be assigned the founder or admin system roles.",
          ].map((policy, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/60" />
              {policy}
            </li>
          ))}
        </ul>
      </AdminCard>
    </div>
  );
}
