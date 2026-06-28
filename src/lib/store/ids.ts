import fs from "node:fs/promises";
import path from "node:path";
import { ID_PREFIXES, type EntityType } from "./types";
import { atomicWrite, ensureDir } from "./file-store";

const SEQUENCE_DIR = path.join(process.cwd(), "app-data", "sequence");
const COUNTER_FILE = path.join(SEQUENCE_DIR, "counters.json");

let counterCache: Record<string, number> | null = null;
let pendingFlush: Promise<void> | null = null;

async function loadCounters(): Promise<Record<string, number>> {
  if (counterCache) return counterCache;
  await ensureDir(SEQUENCE_DIR);
  try {
    const raw = await fs.readFile(COUNTER_FILE, "utf8");
    counterCache = JSON.parse(raw) as Record<string, number>;
  } catch {
    counterCache = {};
  }
  return counterCache;
}

async function flushCounters(): Promise<void> {
  if (!counterCache) return;
  await ensureDir(SEQUENCE_DIR);
  await atomicWrite(COUNTER_FILE, JSON.stringify(counterCache, null, 2));
}

// Serialize all ID generation through a single in-memory queue
// to prevent counter races within a single Node.js process.
let writeQueue: Promise<void> = Promise.resolve();

export async function nextId(entityType: EntityType): Promise<string> {
  const result = await new Promise<string>((resolve, reject) => {
    writeQueue = writeQueue.then(async () => {
      try {
        const counters = await loadCounters();
        const current = counters[entityType] ?? 0;
        const next = current + 1;
        counters[entityType] = next;

        // Flush synchronously in the queue to guarantee ordering
        if (pendingFlush) await pendingFlush;
        pendingFlush = flushCounters();
        await pendingFlush;
        pendingFlush = null;

        const prefix = ID_PREFIXES[entityType];
        resolve(`${prefix}-${String(next).padStart(6, "0")}`);
      } catch (err) {
        reject(err);
      }
    });
  });

  return result;
}

export function parseEntityType(id: string): EntityType | null {
  const [prefix] = id.split("-");
  for (const [type, p] of Object.entries(ID_PREFIXES)) {
    if (p === prefix) return type as EntityType;
  }
  return null;
}

export function isValidId(id: string): boolean {
  return /^[A-Z]+-\d{6}$/.test(id);
}
