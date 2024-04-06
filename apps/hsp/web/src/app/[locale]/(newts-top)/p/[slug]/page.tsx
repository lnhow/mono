import { PAGE_REVALIDATE } from '@newts/ui/constants/staleTime'
import { Metadata, ResolvingMetadata } from 'next'

import { notFound } from 'next/navigation'
import { cache } from 'react'

import { fetchSearchPost } from '@/data/actions/posts/search'
import PageView from '@newts/ui/components/pages/p/[slug]'
import { PostEntity } from '@/data/graphql/_generated/types'
import { getPostCoverUrl } from '@/common/utils/data/post'
import { mapPostToNwPost } from '@/data/mapping/post'
import NextPageProps from '@newts/ui/types/common/pageProps'

export const revalidate = PAGE_REVALIDATE.DEFAULT

type PagePostProps = NextPageProps<{ slug: string }>

export const generateMetadata = async (
  { params }: PagePostProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  if (!params?.slug) {
    notFound()
  }

  const getPostRes = await fetchSearchPost({
    slug: params?.slug
  })
  const { post } = mapToProps(getPostRes)
  const coverImage = getPostCoverUrl(post as PostEntity)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${post?.attributes?.title} | Newts`,
    description: '' + post?.attributes?.description,
    openGraph: {
      images: [coverImage, ...previousImages],
    },
  }
}

export default async function Page({ params }: PagePostProps) {
  if (!params?.slug) {
    notFound()
  }

  const getPostRes = await fetchSearchPost({
    slug: params?.slug
  })
  const { post } = mapToProps(getPostRes)
  if (!post) {
    notFound()
  }

  return <PageView post={mapPostToNwPost(post as PostEntity)} />
}

const mapToProps = cache(
  (gqlRes: Awaited<ReturnType<typeof fetchSearchPost>>) => {
    const result = { post: undefined }
    if (!gqlRes.posts?.data) {
      return result
    }

    const post = gqlRes.posts.data[0]
    return {
      post,
    }
  }
)
