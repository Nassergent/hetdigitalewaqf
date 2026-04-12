import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Ummah.be Waqf')
    .items([
      // ── Site Instellingen ──
      S.listItem()
        .title('⚙️ Site Instellingen')
        .child(
          S.list()
            .title('Instellingen')
            .items([
              S.listItem()
                .title('🏢 Organisatie & Juridisch')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('🏠 Homepage Content')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('💰 Waqf Configuratie')
                .child(S.document().schemaType('waqfConfig').documentId('waqfConfig')),
              S.listItem()
                .title('🏛️ Nalatenschap Pagina')
                .child(S.document().schemaType('nalatenschapPagina').documentId('nalatenschapPagina')),
            ])
        ),

      S.divider(),

      // ── Team & Governance ──
      S.listItem()
        .title('👥 Team & Governance')
        .child(
          S.list()
            .title('Team & Governance')
            .items([
              S.listItem()
                .title('👥 Alle Leden')
                .child(
                  S.documentList()
                    .title('Alle Leden')
                    .filter('_type == "teamMember"')
                    .defaultOrdering([{ field: 'volgorde', direction: 'asc' }])
                ),
              S.listItem()
                .title('🛡️ Trustee')
                .child(
                  S.documentList()
                    .title('Trustee')
                    .filter('_type == "teamMember" && rol == "trustee"')
                ),
              S.listItem()
                .title('📖 Shariah Board')
                .child(
                  S.documentList()
                    .title('Shariah Board')
                    .filter('_type == "teamMember" && rol == "scholar"')
                ),
              S.divider(),
              S.listItem()
                .title('📜 Fatwa')
                .child(S.document().schemaType('fatwa').documentId('fatwa')),
            ])
        ),

      S.divider(),

      // ── Donaties ──
      S.listItem()
        .title('💰 Donaties')
        .child(
          S.list()
            .title('Donaties')
            .items([
              S.listItem()
                .title('🎁 Projecten')
                .child(
                  S.documentList()
                    .title('Donatie Projecten')
                    .filter('_type == "donatieProject"')
                    .defaultOrdering([{ field: 'volgorde', direction: 'asc' }])
                ),
              S.listItem()
                .title('📊 Hisab Rapporten')
                .child(
                  S.documentList()
                    .title('Hisab Rapporten')
                    .filter('_type == "hisabRapport"')
                    .defaultOrdering([{ field: 'maand', direction: 'desc' }])
                ),
            ])
        ),

      S.divider(),

      // ── Kennis & Diensten ──
      S.listItem()
        .title('📚 Kennis & Diensten')
        .child(
          S.list()
            .title('Kennis & Diensten')
            .items([
              S.listItem()
                .title('📖 E-books')
                .child(
                  S.documentList()
                    .title('E-books')
                    .filter('_type == "ebook"')
                    .defaultOrdering([{ field: 'volgorde', direction: 'asc' }])
                ),
              S.listItem()
                .title('🕌 Moskeeën')
                .child(
                  S.documentList()
                    .title('Moskeeën')
                    .filter('_type == "mosque"')
                    .defaultOrdering([{ field: 'volgorde', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('📬 Koran Aanvragen')
                .child(
                  S.documentList()
                    .title('Koran Aanvragen')
                    .filter('_type == "koranAanvraag"')
                    .defaultOrdering([{ field: 'datum', direction: 'desc' }])
                ),
            ])
        ),

      S.divider(),

      // ── Berichten & Aanmeldingen ──
      S.listItem()
        .title('📬 Berichten')
        .child(
          S.list()
            .title('Berichten & Aanmeldingen')
            .items([
              S.listItem()
                .title('💬 Contact Berichten')
                .child(
                  S.documentList()
                    .title('Contact Berichten')
                    .filter('_type == "contactBericht"')
                    .defaultOrdering([{ field: 'datum', direction: 'desc' }])
                ),
              S.listItem()
                .title('🧱 Bouwer Aanmeldingen')
                .child(
                  S.documentList()
                    .title('Bouwer Aanmeldingen')
                    .filter('_type == "bouwerAanmelding"')
                    .defaultOrdering([{ field: 'datum', direction: 'desc' }])
                ),
              S.listItem()
                .title('🏭 Vending Aanvragen')
                .child(
                  S.documentList()
                    .title('Vending Aanvragen')
                    .filter('_type == "vendingAanvraag"')
                    .defaultOrdering([{ field: 'datum', direction: 'desc' }])
                ),
            ])
        ),

      S.divider(),

      // ── Content ──
      S.listItem()
        .title('📝 Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.listItem()
                .title('❓ FAQ')
                .child(
                  S.documentList()
                    .title('Veelgestelde Vragen')
                    .filter('_type == "faqItem"')
                    .defaultOrdering([{ field: 'volgorde', direction: 'asc' }])
                ),
              S.listItem()
                .title('⭐ Impact Stories')
                .child(
                  S.documentList()
                    .title('Impact Stories')
                    .filter('_type == "impactStory"')
                ),
              S.listItem()
                .title('📰 Nieuws')
                .child(
                  S.documentList()
                    .title('Nieuws')
                    .filter('_type == "nieuwsPost"')
                    .defaultOrdering([{ field: 'publicatieDatum', direction: 'desc' }])
                ),
            ])
        ),
    ]);
