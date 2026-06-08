import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string().max(60),
  description: z.string().min(150).max(160),
  category: z.enum([
    'arbre-a-chat',
    'fontaine-eau-chat',
    'distributeur-croquettes-chat',
    'bac-litiere-chat',
    'sac-a-dos-chat'
  ]),
  keyword: z.string(),
  urlCibleGriffedamour: z.string(),
  ancreGriffedamour: z.string(),
  priorite: z.enum(['haute', 'moyenne', 'basse']),
  author: z.string().default('Marie Fontaine'),
  datePublished: z.string(),
  dateModified: z.string(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).min(3),
  relatedArticles: z.array(z.string()).optional(),
});

export const collections = {
  'arbre-a-chat': defineCollection({ type: 'content', schema: articleSchema }),
  'fontaine-eau-chat': defineCollection({ type: 'content', schema: articleSchema }),
  'distributeur-croquettes-chat': defineCollection({ type: 'content', schema: articleSchema }),
  'bac-litiere-chat': defineCollection({ type: 'content', schema: articleSchema }),
  'sac-a-dos-chat': defineCollection({ type: 'content', schema: articleSchema }),
};
