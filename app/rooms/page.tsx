import RoomsHero from '@/components/sections/RoomsHero'
import RoomsIntro from '@/components/sections/RoomsIntro'
import RoomsList from '@/components/sections/RoomsList'
import RoomsAmenities from '@/components/sections/RoomsAmenities'
import BookingBanner from '@/components/BookingBanner'
import { prisma } from '@/lib/prisma'

export default async function RoomsPage() {
  const dbRooms = await prisma.room.findMany({ orderBy: { createdAt: 'asc' } })
  const rooms = dbRooms.map((r: { id: any; name: any; shortName: any; description: any; features: any; priceLabel: any; image: any; images: any; capacity: any; size: any }) => ({
    id: r.id,
    name: r.name,
    shortName: r.shortName,
    description: r.description,
    features: r.features,
    price: r.priceLabel,
    image: r.image,
    images: r.images ?? [],
    capacity: r.capacity,
    size: r.size,
  }))

  return (
    <>
      <RoomsHero />
      <RoomsIntro />
      <RoomsList rooms={rooms} />
      <RoomsAmenities />
      <BookingBanner />
    </>
  )
}
