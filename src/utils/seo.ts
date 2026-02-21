import { SITE_CONFIG } from './siteConfig';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function getSEO(props: SEOProps = {}) {
  const title = props.title
    ? `${props.title} | ${SITE_CONFIG.title.split('|')[0].trim()}`
    : SITE_CONFIG.title;
  const description = props.description || SITE_CONFIG.description;
  const image = props.image || `${SITE_CONFIG.url}/images/og-image.jpg`;
  const type = props.type || 'website';

  return {
    title,
    description,
    openGraph: {
      basic: { title, type, image, url: SITE_CONFIG.url },
      image: { alt: title },
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      image,
    },
  };
}
