# CLAUDE.md — Site satellite PBN comme-chien-et-chat.com

> Lu automatiquement par Claude Code à chaque session.
> Respecter ces instructions sans les remettre en question.

---

## Contexte projet

Site satellite PBN thématique **chats & accessoires**.
Objectif : générer du jus SEO vers **griffedamour.com** via 25 articles répartis sur 5 univers.
Stack : **Astro 4+ (SSG)** déployé sur **Hostinger**.
Propriétaire : Youri Sarotte — Agence PH33NIX (ph33nix.com)

---

## Stack technique

```
Framework   : Astro 4+ (Static Site Generation uniquement — NO SSR)
Langage     : TypeScript strict
Styles      : CSS vanilla (pas de Tailwind, pas de framework CSS)
Images      : Astro Image (<Image />) — format WebP forcé, width/height toujours définis
Fonts       : Google Fonts via @fontsource (pas de CDN externe au runtime)
Déploiement : Build statique → upload FTP Hostinger (dist/)
Node        : >=18.14.1
Package mgr : npm
Domaine     : comme-chien-et-chat.com
```

---

## Charte graphique

> Générée par Claude Design (2026-06-07). Logo duo chat + chien nez à nez, flat design tout en rondeurs.

### Palette couleurs

| Rôle | Nom | HEX |
|---|---|---|
| Principale (chaud) | Terracotta | `#D86C45` |
| Hover terracotta | Terracotta deep | `#C25E3A` |
| Secondaire (doux) | Saumon | `#F4A97C` |
| Fond principal | Crème | `#FBF4EA` |
| Fond cartes | Crème card | `#FFFDF8` |
| Texte | Anthracite | `#2E2823` |
| Accent frais | Sauge | `#7FA081` |
| Hover sauge | Sauge deep | `#6B8C70` |
| Cœur du logo | Heart orange | `#E8825C` |

### Typographie

- **Display** (H1/H2/H3, wordmark) : `Fredoka` — Google Fonts — weights 400/500/600/700
- **Body** (corps, meta, labels) : `Nunito Sans` — Google Fonts
- H1 : `clamp(2.5rem, 5vw, 3.25rem)` Fredoka 600
- H2 : `2.125rem` Fredoka 600
- H3 : `1.5rem` Fredoka 500
- Body : `1.125rem` Nunito Sans 400 — line-height 1.65
- Eyebrow/small : `0.8125rem` Nunito Sans 700 uppercase letter-spacing 0.16em — terracotta

### Variables CSS (src/styles/global.css)

```css
:root {
  --color-terracotta: #D86C45;
  --color-terracotta-deep: #C25E3A;
  --color-saumon: #F4A97C;
  --color-creme: #FBF4EA;
  --color-creme-card: #FFFDF8;
  --color-anthracite: #2E2823;
  --color-sauge: #7FA081;
  --color-sauge-deep: #6B8C70;
  --font-display: 'Fredoka', sans-serif;
  --font-body: 'Nunito Sans', sans-serif;
  --radius-sm: 14px; --radius-md: 22px; --radius-lg: 28px; --radius-pill: 999px;
  --shadow-card: 0 18px 50px -24px rgba(46,40,35,0.30);
  --shadow-cta: 0 10px 22px -10px var(--color-terracotta);
}
```

### Règles d'usage logo

- Logo principal : `public/logo.svg` (icône duo) + wordmark "comme chien et chat" en Fredoka 600
- Favicon : `public/favicon.svg` (version simplifiée)
- Header : icône SVG **inline** (pas de requête HTTP — perf) — voir `Header.astro`
- Zone de protection : marge libre = hauteur du cœur autour du logo
- Ne JAMAIS déformer ni recolorer les animaux — chat = terracotta, chien = sauge
- CTA : fond terracotta, texte blanc, `border-radius: pill`, Fredoka 600

### Composants déjà livrés

- `src/layouts/BaseLayout.astro` — head SEO + fonts + favicon + anti-footprint
- `src/components/Header.astro` — logo inline + nav + CTA terracotta
- `src/components/Footer.astro` — footer anthracite + liens légaux
- `src/styles/global.css` — variables + tous les composants
- `src/utils/tokens.ts` — design tokens TypeScript
- `public/logo.svg` + `public/favicon.svg`

---

## Structure du projet

