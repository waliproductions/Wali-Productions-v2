/**
 * Atomic file I/O primitives.
 *
 * All writes go through atomicWrite() which writes to a temp file then
 * renames — POSIX rename is atomic, preventing partial writes on crash.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";

// Track which dirs have been created in this process so we skip redundant mkdir syscalls.
const knownDirs = new Set<string>();

export async function ensureDir(dir: string): Promise<void> {
  if (knownDirs.has(dir)) return;
  await fs.mkdir(dir, { recursive: true });
  knownDirs.add(dir);
}

export async function atomicWrite(filePath: string, content: string): Promise<void> {
  const dir = path.dirname(filePath);
  await ensureDir(dir);

  const suffix = randomBytes(6).toString("hex");
  const tmp = `${filePath}.${suffix}.tmp`;

  try {
    await fs.writeFile(tmp, content, "utf8");
    await fs.rename(tmp, filePath);
  } catch (err) {
    // Best-effort cleanup of temp file
    await fs.unlink(tmp).catch(() => undefined);
    throw err;
  }
}

export async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await atomicWrite(filePath, JSON.stringify(data));
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function listJsonFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith(".json") && !e.name.startsWith("_"))
      .map((e) => path.join(dir, e.name));
  } catch {
    return [];
  }
}

export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    await fs.unlink(filePath);
    return true;
  } catch {
    return false;
  }
}
