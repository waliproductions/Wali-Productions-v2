import Link from "next/link";
import { notFound } from "next/navigation";
import { leadRepository } from "@/lib/repositories/lead.repository";
import { questionnaireResponseRepository } from "@/lib/repositories/questionnaire-response.repository";
import { noteRepository } from "@/lib/repositories/note.repository";
import { activityRepository } from "@/lib/repositories/activity.repository";
import { documentRepository } from "@/lib/repositories/document.repository";
import { projectRepository } from "@/lib/repositories/project.repository";
import { QUESTIONNAIRE_SECTIONS } from "@/config/questionnaire";
import { LEAD_STATUSES } from "@/types/lead";
import {
  updateLeadStatusAction,
  updateLeadDetailsAction,
  addLeadNoteAction,
  archiveLeadAction,
  restoreLeadAction,
  deleteLeadAction,
  sendQuestionnaireInviteAction,
  convertLeadToProjectAction,
} from "@/lib/leads/actions";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate, formatDateTime, formatRelativeTime, humanizeSegment } from "@/lib/admin/utils";
import { LeadFileUpload } from "@/components/admin/leads/LeadFileUpload";
import { LeadMergeForm } from "@/components/admin/leads/LeadMergeForm";
import { DeleteLeadButton } from "@/components/admin/leads/DeleteLeadButton";

export const dynamic = "force-dynamic";

type LeadDetailPageProps = {
  params: Promise<{ id: string }>;
};

const INPUT_CLASSES =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-amber-400";

