'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ContactHero() {
  return (
    <section className="relative h-[60vh] min-h-[420px] overflow-hidden flex items-end">
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85"
        alt="Mount Lavinia Beach"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-luxury-black/20" />
      <div className="relative z-10 container-padding w-full pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-luxury-gold font-lato text-xs tracking-[0.4em] uppercase mb-3">Get In Touch</p>
          <h1 className="font-playfair text-5xl md:text-7xl text-white">
            Contact <span className="italic text-luxury-gold">Us</span>
          </h1>
        </motion.div>
      </div>
    </section>
  )
}
