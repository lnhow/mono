import { Badge } from '@folio/ui/components/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@folio/ui/components/card'
import Link from 'next/link'

interface PostCardProps {
  post: {
    slug: string
    title: string
    description: string
    createdAt: Date
    updatedAt?: Date
    tags: readonly string[]
    readingTime: number
  }
}

export function PostCard({ post }: PostCardProps) {
  const effectiveDate = post.updatedAt ?? post.createdAt

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={effectiveDate.toISOString()}>
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
            }).format(effectiveDate)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{Math.max(1, Math.ceil(post.readingTime))} min read</span>
        </div>
        <CardTitle className="text-xl">
          <Link className="hover:underline" href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      {post.tags.length > 0 ? (
        <CardContent className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </CardContent>
      ) : null}
    </Card>
  )
}
