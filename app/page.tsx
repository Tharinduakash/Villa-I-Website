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

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FloatingWidgets />
      <HighlightsBar />
      <RoomsPreview />
      <HomeAboutSection />
      <GalleryCard />
      <ExploreSection />
      <WhyChooseUs />
      <Gallery />
      <BookingBanner />
    </>
  )
}
