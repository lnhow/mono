import { useAtomValue } from "jotai"
import { cakeSceneAtom, SCENE_CONFIG } from "../_state"
import Link from "@hsp/ui/src/components/app/link"

export default function Credit({ className }: { className?: string }) {
  const scene = useAtomValue(cakeSceneAtom)
  const credit = SCENE_CONFIG[scene].model.credit

  return (
    <div className={className}>
      <p className="text-xs text-fore-100">
        <Link href={credit.url} target="_blank" rel="noopener noreferrer" className="font-bold">
          {credit.name}
        </Link>
        {' '}by {credit.author}, {credit.license}.
      </p>
    </div>
  )
}
