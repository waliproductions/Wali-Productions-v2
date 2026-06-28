/**
 * Schema migration support.
 *
 * Migrations run once per collection per deployment and are idempotent.
 * The applied migration version is stored in app-data/_meta/{collection}.json.
 *
 * Future migrations: add transform functions keyed by version number.
 */

import path from "node:path";
import { readJson, writeJson, ensureDir } from "./file-store";

const META_DIR = path.join(process.cwd(), "app-data", "_meta");

type MigrationMeta = { version: number; appliedAt: string };
type Migration = { version: number; description: string; run: () => Promise<void> };

const migrations = new Map<string, Migration[]>();

export function registerMigrations(collection: string, m: Migration[]): void {
  migrations.set(collection, m.sort((a, b) => a.version - b.version));
}

export async function runMigrations(collection: string): Promise<void> {
  const pending = migrations.get(collection);
  if (!pending || pending.length === 0) return;

  await ensureDir(META_DIR);
  const metaPath = path.join(META_DIR, `${collection.replace(/\//g, "_")}.json`);
  const meta = (await readJson<MigrationMeta>(metaPath)) ?? { version: 0, appliedAt: "" };

  for (const m of pending) {
    if (m.version <= meta.version) continue;
    await m.run();
    meta.version = m.version;
    meta.appliedAt = new Date().toISOString();
    await writeJson(metaPath, meta);
  }
}
