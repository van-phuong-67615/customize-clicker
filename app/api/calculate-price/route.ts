import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getPricingBreakdown } from '@/lib/pricing';
import { customText } from '@/lib/input-security';

const schema = z.object({
  text: customText,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.format() }, { status: 400 });
    }
    
    const breakdown = getPricingBreakdown(result.data.text);
    return NextResponse.json(breakdown);
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
