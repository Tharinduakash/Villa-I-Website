'use client'
import AnimatedSection from '@/components/AnimatedSection'

const amenities = [
  { icon: '🌊', label: 'Beach Access' },
  { icon: '🍳', label: 'Breakfast' },
  { icon: '📶', label: 'Free WiFi' },
  { icon: '🧼', label: 'Daily Housekeeping' },
  { icon: '🚿', label: 'Hot Shower' },
  { icon: '🔒', label: 'In-Room Safe' },
]

export default function RoomsAmenities() {
  return (
    <section className="section-gradient-mid border-y border-white/5 py-16">
      <div className="container-padding">
        <AnimatedSection className="text-center mb-10">
          <h3 className="font-playfair text-2xl text-white">All Rooms Include</h3>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {amenities.map((amenity, i) => (
            <AnimatedSection key={amenity.label} delay={i * 0.08} className="text-center">
              <div className="text-3xl mb-2">{amenity.icon}</div>
              <p className="text-white/50 font-lato text-xs tracking-wide">{amenity.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
