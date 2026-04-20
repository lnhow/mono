import { ButtonLink } from '@hsp/ui/components/button'
import Tooltip from '@hsp/ui/components/tooltip'
import { LuGithub } from 'react-icons/lu'

export default function PersonalGithub() {
  return (
    <ButtonLink
      href="https://github.com/lnhow"
      target="_blank"
      variant="outline"
    >
      <LuGithub />
      <span>GitHub</span>
    </ButtonLink>
  )
}

export function PersonalGithubIcon() {
  return (
    <Tooltip label="My GitHub">
      <ButtonLink
        href="https://github.com/lnhow"
        target="_blank"
        variant="outline"
        size="icon"
      >
        <LuGithub />
        <span className="sr-only">My GitHub</span>
      </ButtonLink>
    </Tooltip>
  )
}
