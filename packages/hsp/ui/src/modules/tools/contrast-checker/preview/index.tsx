import classNames from '@hsp/ui/utils/classNames'
import {
  PropsWithChildren,
  memo,
  useDeferredValue,
  useEffect,
  useState,
} from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { calcContrastRatio, isContrastRatioPass } from '../contrastUtils'
import { LuCheck, LuX, LuInfo } from 'react-icons/lu'
// import { Tooltip, TooltipTrigger, Button } from 'react-aria-components'
import { ValidationRules } from '../const'
import cn from '@hsp/ui/src/utils/cn'
import { Button } from '@hsp/ui/src/components/base/button'
import Tooltip from '@hsp/ui/src/components/base/tooltip'

export const BackgroundPreview = memo(function BackgroundPreview({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const background = useWatch({ name: 'background' })
  const backgroundDeferred = useDeferredValue(background)

  return (
    <div
      style={{ background: backgroundDeferred }}
      className={cn('pt-8 h-full rounded-xl lg:rounded-none', className)}
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

export const TextPreview = memo(function TextPreview({ variant }: TextPreview) {
  const foreground = useWatch({ name: 'foreground' })
  const foregroundDeferred = useDeferredValue(foreground)
  const { setValue } = useFormContext()

  return (
    <div className="flex flex-col my-4">
      <Controller
        name={variant}
        rules={ValidationRules[variant]}
        render={({ field }) => {
          return (
            <p
              // contentEditable
              spellCheck="false"
              style={{ color: foregroundDeferred }}
              className={classNames(StyleTextPreview[field.name], 'mb-2')}
              {...field}
              onInput={(e) => {
                setValue(variant, (e.target as HTMLDivElement).innerText)
              }}
            >
              {field.value}
            </p>
          )
        }}
      />
      <ContrastScore variant={variant} />
    </div>
  )
})

export const StyleContrastScore = {
  bigText: 'text-3xl',
  smallText: 'text-md',
} as const

export const ContrastScore = memo(function ContrastScore({
  variant,
}: TextPreview) {
  const foreground = useWatch({ name: 'foreground' })
  const background = useWatch({ name: 'background' })
  const foregroundDeferred = useDeferredValue(foreground)
  const backgroundDeferred = useDeferredValue(background)

  const [ratioRating, setRatioRating] = useState({
    contrastRatio: 1,
    isPass: false,
  })

  useEffect(() => {
    // updateRatioRating(foregroundDeferred, backgroundDeferred, variant)
    const contrastRatio = +calcContrastRatio(
      foregroundDeferred,
      backgroundDeferred,
    ).toFixed(2)
    setRatioRating({
      contrastRatio,
      isPass: isContrastRatioPass(contrastRatio, variant === 'bigText'),
    })
  }, [foregroundDeferred, backgroundDeferred, variant])

  return (
    <div
      className={classNames(
        StyleContrastScore[variant],
        'font-bold self-end bg-base-200/70 backdrop:blur-sm ps-3 pe-1 py-1 rounded-md flex items-center gap-4',
      )}
    >
      {ratioRating.isPass ? (
        <LuCheck className="font-extrabold text-success" />
      ) : (
        <LuX className="font-extrabold text-error" />
      )}
      <div className="flex items-center gap-4">
        {ratioRating.contrastRatio}:1
        <Tooltip
          label={
            variant === 'bigText' ? 'Pass if value > 3' : 'Pass if value > 4.5'
          }
        >
          <Button size="icon" variant="ghost">
            <LuInfo />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
})
