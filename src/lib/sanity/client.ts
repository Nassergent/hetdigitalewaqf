/**
 * WaqfOS Fleet Hub — Sanity Client
 *
 * Drie clients voor verschillende use-cases:
 * - cdn: Gecachte reads (lijsten, overzichten)
 * - fresh: Ongecachte reads (real-time status checks)
 * - write: Mutaties (fleet-updates, status wijzigingen)
 */

import { createClient } from '@sanity/client'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'dogai0iz'
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

/** Gecachte reads — voor lijsten en overzichten */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

/** Ongecachte reads — voor real-time status checks */
export const sanityFreshClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: import.meta.env.SANITY_API_TOKEN,
})

/** Write client — voor fleet mutaties */
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: import.meta.env.SANITY_WRITE_TOKEN,
})
