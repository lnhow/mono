import { useAtomValue } from "jotai"
import { BGM, cakeSceneAtom, SCENE_CONFIG } from "../_state"
import Link from "@hsp/ui/src/components/app/link"
import { useMemo } from "react"

export default function Credit({ className }: { className?: string }) {
  const scene = useAtomValue(cakeSceneAtom)
  const credits = useMemo(() => {
    return [
      SCENE_CONFIG[scene].model.credit,
      BGM.CREDIT
    ]
  }, [scene])

  return (
    <div className={className}>
      {credits.map((credit, index) => (
        <p className="text-xs text-fore-100" key={index}>
          <Link href={credit.url} target="_blank" rel="noopener noreferrer" className="font-bold">
            {credit.name}
          </Link>
          {' '}by {credit.author}, {credit.license}.
        </p>
      ))}
    </div>
  )
}
