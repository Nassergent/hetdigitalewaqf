import { defineType, defineField } from 'sanity';

export const vendingAanvraag = defineType({
  name: 'vendingAanvraag',
  title: 'Vending Aanvragen',
  type: 'document',
  fields: [
    defineField({ name: 'naam', title: 'Naam', type: 'string' }),
    defineField({ name: 'telefoon', title: 'Telefoon', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
    defineField({ name: 'adres', title: 'Adres locatie', type: 'string' }),
    defineField({
      name: 'locatieType',
      title: 'Type locatie',
      type: 'string',
      options: {
        list: [
          { title: 'Moskee', value: 'moskee' },
          { title: 'Winkel', value: 'winkel' },
          { title: 'Garage', value: 'garage' },
          { title: 'Sportclub', value: 'sportclub' },
          { title: 'Wachtruimte', value: 'wachtruimte' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Anders', value: 'anders' },
        ],
      },
    }),
    defineField({
      name: 'bezoekers',
      title: 'Geschat aantal bezoekers/dag',
      type: 'string',
      options: {
        list: [
          { title: 'Minder dan 50', value: 'minder-dan-50' },
          { title: '50 - 100', value: '50-100' },
          { title: '100 - 250', value: '100-250' },
          { title: '250+', value: '250+' },
        ],
      },
    }),
    defineField({ name: 'opmerkingen', title: 'Opmerkingen', type: 'text', rows: 3 }),
    defineField({ name: 'datum', title: 'Datum', type: 'datetime' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Nieuw', value: 'nieuw' },
          { title: 'In behandeling', value: 'in-behandeling' },
          { title: 'Goedgekeurd', value: 'goedgekeurd' },
          { title: 'Afgewezen', value: 'afgewezen' },
        ],
        layout: 'radio',
      },
      initialValue: 'nieuw',
    }),
  ],
  orderings: [{ title: 'Datum', name: 'datum', by: [{ field: 'datum', direction: 'desc' }] }],
  preview: {
    select: { title: 'naam', subtitle: 'locatieType', status: 'status' },
    prepare({ title, subtitle, status }) {
      const emoji: Record<string, string> = { nieuw: '\u{1F7E2}', 'in-behandeling': '\u{1F7E1}', goedgekeurd: '\u2705', afgewezen: '\u274C' };
      return { title: `${emoji[status] || ''} ${title}`, subtitle: subtitle || '' };
    },
  },
});
