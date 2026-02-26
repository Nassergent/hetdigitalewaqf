# Ummah.be

De digitale fundering voor de Belgische Ummah. Een non-profit initiatief dat professionele digitale infrastructuur bouwt voor moskeeën in België en Nederland. Gebouwd als **Sadaqa Jariya** (doorlopende liefdadigheid). Een initiatief van Het Digitale Waqf VZW.

## Tech Stack

- **[Astro 5](https://astro.build/)** — SSG Framework (Zero-JS by default)
- **[React 19](https://react.dev/)** — Interactieve componenten via Astro Islands
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS (Vite-powered, geen config file)
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety

## Installatie

```bash
# Clone de repository
git clone https://github.com/het-digitale-waqf/het-digitale-waqf.git
cd het-digitale-waqf

# Installeer dependencies (Node.js 20+ vereist)
npm install

# Start development server
npm run dev
```

De website is beschikbaar op `http://localhost:4321`.

## Project Structuur

```
het-digitale-waqf/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.astro        # Sticky navbar + dark mode toggle
│   │   │   └── Footer.astro        # 4-kolom footer met Waqf Badge
│   │   ├── react/
│   │   │   ├── MobileMenu.tsx      # Fullscreen mobile menu (React Island)
│   │   │   ├── DonationForm.tsx     # Interactief donatie formulier
│   │   │   └── ContactForm.tsx     # Contact formulier met validatie
│   │   └── WaqfBadge.astro         # Exporteerbare badge voor moskee-sites
│   ├── layouts/
│   │   └── Layout.astro            # Base HTML wrapper met SEO meta tags
│   ├── pages/
│   │   ├── index.astro             # Homepage
│   │   ├── over-ons.astro          # Over de VZW
│   │   ├── diensten.astro          # Diensten + pricing + FAQ
│   │   ├── moskeeen.astro          # Portfolio aangesloten moskeeën
│   │   ├── steun-ons.astro         # Donatiepagina
│   │   └── contact.astro           # Contactformulier
│   ├── utils/
│   │   ├── siteConfig.ts           # Site-brede constanten
│   │   └── seo.ts                  # SEO meta tag helper
│   └── styles/
│       └── global.css              # Tailwind v4 @theme design tokens
├── public/
│   ├── robots.txt
│   └── images/                     # Afbeeldingen (zelf toevoegen)
├── astro.config.mjs
├── vercel.json                     # Security headers & caching
├── tsconfig.json
└── package.json
```

## Een moskee toevoegen

Voeg een object toe aan de `mosques` array in `src/pages/moskeeen.astro`:

```typescript
{
  id: 5,
  name: 'Nieuwe Moskee',
  city: 'Brussel, België',
  image: '/images/mockups/nieuwe-moskee.jpg',
  link: 'https://nieuwemoskee.be',
  features: ['Gebedstijden', 'Donaties', 'Agenda'],
}
```

## De Waqf Badge

Het `WaqfBadge.astro` component kan gekopieerd worden naar de footer van elke cliënt-website om het Sadaqa Jariya netwerk te linken.

## Deployment

### Vercel (Aanbevolen)

1. Importeer je GitHub repository in Vercel
2. Vercel herkent automatisch het Astro framework
3. Deploy

### Netlify

```bash
npm run build
# Output in dist/ map
```

## Bijdragen

Jouw code kan in-sha-Allah een Sadaqa Jariya zijn.

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/nieuwe-module`)
3. Commit je wijzigingen (`git commit -m 'Add nieuwe module'`)
4. Push naar de branch (`git push origin feature/nieuwe-module`)
5. Open een Pull Request

## Licentie

MIT License — De branding en naam "Ummah.be" zijn eigendom van Het Digitale Waqf VZW.
