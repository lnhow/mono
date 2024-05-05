'use client'
import { Suspense } from 'react'
import { MdMenu } from 'react-icons/md'
import { BaseLayoutProps } from '@hsp/ui/layouts/types'
import dynamic from 'next/dynamic'
const SideMenu = dynamic(() => import('./ToolsMenu'), { ssr: false })

export default function ToolsLayout({ children }: BaseLayoutProps) {
  return (
    <div role="main" className="lg:-mt-8 lg:-mx-4 -mb-16">
      <nav role="menubar" className="drawer lg:drawer-open">
        <input id="drawer-tools" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-h-[80vh] rounded-lg">
          <div className="bg-base-200 fixed bottom-4 left-4 rounded-lg lg:hidden">
            <label
              htmlFor="drawer-tools"
              className="btn btn-square btn-neutral drawer-button"
              aria-label="toggle sidebar"
            >
              <MdMenu className="icon-md" />
            </label>
          </div>
          {children}
        </div>
        <div className="drawer-side z-20 lg:z-0 rounded-e-md">
          <label
            htmlFor="drawer-tools"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 max-w-[90vw] min-h-full bg-base-200 text-base-content gap-1 shadow-md">
            <Suspense>
              <SideMenu />
            </Suspense>
          </ul>
        </div>
      </nav>
    </div>
  )
}
