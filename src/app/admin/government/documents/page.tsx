import fs from "node:fs/promises";
import path from "node:path";

import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { governmentCenterContent } from "@/config/government-center";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Government Documents",
};

const DOCS_ROOT = path.join(process.cwd(), "docs", "02-Government");

async function readDocument(filename: string): Promise<string | null> {
  try {
    const filePath = path.join(DOCS_ROOT, filename);
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

type PageProps = {
  searchParams?: Promise<{ doc?: string }>;
};

export default async function AdminGovernmentDocumentsPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const { documents } = governmentCenterContent;

  // Validate against known doc IDs to prevent path traversal
  const requestedId = params?.doc ?? "capability-statement";
  const selectedDoc =
    documents.find((d) => d.id === requestedId) ?? documents[0];

  const content = selectedDoc ? await readDocument(selectedDoc.filename) : null;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Government Documents"
        description="Canonical government documentation from docs/02-Government/. Read-only reference."
        actions={
          <AdminButton href="/admin/government" variant="outline" size="md">
            Back to government
          </AdminButton>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Document list */}
        <AdminCard title="Documents" padded={false}>
          <nav aria-label="Government documents">
            <ul className="divide-y divide-zinc-800">
              {documents.map((doc) => {
                const isSelected = doc.id === selectedDoc?.id;
                return (
                  <li key={doc.id}>
                    <a
                      href={`/admin/government/documents?doc=${doc.id}`}
                      className={[
                        "block px-5 py-4 text-sm transition-colors hover:bg-zinc-800/50",
                        isSelected
                          ? "border-l-2 border-amber-400 bg-zinc-800/30 font-medium text-amber-400"
                          : "text-zinc-300",
                      ].join(" ")}
                    >
                      <div className="font-medium leading-snug">{doc.title}</div>
                      <div className="mt-0.5 truncate text-xs text-zinc-500">
                        {doc.description}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </AdminCard>

        {/* Document content */}
        <div>
          {selectedDoc ? (
            <AdminCard
              title={selectedDoc.title}
              description={`docs/02-Government/${selectedDoc.filename}`}
            >
              {content !== null ? (
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-6 text-zinc-300">
                  {content}
                </pre>
              ) : (
                <AdminEmptyState
                  title="Document not available"
                  description={`${selectedDoc.filename} could not be read. Ensure docs/02-Government/ is present in the deployment.`}
                  compact
                />
              )}
            </AdminCard>
          ) : (
            <AdminEmptyState
              title="No document selected"
              description="Select a document from the list to view its contents."
            />
          )}
        </div>
      </div>
    </div>
  );
}
