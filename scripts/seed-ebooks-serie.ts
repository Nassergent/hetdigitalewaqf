/**
 * Seed "Ontdek de Islam" e-book serie naar Sanity
 * Run: npx tsx scripts/seed-ebooks-serie.ts
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env
const envPath = resolve(process.cwd(), '.env');
try {
  const envContent = readFileSync(envPath, 'utf-8').replace(/\r/g, '');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
} catch { /* no .env */ }

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'dogai0iz',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
});

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('SANITY_WRITE_TOKEN ontbreekt in .env');
  process.exit(1);
}

const ebooks = [
  {
    _id: 'ebook-ontdek-de-islam',
    _type: 'ebook',
    titel: 'Ontdek de Islam',
    categorie: 'Nieuw bij Islam',
    beschrijving: 'Boek 1 van de Ontdek de Islam serie. Een heldere introductie voor iedereen die meer wilt weten over de islam. Geschreven in begrijpelijk Nederlands.',
    aantalPaginas: "32 pagina's",
    omslagKleur: 'bg-capital',
    gepubliceerd: true,
    downloadCount: 0,
    volgorde: 1,
  },
  {
    _id: 'ebook-welkom-bij-de-islam',
    _type: 'ebook',
    titel: 'Welkom bij de Islam',
    categorie: 'Nieuwe Moslims',
    beschrijving: 'Boek 2 — Een praktische gids voor nieuwe moslims. Stap-voor-stap begeleiding over gebed, dagelijks leven, gemeenschap vinden, en de emotionele reis als nieuwe moslim.',
    aantalPaginas: "48 pagina's",
    omslagKleur: 'bg-clarity',
    gepubliceerd: true,
    downloadCount: 0,
    volgorde: 2,
  },
  {
    _id: 'ebook-leren-bidden',
    _type: 'ebook',
    titel: 'Leren bidden: je complete gebedsgids',
    categorie: 'Nieuwe Moslims',
    beschrijving: 'Boek 3 — Alles over het islamitische gebed: de bewegingen, de woorden, de tijden, en hoe je een gebedsroutine opbouwt.',
    aantalPaginas: "40 pagina's",
    omslagKleur: 'bg-growth',
    gepubliceerd: false,
    downloadCount: 0,
    volgorde: 3,
  },
  {
    _id: 'ebook-eerste-ramadan',
    _type: 'ebook',
    titel: 'Jouw eerste Ramadan',
    categorie: 'Voor het Gezin',
    beschrijving: "Boek 4 — Praktische tips, dua's en uitleg over de vastenmaand. Voor nieuwe moslims en het hele gezin.",
    aantalPaginas: "36 pagina's",
    omslagKleur: 'bg-gold',
    gepubliceerd: false,
    downloadCount: 0,
    volgorde: 4,
  },
  {
    _id: 'ebook-moslim-in-belgie',
    _type: 'ebook',
    titel: 'Moslim zijn in Vlaanderen en België',
    categorie: 'Nieuwe Moslims',
    beschrijving: 'Boek 5 — Hoe combineer je je geloof met het leven in België? Over identiteit, gemeenschap, werk en dagelijks leven.',
    aantalPaginas: "44 pagina's",
    omslagKleur: 'bg-clarity',
    gepubliceerd: false,
    downloadCount: 0,
    volgorde: 5,
  },
  {
    _id: 'ebook-liefde-huwelijk-gezin',
    _type: 'ebook',
    titel: 'Liefde, huwelijk en gezin in de Islam',
    categorie: 'Voor het Gezin',
    beschrijving: 'Boek 6 — Over relaties, het islamitische huwelijk, opvoeding en gezinsleven vanuit islamitisch perspectief.',
    aantalPaginas: "52 pagina's",
    omslagKleur: 'bg-growth',
    gepubliceerd: false,
    downloadCount: 0,
    volgorde: 6,
  },
  {
    _id: 'ebook-koran-begrijpen',
    _type: 'ebook',
    titel: 'De Koran begrijpen',
    categorie: 'Islamitische Financiën',
    beschrijving: 'Boek 7 — Een toegankelijke gids om de Koran beter te begrijpen. Thema\'s, context, en hoe je de Koran in je dagelijks leven kunt toepassen.',
    aantalPaginas: "56 pagina's",
    omslagKleur: 'bg-capital',
    gepubliceerd: false,
    downloadCount: 0,
    volgorde: 7,
  },
  {
    _id: 'ebook-geloof-verdiepen',
    _type: 'ebook',
    titel: 'Je geloof verdiepen',
    categorie: 'Nieuwe Moslims',
    beschrijving: 'Boek 8 — Voor moslims die hun kennis en spiritualiteit willen versterken. Over dhikr, dua, gemeenschap en persoonlijke groei.',
    aantalPaginas: "48 pagina's",
    omslagKleur: 'bg-gold',
    gepubliceerd: false,
    downloadCount: 0,
    volgorde: 8,
  },
  {
    _id: 'ebook-islam-uitleggen',
    _type: 'ebook',
    titel: 'Islam uitleggen',
    categorie: 'Nieuw bij Islam',
    beschrijving: 'Boek 9 — Hoe leg je de islam uit aan vrienden, familie en collega\'s? Praktische antwoorden op veelgestelde vragen.',
    aantalPaginas: "32 pagina's",
    omslagKleur: 'bg-clarity',
    gepubliceerd: false,
    downloadCount: 0,
    volgorde: 9,
  },
];

async function seed() {
  // Verwijder oude e-books
  console.log('Verwijderen oude e-books...');
  const oldIds = ['ebook-wat-is-islam', 'ebook-eerste-stappen', 'ebook-waqf-eeuwige-gift', 'ebook-ramadan-handboek'];
  for (const id of oldIds) {
    try {
      await client.delete(id);
      console.log(`  Verwijderd: ${id}`);
    } catch { /* bestaat niet */ }
  }

  console.log('\nSeeding "Ontdek de Islam" serie...');
  for (const ebook of ebooks) {
    await client.createOrReplace(ebook);
    const status = ebook.gepubliceerd ? 'BESCHIKBAAR' : 'GEPLAND';
    console.log(`  ${status}: Boek ${ebook.volgorde} — ${ebook.titel}`);
  }

  console.log('\nKlaar! 9 e-books geseeded.');
  console.log('  2 beschikbaar (Boek 1-2)');
  console.log('  7 gepland (Boek 3-9)');
}

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
