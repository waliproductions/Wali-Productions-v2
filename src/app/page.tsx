export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        Phase 1 — Project Bootstrap
      </p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Application is running.
      </h1>
      <p className="max-w-prose text-neutral-600 dark:text-neutral-300">
        This is a placeholder home page used to verify the Next.js, TypeScript,
        and Tailwind CSS setup. Approved content will replace it in a later
        milestone.
      </p>
    </section>
  );
}
