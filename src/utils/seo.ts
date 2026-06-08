const SITE_URL = 'https://comme-chien-et-chat.com';

export function generateCanonical(path: string): string {
  const clean = path.replace(/\/$/, '') || '/';
  return `${SITE_URL}${clean}`;
}

export interface MetaProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  datePublished?: string;
  dateModified?: string;
  noindex?: boolean;
}

export function generateMeta(props: MetaProps): MetaProps {
  return {
    ...props,
    canonical: props.canonical.startsWith('http') ? props.canonical : generateCanonical(props.canonical),
    ogImage: props.ogImage ?? '/og-default.webp',
    noindex: props.noindex ?? false,
  };
}
