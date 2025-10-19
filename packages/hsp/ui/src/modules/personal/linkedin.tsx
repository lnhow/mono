import { ButtonLink } from '@hsp/ui/components/base/button'
import { LuLinkedin } from 'react-icons/lu'

export default function PersonalLinkedinLink() {
  return (
    <ButtonLink
      href="https://linkedin.com/in/nguyenhaole7f8/"
      target="_blank"
      variant="outline"
    >
      <LuLinkedin />
      <span>LinkedIn</span>
    </ButtonLink>
  )
}
