'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  BedDouble,
  Sparkles,
  CalendarCheck,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/rooms',     label: 'Rooms',     icon: BedDouble },
  { href: '/admin/services',  label: 'Services',  icon: Sparkles },
  { href: '/admin/bookings',  label: 'Bookings',  icon: CalendarCheck },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-white/5">
        <span className="font-playfair text-2xl font-bold text-white tracking-wider">
          VILLA <span className="italic font-light" style={{ color: '#C9A96E' }}>i</span>
        </span>
        <p className="font-lato text-xs tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(201,169,110,0.6)' }}>
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 font-lato text-sm tracking-wide transition-all duration-200 rounded-sm"
              style={{
                color: active ? '#C9A96E' : 'rgba(255,255,255,0.5)',
                background: active ? 'rgba(201,169,110,0.08)' : 'transparent',
                borderLeft: active ? '2px solid #C9A96E' : '2px solid transparent',
              }}
            >
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6 border-t border-white/5 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 font-lato text-sm tracking-wide transition-colors duration-200 rounded-sm hover:text-red-400"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 h-screen fixed left-0 top-0 z-40 border-r border-white/5 flex-shrink-0"
        style={{ background: '#111111' }}
      >
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 h-14 border-b border-white/5"
        style={{ background: '#111111' }}
      >
        <span className="font-playfair text-lg font-bold text-white">
          VILLA <span className="italic font-light" style={{ color: '#C9A96E' }}>i</span>
          <span className="font-lato text-xs tracking-widest ml-2 uppercase" style={{ color: 'rgba(201,169,110,0.6)' }}>Admin</span>
        </span>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'rgba(255,255,255,0.6)' }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <aside className="w-60 h-full border-r border-white/5" style={{ background: '#111111' }}>
            <NavContent />
          </aside>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  )
}
