'use client'

import { THEME } from '../constants/theme'
import { useTheme } from 'next-themes'
import { ChangeEvent, ChangeEventHandler, useCallback, useMemo } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
  const isDarkMode = useMemo(() => theme === THEME.DARK, [theme])

  const toggleDarkMode: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setTheme(THEME.DARK)
        return
      }
      setTheme(THEME.LIGHT)
    },
    [setTheme]
  )

  return (
    <div
      aria-label="tooltip"
      role="tooltip"
      className="tooltip tooltip-left before:z-50"
      data-tip="Dark mode"
    >
      <label className="btn btn-circle btn-sm btn-ghost swap swap-rotate">
        <input
          aria-hidden="true"
          type="checkbox"
          name="themeToggle"
          checked={isDarkMode}
          aria-checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <MdOutlineLightMode className="swap-off fill-current icon-md" />
        <MdOutlineDarkMode className="swap-on fill-current icon-md" />
      </label>
    </div>
  )
}

export default ThemeChanger
