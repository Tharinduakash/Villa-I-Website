'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import RoomCard from '@/components/RoomCard'
import Gallery from '@/components/Gallery'
import BookingBanner from '@/components/BookingBanner'
import AnimatedSection from '@/components/AnimatedSection'
import { rooms, highlights, whyChooseUs } from '@/lib/data'
import { FloatingWidgets } from '@/components/floating-widgets'

const highlightIcons: Record<string, React.ReactNode> = {
  beach: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 22c2-4 5-7 10-7s8 3 10 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 15V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 8C14 8 9 11 7 8c3-3 7-2 7 0z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M14 8C14 8 19 11 21 8c-3-3-7-2-7 0z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <circle cx="14" cy="6" r="1.5" fill="currentColor" />
    </svg>
  ),
  privacy: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3L5 7v7c0 5.25 3.85 10.15 9 11.35C19.15 24.15 23 19.25 23 14V7L14 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 14l3 3 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  meals: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 4v6a4 4 0 004 4v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 4v4M11 4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M19 4v20M19 4c0 0 4 2 4 7h-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  climate: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4v12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="14" cy="20" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 8h-3M8 12H6M23 8h-3M22 12h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
}

const experienceCards = [
  {
    title: 'Beachfront Access',
    desc: 'Step onto the sand in under two minutes from your room.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M3 17c2-3 4.5-5 9-5s7 2 9 5" />
        <path d="M12 12V7" />
        <path d="M12 7c0 0-4 2.5-6 0 2.5-2.5 6-2 6 0z" />
        <path d="M12 7c0 0 4 2.5 6 0-2.5-2.5-6-2-6 0z" />
      </svg>
    ),
  },
  {
    title: 'Full Villa Privacy',
    desc: 'Exclusive bookings available for families and groups.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M12 2L3 7v7c0 4.5 3.3 8.7 7.7 9.7a2 2 0 00.6.1c.2 0 .4 0 .6-.1C16.7 22.7 20 18.5 20 14V7L12 2z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Meals Included',
    desc: 'Authentic Sri Lankan cuisine served fresh each morning.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
]

