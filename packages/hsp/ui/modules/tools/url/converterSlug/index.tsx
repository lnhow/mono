'use client'
import {
  Button,
  Form,
  Input,
  TextField,
  Tooltip,
  TooltipTrigger,
} from 'react-aria-components'
import { nsToolURL } from '../const'
import { useTranslation } from '@i18n/client'
import { MdCheck, MdCopyAll } from 'react-icons/md'
import { Controller, useForm } from 'react-hook-form'
import { useCopyToClipboard } from 'usehooks-ts'
import { useCallback, useEffect, useRef } from 'react'
import { toSlug } from './utils'

export type TConverterSlugForm = {
  textToSlug: string
  slug: string
}

export default function ConverterSlug() {
  const { t } = useTranslation(nsToolURL)
  const timeoutRef = useRef<number | null>(null)
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      textToSlug: '',
      slug: '',
    },
  })
  const [copiedText, copy] = useCopyToClipboard()

  const delayResetCopy = useCallback(() => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      copy('')
    }, 3000)
  }, [copy])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [])

  const onSubmit = (data: TConverterSlugForm) => {
    const slug = toSlug(data.textToSlug)
    setValue('slug', slug)
    copy(slug)
    delayResetCopy()
  }

  const onCopy = useCallback(() => {
    copy(getValues('slug'))
    timeoutRef.current = window.setTimeout(() => {
      copy('')
    }, 200)
    delayResetCopy()
  }, [copy, getValues, delayResetCopy])

  return (
    <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-light">{t('title-slug')}</h2>
      <Controller
        control={control}
        name="textToSlug"
        render={({ field }) => {
          return (
            <TextField
              {...field}
              aria-label={t('input-slug')}
              isRequired
              className="input input-bordered w-full flex items-center gap-2"
            >
              <Input
                className="grow bg-transparent"
                placeholder={t('input-slug')}
              />
              {/* <FieldError /> */}
            </TextField>
          )
        }}
      />
      <Button className="btn btn-sm btn-primary" type="submit">
        {t('btn-slug')}
      </Button>
      <Controller
        control={control}
        name="slug"
        aria-label={t('placeholder-slug')}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              type="text"
              isReadOnly
              isDisabled
              className="input input-bordered w-full flex items-center gap-2 bg-base-200"
            >
              <Input
                className="grow bg-transparent"
                placeholder={t('placeholder-slug')}
              />
              <TooltipTrigger delay={200}>
                <Button
                  className="btn btn-square btn-sm"
                  isDisabled={!field.value}
                  onPress={onCopy}
                >
                  {copiedText ? <MdCheck className="icon-md" /> : <MdCopyAll className="icon-md" />}
                </Button>
                <Tooltip
                  className="bg-base-200 shadow-md py-1 px-3 rounded"
                  placement="bottom"
                >
                  {copiedText ? t('copied') : t('copy')}
                </Tooltip>
              </TooltipTrigger>
            </TextField>
          )
        }}
      />
    </Form>
  )
}