```
/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml          ← généré manuellement, PAS @astrojs/sitemap
│   └── images/              ← images source (jpg/png) — Astro les optimise
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Breadcrumb.astro
│   │   ├── ArticleMeta.astro
│   │   ├── ProductCard.astro
│   │   ├── FAQ.astro
│   │   └── RelatedArticles.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro   ← head SEO + schemas JSON-LD
│   │   └── ArticleLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── a-propos.astro
│   │   ├── contact.astro
│   │   ├── mentions-legales.astro
│   │   ├── politique-confidentialite.astro
│   │   ├── arbre-a-chat/
│   │   │   └── [slug].astro
│   │   ├── fontaine-eau-chat/
│   │   │   └── [slug].astro
│   │   ├── distributeur-croquettes-chat/
│   │   │   └── [slug].astro
│   │   ├── bac-litiere-chat/
│   │   │   └── [slug].astro
│   │   └── sac-a-dos-chat/
│   │       └── [slug].astro
│   ├── content/
│   │   ├── config.ts          ← zod schemas
│   │   ├── arbre-a-chat/      ← fichiers .md ou .mdx
│   │   ├── fontaine-eau-chat/
│   │   ├── distributeur-croquettes-chat/
│   │   ├── bac-litiere-chat/
│   │   └── sac-a-dos-chat/
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── schema.ts          ← fonctions generateArticleSchema(), generateFAQSchema()
│       └── seo.ts             ← fonctions generateCanonical(), generateMeta()
├── astro.config.mjs
├── tsconfig.json
└── CLAUDE.md
```

---

## Configuration Astro obligatoire

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://comme-chien-et-chat.com',
  output: 'static',           // SSG uniquement — jamais 'server' ou 'hybrid'
  trailingSlash: 'never',     // URLs sans slash final — cohérence canonical
  build: {
    format: 'file',           // génère /arbre-a-chat/slug.html (pas /slug/index.html)
  },
  compressHTML: true,
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  }
});
```

---

## Règles SEO — CRITIQUES

Claude Code doit systématiquement vérifier ces points sur chaque page générée.

### Balises obligatoires (BaseLayout.astro)

```astro
---
const { title, description, canonical, ogImage, datePublished, dateModified } = Astro.props;
---
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={canonical} />
  <!-- OG + Twitter card ici -->
  <!-- JSON-LD schemas ici -->
