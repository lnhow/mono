import type { Root } from 'mdast'
import type { VFile } from 'vfile'

import { visit } from 'unist-util-visit'
import Slugger from 'github-slugger'

export interface TocItem {
  title: string
  level: number
  slug: string
}

export function createTocList() {
  return (tree: Root, file: VFile) => {
    // Notes: 
    // We match rehype-slug's behavior by using github-slugger, which ensures unique slugs
    const slugger = new Slugger()
    const toc = [] as TocItem[]

    visit(tree, 'heading', (node) => {
      let title = ''
      visit(node, (child) => {
        if ('value' in child && typeof child.value === 'string') {
          title += child.value
        }
      })
      
      const slug = slugger.slug(title)
      toc.push({ title, level: node.depth, slug })
    })
    file.data.toc = toc
  }
}
