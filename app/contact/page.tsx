import ContactHero from '@/components/sections/ContactHero'
import ContactSection from '@/components/sections/ContactSection'
import ContactMap from '@/components/sections/ContactMap'
import { FloatingWidgets } from '@/components/floating-widgets'

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <FloatingWidgets />
      <ContactSection />
      <ContactMap />
    </>
  )
}
