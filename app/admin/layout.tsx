import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden relative" style={{ background: 'linear-gradient(160deg, #0a0b14 0%, #0d0f1c 100%)' }}>
      {/* Ambient radial glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(201,169,110,0.05) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(201,169,110,0.04) 0%, transparent 45%)' }} />
      <Sidebar />
      {/* Main content — offset for desktop sidebar */}
      <div className="flex-1 lg:ml-60 flex flex-col overflow-hidden relative z-10">
        <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  )
}
