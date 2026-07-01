/**
 * Best-effort in-memory rate limiter for public, unauthenticated endpoints.
 *
 * This is intentionally simple — a single-process sliding window keyed by
 * client IP. It resets on deploy/restart and does not coordinate across
 * multiple instances. That's an acceptable tradeoff for a low-volume
 * consultation/questionnaire form; if traffic ever justifies it, swap this
 * for a shared store (Redis, Upstash) without changing call sites.
 */

type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();

// Periodically drop stale buckets so this map can't grow unbounded.
const MAX_BUCKETS = 5000;

export function checkRateLimit(
  key: string,
  opts: { limit: number; windowMs: number },
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart > opts.windowMs) {
    if (buckets.size >= MAX_BUCKETS) buckets.clear();
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: opts.limit - 1 };
  }

  if (existing.count >= opts.limit) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: opts.limit - existing.count };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
