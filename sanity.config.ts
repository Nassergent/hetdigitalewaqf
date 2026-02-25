'use client'
import { defineConfig, defineType, defineField } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// ============================================
// WaqfOS Fleet Hub — Mosque Customer Schema
// v1.6.3 Enterprise Standard
// ============================================

const customer = defineType({
  name: 'customer',
  title: 'Moskeeën',
  type: 'document',
  groups: [
    { name: 'basis', title: 'Basis Info', default: true },
    { name: 'sanity', title: 'Sanity & Cloud Config' },
    { name: 'api', title: 'API & Integraties' },
    { name: 'security', title: 'Security & Performance' },
    { name: 'fleet', title: 'Fleet Intelligence' },
  ],
  fields: [
    // ── Groep 1: Basis Info ──────────────────────────
    defineField({
      name: 'name',
      title: 'Naam Moskee',
      type: 'string',
      group: 'basis',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactPerson',
      title: 'Contactpersoon',
      type: 'string',
      group: 'basis',
    }),
    defineField({
      name: 'email',
      title: 'E-mailadres',
      type: 'string',
      group: 'basis',
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          name: 'email',
          invert: false,
        }).error('Vul een geldig e-mailadres in'),
    }),
    defineField({
      name: 'phone',
      title: 'Telefoonnummer',
      type: 'string',
      group: 'basis',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'basis',
      options: {
        list: [
          { title: 'In afwachting', value: 'in-afwachting' },
          { title: 'Bouwfase', value: 'bouwfase' },
          { title: 'Live', value: 'live' },
          { title: 'Inactief', value: 'inactief' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'in-afwachting',
    }),
    defineField({
      name: 'onboardingDate',
      title: 'Datum van Aanmelding',
      type: 'date',
      group: 'basis',
    }),
    defineField({
      name: 'notes',
      title: 'Interne Notities',
      type: 'text',
      rows: 4,
      group: 'basis',
    }),

    // ── Groep 2: Sanity & Cloud Config ───────────────
    defineField({
      name: 'tenantId',
      title: 'Tenant ID',
      type: 'string',
      group: 'sanity',
      description: 'Unieke identifier voor deze moskee-instantie (bijv. "el-albani-gent")',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[a-z0-9-]+$/, {
            name: 'slug',
            invert: false,
          })
          .error('Alleen kleine letters, cijfers en streepjes'),
    }),
    defineField({
      name: 'publicSanityProjectId',
      title: 'PUBLIC_SANITY_PROJECT_ID',
      type: 'string',
      group: 'sanity',
      description: 'Het Sanity project ID van deze moskee',
    }),
    defineField({
      name: 'publicSanityDataset',
      title: 'PUBLIC_SANITY_DATASET',
      type: 'string',
      group: 'sanity',
      description: 'Dataset naam (meestal "production")',
      initialValue: 'production',
    }),
    defineField({
      name: 'sanityApiToken',
      title: 'SANITY_API_TOKEN',
      type: 'string',
      group: 'sanity',
      description: 'Read-only API token voor data ophalen',
    }),
    defineField({
      name: 'sanityWriteToken',
      title: 'SANITY_WRITE_TOKEN',
      type: 'string',
      group: 'sanity',
      description: 'Write token voor data mutaties (donaties, formulieren)',
    }),

    // ── Groep 3: API & Integraties ───────────────────
    defineField({
      name: 'mollieApiKey',
      title: 'MOLLIE_API_KEY',
      type: 'string',
      group: 'api',
      description: 'Mollie live of test API key voor donaties',
    }),
    defineField({
      name: 'mollieWebhookSecret',
      title: 'MOLLIE_WEBHOOK_SECRET',
      type: 'string',
      group: 'api',
      description: 'HMAC secret voor webhook verificatie',
    }),
    defineField({
      name: 'resendApiKey',
      title: 'RESEND_API_KEY',
      type: 'string',
      group: 'api',
      description: 'Resend API key voor transactionele e-mails',
    }),

    // ── Groep 4: Security & Performance ──────────────
    defineField({
      name: 'upstashRedisRestUrl',
      title: 'UPSTASH_REDIS_REST_URL',
      type: 'string',
      group: 'security',
      description: 'Upstash Redis REST endpoint voor rate limiting en caching',
    }),
    defineField({
      name: 'upstashRedisRestToken',
      title: 'UPSTASH_REDIS_REST_TOKEN',
      type: 'string',
      group: 'security',
      description: 'Upstash Redis auth token',
    }),
    defineField({
      name: 'cronSecret',
      title: 'CRON_SECRET',
      type: 'string',
      group: 'security',
      description: 'Secret voor beveiligde cron job endpoints (gebedstijden sync, etc.)',
    }),

    // ── Groep 5: Fleet Intelligence (v1.6.3) ────────
    defineField({
      name: 'currentVersion',
      title: 'Huidige Versie',
      type: 'string',
      group: 'fleet',
      description: 'Template versie die deze moskee draait',
      initialValue: 'v1.6.3',
    }),
    defineField({
      name: 'lastSyncDate',
      title: 'Laatste Sync',
      type: 'datetime',
      group: 'fleet',
      description: 'Wanneer deze moskee voor het laatst een fleet-update ontving',
    }),
    defineField({
      name: 'deploymentStatus',
      title: 'Deployment Status',
      type: 'string',
      group: 'fleet',
      options: {
        list: [
          { title: 'Success', value: 'success' },
          { title: 'Failed', value: 'failed' },
          { title: 'Pending', value: 'pending' },
          { title: 'Rolling Back', value: 'rollback' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'repoUrl',
      title: 'GitHub Repository',
      type: 'url',
      group: 'fleet',
      description: 'GitHub repo URL van deze moskee-instantie',
    }),
    defineField({
      name: 'vercelUrl',
      title: 'Vercel Project URL',
      type: 'url',
      group: 'fleet',
      description: 'Vercel deployment URL',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      status: 'status',
      version: 'currentVersion',
      deployment: 'deploymentStatus',
    },
    prepare({ title, status, version, deployment }) {
      const statusLabels: Record<string, string> = {
        'in-afwachting': '⏳ Wacht',
        'bouwfase': '🔨 Bouw',
        'live': '🟢 Live',
        'inactief': '⚫ Inactief',
      }
      const deployIcons: Record<string, string> = {
        success: '✅',
        failed: '❌',
        pending: '🔄',
        rollback: '⚠️',
      }
      const statusLabel = statusLabels[status] || status || 'Geen status'
      const deployIcon = deployIcons[deployment] || ''
      return {
        title: title || 'Naamloze moskee',
        subtitle: `${statusLabel} — ${version || 'geen versie'} ${deployIcon}`,
      }
    },
  },
  orderings: [
    { title: 'Naam', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
    { title: 'Status', name: 'statusAsc', by: [{ field: 'status', direction: 'asc' }] },
    { title: 'Aanmelddatum', name: 'dateDesc', by: [{ field: 'onboardingDate', direction: 'desc' }] },
    { title: 'Versie', name: 'versionAsc', by: [{ field: 'currentVersion', direction: 'asc' }] },
  ],
})

// ============================================
// Sanity Config
// ============================================

export default defineConfig({
  name: 'het-digitale-waqf',
  title: 'WaqfOS Fleet Hub',
  projectId: 'dogai0iz',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [customer],
  },
})
