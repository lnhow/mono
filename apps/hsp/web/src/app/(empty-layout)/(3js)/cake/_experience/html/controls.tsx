'use client'

import { cakeAtom, ECakeScene, encodeCakeURL, SCENE_CONFIG, TEXT } from '../_state'
import { Label } from '@hsp/ui/components/base/label'
import { useAtom, useAtomValue } from 'jotai'
import cn from '@hsp/ui/utils/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hsp/ui/components/base/select'
import { Button } from '@hsp/ui/components/base/button'
import { useMemo } from 'react'
import { useCopyToClipboard } from '@hsp/ui/components/app/button/ButtonCopy'

export default function Controls({ className }: { className?: string }) {
  const [cake, setCake] = useAtom(cakeAtom)
  const onChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCake((prev) => ({ ...prev, message: event.target.value }))
  }

  const onChangeCake = (value: ECakeScene) => {
    setCake((prev) => ({ ...prev, scene: value }))
  }

  if (!cake.edit) {
    return null
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
            maxLength={TEXT.MAX_LENGTH}
            onChange={onChangeMessage}
            value={cake.message}
          />
        </div>
        <ShareButton className="w-full mt-3" />
      </form>
    </section>
  )
}

function ShareButton({ className }: { className?: string }) {
  const value = useAtomValue(cakeAtom)
  const [isCopied, copy] = useCopyToClipboard()
  const url = useMemo(() => {
    if (typeof window === 'undefined') {
      return ''
    }

    const host = window.location.origin
    return `${host}/cake?${encodeCakeURL(value.message, value.scene)}`
  }, [value])

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => copy(url)}
      className={className}
    >
      {isCopied ? 'Copied!' : 'Share'}
    </Button>
  )
}
