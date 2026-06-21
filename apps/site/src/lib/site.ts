const fallbackOrigin = 'https://www.hspln.com'

export const site = {
  name: 'Hao Le',
  description:
    'Hao Le’s personal website. Web developer, photography and UX enthusiast.',
  origin: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackOrigin).replace(/\/$/, ''),
  author: 'Hao Le',
} as const
