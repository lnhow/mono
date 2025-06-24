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
      <Link href={href} className={cn(className)}>
        <Card className="flex flex-col p-4 h-full transition outline-primary-100 hover:outline">
          <ViewTransition name={transitionTitle}>
            <CardTitle className="mb-4">
              <h3 className="text-md font-normal text-fore-400">{title}</h3>
            </CardTitle>
          </ViewTransition>
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
