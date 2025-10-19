import { Button, ButtonProps } from '@hsp/ui/components/base/button'

export function PlayerButton(props: Omit<ButtonProps, 'variant' | 'size'>) {
  return <Button {...props} variant="ghost" size="icon" />
}
