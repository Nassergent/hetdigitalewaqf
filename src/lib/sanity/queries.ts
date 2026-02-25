/**
 * WaqfOS Fleet Hub — GROQ Queries
 *
 * ALLE Sanity queries staan hier. Nergens anders.
 * Dit is de enige plek waar GROQ geschreven wordt.
 */

import { sanityClient, sanityFreshClient } from './client'

// ── Query Definities ─────────────────────────────────

const MOSQUES_LIST = `*[_type == "customer"] | order(name asc) {
  _id,
  name,
  tenantId,
  status,
  currentVersion,
  deploymentStatus,
  lastSyncDate,
  onboardingDate,
  vercelUrl
}`

const MOSQUE_BY_TENANT_ID = `*[_type == "customer" && tenantId == $tenantId][0]`

const FLEET_STATS = `{
  "total": count(*[_type == "customer"]),
  "live": count(*[_type == "customer" && status == "live"]),
  "bouwfase": count(*[_type == "customer" && status == "bouwfase"]),
  "inactief": count(*[_type == "customer" && status == "inactief"]),
  "deploySuccess": count(*[_type == "customer" && deploymentStatus == "success"]),
  "deployFailed": count(*[_type == "customer" && deploymentStatus == "failed"])
}`

// ── Fetch Helpers ────────────────────────────────────

/** Alle moskeeën ophalen (gecacht) */
export async function fetchAllMosques() {
  return sanityClient.fetch(MOSQUES_LIST)
}

/** Eén moskee ophalen op tenantId (real-time) */
export async function fetchMosqueByTenantId(tenantId: string) {
  return sanityFreshClient.fetch(MOSQUE_BY_TENANT_ID, { tenantId })
}

/** Fleet-brede statistieken (gecacht) */
export async function fetchFleetStats() {
  return sanityClient.fetch(FLEET_STATS)
}
