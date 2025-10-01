import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { z } from 'zod'

// Markdown processing
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import readingTime from 'reading-time'
// Table of content generation
import { remark } from 'remark'
import remarkToc from '@repo/remark-toc'

const posts = defineCollection({
  name: "posts",
  directory: "src/contents/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.string().pipe(z.coerce.date()),
    updatedAt: z.string().pipe(z.coerce.date()).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    archived: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCredit: z.string().optional(),
    imageCreditUrl: z.string().optional(),
  }),
  transform: async (document, context) => {
    const [mdx, toc] = await Promise.all([
      compileMDX(context, document, {
        remarkPlugins: [
          remarkGfm,
        ],
        rehypePlugins: [
          rehypeSlug,
          rehypeAutolinkHeadings,
          // Add any rehype plugins here
        ],
      }),
      remark().use(remarkToc).process(document.content),
    ]) 
    console.log('\x1B[35m[Dev log]\x1B[0m -> toc:', JSON.stringify(toc.data?.toc?.children, null, 2))

    const fileName = document._meta.filePath.split('/').pop()?.replace(/\.mdx$/, '') || ''
    const readingTimeResult = readingTime(document.content)

    return {
      ...document,
      mdx,
      readingTime: readingTimeResult.minutes,
      slug: fileName,
      url: `/posts/${fileName}`,
    }
  },
});
 
export default defineConfig({
  collections: [posts],
});
