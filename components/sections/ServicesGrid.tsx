'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'

// Fallback images used when a service has no image set in the DB.
// Keyed by service id first, then position index.
const FALLBACK_BY_ID: Record<string, string> = {
  accommodation:  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
  dining:         'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=85',
  spa:            'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=85',
  beach:          'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85',
  wellness:       'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=85',
  party:          'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=85',
  'juice-corner': 'https://images.unsplash.com/photo-1546173159-315724a31696?w=900&q=85',
  byob:           'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=85',
}

const FALLBACK_BY_INDEX = [
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=85',
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=85',
  'https://images.unsplash.com/photo-1546173159-315724a31696?w=900&q=85',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=85',
]

// Alternating Large/Small pattern that tiles correctly for any number of services:
// Pair 0 → Large then Small (L S), Pair 1 → Small then Large (S L), Pair 2 → L S …
// This ensures every two cards fill exactly 3 columns with no gaps.
const isLarge = (i: number) => (Math.floor(i / 2) + i) % 2 === 0

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

interface Service {
  id: string
  title: string
  description: string
  image: string
  features: string[]
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const large = isLarge(index)
  // Use DB image if set, otherwise fall back by id, then by position
  const imageUrl =
    service.image ||
    FALLBACK_BY_ID[service.id] ||
    FALLBACK_BY_INDEX[index % FALLBACK_BY_INDEX.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className={`group relative overflow-hidden ${large ? 'md:col-span-2' : 'md:col-span-1'}`}
      style={{
        border: '1px solid rgba(176,141,87,0.10)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(176,141,87,0.40)'
        e.currentTarget.style.boxShadow   = '0 12px 48px rgba(0,0,0,0.6)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(176,141,87,0.10)'
        e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,0,0,0.45)'
      }}
    >
      {/* ── Image ── */}
      <div className={`relative overflow-hidden ${large ? 'h-72 sm:h-80 md:h-96' : 'h-64 sm:h-72 md:h-80'}`}>
        <Image
          src={imageUrl}
          alt={service.title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
          unoptimized={imageUrl.startsWith('/uploads/')}
        />

        {/* Gradient — fades into content below */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,7,14,0.04) 0%, rgba(5,7,14,0.12) 40%, rgba(5,7,14,0.82) 80%, rgba(5,7,14,1) 100%)',
          }}
        />

        {/* Gold shimmer on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(176,141,87,0.10) 0%, transparent 50%, rgba(176,141,87,0.06) 100%)',
          }}
        />

        {/* Corner ornaments */}
        <div className="absolute top-0 left-0 pointer-events-none z-10">
          <div className="w-7 h-px transition-all duration-500 group-hover:w-12" style={{ background: GOLD }} />
          <div className="w-px h-7 transition-all duration-500 group-hover:h-12" style={{ background: GOLD }} />
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none z-10 flex flex-col items-end">
          <div className="w-px h-7 transition-all duration-500 group-hover:h-12" style={{ background: GOLD }} />
          <div className="w-7 h-px transition-all duration-500 group-hover:w-12" style={{ background: GOLD }} />
        </div>

        {/* Index watermark */}
        <span
          className="absolute top-4 right-5 font-playfair italic text-5xl leading-none select-none z-10"
          style={{ color: 'rgba(176,141,87,0.12)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* ── Content ── */}
      <div
        className="relative p-6 md:p-8"
        style={{ background: 'linear-gradient(160deg, rgba(10,13,28,1) 0%, rgba(6,8,15,1) 100%)' }}
      >
        <h3 className="font-playfair text-xl md:text-2xl text-white mb-3 transition-colors duration-300 group-hover:text-luxury-gold">
          {service.title}
        </h3>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="block h-px transition-all duration-500 group-hover:flex-1"
            style={{ width: '2.5rem', background: 'rgba(176,141,87,0.45)' }}
          />
          <span className="block w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: 'rgba(176,141,87,0.55)' }} />
          <span className="block h-px w-6" style={{ background: 'rgba(176,141,87,0.22)' }} />
        </div>

        <p className="font-lato text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {service.description}
        </p>

        {/* Features */}
        <ul className={`gap-2 mb-7 ${large ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-col'}`}>
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2.5 group/feat">
              <span
                className="flex-shrink-0 w-[5px] h-[5px] rotate-45 transition-transform duration-300 group-hover/feat:scale-125"
                style={{ background: 'rgba(176,141,87,0.50)' }}
              />
              <span
                className="font-lato text-xs tracking-wide transition-colors duration-250 group-hover/feat:text-white/65"
                style={{ color: 'rgba(255,255,255,0.38)' }}
              >
                {feat}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className="group/btn inline-flex items-center gap-3 font-lato text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
          style={{ color: GOLD_DIM }}
          onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
          onMouseLeave={(e) => (e.currentTarget.style.color = GOLD_DIM)}
        >
          Book This Experience
          <span
            className="flex items-center justify-center w-7 h-7 transition-all duration-300 group-hover/btn:bg-luxury-gold"
            style={{ border: '1px solid rgba(176,141,87,0.35)' }}
          >
            <HiArrowRight
              size={11}
              className="group-hover/btn:text-luxury-black group-hover/btn:translate-x-0.5 transition-all duration-300"
            />
          </span>
        </Link>
      </div>
    </motion.div>
  )
}

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="section-padding section-gradient-b">
      <div className="container-padding">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-5 mb-5">
            <span className="block h-px w-12" style={{ background: 'rgba(201,169,110,0.35)' }} />
            <p className="font-lato text-xs tracking-[0.38em] uppercase" style={{ color: 'rgba(201,169,110,0.75)' }}>
              What We Offer
            </p>
            <span className="block h-px w-12" style={{ background: 'rgba(201,169,110,0.35)' }} />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Crafted for Your{' '}
            <span className="italic" style={{ color: GOLD }}>Comfort</span>
          </h2>
          <p className="font-lato text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Every service at Villa i is designed to make your stay seamless, memorable, and deeply relaxing.
          </p>
        </div>

        {/* Grid — 3-column base, alternating large/small */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
