'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdPeople, MdSquareFoot, MdCheckCircle, MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface Room {
  id: string
  name: string
  shortName: string
  description: string
  features: string[]
  priceUSD: number
  price: string
  image: string
  images: string[]
  capacity: string
  size: string
}

// ── Pricing packages ─────────────────────────────────────────────────
const PACKAGES: Record<'ac' | 'nonac', { label: string; sub: string; price: string }[]> = {
  ac: [
    { label: 'Full Day',   sub: '24 hours',   price: 'Rs. 8,400' },
    { label: '8 Hours',    sub: 'Day use',     price: 'Rs. 5,000' },
    { label: 'Short Time', sub: '3–4 hours',   price: 'Rs. 4,000' },
  ],
  nonac: [
    { label: 'Full Day',   sub: '24 hours',   price: 'Rs. 4,500' },
    { label: '8 Hours',    sub: 'Day use',     price: 'Rs. 3,500' },
    { label: 'Short Time', sub: '3–4 hours',   price: 'Rs. 3,000' },
  ],
}

function detectType(room: Room): 'ac' | 'nonac' | null {
  const n = (room.shortName + ' ' + room.name + ' ' + room.id).toLowerCase()
  if (n.includes('non') || n.includes('garden') || n.includes('non-ac')) return 'nonac'
  if (n.includes('a/c') || n.includes('ac-room') || n.includes('air cond')) return 'ac'
  return null
}

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

// ── Image gallery sub-component ──────────────────────────────────────
function RoomGallery({ image, images }: { image: string; images: string[] }) {
  const allImages = images && images.length > 0 ? images : [image]
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((c) => (c - 1 + allImages.length) % allImages.length)
  const next = () => setCurrent((c) => (c + 1) % allImages.length)

  return (
    <div className="relative h-[360px] lg:h-full min-h-[360px] overflow-hidden group">
      {allImages.map((src, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}`}>
          <Image src={src} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      ))}

      {allImages.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-luxury-black/70 backdrop-blur-sm border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-luxury-gold/50 hover:text-luxury-gold">
            <MdChevronLeft size={22} />
          </button>
          <button onClick={next} aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-luxury-black/70 backdrop-blur-sm border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-luxury-gold/50 hover:text-luxury-gold">
            <MdChevronRight size={22} />
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {allImages.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Image ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${i === current ? 'w-5 h-1.5 bg-luxury-gold' : 'w-1.5 h-1.5 bg-white/40'}`} />
            ))}
          </div>
          <div className="absolute bottom-4 right-4 z-10 bg-luxury-black/60 backdrop-blur-sm px-2 py-0.5">
            <span className="font-lato text-xs text-white/50">{current + 1} / {allImages.length}</span>
          </div>
        </>
      )}
    </div>
  )
}

