import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const globals = readFileSync(
  new URL("../src/styles/globals.css", import.meta.url),
  "utf8"
)

const uiConfig = JSON.parse(
  readFileSync(new URL("../components.json", import.meta.url), "utf8")
)
const siteConfig = JSON.parse(
  readFileSync(
    new URL("../../../apps/site/components.json", import.meta.url),
    "utf8"
  )
)

describe("Folio theme contract", () => {
  it("uses the approved paper palette and keeps cards separate from sticky notes", () => {
    expect(globals).toContain("--background: #fffef9;")
    expect(globals).toContain("--card: var(--color-amber-50);")
    expect(globals).toContain("--sticky-note: #fff9df;")
    expect(globals).toContain("--sticky-note-green: #f1f8df;")
  })

  it("exposes Raleway as the shared sans font and Raleway Dots for display text", () => {
    expect(globals).toContain('--font-sans: "Raleway", sans-serif;')
    expect(globals).toContain('--font-display: "Raleway Dots", "Raleway", sans-serif;')
  })

  it("keeps both shadcn configs aligned to the Maia component style", () => {
    expect(uiConfig.style).toBe("radix-maia")
    expect(siteConfig.style).toBe(uiConfig.style)
    expect(siteConfig.iconLibrary).toBe(uiConfig.iconLibrary)
    expect(siteConfig.menuColor).toBe(uiConfig.menuColor)
    expect(siteConfig.menuAccent).toBe(uiConfig.menuAccent)
  })
})
