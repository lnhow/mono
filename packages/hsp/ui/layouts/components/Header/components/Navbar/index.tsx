import { NwVerticalDivider } from '@hsp/ui/components/common/NwDivider/Vertical'
import Link from '@hsp/ui/shared/components/navigation/Link'
import { MdOutlineHome, MdOutlineApps } from 'react-icons/md'
import { getRequestLocale, getTranslation } from '@i18n/server'
import { nsCommon } from '@hsp/ui/components/common/types'

export default async function Navbar() {
  const { t } = await getTranslation(nsCommon)
  const locale = await getRequestLocale()
  return (
    <div
      className="
      w-full bg-base-300
      sticky top-0 z-50"
    >
      <nav
        className="max-w-screen-2xl h-10 mx-auto sm:px-3 flex
        [&_.btn:not(dialog_.btn)]:h-10
        [&_.btn:not(dialog_.btn)]:min-h-[40px]
        [&_.btn-square:not(dialog_.btn)]:w-10"
      >
        <Link
          className="btn btn-square btn-ghost"
          href="/"
          title={t('home', { ns: nsCommon })}
          locale={locale}
        >
          <MdOutlineHome className="icon-md" />
        </Link>
        <NwVerticalDivider />
        <Link
          className="btn btn-square btn-ghost"
          href="/tools"
          title={t('tools', { ns: nsCommon })}
          locale={locale}
        >
          <MdOutlineApps className="icon-md" />
        </Link>
      </nav>
    </div>
  )
}
