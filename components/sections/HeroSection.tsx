'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HiArrowRight } from 'react-icons/hi'

export default function HeroSection() {
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: heroY }}>
        <Image
          src="/webp/hotel.png"
          alt="Mount Lavinia Beach"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/90 via-luxury-black/50 to-luxury-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-luxury-black/30" />

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        style={{ originY: 0 }}
        className="absolute left-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-luxury-gold/40 to-transparent hidden lg:block"
      />

      <motion.div
        className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-3xl"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="block h-px w-10 bg-luxury-gold/50" />
          <p className="text-luxury-gold font-lato text-xs tracking-[0.4em] uppercase">Mount Lavinia</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-8"
        >
          Escape to
          <br />
          <span className="italic text-luxury-gold">Luxury</span>
          <br />
          <span className="text-white/90">by the Sea</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{ originX: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="block h-px w-16 bg-luxury-gold/50" />
          <span className="block w-1.5 h-1.5 rotate-45 bg-luxury-gold/60" />
          <span className="block h-px w-6 bg-luxury-gold/30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <Link
            href="/contact"
            className="px-10 py-4 bg-luxury-gold text-luxury-black font-lato text-xs tracking-[0.3em] uppercase hover:bg-luxury-gold-light transition-colors duration-300"
          >
            Reserve Your Stay
          </Link>
          <Link
            href="/rooms"
            className="group flex items-center gap-3 px-10 py-4 border border-white/20 text-white/80 font-lato text-xs tracking-[0.3em] uppercase hover:border-luxury-gold/60 hover:text-luxury-gold transition-all duration-300"
          >
            Explore Rooms
            <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute top-8 right-8 hidden lg:flex flex-col items-end gap-1"
      >
        <span className="block h-px w-16 bg-luxury-gold/25" />
        <span className="block h-px w-8 bg-luxury-gold/15" />
      </motion.div>
    </section>
  )
}
