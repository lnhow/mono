import cn from '@hsp/ui/utils/cn'
import Link from '@hsp/ui/components/link'
import { ReactNode } from 'react'
import ViewTransition from '@hsp/ui/utils/react/view-transition'
import { Card, CardDescription, CardTitle } from '@hsp/ui/components/card'

export type CardDemoProps = {
  title: ReactNode
  description: ReactNode
  href: string
  external?: boolean
  // imgSrc?: string
  className?: string
  transitionCard?: string
  transitionTitle?: string
  transitionDescription?: string
  // transitionImg?: string
}

export default function CardDemo({
  title,
  description,
  href,
  external,
  // imgSrc,
  className = '',
  transitionCard,
  transitionTitle,
  transitionDescription,
}: CardDemoProps) {
  return (
    <ViewTransition name={transitionCard}>
      <Link
        href={href}
        className={cn(className)}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        <Card className="flex flex-col px-4 py-5 h-full min-h-32 transition outline-fore-100 hover:outline">
          <CardTitle className="mb-6">
            <ViewTransition name={transitionTitle}>
              <h3 className="text-md font-normal text-fore-400">{title}</h3>
            </ViewTransition>
          </CardTitle>
          <ViewTransition name={transitionDescription}>
            <CardDescription className="text-fore-200">
              <p>{description}</p>
            </CardDescription>
          </ViewTransition>
        </Card>
      </Link>
    </ViewTransition>
  )
}
