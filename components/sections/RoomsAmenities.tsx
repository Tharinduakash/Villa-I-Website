'use client'
import AnimatedSection from '@/components/AnimatedSection'
import {
  MdBeachAccess,
  MdFreeBreakfast,
  MdWifi,
  MdCleaningServices,
  MdShower,
  MdLock,
} from 'react-icons/md'
import { IconType } from 'react-icons'

const amenities: { icon: IconType; label: string }[] = [
  { icon: MdBeachAccess, label: 'Beach Access' },
  { icon: MdFreeBreakfast, label: 'Breakfast' },
  { icon: MdWifi, label: 'Free WiFi' },
  { icon: MdCleaningServices, label: 'Daily Housekeeping' },
  { icon: MdShower, label: 'Hot Shower' },
  { icon: MdLock, label: 'In-Room Safe' },
]

export default function RoomsAmenities() {
  return (
    <section className="section-gradient-mid border-y border-white/5 py-20">
      <div className="container-padding">
        <AnimatedSection className="text-center mb-14">
          <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">
            Included With Every Stay
          </p>
          <h3 className="font-playfair text-3xl md:text-4xl text-white">All Rooms Include</h3>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {amenities.map((amenity, i) => {
            const Icon = amenity.icon
            return (
              <AnimatedSection key={amenity.label} delay={i * 0.08} className="group">
                <div className="flex flex-col items-center gap-4 p-6 border border-white/5 hover:border-luxury-gold/25 transition-all duration-300 bg-white/[0.02] hover:bg-luxury-gold/[0.04] text-center">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors duration-300">
                    <Icon size={24} className="text-luxury-gold" />
                  </div>
                  <p className="text-white/55 font-lato text-xs tracking-wide group-hover:text-white/80 transition-colors duration-300">
                    {amenity.label}
                  </p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