const experienceStats = [
  { value: '100m', label: 'From the Shore' },
  { value: '12+', label: 'Luxury Rooms' },
  { value: '4.9', label: 'Guest Rating' },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const experienceRef = useRef(null)

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

  const { scrollYProgress: expScroll } = useScroll({
    target: experienceRef,
    offset: ['start end', 'end start'],
  })
  const expY = useTransform(expScroll, [0, 1], ['-10%', '10%'])

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────── */}
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

      <FloatingWidgets />

      {/* ─── HIGHLIGHTS BAR ────────────────────────────────────────── */}
      <section className="bg-luxury-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative flex flex-col items-center gap-4 py-10 px-6 text-center cursor-default"
              >
                {i > 0 && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-white/8 hidden md:block" />
                )}
                <div className="relative flex items-center justify-center w-14 h-14">
                  <div className="absolute inset-0 rounded-full border border-luxury-gold/15 group-hover:border-luxury-gold/40 transition-all duration-500" />
                  <div className="absolute inset-0 rounded-full bg-luxury-gold/0 group-hover:bg-luxury-gold/5 transition-all duration-500" />
                  <span className="relative text-white/40 group-hover:text-luxury-gold transition-colors duration-300">
                    {highlightIcons[item.icon]}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/80 font-lato text-xs tracking-[0.2em] uppercase group-hover:text-luxury-gold transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="block h-px w-0 group-hover:w-full bg-luxury-gold/50 mx-auto transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROOMS PREVIEW ─────────────────────────────────────────── */}
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

      {/* ─── EXPERIENCE / PARALLAX ─────────────────────────────────── */}
      <section ref={experienceRef} className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
        {/* Parallax background */}
        <motion.div className="absolute inset-0" style={{ y: expY }}>
          <Image
            src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=85"
            alt="Ocean Sunset at Mount Lavinia"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(8,7,5,0.97) 0%, rgba(8,7,5,0.88) 35%, rgba(8,7,5,0.50) 60%, rgba(8,7,5,0.15) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(8,7,5,1) 0%, rgba(8,7,5,0.4) 18%, transparent 40%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,7,5,0.5) 0%, transparent 20%)',
          }}
        />

        {/* Decorative vertical line */}
        <div
          className="absolute left-20 top-0 bottom-0 w-px hidden lg:block"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(176,141,87,0.35) 30%, rgba(176,141,87,0.35) 70%, transparent)',
          }}
        />

        {/* Main content */}
        <div className="relative z-10 flex items-center min-h-[90vh]">
          <div className="container-padding w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — text */}
              <AnimatedSection direction="left" className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="flex items-center gap-4 mb-8"
                >
                  <span className="block h-px w-10" style={{ background: 'rgba(176,141,87,0.7)' }} />
                  <p className="font-lato text-xs tracking-[0.4em] uppercase text-luxury-gold">The Experience</p>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6"
                >
                  Wake up to the
                  <br />
                  <span className="italic" style={{ color: 'rgba(176,141,87,1)' }}>sound of waves</span>
                </motion.h2>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ originX: 0 }}
                  className="flex items-center gap-3 mb-7"
                >
                  <span className="block h-px w-14" style={{ background: 'rgba(176,141,87,0.45)' }} />
                  <span className="block w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(176,141,87,0.6)' }} />
                  <span className="block h-px w-6" style={{ background: 'rgba(176,141,87,0.25)' }} />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="font-lato text-base leading-relaxed mb-10"
                  style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '28rem' }}
                >
                  Step outside and feel the warm Indian Ocean breeze. At Villa i Hotel,
                  the beach is not just nearby — it is part of your everyday experience.
                  Let the rhythm of the sea set the tone for your perfect holiday.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.65 }}
                  className="flex items-center gap-6"
                >
                  <Link
                    href="/about"
                    className="group flex items-center gap-3 font-lato text-xs tracking-[0.25em] uppercase transition-all duration-300"
                    style={{ color: 'rgba(176,141,87,0.9)' }}
                  >
                    Our Story
                    <span
                      className="flex items-center justify-center w-8 h-8 transition-all duration-300 group-hover:bg-luxury-gold"
                      style={{ border: '1px solid rgba(176,141,87,0.4)' }}
                    >
                      <HiArrowRight
                        size={13}
                        className="group-hover:text-luxury-black group-hover:translate-x-0.5 transition-all duration-300"
                      />
                    </span>
                  </Link>

                  <span className="block w-px h-6" style={{ background: 'rgba(176,141,87,0.2)' }} />

                  <Link
                    href="/contact"
                    className="font-lato text-xs tracking-[0.25em] uppercase transition-colors duration-300 hover:text-luxury-gold"
                    style={{ color: 'rgba(255,255,255,0.40)' }}
                  >
                    Book Direct
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="flex items-center gap-8 mt-14 pt-8"
                  style={{ borderTop: '1px solid rgba(176,141,87,0.12)' }}
                >
                  {experienceStats.map((stat) => (
                    <div key={stat.label} className="group flex flex-col gap-1 cursor-default">
                      <span
                        className="font-playfair text-2xl transition-colors duration-300 group-hover:text-luxury-gold"
                        style={{ color: 'rgba(176,141,87,0.9)' }}
                      >
                        {stat.value}
                      </span>
                      <span
                        className="font-lato text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-white/50"
                        style={{ color: 'rgba(255,255,255,0.30)' }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatedSection>

              {/* Right — feature cards */}
              <AnimatedSection direction="right" className="hidden lg:flex flex-col gap-4">
                {experienceCards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                    whileHover={{ x: -6 }}
                    className="group flex items-start gap-5 p-5 cursor-default"
                    style={{
                      background: 'linear-gradient(135deg, rgba(176,141,87,0.06) 0%, rgba(8,7,5,0.6) 100%)',
                      border: '1px solid rgba(176,141,87,0.10)',
                      backdropFilter: 'blur(12px)',
                      transition: 'border-color 0.3s ease, background 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(176,141,87,0.35)'
                      e.currentTarget.style.background =
                        'linear-gradient(135deg, rgba(176,141,87,0.10) 0%, rgba(8,7,5,0.7) 100%)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(176,141,87,0.10)'
                      e.currentTarget.style.background =
                        'linear-gradient(135deg, rgba(176,141,87,0.06) 0%, rgba(8,7,5,0.6) 100%)'
                    }}
                  >
                    <div
                      className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 group-hover:bg-luxury-gold/15"
                      style={{ border: '1px solid rgba(176,141,87,0.25)', color: 'rgba(176,141,87,0.8)' }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <h4
                        className="font-playfair text-base mb-1 transition-colors duration-300 group-hover:text-luxury-gold"
                        style={{ color: 'rgba(255,255,255,0.85)' }}
                      >
                        {card.title}
                      </h4>
                      <p className="font-lato text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                        {card.desc}
                      </p>
                    </div>
                    <HiArrowRight
                      size={14}
                      className="ml-auto flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                      style={{ color: 'rgba(176,141,87,0.7)' }}
                    />
                  </motion.div>
                ))}
              </AnimatedSection>

            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ───────────────────────────────────────────────── */}
      <Gallery />

      {/* ─── WHY CHOOSE US ─────────────────────────────────────────── */}
<section className="section-padding bg-luxury-black overflow-hidden">
  <div className="container-padding">
 
    {/* ── Header ── */}
    <AnimatedSection className="text-center mb-16">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="block h-px w-10" style={{ background: 'rgba(176,141,87,0.5)' }} />
        <p className="font-lato text-xs tracking-[0.4em] uppercase text-luxury-gold">Why Villa i</p>
        <span className="block h-px w-10" style={{ background: 'rgba(176,141,87,0.5)' }} />
      </div>
      <h2 className="font-playfair text-4xl md:text-5xl text-white">
        More Than a{' '}
        <span className="italic text-luxury-gold">Stay</span>
      </h2>
    </AnimatedSection>
 
    {/* ── Cards Grid ── */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          title: 'Local Experience',
          description:
            'Immerse yourself in authentic Sri Lankan hospitality, culture, and cuisine, guided by a passionate local team.',
          image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80',
          tag: 'Culture & Heritage',
          stat: '10+ Years',
          statLabel: 'Local Expertise',
        },
        {
          title: 'Private & Peaceful',
          description:
            'Escape the crowds with our secluded villa setting. Your personal oasis awaits, with garden spaces and quiet luxury.',
          image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
          tag: 'Seclusion & Nature',
          stat: '100m',
          statLabel: 'From the Beach',
        },
        {
          title: 'Affordable Luxury',
          description:
            'Experience world-class comfort and service at prices that make luxury accessible. Exceptional value by the sea.',
          image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
          tag: 'Premium Value',
          stat: '4.9★',
          statLabel: 'Guest Rating',
        },
      ].map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: i * 0.15 }}
          whileHover={{ y: -8 }}
          className="group relative overflow-hidden flex flex-col"
          style={{
            border: '1px solid rgba(176,141,87,0.10)',
            background: 'linear-gradient(160deg, #1a1710 0%, #0a0907 100%)',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.borderColor = 'rgba(176,141,87,0.40)'
            el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(176,141,87,0.07)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.borderColor = 'rgba(176,141,87,0.10)'
            el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'
          }}
        >
          {/* Corner ornaments */}
          <div className="absolute top-0 left-0 z-20 pointer-events-none">
            <div className="w-6 h-px transition-all duration-500 group-hover:w-10"
              style={{ background: 'linear-gradient(to right, rgba(176,141,87,0.9), transparent)' }} />
            <div className="w-px h-6 transition-all duration-500 group-hover:h-10"
              style={{ background: 'linear-gradient(to bottom, rgba(176,141,87,0.9), transparent)' }} />
          </div>
          <div className="absolute bottom-0 right-0 z-20 pointer-events-none">
            <div className="w-6 h-px ml-auto transition-all duration-500 group-hover:w-10"
              style={{ background: 'linear-gradient(to left, rgba(176,141,87,0.9), transparent)' }} />
            <div className="w-px h-6 ml-auto transition-all duration-500 group-hover:h-10"
              style={{ background: 'linear-gradient(to top, rgba(176,141,87,0.9), transparent)', marginLeft: 'auto' }} />
          </div>
 
          {/* ── Image Block ── */}
          <div className="relative h-64 overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 ease-out"
              style={{ transform: 'scale(1.0)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.0)' }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
 
            {/* Image overlays */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(9,8,6,0.08) 0%, rgba(9,8,6,0.10) 40%, rgba(10,9,7,0.80) 80%, rgba(10,9,7,1) 100%)',
              }}
            />
            {/* Gold shimmer on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(176,141,87,0.10) 0%, transparent 50%, rgba(176,141,87,0.06) 100%)',
              }}
            />
 
            {/* Tag chip — top left */}
            <div
              className="absolute top-4 left-4 px-2.5 py-1"
              style={{
                background: 'rgba(9,8,6,0.75)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(176,141,87,0.25)',
              }}
            >
              <span className="font-lato text-[9px] tracking-[0.3em] uppercase text-luxury-gold/80">
                {item.tag}
              </span>
            </div>
 
            {/* Stat — bottom right */}
            <div className="absolute bottom-4 right-5 text-right">
              <p
                className="font-playfair text-2xl leading-none transition-colors duration-300 group-hover:text-luxury-gold"
                style={{ color: 'rgba(176,141,87,0.9)' }}
              >
                {item.stat}
              </p>
              <p
                className="font-lato text-[9px] tracking-[0.2em] uppercase mt-0.5"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {item.statLabel}
              </p>
            </div>
          </div>
 
          {/* ── Content Block ── */}
          <div className="flex flex-col flex-1 px-6 pt-5 pb-6">
 
            {/* Title */}
            <h3
              className="font-playfair text-xl mb-3 transition-colors duration-300 group-hover:text-luxury-gold"
              style={{ color: 'rgba(255,255,255,0.92)' }}
            >
              {item.title}
            </h3>
 
            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-px flex-1" style={{ background: 'rgba(176,141,87,0.12)' }} />
              <span
                className="block w-1 h-1 rotate-45"
                style={{ background: 'rgba(176,141,87,0.35)' }}
              />
              <span className="block h-px flex-1" style={{ background: 'rgba(176,141,87,0.12)' }} />
            </div>
 
            {/* Description */}
            <p
              className="font-lato text-sm leading-relaxed flex-1"
              style={{ color: 'rgba(255,255,255,0.42)' }}
            >
              {item.description}
            </p>
 
            {/* Bottom sweep line */}
            <div
              className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(176,141,87,0.7), transparent)',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
 
  </div>
</section>

      {/* ─── BOOKING BANNER ────────────────────────────────────────── */}
      <BookingBanner />
    </>
  )
}
