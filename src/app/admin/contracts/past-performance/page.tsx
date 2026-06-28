import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Past Performance — Gov Contracts" };

const PERFORMANCE_CATEGORIES = [
  "Website design and development",
  "Custom software development",
  "IT consulting and advisory",
  "Digital marketing and social media",
  "Media production",
  "Business support and automation",
  "AI solutions and integration",
  "Government contracting preparation",
] as const;

export default function AdminPastPerformancePage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Past Performance"
        description="Authorized performance records for government proposals. Records must be explicitly authorized before use."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Back to contracts
          </AdminButton>
        }
      />

      <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4">
        <p className="text-sm font-semibold text-red-300">Authorization required</p>
        <p className="mt-1 text-xs text-red-300/70">
          Past performance records must have <code className="font-mono">authorized: true</code>{" "}
          before they appear in any proposal or public-facing document. Client names, project
          details, and proprietary information require explicit client authorization.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total records" value="0" />
        <AdminStatCard label="Authorized" value="0" hint="Available for proposals" />
        <AdminStatCard label="Pending auth" value="0" hint="Awaiting client approval" />
        <AdminStatCard label="Federal work" value="0" hint="Agency-direct" />
      </section>

      <AdminCard
        title="Performance Records"
        description="Verified and authorized past performance"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No authorized records"
          description="Past performance records will appear here once clients have authorized their use in government proposals."
        />
      </AdminCard>

      <AdminCard title="Performance Categories" description="Work types eligible for past performance documentation">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PERFORMANCE_CATEGORIES.map((cat) => (
            <div
              key={cat}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span className="text-sm text-zinc-300">{cat}</span>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Client-authorized performance entries",
            "Authorization status tracking",
            "Agency, contract number, and POC fields",
            "Contract type and value documentation",
            "NAICS and PSC code association",
            "Technology and outcome documentation",
            "CPARs reference integration",
            "Proposal reference tracking",
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
