'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MdPeople, MdSquareFoot } from 'react-icons/md'
import { HiArrowRight } from 'react-icons/hi'

interface Room {
  id: string
  name: string
  shortName: string
  description: string
  features: string[]
  priceUSD: number
  price: string
  image: string
  capacity: string
  size: string
}

// ── Pricing packages ─────────────────────────────────────────────────
const PACKAGES: Record<'ac' | 'nonac', { label: string; price: string }[]> = {
  ac: [
    { label: 'Full Day',   price: 'Rs. 8,400' },
    { label: '8 Hours',    price: 'Rs. 5,000' },
    { label: 'Short Time', price: 'Rs. 4,000' },
  ],
  nonac: [
    { label: 'Full Day',   price: 'Rs. 4,500' },
    { label: '8 Hours',    price: 'Rs. 3,500' },
    { label: 'Short Time', price: 'Rs. 3,000' },
  ],
}

function detectType(room: Room): 'ac' | 'nonac' | null {
  const n = (room.shortName + ' ' + room.name + ' ' + room.id).toLowerCase()
  if (n.includes('non') || n.includes('garden') || n.includes('non-ac')) return 'nonac'
  if (n.includes('a/c') || n.includes('ac-room') || n.includes('air cond')) return 'ac'
  return null
}

const ROOM_FALLBACKS = [
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
  'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
]

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

