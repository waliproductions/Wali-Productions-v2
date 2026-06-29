import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { captureRepository } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "Teaming — Gov Contracts" };

const TEAMING_ROLES = [
  {
    role: "Prime Contractor",
    description: "Wali Productions leads the contract. Subcontractors support delivery.",
    considerations: [
      "Full FAR compliance required",
      "Manages subcontractor relationships",
      "Directly accountable to agency",
    ],
  },
  {
    role: "Subcontractor",
    description: "Wali Productions supports a prime contractor.",
    considerations: [
      "Reduced compliance burden",
      "Flow-down clauses apply",
      "Good path for past performance building",
    ],
  },
  {
    role: "Mentor-Protégé",
    description: "Formal SBA program pairing with a large business mentor.",
    considerations: [
      "Joint venturing capability",
      "Technical and business development support",
      "Requires SBA approval",
    ],
  },
  {
    role: "Joint Venture",
    description: "Formal joint venture entity with teaming partner.",
    considerations: [
      "Separate legal entity required",
      "Revenue attribution rules apply",
      "Can expand set-aside eligibility",
    ],
  },
] as const;

export default async function AdminTeamingPage() {
  const captureResult = await captureRepository.findAll({ perPage: 100 });

  // Collect teaming partners embedded in capture records
  const partnerMap = new Map<string, { name: string; role: string; captures: string[] }>();
  for (const capture of captureResult.items) {
    for (const tp of capture.teamingPartners ?? []) {
      const key = tp.name.toLowerCase().trim();
      if (!partnerMap.has(key)) {
        partnerMap.set(key, {
          name: tp.name,
          role: tp.role,
          captures: [],
        });
      }
      partnerMap.get(key)!.captures.push(capture.opportunityTitle ?? capture.id);
    }
  }

  const partners = Array.from(partnerMap.values());
  const primeCount = partners.filter((p) => p.role === "prime").length;
  const subCount = partners.filter((p) => p.role === "sub").length;
  const capturesWithTeaming = captureResult.items.filter(
    (c) => (c.teamingPartners ?? []).length > 0,
  ).length;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Teaming"
        description="Subcontractor relationships, teaming partners, and joint venture management."
        actions={
          <AdminButton href="/admin/contracts" variant="ghost" size="md">
            Back to contracts
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Teaming partners" value={String(partners.length)} hint="Across all captures" />
        <AdminStatCard label="Active captures with teams" value={String(capturesWithTeaming)} hint="Teaming plans in progress" />
        <AdminStatCard label="Prime roles" value={String(primeCount)} hint="We lead" />
        <AdminStatCard label="Sub roles" value={String(subCount)} hint="We support" />
      </section>

      <AdminCard
        title="Teaming Partners"
        description="Partners discovered across capture records"
      >
        {partners.length === 0 ? (
          <AdminEmptyState
            title="No teaming partners"
            description="Document teaming relationships in capture records. Track partner capabilities, UEI, CAGE codes, small business statuses, and opportunity associations."
          />
        ) : (
          <div className="divide-y divide-zinc-800">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{p.name}</p>
                  <p className="text-xs text-zinc-500">{p.captures.length} capture{p.captures.length !== 1 ? "s" : ""}</p>
                </div>
                <AdminBadge variant={p.role === "prime" ? "warning" : "info"}>
                  {p.role}
                </AdminBadge>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      <AdminCard title="Teaming Roles" description="How Wali Productions can structure contracting relationships">
        <div className="space-y-4">
          {TEAMING_ROLES.map(({ role, description, considerations }) => (
            <div key={role} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <h3 className="text-sm font-semibold text-zinc-100">{role}</h3>
              <p className="mt-1 text-sm text-zinc-400">{description}</p>
              <ul className="mt-3 space-y-1">
                {considerations.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-xs text-zinc-500">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Partner Intelligence Framework" description="What to track for each teaming partner">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { field: "UEI & CAGE", desc: "Official government identifiers in SAM.gov" },
            { field: "Small Business Status", desc: "SB, 8(a), SDVOSB, WOSB, HUBZone designations" },
            { field: "Core Capabilities", desc: "NAICS codes and technical competencies" },
            { field: "Security Clearances", desc: "Facility clearance and cleared personnel" },
            { field: "Past Performance", desc: "Relevant contract history and agency relationships" },
            { field: "Teaming Agreement Status", desc: "NDA, TA executed — prime/sub workshare defined" },
          ].map(({ field, desc }) => (
            <div key={field} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
              <p className="text-sm font-semibold text-zinc-200">{field}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-zinc-600">
          Full partner profiles with standalone tracking will be available in a future release.
          Partner data is currently embedded in capture records.
        </p>
      </AdminCard>
    </div>
  );
}
