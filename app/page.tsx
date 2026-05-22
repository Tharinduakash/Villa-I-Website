export const dynamic = 'force-dynamic'

import HeroSlider, { type SlideData } from '@/components/HeroSlider'
import { FloatingWidgets } from '@/components/floating-widgets'
import HighlightsBar from '@/components/sections/HighlightsBar'
import RoomsPreview from '@/components/sections/RoomsPreview'
import HomeAboutSection from '@/components/HomeAboutSection'
import ServicesPreview from '@/components/sections/ServicesPreview'
import VideoShowcase from '@/components/sections/VideoShowcase'
import GalleryCard from '@/components/Gallerycard'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Gallery from '@/components/Gallery'
import BookingBanner from '@/components/BookingBanner'
import { prisma } from '@/lib/prisma'
import { rooms as staticRooms, services as staticServices } from '@/lib/data'

export default async function HomePage() {
  let rooms: { id: any; name: any; shortName: any; description: any; features: any; priceUSD: any; price: any; image: any; capacity: any; size: any }[] = []
  let services: { id: string; title: string; description: string; image: string; features: string[] }[] = []
  let heroSlides: SlideData[] | undefined

  try {
    const [dbRooms, dbServices, dbSlides] = await Promise.all([
      prisma.room.findMany({ orderBy: { createdAt: 'asc' } }),
      prisma.service.findMany({ orderBy: { createdAt: 'asc' }, take: 3 }),
      prisma.heroSlide.findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      }),
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
    if (dbSlides.length > 0) {
      heroSlides = dbSlides.map((s: typeof dbSlides[number]) => ({
        desktopImage: s.desktopImage,
        mobileImage:  s.mobileImage || s.desktopImage,
        accentColor:  s.accentColor,
        accentGlow:   s.accentGlow,
        eyebrow:      s.eyebrow,
        title:        s.title,
        titleItalic:  s.titleItalic,
        titleEnd:     s.titleEnd,
        cta:          { label: s.ctaLabel, href: s.ctaHref },
        ctaSecondary: { label: s.ctaSecondaryLabel, href: s.ctaSecondaryHref },
      }))
    }
    if (rooms.length === 0) rooms = staticRooms.map((r) => ({ ...r, priceUSD: 0, size: r.size ?? '' }))
    if (services.length === 0) services = staticServices
  } catch {
    rooms    = staticRooms.map((r) => ({ ...r, priceUSD: 0, size: r.size ?? '' }))
    services = staticServices
  }

  return (
    <>
      <HeroSlider slides={heroSlides} />
      <FloatingWidgets />
      <HighlightsBar />
      <RoomsPreview rooms={rooms} />
      <HomeAboutSection />
      <VideoShowcase />
      <ServicesPreview services={services} />
      <GalleryCard />
      <WhyChooseUs />
      <Gallery />
      <BookingBanner />
    </>
  )
}
