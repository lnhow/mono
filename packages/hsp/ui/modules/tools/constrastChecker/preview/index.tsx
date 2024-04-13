import classNames from '@hsp/ui/utils/classNames'
import {
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { calcContrastRatio, isContrastRatioPass } from '../contrastUtils'
import { debounce } from 'lodash'
import { MdCheck, MdClose, MdInfo } from 'react-icons/md'
import { Tooltip, TooltipTrigger, Button } from 'react-aria-components'
import { ValidationRules } from '../const'

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

export const TextPreview = memo(function TextPreview({ variant }: TextPreview) {
  const foreground = useWatch({ name: 'foreground' })
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
              style={{ color: foreground }}
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
      <ConstrastScore variant={variant} />
    </div>
  )
})

export const StyleConstrastScore = {
  bigText: 'text-3xl',
  smallText: 'text-md',
} as const

export const ConstrastScore = memo(function ConstrastScore({
  variant,
}: TextPreview) {
  const foreground = useWatch({ name: 'foreground' })
  const background = useWatch({ name: 'background' })

  const [ratioRating, setRatioRating] = useState({
    contrastRatio: 1,
    isPass: false,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateRatioRating = useCallback(
    debounce((foreground, background, variant) => {
      const contrastRatio = +calcContrastRatio(foreground, background).toFixed(
        2
      )
      setRatioRating({
        contrastRatio,
        isPass: isContrastRatioPass(contrastRatio, variant === 'bigText'),
      })
    }, 100),
    []
  )

  useEffect(() => {
    updateRatioRating(foreground, background, variant)
  }, [foreground, background, variant, updateRatioRating])

  return (
    <div
      className={classNames(
        StyleConstrastScore[variant],
        'font-bold self-end bg-base-200/70 backdrop:blur-sm px-3 py-1 rounded flex items-center gap-4'
      )}
    >
      {ratioRating.isPass ? (
        <MdCheck className="font-extrabold text-success" />
      ) : (
        <MdClose className="font-extrabold text-error" />
      )}
      <div className="flex items-center gap-4">
        {ratioRating.contrastRatio}:1
        <TooltipTrigger delay={200}>
          <Button>
            <MdInfo />
          </Button>
          <Tooltip
            placement="bottom"
            className={'bg-base-200 shadow-lg py-1 px-2'}
          >
            {variant === 'bigText' ? '> 3' : '> 4.5'}
          </Tooltip>
        </TooltipTrigger>
      </div>
    </div>
  )
})
