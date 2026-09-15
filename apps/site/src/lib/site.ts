export const fallbackSiteOrigin = 'https://www.haoln7f8.com'

export function normalizeSiteOrigin(value = fallbackSiteOrigin) {
  const url = new URL(value)

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('NEXT_PUBLIC_SITE_URL must use http or https')
  }

  return url.origin
}

export const site = {
  name: 'Hao Le',
  description:
    'Hao Le’s personal website. Web developer, photography and UX enthusiast.',
  origin: normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  author: 'Hao Le',
} as const
