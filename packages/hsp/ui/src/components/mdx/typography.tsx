import cn from '@hsp/ui/src/utils/cn'
import { ReactNode } from 'react'

interface MarkdownTypographyProps {
  children: ReactNode
  className?: string
}

export default function MarkdownTypography({
  children,
  className,
}: MarkdownTypographyProps) {
  return (
    <div
      className={cn(
        // Base styles
        'text-fore-300',
        // Headings
        '[&_h1]:font-light [&_h1]:text-fore-500 [&_h1]:tracking-tight [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-4xl [&_h1:first-child]:mt-0',
        '[&_h2]:font-light [&_h2]:text-fore-500 [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-3xl [&_h1:first-child]:mt-0 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-base-500',
        '[&_h3]:font-light [&_h3]:text-fore-500 [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-2xl',
        '[&_h4]:font-light [&_h4]:text-fore-500 [&_h4]:tracking-tight [&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:text-xl',
        '[&_h5]:font-light [&_h5]:text-fore-500 [&_h5]:tracking-tight [&_h5]:mt-8 [&_h5]:mb-3 [&_h5]:text-lg',
        '[&_h6]:font-light [&_h6]:text-fore-500 [&_h6]:tracking-tight [&_h6]:mt-8 [&_h6]:mb-3 [&_h6]:text-base',
        // Paragraphs
        '[&_p]:leading-7 [&_p]:mt-4',
        // Links
        '[&_a]:text-primary-400 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary-400/80 [&_a]:transition-colors',
        // Lists
        '[&_ul]:list-disc [&_ul]:my-6 [&_ul]:ml-6',
        '[&_ol]:list-decimal [&_ol]:my-6 [&_ol]:ml-6',
        '[&_li]:mt-2',
        // Blockquotes
        '[&_blockquote]:text-fore-300 [&_blockquote]:font-light [&_blockquote]:border-l-2 [&_blockquote]:border-fore-200 [&_blockquote]:pl-6 [&_blockquote]:py-3 [&_blockquote]:my-6',
        '[&_blockquote_>_p:before]:content-none [&_blockquote_>_p:after]:content-none [&_blockquote_>_p]:my-1',
        // Inline code
        '[&_code]:relative [&_code]:bg-base-200 [&_code]:rounded-md [&_code]:px-0.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm',
        // Block code
        '[&_pre]:relative [&_pre]:bg-base-200 [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-sm [&_pre]:border [&_pre]:border-base-200',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-mono [&_pre_code]:text-sm',
        '[&_figure]:my-6 [&_figure_figcaption]:text-xs [&_figure_figcaption]:px-2 [&_figure_figcaption]:py-1 [&_figure_pre]:m-0',
        '[&_figure_[data-rehype-pretty-code-title]]:text-sm [&_figure_[data-rehype-pretty-code-title]]:px-2 [&_figure_[data-rehype-pretty-code-title]]:py-1',
        // Block code
        // Inline code
        // Tables
        // Images
        '[&_img]:rounded-md [&_img]:my-6 [&_img]:mx-auto',
        // Tables
        '[&_table]:w-full [&_table]:my-6 [&_table]:overflow-y-auto [&_table]:border-collapse',
        '[&_table_tr]:even:bg-base-300 [&_table_tr]:m-0 [&_table_tr]:border-t [&_table_tr]:p-0',
        '[&_table_th]:border [&_table_th]:border-fore-100 [&_table_th]:bg-base-500 [&_table_th]:px-4 [&_table_th]:py-2 [&_table_th]:text-left [&_table_th]:font-bold [&_table_th[align=center]]:text-center [&_table_th[align=right]]:text-right',
        '[&_table_td]:border [&_table_td]:border-fore-100 [&_table_td]:px-4 [&_table_td]:py-2 [&_table_td]:text-left [&_table_td[align=center]]:text-center [&_table_td[align=right]]:text-right',
        // Horizontal Rule
        '[&_hr]:border-fore-500 [&_hr]:my-8',

        // Strong/Bold
        '[&_strong]:font-semibold',
        '[&_b]:font-semibold',
        // Emphasis/Italic
        '[&_em]:italic',
        '[&_i]:italic',
        // Small text
        "[&_small]:text-sm [&_small]:font-medium [&_small]:leading-none",
        className,
      )}
    >
      {children}
    </div>
  )
}
