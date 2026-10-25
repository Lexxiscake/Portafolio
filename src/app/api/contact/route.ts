import { NextResponse } from 'next/server';
import { ContactController } from '@/server/controllers/contact.controller';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const limit = rateLimit(`contact:${clientKey(req)}`, 5, 10 * 60_000);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: `Demasiados envíos. Reintenta en ${limit.retryAfter}s o escribe directamente por correo.`,
      },
      {
        status: 429,
        headers: {
          'Cache-Control': 'no-store',
          'Retry-After': String(limit.retryAfter),
        },
      }
    );
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'JSON inválido' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const result = await ContactController.handleContact(
      body as Parameters<typeof ContactController.handleContact>[0]
    );
    return NextResponse.json(result.data, {
      status: result.status,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Error interno en el servidor' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
