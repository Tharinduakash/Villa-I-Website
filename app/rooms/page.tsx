'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MdPeople, MdSquareFoot, MdCheckCircle } from 'react-icons/md'
import AnimatedSection from '@/components/AnimatedSection'
import BookingBanner from '@/components/BookingBanner'
import { rooms } from '@/lib/data'

export default function RoomsPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[450px] overflow-hidden flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=85"
          alt="Villa i Hotel Rooms"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-luxury-black/20" />
        <div className="relative z-10 container-padding w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-luxury-gold font-lato text-xs tracking-[0.4em] uppercase mb-3">Accommodation</p>
            <h1 className="font-playfair text-5xl md:text-7xl text-white">
              Our <span className="italic text-luxury-gold">Rooms</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── INTRO ─────────────────────────────────────────────────── */}
      <section className="bg-luxury-dark border-b border-white/5 py-12">
        <div className="container-padding">
          <AnimatedSection className="max-w-2xl">
            <p className="text-white/60 font-lato text-base leading-relaxed">
              Each room at Villa i has been thoughtfully designed to bring comfort and coastal elegance
              together. Choose the space that suits your journey — from intimate rooms to an exclusive
              full villa experience.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── ROOMS LIST ─────────────────────────────────────────────── */}
      <section className="section-padding bg-luxury-black">
        <div className="container-padding space-y-24">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5 overflow-hidden ${
                i % 2 !== 0 ? 'lg:flex lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-[380px] lg:h-auto overflow-hidden group">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Price overlay */}
                <div className="absolute top-5 right-5 bg-luxury-black/80 backdrop-blur-sm border border-luxury-gold/40 px-4 py-2">
                  <span className="text-luxury-gold font-lato text-sm tracking-wide">{room.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="bg-luxury-dark p-10 lg:p-14 flex flex-col justify-center">
                <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">{room.shortName}</p>
                <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4">{room.name}</h2>
                <p className="text-white/55 font-lato text-sm leading-relaxed mb-6">{room.description}</p>

                {/* Meta */}
                <div className="flex gap-6 mb-7">
                  <div className="flex items-center gap-2 text-white/40">
                    <MdPeople size={18} className="text-luxury-gold" />
                    <span className="font-lato text-sm">{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <MdSquareFoot size={18} className="text-luxury-gold" />
                    <span className="font-lato text-sm">{room.size}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-8">
                  {room.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-white/50 font-lato text-xs">
                      <MdCheckCircle className="text-luxury-gold shrink-0" size={14} />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="px-8 py-3.5 bg-luxury-gold text-luxury-black font-lato text-xs tracking-[0.3em] uppercase hover:bg-luxury-gold-light transition-colors duration-300 text-center"
                  >
                    Book Now
                  </Link>
                  <Link
                    href="/contact"
                    className="px-8 py-3.5 border border-white/20 text-white font-lato text-xs tracking-[0.3em] uppercase hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 text-center"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── AMENITIES BAR ──────────────────────────────────────────── */}
      <section className="bg-luxury-dark border-y border-white/5 py-16">
        <div className="container-padding">
          <AnimatedSection className="text-center mb-10">
            <h3 className="font-playfair text-2xl text-white">
              All Rooms Include
            </h3>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: '🌊', label: 'Beach Access' },
              { icon: '🍳', label: 'Breakfast' },
              { icon: '📶', label: 'Free WiFi' },
              { icon: '🧼', label: 'Daily Housekeeping' },
              { icon: '🚿', label: 'Hot Shower' },
              { icon: '🔒', label: 'In-Room Safe' },
            ].map((amenity, i) => (
              <AnimatedSection key={amenity.label} delay={i * 0.08} className="text-center">
                <div className="text-3xl mb-2">{amenity.icon}</div>
                <p className="text-white/50 font-lato text-xs tracking-wide">{amenity.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <BookingBanner />
    </>
  )
}
