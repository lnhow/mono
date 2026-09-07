import { allPosts } from 'content-collections'
import type { Metadata } from 'next'

import { DemoCard, type DemoItem } from './_components/demo-card'
import { PostCard } from './_components/post-card'
import { getVisiblePosts } from '@/lib/posts'
import { blogMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = blogMetadata

const DEMOS: readonly DemoItem[] = [
  {
    id: 'spiral',
    title: 'Galaxy Generator',
    description: 'Interactive spiral galaxy simulation with lil-gui parameter controls.',
    href: '/demos/spiral',
    tag: 'Three.js',
  },
  {
    id: 'cake',
    title: 'Birthday Cake 3D',
    description: 'Customizable 3D birthday cake with interactive lighting and customizable text.',
    href: '/demos/cake?edit=true',
    tag: 'R3F',
  },
  {
    id: 'player',
    title: 'Custom HTML Video Player',
    description: 'Video player built with useSyncExternalStore, custom progress tracking, and native controls.',
    href: '/demos/player',
    tag: 'Web Media',
  },
  {
    id: 'contrast-checker',
    title: 'Color Contrast Checker',
    description: 'Accessible color contrast evaluation tool supporting WCAG 2.1 AA/AAA compliance.',
    href: '/demos/contrast-checker',
    tag: 'A11y Tool',
  },
  {
    id: '3dtext',
    title: '3D Spatial Typography',
    description: 'Floating 3D kinetic typography and geometry scattering with matcap textures.',
    href: '/demos/3dtext',
    tag: 'Three.js',
  },
  {
    id: 'physics',
    title: 'Physics Playground',
    description: 'Rigid-body gravitational physics collision simulation powered by Cannon.js.',
    href: '/demos/physics',
    tag: 'Cannon.js',
  },
  {
    id: 'nextjs-perf',
    title: 'Next.js Performance Matrix',
    description: 'Direct comparison between standard SSR and Cache Component streaming in Next.js.',
    href: '/demos/nextjs-perf',
    tag: 'Next.js',
  },
]

export default function BlogPage() {
  const posts = getVisiblePosts(allPosts)

  return (
    <div className="space-y-16">
      <header className="max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Blog & Creations</h1>
        <p className="text-lg text-muted-foreground">
          Notes on software development, experiments with 3D graphics, and interactive tools.
        </p>
      </header>

      {/* Writing / Posts Section */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between border-b pb-3">
          <h2 className="text-xl font-semibold tracking-tight">Writing</h2>
          <span className="text-xs text-muted-foreground font-mono">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Interactive Demos Section */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between border-b pb-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Things I built for fun
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Interactive demos, 3D experiments, and creative coding explorations.
            </p>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {DEMOS.length} demos
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>
      </section>
    </div>
  )
}
