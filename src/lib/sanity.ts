import { sanityClient, freshClient, urlFor } from '../../sanity/lib/client';
export { sanityClient, freshClient, urlFor };

// Safe wrapper — catches any fetch error and returns null so pages still render
async function safe<T>(query: Promise<T>, label: string): Promise<T | null> {
  try {
    return await query;
  } catch (err) {
    console.error(`[sanity] ${label} failed:`, (err as Error)?.message);
    return null;
  }
}

// ── Singletons ──

export async function fetchSettings() {
  return safe(freshClient.fetch(`*[_id == "siteSettings"][0]{
    organisatieNaam, kboNummer, btwNummer, adres, iban, bic,
    email, telefoon, whatsapp,
    logo, logoFooter, favicon, ogImage,
    statutenPdf, fiscaleInfo,
    facebook, instagram, linkedin, twitter
  }`), 'fetchSettings');
}

export async function fetchHomePage() {
  return safe(freshClient.fetch(`*[_id == "homePage"][0]`), 'fetchHomePage');
}

export async function fetchWaqfConfig() {
  return safe(freshClient.fetch(`*[_id == "waqfConfig"][0]`), 'fetchWaqfConfig');
}

export async function fetchFatwa() {
  return safe(freshClient.fetch(`*[_id == "fatwa"][0]`), 'fetchFatwa');
}

// ── Collecties ──

export async function fetchTeamMembers(rol?: string) {
  const filter = rol ? `&& rol == "${rol}"` : '';
  return safe(sanityClient.fetch(`*[_type == "teamMember" && actief == true ${filter}] | order(volgorde asc){
    naam, rol, foto, titel, specialisatie, bio, quote, email, linkedin, volgorde
  }`), 'fetchTeamMembers') || [];
}

export async function fetchDonatieProjecten(type?: string) {
  const filter = type ? `&& type == "${type}"` : '';
  return safe(sanityClient.fetch(`*[_type == "donatieProject" && actief == true ${filter}] | order(volgorde asc){
    titel, slug, beschrijving, type, doelBedrag, huidigBedrag, afbeelding, volgorde
  }`), 'fetchDonatieProjecten') || [];
}

export async function fetchHisabRapporten() {
  return safe(sanityClient.fetch(`*[_type == "hisabRapport" && gepubliceerd == true] | order(maand desc){
    maand, inkomstenWaqf, inkomstenProgram, inkomstenZakat, inkomstenOverig,
    uitgavenMentorship, uitgavenEbooks, uitgavenWebsite, uitgavenCommunity, uitgavenOperaties, uitgavenOverig,
    kapitaalEindestand, programFundEindestand, zakatFundEindestand,
    impactMentors, impactEbooks, impactMentees,
    notities, pdfDownload
  }`), 'fetchHisabRapporten') || [];
}

export async function fetchFaqItems(categorie?: string) {
  const filter = categorie ? `&& categorie == "${categorie}"` : '';
  return safe(sanityClient.fetch(`*[_type == "faqItem" && gepubliceerd == true ${filter}] | order(volgorde asc){
    vraag, antwoord, categorie, volgorde
  }`), 'fetchFaqItems') || [];
}

export async function fetchImpactStories() {
  return safe(sanityClient.fetch(`*[_type == "impactStory" && gepubliceerd == true]{
    titel, verhaal, persoon, rol, foto
  }`), 'fetchImpactStories') || [];
}

export async function fetchNieuwsPosts() {
  return safe(sanityClient.fetch(`*[_type == "nieuwsPost" && gepubliceerd == true] | order(publicatieDatum desc){
    titel, slug, samenvatting, afbeelding, publicatieDatum
  }`), 'fetchNieuwsPosts') || [];
}
