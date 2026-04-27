import ServicesHero from '@/components/sections/ServicesHero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ServicesDining from '@/components/sections/ServicesDining'
import ServicesPackages from '@/components/sections/ServicesPackages'
import BookingBanner from '@/components/BookingBanner'
import { prisma } from '@/lib/prisma'
import { FloatingWidgets } from '@/components/floating-widgets'

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } })

  return (
    <>
      <ServicesHero />
      <FloatingWidgets />
      <ServicesGrid services={services} />
      <ServicesDining />
      <ServicesPackages />
      <BookingBanner />
    </>
  )
}
