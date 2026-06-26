import Link from "next/link";
import { getContactAuditEvents } from "@/lib/admin/contact-dashboard";

export const dynamic = "force-dynamic";

type AuditAdminPageProps = {
  searchParams?: Promise<{
    q?: string;
    event?: string;
  }>;
};

function formatStatus(status: string) {
  return status
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function AdminAuditPage({
  searchParams,
}: AuditAdminPageProps) {
  const params = await searchParams;
  const query = String(params?.q ?? "").trim().toLowerCase();
  const eventFilter = String(params?.event ?? "").trim().toLowerCase();

  const events = await getContactAuditEvents();

  const eventNames = Array.from(new Set(events.map((event) => event.event))).sort();

  const filteredEvents = events.filter((event) => {
    const matchesEvent = !eventFilter || event.event === eventFilter;

    const searchableText = [
      event.eventId,
      event.timestamp,
      event.submissionId,
      event.event,
      event.actor,
      event.source,
      JSON.stringify(event.details),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchableText.includes(query);

    return matchesEvent && matchesQuery;
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
            Audit Log
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Contact Pipeline Events
          </h1>
          <p className="max-w-3xl text-zinc-300">
            Review received submissions, SMTP delivery events, failures,
            lifecycle movement, and recovery metadata.
          </p>
        </section>

        <form className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:grid-cols-[1fr_240px_auto]">
          <label className="space-y-2">
            <span className="text-sm text-zinc-400">Search</span>
            <input
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
              defaultValue={params?.q ?? ""}
              name="q"
              placeholder="Submission ID, event ID, source, details..."
              type="search"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-zinc-400">Event type</span>
            <select
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
              defaultValue={params?.event ?? ""}
              name="event"
            >
              <option value="">All events</option>
              {eventNames.map((eventName) => (
                <option key={eventName} value={eventName}>
                  {formatStatus(eventName)}
                </option>
              ))}
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
            <h2 className="text-xl font-semibold">Audit Results</h2>
            <p className="text-sm text-zinc-400">
              Showing {filteredEvents.length} of {events.length}
            </p>
          </div>

          <div className="divide-y divide-zinc-800">
            {filteredEvents.length === 0 ? (
              <p className="px-5 py-6 text-sm text-zinc-400">
                No matching audit events found.
              </p>
            ) : (
              filteredEvents.map((event) => (
                <article className="px-5 py-5" key={event.eventId}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold">{formatStatus(event.event)}</h3>
                    <p className="text-sm text-zinc-400">{event.timestamp}</p>
                  </div>

                  <dl className="mt-3 grid gap-3 text-sm md:grid-cols-3">
                    <div>
                      <dt className="text-zinc-500">Submission ID</dt>
                      <dd className="break-all text-zinc-300">
                        {event.submissionId}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Event ID</dt>
                      <dd className="break-all text-zinc-300">{event.eventId}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Actor</dt>
                      <dd className="text-zinc-300">{event.actor}</dd>
                    </div>
                  </dl>

                  <details className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                    <summary className="cursor-pointer text-sm font-medium text-amber-400">
                      View event details
                    </summary>
                    <pre className="mt-4 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-zinc-300">
                      {JSON.stringify(event.details, null, 2)}
                    </pre>
                  </details>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
