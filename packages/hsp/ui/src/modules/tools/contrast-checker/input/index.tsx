import { Controller } from 'react-hook-form'
import { HsColorPicker } from '../../../../components/app/input/color-picker'
import ButtonGenLinkContrast from './ButtonGenUrl'

export function ColorInput() {
  return (
    <div className="flex flex-col justify-center items-center mt-20 none [view-transition-name:none]">
      <div className="bg-base-200/70 backdrop:blur-sm shadow-md rounded-lg p-4">
        <div className="max-w-lg flex flex-wrap gap-4 mb-4">
          <div className="flex-1 flex-shrink-0 flex flex-col min-w-[250px]">
            <label htmlFor="background" className="mb-2">
              Background
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
              Foreground
            </label>
            <Controller
              name="foreground"
              render={({ field }) => {
                return <HsColorPicker {...field} />
              }}
            />
          </div>
        </div>
        <ButtonGenLinkContrast />
      </div>
    </div>
  )
}
