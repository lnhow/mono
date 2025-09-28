import { default as HspLink } from '@hsp/ui/src/components/app/link'

export default function Link({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#') || href.startsWith(window.location.origin))

  if (isInternalLink) {
    return (
      <HspLink {...props} href={href || ''}>
        {children}
      </HspLink>
    )
  }

  return (
    <a target='_blank' rel='noopener noreferrer' {...props}>
      {children}
    </a>
  )
}