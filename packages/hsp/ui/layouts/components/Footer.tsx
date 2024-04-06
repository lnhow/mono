import { getTranslation } from '@i18n/server'
import { nsLayoutCommon } from '../types'

export default async function Footer() {
  const { t } = await getTranslation(nsLayoutCommon)
  return (
    <footer className="bg-base-200">
      <div className="max-w-screen-2xl mx-auto p-4 flex justify-end">
        <div className="flex items-center">
          <p
            className="text-xs font-light"
            dangerouslySetInnerHTML={{
              __html: t('copyright', {
                year: new Date().getFullYear(),
                project: 'Newts',
                author:
                  '<a href="https://github.com/lnhow" class="font-extralight">haoln</a>',
                interpolation: { escapeValue: false },
              }),
            }}
          ></p>
        </div>
      </div>
    </footer>
  )
}
