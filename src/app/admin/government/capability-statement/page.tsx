import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { governmentContent } from "@/config/government";

export const metadata = {
  title: "Capability Statement",
};

export default function AdminCapabilityStatementPage() {
  const { hero, competencies, differentiators, capabilityStatement, registration } =
    governmentContent;

  const verifiedCount = registration.items.filter(
    (item) => !item.value.toLowerCase().includes("pending verified detail")
  ).length;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Capability Statement"
        description="Preview of the government capability statement. All content sourced from src/config/government.ts."
        actions={
          <>
            <AdminButton href="/government" external variant="outline" size="md">
              View public page
            </AdminButton>
            <AdminButton href="/admin/government" variant="ghost" size="md">
              Back to government
            </AdminButton>
          </>
        }
      />

      {/* Company identity */}
      <AdminCard title="Company Overview" description={hero.identity}>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Legal Name
            </dt>
            <dd className="mt-1 text-zinc-200">Wali Productions LLC</dd>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Business Type
            </dt>
            <dd className="mt-1 text-zinc-200">{hero.identity}</dd>
          </div>
          <div className="col-span-2 rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Positioning
            </dt>
            <dd className="mt-1 leading-6 text-zinc-200">{hero.subhead}</dd>
          </div>
        </dl>
      </AdminCard>

      {/* Capability statement narrative */}
      <AdminCard
        title={capabilityStatement.heading}
        description={capabilityStatement.eyebrow}
      >
        <div className="space-y-4">
          {capabilityStatement.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-zinc-300">
              {paragraph}
            </p>
          ))}
        </div>
      </AdminCard>

      {/* Core competencies */}
      <AdminCard
        title={competencies.heading}
        description={competencies.eyebrow}
        actions={
          <AdminButton href="/admin/government/capabilities" variant="ghost" size="sm">
            Full capability inventory
          </AdminButton>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {competencies.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      {/* Differentiators */}
      <AdminCard
        title={differentiators.heading}
        description={differentiators.eyebrow}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {differentiators.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      {/* Registration status summary */}
      <AdminCard
        title="Registration Status"
        description="Summary of identifier confirmation status"
        actions={
          <AdminButton href="/admin/government/registration" variant="ghost" size="sm">
            View full tracker
          </AdminButton>
        }
      >
        <div className="flex flex-wrap gap-8 text-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Total items
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-50">
              {registration.items.length}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Confirmed
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-50">{verifiedCount}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Pending
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-50">
              {registration.items.length - verifiedCount}
            </p>
          </div>
        </div>
      </AdminCard>

      {/* Source reference */}
      <AdminCard title="Source Reference">
        <p className="text-sm leading-7 text-zinc-400">
          This capability statement preview is generated from{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
            src/config/government.ts
          </code>
          . The canonical policy document is{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
            docs/02-Government/CAPABILITY_STATEMENT.md
          </code>
          . Changes to the capability statement require modification of the config file through
          the approved documentation process.
        </p>
        <div className="mt-4">
          <AdminButton
            href="/admin/government/documents?doc=capability-statement"
            variant="secondary"
            size="sm"
          >
            View source document
          </AdminButton>
        </div>
      </AdminCard>
    </div>
  );
}
