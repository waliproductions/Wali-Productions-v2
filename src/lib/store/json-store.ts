/**
 * Collection-level JSON store.
 *
 * Each entity is stored as an individual JSON file:
 *   app-data/{collection}/{id}.json
 *
 * An in-memory cache per collection avoids redundant fs.readFile calls
 * within a request, and is invalidated on every write.
 */

import path from "node:path";
import type { EntityRecord } from "./types";
import {
  ensureDir,
  readJson,
  writeJson,
  listJsonFiles,
  deleteFile,
} from "./file-store";
import { withLock } from "./locking";

const DATA_ROOT = path.join(process.cwd(), "app-data");

function collectionDir(collection: string): string {
  return path.join(DATA_ROOT, collection);
}

function entityPath(collection: string, id: string): string {
  return path.join(collectionDir(collection), `${id}.json`);
}

// ─── Simple write-invalidated cache ──────────────────────────────────────────

const listCache = new Map<string, EntityRecord[]>();

function invalidate(collection: string): void {
  listCache.delete(collection);
}

// ─── CRUD operations ──────────────────────────────────────────────────────────

export async function storeRead<T extends EntityRecord>(
  collection: string,
  id: string,
): Promise<T | null> {
  // Serve from list cache when the collection is already loaded — avoids a disk read.
  const cached = listCache.get(collection) as T[] | undefined;
  if (cached) return cached.find((e) => e.id === id) ?? null;
  return readJson<T>(entityPath(collection, id));
}

export async function storeWrite<T extends EntityRecord>(
  collection: string,
  entity: T,
): Promise<void> {
  return withLock(collection, async () => {
    await ensureDir(collectionDir(collection));
    await writeJson(entityPath(collection, entity.id), entity);
    invalidate(collection);
  });
}

export async function storeDelete(
  collection: string,
  id: string,
): Promise<boolean> {
  return withLock(collection, async () => {
    const result = await deleteFile(entityPath(collection, id));
    if (result) invalidate(collection);
    return result;
  });
}

export async function storeList<T extends EntityRecord>(
  collection: string,
): Promise<T[]> {
  const cached = listCache.get(collection) as T[] | undefined;
  if (cached) return cached;

  const dir = collectionDir(collection);
  await ensureDir(dir);
  const files = await listJsonFiles(dir);

  const results = await Promise.all(
    files.map((f) => readJson<T>(f)),
  );

  const valid = results.filter((r): r is NonNullable<typeof r> => r !== null) as T[];
  listCache.set(collection, valid as EntityRecord[]);
  return valid;
}

export async function storeExists(collection: string, id: string): Promise<boolean> {
  const entity = await storeRead(collection, id);
  return entity !== null;
}

export async function storeCount(collection: string): Promise<number> {
  const items = await storeList(collection);
  return items.length;
}
