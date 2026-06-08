export interface ArticleData {
  title: string;
  description: string;
  slug: string;
  category: string;
  author: string;
  datePublished: string;
  dateModified: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateArticleSchema(article: ArticleData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": {
      "@type": "ImageObject",
      "url": `https://comme-chien-et-chat.com/images/${article.slug}-hero.webp`,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": "https://comme-chien-et-chat.com/a-propos"
    },
    "publisher": {
      "@type": "Organization",
      "name": "comme chien et chat",
      "logo": {
        "@type": "ImageObject",
        "url": "https://comme-chien-et-chat.com/images/logo.webp"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://comme-chien-et-chat.com/${article.category}/${article.slug}`
    },
    "inLanguage": "fr-FR"
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "comme chien et chat",
    "url": "https://comme-chien-et-chat.com",
    "description": "Conseils et comparatifs pour choisir les meilleurs accessoires pour chats.",
    "inLanguage": "fr-FR",
    "publisher": {
      "@type": "Organization",
      "name": "comme chien et chat",
      "url": "https://comme-chien-et-chat.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://comme-chien-et-chat.com/images/logo.webp"
      }
    }
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "comme chien et chat",
    "url": "https://comme-chien-et-chat.com",
    "logo": "https://comme-chien-et-chat.com/images/logo.webp",
    "sameAs": []
  };
}
