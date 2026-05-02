'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function RoomsHero() {
  return (
    <section className="relative h-[65vh] min-h-[450px] overflow-hidden flex items-end">
      <Image
        src="/webp/IMG_3236.png"
        alt="Villa I Hotel Rooms"
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
  )
}
