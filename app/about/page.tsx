import AboutHero from '@/components/sections/AboutHero'
import AboutIntro from '@/components/sections/AboutIntro'
import AboutStats from '@/components/sections/AboutStats'
import AboutStory from '@/components/sections/AboutStory'
import AboutLocation from '@/components/sections/AboutLocation'
import BookingBanner from '@/components/BookingBanner'
import { FloatingWidgets } from '@/components/floating-widgets'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FloatingWidgets />
      <AboutIntro />
      <AboutStats />
      <AboutStory />
      <AboutLocation />
      <BookingBanner />
    </>
  )
}
