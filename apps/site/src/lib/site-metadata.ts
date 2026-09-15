import type { Metadata } from 'next'

import { site } from './site'
import { createThumbnailUrl } from './thumbnail'

const homeDescription = 'Web developer, photography and UX enthusiast.'
const blogDescription =
  'Writing about software, learning, and personal reflections.'

function socialImages(title: string, description: string) {
  return [createThumbnailUrl({ title, description })]
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.author, url: site.origin }],
  creator: site.author,
  publisher: site.author,
  alternates: { canonical: '/' },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: '/',
    images: socialImages(site.name, site.description),
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: socialImages(site.name, site.description),
  },
}

export const homeMetadata: Metadata = {
  title: site.name,
  description: homeDescription,
  alternates: { canonical: '/' },
  openGraph: {
    title: site.name,
    description: homeDescription,
    url: '/',
    images: socialImages(site.name, homeDescription),
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: homeDescription,
    images: socialImages(site.name, homeDescription),
  },
}

export const blogMetadata: Metadata = {
  title: 'Blog',
  description: blogDescription,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog',
    description: blogDescription,
    url: '/blog',
    images: socialImages('Hao Le · Blog', blogDescription),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: blogDescription,
    images: socialImages('Hao Le · Blog', blogDescription),
  },
}

interface MetadataPost {
  slug: string
  url: string
  title: string
  description: string
  createdAt: Date
  updatedAt?: Date
  tags: readonly string[]
}

export function createPostMetadata(post?: MetadataPost): Metadata {
  if (!post) {
    return { title: 'Post not found' }
  }

  const images = socialImages(post.title, post.description)

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.url },
    openGraph: {
      type: 'article',
      url: post.url,
      title: post.title,
      description: post.description,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: (post.updatedAt ?? post.createdAt).toISOString(),
      tags: [...post.tags],
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images,
    },
  }
}
