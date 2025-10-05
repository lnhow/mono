// 'use client'
import type { TocItem } from '@repo/remark-toc'
import Link from '../app/link'
import cn from '@hsp/ui/src/utils/cn'
// import { useEffect, useState } from 'react'

const headingLevelClassMap: Record<number, string> = {
  1: 'ml-0',
  2: 'ml-2',
  3: 'ml-4',
  4: 'ml-6',
  5: 'ml-8',
  6: 'ml-10',
}

interface TableOfContentsProps {
  toc: TocItem[]
  className?: string
}

export default function TableOfContents({
  toc,
  className,
}: TableOfContentsProps) {
  if (!toc || toc.length === 0) {
    return null
  }

  return <TableOfContentsInternal toc={toc} className={className} />
}

export function TableOfContentsInternal({
  toc,
  className,
}: TableOfContentsProps) {
  // TODO (haoln): Test this function futher
  // const [activeId, setActiveId] = useState<string | null>(null)

  // useEffect(() => {
  //   const ratios: Record<string, number> = {}
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       ratios[entry.target.id] = entry.intersectionRatio

  //       const maxRatio = Math.max(...Object.values(ratios), 0.1)
  //       console.log('\x1B[35m[Dev log]\x1B[0m -> TableOfContentsInternal -> maxRatio:', ratios)
  //       const activeEntry = entries.find((e) => ratios[e.target.id] === maxRatio)
  //       if (activeEntry) {
  //         setActiveId(activeEntry.target.id)
  //       }
  //     }, {
  //       root: null, // Use the viewport as the root
  //       rootMargin: "0px 0px 100% 0px", // Margin around the root
  //       threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Percentage to trigger
  //     })
  //   })

  //   const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
  //   headings.forEach((heading) => {
  //     observer.observe(heading)
  //   })

  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [])

  return (
    <nav aria-label="Table of contents" className={className}>
      <h3 className="text-lg font-semibold pb-2 border-b border-base-200 mb-2 text-fore-300">
        Table of Contents
      </h3>
      <ul className="list-none break-words">
        {toc.map((item) => (
          <li
            key={item.slug}
            className={cn('py-1', headingLevelClassMap[item.level])}
          >
            <Link
              href={`#${item.slug}`}
              className={cn(
                'text-fore-200 no-underline hover:underline',
                // activeId === item.slug
                //   ? 'font-semibold text-fore-400'
                //   : undefined,
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
