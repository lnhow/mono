import { buttonVariants } from '@folio/ui/components/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@folio/ui/components/card'

import { experiments } from '@/lib/experiments'

export function ExperimentList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {experiments.map((experiment) => (
        <Card key={experiment.slug}>
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {experiment.category.replace('-', ' ')}
            </p>
            <CardTitle>{experiment.title}</CardTitle>
            <CardDescription>{experiment.description}</CardDescription>
            <div className="pt-3">
              <a
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
                href={experiment.href}
              >
                Open experiment
              </a>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
