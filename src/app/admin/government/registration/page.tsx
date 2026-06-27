import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { governmentContent, type RegistrationItem } from "@/config/government";
import type { AdminTableColumn } from "@/lib/admin/types";

export const metadata = {
  title: "Registration Tracker",
};

function isPending(value: string) {
  return value.toLowerCase().includes("pending verified detail");
}

const COLUMNS: AdminTableColumn<RegistrationItem>[] = [
  {
    key: "label",
    header: "Identifier",
    render: (item) => (
      <span className="font-medium text-zinc-100">{item.label}</span>
    ),
  },
  {
    key: "value",
    header: "Status / Value",
    render: (item) => {
      const pending = isPending(item.value);
      return pending ? (
        <span className="text-sm italic text-zinc-500">Pending verified detail</span>
      ) : (
        <span className="text-sm text-zinc-200">{item.value}</span>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (item) => (
      <AdminBadge variant={isPending(item.value) ? "warning" : "success"}>
        {isPending(item.value) ? "Pending" : "Confirmed"}
      </AdminBadge>
    ),
  },
];

export default function AdminRegistrationPage() {
  const { registration } = governmentContent;

  const pendingCount = registration.items.filter((item) =>
    isPending(item.value)
  ).length;
  const confirmedCount = registration.items.length - pendingCount;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Registration Tracker"
        description="Status of all government registration identifiers and certifications."
        actions={
          <AdminButton href="/admin/government" variant="outline" size="md">
            Back to government
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Total items"
          value={registration.items.length}
          hint="Registration identifiers"
        />
        <AdminStatCard
          label="Confirmed"
          value={confirmedCount}
          hint="Items with known status"
        />
        <AdminStatCard
          label="Pending"
          value={pendingCount}
          hint="Awaiting official issuance"
        />
      </div>

      <AdminCard
        title={registration.heading}
        description={registration.eyebrow}
        padded={false}
      >
        <div className="px-5 py-4">
          <p className="text-sm leading-7 text-zinc-400">{registration.note}</p>
        </div>
        <AdminTable
          columns={COLUMNS}
          rows={registration.items}
          getRowKey={(item) => item.label}
        />
      </AdminCard>

      <AdminCard title="Update Guidance">
        <div className="space-y-3 text-sm leading-7 text-zinc-400">
          <p>
            Registration identifiers are published only when officially verified. To update
            registration status:
          </p>
          <ol className="list-inside list-decimal space-y-2">
            <li>
              Obtain the official identifier through the appropriate government agency (SAM.gov,
              SBA, etc.).
            </li>
            <li>
              Update{" "}
              <code className="rounded bg-zinc-800 px-1 py-0.5 text-xs text-zinc-200">
                src/config/government.ts
              </code>{" "}
              with the verified value through the approved documentation process.
            </li>
            <li>
              Refer to{" "}
              <code className="rounded bg-zinc-800 px-1 py-0.5 text-xs text-zinc-200">
                docs/02-Government/CERTIFICATIONS.md
              </code>{" "}
              for certification policy.
            </li>
          </ol>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <AdminButton
            href="/admin/government/documents?doc=certifications"
            variant="secondary"
            size="sm"
          >
            View certifications policy
          </AdminButton>
          <AdminButton
            href="/admin/government/documents?doc=government-contracting"
            variant="outline"
            size="sm"
          >
            View contracting document
          </AdminButton>
        </div>
      </AdminCard>
    </div>
  );
}