</head>
```

### Règles title

- Format : `{Mot-clé principal} — {NOM_SITE}`
- 50-60 caractères max
- Mot-clé cible en début de title TOUJOURS

### Règles meta description

- 150-160 caractères
- Inclure le mot-clé principal
- Unique par page — jamais dupliquée

### Canonical

- Toujours présente — utiliser `Astro.site` + chemin complet
- Jamais de canonical relative
- Cohérente avec `trailingSlash: 'never'`

---

## Schema.org — implémentation

### Article (chaque article)

```ts
// src/utils/schema.ts
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
      "name": "[NOM_SITE]",
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
```

### FAQPage (chaque article — minimum 3 Q&A)

```ts
export function generateFAQSchema(faqs: {question: string, answer: string}[]) {
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
```

### BreadcrumbList (chaque page)

Toujours 3 niveaux : Accueil → Catégorie → Article.

### WebSite + Organization (homepage uniquement)

---

## Content Collections — schema Zod

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string().max(60),
  description: z.string().min(150).max(160),
  slug: z.string(),
  category: z.enum([
    'arbre-a-chat',
    'fontaine-eau-chat',
    'distributeur-croquettes-chat',
    'bac-litiere-chat',
    'sac-a-dos-chat'
  ]),
  keyword: z.string(),          // mot-clé principal exact
  urlCibleGriffedamour: z.string(), // ex: /collections/arbre-a-chat
  ancreGriffedamour: z.string(), // ancre texte du lien
  priorite: z.enum(['haute', 'moyenne', 'basse']),
  author: z.string().default('[NOM_AUTEUR]'),
  datePublished: z.string(),    // ISO 8601 — ex: 2026-06-07
  dateModified: z.string(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).min(3),
  relatedArticles: z.array(z.string()).optional(), // slugs
});

export const collections = {
  'arbre-a-chat': defineCollection({ type: 'content', schema: articleSchema }),
  'fontaine-eau-chat': defineCollection({ type: 'content', schema: articleSchema }),
  'distributeur-croquettes-chat': defineCollection({ type: 'content', schema: articleSchema }),
  'bac-litiere-chat': defineCollection({ type: 'content', schema: articleSchema }),
  'sac-a-dos-chat': defineCollection({ type: 'content', schema: articleSchema }),
};
```

---

## Performance — règles Core Web Vitals

| Métrique | Cible | Comment |
|---|---|---|
| LCP | < 2.5s | Image hero : `loading="eager"` + `fetchpriority="high"` |
| CLS | 0 | `width` et `height` TOUJOURS sur chaque `<Image />` |
| TTFB | < 600ms | SSG statique — aucun JS serveur |
| TBT | < 200ms | Zéro JS inutile en runtime |

### Règles images obligatoires

```astro
<!-- Hero image — toujours eager + fetchpriority -->
<Image
  src={heroImage}
  alt={`${article.keyword} — guide complet`}
  width={800}
  height={450}
  format="webp"
  quality={82}
  loading="eager"
  fetchpriority="high"
/>

<!-- Images secondaires — toujours lazy -->
<Image
  src={productImage}
  alt={altText}
  width={400}
  height={300}
  format="webp"
  quality={80}
  loading="lazy"
/>
```

---

## Maillage interne — règles PBN

### Lien vers griffedamour.com (OBLIGATOIRE dans chaque article)

```astro
<!-- Ancre variée — suivre le tableau des ancres -->
<a
  href={`https://griffedamour.com${article.urlCibleGriffedamour}`}
  rel="noopener"
  target="_blank"
>
  {article.ancreGriffedamour}
</a>
```

### Lien externe neutre (OBLIGATOIRE — 1 minimum par article)

```astro
<a href="https://www.60millions-mag.com/" rel="noopener" target="_blank">
  60 Millions de Consommateurs
</a>
```

### Ratio sortants à respecter

- 1 lien griffedamour.com
- 3 liens vers sites tiers neutres (Wikipedia, 60millions-mag, vetement-chien.com, etc.)

### Tableau des ancres (rotation obligatoire)

| Type | % | Exemples |
|---|---|---|
| Exact | 20% | "meilleur arbre à chat" |
| Partielle | 30% | "ce comparatif complet", "cette sélection" |
| Naked | 25% | "griffedamour.com", "voir ici" |
| Brand | 25% | "Griffe d'Amour", "la boutique" |

---

## Anti-footprint — vérifications build

Avant chaque commit, vérifier dans le HTML généré (`dist/`) :

- [ ] Aucune mention de "Astro" dans le source visible (désactiver le generator meta)
- [ ] Aucun cookie tiers chargé (GA, Meta Pixel, etc.)
- [ ] Pas d'attribut `data-astro-*` exposé dans les balises visibles
- [ ] Pas de lien `powered by` dans le footer

```astro
<!-- Supprimer le generator meta dans BaseLayout.astro -->
<!-- NE PAS inclure : <meta name="generator" content={Astro.generator} /> -->
```

---

## Commandes de développement

```bash
npm run dev          # Serveur local http://localhost:4321
npm run build        # Build statique → dist/
npm run preview      # Prévisualiser le build
npm run check        # TypeScript check (astro check)
```

### Workflow de déploiement Hostinger

```bash
npm run build
# Uploader le contenu de dist/ via FTP Hostinger hPanel
# Cible : public_html/
# Ne pas uploader node_modules, src, ou .astro
```

---

## Checklist avant chaque commit

- [ ] `astro check` sans erreur TypeScript
- [ ] `npm run build` réussi sans warning
- [ ] Canonical correcte sur chaque page (`https://comme-chien-et-chat.com/...`)
- [ ] Schema Article valide sur Rich Results Test
- [ ] Schema FAQ présent avec ≥ 3 questions
- [ ] Image hero avec `loading="eager"` et `width`/`height` définis
- [ ] Lien griffedamour.com présent dans l'article
- [ ] Lien externe neutre présent
- [ ] Meta generator supprimée du `<head>`
- [ ] Balise `<title>` unique et ≤ 60 caractères
- [ ] Meta description unique entre 150-160 caractères

---

## Ce que Claude Code NE DOIT PAS faire

- Utiliser `output: 'server'` ou `output: 'hybrid'` — SSG uniquement
- Installer Tailwind CSS ou un framework CSS externe
- Ajouter Google Analytics ou tout pixel de tracking
- Utiliser `@astrojs/sitemap` — le sitemap.xml est géré manuellement
- Générer des URLs avec trailing slash (`/arbre-a-chat/` → utiliser `/arbre-a-chat`)
- Mettre `<meta name="generator" content="Astro">` dans le head
- Utiliser `fetch()` côté client pour du contenu statique
- Créer des composants React/Vue/Svelte — Astro components uniquement
