import { defineType, defineField } from 'sanity';

export const ebook = defineType({
  name: 'ebook',
  title: 'E-books',
  type: 'document',
  fields: [
    defineField({ name: 'titel', title: 'Titel', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'categorie',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          { title: '🌙 Nieuw bij Islam', value: 'Nieuw bij Islam' },
          { title: '🤲 Nieuwe Moslims', value: 'Nieuwe Moslims' },
          { title: '💰 Islamitische Financiën', value: 'Islamitische Financiën' },
          { title: '👨‍👩‍👧‍👦 Voor het Gezin', value: 'Voor het Gezin' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
    }),
    defineField({ name: 'beschrijving', title: 'Beschrijving', type: 'text', rows: 3, validation: r => r.required() }),
    defineField({ name: 'aantalPaginas', title: 'Aantal Pagina\'s', type: 'string', description: 'Bijv. "32 pagina\'s"' }),
    defineField({
      name: 'pdfBestand',
      title: 'PDF Bestand',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload het e-book als PDF. Bezoekers kunnen dit gratis downloaden.',
    }),
    defineField({
      name: 'omslagKleur',
      title: 'Omslag Kleur',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Groen (Capital)', value: 'bg-capital' },
          { title: '🔵 Blauw (Clarity)', value: 'bg-clarity' },
          { title: '🟡 Goud', value: 'bg-gold' },
          { title: '🌿 Groei (Growth)', value: 'bg-growth' },
        ],
        layout: 'radio',
      },
      initialValue: 'bg-capital',
    }),
    defineField({ name: 'volgorde', title: 'Volgorde', type: 'number', initialValue: 0 }),
    defineField({ name: 'gepubliceerd', title: 'Gepubliceerd', type: 'boolean', initialValue: true }),
    defineField({
      name: 'downloadCount',
      title: 'Download Teller',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      description: 'Wordt automatisch bijgewerkt bij downloads.',
    }),
  ],
  orderings: [{ title: 'Volgorde', name: 'volgorde', by: [{ field: 'volgorde', direction: 'asc' }] }],
  preview: {
    select: { title: 'titel', subtitle: 'categorie', gepubliceerd: 'gepubliceerd' },
    prepare({ title, subtitle, gepubliceerd }) {
      return {
        title: `${gepubliceerd ? '📗' : '📕'} ${title}`,
        subtitle: subtitle || 'Geen categorie',
      };
    },
  },
});
