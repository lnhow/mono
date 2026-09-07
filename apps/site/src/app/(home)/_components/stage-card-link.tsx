import { cn } from '@folio/ui/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { LucideMoveUpRight } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'

export interface StageCardLinkProps extends React.ComponentProps<typeof Link> {
  isExternal?: boolean
}

export function StageCardLink({
  className,
  isExternal,
  children,
  href,
  prefetch = false,
  ...props
}: StageCardLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(
        'group relative transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800/80 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-xs transform-gpu shadow-sm',
        className,
      )}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </Link>
  )
}

export function BigStageCardLink({
  children,
  className,
  href,
  icon: Icon,
  iconClassName,
  ...props
}: {
  children: React.ReactNode
  className?: string
  href: string
  icon: LucideIcon
  iconClassName?: string
} & React.ComponentProps<typeof Link>) {
  return (
    <StageCardLink
      href={href}
      className={cn(
        'flex aspect-square flex-col justify-between p-3 sm:p-4 min-w-20',
        className,
      )}
      {...props}
    >
      <div className="flex justify-end">
        <Icon
          size="1.5rem"
          strokeWidth={1.5}
          className={cn(
            'text-zinc-600 transition-[colors,scale] duration-200 group-hover:scale-110',
            iconClassName ?? 'group-hover:text-primary',
          )}
        />
      </div>
      <div>
        <span className="block text-sm sm:text-base font-medium tracking-tight text-zinc-400 group-hover:text-zinc-50 transition-colors">
          {children}
        </span>
      </div>
    </StageCardLink>
  )
}

export function SmallStageCardLink({
  children,
  href,
  ...props
}: {
  children: React.ReactNode
  href: string
} & Omit<StageCardLinkProps, 'href'>) {
  return (
    <StageCardLink
      href={href}
      isExternal
      className="flex flex-1 items-center justify-between px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-zinc-400"
      {...props}
    >
      <span className="font-medium group-hover:text-zinc-50 transition-colors">
        {children}
      </span>
      <LucideMoveUpRight
        size="1rem"
        strokeWidth={1.5}
        className="text-zinc-600 transition-[transform,translate,color] duration-300 ease-in-out group-hover:text-zinc-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </StageCardLink>
  )
}
