import { mockCompanyName } from '../_components/data/mockData'
import Header from '../_components/layout/header'
import Sidebar from '../_components/layout/sidebar'

export default function SSRLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans [--header-height:calc(var(--spacing)*16)]">
      <Header />
      <div className="flex pt-16 [&>.sidebar]:hidden [&>.sidebar]:lg:flex [--sidebar-width:calc(var(--spacing)*56)]">
        <Sidebar />
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-(--sidebar-width) w-[calc(100vw-var(--sidebar-width))] p-4 md:p-6 space-y-6">
          {children}
          <footer className="py-8 text-center text-sm text-gray-500">
            © 2025 {mockCompanyName} Clone. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  )
}
