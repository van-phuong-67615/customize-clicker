import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getClientIp, takeRateLimit } from '@/lib/rate-limit';

const DEFAULT_RATE_LIMIT = { limit: 60, windowMs: 60_000 };
const RATE_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  '/api/calculate-price': { limit: 30, windowMs: 60_000 },
  '/api/orders/create': { limit: 10, windowMs: 60_000 },
  '/api/orders/status': { limit: 60, windowMs: 60_000 },
  '/api/sepay/webhook': { limit: 60, windowMs: 60_000 },
  '/api/telegram/test': { limit: 5, windowMs: 60_000 },
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const config = RATE_LIMITS[pathname] ?? DEFAULT_RATE_LIMIT;
  const clientIp = getClientIp(request.headers);
  const result = takeRateLimit(`${pathname}:${clientIp}`, config);

  if (!result.allowed) {
    return NextResponse.json(
      { error: 'RATE_LIMITED', detail: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(result.retryAfterSeconds),
          'X-RateLimit-Limit': String(result.limit),
          'X-RateLimit-Remaining': '0',
        },
      },
    );
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(result.limit));
  response.headers.set('X-RateLimit-Remaining', String(result.remaining));
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
