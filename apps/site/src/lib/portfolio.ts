import { experiments } from './experiments'

export const projectClassifications = ['stable', 'experimental'] as const

export type ProjectClassification = (typeof projectClassifications)[number]

export interface SocialLink {
  label: 'GitHub' | 'LinkedIn'
  href: `https://${string}`
}

export interface PortfolioProject {
  id: string
  title: string
  summary: string
  status: string
  href: `https://${string}`
  technologies: readonly string[]
  classification: ProjectClassification
}

export interface PortfolioProfile {
  eyebrow: string
  heading: string
  introduction: string
  socials: readonly SocialLink[]
  skills: readonly string[]
  projects: readonly PortfolioProject[]
  sourceNotes: readonly string[]
}

export const portfolio = {
  eyebrow: 'Web developer · Ho Chi Minh City',
  heading: 'Hi, I’m Hào.',
  introduction:
    'I build for the web and write about software, learning, and ideas that stay with me. I’m also interested in photography and UX.',
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/lnhow',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/nguyenhaole7f8/',
    },
  ],
  skills: [
    'React',
    'Next.js',
    'Tailwind CSS',
    'shadcn',
    'Socket.IO',
    'NestJS',
    'Prisma',
    'MongoDB',
    'GCP',
  ],
  projects: [
    {
      id: 'personal-blog',
      title: 'Personal blog',
      summary: 'The stable personal website and blog for writing and portfolio content.',
      status: 'Live',
      href: 'https://haoln7f8.com',
      technologies: ['React 19.2', 'Next.js 16', 'Tailwind CSS', 'shadcn'],
      classification: 'stable',
    },
    {
      id: 'guesart',
      title: 'guesart',
      summary:
        'A real-time draw-and-guess game rebuilt from an internship project and deployed with a persistent backend.',
      status: 'Live game',
      href: 'https://haoln7f8.com/guesart',
      technologies: [
        'Socket.IO',
        'Jotai',
        'NestJS',
        'Prisma',
        'MongoDB',
        'GCP',
        'Nginx',
      ],
      classification: 'stable',
    },
  ],
  sourceNotes: [
    'LinkedIn differs between the current stable homepage and legacy UI; this data uses the legacy homepage link.',
  ],
} as const satisfies PortfolioProfile

export function getStableProjects() {
  return portfolio.projects.filter(
    (project) => project.classification === 'stable',
  )
}

export function getExperimentalProjectIds() {
  return experiments.map(({ slug }) => slug)
}
