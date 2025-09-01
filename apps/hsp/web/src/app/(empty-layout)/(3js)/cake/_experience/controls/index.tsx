import { cakeAtom, ECakeScene, SCENE_CONFIG } from '../_state'
import { Label } from '@hsp/ui/src/components/base/label'
import { useAtom } from 'jotai'
import cn from '@hsp/ui/src/utils/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hsp/ui/src/components/base/select'

export default function Controls({ className }: { className?: string }) {
  const [cake, setCake] = useAtom(cakeAtom)
  const onChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCake((prev) => ({ ...prev, message: event.target.value }))
  }

  const onChangeCake = (value: ECakeScene) => {
    setCake((prev) => ({ ...prev, scene: value }))
  }

  return (
    <section className={cn('max-w-xl mx-auto', className)}>
      <form className="bg-base-100/60 m-2 p-3 rounded-md">
        <div>
          <Label htmlFor="cake" className="block mb-2">
            Cake
          </Label>
          <Select value={cake.scene} onValueChange={onChangeCake}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ECakeScene).map((cakeType) => (
                <SelectItem key={cakeType} value={cakeType}>
                  {SCENE_CONFIG[cakeType].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-3">
          <Label htmlFor="message" className="block mb-2">
            Message
          </Label>
          <textarea
            className="flex h-24 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            name="message"
            id="message"
            onChange={onChangeMessage}
            value={cake.message}
          />
        </div>
      </form>
    </section>
  )
}
