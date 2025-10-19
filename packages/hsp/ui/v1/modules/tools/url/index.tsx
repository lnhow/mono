'use client'
import { nsToolURL } from './const'
import ConverterSlug from './converterSlug'
import { useTranslation } from '@i18n/client'

export default function PageToolURL() {
  const { t } = useTranslation(nsToolURL)

  return (
    <>
      <h1 className="text-2xl text-center font-extralight">{t('title')}</h1>
      <section className='w-full flex flex-col items-center mt-4'>
        <section className="max-w-lg w-full bg-base-200 p-4 rounded" id='slug-converter'>
          <ConverterSlug />
        </section>
      </section>
    </>
  )
}
