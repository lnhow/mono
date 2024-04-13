import { MdCode, MdContrast, MdCss, MdHtml, MdPalette, MdQuestionMark } from 'react-icons/md'
import { IconType } from 'react-icons'

export type MenuItem = MenuItemLink | MenuItemGroup

export type MenuItemLink = {
  href: string,
  key: string,
  icon?: IconType
  external?: boolean
}

export type MenuItemGroup = {
  key: string,
  items: MenuItemLink[]
}

// @ts-ignore
export const isMenuItemLink = (val: MenuItem): val is MenuItemLink => Boolean(val.href)

export const menuItems: MenuItem[] = [
  {
    href: '/',
    key: 'home',
  },
  {
    key: 'group-color',
    items: [
      {
        href: '/tools/contrast-checker',
        key: 'contrast-checker',
        icon: MdContrast,
      },
      {
        href: 'https://imagecolorpicker.com/',
        key: 'color-picker',
        icon: MdPalette,
        external: true,
      }
    ],
  },
  {
    key: 'group-formatter',
    items: [
      {
        href: 'https://codebeautify.org/htmlviewer',
        key: 'html-formatter',
        icon: MdHtml,
        external: true,
      },
      {
        href: 'https://codebeautify.org/css-beautify-minify',
        key: 'css-formatter',
        icon: MdCss,
        external: true,
      },
      {
        href: 'https://jsonformatter.org/',
        key: 'json-formatter',
        icon: MdCode,
        external: true,
      },
    ],
  },
  {
    key: 'group-misc',
    items: [
      {
        href: 'https://caniuse.com',
        key: 'can-i-use',
        icon: MdQuestionMark,
        external: true,
      }
    ]
  }
]