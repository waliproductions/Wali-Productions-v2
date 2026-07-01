import { NextResponse } from "next/server";
import path from "node:path";
import { randomBytes } from "node:crypto";
import fs from "fs-extra";
import { requireAdminApi } from "@/lib/auth/permissions";
import { leadRepository } from "@/lib/repositories/lead.repository";
import { documentRepository } from "@/lib/repositories/document.repository";
import { activityRepository } from "@/lib/repositories/activity.repository";

const UPLOAD_ROOT = path.join(process.cwd(), "app-data", "uploads", "leads");
const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB
const ALLOWED_EXTENSIONS = new Set([
  ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg",
  ".txt", ".csv", ".zip",
]);

function sanitizeFilename(name: string): string {
  const base = path.basename(name).replace(/[^\w.\- ]+/g, "_").slice(0, 150);
  return base || "file";
}

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: RouteParams) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ ok: false, errors: ["Unauthorized."] }, { status: 401 });

  const { id: leadId } = await params;
  const lead = await leadRepository.findById(leadId);
  if (!lead) return NextResponse.json({ ok: false, errors: ["Lead not found."] }, { status: 404 });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid upload payload."] }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, errors: ["No file provided."] }, { status: 400 });
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ ok: false, errors: ["File exceeds the 25 MB limit."] }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json({ ok: false, errors: [`File type "${ext || "unknown"}" is not allowed.`] }, { status: 400 });
  }

  const originalName = sanitizeFilename(file.name);
  const storedName = `${Date.now()}-${randomBytes(6).toString("hex")}-${originalName}`;
  const leadDir = path.join(UPLOAD_ROOT, leadId);
  const destination = path.join(leadDir, storedName);

  // Defense in depth against path traversal — resolved path must stay inside leadDir.
  if (!destination.startsWith(leadDir + path.sep)) {
    return NextResponse.json({ ok: false, errors: ["Invalid filename."] }, { status: 400 });
  }

  await fs.ensureDir(leadDir);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(destination, buffer);

  const doc = await documentRepository.create(
    {
      title: originalName,
      category: "other",
      status: "approved",
      entityType: "lead",
      entityId: leadId,
      filename: storedName,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      url: `/api/admin/files/leads/${leadId}/${storedName}`,
    },
    session.username,
  );

  await activityRepository.log("uploaded", session.username ?? "admin", "lead", `File uploaded: ${originalName}.`, {
    entityId: leadId,
    metadata: { documentId: doc.id },
  });

  return NextResponse.json({ ok: true, file: doc });
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ ok: false, errors: ["Unauthorized."] }, { status: 401 });

  const { id: leadId } = await params;
  const url = new URL(request.url);
  const documentId = url.searchParams.get("documentId");
  if (!documentId) return NextResponse.json({ ok: false, errors: ["documentId is required."] }, { status: 400 });

  const doc = await documentRepository.findById(documentId);
  if (!doc || doc.entityId !== leadId) {
    return NextResponse.json({ ok: false, errors: ["File not found."] }, { status: 404 });
  }

  await documentRepository.delete(documentId, session.username);
  await activityRepository.log("deleted", session.username ?? "admin", "lead", `File removed: ${doc.title}.`, {
    entityId: leadId,
  });

  return NextResponse.json({ ok: true });
}
