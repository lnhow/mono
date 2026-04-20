import ButtonCopy from '@hsp/ui/components/button-copy'
import cn from '@hsp/ui/utils/cn'
import { startTransition, useEffect, useState } from 'react'
import {
  type Color,
  Input,
  Label,
  parseColor,
  TextField,
} from 'react-aria-components'
import { useDebounceCallback } from 'usehooks-ts'

export default function PickerColorField({
  onChange,
  ...props
}: {
  label: string
  value: string
  disabled?: boolean
  readOnly?: boolean
  onChange?: (value: Color) => void
  className?: string
}) {
  const [color, setColor] = useState(props.value)

  useEffect(() => {
    startTransition(() => {
      setColor(props.value)
    })
  }, [props.value])

  const updateParentColor = useDebounceCallback((val: string) => {
    if (!onChange) {
      return
    }
    try {
      const color = parseColor(val)
      onChange(color)
    } catch {
      // ignore
    }
  }, 300)

  const handleChange = (val: string) => {
    setColor(val)
    updateParentColor(val)
  }

  return (
    <TextField
      name={props.label}
      aria-label={props.label}
      value={color}
      className={cn('flex flex-col gap-1', props.className)}
      onChange={handleChange}
      isReadOnly={props.readOnly}
    >
      <Label className="label p-0">{props.label}</Label>
      <div className="input input-bordered flex items-center pr-2">
        <Input className="grow bg-transparent" placeholder={props.label} />
        <ButtonCopy textToCopy={color} />
      </div>
    </TextField>
  )
}
