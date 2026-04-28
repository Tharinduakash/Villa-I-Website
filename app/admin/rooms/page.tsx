'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, ImageOff } from 'lucide-react'

interface Room {
  id: string
  name: string
  shortName: string
  priceLabel: string
  pricePerNight: number
  capacity: string
  size: string
  available: boolean
  image: string
  features: string[]
}

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const fetchRooms = () =>
    fetch('/api/rooms', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => { setRooms(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))

  useEffect(() => { fetchRooms() }, [])

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeletingId(id)
    await fetch(`/api/rooms/${id}`, { method: 'DELETE' })
    setRooms((prev) => prev.filter((r) => r.id !== id))
    setDeletingId(null)
  }

  async function handleToggle(room: Room) {
    setTogglingId(room.id)
    const res = await fetch(`/api/rooms/${room.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available: !room.available }),
    })
    if (res.ok) {
      const updated = await res.json()
      setRooms((prev) => prev.map((r) => (r.id === room.id ? updated : r)))
    }
    setTogglingId(null)
  }

  if (loading) return <PageLoader />

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl text-white mb-1">Rooms</h1>
          <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {rooms.length} room{rooms.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link
          href="/admin/rooms/new"
          className="flex items-center gap-2 px-5 py-2.5 font-lato text-xs tracking-[0.2em] uppercase transition-colors duration-200"
          style={{ background: '#C9A96E', color: '#0B0B0B' }}
        >
          <Plus size={15} />
          Add Room
        </Link>
      </div>

      {rooms.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="border overflow-hidden" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Room', 'Type', 'Price', 'Capacity', 'Size', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left font-lato text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    className="transition-colors duration-150 hover:bg-white/[0.02]">
                    {/* Room image + name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-9 relative overflow-hidden flex-shrink-0 bg-white/5">
                          {room.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageOff size={14} style={{ color: 'rgba(255,255,255,0.2)' }} />
                            </div>
                          )}
                        </div>
                        <span className="font-lato text-sm text-white whitespace-nowrap">{room.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-lato text-xs px-2.5 py-1" style={{ color: '#C9A96E', background: 'rgba(201,169,110,0.08)' }}>
                        {room.shortName}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-lato text-sm whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {room.priceLabel}
                    </td>
                    <td className="px-5 py-4 font-lato text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{room.capacity}</td>
                    <td className="px-5 py-4 font-lato text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{room.size}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggle(room)}
                        disabled={togglingId === room.id}
                        className="flex items-center gap-1.5 font-lato text-xs transition-colors duration-200 disabled:opacity-40"
                        style={{ color: room.available ? '#10B981' : 'rgba(255,255,255,0.3)' }}
                      >
                        {room.available
                          ? <ToggleRight size={18} />
                          : <ToggleLeft size={18} />}
                        {room.available ? 'Available' : 'Unavailable'}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/rooms/${room.id}/edit`}
                          className="transition-colors duration-200 hover:text-luxury-gold"
                          style={{ color: 'rgba(255,255,255,0.4)' }}>
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => handleDelete(room.id, room.name)}
                          disabled={deletingId === room.id}
                          className="transition-colors duration-200 hover:text-red-400 disabled:opacity-40"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="border py-20 text-center" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
      <div className="w-14 h-14 border mx-auto mb-4 flex items-center justify-center"
        style={{ borderColor: 'rgba(201,169,110,0.2)', color: 'rgba(201,169,110,0.5)' }}>
        <Plus size={22} />
      </div>
      <p className="font-playfair text-xl text-white mb-2">No rooms yet</p>
      <p className="font-lato text-sm mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>Add your first room to get started</p>
      <Link href="/admin/rooms/new"
        className="inline-flex items-center gap-2 px-6 py-2.5 font-lato text-xs tracking-[0.2em] uppercase"
        style={{ background: '#C9A96E', color: '#0B0B0B' }}>
        <Plus size={14} /> Add Room
      </Link>
    </div>
  )
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
    </div>
  )
}
