export function getPostTransitionNames(slug: string) {
  return {
    card: `post-${slug}`,
    title: `post-title-${slug}`,
    description: `post-description-${slug}`,
    stats: `post-stats-${slug}`,
    tags: `post-tags-${slug}`,
  } as const
}
