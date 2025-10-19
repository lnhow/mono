import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hsp/ui/components/base/popover'
import { PlayerButton } from '../_base/button'
import { Button } from '@hsp/ui/components/base/button'
import { useHTMLElState } from '@hsp/ui/utils/react/use-html-el-state'
import { PlayerBaseSubCompProps, TOOLTIPS } from '../types'
import Tooltip from '@hsp/ui/components/base/tooltip'

export const PlaybackRates = [0.25, 0.5, 1, 1.5, 1.75, 2]

export default function ButtonPlayrate({ getVideoEl }: PlayerBaseSubCompProps) {
  const playbackRate = useHTMLElState(
    getVideoEl,
    ['ratechange'],
    () => {
      return getVideoEl()?.playbackRate || 1
    },
    () => 1,
  )

  const handleRateChange = (rate: number) => {
    const videoEl = getVideoEl()
    if (videoEl) {
      videoEl.playbackRate = rate
    }
  }

  return (
    <Popover>
      <Tooltip label={TOOLTIPS.playbackRate}>
        <PopoverTrigger asChild>
          <PlayerButton className="text-xs">{playbackRate}x</PlayerButton>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent className="w-fit p-0" side="top">
        <ul className="flex flex-col gap-2">
          {PlaybackRates.map((rate) => (
            <li key={rate}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start data-[active]:bg-base-200"
                onClick={() => handleRateChange(rate)}
                data-active={playbackRate === rate ? '' : undefined}
              >
                {rate}x
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
