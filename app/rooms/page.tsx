import RoomsHero from '@/components/sections/RoomsHero'
import RoomsIntro from '@/components/sections/RoomsIntro'
import RoomsList from '@/components/sections/RoomsList'
import RoomsAmenities from '@/components/sections/RoomsAmenities'
import BookingBanner from '@/components/BookingBanner'

export default function RoomsPage() {
  return (
    <>
      <RoomsHero />
      <RoomsIntro />
      <RoomsList />
      <RoomsAmenities />
      <BookingBanner />
    </>
  )
}
