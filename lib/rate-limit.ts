type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

const MAX_TRACKED_CLIENTS = 10_000;
const rateLimitStore = new Map<string, RateLimitEntry>();

function pruneExpiredEntries(now: number) {
  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  const forwardedIp = forwardedFor?.split(',')[0]?.trim();

  return forwardedIp || headers.get('x-real-ip') || 'unknown';
}

export function takeRateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    if (rateLimitStore.size >= MAX_TRACKED_CLIENTS) {
      pruneExpiredEntries(now);
    }

    if (rateLimitStore.size >= MAX_TRACKED_CLIENTS) {
      return { allowed: false, limit, remaining: 0, retryAfterSeconds: 60 };
    }

    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);

  return {
    allowed: existing.count <= limit,
    limit,
    remaining,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}
