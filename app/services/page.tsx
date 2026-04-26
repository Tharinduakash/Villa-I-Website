import ServicesHero from '@/components/sections/ServicesHero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ServicesDining from '@/components/sections/ServicesDining'
import ServicesPackages from '@/components/sections/ServicesPackages'
import BookingBanner from '@/components/BookingBanner'

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesDining />
      <ServicesPackages />
      <BookingBanner />
    </>
  )
}
