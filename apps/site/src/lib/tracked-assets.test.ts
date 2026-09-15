import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'

import { describe, expect, it } from 'vitest'

const appDirectory = new URL('../app/', import.meta.url)
const postsDirectory = new URL('../content/posts/', import.meta.url)

async function sha256(url: URL) {
  return createHash('sha256').update(await readFile(url)).digest('hex')
}

describe('tracked production assets', () => {
  it('preserves the exact three migrated post files', async () => {
    const filenames = (await readdir(postsDirectory)).sort()

    expect(filenames).toEqual([
      '251008-the-first-post.mdx',
      '251014-output-vs-outcome.mdx',
      '251228-2025-in-reflection.mdx',
    ])
  })

  it('uses the established favicon assets', async () => {
    await expect(sha256(new URL('icon.png', appDirectory))).resolves.toBe(
      '201fca7c7e1b1d6bcbf18fb06ba5af8d2a19d31fca36607e6c4b98e449ada966',
    )
    await expect(
      sha256(new URL('apple-icon.png', appDirectory)),
    ).resolves.toBe(
      'b84301bf81a6301fcb7fb70d541086b0f3d5da41575605078bfe95d30acc5026',
    )
  })
})
