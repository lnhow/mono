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
const siteGlobals = readFileSync(
  new URL("../../../apps/site/src/app/globals.css", import.meta.url),
  "utf8"
)
const siteLayout = readFileSync(
  new URL("../../../apps/site/src/app/layout.tsx", import.meta.url),
  "utf8"
)

describe("Folio theme contract", () => {
  it("uses OKLCH for every concrete Retro HUD color", () => {
    expect(globals).toContain("--background: oklch(0.956 0.0067 115.71);")
    expect(globals).toContain("--foreground: oklch(0.1889 0.0062 236.93);")
    expect(globals).toContain("--instrument: oklch(0.2101 0.0073 229.25);")
    expect(globals).toContain(
      "--instrument-foreground: oklch(0.9775 0.0079 106.55);"
    )
    expect(globals).toContain(
      "--hud-line: oklch(0.1889 0.0062 236.93 / 34%);"
    )
    expect(globals).not.toMatch(/#[0-9a-f]{3,8}\b/i)
    expect(globals).not.toMatch(/rgba?\(/i)
  })

  it("aliases repeated shadcn colors to canonical semantic tokens", () => {
    expect(globals).toContain("--card: var(--secondary);")
    expect(globals).toContain("--popover: var(--secondary);")
    expect(globals).toContain("--sidebar: var(--secondary);")
    expect(globals).toContain("--secondary-foreground: var(--foreground);")
    expect(globals).toContain(
      "--card-foreground: var(--secondary-foreground);"
    )
    expect(globals).toContain(
      "--popover-foreground: var(--secondary-foreground);"
    )
    expect(globals).toContain(
      "--sidebar-foreground: var(--secondary-foreground);"
    )
    expect(globals).toContain("--border: var(--muted);")
    expect(globals).toContain("--input: var(--muted);")
    expect(globals).toContain("--sidebar-border: var(--border);")
    expect(globals).toContain("--sidebar-ring: var(--ring);")
  })

  it("defines dark canonical colors and signal foreground/muted variants", () => {
    expect(globals).toContain("--background: oklch(0.2101 0.0073 229.25);")
    expect(globals).toContain("--secondary: oklch(0.2598 0.0103 229.34);")
    expect(globals).toContain("--instrument: oklch(0.9775 0.0079 106.55);")
    expect(globals).toContain("--signal-red: oklch(0.671 0.2168 29.19);")
    expect(globals).toContain(
      "--signal-red-foreground: oklch(0.1756 0.063 34.07);"
    )
    expect(globals).toContain("--signal-red-muted: oklch(0.933 0.034 29);")
    expect(globals).toContain(
      "--signal-green: oklch(0.6421 0.1426 157.76);"
    )
    expect(globals).toContain(
      "--signal-green-foreground: oklch(0.1934 0.0329 158.81);"
    )
    expect(globals).toContain(
      "--signal-green-muted: oklch(0.9409 0.0332 165.14);"
    )
    expect(globals).toContain(
      "--signal-amber: oklch(0.8138 0.1475 79.72);"
    )
    expect(globals).toContain(
      "--signal-amber-foreground: oklch(0.2133 0.0444 78.32);"
    )
    expect(globals).toContain(
      "--signal-amber-muted: oklch(0.9577 0.0507 88.57);"
    )
    expect(globals).toContain("--signal-blue: oklch(0.714 0.1284 236.3);")
    expect(globals).toContain(
      "--signal-blue-foreground: oklch(0.1977 0.0426 236.05);"
    )
    expect(globals).toContain(
      "--signal-blue-muted: oklch(0.9448 0.0316 233.29);"
    )
  })

  it("exposes the HUD theme tokens and Noto Sans to Tailwind", () => {
    expect(globals).toContain("--color-instrument: var(--instrument);")
    expect(globals).toContain("--color-signal-red: var(--signal-red);")
    expect(globals).toContain("--color-hud-line: var(--hud-line);")
    expect(globals).toContain("--font-sans: 'Noto Sans', sans-serif;")
  })

  it("provides reusable retro HUD shape and halftone utilities", () => {
    expect(globals).toContain(".chamfer-surface")
    expect(globals).toContain(".chamfer-surface-lg")
    expect(globals).toContain(".chamfer-button")
    expect(globals).toContain(".chamfer-outline")
    expect(globals).toContain(".bg-halftone")
    expect(globals).toContain(".bg-halftone-accent")
  })

  it("keeps both shadcn configs aligned to the Maia component style", () => {
    expect(uiConfig.style).toBe("radix-maia")
    expect(siteConfig.style).toBe(uiConfig.style)
    expect(siteConfig.iconLibrary).toBe(uiConfig.iconLibrary)
    expect(siteConfig.menuColor).toBe(uiConfig.menuColor)
    expect(siteConfig.menuAccent).toBe(uiConfig.menuAccent)
  })

  it("loads Noto Sans for the site without restoring Geist", () => {
    expect(siteGlobals).not.toContain("font-family: Arial")
    expect(siteLayout).toContain("Noto_Sans")
    expect(siteLayout).toContain("variable: '--font-sans'")
    expect(siteLayout).not.toContain("Geist")
  })
})
