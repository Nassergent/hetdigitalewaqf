/**
 * WaqfOS Fleet Hub — Fleet Business Logic
 *
 * Pure functies. Geen side effects, geen imports van services.
 * Input in, output uit.
 */

export interface MosqueRecord {
  _id: string
  name: string
  tenantId: string
  status: string
  currentVersion: string
  deploymentStatus: string
  lastSyncDate: string | null
}

export interface FleetStats {
  total: number
  live: number
  bouwfase: number
  inactief: number
  deploySuccess: number
  deployFailed: number
}

/** Bereken welke moskeeën een verouderde versie draaien */
export function findOutdatedMosques(
  mosques: MosqueRecord[],
  latestVersion: string,
): MosqueRecord[] {
  return mosques.filter(
    (m) => m.currentVersion !== latestVersion && m.status === 'live',
  )
}

/** Bereken fleet health percentage (live + success deploys) */
export function calculateFleetHealth(stats: FleetStats): number {
  if (stats.total === 0) return 0
  return Math.round((stats.deploySuccess / stats.total) * 100)
}

/** Bepaal of een moskee een sync nodig heeft (>7 dagen geleden) */
export function needsSync(lastSyncDate: string | null): boolean {
  if (!lastSyncDate) return true
  const daysSinceSync =
    (Date.now() - new Date(lastSyncDate).getTime()) / (1000 * 60 * 60 * 24)
  return daysSinceSync > 7
}

/** Valideer een inkomend fleet-rapport van een satelliet */
export function validateIntakePayload(
  payload: unknown,
): { valid: true; data: IntakePayload } | { valid: false; error: string } {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Payload moet een object zijn' }
  }

  const p = payload as Record<string, unknown>

  if (!p.tenantId || typeof p.tenantId !== 'string') {
    return { valid: false, error: 'tenantId is verplicht (string)' }
  }

  if (!p.version || typeof p.version !== 'string') {
    return { valid: false, error: 'version is verplicht (string)' }
  }

  if (!p.status || typeof p.status !== 'string') {
    return { valid: false, error: 'status is verplicht (string)' }
  }

  return {
    valid: true,
    data: {
      tenantId: p.tenantId,
      version: p.version,
      status: p.status as 'success' | 'failed',
      timestamp: typeof p.timestamp === 'string' ? p.timestamp : new Date().toISOString(),
    },
  }
}

export interface IntakePayload {
  tenantId: string
  version: string
  status: 'success' | 'failed'
  timestamp: string
}
