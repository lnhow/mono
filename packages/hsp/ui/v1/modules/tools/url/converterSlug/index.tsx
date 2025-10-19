'use client'
import {
  Button,
  Form,
  Input,
  TextField,
} from 'react-aria-components'
import { nsToolURL } from '../const'
import { useTranslation } from '@i18n/client'
import { Controller, useForm } from 'react-hook-form'
import { useCopyToClipboard } from 'usehooks-ts'
import { toSlug } from './utils'
import ButtonCopy from '@hsp/ui/components/app/button/ButtonCopy'

export type TConverterSlugForm = {
  textToSlug: string
  slug: string
}

export default function ConverterSlug() {
  const { t } = useTranslation(nsToolURL)

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      textToSlug: '',
      slug: '',
    },
  })
  const [, copy] = useCopyToClipboard()

  const onSubmit = (data: TConverterSlugForm) => {
    const slug = toSlug(data.textToSlug)
    setValue('slug', slug)
    copy(slug)
  }

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
              className="input input-bordered w-full flex items-center gap-2 bg-base-200 pr-2"
            >
              <Input
                className="grow bg-transparent"
                placeholder={t('placeholder-slug')}
              />
              <ButtonCopy textToCopy={field.value} disabled={!field.value} />
            </TextField>
          )
        }}
      />
    </Form>
  )
}
