import { getTranslation } from '@i18n/server'
import { nsToolURL } from './const'
import ConverterSlug from './converterSlug'

export default async function PageToolURL() {
  const { t } = await getTranslation(nsToolURL)

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
