import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Certifications — Gov Contracts" };

const CERTIFICATION_ROADMAP = [
  {
    name: "SAM.gov Registration",
    authority: "GSA",
    status: "In preparation",
    description: "Required for all federal contracting. Prerequisite for all other certifications.",
    required: true,
  },
  {
    name: "SDVOSB Certification",
    authority: "VA / SBA",
    status: "Pending SAM.gov",
    description: "Service-Disabled Veteran-Owned Small Business — primary set-aside category.",
    required: true,
  },
  {
    name: "VOSB Certification",
    authority: "VA",
    status: "Pending SAM.gov",
    description: "Veteran-Owned Small Business designation.",
    required: false,
  },
  {
    name: "Small Business Self-Certification",
    authority: "SBA",
    status: "Pending SAM.gov",
    description: "Size standard confirmation for NAICS codes.",
    required: true,
  },
  {
    name: "8(a) Business Development",
    authority: "SBA",
    status: "Future consideration",
    description: "9-year program for economically disadvantaged firms. Review after SAM.gov.",
    required: false,
  },
] as const;

export default function AdminCertificationsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Certifications"
        description="Government certification status and roadmap."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Back to contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Active certifications" value="0" />
        <AdminStatCard label="In preparation" value="1" hint="SAM.gov registration" />
        <AdminStatCard label="Pending SAM.gov" value="2" hint="SDVOSB, VOSB" />
        <AdminStatCard label="Future targets" value="1" hint="8(a) program" />
      </section>

      <AdminCard
        title="Certification Records"
        description="Issued certifications with reference numbers and expiry dates"
        actions={<AdminBadge variant="warning">In preparation</AdminBadge>}
      >
        <AdminEmptyState
          title="No certifications issued"
          description="Certifications will be tracked here with reference numbers, issuing authority, issue dates, and renewal reminders."
        />
      </AdminCard>

      <AdminCard title="Certification Roadmap" description="Path to full government contracting readiness">
        <div className="space-y-4">
          {CERTIFICATION_ROADMAP.map(({ name, authority, status, description, required }) => (
            <div
              key={name}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-100">{name}</h3>
                    {required ? (
                      <AdminBadge variant="info">Required</AdminBadge>
                    ) : (
                      <AdminBadge variant="neutral">Optional</AdminBadge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">
                    Issuing authority: {authority}
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">{description}</p>
                </div>
                <AdminBadge
                  variant={
                    status === "In preparation"
                      ? "warning"
                      : status === "Future consideration"
                      ? "neutral"
                      : "danger"
                  }
                >
                  {status}
                </AdminBadge>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
