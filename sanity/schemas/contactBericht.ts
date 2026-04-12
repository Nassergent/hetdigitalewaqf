import { defineType, defineField } from 'sanity';

export const contactBericht = defineType({
  name: 'contactBericht',
  title: 'Contact Berichten',
  type: 'document',
  fields: [
    defineField({ name: 'naam', title: 'Naam', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
    defineField({ name: 'onderwerp', title: 'Onderwerp', type: 'string' }),
    defineField({ name: 'bericht', title: 'Bericht', type: 'text', rows: 5 }),
    defineField({ name: 'datum', title: 'Datum', type: 'datetime' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Nieuw', value: 'nieuw' },
          { title: 'Beantwoord', value: 'beantwoord' },
          { title: 'Gearchiveerd', value: 'gearchiveerd' },
        ],
        layout: 'radio',
      },
      initialValue: 'nieuw',
    }),
  ],
  orderings: [{ title: 'Datum', name: 'datum', by: [{ field: 'datum', direction: 'desc' }] }],
  preview: {
    select: { title: 'naam', subtitle: 'onderwerp', status: 'status' },
    prepare({ title, subtitle, status }) {
      const emoji: Record<string, string> = { nieuw: '\u{1F7E2}', beantwoord: '\u2705', gearchiveerd: '\u{1F4C1}' };
      return { title: `${emoji[status] || ''} ${title}`, subtitle };
    },
  },
});
