import { buttonVariants } from '@folio/ui/components/button'
import { cn, type VariantProps } from '@folio/ui/lib/utils'
import Link from 'next/link'
import React from 'react'

export interface ButtonLinkProps
  extends
    React.ComponentProps<typeof Link>,
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

export default ButtonLink
