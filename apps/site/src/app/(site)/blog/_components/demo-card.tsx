import { Badge } from '@folio/ui/components/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@folio/ui/components/card'
import { LucideArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'

export interface DemoItem {
  id: string
  title: string
  description: string | React.ReactNode
  href: string
  tag: string
  external?: boolean
  forceReload?: boolean
}

export function DemoCard({ demo }: { demo: DemoItem }) {
  const isExternal = Boolean(demo.external)
  const isDirectNav = Boolean(demo.forceReload)

  const linkProps = {
    href: demo.href,
    className: 'before:absolute before:inset-0 focus:outline-hidden',
    ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
  }

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border-border/60 bg-card/60 backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="text-xs font-mono font-normal">
            {demo.tag}
          </Badge>
          <div className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground">
            <LucideArrowUpRight size={18} />
          </div>
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-lg font-semibold tracking-tight">
            {isDirectNav ? (
              <a {...linkProps}>{demo.title}</a>
            ) : (
              <Link {...linkProps}>{demo.title}</Link>
            )}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-muted-foreground">
            {demo.description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}
