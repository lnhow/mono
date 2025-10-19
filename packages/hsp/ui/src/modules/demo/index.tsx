import cn from '@hsp/ui/utils/cn'
import Link from '../../utils/app/link'
import { ReactNode } from 'react'
import ViewTransition from '../../utils/react/view-transition'
import { Card, CardDescription, CardTitle } from '../../components/card'

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
        <Card className="flex flex-col px-4 py-5 h-full min-h-32 transition outline-fore-100 hover:outline">
          <ViewTransition name={transitionTitle}>
            <CardTitle className="mb-6">
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
