// tokens.ts — Design tokens comme-chien-et-chat.com
// Source : Charte graphique Claude Design (2026-06-07)
// À utiliser dans les schemas JSON-LD et les utils TypeScript

export const colors = {
  terracotta:     '#D86C45',  // Principale — chaud
  terracottaDeep: '#C25E3A',  // Hover
  saumon:         '#F4A97C',  // Secondaire — doux
  creme:          '#FBF4EA',  // Fond principal
  cremeCard:      '#FFFDF8',  // Fond cartes
  anthracite:     '#2E2823',  // Texte
  sauge:          '#7FA081',  // Accent frais
  saugeDeep:      '#6B8C70',  // Hover sauge
  heartOrange:    '#E8825C',  // Cœur du logo
} as const;

export const fonts = {
  display: "'Fredoka', sans-serif",   // H1, H2, H3, logo wordmark
  body:    "'Nunito Sans', sans-serif", // Corps, meta, labels
} as const;

export const fontWeights = {
  regular: 400,
  medium:  500,
  semibold: 600,
  bold:    700,
} as const;

export const typescale = {
  h1:    'clamp(2.5rem, 5vw, 3.25rem)', // 40–52px Fredoka 600
  h2:    '2.125rem',                     // 34px Fredoka 600
  h3:    '1.5rem',                       // 24px Fredoka 500
  body:  '1.125rem',                     // 18px Nunito Sans 400
  small: '0.8125rem',                    // 13px Nunito Sans 700 uppercase
} as const;

export const siteMeta = {
  name:        'comme chien et chat',
  domain:      'comme-chien-et-chat.com',
  url:         'https://comme-chien-et-chat.com',
  description: 'Conseils et comparatifs pour choisir les meilleurs accessoires pour vos chats et chiens.',
  author:      '[NOM_AUTEUR]',
  logo:        'https://comme-chien-et-chat.com/logo.svg',
  locale:      'fr_FR',
} as const;
