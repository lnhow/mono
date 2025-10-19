export enum TTags {
  GENERAL = 'general',
  // Development
  DEV = 'dev',
  ARVR = 'ar/vr',
  MOBILE = 'mobile',
  TESTING = 'testing',
  PROCESS = 'process',
  // Web
  WEB = 'web',
  TECH_WEB_CSS = 'tech-web-css',
  TECH_WEB_INDEXEDDB = 'tech-web-indexeddb',
  // Art
  DESIGN = 'design',
  ARCHITECTURE = 'architecture',
  PHOTOGRAPHY = 'photography',
  DRAWING = 'drawing',
  // Life style
  TRANSIT_ORIENTED_DEVELOPMENT = 'transit-oriented development',
  MINIMALISM = 'minimalism',
  IDEAS = 'ideas',
}

export type TShort = {
  id: string,
  title: string
  description: string
  cover?: string
  tags: TTags[]
  source: {
    author: string,
    site?: string,
    link: string,
  }
}

/* Template for a short
{
  id: '',
  title: '',
  description: '',
  cover: '',
  tags: [],
  source: {
    author: '',
    site: '',
    link: '',
  }
},
*/

export const SHORTS: TShort[] = [
  {
    id: 'extreme-go-horse',
    title: '“Sprints”: The biggest mistake of Software Engineering',
    description: 'A witty critique of being agile in software development and discovering the Brazilian definition of the current state agile generated called “eXtreme Go Horse” methodology',
    cover: '/res/shorts/5-extreme-go-horse/1_TgS-3Km9pqzTO3TqddHbDQ.webp',
    tags: [],
    source: {
      author: 'Bruno Noriller',
      link: 'https://medium.com/@noriller/sprints-the-biggest-mistake-of-software-engineering-34115e7de008',
    }
  },
  {
    id: 'adhd',
    title: 'Hacking ADHD – Strategies for the modern developer',
    description: 'ADHD is often viewed through a negative lens, yet it’s important to acknowledge that the disorder brings not only challenges but also its own set of benefits.',
    cover: '/res/shorts/4-ah2d/hacking-adhd-cover-bis-sm.webp',
    tags: [
      TTags.DEV,
    ],
    source: {
      author: 'Raphael LEMAITRE',
      link: 'https://www.ledger.com/blog/hacking-adhd-strategies-for-the-modern-developer',
    }
  },
  {
    id: 'e2e',
    title: 'Just Say No to More End-to-End Tests',
    description: 'Why End-to-End Testing is not a end-all silver bullet solution.',
    cover: '/res/shorts/3-e2e/image02.png',
    tags: [
      TTags.TESTING,
      TTags.PROCESS,
    ],
    source: {
      author: 'Mike Wacker',
      site: 'testing.googleblog.com',
      link: 'https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html',
    }
  },
  {
    id: 'cq-stable',
    title: 'Container queries land in stable browsers',
    description:
      'This Valentine\'s day, we\'re celebrating size container queries and container query units landing in all stable browsers.',
    cover: '/res/shorts/2-cq-stable/media-queries-vs-containe-fa94919e025e3_960.png',
    tags: [TTags.WEB, TTags.DEV, TTags.TECH_WEB_CSS],
    source: {
      author: 'Una Kravets',
      site: 'web.dev',
      link: 'https://web.dev/blog/cq-stable',
    }
  },
  {
    id: 'idb',
    title: 'Working with IndexedDB',
    description: 'A guide to the basics of IndexedDB.',
    tags: [TTags.WEB, TTags.DEV, TTags.TECH_WEB_INDEXEDDB],
    source: {
      author: 'web.dev',
      link: 'https://web.dev/articles/indexeddb',
    }
  },
]
