import { NextResponse } from "next/server";
import path from "node:path";
import fs from "fs-extra";
import { requireAdminApi } from "@/lib/auth/permissions";

const UPLOAD_ROOT = path.join(process.cwd(), "app-data", "uploads");

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".csv": "text/csv",
};

type RouteParams = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ ok: false, errors: ["Unauthorized."] }, { status: 401 });

  const { path: segments } = await params;
  if (!segments || segments.length === 0) {
    return NextResponse.json({ ok: false, errors: ["Not found."] }, { status: 404 });
  }

  const resolved = path.join(UPLOAD_ROOT, ...segments);
  if (!resolved.startsWith(UPLOAD_ROOT + path.sep)) {
    return NextResponse.json({ ok: false, errors: ["Not found."] }, { status: 404 });
  }

  const exists = await fs.pathExists(resolved);
  if (!exists) return NextResponse.json({ ok: false, errors: ["Not found."] }, { status: 404 });

  const stat = await fs.stat(resolved);
  if (!stat.isFile()) return NextResponse.json({ ok: false, errors: ["Not found."] }, { status: 404 });

  const buffer = await fs.readFile(resolved);
  const ext = path.extname(resolved).toLowerCase();
  const contentType = MIME_TYPES[ext] ?? "application/octet-stream";
  const filename = path.basename(resolved).replace(/^\d+-[a-f0-9]{12}-/, "");

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${filename.replace(/"/g, "")}"`,
      "Cache-Control": "private, max-age=0, no-cache",
    },
  });
}
