export const experimentCategories = [
  'creative-coding',
  'tools',
  'performance',
] as const

export type ExperimentCategory = (typeof experimentCategories)[number]

export interface Experiment {
  slug: string
  title: string
  description: string
  href: `https://${string}`
  category: ExperimentCategory
}

const legacyOrigin = 'https://www.hspln.com'

export const experiments = [
  {
    slug: '3d-text',
    title: '3D text',
    description: 'A small Three.js typography study.',
    href: `${legacyOrigin}/3dtext`,
    category: 'creative-coding',
  },
  {
    slug: 'cake',
    title: 'Cake',
    description: 'An interactive Three.js cake scene.',
    href: `${legacyOrigin}/cake`,
    category: 'creative-coding',
  },
  {
    slug: 'physics',
    title: 'Physics',
    description: 'A browser-based physics experiment.',
    href: `${legacyOrigin}/physics`,
    category: 'creative-coding',
  },
  {
    slug: 'spiral',
    title: 'Spiral',
    description: 'A procedural Three.js spiral.',
    href: `${legacyOrigin}/spiral`,
    category: 'creative-coding',
  },
  {
    slug: 'palette',
    title: 'Palette',
    description: 'A compact color-palette playground.',
    href: `${legacyOrigin}/palette`,
    category: 'tools',
  },
  {
    slug: 'player',
    title: 'Video player',
    description: 'A custom HTML media-player exploration.',
    href: `${legacyOrigin}/player`,
    category: 'tools',
  },
  {
    slug: 'contrast-checker',
    title: 'Contrast checker',
    description: 'A tool for checking foreground and background contrast.',
    href: `${legacyOrigin}/tools/contrast-checker`,
    category: 'tools',
  },
  {
    slug: 'nextjs-performance',
    title: 'Next.js performance',
    description: 'A rendering and caching comparison.',
    href: `${legacyOrigin}/nextjs-perf`,
    category: 'performance',
  },
] as const satisfies readonly Experiment[]
