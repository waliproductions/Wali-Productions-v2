import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Compliance — Gov Contracts" };

const COMPLIANCE_AREAS = [
  {
    area: "FAR Compliance",
    description: "Federal Acquisition Regulation clauses applicable to small business contracts.",
    status: "Tracking",
  },
  {
    area: "DFARS",
    description: "Defense Federal Acquisition Regulation Supplement — applies to DoD work.",
    status: "Not applicable yet",
  },
  {
    area: "Cybersecurity (CMMC)",
    description: "Cybersecurity Maturity Model Certification — required for DoD contracts.",
    status: "Future requirement",
  },
  {
    area: "Section 508",
    description: "Accessibility standards for federally-funded digital products.",
    status: "Design consideration",
  },
  {
    area: "SAM.gov Annual Renewal",
    description: "SAM.gov registration must be renewed annually.",
    status: "Pending registration",
  },
  {
    area: "Representation & Certifications",
    description: "Annual reps and certs in SAM.gov covering business status and ethics.",
    status: "Pending registration",
  },
] as const;

export default function AdminCompliancePage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Compliance"
        description="Regulatory requirements, FAR clauses, and ongoing compliance obligations."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Back to contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Active requirements" value="0" hint="Currently binding" />
        <AdminStatCard label="Tracking" value="1" hint="FAR baseline" />
        <AdminStatCard label="Future requirements" value="2" hint="CMMC, DFARS" />
        <AdminStatCard label="Pending SAM.gov" value="2" hint="Annual renewal, reps and certs" />
      </section>

      <AdminCard
        title="Compliance Tracker"
        description="Active obligations and deadlines"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No active compliance obligations"
          description="Compliance requirements will be tracked here once SAM.gov registration is complete and contracts are awarded."
        />
      </AdminCard>

      <AdminCard title="Compliance Areas" description="Current and future regulatory landscape">
        <div className="space-y-3">
          {COMPLIANCE_AREAS.map(({ area, description, status }) => (
            <div
              key={area}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-zinc-100">{area}</h3>
                  <p className="mt-1 text-xs text-zinc-400">{description}</p>
                </div>
                <AdminBadge variant="neutral">{status}</AdminBadge>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
