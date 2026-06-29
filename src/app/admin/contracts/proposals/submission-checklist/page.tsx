import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { proposalRepository } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "Submission Checklist — Proposals" };

type ChecklistItem = {
  id: string;
  category: string;
  item: string;
  notes?: string;
  required: boolean;
};

const SUBMISSION_CHECKLIST: ChecklistItem[] = [
  // Compliance
  { id: "c01", category: "Compliance", item: "RFP compliance matrix completed", required: true },
  { id: "c02", category: "Compliance", item: "All sections addressed (no orphan requirements)", required: true },
  { id: "c03", category: "Compliance", item: "Page limits verified per section", required: true },
  { id: "c04", category: "Compliance", item: "Font and formatting requirements met", required: true },
  { id: "c05", category: "Compliance", item: "File type and naming convention confirmed", required: true },
  // Volumes
  { id: "v01", category: "Volumes", item: "Technical volume finalized and reviewed", required: true },
  { id: "v02", category: "Volumes", item: "Management volume finalized and reviewed", required: true },
  { id: "v03", category: "Volumes", item: "Past performance volume finalized", required: true },
  { id: "v04", category: "Volumes", item: "Price/cost volume validated by leadership", required: true },
  // Approvals
  { id: "a01", category: "Approvals", item: "Red Team review completed", required: true },
  { id: "a02", category: "Approvals", item: "Gold Team final approval obtained", required: true },
  { id: "a03", category: "Approvals", item: "Founder/executive sign-off on price", required: true },
  { id: "a04", category: "Approvals", item: "Legal review of terms and representations", required: false },
  // Documents
  { id: "d01", category: "Documents", item: "SAM.gov active registration confirmed", required: true },
  { id: "d02", category: "Documents", item: "Representations and Certifications current", required: true },
  { id: "d03", category: "Documents", item: "Teaming agreements (if applicable) executed", required: false },
  { id: "d04", category: "Documents", item: "Past performance references confirmed available", required: true },
  // Submission
  { id: "s01", category: "Submission", item: "Submission portal / email address confirmed", required: true },
  { id: "s02", category: "Submission", item: "Submission deadline and time zone noted", required: true },
  { id: "s03", category: "Submission", item: "File sizes within portal limits", required: true },
  { id: "s04", category: "Submission", item: "Submission confirmation receipt saved", required: true },
  { id: "s05", category: "Submission", item: "Post-submission debriefing request prepared", required: false },
];

const CATEGORIES = [...new Set(SUBMISSION_CHECKLIST.map((c) => c.category))];

type ColorTeamReview = {
  color: string;
  purpose: string;
  timing: string;
  participants: string;
};

const COLOR_TEAMS: ColorTeamReview[] = [
  {
    color: "Pink Team",
    purpose: "Win theme and strategy review — validate approach before writing begins",
    timing: "Before writing (30–40% through proposal period)",
    participants: "BD lead, capture manager, proposal manager",
  },
  {
    color: "Red Team",
    purpose: "Full proposal evaluation as if you were the evaluator — find scoring gaps",
    timing: "Draft complete (70–80% through proposal period)",
    participants: "Independent reviewers not involved in writing",
  },
  {
    color: "Gold Team",
    purpose: "Final compliance and quality check — production-ready review",
    timing: "Final draft (90–95% complete)",
    participants: "Senior leadership + proposal manager",
  },
  {
    color: "White Glove",
    purpose: "Post-submission review to capture lessons learned and improve future proposals",
    timing: "After submission",
    participants: "Entire proposal team",
  },
];

export default async function SubmissionChecklistPage() {
  const stats = await proposalRepository.getStats();
  const required = SUBMISSION_CHECKLIST.filter((c) => c.required).length;
  const optional = SUBMISSION_CHECKLIST.filter((c) => !c.required).length;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Proposal Submission Checklist"
        description="Pre-submission compliance and quality gates for government and commercial proposals."
        actions={
          <AdminButton href="/admin/contracts/proposals" variant="ghost" size="md">
            Back to proposals
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total proposals" value={String(stats.total)} />
        <AdminStatCard label="Checklist items" value={String(SUBMISSION_CHECKLIST.length)} />
        <AdminStatCard label="Required items" value={String(required)} />
        <AdminStatCard label="Optional items" value={String(optional)} />
      </section>

      {CATEGORIES.map((category) => {
        const items = SUBMISSION_CHECKLIST.filter((c) => c.category === category);
        return (
          <AdminCard key={category} title={category}>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-zinc-700 bg-zinc-900 text-xs text-zinc-600">
                    ✓
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-200">{item.item}</p>
                    {item.notes && (
                      <p className="mt-0.5 text-xs text-zinc-500">{item.notes}</p>
                    )}
                  </div>
                  <AdminBadge variant={item.required ? "warning" : "neutral"}>
                    {item.required ? "required" : "optional"}
                  </AdminBadge>
                </div>
              ))}
            </div>
          </AdminCard>
        );
      })}

      <AdminCard title="Color Team Review Gates" description="Quality review milestones in the proposal lifecycle">
        <div className="space-y-4">
          {COLOR_TEAMS.map((team) => (
            <div
              key={team.color}
              className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-zinc-100">{team.color}</p>
                <AdminBadge variant="info">review gate</AdminBadge>
              </div>
              <p className="mt-1 text-sm text-zinc-400">{team.purpose}</p>
              <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2 text-xs text-zinc-500">
                <p><span className="text-zinc-600">Timing: </span>{team.timing}</p>
                <p><span className="text-zinc-600">Participants: </span>{team.participants}</p>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
