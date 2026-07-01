"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { StoredDocument } from "@/lib/repositories/document.repository";

function formatBytes(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function LeadFileUpload({ leadId, files }: { leadId: string; files: StoredDocument[] }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`/api/admin/leads/${leadId}/files`, {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { ok?: boolean; errors?: string[] };
      if (!response.ok || !result.ok) {
        setError(result.errors?.join(" ") ?? "Upload failed.");
        return;
      }
      router.refresh();
    } catch {
      setError("Upload failed due to a connection issue.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete(documentId: string) {
    try {
      await fetch(`/api/admin/leads/${leadId}/files?documentId=${encodeURIComponent(documentId)}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch {
      setError("Could not remove that file.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleUpload(file);
          }}
          className="block w-full text-sm text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:px-3 file:py-2 file:text-sm file:font-medium file:text-zinc-200 hover:file:bg-zinc-700"
        />
        {uploading && <span className="shrink-0 text-xs text-zinc-500">Uploading…</span>}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {files.length === 0 ? (
        <p className="text-sm text-zinc-500">No files uploaded yet.</p>
      ) : (
        <ul className="divide-y divide-zinc-800 rounded-lg border border-zinc-800">
          {files.map((f) => (
            <li key={f.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 truncate text-sm text-amber-400 hover:text-amber-300"
              >
                {f.title}
              </a>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-zinc-600">{formatBytes(f.sizeBytes)}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(f.id)}
                  className="text-xs text-zinc-500 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
