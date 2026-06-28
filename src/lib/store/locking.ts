/**
 * In-process write serialization.
 *
 * Node.js is single-threaded, so per-collection mutexes prevent
 * interleaved writes within a single process. Each collection gets
 * its own queue — writes to different collections run concurrently.
 */

const queues = new Map<string, Promise<void>>();

export async function withLock<T>(collection: string, fn: () => Promise<T>): Promise<T> {
  const current = queues.get(collection) ?? Promise.resolve();

  let resolve!: () => void;
  const next = new Promise<void>((r) => { resolve = r; });
  queues.set(collection, next);

  await current;

  try {
    return await fn();
  } finally {
    resolve();
    if (queues.get(collection) === next) {
      queues.delete(collection);
    }
  }
}