// ── Pricing panel ─────────────────────────────────────────────────────
function PricingPanel({ room }: { room: Room }) {
  const [activeTab, setActiveTab] = useState(0)
  const roomType = detectType(room)
  const packages = roomType ? PACKAGES[roomType] : null

  if (!packages) {
    // Family / Villa — just show the per-night price
    return (
      <div className="mb-8 p-5" style={{ border: '1px solid rgba(176,141,87,0.18)', background: 'rgba(176,141,87,0.04)' }}>
        <p className="font-lato text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: GOLD_DIM }}>Pricing</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-playfair text-2xl" style={{ color: GOLD }}>{room.price}</p>
            <p className="font-lato text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Per night (LKR)</p>
          </div>
          <div className="text-right">
            <p className="font-playfair text-2xl" style={{ color: GOLD }}>${room.priceUSD.toLocaleString()}</p>
            <p className="font-lato text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Per night (USD)</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-lato text-[9px] tracking-[0.4em] uppercase" style={{ color: GOLD_DIM }}>
          Package Rates
        </p>
        <div className="flex items-center gap-2">
          <span className="block h-px w-8" style={{ background: 'rgba(176,141,87,0.25)' }} />
          <span className="font-lato text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.22)' }}>LKR</span>
        </div>
      </div>

      {/* Three-column tab header */}
      <div className="grid grid-cols-3" style={{ border: '1px solid rgba(176,141,87,0.18)' }}>
        {packages.map((pkg, i) => (
          <button
            key={pkg.label}
            onClick={() => setActiveTab(i)}
            className="py-3 px-2 text-center transition-all duration-250 relative"
            style={{
              background: activeTab === i ? 'rgba(176,141,87,0.12)' : 'transparent',
              borderRight: i < packages.length - 1 ? '1px solid rgba(176,141,87,0.18)' : 'none',
            }}
          >
            <p className="font-lato text-[10px] font-semibold tracking-wide" style={{ color: activeTab === i ? GOLD : 'rgba(255,255,255,0.45)' }}>
              {pkg.label}
            </p>
            <p className="font-lato text-[8px] tracking-wide mt-0.5" style={{ color: 'rgba(255,255,255,0.22)' }}>
              {pkg.sub}
            </p>
            {activeTab === i && (
              <span className="absolute bottom-0 left-0 right-0 h-px" style={{ background: GOLD }} />
            )}
          </button>
        ))}
      </div>

      {/* Active package price block */}
      <div
        className="flex items-center justify-between px-5 py-4 transition-all duration-300"
        style={{ background: 'rgba(176,141,87,0.06)', border: '1px solid rgba(176,141,87,0.18)', borderTop: 'none' }}
      >
        <div>
          <p className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>
            {packages[activeTab].label} · {packages[activeTab].sub}
          </p>
          <p className="font-lato text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.22)' }}>
            Per room, per stay
          </p>
        </div>
        <div className="text-right">
          <p className="font-playfair text-2xl" style={{ color: GOLD }}>
            {packages[activeTab].price}
          </p>
        </div>
      </div>

      {/* All-packages mini-summary */}
      <div className="grid grid-cols-3 mt-2 gap-1.5">
        {packages.map((pkg, i) => (
          <button
            key={pkg.label}
            onClick={() => setActiveTab(i)}
            className="flex flex-col items-center py-2.5 transition-all duration-200"
            style={{
              background: activeTab === i ? 'rgba(176,141,87,0.10)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${activeTab === i ? 'rgba(176,141,87,0.30)' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            <p className="font-lato text-[9px] uppercase tracking-widest mb-1" style={{ color: activeTab === i ? GOLD : 'rgba(255,255,255,0.30)' }}>
              {pkg.label}
            </p>
            <p className="font-playfair text-sm" style={{ color: activeTab === i ? GOLD : 'rgba(255,255,255,0.50)' }}>
              {pkg.price}
            </p>
          </button>
        ))}
      </div>

      {/* Per-night reference */}
      <div className="flex items-center gap-3 mt-3 px-4 py-2.5" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
        <span className="block w-1 h-1 rotate-45 flex-shrink-0" style={{ background: GOLD_DIM }} />
        <p className="font-lato text-[10px]" style={{ color: 'rgba(255,255,255,0.30)' }}>
          Overnight rate:{' '}
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{room.price}</span>
          {' / '}
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>${room.priceUSD.toLocaleString()} USD</span>
        </p>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────
export default function RoomsList({ rooms }: { rooms: Room[] }) {
  return (
    <section className="section-padding section-gradient-b">
      <div className="container-padding space-y-24">
        {rooms.map((room, i) => {
          const reversed = i % 2 !== 0
          return (
            <motion.div
              key={room.id}
              id={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5 overflow-hidden"
            >
              {/* Gallery */}
              <div className={reversed ? 'lg:order-last' : ''}>
                <RoomGallery image={room.image} images={room.images} />
              </div>

              {/* Content */}
              <div className={`bg-luxury-dark px-8 py-10 lg:px-12 lg:py-14 flex flex-col justify-center ${reversed ? 'lg:order-first' : ''}`}>

                <p className="font-lato text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: GOLD_DIM }}>
                  {room.shortName}
                </p>
                <h2 className="font-playfair text-3xl md:text-4xl text-white mb-3">{room.name}</h2>
                <p className="text-white/55 font-lato text-sm leading-relaxed mb-5">{room.description}</p>

                {/* Capacity + Size */}
                <div className="flex gap-6 mb-6">
                  <div className="flex items-center gap-2 text-white/40">
                    <MdPeople size={17} className="text-luxury-gold" />
                    <span className="font-lato text-sm">{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <MdSquareFoot size={17} className="text-luxury-gold" />
                    <span className="font-lato text-sm">{room.size}</span>
                  </div>
                </div>

                {/* ── Pricing panel ── */}
                <PricingPanel room={room} />

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-8">
                  {room.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-white/50 font-lato text-xs">
                      <MdCheckCircle className="text-luxury-gold shrink-0" size={14} />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTAs */}
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
          )
        })}
      </div>
    </section>
  )
}
