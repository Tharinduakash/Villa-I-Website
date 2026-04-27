'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import { HiArrowRight } from 'react-icons/hi'

// ── Service images mapped by id ────────────────────────────────────
const SERVICE_IMAGES: Record<string, string> = {
  accommodation: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
  dining:        'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=85',
  beach:         'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85',
  wellness:      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=85',
}

// ── Layout alternates large/small per pair ─────────────────────────
// Row 0: card[0] = large (col-span-2), card[1] = small
// Row 1: card[2] = small, card[3] = large (col-span-2)
const isLarge = (i: number) => i === 0 || i === 3

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

interface Service {
  id: string
  title: string
  description: string
  features: string[]
}

// ── Single card ────────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const large = isLarge(index)
  const image = SERVICE_IMAGES[service.id] ?? SERVICE_IMAGES['accommodation']

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      // On md+: large cards span 2 cols, small cards span 1
      className={`group relative overflow-hidden ${
        large ? 'md:col-span-2' : 'md:col-span-1'
      }`}
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
      <div
        className={`relative overflow-hidden ${
          large ? 'h-72 sm:h-80 md:h-96' : 'h-64 sm:h-72 md:h-80'
        }`}
      >
        <Image
          src={image}
          alt={service.title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
        />

        {/* Gradient — fades image into content below */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,7,5,0.04) 0%, rgba(8,7,5,0.12) 40%, rgba(8,7,5,0.82) 80%, rgba(8,7,5,1) 100%)',
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
          <div
            className="w-7 h-px transition-all duration-500 group-hover:w-12"
            style={{ background: GOLD }}
          />
          <div
            className="w-px h-7 transition-all duration-500 group-hover:h-12"
            style={{ background: GOLD }}
          />
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none z-10 flex flex-col items-end">
          <div
            className="w-px h-7 transition-all duration-500 group-hover:h-12"
            style={{ background: GOLD }}
          />
          <div
            className="w-7 h-px transition-all duration-500 group-hover:w-12"
            style={{ background: GOLD }}
          />
        </div>

        {/* Service index watermark */}
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
        style={{
          background: 'linear-gradient(160deg, rgba(20,18,12,1) 0%, rgba(10,9,6,1) 100%)',
        }}
      >
        {/* Title */}
        <h3
          className="font-playfair text-xl md:text-2xl text-white mb-3 transition-colors duration-300 group-hover:text-luxury-gold"
        >
          {service.title}
        </h3>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="block h-px transition-all duration-500 group-hover:flex-1"
            style={{ width: '2.5rem', background: 'rgba(176,141,87,0.45)' }}
          />
          <span
            className="block w-1.5 h-1.5 rotate-45 flex-shrink-0"
            style={{ background: 'rgba(176,141,87,0.55)' }}
          />
          <span
            className="block h-px w-6"
            style={{ background: 'rgba(176,141,87,0.22)' }}
          />
        </div>

        {/* Description */}
        <p
          className="font-lato text-sm leading-relaxed mb-6"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          {service.description}
        </p>

        {/* Features — two columns on large cards */}
        <ul
          className={`gap-2 mb-7 ${
            large ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-col'
          }`}
        >
          {service.features.map((feat, fi) => (
            <li
              key={feat}
              className="flex items-center gap-2.5 group/feat"
            >
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

        {/* Bottom gold sweep */}
        <div
          className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.75), transparent)',
          }}
        />
      </div>
    </motion.div>
  )
}

// ── Main grid section ──────────────────────────────────────────────
export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="section-padding section-gradient-b overflow-hidden">
      <div className="container-padding">

        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block h-px w-10" style={{ background: GOLD_DIM }} />
            <p className="font-lato text-xs tracking-[0.4em] uppercase" style={{ color: GOLD_DIM }}>
              Experiences
            </p>
            <span className="block h-px w-10" style={{ background: GOLD_DIM }} />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl text-white">
            Crafted for Your{' '}
            <span className="italic text-luxury-gold">Comfort</span>
          </h2>
          <p
            className="font-lato text-base max-w-xl mx-auto mt-4"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            Every service at Villa i is designed to make your stay seamless, memorable, and deeply relaxing.
          </p>
        </AnimatedSection>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}