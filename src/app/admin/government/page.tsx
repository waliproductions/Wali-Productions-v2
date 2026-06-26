import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { governmentContent } from "@/config/government";

export const metadata = {
  title: "Government",
};

function isPending(value: string) {
  return value.toLowerCase().includes("pending verified detail");
}

export default function AdminGovernmentPage() {
  const {
    readiness,
    competencies,
    differentiators,
    capabilityStatement,
    registration,
    pastPerformance,
  } = governmentContent;

  const verifiedRegistrationCount = registration.items.filter(
    (item) => !isPending(item.value)
  ).length;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Government"
        description="Review government-facing content, registration placeholders, core competencies, differentiators, and past performance language."
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

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Registration items"
          value={registration.items.length}
          hint={`${verifiedRegistrationCount} verified`}
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

      <AdminCard
        title={readiness.heading}
        description={readiness.eyebrow}
      >
        <div className="space-y-4">
          {readiness.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-zinc-300">
              {paragraph}
            </p>
          ))}
        </div>
      </AdminCard>

      <AdminCard
        title={registration.heading}
        description={registration.eyebrow}
      >
        <p className="mb-5 text-sm leading-7 text-zinc-400">
          {registration.note}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {registration.items.map((item) => {
            const pending = isPending(item.value);

            return (
              <div
                key={item.label}
                className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {item.label}
                  </h3>
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

      <AdminCard
        title={competencies.heading}
        description={competencies.eyebrow}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {competencies.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <h3 className="text-sm font-semibold text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AdminCard>

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
              <h3 className="text-sm font-semibold text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AdminCard>

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

      <AdminCard
        title={pastPerformance.heading}
        description={pastPerformance.eyebrow}
      >
        <p className="mb-5 text-sm leading-7 text-zinc-400">
          {pastPerformance.note}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {pastPerformance.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <h3 className="text-sm font-semibold text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
