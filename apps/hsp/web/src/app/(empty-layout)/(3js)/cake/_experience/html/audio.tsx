import { useEffect, useRef } from 'react'
import { BGM } from '../_const'
import { Button } from '@hsp/ui/components/button'
import { useHTMLElState } from '@hsp/ui/utils/react/use-html-el-state'
import { LuPause, LuPlay } from 'react-icons/lu'

export default function Audio({ className }: { className?: string }) {
  const elAudio = useRef<HTMLAudioElement>(null)
  const isPlaying = useHTMLElState(
    () => elAudio.current,
    ['play', 'pause'],
    () => {
      return elAudio.current?.paused ? false : true
    },
    () => false,
  )

  useEffect(() => {
    const handleAutoplay = () => {
      elAudio.current?.play()
      document.removeEventListener('click', handleAutoplay)
    }
    document.addEventListener('click', handleAutoplay)
    return () => {
      document.removeEventListener('click', handleAutoplay)
    }
  }, [])

  return (
    <div className={className}>
      <Button
        size="icon"
        variant="ghost"
        className="bg-base-100/10"
        onClick={() => {
          if (elAudio.current?.paused) {
            elAudio.current?.play()
          } else {
            elAudio.current?.pause()
          }
        }}
      >
        <span className="sr-only">Play background music</span>
        {isPlaying ? <LuPause /> : <LuPlay />}
      </Button>
      <audio ref={elAudio} autoPlay loop>
        <source src={BGM.SRC} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
