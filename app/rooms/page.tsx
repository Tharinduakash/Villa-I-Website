export const dynamic = 'force-dynamic'

import RoomsHero from '@/components/sections/RoomsHero'
import RoomsIntro from '@/components/sections/RoomsIntro'
import RoomsList from '@/components/sections/RoomsList'
import RoomsAmenities from '@/components/sections/RoomsAmenities'
import BookingBanner from '@/components/BookingBanner'
import { prisma } from '@/lib/prisma'
import { rooms as staticRooms } from '@/lib/data'
import { FloatingWidgets } from '@/components/floating-widgets'

// Static USD approximations used when DB is unreachable
const STATIC_USD: Record<string, number> = {
  'ac-room':     20,
  'non-ac-room': 13,
  'family-room': 83,
  'full-villa':  135,
}

function mapDbRoom(r: {
  id: string; name: string; shortName: string; description: string
  features: string[]; pricePerNight: number; priceLabel: string
  image: string; images: string[]; capacity: string; size: string
}) {
  return {
    id:          r.id,
    name:        r.name,
    shortName:   r.shortName,
    description: r.description,
    features:    r.features,
    priceUSD:    r.pricePerNight,
    price:       r.priceLabel,
    image:       r.image,
    images:      r.images ?? [],
    capacity:    r.capacity,
    size:        r.size,
  }
}

function mapStaticRoom(r: typeof staticRooms[number]) {
  return {
    id:          r.id,
    name:        r.name,
    shortName:   r.shortName,
    description: r.description,
    features:    r.features,
    priceUSD:    STATIC_USD[r.id] ?? 0,
    price:       r.price,
    image:       r.image,
    images:      [],
    capacity:    r.capacity,
    size:        r.size,
  }
}

type RoomData = {
  id: string; name: string; shortName: string; description: string
  features: string[]; priceUSD: number; price: string
  image: string; images: string[]; capacity: string; size: string
}

export default async function RoomsPage() {
  let rooms: RoomData[] = []

  try {
    const dbRooms = await prisma.room.findMany({ orderBy: { createdAt: 'asc' } })
    rooms = dbRooms.length > 0
      ? dbRooms.map(mapDbRoom)
      : staticRooms.map(mapStaticRoom)
  } catch {
    rooms = staticRooms.map(mapStaticRoom)
  }

  return (
    <>
      <RoomsHero />
      <FloatingWidgets />
      <RoomsList rooms={rooms} />
      <RoomsAmenities />
      <BookingBanner />
    </>
  )
}
