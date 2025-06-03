import { memo } from 'react'
import { roomRoundAtom } from '../../../../_state/store'
import { useAtomValue } from 'jotai'
import { useIsDrawer } from '../../../../_state/hooks'
import { resizeUnsplashImage } from '@hsp/ui/src/modules/guesart/utils'

export const Word = memo(function Word() {
  const { word, wordImg } = useAtomValue(roomRoundAtom)
  const isDrawer = useIsDrawer()

  return (
    <InternalWord word={word} wordImg={wordImg} isDrawer={isDrawer} />
  )
})

function InternalWord({
  word,
  isDrawer,
  wordImg,
}: {
  word: string
  isDrawer: boolean
  wordImg?: string
}) {
  const imgUrl = wordImg ? resizeUnsplashImage(wordImg, IMAGE_WIDTH) : ''

  return (
    <div className="flex items-center">
      {wordImg && (
        <div className="relative rounded-lg overflow-hidden border border-fore-200">
          <img src={imgUrl} alt={word} className="object-cover w-16 h-16" />
        </div>
      )}
      <div className="m-4">
        <p className="text-xs text-fore-300">{isDrawer ? 'Draw' : 'Guess'}</p>
        <p className="text-2xl text-fore-400">{word}</p>
      </div>
    </div>
  )
}

const IMAGE_WIDTH = 64 // px
