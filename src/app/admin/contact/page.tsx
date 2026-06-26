import Link from "next/link";
import { getContactDashboardSubmissions } from "@/lib/admin/contact-dashboard";

export const dynamic = "force-dynamic";

type ContactAdminPageProps = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
  }>;
};

function formatStatus(status: string) {
  return status
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function AdminContactPage({
  searchParams,
}: ContactAdminPageProps) {
  const params = await searchParams;
  const query = String(params?.q ?? "").trim().toLowerCase();
  const status = String(params?.status ?? "").trim().toLowerCase();

  const submissions = await getContactDashboardSubmissions();

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesStatus =
      !status ||
      submission.lifecycleStatus === status ||
      submission.emailDeliveryStatus === status ||
      submission.folder === status;

    const searchableText = [
      submission.submissionId,
      submission.requester.name,
      submission.requester.email,
      submission.requester.company,
      submission.requester.phone,
      submission.inquiry.service,
      submission.inquiry.message,
      submission.lifecycleStatus,
      submission.emailDeliveryStatus,
      submission.folder,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchableText.includes(query);

    return matchesStatus && matchesQuery;
  });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <Link className="text-sm text-amber-400 hover:text-amber-300" href="/admin">
            ← Admin overview
          </Link>
        </div>

        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Contact Management
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Contact Inquiries
          </h1>
          <p className="max-w-3xl text-zinc-300">
            Search production inquiries, filter by status, and review delivery
            lifecycle metadata from the resilient contact pipeline.
          </p>
        </section>

        <form className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:grid-cols-[1fr_220px_auto]">
          <label className="space-y-2">
            <span className="text-sm text-zinc-400">Search</span>
            <input
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
              defaultValue={params?.q ?? ""}
              name="q"
              placeholder="Name, email, company, message, service..."
              type="search"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-zinc-400">Status</span>
            <select
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
              defaultValue={params?.status ?? ""}
              name="status"
            >
              <option value="">All statuses</option>
              <option value="processed">Processed</option>
              <option value="failed">Failed</option>
              <option value="archived">Archived</option>
              <option value="received">Received</option>
              <option value="sent">Email sent</option>
              <option value="pending">Email pending</option>
              <option value="queue">Queue folder</option>
            </select>
          </label>

          <div className="flex items-end">
            <button
              className="w-full rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
              type="submit"
            >
              Apply
            </button>
          </div>
        </form>

        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 px-5 py-4">
            <div>
              <h2 className="text-xl font-semibold">Inquiry Results</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Showing {filteredSubmissions.length} of {submissions.length}
              </p>
            </div>
            <a
              className="rounded-xl border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-400 transition hover:bg-amber-400 hover:text-zinc-950"
              href="/admin/contact/export"
            >
              Export CSV
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Submitted</th>
                  <th className="px-5 py-3 font-medium">Requester</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Message</th>
                  <th className="px-5 py-3 font-medium">Lifecycle</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Folder</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td className="px-5 py-6 text-zinc-400" colSpan={7}>
                      No matching contact inquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr
                      className="border-t border-zinc-800 align-top"
                      key={submission.submissionId}
                    >
                      <td className="px-5 py-4 text-zinc-300">
                        {submission.submittedAtLocal}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          className="font-medium text-amber-400 hover:text-amber-300"
                          href={`/admin/contact/${submission.submissionId}`}
                        >
                          {submission.requester.name}
                        </Link>
                        <p className="text-zinc-400">{submission.requester.email}</p>
                        {submission.requester.company ? (
                          <p className="text-zinc-500">
                            {submission.requester.company}
                          </p>
                        ) : null}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {submission.inquiry.service ?? "Not specified"}
                      </td>
                      <td className="max-w-md px-5 py-4 text-zinc-300">
                        <p className="line-clamp-3">{submission.inquiry.message}</p>
                      </td>
                      <td className="px-5 py-4">
                        {formatStatus(submission.lifecycleStatus)}
                      </td>
                      <td className="px-5 py-4">
                        {formatStatus(submission.emailDeliveryStatus)}
                      </td>
                      <td className="px-5 py-4 text-zinc-300">
                        {submission.folder}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
