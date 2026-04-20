import Link from '@hsp/ui/components/link'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { BGM, cakeSceneAtom, SCENE_CONFIG } from '../_state'

export default function Credit({ className }: { className?: string }) {
  const scene = useAtomValue(cakeSceneAtom)
  const credits = useMemo(() => {
    return [SCENE_CONFIG[scene].model.credit, BGM.CREDIT]
  }, [scene])

  return (
    <div className={className}>
      {credits.map((credit, index) => (
        <p className="text-xs text-fore-100" key={index}>
          <Link
            href={credit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            {credit.name}
          </Link>{' '}
          by {credit.author}, {credit.license}.
        </p>
      ))}
    </div>
  )
}
