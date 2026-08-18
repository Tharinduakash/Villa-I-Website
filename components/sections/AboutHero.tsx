'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-end">
      <Image
        src="/webp/area.png"
        alt="Villa i Hotel Exterior"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
   <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/5 to-luxury-black/10" />
      
      {/* Bottom bleed — fully erases the seam with the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, #06080f 75%)' }} />
      <div className="relative z-10 container-padding w-full pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-luxury-gold font-lato text-xs tracking-[0.4em] uppercase mb-3">Our Story</p>
          <h1 className="font-playfair text-5xl md:text-7xl text-white">
            About <Image
              src="/webp/villa_logo_transparent.png"
              alt="Villa i"
              width={220}
              height={80}
              className="object-contain inline-block w-36 md:w-48 lg:w-56 h-auto"
              style={{ verticalAlign: 'middle' }}
            />
          </h1>
        </motion.div>
      </div>
    </section>
  )
}
