import * as React from 'react'
import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'

import Link from '@hsp/ui/src/components/app/link'

import cn from '@hsp/ui/src/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-fore-400 text-base-500 shadow hover:bg-fore-400/80',
        destructive:
          'bg-error-100 text-error-300 shadow-sm hover:bg-error-100/80',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        primary:
          'bg-primary-100 text-primary-300 shadow hover:bg-primary-100/80',
        secondary:
          'bg-secondary-100 text-secondary-300 shadow-sm hover:bg-secondary-100/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      // @ts-expect-error Fixme: Correct typescript
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          'cursor-pointer disabled:cursor-not-allowed',
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export interface ButtonLinkProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof buttonVariants> {}

const ButtonLink = React.forwardRef<
  React.ComponentRef<typeof Link>,
  ButtonLinkProps
>(function ButtonLink({ className, variant, size, ...props }, ref) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, size, className }),
        'cursor-pointer disabled:cursor-not-allowed',
      )}
      ref={ref}
      {...props}
    />
  )
})

export { Button, ButtonLink, buttonVariants }
