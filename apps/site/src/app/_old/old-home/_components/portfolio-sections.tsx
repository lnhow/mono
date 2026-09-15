import { Badge } from '@folio/ui/components/badge'
import { buttonVariants } from '@folio/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@folio/ui/components/card'

import { getStableProjects, portfolio } from '@/lib/portfolio'

export function PortfolioSections() {
  const stableProjects = getStableProjects()

  return (
    <div className="space-y-14">
      <section aria-labelledby="selected-projects-heading" className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Portfolio</p>
          <h2
            className="text-3xl font-semibold tracking-tight"
            id="selected-projects-heading"
          >
            Selected projects
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {stableProjects.map((project) => (
            <article key={project.id}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{project.status}</Badge>
                    <Badge variant="outline">{project.classification}</Badge>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul
                    aria-label={`${project.title} technologies`}
                    className="flex flex-wrap gap-2"
                  >
                    {project.technologies.map((technology) => (
                      <li key={technology}>
                        <Badge variant="outline">{technology}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <a
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                    href={project.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open project: {project.title}
                  </a>
                </CardFooter>
              </Card>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="skills-heading" className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Stack</p>
          <h2 className="text-3xl font-semibold tracking-tight" id="skills-heading">
            Skills
          </h2>
        </div>
        <ul className="flex flex-wrap gap-2">
          {portfolio.skills.map((skill) => (
            <li key={skill}>
              <Badge variant="outline">{skill}</Badge>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
