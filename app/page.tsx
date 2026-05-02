export const dynamic = 'force-dynamic'

import HeroSlider from '@/components/HeroSlider'
import { FloatingWidgets } from '@/components/floating-widgets'
import HighlightsBar from '@/components/sections/HighlightsBar'
import RoomsPreview from '@/components/sections/RoomsPreview'
import HomeAboutSection from '@/components/HomeAboutSection'
import ServicesPreview from '@/components/sections/ServicesPreview'
import VideoShowcase from '@/components/sections/VideoShowcase'
import GalleryCard from '@/components/Gallerycard'
import { ExploreSection } from '@/components/ExploreSection'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Gallery from '@/components/Gallery'
import BookingBanner from '@/components/BookingBanner'
import { prisma } from '@/lib/prisma'
import { rooms as staticRooms, services as staticServices } from '@/lib/data'

export default async function HomePage() {
  let rooms: { id: any; name: any; shortName: any; description: any; features: any; priceUSD: any; price: any; image: any; capacity: any; size: any }[] = []
  let services: { id: string; title: string; description: string; image: string; features: string[] }[] = []

  try {
    const [dbRooms, dbServices] = await Promise.all([
      prisma.room.findMany({ orderBy: { createdAt: 'asc' } }),
      prisma.service.findMany({ orderBy: { createdAt: 'asc' }, take: 3 }),
    ])
    rooms = dbRooms.map((r: { id: any; name: any; shortName: any; description: any; features: any; pricePerNight: any; priceLabel: any; image: any; capacity: any; size: any }) => ({
      id: r.id,
      name: r.name,
      shortName: r.shortName,
      description: r.description,
      features: r.features,
      priceUSD: r.pricePerNight,
      price: r.priceLabel,
      image: r.image,
      capacity: r.capacity,
      size: r.size,
    }))
    services = dbServices.map((s: { id: string; title: string; description: string; image: string; features: string[] }) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      image: s.image,
      features: s.features,
    }))
    if (rooms.length === 0) rooms = staticRooms.map((r) => ({ ...r, priceUSD: 0, size: r.size ?? '' }))
    if (services.length === 0) services = staticServices
  } catch {
    rooms    = staticRooms.map((r) => ({ ...r, priceUSD: 0, size: r.size ?? '' }))
    services = staticServices
  }

  return (
    <>
      <HeroSlider />
      <FloatingWidgets />
      <HighlightsBar />
      <RoomsPreview rooms={rooms} />
      <HomeAboutSection />
      <VideoShowcase />
      <ServicesPreview services={services} />
      <GalleryCard />
      <ExploreSection />
      <WhyChooseUs />
      <Gallery />
      <BookingBanner />
    </>
  )
}
