/**
 * Backup utilities — copies app-data to a timestamped archive directory.
 *
 * Intended to be triggered manually or on a cron schedule.
 * Does not delete old backups — retention is managed externally.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { ensureDir } from "./file-store";

const DATA_ROOT = path.join(process.cwd(), "app-data");
const BACKUP_ROOT = path.join(process.cwd(), "app-data-backups");

async function copyDir(src: string, dest: string): Promise<number> {
  await ensureDir(dest);
  let count = 0;

  try {
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        count += await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
        count++;
      }
    }
  } catch {
    // Skip unreadable directories
  }

  return count;
}

export type BackupResult = {
  backupDir: string;
  filesCopied: number;
  createdAt: string;
};

export async function createBackup(): Promise<BackupResult> {
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(BACKUP_ROOT, `backup-${ts}`);
  const filesCopied = await copyDir(DATA_ROOT, backupDir);
  const createdAt = new Date().toISOString();

  return { backupDir, filesCopied, createdAt };
}

export async function listBackups(): Promise<Array<{ name: string; path: string }>> {
  try {
    const entries = await fs.readdir(BACKUP_ROOT, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory() && e.name.startsWith("backup-"))
      .map((e) => ({ name: e.name, path: path.join(BACKUP_ROOT, e.name) }))
      .sort((a, b) => b.name.localeCompare(a.name));
  } catch {
    return [];
  }
}
