import { fetchUserData } from '../_components/data/api-server'
import { mockCompanyName } from '../_components/data/mockData'
import Header from '../_components/layout/header'
import { HeaderUserInfo } from '../_components/layout/header/user-info/server'
import Sidebar from '../_components/layout/sidebar'
import { AuthProvider } from './_components/auth/provider'

export default async function SSRLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await fetchUserData()

  return (
    <AuthProvider user={user}>
      <div className="min-h-screen font-sans [--header-height:calc(var(--spacing)*16)]">
        <Header>
          <HeaderUserInfo />
        </Header>
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
    </AuthProvider>
  )
}
