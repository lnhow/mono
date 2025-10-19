import { default as HspLink } from '@hsp/ui/utils/app/link'

export default function Link({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternalLink =
    href && !href.startsWith('http') && !href.startsWith('mailto:')

  if (isInternalLink) {
    return (
      <HspLink {...props} href={href || ''}>
        {children}
      </HspLink>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...props} href={href}>
      {children}
    </a>
  )
}
