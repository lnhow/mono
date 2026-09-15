import React, { ComponentPropsWithRef } from 'react'
import cn from '@hsp/ui/utils/cn'

const Card = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<'div'>) => (
  <div
    className={cn('rounded-lg border bg-base-200 shadow-sm', className)}
    {...props}
  >
    {children}
  </div>
)

Card.Title = function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'p-4',
        className,
      )}
    >
      {children}
    </div>
  )
}

Card.Body = function CardBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'px-4 pb-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Card
