// 'use client'
// import { mockCompanyName, mockProducts } from './data/mockData'
// import Header from './layout/header'
// import Sidebar from './layout/sidebar'
// import BannerAndVideoSection from './sections/BannerAndVideoSection'
// import HashtagSection from './sections/HashtagSection'
// import ProductListSection from './sections/ProductListSection'
// import StreamingSection from './sections/StreamingSection'
// import TimelineAndNewsSection from './sections/TimelineAndNewsSection'

// /**
//  * Main Application Component
//  */
// export default function App() {
//   // Main content padding based on fixed header (16) and fixed sidebar (56) on desktop
//   return (
//     <div className="min-h-screen font-sans [--header-height:calc(var(--spacing)*16)]">
//       <Header />
//       <div className="flex pt-16 [&>.sidebar]:hidden [&>.sidebar]:lg:flex [--sidebar-width:calc(var(--spacing)*56)]">
//         <Sidebar />
//         {/* Main Content Area */}
//         <div className="flex-1 lg:ml-(--sidebar-width) w-[calc(100vw-var(--sidebar-width))] p-4 md:p-6 space-y-6">
//           <HashtagSection />
//           <BannerAndVideoSection />
//           <TimelineAndNewsSection />
//           <StreamingSection />
//           {/* <div className="h-[1px] w-full bg-gray-200" />{' '} */}
//           {/* Section Separator */}
//           {/* Reusable Product Lists */}
//           <ProductListSection
//             title="Recommended for You"
//             products={mockProducts}
//           />
//           <ProductListSection
//             title="Best Sellers in Electronics"
//             products={mockProducts}
//           />
//           <ProductListSection
//             title="Flash Deals (Ending Soon)"
//             products={mockProducts}
//           />
//           <footer className="py-8 text-center text-sm text-gray-500">
//             © 2025 {mockCompanyName} Clone. All rights reserved.
//           </footer>
//         </div>
//       </div>
//     </div>
//   )
// }
