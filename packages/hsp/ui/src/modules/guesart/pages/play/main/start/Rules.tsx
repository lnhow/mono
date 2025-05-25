import { Button } from '@hsp/ui/src/components/base/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@hsp/ui/src/components/base/collapsible'

export default function Rules() {
  return (
    <div className="bg-base-100 rounded-lg m-4 shadow">
      <Collapsible>
        <CollapsibleTrigger className="w-full" asChild>
          <Button variant="secondary" className="bg-transparent">Game Rules</Button>
        </CollapsibleTrigger>
        <CollapsibleContent className='transition-all'>
          <div className="m-4 text-sm">
            <div>
              <h3 className="font-bold text-primary-400">✅ Correct Guess</h3>
              <ul className="ml-4 space-y-2">
                <li>Guesser: +10 points</li>
                <li>Drawer: +5 points per correct guesser</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-accent-400">
                ⏳ Time Bonus (Proportional)
              </h3>
              <ul className="ml-4 space-y-2">
                <li>Guesser: +1 point for every 25% of time remaining</li>
                <li className="text-xs">
                  Example:
                  <br />
                  60s round: 15s = +1, 30s = +2, 45s = +3
                  <br />
                  30s round: 7.5s = +1, 15s = +2, 22.5s = +3
                </li>
                <li>
                  Drawer: +1 point if word is guessed within first half of round
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-error-300">
                ❌ Incorrect / Unsolved Word
              </h3>
              <ul className="ml-4 space-y-2">
                <li>Drawer: -5 points</li>
                <li>Guesser: 0 points</li>
              </ul>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
