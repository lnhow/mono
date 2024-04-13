import classNames from '@hsp/ui/utils/classNames'
import { PropsWithChildren, memo } from 'react'
import { useWatch } from 'react-hook-form'

export const BackgroundPreview = memo(function BackgroundPreview({
  children,
}: PropsWithChildren) {
  const background = useWatch({ name: 'background' })

  return (
    <div
      style={{ background }}
      className="pt-8 h-full rounded-xl lg:rounded-none"
    >
      <div className="flex flex-col items-center justify-center">
        <TextPreview variant="bigText" />
        <TextPreview variant="smallText" />
      </div>
      {children}
    </div>
  )
})

export type TextPreview = {
  variant: 'bigText' | 'smallText'
}

export const StyleTextPreview = {
  bigText: 'text-3xl',
  smallText: 'text-md',
} as const

export const TextPreview = memo(function TextPreview({
  variant,
}: TextPreview) {
  const text = useWatch({ name: variant })
  const foreground = useWatch({ name: 'foreground' })

  return (
    <div className='flex flex-col my-4'>
      <p style={{ color: foreground }} className={classNames(StyleTextPreview[variant], 'mb-2')}>
        {text}
      </p>
      <ConstrastScore variant={variant} />
    </div>
  )
})

export const StyleConstrastScore = {
  bigText: 'text-3xl',
  smallText: 'text-md',
} as const

export const ConstrastScore = memo(function ConstrastScore({ variant }: TextPreview ) {
  const foreground = useWatch({ name: 'foreground' })

  return (
    <div style={{ color: foreground }} className={classNames(StyleConstrastScore[variant], 'font-bold self-end')}>1:1111</div>
  )
})
