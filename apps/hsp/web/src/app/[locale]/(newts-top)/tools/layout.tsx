import { BaseLayoutProps } from '@hsp/ui/layouts/types'
import { default as BaseToolsLayout } from '@hsp/ui/modules/tools/layout'

export default function ToolsLayout({ children }: BaseLayoutProps) {
  return <BaseToolsLayout>{children}</BaseToolsLayout>
}
