import { ButtonLink } from '@hsp/ui/src/components/base/button'
import { LOBBY_URL } from '../../../utils'

export default function ButtonLeaveRoom() {
  return (
    <ButtonLink href={LOBBY_URL} variant="destructive">
      Leave Room
    </ButtonLink>
  )
}
