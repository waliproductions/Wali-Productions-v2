import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { governmentContent } from "@/config/government";
import { governmentCenterContent } from "@/config/government-center";

export const metadata = {
  title: "Past Performance",
};

function isPending(value: string) {
  return value.toLowerCase().includes("pending verified detail");
}

export default function AdminPastPerformancePage() {
  const { pastPerformance } = governmentContent;
  const { pastPerformanceCategories } = governmentCenterContent;

  const documentedItems = pastPerformance.items.filter(
    (item) => !isPending(item.title)
  );
  const pendingCount = pastPerformance.items.length - documentedItems.length;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Past Performance"
        description="Past performance registry and categories. Entries are published only when documented and authorized."
        actions={
          <AdminButton href="/admin/government" variant="outline" size="md">
            Back to government
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Total entries"
          value={pastPerformance.items.length}
          hint="Performance records"
        />
        <AdminStatCard
          label="Documented"
          value={documentedItems.length}
          hint="Authorized entries"
        />
        <AdminStatCard
          label="Pending"
          value={pendingCount}
          hint="Awaiting documentation"
        />
      </div>

      {/* Performance entries */}
      <AdminCard
        title={pastPerformance.heading}
        description={pastPerformance.eyebrow}
      >
        <p className="mb-5 text-sm leading-7 text-zinc-400">{pastPerformance.note}</p>

        {documentedItems.length === 0 ? (
          <AdminEmptyState
            title="No documented entries"
            description="Past performance entries will appear here once documented and authorized per docs/02-Government/PAST_PERFORMANCE.md policy."
            compact
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {documentedItems.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
                  <AdminBadge variant="success">Documented</AdminBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {pendingCount > 0 ? (
          <p className="mt-4 text-xs text-zinc-600">
            {pendingCount}{" "}
            {pendingCount === 1 ? "entry" : "entries"} pending documentation and
            authorization.
          </p>
        ) : null}
      </AdminCard>

      {/* Performance categories */}
      <AdminCard
        title="Performance Categories"
        description="Categories of work from docs/02-Government/PAST_PERFORMANCE.md"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {pastPerformanceCategories.map((cat) => (
            <div
              key={cat.category}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <h3 className="text-sm font-semibold text-zinc-100">{cat.category}</h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-400">{cat.description}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      {/* Policy */}
      <AdminCard title="Policy">
        <div className="space-y-3 text-sm leading-7 text-zinc-400">
          <p>Past performance entries are subject to the following requirements:</p>
          <ul className="list-inside list-disc space-y-1.5">
            <li>Entries must be accurate and verifiable.</li>
            <li>
              Client names and project details require authorization before publication.
            </li>
            <li>Private information is not published without explicit approval.</li>
          </ul>
        </div>
        <div className="mt-5">
          <AdminButton
            href="/admin/government/documents?doc=past-performance"
            variant="secondary"
            size="sm"
          >
            View past performance policy
          </AdminButton>
        </div>
      </AdminCard>
    </div>
  );
}
