/**
 * UmmahOS Fleet Hub — Fleet Business Logic
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
  vercelUrl?: string
}

export type ConnectionStatus = 'live' | 'recent' | 'offline'

/** Bepaal connection status op basis van lastSyncDate */
export function getConnectionStatus(lastSyncDate: string | null): ConnectionStatus {
  if (!lastSyncDate) return 'offline'
  const msAgo = Date.now() - new Date(lastSyncDate).getTime()
  const minutesAgo = msAgo / (1000 * 60)
  if (minutesAgo < 10) return 'live'
  const hoursAgo = minutesAgo / 60
  if (hoursAgo < 24) return 'recent'
  return 'offline'
}

/** Format lastSyncDate naar leesbare tekst */
export function formatSyncAge(lastSyncDate: string | null): string {
  if (!lastSyncDate) return 'Nooit'
  const msAgo = Date.now() - new Date(lastSyncDate).getTime()
  const minutes = Math.floor(msAgo / (1000 * 60))
  if (minutes < 1) return 'Zojuist'
  if (minutes < 60) return `${minutes} min geleden`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} uur geleden`
  const days = Math.floor(hours / 24)
  return `${days} dag${days > 1 ? 'en' : ''} geleden`
}

export interface FleetStats {
  total: number
  live: number
  bouwfase: number
  inactief: number
  deploySuccess: number
  deployFailed: number
}

/** Haal de master-versie op uit de mosques-lijst (waqf-master is het ijkpunt) */
export function getMasterVersion(mosques: MosqueRecord[], fallback: string = 'v0.0.0'): string {
  const master = mosques.find((m) => m.tenantId === 'waqf-master')
  return master?.currentVersion || fallback
}

/** Scheid master van fleet-instanties */
export function separateMaster(mosques: MosqueRecord[]): { master: MosqueRecord | null; fleet: MosqueRecord[] } {
  const master = mosques.find((m) => m.tenantId === 'waqf-master') || null
  const fleet = mosques.filter((m) => m.tenantId !== 'waqf-master')
  return { master, fleet }
}

/** Bereken welke moskeeën een verouderde versie draaien */
export function findOutdatedMosques(
  mosques: MosqueRecord[],
  latestVersion: string,
): MosqueRecord[] {
  return mosques.filter(
    (m) => m.tenantId !== 'waqf-master' && m.currentVersion !== latestVersion && m.status === 'live',
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

  const validStatuses = ['success', 'failed']
  if (!p.status || typeof p.status !== 'string' || !validStatuses.includes(p.status)) {
    return { valid: false, error: `status moet "success" of "failed" zijn` }
  }

  return {
    valid: true,
    data: {
      tenantId: p.tenantId,
      version: p.version,
      status: p.status as 'success' | 'failed',
      reason: typeof p.reason === 'string' ? p.reason : null,
      timestamp: typeof p.timestamp === 'string' ? p.timestamp : new Date().toISOString(),
    },
  }
}

export interface IntakePayload {
  tenantId: string
  version: string
  status: 'success' | 'failed'
  reason: string | null
  timestamp: string
}
