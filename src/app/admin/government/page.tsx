import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { governmentCenterContent } from "@/config/government-center";
import { governmentContent } from "@/config/government";

export const metadata = {
  title: "Government",
};

function isPending(value: string) {
  return value.toLowerCase().includes("pending verified detail");
}

export default function AdminGovernmentPage() {
  const { readiness, competencies, differentiators, registration, pastPerformance } =
    governmentContent;

  const verifiedRegistrationCount = registration.items.filter(
    (item) => !isPending(item.value)
  ).length;

  const readinessPct =
    registration.items.length > 0
      ? Math.round((verifiedRegistrationCount / registration.items.length) * 100)
      : 0;

  const currentDomainCount = governmentCenterContent.capabilities.domains.filter(
    (d) => d.status === "current"
  ).length;

  const documentCount = governmentCenterContent.documents.length;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Government"
        description="Government Operations Center — registration status, capabilities, and contracting readiness."
        actions={
          <>
            <AdminButton href="/government" external variant="outline" size="md">
              View public page
            </AdminButton>
            <AdminButton href="/admin" variant="ghost" size="md">
              Back to dashboard
            </AdminButton>
          </>
        }
      />

      {/* Summary stat cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Registration items"
          value={registration.items.length}
          hint={`${verifiedRegistrationCount} confirmed`}
        />
        <AdminStatCard
          label="Core competencies"
          value={competencies.items.length}
          hint="Public government page"
        />
        <AdminStatCard
          label="Differentiators"
          value={differentiators.items.length}
          hint="Positioning language"
        />
        <AdminStatCard
          label="Past performance"
          value={pastPerformance.items.length}
          hint="Pending verified details"
        />
      </section>

      {/* Internal Readiness Estimate */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-5">
        <div className="flex flex-wrap items-center gap-6">
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Internal Readiness Estimate
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-amber-500 transition-all"
                style={{ width: `${readinessPct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-600">
              Not an official government metric. Based on {verifiedRegistrationCount} of{" "}
              {registration.items.length} registration items confirmed.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-3xl font-bold text-zinc-50">{readinessPct}%</p>
          </div>
        </div>
      </div>

      {/* Government Center navigation */}
      <section aria-label="Government Center sections">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
          Government Center
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AdminStatCard
            label="Capability Statement"
            value={competencies.items.length}
            hint="Core competencies"
            href="/admin/government/capability-statement"
          />
          <AdminStatCard
            label="Registration Tracker"
            value={`${verifiedRegistrationCount} / ${registration.items.length}`}
            hint="Items confirmed"
            href="/admin/government/registration"
          />
          <AdminStatCard
            label="Technical Capabilities"
            value={currentDomainCount}
            hint="Current capability domains"
            href="/admin/government/capabilities"
          />
          <AdminStatCard
            label="NAICS Codes"
            value="Pending"
            hint="SAM.gov registration required"
            href="/admin/government/naics"
          />
          <AdminStatCard
            label="PSC Codes"
            value="Pending"
            hint="Federal contracting required"
            href="/admin/government/psc"
          />
          <AdminStatCard
            label="Past Performance"
            value={pastPerformance.items.length}
            hint="Entries (pending documentation)"
            href="/admin/government/past-performance"
          />
          <AdminStatCard
            label="Documents"
            value={documentCount}
            hint="Government source documents"
            href="/admin/government/documents"
          />
        </div>
      </section>

      {/* Readiness narrative */}
      <AdminCard
        title={readiness.heading}
        description={readiness.eyebrow}
        actions={
          <AdminButton
            href="/admin/government/capability-statement"
            variant="ghost"
            size="sm"
          >
            Capability statement
          </AdminButton>
        }
      >
        <div className="space-y-4">
          {readiness.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-zinc-300">
              {paragraph}
            </p>
          ))}
        </div>
      </AdminCard>

      {/* Registration overview */}
      <AdminCard
        title={registration.heading}
        description={registration.eyebrow}
        actions={
          <AdminButton href="/admin/government/registration" variant="ghost" size="sm">
            View tracker
          </AdminButton>
        }
      >
        <p className="mb-5 text-sm leading-7 text-zinc-400">{registration.note}</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {registration.items.map((item) => {
            const pending = isPending(item.value);
            return (
              <div
                key={item.label}
                className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-zinc-100">{item.label}</h3>
                  <AdminBadge variant={pending ? "warning" : "success"}>
                    {pending ? "Pending" : "Verified"}
                  </AdminBadge>
                </div>
                <p className="mt-3 break-words text-sm leading-6 text-zinc-400">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </AdminCard>
    </div>
  );
}
