import { ButtonLink } from '@hsp/ui/src/components/base/button'
import Tooltip from '@hsp/ui/src/components/base/tooltip'
import { LuGithub } from 'react-icons/lu'

export default function PersonalGithubLink() {
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
