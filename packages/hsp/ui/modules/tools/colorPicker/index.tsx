'use client'
import { useCallback, useState } from 'react'
import {
  ColorSlider,
  ColorSwatch,
  ColorThumb,
  SliderTrack,
  Switch,
  parseColor,
} from 'react-aria-components'
import { useTranslation } from '@i18n/client'
import { nsToolColorPicker } from './const'
import PickerColorField from './components/PickerColorField'
import HsColorArea from './components/HsColorArea'
import HsColorSlider from './components/HsColorSlider'
import cn from '@hsp/ui/src/utils/cn'
import HsColorWheel from './components/HsColorWheel'

export default function PageToolColorPicker() {
  const { t } = useTranslation(nsToolColorPicker)
  const [color, setColor] = useState(parseColor('rgb(255, 255, 255)'))
  const [isAlpha, setIsAlpha] = useState(false)

  const onToggleAlpha = useCallback((alpha: boolean) => {
    setIsAlpha(alpha)
    if (!alpha) {
      setColor((color) => {
        return parseColor(color.toString('rgb')) // Remove alpha
      })
    }
  }, [])

  return (
    <section>
      <h1 className="text-2xl text-center font-extralight">{t('title')}</h1>
      <div id="color-picker" className="w-full bg-base-200 mt-4 rounded">
        <section className="flex flex-col md:flex-row gap-2 md:gap-0">
          <ColorSwatch
            color={color}
            className="w-full md:w-1/2 h-48 rounded md:rounded-e-none"
          />
          <HsColorArea
            value={color.toFormat('hsl')}
            onChange={setColor}
            className="h-48 w-full md:w-1/2 md:rounded-s-none"
            xChannel="saturation"
            yChannel="lightness"
          />
        </section>

        <section className="p-4">
          <div className="flex items-center gap-6 md:gap-6">
            <HsColorWheel
              value={color.toFormat('hsl')}
              onChange={setColor}
              innerRadius={48}
              outerRadius={64}
            />
            <div className="flex-1">
              <div className="mb-6">
                <ColorSlider
                  channel="hue"
                  value={color.toFormat('hsl')}
                  onChange={setColor}
                  className="my-2"
                >
                  <SliderTrack className="w-full h-10 rounded">
                    <ColorThumb className="w-3 h-12 top-5 rounded-full shadow border border-white" />
                  </SliderTrack>
                </ColorSlider>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 mt-6">
                <ColorSlider
                  channel="alpha"
                  value={color.toFormat('hsla')}
                  onChange={setColor}
                  className="flex-1 w-full"
                  isDisabled={!isAlpha}
                >
                  <SliderTrack
                    className={cn(
                      'w-full h-6 rounded transition-opacity',
                      !isAlpha && 'opacity-25'
                    )}
                  >
                    <ColorThumb className="w-2 h-8 top-3 rounded-full shadow border border-white" />
                  </SliderTrack>
                </ColorSlider>
                <Switch
                  isSelected={isAlpha}
                  onChange={onToggleAlpha}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={isAlpha}
                    readOnly
                    name="toggleAlpha"
                    className="indicator toggle"
                  />
                  {t('alpha')}
                </Switch>
              </div>
            </div>
          </div>

          <div className="my-4 flex flex-wrap gap-4 justify-around">
            <PickerColorField
              label={t('hex')}
              value={isAlpha ? color.toString('hexa') : color.toString('hex')}
              className="flex-1"
              onChange={setColor}
            />
            <PickerColorField
              label={t('rgb')}
              value={isAlpha ? color.toString('rgba') : color.toString('rgb')}
              className="flex-1"
              onChange={setColor}
            />
            <PickerColorField
              label={t('hsl')}
              value={isAlpha ? color.toString('hsla') : color.toString('hsl')}
              className="flex-1"
              onChange={setColor}
            />
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[10rem]">
              <HsColorSlider
                channel="red"
                value={color.toFormat('rgba')}
                onChange={setColor}
              />
              <HsColorSlider
                channel="green"
                value={color.toFormat('rgba')}
                onChange={setColor}
              />
              <HsColorSlider
                channel="blue"
                value={color.toFormat('rgba')}
                onChange={setColor}
              />
            </div>
            <div className="flex-1">
              <HsColorSlider
                channel="hue"
                value={color.toFormat('hsla')}
                onChange={setColor}
              />
              <HsColorSlider
                channel="saturation"
                value={color.toFormat('hsla')}
                onChange={setColor}
              />
              <HsColorSlider
                channel="lightness"
                value={color.toFormat('hsla')}
                onChange={setColor}
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
