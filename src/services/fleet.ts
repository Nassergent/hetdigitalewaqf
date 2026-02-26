/**
 * UmmahOS Fleet Hub — Fleet Service
 *
 * Side effects: Sanity writes, externe API calls.
 * Mag logic importeren, maar UI importeert NOOIT services.
 */

import { sanityWriteClient } from '../lib/sanity/client'
import type { IntakePayload } from '../lib/logic/fleet'

/** Update de fleet-status van een moskee na een intake-rapport */
export async function updateMosqueFleetStatus(payload: IntakePayload) {
  const { tenantId, version, status, timestamp } = payload

  // Zoek de moskee op tenantId
  const mosque = await sanityWriteClient.fetch(
    `*[_type == "customer" && tenantId == $tenantId][0]{ _id }`,
    { tenantId },
  )

  if (!mosque) {
    throw new Error(`Moskee met tenantId "${tenantId}" niet gevonden`)
  }

  // Update fleet-velden
  return sanityWriteClient
    .patch(mosque._id)
    .set({
      currentVersion: version,
      deploymentStatus: status,
      lastSyncDate: timestamp,
    })
    .commit()
}