export default function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  const roomNumber = String(index + 1).padStart(2, '0')
  const [imgSrc, setImgSrc] = useState(room.image || ROOM_FALLBACKS[index % ROOM_FALLBACKS.length])
  const [activeTab, setActiveTab] = useState(0)

  const roomType  = detectType(room)
  const packages  = roomType ? PACKAGES[roomType] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex flex-col overflow-hidden h-[580px]"
      style={{
        background: 'linear-gradient(145deg, #0f1228 0%, #0a0d1c 40%, #06080f 100%)',
        border: '1px solid rgba(176,141,87,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(176,141,87,0.45)'
        e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(176,141,87,0.08), inset 0 1px 0 rgba(176,141,87,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(176,141,87,0.12)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)'
      }}
    >
      {/* Corner ornaments */}
      <div className="absolute top-0 left-0 w-8 h-8 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px transition-all duration-500 group-hover:w-12" style={{ background: 'linear-gradient(to right, rgba(176,141,87,0.9), transparent)' }} />
        <div className="absolute top-0 left-0 h-full w-px transition-all duration-500 group-hover:h-12" style={{ background: 'linear-gradient(to bottom, rgba(176,141,87,0.9), transparent)' }} />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8 z-20 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-px transition-all duration-500 group-hover:w-12" style={{ background: 'linear-gradient(to left, rgba(176,141,87,0.9), transparent)' }} />
        <div className="absolute bottom-0 right-0 h-full w-px transition-all duration-500 group-hover:h-12" style={{ background: 'linear-gradient(to top, rgba(176,141,87,0.9), transparent)' }} />
      </div>

      {/* Ambient hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(176,141,87,0.13) 0%, rgba(176,141,87,0.04) 45%, transparent 70%)' }} />

      {/* ── IMAGE ────────────────────────────────────────────────── */}
      <div className="relative h-56 flex-shrink-0 overflow-hidden">
        <Image
          src={imgSrc}
          alt={room.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out"
          style={{ transition: 'transform 0.7s ease-out' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={() => setImgSrc(ROOM_FALLBACKS[index % ROOM_FALLBACKS.length])}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,7,14,0.05) 0%, rgba(5,7,14,0.0) 25%, rgba(8,10,22,0.65) 65%, rgba(8,10,22,1) 100%)' }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(176,141,87,0.10) 0%, transparent 40%, rgba(176,141,87,0.06) 100%)' }} />

        {/* Room number watermark */}
        <span className="absolute top-3 left-4 font-playfair text-6xl font-bold leading-none select-none" style={{ color: 'rgba(176,141,87,0.10)' }}>
          {roomNumber}
        </span>

        {/* Short name pill */}
        <div className="absolute top-4 right-4 px-2.5 py-1" style={{ background: 'rgba(5,7,14,0.82)', backdropFilter: 'blur(10px)', border: '1px solid rgba(176,141,87,0.25)' }}>
          <span className="font-lato text-[9px] tracking-[0.3em] uppercase text-luxury-gold/80">{room.shortName}</span>
        </div>

        {/* Per-night price — bottom left */}
        <div className="absolute bottom-4 left-5 flex items-center gap-2">
          <span className="block h-px w-5 flex-shrink-0 transition-all duration-300 group-hover:w-8" style={{ background: 'rgba(176,141,87,0.8)' }} />
          <div className="flex flex-col gap-0.5">
            <span className="font-lato text-xs tracking-[0.18em] text-luxury-gold leading-none">
              ${room.priceUSD.toLocaleString()} <span className="text-[9px] opacity-70">USD</span>
            </span>
            <span className="font-lato text-[9px] tracking-wide leading-none" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {room.price}
            </span>
          </div>
        </div>
      </div>

      {/* ── CONTENT ────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col flex-1 px-5 pt-5 pb-5">

        <h3 className="font-playfair text-[1.15rem] leading-snug mb-2">
          <span className="text-white/92 group-hover:text-luxury-gold transition-colors duration-300">{room.name}</span>
        </h3>

        <p className="font-lato text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: 'rgba(255,255,255,0.38)' }}>
          {room.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-5 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(176,141,87,0.10)' }}>
          <div className="flex items-center gap-1.5">
            <MdPeople size={13} style={{ color: GOLD_DIM }} />
            <span className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{room.capacity}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MdSquareFoot size={13} style={{ color: GOLD_DIM }} />
            <span className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{room.size}</span>
          </div>
        </div>

        {/* ── Package pricing ───────────────────────────────────── */}
        {packages ? (
          <div className="mb-4">
            <p className="font-lato text-[9px] tracking-[0.3em] uppercase mb-2.5" style={{ color: GOLD_DIM }}>
              Package Rates
            </p>

            {/* Tab selector */}
            <div className="flex mb-3" style={{ border: '1px solid rgba(176,141,87,0.15)' }}>
              {packages.map((pkg, i) => (
                <button
                  key={pkg.label}
                  onClick={() => setActiveTab(i)}
                  className="flex-1 py-1.5 font-lato text-[10px] tracking-wide transition-all duration-200"
                  style={{
                    background: activeTab === i ? 'rgba(176,141,87,0.15)' : 'transparent',
                    color: activeTab === i ? GOLD : 'rgba(255,255,255,0.35)',
                    borderRight: i < packages.length - 1 ? '1px solid rgba(176,141,87,0.15)' : 'none',
                  }}
                >
                  {pkg.label}
                </button>
              ))}
            </div>

            {/* Active price display */}
            <div
              className="flex items-center justify-between px-3 py-2.5"
              style={{ background: 'rgba(176,141,87,0.06)', border: '1px solid rgba(176,141,87,0.18)' }}
            >
              <span className="font-lato text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.40)' }}>
                {packages[activeTab].label}
              </span>
              <span className="font-playfair text-base" style={{ color: GOLD }}>
                {packages[activeTab].price}
              </span>
            </div>
          </div>
        ) : (
          /* Features list for non-package rooms (Family / Villa) */
          <div className="flex-1 flex flex-col gap-2 mb-4">
            {room.features.slice(0, 3).map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <span className="w-[5px] h-[5px] flex-shrink-0 rotate-45" style={{ background: 'rgba(176,141,87,0.45)' }} />
                <span className="font-lato text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.35)' }}>{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href="/contact"
          className="flex items-center justify-between pt-4 mt-auto"
          style={{ borderTop: '1px solid rgba(176,141,87,0.10)' }}
        >
          <span className="font-lato text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-luxury-gold" style={{ color: 'rgba(176,141,87,0.75)' }}>
            Book This Room
          </span>
          <span
            className="flex items-center justify-center w-7 h-7 transition-all duration-300 group-hover:bg-luxury-gold"
            style={{ border: '1px solid rgba(176,141,87,0.35)' }}
          >
            <HiArrowRight size={11} className="transition-all duration-300 group-hover:text-luxury-black group-hover:translate-x-0.5" style={{ color: 'rgba(176,141,87,0.8)' }} />
          </span>
        </Link>
      </div>
    </motion.div>
  )
}
