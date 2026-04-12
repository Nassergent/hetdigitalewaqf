import type { APIRoute } from 'astro';
import { writeClient } from '../../../sanity/lib/client';

const rateLimit = new Map<string, number>();

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const last = rateLimit.get(ip) || 0;
    if (now - last < 30000) {
      return new Response(JSON.stringify({ error: 'Te veel verzoeken. Probeer later opnieuw.' }), { status: 429 });
    }
    rateLimit.set(ip, now);

    const data = await request.json();

    // Honeypot check
    if (data.website) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Validation
    if (!data.naam || !data.email || !data.bericht) {
      return new Response(JSON.stringify({ error: 'Vul alle verplichte velden in.' }), { status: 400 });
    }

    // Sanitize
    const clean = (s: string) => s.replace(/[<>]/g, '').slice(0, 1000);

    await writeClient.create({
      _type: 'contactBericht',
      naam: clean(data.naam),
      email: clean(data.email),
      onderwerp: clean(data.onderwerp || 'Algemene vraag'),
      bericht: clean(data.bericht),
      datum: new Date().toISOString(),
      status: 'nieuw',
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('[api/contact] Error:', (err as Error).message);
    return new Response(JSON.stringify({ error: 'Er ging iets mis. Probeer later opnieuw.' }), { status: 500 });
  }
};
