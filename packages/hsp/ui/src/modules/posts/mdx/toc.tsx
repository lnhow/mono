'use client'
import type { TocItem } from '@repo/remark-toc'
import Link from '@hsp/ui/components/link'
import cn from '@hsp/ui/utils/cn'
import {
  useEffect,
  useState,
  // useSyncExternalStore
} from 'react'

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

// For use later with <Activity /> in React 19.2
// const useMediaQuery = (query: string, defaultState: boolean) => {
//   return useSyncExternalStore(
//     (notifyChange) => {
//       if (typeof window === 'undefined' || !window.matchMedia) {
//         return () => {}
//       }
//       const mediaQueryList = window.matchMedia(query)
//       mediaQueryList.addEventListener('change', notifyChange)
//       return () => {
//         mediaQueryList.removeEventListener('change', notifyChange)
//       }
//     },
//     () => {
//       if (typeof window === 'undefined' || !window.matchMedia) {
//         return false
//       }
//       return window.matchMedia(query).matches
//     },
//     () => defaultState,
//   )
// }

export function TableOfContentsInternal({
  toc,
  className,
}: TableOfContentsProps) {
  // TODO (haoln): Test this function futher
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const ratios: Record<string, number> = toc.reduce(
      (acc, item) => {
        acc[item.slug] = 0.0
        return acc
      },
      {} as Record<string, number>,
    )
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          ratios[entry.target.id] = entry.intersectionRatio
          // Find the first entry with ratio > 0.0
          const activeEntry = toc.find((item) => {
            return (ratios[item.slug] || 0.0) > 0.0
          })
          if (activeEntry) {
            setActiveId(activeEntry.slug)
          }
        },
        {
          root: null, // Use the viewport as the root
          rootMargin: '0px 0px 100% 0px', // Margin around the root
          threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Percentage to trigger
        },
      )
    })

    const headings = document.querySelectorAll(
      'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]',
    )
    headings.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      observer.disconnect()
    }
  }, [toc])

  return (
    <nav aria-label="Table of contents" className={className}>
      <h3 className="text-md font-semibold mb-2 text-fore-300">
        Table of Contents
      </h3>
      <ul className="list-none break-words text-sm">
        {toc.map((item) => (
          <li
            key={item.slug}
            className={cn('py-1', headingLevelClassMap[item.level])}
          >
            <Link
              href={`#${item.slug}`}
              className={cn(
                'text-fore-200 no-underline hover:underline',
                activeId === item.slug ? 'text-fore-500' : undefined,
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
