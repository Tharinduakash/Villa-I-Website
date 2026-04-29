'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

const FALLBACK_IMAGES: Record<string, string> = {
  accommodation:  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
  spa:            'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=85',
  beach:          'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85',
  party:          'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=85',
  'juice-corner': 'https://images.unsplash.com/photo-1546173159-315724a31696?w=900&q=85',
  byob:           'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=85',
}

const FALLBACK_BY_INDEX = [
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=85',
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85',
]

interface Service {
  id: string
  title: string
  description: string
  image: string
  features: string[]
}

function ServicePreviewCard({ service, index }: { service: Service; index: number }) {
  const imageUrl = service.image || FALLBACK_IMAGES[service.id] || FALLBACK_BY_INDEX[index % FALLBACK_BY_INDEX.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.13 }}
      className="group relative overflow-hidden flex flex-col"
      style={{
        border: '1px solid rgba(176,141,87,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(176,141,87,0.38)'
        e.currentTarget.style.boxShadow   = '0 12px 40px rgba(0,0,0,0.55)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(176,141,87,0.12)'
        e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,0,0,0.4)'
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized={imageUrl.startsWith('/uploads/')}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,7,14,0.05) 0%, rgba(5,7,14,0.15) 40%, rgba(5,7,14,0.80) 80%, rgba(5,7,14,1) 100%)',
          }}
        />
        {/* Corner ornaments */}
        <div className="absolute top-0 left-0 pointer-events-none z-10">
          <div className="w-6 h-px transition-all duration-500 group-hover:w-10" style={{ background: GOLD }} />
          <div className="w-px h-6 transition-all duration-500 group-hover:h-10" style={{ background: GOLD }} />
        </div>
        {/* Number watermark */}
        <span
          className="absolute top-3 right-4 font-playfair italic text-4xl leading-none select-none z-10"
          style={{ color: 'rgba(176,141,87,0.14)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-col p-6"
        style={{ background: 'linear-gradient(160deg, rgba(10,13,28,1) 0%, rgba(6,8,15,1) 100%)' }}
      >
        <h3 className="font-playfair text-xl text-white mb-2 transition-colors duration-300 group-hover:text-luxury-gold">
          {service.title}
        </h3>

        {/* Gold divider */}
        <div className="flex items-center gap-2 mb-3">
          <span className="block h-px w-8 transition-all duration-500 group-hover:w-14" style={{ background: 'rgba(176,141,87,0.45)' }} />
          <span className="block w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(176,141,87,0.5)' }} />
        </div>

        <p className="font-lato text-sm leading-relaxed mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
          {service.description}
        </p>

        {/* Top 3 features */}
        <ul className="flex flex-col gap-1.5 mb-6">
          {service.features.slice(0, 3).map((feat) => (
            <li key={feat} className="flex items-center gap-2.5">
              <span className="flex-shrink-0 w-[4px] h-[4px] rotate-45" style={{ background: 'rgba(176,141,87,0.5)' }} />
              <span className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.36)' }}>{feat}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/services"
          className="group/btn inline-flex items-center gap-2.5 font-lato text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
          style={{ color: GOLD_DIM }}
          onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
          onMouseLeave={(e) => (e.currentTarget.style.color = GOLD_DIM)}
        >
          Discover More
          <span
            className="flex items-center justify-center w-6 h-6 transition-all duration-300 group-hover/btn:bg-luxury-gold"
            style={{ border: '1px solid rgba(176,141,87,0.35)' }}
          >
            <HiArrowRight size={10} className="group-hover/btn:text-luxury-black group-hover/btn:translate-x-0.5 transition-all duration-300" />
          </span>
        </Link>
      </div>
    </motion.div>
  )
}

export default function ServicesPreview({ services }: { services: Service[] }) {
  if (services.length === 0) return null

  const preview = services.slice(0, 3)

  return (
    <section className="section-padding section-gradient-b">
      <div className="container-padding">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-5 mb-5">
            <span className="block h-px w-12" style={{ background: 'rgba(201,169,110,0.35)' }} />
            <p className="font-lato text-xs tracking-[0.38em] uppercase" style={{ color: 'rgba(201,169,110,0.75)' }}>
              Our Services
            </p>
            <span className="block h-px w-12" style={{ background: 'rgba(201,169,110,0.35)' }} />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Experience 
            <Image
                          src="/webp/villa_logo_transparent.png"
                          alt="Villa i"
                          width={200}
                          height={80}
                          className="object-contain inline-block w-36 md:w-48 lg:w-52"
                          style={{ verticalAlign: 'middle' }}
                        />
          </h2>
          <p className="font-lato text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Every service at Villa I is crafted for your comfort. We ensure every moment is unforgettable.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {preview.map((service, i) => (
            <ServicePreviewCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-4 px-8 py-4 font-lato text-xs tracking-[0.3em] uppercase transition-all duration-300"
            style={{ border: '1px solid rgba(201,169,110,0.35)', color: GOLD }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201,169,110,0.08)'
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.65)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)'
            }}
          >
            View All Services
            <HiArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  )
}
