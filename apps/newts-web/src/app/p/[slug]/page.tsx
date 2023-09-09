import { PAGE_REVALIDATE } from '@/common/constants/staleTime'
import { Metadata, ResolvingMetadata } from 'next'

import { getPostBySlug } from './_page/api'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import PageView from './_page/components'
import { PostEntity } from '@/common/utils/graphql/_generated/types'
import { getPostCoverUrl } from '@/common/utils/data/post'

export const revalidate = PAGE_REVALIDATE.DEFAULT

type PageProps = { params: { slug: string } }

export const generateMetadata = async (
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const getPostRes = await getPostBySlug(params.slug)
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

export default async function Page({ params }: PageProps) {
  const getPostRes = await getPostBySlug(params.slug)
  const { post } = mapToProps(getPostRes)

  if (!post) {
    notFound()
  }

  return <PageView post={post as PostEntity} />
}

const mapToProps = cache(
  (gqlRes: Awaited<ReturnType<typeof getPostBySlug>>) => {
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
