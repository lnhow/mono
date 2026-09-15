import cn from '@hsp/ui/utils/cn'
import type { LucideIcon } from 'lucide-react'
import { LucideMoveUpRight } from 'lucide-react'
import type React from 'react'

export interface StageCardLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  isExternal?: boolean
  disabled?: boolean
}

export function StageCardLink({
  className,
  isExternal,
  disabled,
  children,
  href,
  ...props
}: StageCardLinkProps) {
  if (disabled) {
    return (
      <div
        aria-disabled="true"
        className={cn(
          'group relative rounded-2xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-xs shadow-sm opacity-40 cursor-not-allowed select-none pointer-events-none',
          className,
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <a
      href={href}
      className={cn(
        'group relative transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800/80 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-xs transform-gpu shadow-sm',
        className,
      )}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  )
}

export function BigStageCardLink({
  children,
  className,
  href,
  icon: Icon,
  iconClassName,
  disabled,
  ...props
}: {
  children: React.ReactNode
  className?: string
  href?: string
  icon: LucideIcon
  iconClassName?: string
  disabled?: boolean
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>) {
  return (
    <StageCardLink
      href={href}
      disabled={disabled}
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
            'text-primary-100 transition-[colors,scale] duration-200',
            !disabled && 'group-hover:scale-110',
            !disabled && (iconClassName ?? 'group-hover:text-primary-300'),
          )}
        />
      </div>
      <div>
        <span
          className={cn(
            'block text-sm sm:text-base font-medium tracking-tight text-zinc-400',
            !disabled && 'group-hover:text-zinc-50 transition-colors',
          )}
        >
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
