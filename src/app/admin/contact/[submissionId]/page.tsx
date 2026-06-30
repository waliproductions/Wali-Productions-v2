import Link from "next/link";
import { notFound } from "next/navigation";
import { getContactDashboardSubmissionById } from "@/lib/admin/contact-dashboard";

export const dynamic = "force-dynamic";

type ContactDetailPageProps = {
  params: Promise<{
    submissionId: string;
  }>;
};

function formatStatus(status: string) {
  return status
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
  const { submissionId } = await params;
  const submission = await getContactDashboardSubmissionById(submissionId);

  if (!submission) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap gap-4">
          <Link className="text-sm text-amber-400 hover:text-amber-300" href="/admin/contact">
            ← Contact inquiries
          </Link>
          <a
            className="text-sm text-amber-400 hover:text-amber-300"
            href={`/admin/contact/${submission.submissionId}/download`}
          >
            Download JSON
          </a>
        </div>

        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Contact Inquiry
          </p>
          <h1 className="break-all text-4xl font-bold tracking-tight">
            {submission.requester.name}
          </h1>
          <p className="break-all text-zinc-400">{submission.submissionId}</p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Lifecycle</p>
            <p className="mt-2 text-xl font-semibold">
              {formatStatus(submission.lifecycleStatus)}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Email delivery</p>
            <p className="mt-2 text-xl font-semibold">
              {formatStatus(submission.emailDeliveryStatus)}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Storage folder</p>
            <p className="mt-2 text-xl font-semibold">{submission.folder}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">Requester</h2>
          <dl className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <dt className="text-sm text-zinc-500">Name</dt>
              <dd className="text-zinc-200">{submission.requester.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Email</dt>
              <dd className="break-all text-zinc-200">{submission.requester.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Company</dt>
              <dd className="text-zinc-200">{submission.requester.company ?? "Not provided"}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Phone</dt>
              <dd className="text-zinc-200">{submission.requester.phone ?? "Not provided"}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">Inquiry</h2>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-zinc-500">Service</dt>
              <dd className="text-zinc-200">{submission.inquiry.service ?? "Not specified"}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Budget Range</dt>
              <dd className="text-zinc-200">{submission.inquiry.budget ?? "Not specified"}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Timeline</dt>
              <dd className="text-zinc-200">{submission.inquiry.timeline ?? "Not specified"}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Preferred Contact</dt>
              <dd className="text-zinc-200">{submission.inquiry.preferredContact ?? "Not specified"}</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-zinc-500">Message / Project Goals</p>
          <p className="mt-2 whitespace-pre-wrap leading-7 text-zinc-200">
            {submission.inquiry.message}
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">Processing</h2>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-zinc-950 p-4 text-xs leading-6 text-zinc-300">
            {JSON.stringify(submission.processing, null, 2)}
          </pre>
        </section>
      </div>
    </main>
  );
}
