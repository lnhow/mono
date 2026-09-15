const defaultThumbnailContent = {
  title: 'Hao Le',
  description: 'Web developer, photography and UX enthusiast.',
} as const

interface ThumbnailContent {
  title: string
  description: string
}

export function createThumbnailUrl(content: ThumbnailContent) {
  const searchParams = new URLSearchParams({
    title: content.title,
    description: content.description,
  })

  return `/api/og?${searchParams.toString()}`
}

export function getThumbnailContent(url: URL): ThumbnailContent {
  return {
    title: url.searchParams.get('title') || defaultThumbnailContent.title,
    description:
      url.searchParams.get('description') || defaultThumbnailContent.description,
  }
}
