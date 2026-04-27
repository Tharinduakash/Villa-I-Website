import HeroSlider from '@/components/HeroSlider'
import { FloatingWidgets } from '@/components/floating-widgets'
import HighlightsBar from '@/components/sections/HighlightsBar'
import RoomsPreview from '@/components/sections/RoomsPreview'
import HomeAboutSection from '@/components/HomeAboutSection'
import GalleryCard from '@/components/Gallerycard'
import { ExploreSection } from '@/components/ExploreSection'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Gallery from '@/components/Gallery'
import BookingBanner from '@/components/BookingBanner'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const dbRooms = await prisma.room.findMany({ orderBy: { createdAt: 'asc' } })
  const rooms = dbRooms.map((r: { id: any; name: any; shortName: any; description: any; features: any; priceLabel: any; image: any; capacity: any; size: any }) => ({
    id: r.id,
    name: r.name,
    shortName: r.shortName,
    description: r.description,
    features: r.features,
    price: r.priceLabel,
    image: r.image,
    capacity: r.capacity,
    size: r.size,
  }))

  return (
    <>
      <HeroSlider />
      <FloatingWidgets />
      <HighlightsBar />
      <RoomsPreview rooms={rooms} />
      <HomeAboutSection />
      <GalleryCard />
      <ExploreSection />
      <WhyChooseUs />
      <Gallery />
      <BookingBanner />
    </>
  )
}
