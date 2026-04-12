import { defineType, defineField } from 'sanity';

export const bouwerAanmelding = defineType({
  name: 'bouwerAanmelding',
  title: 'Bouwer Aanmeldingen',
  type: 'document',
  fields: [
    defineField({ name: 'naam', title: 'Naam', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
    defineField({ name: 'bedrag', title: 'Maandbedrag', type: 'string' }),
    defineField({ name: 'datum', title: 'Datum', type: 'datetime' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Wachtlijst', value: 'wachtlijst' },
          { title: 'Actief', value: 'actief' },
          { title: 'Opgezegd', value: 'opgezegd' },
        ],
        layout: 'radio',
      },
      initialValue: 'wachtlijst',
    }),
  ],
  orderings: [{ title: 'Datum', name: 'datum', by: [{ field: 'datum', direction: 'desc' }] }],
  preview: {
    select: { title: 'naam', subtitle: 'bedrag', status: 'status' },
    prepare({ title, subtitle, status }) {
      const emoji: Record<string, string> = { wachtlijst: '\u23F3', actief: '\u2705', opgezegd: '\u274C' };
      return { title: `${emoji[status] || ''} ${title}`, subtitle: subtitle ? `\u20AC${subtitle}/maand` : '' };
    },
  },
});
