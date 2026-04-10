import { defineType, defineField } from 'sanity';

export const mosque = defineType({
  name: 'mosque',
  title: 'Moskeeën',
  type: 'document',
  fields: [
    defineField({ name: 'naam', title: 'Moskee Naam', type: 'string', validation: r => r.required() }),
    defineField({ name: 'stad', title: 'Stad', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Live', value: 'Live' },
          { title: '🟡 Bouwfase', value: 'Bouwfase' },
          { title: '⚪ Planning', value: 'Planning' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
      initialValue: 'Planning',
    }),
    defineField({ name: 'beschrijving', title: 'Beschrijving', type: 'text', rows: 3 }),
    defineField({ name: 'websiteUrl', title: 'Website URL', type: 'url', description: 'De live URL van de moskee-website' }),
    defineField({
      name: 'theme',
      title: 'Kleurthema',
      type: 'string',
      options: {
        list: [
          { title: '🔵 Slate Indigo', value: 'Slate Indigo' },
          { title: '🟤 Warm Umber', value: 'Warm Umber' },
          { title: '🟣 Deep Bordeaux', value: 'Deep Bordeaux' },
          { title: '🌿 Charcoal Sage', value: 'Charcoal Sage' },
        ],
      },
    }),
    defineField({ name: 'afbeelding', title: 'Screenshot', type: 'image', options: { hotspot: true }, description: 'Screenshot van de website' }),
    defineField({ name: 'volgorde', title: 'Volgorde', type: 'number', initialValue: 0 }),
    defineField({ name: 'actief', title: 'Actief / Zichtbaar', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Volgorde', name: 'volgorde', by: [{ field: 'volgorde', direction: 'asc' }] }],
  preview: {
    select: { title: 'naam', subtitle: 'stad', status: 'status', media: 'afbeelding' },
    prepare({ title, subtitle, status }) {
      const statusEmoji: Record<string, string> = { Live: '🟢', Bouwfase: '🟡', Planning: '⚪' };
      return {
        title: `${statusEmoji[status] || ''} ${title}`,
        subtitle: `${subtitle} — ${status}`,
      };
    },
  },
});
