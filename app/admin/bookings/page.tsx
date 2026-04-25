'use client'
import { useEffect, useState } from 'react'
import { Trash2, Filter } from 'lucide-react'

interface Booking {
  id: string
  name: string
  email: string
  phone?: string
  checkIn: string
  checkOut: string
  guests: string
  roomType: string
  message?: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  createdAt: string
  room?: { name: string } | null
}

const statusConfig = {
  PENDING:   { label: 'Pending',   color: '#F59E0B', bg: 'rgba(245,158,11,0.1)'  },
  CONFIRMED: { label: 'Confirmed', color: '#10B981', bg: 'rgba(16,185,129,0.1)'  },
  CANCELLED: { label: 'Cancelled', color: '#EF4444', bg: 'rgba(239,68,68,0.1)'   },
}

const ALL_STATUSES = ['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'] as const
type Filter = typeof ALL_STATUSES[number]

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('ALL')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchBookings = () =>
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((data) => { setBookings(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))

  useEffect(() => { fetchBookings() }, [])

  async function updateStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'CANCELLED') {
    setUpdatingId(id)
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      const updated = await res.json()
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)))
    }
    setUpdatingId(null)
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete booking from "${name}"?`)) return
    setDeletingId(id)
    await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
    setBookings((prev) => prev.filter((b) => b.id !== id))
    setDeletingId(null)
  }

  const displayed = filter === 'ALL' ? bookings : bookings.filter((b) => b.status === filter)

  const counts = {
    ALL: bookings.length,
    PENDING: bookings.filter((b) => b.status === 'PENDING').length,
    CONFIRMED: bookings.filter((b) => b.status === 'CONFIRMED').length,
    CANCELLED: bookings.filter((b) => b.status === 'CANCELLED').length,
  }

  if (loading) return <PageLoader />

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-white mb-1">Bookings</h1>
        <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {bookings.length} total booking{bookings.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ALL_STATUSES.map((s) => {
          const active = filter === s
          const cfg = s === 'ALL' ? null : statusConfig[s]
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="flex items-center gap-2 px-4 py-2 font-lato text-xs tracking-wider uppercase transition-all duration-200"
              style={{
                background: active ? (cfg?.bg ?? 'rgba(201,169,110,0.12)') : 'rgba(255,255,255,0.04)',
                color: active ? (cfg?.color ?? '#C9A96E') : 'rgba(255,255,255,0.4)',
                border: `1px solid ${active ? (cfg?.color ?? '#C9A96E') + '40' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {s === 'ALL' ? 'All' : statusConfig[s].label}
              <span className="px-1.5 py-0.5 rounded-sm text-[10px]"
                style={{ background: active ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.06)' }}>
                {counts[s]}
              </span>
            </button>
          )
        })}
      </div>

      {displayed.length === 0 ? (
        <div className="border py-16 text-center" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="font-playfair text-xl text-white mb-2">No bookings found</p>
          <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {filter !== 'ALL' ? 'Try a different filter' : 'Bookings will appear here once submitted'}
          </p>
        </div>
      ) : (
        <div className="border overflow-hidden" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Guest', 'Room Type', 'Dates', 'Guests', 'Status', 'Submitted', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left font-lato text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((b) => {
                  const sc = statusConfig[b.status]
                  const nights = Math.ceil(
                    (new Date(b.checkOut).getTime() - new Date(b.checkIn).getTime()) / (1000 * 60 * 60 * 24)
                  )
                  return (
                    <tr key={b.id}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-lato text-sm text-white">{b.name}</p>
                        <p className="font-lato text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{b.email}</p>
                        {b.phone && (
                          <p className="font-lato text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{b.phone}</p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{b.roomType}</p>
                        {b.room && (
                          <p className="font-lato text-xs mt-0.5" style={{ color: 'rgba(201,169,110,0.6)' }}>{b.room.name}</p>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="font-lato text-sm text-white">
                          {new Date(b.checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
                        </p>
                        <p className="font-lato text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          → {new Date(b.checkOut).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })} ({nights}n)
                        </p>
                      </td>
                      <td className="px-5 py-4 font-lato text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{b.guests}</td>
                      <td className="px-5 py-4">
                        <select
                          value={b.status}
                          disabled={updatingId === b.id}
                          onChange={(e) => updateStatus(b.id, e.target.value as 'PENDING' | 'CONFIRMED' | 'CANCELLED')}
                          className="px-2.5 py-1.5 font-lato text-xs tracking-wide outline-none cursor-pointer disabled:opacity-40"
                          style={{ color: sc.color, background: sc.bg, border: `1px solid ${sc.color}30` }}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 font-lato text-xs whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {new Date(b.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleDelete(b.id, b.name)}
                          disabled={deletingId === b.id}
                          className="hover:text-red-400 transition-colors disabled:opacity-40"
                          style={{ color: 'rgba(255,255,255,0.35)' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
    </div>
  )
}
