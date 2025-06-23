import cn from '@hsp/ui/src/utils/cn'
import Link from '../../link'
import { ReactNode } from 'react'
import ViewTransition from '../../ViewTransition'
import { Card, CardDescription, CardTitle } from '../../../base/card'

export type CardDemoProps = {
  title: ReactNode
  description: ReactNode
  href: string
  imgSrc?: string
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
        className="no-underline rounded-lg transition outline-primary-100 hover:outline"
      >
        <Card className={cn('flex flex-col gap-2 p-4', className)}>
          <ViewTransition name={transitionTitle}>
            <CardTitle>
              <h3 className="text-md font-bold">{title}</h3>
            </CardTitle>
          </ViewTransition>
          <ViewTransition name={transitionDescription}>
            <CardDescription>
              <p>{description}</p>
            </CardDescription>
          </ViewTransition>
        </Card>
      </Link>
    </ViewTransition>
  )
}
