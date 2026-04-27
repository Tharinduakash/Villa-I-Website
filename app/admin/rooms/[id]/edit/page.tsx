'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import RoomForm from '@/components/admin/RoomForm'

export default function EditRoomPage() {
  const { id } = useParams<{ id: string }>()
  const [room, setRoom] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/rooms/${id}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null }
        return r.json()
      })
      .then((data) => { if (data) { setRoom(data); setLoading(false) } })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="p-8 text-center">
        <p className="font-playfair text-2xl text-white mb-2">Room not found</p>
      </div>
    )
  }

  return <RoomForm defaultValues={room!} roomId={id} />
}
