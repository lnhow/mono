export interface PostRecord {
  slug: string
  createdAt: Date
  updatedAt?: Date
  draft?: boolean
  archived?: boolean
}

export function isVisiblePost(post: PostRecord) {
  return !post.draft && !post.archived
}

export function getVisiblePosts<T extends PostRecord>(posts: readonly T[]): T[] {
  return posts.filter(isVisiblePost).sort((left, right) => {
    const effectiveDifference =
      (right.updatedAt ?? right.createdAt).getTime() -
      (left.updatedAt ?? left.createdAt).getTime()

    if (effectiveDifference !== 0) {
      return effectiveDifference
    }

    const createdDifference =
      right.createdAt.getTime() - left.createdAt.getTime()

    if (createdDifference !== 0) {
      return createdDifference
    }

    return left.slug.localeCompare(right.slug)
  })
}

export function getPostBySlug<T extends PostRecord>(
  posts: readonly T[],
  slug: string,
) {
  return posts.find((post) => isVisiblePost(post) && post.slug === slug)
}

export function getPostStaticParams(posts: readonly PostRecord[]) {
  return getVisiblePosts(posts).map(({ slug }) => ({ slug }))
}