export async function generateMetadata({ params }: LeadDetailPageProps) {
  const { id } = await params;
  const lead = await leadRepository.findById(id);
  return { title: lead ? `${lead.fullName} — Lead` : "Lead" };
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  const lead = await leadRepository.findById(id);
  if (!lead) notFound();

  const [questionnaire, notes, activity, files, project] = await Promise.all([
    questionnaireResponseRepository.findByLead(id),
    noteRepository.findByEntity("lead", id),
    activityRepository.getByEntity("lead", id),
    documentRepository.findByEntity("lead", id),
    lead.projectId ? projectRepository.findById(lead.projectId) : Promise.resolve(null),
  ]);

  const boundUpdateStatus = updateLeadStatusAction.bind(null, id);
  const boundUpdateDetails = updateLeadDetailsAction.bind(null, id);
  const boundAddNote = addLeadNoteAction.bind(null, id);
  const boundArchive = archiveLeadAction.bind(null, id);
  const boundRestore = restoreLeadAction.bind(null, id);
  const boundDelete = deleteLeadAction.bind(null, id);
  const boundSendQuestionnaire = sendQuestionnaireInviteAction.bind(null, id);
  const boundConvertToProject = convertLeadToProjectAction.bind(null, id);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={lead.fullName}
        description={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {lead.companyName && <span>{lead.companyName} · </span>}
            <span>{lead.email}</span>
            {lead.mergedIntoId && (
              <AdminBadge variant="warning">Merged into {lead.mergedIntoId}</AdminBadge>
            )}
            {lead.deleted && <AdminBadge variant="danger">Deleted</AdminBadge>}
          </span>
        }
        actions={
          <>
            <AdminButton href="/admin/leads" variant="ghost" size="md">
              Back to leads
            </AdminButton>
            {lead.deleted ? (
              <form action={boundRestore}>
                <AdminButton type="submit" variant="secondary" size="md">
                  Restore
                </AdminButton>
              </form>
            ) : (
              <>
                {lead.archived ? (
                  <form action={boundRestore}>
                    <AdminButton type="submit" variant="secondary" size="md">
                      Restore
                    </AdminButton>
                  </form>
                ) : (
                  <form action={boundArchive}>
                    <AdminButton type="submit" variant="outline" size="md">
                      Archive
                    </AdminButton>
                  </form>
                )}
                <DeleteLeadButton action={boundDelete} leadName={lead.fullName} />
              </>
            )}
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <AdminBadge variant="info">{humanizeSegment(lead.priority)} priority</AdminBadge>
        <AdminBadge variant="neutral">{humanizeSegment(lead.source)}</AdminBadge>
        {lead.tags.map((tag) => (
          <AdminBadge key={tag} variant="neutral">
            {tag}
          </AdminBadge>
        ))}
        <span className="text-xs text-zinc-600">Created {formatRelativeTime(lead.createdAt)} · Updated {formatRelativeTime(lead.updatedAt)}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column — main content */}
        <div className="space-y-6 lg:col-span-2">
          <AdminCard title="Status">
            <form action={boundUpdateStatus} className="flex flex-wrap items-end gap-3">
              <label className="space-y-2">
                <span className="text-xs text-zinc-500">Pipeline status</span>
                <select className={INPUT_CLASSES} defaultValue={lead.status} name="status">
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {humanizeSegment(s)}
                    </option>
                  ))}
                </select>
              </label>
              <AdminButton type="submit" variant="secondary" size="sm">
                Update status
              </AdminButton>
            </form>
          </AdminCard>

          <AdminCard title="Contact & company information">
            <form action={boundUpdateDetails} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500">Full name</p>
                  <p className="text-sm text-zinc-200">{lead.fullName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500">Email</p>
                  <p className="text-sm text-zinc-200">{lead.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Phone</span>
                  <input className={INPUT_CLASSES} defaultValue={lead.phone ?? ""} name="phone" type="tel" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Company name</span>
                  <input className={INPUT_CLASSES} defaultValue={lead.companyName ?? ""} name="companyName" type="text" />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Website</span>
                  <input className={INPUT_CLASSES} defaultValue={lead.website ?? ""} name="website" type="text" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Follow-up date</span>
                  <input className={INPUT_CLASSES} defaultValue={lead.followUpDate ?? ""} name="followUpDate" type="date" />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Preferred contact method</span>
                  <select className={INPUT_CLASSES} defaultValue={lead.preferredContactMethod ?? ""} name="preferredContactMethod">
                    <option value="">Not specified</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="text">Text</option>
                    <option value="video-call">Video call</option>
                    <option value="no-preference">No preference</option>
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Preferred contact time</span>
                  <select className={INPUT_CLASSES} defaultValue={lead.preferredContactTime ?? ""} name="preferredContactTime">
                    <option value="">Not specified</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="anytime">Anytime</option>
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Priority</span>
                  <select className={INPUT_CLASSES} defaultValue={lead.priority} name="priority">
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-zinc-500">Tags</span>
                  <input className={INPUT_CLASSES} defaultValue={lead.tags.join(", ")} name="tags" placeholder="Comma-separated" type="text" />
                </label>
              </div>
              <div className="flex justify-end">
                <AdminButton type="submit" variant="secondary" size="sm">
                  Save changes
                </AdminButton>
              </div>
            </form>
          </AdminCard>

          <AdminCard title="Inquiry">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-zinc-500">Services interested in</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {lead.servicesInterested.length === 0 ? (
                    <span className="text-sm text-zinc-600">Not specified</span>
                  ) : (
                    lead.servicesInterested.map((s) => (
                      <AdminBadge key={s} variant="neutral">
                        {s}
                      </AdminBadge>
                    ))
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Project description</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-zinc-300">
                  {lead.projectDescription || "Not provided."}
                </p>
              </div>
            </div>
          </AdminCard>

          <AdminCard
            title="Discovery questionnaire"
            actions={
              !questionnaire || questionnaire.status === "not-sent" ? (
                <form action={boundSendQuestionnaire}>
                  <AdminButton type="submit" variant="secondary" size="sm">
                    Send invite
                  </AdminButton>
                </form>
              ) : questionnaire.status !== "completed" ? (
                <form action={boundSendQuestionnaire}>
                  <AdminButton type="submit" variant="ghost" size="sm">
                    Resend invite
                  </AdminButton>
                </form>
              ) : undefined
            }
          >
            {!questionnaire ? (
              <p className="text-sm text-zinc-500">Not sent yet.</p>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  <AdminBadge variant={questionnaire.status === "completed" ? "success" : "info"}>
                    {humanizeSegment(questionnaire.status)}
                  </AdminBadge>
                  {questionnaire.sentAt && <span>Sent {formatDate(questionnaire.sentAt)}</span>}
                  {questionnaire.completedAt && <span>Completed {formatDate(questionnaire.completedAt)}</span>}
                </div>

                {Object.keys(questionnaire.answers).length > 0 && (
                  <div className="space-y-5 border-t border-zinc-800 pt-4">
                    {QUESTIONNAIRE_SECTIONS.map((section) => {
                      const entries = section.questions
                        .map((q) => ({ q, value: questionnaire.answers[`${section.id}.${q.id}`] }))
                        .filter(({ value }) => value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0));
                      if (entries.length === 0) return null;
                      return (
                        <div key={section.id}>
                          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{section.title}</p>
                          <dl className="mt-2 space-y-2">
                            {entries.map(({ q, value }) => (
                              <div key={q.id}>
                                <dt className="text-xs text-zinc-500">{q.label}</dt>
                                <dd className="text-sm text-zinc-200">
                                  {Array.isArray(value) ? value.join(", ") : String(value)}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </AdminCard>

          <AdminCard title="Activity timeline">
            {activity.length === 0 ? (
              <p className="text-sm text-zinc-500">No activity recorded yet.</p>
            ) : (
              <ol className="space-y-4">
                {activity.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <div className="min-w-0">
                      <p className="text-sm text-zinc-200">{a.summary}</p>
                      <p className="text-xs text-zinc-600">
                        {a.actor} · {formatDateTime(a.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </AdminCard>

          <AdminCard title="Internal notes">
            <div className="space-y-4">
              <form action={boundAddNote} className="space-y-2">
                <textarea
                  className={INPUT_CLASSES}
                  name="body"
                  placeholder="Add a private note — never visible to the client…"
                  required
                  rows={3}
                />
                <div className="flex justify-end">
                  <AdminButton type="submit" variant="secondary" size="sm">
                    Add note
                  </AdminButton>
                </div>
              </form>

              {notes.length > 0 && (
                <ul className="space-y-3 border-t border-zinc-800 pt-4">
                  {notes.map((note) => (
                    <li key={note.id} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
                      <p className="whitespace-pre-wrap text-sm text-zinc-200">{note.body}</p>
                      <p className="mt-1.5 text-xs text-zinc-600">
                        {note.author} · {formatDateTime(note.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </AdminCard>

          <AdminCard title="Files">
            <LeadFileUpload leadId={id} files={files} />
          </AdminCard>
        </div>

        {/* Right column — pipeline state */}
        <div className="space-y-6">
          <AdminCard title="Proposal">
            <form action={boundUpdateDetails} className="space-y-3">
              <label className="space-y-1">
                <span className="text-xs text-zinc-500">Proposal status</span>
                <select className={INPUT_CLASSES} defaultValue={lead.proposalStatus} name="proposalStatus">
                  <option value="none">None</option>
                  <option value="drafting">Drafting</option>
                  <option value="sent">Sent</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                </select>
              </label>
              {/* Preserve the other detail fields on this shared action */}
              <input defaultValue={lead.phone ?? ""} name="phone" type="hidden" />
              <input defaultValue={lead.companyName ?? ""} name="companyName" type="hidden" />
              <input defaultValue={lead.website ?? ""} name="website" type="hidden" />
              <input defaultValue={lead.followUpDate ?? ""} name="followUpDate" type="hidden" />
              <input defaultValue={lead.priority} name="priority" type="hidden" />
              <input defaultValue={lead.tags.join(", ")} name="tags" type="hidden" />
              <input defaultValue={lead.preferredContactMethod ?? ""} name="preferredContactMethod" type="hidden" />
              <input defaultValue={lead.preferredContactTime ?? ""} name="preferredContactTime" type="hidden" />
              <AdminButton type="submit" variant="secondary" size="sm" fullWidth>
                Save
              </AdminButton>
            </form>
            {lead.proposalIds.length > 0 && (
              <ul className="mt-4 space-y-1 border-t border-zinc-800 pt-3 text-sm text-zinc-400">
                {lead.proposalIds.map((pid) => (
                  <li key={pid}>{pid}</li>
                ))}
              </ul>
            )}
          </AdminCard>

          <AdminCard title="Project">
            {project ? (
              <div className="space-y-2">
                <Link href={`/admin/projects`} className="text-sm font-medium text-amber-400 hover:text-amber-300">
                  {project.title}
                </Link>
                <p className="text-xs text-zinc-500">Status: {humanizeSegment(project.status)}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-zinc-500">No project linked yet.</p>
                <form action={boundConvertToProject}>
                  <AdminButton type="submit" variant="secondary" size="sm" fullWidth>
                    Convert to project
                  </AdminButton>
                </form>
              </div>
            )}
          </AdminCard>

          <AdminCard title="Billing">
            <p className="text-sm text-zinc-600">Coming soon — invoices and payments will appear here.</p>
          </AdminCard>

          <AdminCard title="Merge duplicate">
            <LeadMergeForm currentLeadId={id} />
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
