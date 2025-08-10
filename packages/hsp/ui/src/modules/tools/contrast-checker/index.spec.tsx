import { ExpectStatic, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'

import PageContrastChecker from '.'
import { DEFAULT_BACKGROUND, DEFAULT_FOREGROUND } from './const'
import { parseColor } from 'react-aria-components'
import { calcContrastRatio } from './contrastUtils'
import { useSearchParams } from 'next/navigation'

function expectPreviewBackground(expect: ExpectStatic, color: string) {
  expect(screen.getByTestId('background-preview').style.background).toBe(color)
}
function expectPreviewTextColor(
  expect: ExpectStatic,
  variant: 'bigText' | 'smallText',
  color: string,
) {
  expect(screen.getByTestId(`text-preview-${variant}`).style.color).toBe(color)
}
function expectContrastRatio(
  expect: ExpectStatic,
  variant: 'bigText' | 'smallText',
  ratio: string,
) {
  expect(
    within(screen.getByTestId(`contrast-score-${variant}`)).getByText(ratio),
  ).toBeInTheDocument()
}

describe('Contrast Checker Page', () => {
  it('by default, render a white background and black text with a 21:1 contrast ratio', ({
    expect,
  }) => {
    render(<PageContrastChecker />)

    expectPreviewBackground(expect, DEFAULT_BACKGROUND.toString('rgb'))
    expectPreviewTextColor(
      expect,
      'bigText',
      DEFAULT_FOREGROUND.toString('rgb'),
    )
    expectPreviewTextColor(
      expect,
      'smallText',
      DEFAULT_FOREGROUND.toString('rgb'),
    )

    expectContrastRatio(expect, 'bigText', '21:1')
    expectContrastRatio(expect, 'smallText', '21:1')
  })

  it('when update value, the background and text color should be updated', ({
    expect,
  }) => {
    render(<PageContrastChecker />)
    const testColor = {
      foreground: parseColor('#FF0000'),
      background: parseColor('#00FF00'),
    }
    const outputContrastRatio = `${calcContrastRatio(testColor.foreground.toString('hex'), testColor.background.toString('hex')).toFixed(2)}:1`

    const foregroundInput = screen.getByRole('textbox', { name: /foreground/i })
    const backgroundInput = screen.getByRole('textbox', { name: /background/i })

    fireEvent.input(foregroundInput, {
      target: { value: testColor.foreground.toString('hex') },
    })

    fireEvent.input(backgroundInput, {
      target: { value: testColor.background.toString('hex') },
    })

    expectPreviewBackground(expect, testColor.background.toString('rgb'))
    expectPreviewTextColor(
      expect,
      'bigText',
      testColor.foreground.toString('rgb'),
    )
    expectPreviewTextColor(
      expect,
      'smallText',
      testColor.foreground.toString('rgb'),
    )

    expectContrastRatio(expect, 'bigText', outputContrastRatio)
    expectContrastRatio(expect, 'smallText', outputContrastRatio)
  })

  it('color on url search params be set correctly', ({ expect }) => {
    const testColor = {
      foreground: parseColor('#00FF00'),
      background: parseColor('#0000FF'),
    }
    const outputContrastRatio = `${calcContrastRatio(testColor.foreground.toString('hex'), testColor.background.toString('hex')).toFixed(2)}:1`;

    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams({
        fg: testColor.foreground.toString('hex'),
        bg: testColor.background.toString('hex'),
      }) as ReturnType<typeof useSearchParams>,
    )
    render(<PageContrastChecker />)

    expectPreviewBackground(expect, testColor.background.toString('rgb'))
    expectPreviewTextColor(
      expect,
      'bigText',
      testColor.foreground.toString('rgb'),
    )
    expectPreviewTextColor(
      expect,
      'smallText',
      testColor.foreground.toString('rgb'),
    )

    expectContrastRatio(expect, 'bigText', outputContrastRatio)
    expectContrastRatio(expect, 'smallText', outputContrastRatio)
  })
})
