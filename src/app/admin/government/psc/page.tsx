import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { governmentCenterContent } from "@/config/government-center";

export const metadata = {
  title: "PSC Codes",
};

export default function AdminPscPage() {
  const { psc } = governmentCenterContent;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="PSC Codes"
        description="Product and Service Codes used to classify federal procurement categories."
        actions={
          <AdminButton href="/admin/government" variant="outline" size="md">
            Back to government
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminStatCard label="Confirmed codes" value={0} hint="Awaiting federal contracting engagement" />
        <AdminStatCard label="Status" value="Pending" hint="No codes currently documented" />
      </div>

      <AdminCard title={psc.heading} description="Current PSC code registry">
        <p className="mb-6 text-sm leading-7 text-zinc-400">{psc.note}</p>
        <AdminEmptyState
          title="No PSC codes documented"
          description="PSC codes will be confirmed and added here when Wali Productions LLC actively pursues federal contracts. No PSC codes are currently documented in the repository."
        />
      </AdminCard>

      <AdminCard title="PSC Policy">
        <div className="space-y-3 text-sm leading-7 text-zinc-400">
          <p>
            Product and Service Codes (PSC) are used by federal agencies to classify purchases.
            They are assigned to contract actions and must accurately reflect the services delivered.
          </p>
          <ul className="list-inside list-disc space-y-1.5">
            <li>PSC codes are not required until actively pursuing federal contracts.</li>
            <li>Codes must be verified before use in official solicitations or proposals.</li>
            <li>
              Confirmed codes will be added to{" "}
              <code className="rounded bg-zinc-800 px-1 py-0.5 text-xs text-zinc-200">
                src/config/government-center.ts
              </code>{" "}
              when available.
            </li>
          </ul>
        </div>
        <div className="mt-5">
          <AdminButton href="/admin/government/documents?doc=government-contracting" variant="secondary" size="sm">
            View government contracting document
          </AdminButton>
        </div>
      </AdminCard>
    </div>
  );
}
