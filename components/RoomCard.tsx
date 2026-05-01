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

const ROOM_FALLBACKS = [
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
  'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
]

export default function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  const roomNumber = String(index + 1).padStart(2, '0')
  const [imgSrc, setImgSrc] = useState(room.image || ROOM_FALLBACKS[index % ROOM_FALLBACKS.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #0f1228 0%, #0a0d1c 40%, #06080f 100%)',
        border: '1px solid rgba(176,141,87,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(176,141,87,0.45)'
        el.style.boxShadow =
          '0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(176,141,87,0.08), inset 0 1px 0 rgba(176,141,87,0.15)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(176,141,87,0.12)'
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)'
      }}
    >
      {/* ── Corner ornament top-left ─── */}
      <div className="absolute top-0 left-0 w-8 h-8 z-20 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-px transition-all duration-500 group-hover:w-12"
          style={{ background: 'linear-gradient(to right, rgba(176,141,87,0.9), transparent)' }}
        />
        <div
          className="absolute top-0 left-0 h-full w-px transition-all duration-500 group-hover:h-12"
          style={{ background: 'linear-gradient(to bottom, rgba(176,141,87,0.9), transparent)' }}
        />
      </div>

      {/* ── Corner ornament bottom-right ─── */}
      <div className="absolute bottom-0 right-0 w-8 h-8 z-20 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-full h-px transition-all duration-500 group-hover:w-12"
          style={{ background: 'linear-gradient(to left, rgba(176,141,87,0.9), transparent)' }}
        />
        <div
          className="absolute bottom-0 right-0 h-full w-px transition-all duration-500 group-hover:h-12"
          style={{ background: 'linear-gradient(to top, rgba(176,141,87,0.9), transparent)' }}
        />
      </div>

      {/* ── Ambient glow on hover ─── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% -10%, rgba(176,141,87,0.13) 0%, rgba(176,141,87,0.04) 45%, transparent 70%)',
        }}
      />

      {/* ── IMAGE ─────────────────────────────────────────────── */}
      <div className="relative h-60 flex-shrink-0 overflow-hidden">
        <Image
          src={imgSrc}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          style={{ transform: 'scale(1.0)', transition: 'transform 0.7s ease-out' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={() => setImgSrc(ROOM_FALLBACKS[index % ROOM_FALLBACKS.length])}
        />

        {/* Rich layered gradient — cinematic fade into card */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,7,14,0.05) 0%, rgba(5,7,14,0.0) 25%, rgba(8,10,22,0.60) 65%, rgba(8,10,22,0.98) 100%)',
          }}
        />

        {/* Warm gold shimmer on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(176,141,87,0.10) 0%, transparent 40%, rgba(176,141,87,0.06) 100%)',
          }}
        />

        {/* Room number watermark */}
        <span
          className="absolute top-3 left-4 font-playfair text-6xl font-bold leading-none select-none"
          style={{
            color: 'rgba(176,141,87,0.10)',
            transition: 'color 0.4s ease, transform 0.4s ease',
          }}
        >
          {roomNumber}
        </span>

        {/* Short name — top right pill */}
        <div
          className="absolute top-4 right-4 px-2.5 py-1"
          style={{
            background: 'rgba(5,7,14,0.82)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(176,141,87,0.25)',
          }}
        >
          <span className="font-lato text-[9px] tracking-[0.3em] uppercase text-luxury-gold/80">
            {room.shortName}
          </span>
        </div>

        {/* Price — bottom left with gold line */}
        <div className="absolute bottom-4 left-5 flex items-center gap-2">
          <span
            className="block h-px w-5 flex-shrink-0 transition-all duration-300 group-hover:w-8"
            style={{ background: 'rgba(176,141,87,0.8)' }}
          />
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

      {/* ── CONTENT ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col flex-1 px-5 pt-5 pb-5">

        {/* Room name */}
        <h3
          className="font-playfair text-[1.2rem] leading-snug mb-2 transition-colors duration-300"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          <span className="group-hover:text-luxury-gold transition-colors duration-300">
            {room.name}
          </span>
        </h3>

        {/* Description */}
        <p
          className="font-lato text-sm leading-relaxed line-clamp-2 mb-4"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          {room.description}
        </p>

        {/* Meta row */}
        <div
          className="flex items-center gap-5 mb-4 pb-4"
          style={{ borderBottom: '1px solid rgba(176,141,87,0.10)' }}
        >
          <div className="flex items-center gap-1.5">
            <MdPeople size={13} style={{ color: 'rgba(176,141,87,0.55)' }} />
            <span className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {room.capacity}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <MdSquareFoot size={13} style={{ color: 'rgba(176,141,87,0.55)' }} />
            <span className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {room.size}
            </span>
          </div>
        </div>

        {/* Features — diamond bullet list */}
        <div className="flex-1 flex flex-col gap-2 mb-5">
          {room.features.slice(0, 3).map((feature, i) => (
            <div key={feature} className="flex items-center gap-2.5">
              <span
                className="w-[5px] h-[5px] flex-shrink-0 rotate-45 transition-all duration-300 group-hover:scale-125"
                style={{ background: 'rgba(176,141,87,0.45)' }}
              />
              <span
                className="font-lato text-xs tracking-wide transition-colors duration-300 group-hover:text-white/55"
                style={{ color: 'rgba(255,255,255,0.35)', transitionDelay: `${i * 50}ms` }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid rgba(176,141,87,0.10)' }}
        >
          <span
            className="font-lato text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-luxury-gold"
            style={{ color: 'rgba(176,141,87,0.75)' }}
          >
            Book This Room
          </span>

          {/* Arrow box — fills gold on hover */}
          <span
            className="flex items-center justify-center w-7 h-7 transition-all duration-300 group-hover:bg-luxury-gold"
            style={{
              border: '1px solid rgba(176,141,87,0.35)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(176,141,87,1)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(176,141,87,0.35)'
            }}
          >
            <HiArrowRight
              size={11}
              className="transition-all duration-300 group-hover:text-luxury-black group-hover:translate-x-0.5"
              style={{ color: 'rgba(176,141,87,0.8)' }}
            />
          </span>
        </Link>
      </div>
    </motion.div>
  )
}