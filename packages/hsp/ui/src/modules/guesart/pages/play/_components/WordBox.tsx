import { resizeUnsplashImage } from '@hsp/ui/src/modules/guesart/utils'
import { TGameState } from '../_state/store'

const IMAGE_WIDTH = 256 // px

const WordBox = ({
  word,
  wordImg,
  title,
  className,
}: Pick<TGameState['round'], 'word' | 'wordImg'> & { title: string, className?: string }) => {
  const imgUrl = wordImg ? resizeUnsplashImage(wordImg, IMAGE_WIDTH) : ''

  return (
    <div className={className}>
      <h2 className="text-md text-fore-300">{title}</h2>
      <p className="text-4xl font-bold text-fore-500">{word}</p>
      {wordImg && (
        <div className="mt-4">
          <img
            src={imgUrl}
            alt={word}
            className="mx-auto rounded-lg outline outline-fore-200 w-full h-auto max-w-3xs object-cover aspect-square bg-base-200"
          />
        </div>
      )}
    </div>
  )
}

export default WordBox
