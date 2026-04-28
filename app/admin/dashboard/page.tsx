'use client'
import { useEffect, useState } from 'react'
import { BedDouble, CalendarCheck, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface Booking {
  id: string
  name: string
  email: string
  roomType: string
  checkIn: string
  checkOut: string
  guests: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  createdAt: string
}

interface Room { id: string; name: string; available: boolean }

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number | string; icon: React.ElementType; color: string }) {
  return (
    <div className="p-6 border relative overflow-hidden" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.14)' }}>
      {/* Vertical color accent */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: `linear-gradient(180deg, transparent, ${color}80, transparent)` }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 flex items-center justify-center border" style={{ borderColor: `${color}30`, color, background: `${color}10` }}>
          <Icon size={18} />
        </div>
      </div>
      <p className="font-playfair text-3xl text-white mb-1">{value}</p>
      <p className="font-lato text-xs tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
    </div>
  )
}

const statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  PENDING:   { label: 'Pending',   color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  CONFIRMED: { label: 'Confirmed', color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  CANCELLED: { label: 'Cancelled', color: '#EF4444', bg: 'rgba(239,68,68,0.1)'  },
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/bookings').then((r) => r.json()),
      fetch('/api/rooms').then((r) => r.json()),
    ]).then(([b, r]) => {
      setBookings(Array.isArray(b) ? b : [])
      setRooms(Array.isArray(r) ? r : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const pending   = bookings.filter((b) => b.status === 'PENDING').length
  const confirmed = bookings.filter((b) => b.status === 'CONFIRMED').length
  const cancelled = bookings.filter((b) => b.status === 'CANCELLED').length
  const recent    = [...bookings].slice(0, 8)

  if (loading) return <PageLoader />

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-white mb-1">Dashboard</h1>
        <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Overview of Villa i Hotel
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Rooms"     value={rooms.length}     icon={BedDouble}     color="#C9A96E" />
        <StatCard label="Total Bookings"  value={bookings.length}  icon={CalendarCheck}  color="#C9A96E" />
        <StatCard label="Pending"         value={pending}          icon={Clock}          color="#F59E0B" />
        <StatCard label="Confirmed"       value={confirmed}        icon={CheckCircle}    color="#10B981" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 border" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(201,169,110,0.10)' }}>
            <h2 className="font-playfair text-lg text-white">Recent Bookings</h2>
            <Link href="/admin/bookings" className="font-lato text-xs tracking-wider uppercase transition-colors" style={{ color: '#C9A96E' }}>
              View all
            </Link>
          </div>
          <div className="divide-y divide-[rgba(255,255,255,0.04)]">
            {recent.length === 0 ? (
              <p className="px-6 py-8 font-lato text-sm text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>No bookings yet</p>
            ) : (
              recent.map((b) => {
                const s = statusStyles[b.status]
                return (
                  <div key={b.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-lato text-sm text-white truncate">{b.name}</p>
                      <p className="font-lato text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {b.roomType} · {new Date(b.checkIn).toLocaleDateString('en-GB', { day:'numeric', month:'short' })} → {new Date(b.checkOut).toLocaleDateString('en-GB', { day:'numeric', month:'short' })}
                      </p>
                    </div>
                    <span className="flex-shrink-0 px-2.5 py-1 font-lato text-xs tracking-wide rounded-sm"
                      style={{ color: s.color, background: s.bg }}>
                      {s.label}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Rooms status */}
        <div className="border" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(201,169,110,0.10)' }}>
            <h2 className="font-playfair text-lg text-white">Rooms</h2>
            <Link href="/admin/rooms" className="font-lato text-xs tracking-wider uppercase" style={{ color: '#C9A96E' }}>
              Manage
            </Link>
          </div>
          <div className="divide-y divide-[rgba(255,255,255,0.04)]">
            {rooms.length === 0 ? (
              <p className="px-6 py-8 font-lato text-sm text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>No rooms yet</p>
            ) : (
              rooms.map((r) => (
                <div key={r.id} className="px-6 py-3.5 flex items-center justify-between gap-3">
                  <p className="font-lato text-sm text-white truncate">{r.name}</p>
                  <span className="flex-shrink-0 w-2 h-2 rounded-full" style={{ background: r.available ? '#10B981' : '#EF4444' }} />
                </div>
              ))
            )}
          </div>

          {/* Summary mini stats */}
          <div className="px-6 py-4 border-t grid grid-cols-3 gap-2" style={{ borderColor: 'rgba(201,169,110,0.10)' }}>
            {[
              { label: 'Pending',   value: pending,   color: '#F59E0B' },
              { label: 'Confirmed', value: confirmed, color: '#10B981' },
              { label: 'Cancelled', value: cancelled, color: '#EF4444' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-playfair text-xl" style={{ color: s.color }}>{s.value}</p>
                <p className="font-lato text-[10px] tracking-wide uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
        <p className="font-lato text-xs tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Loading</p>
      </div>
    </div>
  )
}
