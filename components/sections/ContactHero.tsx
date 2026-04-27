'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Star, MapPin } from 'lucide-react'

const stats = [
  { icon: Clock,  value: '24h',  label: 'Response Time' },
  { icon: Star,   value: '5★',   label: 'Guest Rating'  },
  { icon: MapPin, value: '100m', label: 'From Beach'    },
]

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden" style={{ height: '65vh', minHeight: 480 }}>
      <Image
        src="/webp/hotel.png"
        alt="Villa i Hotel"
        fill
        priority
        className="object-cover scale-105"
        sizes="100vw"
      />
      {/* Layered gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/55 to-luxury-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="container-padding">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-0 pb-12"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.5em' }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="font-lato text-[10px] uppercase text-luxury-gold/65 mb-5"
            >
              Get in Touch
            </motion.p>
            <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-12">
              Contact{' '}
              <span className="italic text-luxury-gold">Us</span>
            </h1>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 border-t"
            style={{ borderColor: 'rgba(201,169,110,0.15)' }}
          >
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className="flex items-center gap-4 py-5 px-5 sm:px-8 border-r last:border-r-0"
                style={{ borderColor: 'rgba(201,169,110,0.10)' }}
              >
                <Icon size={18} className="text-luxury-gold/55 shrink-0" />
                <div>
                  <p className="font-playfair text-xl text-white leading-none">{value}</p>
                  <p className="font-lato text-[9px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
