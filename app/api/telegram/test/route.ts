import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendTelegramToAdmin } from '@/lib/telegram';
import { plainText } from '@/lib/input-security';

const schema = z.object({
  message: plainText(4096).min(1),
});

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  const apiKey = request.headers.get('x-api-key');

  if (!process.env.TELEGRAM_TEST_API_KEY || apiKey !== process.env.TELEGRAM_TEST_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 },
      );
    }

    const sent = await sendTelegramToAdmin(result.data.message);

    if (!sent) {
      return NextResponse.json(
        { error: 'Unable to send Telegram message' },
        { status: 502 },
      );
    }

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error('Telegram test message error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
