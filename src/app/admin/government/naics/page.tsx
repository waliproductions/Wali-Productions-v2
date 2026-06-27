import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { governmentCenterContent } from "@/config/government-center";

export const metadata = {
  title: "NAICS Codes",
};

export default function AdminNaicsPage() {
  const { naics } = governmentCenterContent;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="NAICS Codes"
        description="North American Industry Classification System codes for government contracting."
        actions={
          <AdminButton href="/admin/government" variant="outline" size="md">
            Back to government
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard label="Confirmed codes" value={0} hint="Awaiting SAM.gov registration" />
        <AdminStatCard label="Pending confirmation" value="—" hint="Codes to be determined" />
        <AdminStatCard label="Policy document" value="1" hint="NAICS_CODES.md" />
      </div>

      <AdminCard title={naics.heading} description="Current NAICS code registry">
        <p className="mb-6 text-sm leading-7 text-zinc-400">{naics.note}</p>
        <AdminEmptyState
          title="No NAICS codes confirmed"
          description="NAICS codes will appear here once officially confirmed through SAM.gov registration. Codes are published only when verified per policy."
        />
      </AdminCard>

      <AdminCard title="NAICS Policy">
        <div className="space-y-3 text-sm leading-7 text-zinc-400">
          <p>
            NAICS codes classify government contract opportunities and must accurately reflect
            services provided. Per{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
              {naics.policyDoc}
            </code>
            :
          </p>
          <ul className="list-inside list-disc space-y-1.5">
            <li>Codes must reflect actual services provided or prepared to be provided.</li>
            <li>Codes should be reviewed before use in official proposals or registrations.</li>
            <li>
              Verified codes are added to{" "}
              <code className="rounded bg-zinc-800 px-1 py-0.5 text-xs text-zinc-200">
                src/config/government-center.ts
              </code>{" "}
              after SAM.gov confirmation.
            </li>
          </ul>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <AdminButton
            href="/admin/government/documents?doc=naics-codes"
            variant="secondary"
            size="sm"
          >
            View NAICS policy document
          </AdminButton>
          <AdminButton href="/admin/government/registration" variant="outline" size="sm">
            View registration tracker
          </AdminButton>
        </div>
      </AdminCard>
    </div>
  );
}
