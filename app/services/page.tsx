import ServicesHero from '@/components/sections/ServicesHero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ServicesDining from '@/components/sections/ServicesDining'
import ServicesPackages from '@/components/sections/ServicesPackages'
import BookingBanner from '@/components/BookingBanner'
import { prisma } from '@/lib/prisma'
import { FloatingWidgets } from '@/components/floating-widgets'
import { services as staticServices } from '@/lib/data'

export default async function ServicesPage() {
  let services: { id: string; title: string; description: string; image: string; features: string[] }[] = []

  try {
    const dbServices = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } })
    services = dbServices.length > 0 ? dbServices : staticServices
  } catch {
    services = staticServices
  }

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
