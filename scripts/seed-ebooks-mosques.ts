/**
 * Seed e-books en moskeeën naar Sanity
 * Run: npx tsx scripts/seed-ebooks-mosques.ts
 */
import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
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
  console.error('❌ SANITY_WRITE_TOKEN ontbreekt in .env');
  process.exit(1);
}

const ebooks = [
  {
    _id: 'ebook-wat-is-islam',
    _type: 'ebook',
    titel: 'Wat is Islam?',
    categorie: 'Nieuw bij Islam',
    beschrijving: 'Een heldere introductie voor iedereen die meer wilt weten over de islam. Geschreven in begrijpelijk Nederlands.',
    aantalPaginas: "32 pagina's",
    omslagKleur: 'bg-clarity',
    gepubliceerd: true,
    downloadCount: 0,
    volgorde: 1,
  },
  {
    _id: 'ebook-eerste-stappen',
    _type: 'ebook',
    titel: 'De Eerste Stappen',
    categorie: 'Nieuwe Moslims',
    beschrijving: 'Een praktische gids voor wie de shahada heeft uitgesproken. Van gebed tot gemeenschap.',
    aantalPaginas: "48 pagina's",
    omslagKleur: 'bg-capital',
    gepubliceerd: true,
    downloadCount: 0,
    volgorde: 2,
  },
  {
    _id: 'ebook-waqf-eeuwige-gift',
    _type: 'ebook',
    titel: 'Waqf: Een Eeuwige Gift',
    categorie: 'Islamitische Financiën',
    beschrijving: 'Alles over de waqf-traditie — van de Profeet ﷺ tot vandaag. Hoe werkt het en waarom doet het ertoe?',
    aantalPaginas: "24 pagina's",
    omslagKleur: 'bg-gold',
    gepubliceerd: true,
    downloadCount: 0,
    volgorde: 3,
  },
  {
    _id: 'ebook-ramadan-handboek',
    _type: 'ebook',
    titel: 'Ramadan Handboek',
    categorie: 'Voor het Gezin',
    beschrijving: "Praktische tips, dua's en uitleg over de vastenmaand. Voor het hele gezin.",
    aantalPaginas: "40 pagina's",
    omslagKleur: 'bg-growth',
    gepubliceerd: true,
    downloadCount: 0,
    volgorde: 4,
  },
];

const mosques = [
  {
    _id: 'mosque-el-albani-gent',
    _type: 'mosque',
    naam: 'Moskee El Albani',
    stad: 'Gent, België',
    status: 'Live',
    beschrijving: 'De eerste moskee op het Ummah.be platform. Volledig operationeel met gebedstijden, donaties en evenementen.',
    websiteUrl: 'https://moskee-el-albani-gent.vercel.app',
    actief: true,
    volgorde: 1,
  },
  {
    _id: 'mosque-el-fath-gent',
    _type: 'mosque',
    naam: 'Moskee El Fath',
    stad: 'Gent, België',
    status: 'Live',
    beschrijving: 'Tweede moskee in de fleet. Charcoal Sage thema met volledige gebedstijden en donatie-integratie.',
    websiteUrl: 'https://moskee-el-fath-gent.vercel.app',
    theme: 'Charcoal Sage',
    actief: true,
    volgorde: 2,
  },
  {
    _id: 'mosque-okba-ibn-nafi-gent',
    _type: 'mosque',
    naam: 'Moskee OKBA IBN NAFI',
    stad: 'Warandestraat 39, 9000 Gent',
    status: 'Bouwfase',
    beschrijving: 'Nieuwste moskee in de fleet. Charcoal Sage thema met live gebedstijden en smart prayer alerts.',
    websiteUrl: 'https://moskee-okba-ibn-nafi.vercel.app',
    theme: 'Charcoal Sage',
    actief: true,
    volgorde: 3,
  },
];

async function seed() {
  console.log('📚 Seeding e-books...');
  for (const ebook of ebooks) {
    await client.createOrReplace(ebook);
    console.log(`  ✅ ${ebook.titel}`);
  }

  console.log('\n🕌 Seeding moskeeën...');
  for (const mosque of mosques) {
    await client.createOrReplace(mosque);
    console.log(`  ✅ ${mosque.naam}`);
  }

  console.log('\n🎉 Klaar! Ga naar https://ummah-be.sanity.studio/ om te bekijken.');
}

seed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
