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
  it("uses the approved retro HUD palette with instrument and HUD line tokens", () => {
    expect(globals).toContain("--background: #f0f1ec;")
    expect(globals).toContain("--foreground: #111416;")
    expect(globals).toContain("--card: #fafaf5;")
    expect(globals).toContain("--instrument: #15191b;")
    expect(globals).toContain("--instrument-foreground: #f8f8f2;")
    expect(globals).toContain("--hud-line: rgba(17, 20, 22, 0.34);")
    expect(globals).toContain("--hud-line-soft: rgba(17, 20, 22, 0.14);")
    expect(globals).toContain("--hud-line-faint: rgba(17, 20, 22, 0.08);")
  })

  it("defines dark mode and signal foreground/muted variants", () => {
    expect(globals).toContain("--background: #15191b;")
    expect(globals).toContain("--card: #1f2528;")
    expect(globals).toContain("--instrument: #f8f8f2;")
    expect(globals).toContain("--signal-red: #ff4d3d;")
    expect(globals).toContain("--signal-red-foreground: #260300;")
    expect(globals).toContain("--signal-red-muted: #ffe1dc;")
    expect(globals).toContain("--signal-green: #1fa66a;")
    expect(globals).toContain("--signal-green-foreground: #06190f;")
    expect(globals).toContain("--signal-green-muted: #d8f3e6;")
    expect(globals).toContain("--signal-amber: #f4b63f;")
    expect(globals).toContain("--signal-amber-foreground: #241600;")
    expect(globals).toContain("--signal-amber-muted: #fff0cb;")
    expect(globals).toContain("--signal-blue: #42aee8;")
    expect(globals).toContain("--signal-blue-foreground: #001826;")
    expect(globals).toContain("--signal-blue-muted: #d9f1ff;")
  })

  it("exposes the HUD theme tokens to Tailwind and uses the shared sans font", () => {
    expect(globals).toContain("--color-instrument: var(--instrument);")
    expect(globals).toContain("--color-signal-red: var(--signal-red);")
    expect(globals).toContain("--color-hud-line: var(--hud-line);")
    expect(globals).toContain(
      '--font-sans: "Inter", "Arial", "Helvetica", sans-serif;'
    )
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

  it("lets the shared UI stylesheet own site typography", () => {
    expect(siteGlobals).not.toContain("font-family: Arial")
    expect(siteLayout).not.toContain("next/font/google")
    expect(siteLayout).not.toContain("Geist")
  })
})
