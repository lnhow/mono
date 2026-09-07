import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

const prettyCodeOptions: Partial<RehypePrettyCodeOptions> = {
  theme: 'github-light',
  keepBackground: false,
}

const posts = defineCollection({
  name: 'posts',
  directory: 'src/content/posts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.string().pipe(z.coerce.date()),
    updatedAt: z.string().pipe(z.coerce.date()).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    archived: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const slug = document._meta.filePath
      .split('/')
      .at(-1)!
      .replace(/\.mdx$/, '')

    return {
      ...document,
      slug,
      url: `/blog/${slug}`,
      readingTime: readingTime(document.content).minutes,
      mdx: await compileMDX(context, document, {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, prettyCodeOptions],
        ],
      }),
    }
  },
})

export default defineConfig({ content: [posts] })
