/**
 * UmmahOS Fleet Hub — Fleet Intake Endpoint
 *
 * POST /api/v1/fleet/intake
 *
 * Dit is de "brievenbus" waar moskee-instanties hun
 * deployment-rapporten naartoe sturen na een fleet-update.
 *
 * Verwacht JSON body:
 * {
 *   "tenantId": "el-albani-gent",
 *   "version": "v1.6.3",
 *   "status": "success" | "failed",
 *   "timestamp": "2026-02-25T12:00:00Z"  (optioneel)
 * }
 */

import type { APIRoute } from 'astro'
import { validateIntakePayload } from '../../../../lib/logic/fleet'
import { updateMosqueFleetStatus } from '../../../../services/fleet'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  // 1. Authenticatie: check CRON_SECRET header
  const authHeader = request.headers.get('x-fleet-secret')
  const cronSecret = (process.env.CRON_SECRET ?? '').trim()
  const secret = (authHeader ?? '').trim()

  if (!cronSecret || secret !== cronSecret) {
    return new Response(
      JSON.stringify({ error: 'Niet geautoriseerd' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // 2. Parse body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(
      JSON.stringify({ error: 'Ongeldige JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // 3. Valideer payload (pure logic functie)
  const result = validateIntakePayload(body)
  if (!result.valid) {
    return new Response(
      JSON.stringify({ error: result.error }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // 4. Update Sanity (service laag)
  try {
    await updateMosqueFleetStatus(result.data)
    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  } catch {
    return new Response(
      JSON.stringify({ error: 'Interne fout' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
