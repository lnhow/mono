import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { z } from 'zod'

// Markdown processing
import remarkGfm from 'remark-gfm'
// import remarkSlug from 'remark-slug'
// import remarkAutolinkHeadings from 'remark-autolink-headings'
// import readingTime from 'reading-time'

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
    const fileName = document._meta.filePath.split('/').pop()?.replace(/\.mdx$/, '') || ''

    const mdx = await compileMDX(context, document, {
      remarkPlugins: [
        remarkGfm,
      ],
      rehypePlugins: [
        // Add any rehype plugins here
      ],
    })

    return {
      ...document,
      mdx,
      slug: fileName,
      url: `/posts/${fileName}`,
    }
  },
});
 
export default defineConfig({
  collections: [posts],
});
