import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0B0B0B' }}>
      <Sidebar />
      {/* Main content — offset for desktop sidebar */}
      <div className="flex-1 lg:ml-60 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  )
}
