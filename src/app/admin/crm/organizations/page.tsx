import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Organizations — CRM" };

const STATUS_BREAKDOWN = [
  { status: "Prospect", description: "Identified, not yet contacted", count: 0 },
  { status: "Qualified", description: "Confirmed as a viable opportunity", count: 0 },
  { status: "Active Client", description: "Current engagement in flight", count: 0 },
  { status: "Former Client", description: "Past engagements, no active work", count: 0 },
  { status: "Partner", description: "Teaming or referral relationship", count: 0 },
  { status: "Inactive", description: "No current or planned engagement", count: 0 },
] as const;

const SECTOR_LABELS = [
  "Federal Government",
  "State Government",
  "Local Government",
  "Defense",
  "Technology",
  "Healthcare",
  "Financial Services",
  "Education",
  "Nonprofit",
  "Media",
  "Other",
] as const;

export default function AdminOrganizationsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Organizations"
        description="All tracked companies and agencies — prospects, active clients, partners, and former clients."
        actions={
          <AdminButton href="/admin/crm" variant="ghost" size="md">
            Back to CRM
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total organizations" value="0" />
        <AdminStatCard label="Active clients" value="0" hint="Current engagements" />
        <AdminStatCard label="Prospects" value="0" hint="In pipeline" />
        <AdminStatCard label="Gov accounts" value="0" hint="Federal, state, local" />
      </section>

      <AdminCard
        title="Organization Directory"
        description="All tracked organizations"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No organizations tracked"
          description="Add companies, agencies, and partners here. Each organization can have multiple contacts, meetings, communications, and pipeline entries."
        />
      </AdminCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard title="Status Breakdown" description="Organizations by relationship stage">
          <div className="divide-y divide-zinc-800">
            {STATUS_BREAKDOWN.map(({ status, description, count }) => (
              <div
                key={status}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-200">{status}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
                <span className="text-sm font-semibold text-zinc-400">{count}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Sectors" description="Industry and agency type distribution">
          <div className="grid grid-cols-2 gap-2">
            {SECTOR_LABELS.map((sector) => (
              <div
                key={sector}
                className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2"
              >
                <span className="text-xs text-zinc-400">{sector}</span>
                <span className="text-xs text-zinc-600">0</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <AdminCard title="What this module will include">
        <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {[
            "Organization profile with sector, size, and location",
            "Status lifecycle: prospect → qualified → active client",
            "Contact roster with role and decision authority",
            "Meeting and communication history",
            "Government identifiers: UEI, CAGE, NAICS",
            "Pipeline entry association",
            "Contract and proposal history",
            "Relationship score 0–100",
            "Microsoft 365 / Google Workspace integration (future)",
            "LinkedIn profile linking",
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
