'use client'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'
import RoomCard from '@/components/RoomCard'
import AnimatedSection from '@/components/AnimatedSection'
import { rooms } from '@/lib/data'

export default function RoomsPreview() {
  return (
    <section className="section-padding bg-luxury-black">
      <div className="container-padding">
        <AnimatedSection className="text-center mb-14">
          <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">Accommodation</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Our <span className="italic text-luxury-gold">Rooms</span>
          </h2>
          <p className="text-white/50 font-lato text-base max-w-xl mx-auto">
            From intimate rooms to full villa exclusives — every space crafted for your perfect stay.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>

        <AnimatedSection className="text-center mt-12" delay={0.3}>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 border border-luxury-gold/40 text-luxury-gold px-8 py-3 font-lato text-xs tracking-[0.2em] uppercase hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
          >
            View All Rooms <HiArrowRight />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
