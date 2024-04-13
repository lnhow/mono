import { useTranslation } from '@i18n/client'
import { memo } from 'react'
import { Controller } from 'react-hook-form'
import { nsToolsConstrast } from '../const'
import { HsColorPicker } from '../../../../components/common/input/HsColorPicker'
import ButtonGenLinkConstrast from './ButtonGenUrl'

export const ColorInput = memo(function ColorInput() {
  const { t } = useTranslation(nsToolsConstrast)

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="bg-base-200/70 backdrop:blur-sm shadow-md rounded-lg p-4">
        <div className="max-w-lg flex flex-wrap gap-4 mb-4">
          <div className="flex-1 flex-shrink-0 flex flex-col min-w-[250px]">
            <label htmlFor="background" className="mb-2">
              {t('label-background')}
            </label>
            <Controller
              name="background"
              render={({ field }) => {
                return <HsColorPicker {...field} />
              }}
            />
          </div>
          <div className="flex-1 flex-shrink-0 flex flex-col min-w-[250px]">
            <label htmlFor="foreground" className="mb-2">
              {t('label-foreground')}
            </label>
            <Controller
              name="foreground"
              render={({ field }) => {
                return <HsColorPicker {...field} />
              }}
            />
          </div>
        </div>
        <ButtonGenLinkConstrast />
      </div>
    </div>
  )
})
