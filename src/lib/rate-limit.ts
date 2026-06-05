/**
 * In-memory sliding-window rate limiter.
 *
 * Each IP gets a list of timestamps. On every call we prune entries
 * older than `windowMs`, then check if the count exceeds `maxHits`.
 *
 * ⚠️  In a multi-instance / serverless environment every cold-start
 *     gets its own Map, so this is a *best-effort* defence layer —
 *     it stops bursts within a single invocation lifetime.  For
 *     stricter guarantees swap this out for an Upstash Redis limiter.
 */

interface RateLimitConfig {
  /** Maximum requests allowed within the window */
  maxHits: number;
  /** Window size in milliseconds */
  windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxHits: 3,
  windowMs: 15 * 60 * 1000, // 15 minutes
};

// Map<ip, timestamp[]>
const hits = new Map<string, number[]>();

// Periodic cleanup so the map doesn't grow unbounded
const CLEANUP_INTERVAL = 60 * 1000; // every 60 s
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  const cutoff = now - windowMs;
  for (const [ip, timestamps] of hits) {
    const fresh = timestamps.filter((t) => t > cutoff);
    if (fresh.length === 0) {
      hits.delete(ip);
    } else {
      hits.set(ip, fresh);
    }
  }
}

/**
 * Returns `{ allowed: true }` when the request is within limits,
 * or `{ allowed: false, retryAfterMs }` when it should be rejected.
 */
export function checkRateLimit(
  ip: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  cleanup(config.windowMs);

  const cutoff = now - config.windowMs;
  const timestamps = (hits.get(ip) ?? []).filter((t) => t > cutoff);

  if (timestamps.length >= config.maxHits) {
    // Earliest timestamp that still counts — they can retry after it expires
    const earliest = timestamps[0]!;
    const retryAfterMs = earliest + config.windowMs - now;
    return { allowed: false, retryAfterMs };
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  return { allowed: true };
}
