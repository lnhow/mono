import { describe, expect, it } from 'vitest'

import {
  getExperimentalProjectIds,
  getStableProjects,
  portfolio,
} from './portfolio'

describe('portfolio content', () => {
  it('uses unique stable project IDs', () => {
    const ids = getStableProjects().map(({ id }) => id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('uses HTTPS links for social profiles and stable projects', () => {
    for (const social of portfolio.socials) {
      expect(new URL(social.href).protocol).toBe('https:')
    }

    for (const project of getStableProjects()) {
      expect(new URL(project.href).protocol).toBe('https:')
    }
  })

  it('keeps experimental work out of stable projects', () => {
    const stableIds = new Set<string>(getStableProjects().map(({ id }) => id))

    for (const experimentalId of getExperimentalProjectIds()) {
      expect(stableIds.has(experimentalId)).toBe(false)
    }
  })

  it('labels all visible stable projects as stable', () => {
    for (const project of getStableProjects()) {
      expect(project.classification).toBe('stable')
    }
  })
})
