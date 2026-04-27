'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MdPeople, MdSquareFoot, MdCheckCircle } from 'react-icons/md'

interface Room {
  id: string
  name: string
  shortName: string
  description: string
  features: string[]
  price: string
  image: string
  capacity: string
  size: string
}

export default function RoomsList({ rooms }: { rooms: Room[] }) {
  return (
    <section className="section-padding section-gradient-b">
      <div className="container-padding space-y-24">
        {rooms.map((room, i) => (
          <motion.div
            key={room.id}
            id={room.id}
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
              <div className="absolute top-5 right-5 bg-luxury-black/80 backdrop-blur-sm border border-luxury-gold/40 px-4 py-2">
                <span className="text-luxury-gold font-lato text-sm tracking-wide">{room.price}</span>
              </div>
            </div>

            {/* Content */}
            <div className="bg-luxury-dark p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">{room.shortName}</p>
              <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4">{room.name}</h2>
              <p className="text-white/55 font-lato text-sm leading-relaxed mb-6">{room.description}</p>

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
  )
}
