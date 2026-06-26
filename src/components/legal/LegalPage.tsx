import { siteConfig } from "@/config/site";
import { Section } from "@/components/home/Section";
import type { LegalDoc } from "@/config/legal";

/**
 * Reusable layout for the structural legal pages (Privacy, Terms,
 * Accessibility). Renders a page header, a prominent review notice, an optional
 * intro, and the placeholder sections. Reuses the site's existing Section
 * primitive and design language; authors no legal content.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            {siteConfig.identity}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {doc.lastUpdated}
          </p>
        </div>
      </header>

      <Section>
        {/* Visible review notice */}
        <div
          role="note"
          className="rounded-lg border border-black/10 bg-black/[0.03] p-4 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300"
        >
          {doc.notice}
        </div>

        {doc.intro && (
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            {doc.intro}
          </p>
        )}

        <div className="mt-10 max-w-3xl space-y-10">
          {doc.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-300"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
                  {section.bullets.map((bullet, bIndex) => (
                    <li key={bIndex}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
