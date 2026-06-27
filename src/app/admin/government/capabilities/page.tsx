import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { governmentCenterContent } from "@/config/government-center";
import { governmentContent } from "@/config/government";

export const metadata = {
  title: "Technical Capabilities",
};

export default function AdminCapabilitiesPage() {
  const { capabilities } = governmentCenterContent;
  const { competencies } = governmentContent;

  const currentDomains = capabilities.domains.filter((d) => d.status === "current");
  const futureDomains = capabilities.domains.filter((d) => d.status === "future");
  const totalCurrentSkills = currentDomains.reduce(
    (sum, d) => sum + d.skills.length,
    0
  );

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Technical Capabilities"
        description={`Full capability inventory sourced from ${capabilities.source}.`}
        actions={
          <>
            <AdminButton
              href="/admin/government/capability-statement"
              variant="outline"
              size="md"
            >
              Capability statement
            </AdminButton>
            <AdminButton href="/admin/government" variant="ghost" size="md">
              Back to government
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Current domains"
          value={currentDomains.length}
          hint="Active capability areas"
        />
        <AdminStatCard
          label="Current skills"
          value={totalCurrentSkills}
          hint="Documented capabilities"
        />
        <AdminStatCard
          label="Future domains"
          value={futureDomains.length}
          hint="Under long-term development"
        />
      </div>

      {/* Relationship to public government page */}
      <AdminCard
        title="Government Page Competencies"
        description="The 6 competencies shown on the public government page — a curated subset of the full inventory below"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {competencies.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <div className="flex items-start gap-3">
                <AdminBadge variant="info">Public</AdminBadge>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          Source:{" "}
          <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-400">
            src/config/government.ts → competencies.items
          </code>
        </p>
      </AdminCard>

      {/* Full capability inventory by domain */}
      <AdminCard
        title={capabilities.heading}
        description={`${currentDomains.length} domains · ${totalCurrentSkills} skills`}
      >
        <div className="space-y-8">
          {currentDomains.map((domain) => (
            <div key={domain.domain}>
              <div className="mb-3 flex items-center gap-3">
                <h3 className="text-sm font-semibold text-zinc-100">{domain.domain}</h3>
                <AdminBadge variant="success">Current</AdminBadge>
                <span className="text-xs text-zinc-600">{domain.skills.length} skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {domain.skills.map((skill) => (
                  <span
                    key={skill.title}
                    className="rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-300"
                  >
                    {skill.title}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-zinc-500">
          Source:{" "}
          <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-400">
            {capabilities.source}
          </code>
        </p>
      </AdminCard>

      {/* Future capabilities */}
      <AdminCard
        title="Future Capabilities"
        description="Capability areas under long-term development — not currently offered"
      >
        <div className="flex flex-wrap gap-2">
          {futureDomains.map((domain) => (
            <span
              key={domain.domain}
              className="rounded-full border border-zinc-700/50 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-500"
            >
              {domain.domain}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-zinc-600">
          Documented in{" "}
          <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-500">
            {capabilities.source}
          </code>{" "}
          and will expand as the organization grows.
        </p>
      </AdminCard>
    </div>
  );
}
