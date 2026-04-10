import { siteSettings } from './schemas/siteSettings';
import { homePage } from './schemas/homePage';
import { waqfConfig } from './schemas/waqfConfig';
import { fatwa } from './schemas/fatwa';
import { nalatenschapPagina } from './schemas/nalatenschapPagina';
import { teamMember } from './schemas/teamMember';
import { donatieProject } from './schemas/donatieProject';
import { hisabRapport } from './schemas/hisabRapport';
import { faqItem } from './schemas/faqItem';
import { impactStory } from './schemas/impactStory';
import { nieuwsPost } from './schemas/nieuwsPost';
import { ebook } from './schemas/ebook';
import { mosque } from './schemas/mosque';

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  waqfConfig,
  fatwa,
  nalatenschapPagina,
  // Collecties
  teamMember,
  donatieProject,
  hisabRapport,
  faqItem,
  impactStory,
  nieuwsPost,
  ebook,
  mosque,
];
