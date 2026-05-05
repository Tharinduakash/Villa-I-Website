'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

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

interface Service {
  id: string
  title: string
  description: string
  image: string
  features: string[]
}

/* ─── Animated particles canvas ─────────────────────────────────── */
function SectionParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    interface P { x: number; y: number; vx: number; vy: number; r: number; a: number; phase: number }
    const pts: P[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.35 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }))
    let raf: number; let t = 0
    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, w, h)
      pts.forEach((p) => {
        const alpha = p.a * (0.5 + 0.5 * Math.sin(p.phase + t))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,169,110,${alpha})`
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
}

/* ─── 3-D Tilt wrapper ───────────────────────────────────────────── */
function Tilt3D({ children, className, style }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const xRatio = (e.clientX - rect.left) / rect.width
    const yRatio = (e.clientY - rect.top) / rect.height
    const rotY = (xRatio - 0.5) * 18
    const rotX = -(yRatio - 0.5) * 12
    el.style.transform = `perspective(900px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale3d(1.03,1.03,1.03)`
    setGlowPos({ x: xRatio * 100, y: yRatio * 100 })
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    setGlowPos({ x: 50, y: 50 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ ...style, transformStyle: 'preserve-3d', transition: 'transform 0.18s ease', willChange: 'transform', position: 'relative' }}
    >
      {/* Mouse-tracking radial glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-inherit z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(201,169,110,0.14) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  )
}

/* ─── Individual service card ─────────────────────────────────────── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const resolvedUrl = service.image || FALLBACK_BY_ID[service.id] || FALLBACK_BY_INDEX[index % FALLBACK_BY_INDEX.length]
  const [imageUrl, setImageUrl] = useState(resolvedUrl)

  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: (index % 3) * 0.14, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tilt3D className="group h-full">
        <div
          className="h-full flex flex-col overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(10,13,26,0.95) 0%, rgba(6,8,14,0.98) 100%)',
            border: '1px solid rgba(201,169,110,0.12)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.55)',
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.4s, box-shadow 0.4s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.45)'; e.currentTarget.style.boxShadow = '0 20px 70px rgba(0,0,0,0.7), 0 0 30px rgba(201,169,110,0.08)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.12)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.55)' }}
        >
          {/* ── Image with 3-D depth layer ── */}
          <div className="relative h-56 overflow-hidden flex-shrink-0" style={{ transformStyle: 'preserve-3d' }}>
            <Image
              src={imageUrl}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              sizes="(max-width:768px) 100vw, 33vw"
              unoptimized={imageUrl.startsWith('http') || imageUrl.startsWith('/uploads/')}
              onError={() => setImageUrl(FALLBACK_BY_ID[service.id] ?? FALLBACK_BY_INDEX[index % FALLBACK_BY_INDEX.length])}
            />

            {/* Multi-stop gradient */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(6,8,14,0.35) 50%, rgba(6,8,14,0.98) 100%)' }} />

            {/* Shimmer layer on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.12) 0%, transparent 40%, rgba(201,169,110,0.06) 100%)' }} />

            {/* Service number */}
            <span
              className="absolute top-4 left-5 font-playfair italic leading-none select-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'rgba(201,169,110,0.10)', transform: 'translateZ(20px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Corner ornament — top left */}
            <div className="absolute top-0 left-0 z-10">
              <div className="w-8 h-px transition-all duration-500 group-hover:w-14" style={{ background: GOLD }} />
              <div className="w-px h-8 transition-all duration-500 group-hover:h-14" style={{ background: GOLD }} />
            </div>

            {/* Category pill */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 z-10"
              style={{ background: 'rgba(6,8,14,0.82)', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,169,110,0.22)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
              <span className="font-lato text-[9px] tracking-[0.25em] uppercase" style={{ color: GOLD_DIM }}>{service.id}</span>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="flex flex-col flex-1 p-6">
            {/* Title */}
            <h3
              className="font-playfair text-xl leading-tight mb-2 transition-colors duration-300 group-hover:text-luxury-gold"
              style={{ color: 'white', transform: 'translateZ(15px)' }}
            >
              {service.title}
            </h3>

            {/* Gold rule */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px transition-all duration-500 group-hover:flex-1" style={{ width: '2rem', background: 'rgba(201,169,110,0.5)' }} />
              <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(201,169,110,0.6)' }} />
            </div>

            {/* Description */}
            <p
              className="font-lato text-sm leading-relaxed mb-5 flex-1"
              style={{ color: 'rgba(255,255,255,0.46)', lineHeight: '1.75' }}
            >
              {service.description}
            </p>

            {/* Feature chips — scrollable row */}
            <div className="mb-5">
              <div className="flex gap-2 flex-wrap">
                {(expanded ? service.features : service.features.slice(0, 3)).map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 font-lato text-[10px] tracking-wide transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'rgba(201,169,110,0.07)',
                      border: '1px solid rgba(201,169,110,0.18)',
                      color: 'rgba(201,169,110,0.85)',
                    }}
                  >
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                    {feat}
                  </span>
                ))}
                {service.features.length > 3 && (
                  <button
                    onClick={() => setExpanded((v) => !v)}
                    className="inline-flex items-center px-2.5 py-1 font-lato text-[10px] tracking-wide transition-all duration-200"
                    style={{ color: GOLD_DIM, border: '1px solid rgba(201,169,110,0.15)' }}
                  >
                    {expanded ? '↑ Less' : `+${service.features.length - 3} more`}
                  </button>
                )}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="group/cta inline-flex items-center justify-center gap-3 w-full py-3 font-lato text-[11px] tracking-[0.3em] uppercase transition-all duration-300"
              style={{
                border: '1px solid rgba(201,169,110,0.28)',
                color: GOLD_DIM,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = GOLD
                e.currentTarget.style.color = '#07090e'
                e.currentTarget.style.borderColor = GOLD
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = GOLD_DIM
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.28)'
              }}
            >
              Book This Experience
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Tilt3D>
    </motion.div>
  )
}

/* ─── Featured / hero service (first card, full width) ────────────── */
function HeroServiceCard({ service }: { service: Service }) {
  const resolvedUrl = service.image || FALLBACK_BY_ID[service.id] || FALLBACK_BY_INDEX[0]
  const [imageUrl, setImageUrl] = useState(resolvedUrl)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group relative col-span-full overflow-hidden mb-2"
      style={{
        border: '1px solid rgba(201,169,110,0.14)',
        boxShadow: '0 8px 50px rgba(0,0,0,0.6)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.45)'; e.currentTarget.style.boxShadow = '0 20px 80px rgba(0,0,0,0.75)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.14)'; e.currentTarget.style.boxShadow = '0 8px 50px rgba(0,0,0,0.6)' }}
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '420px' }}>
        {/* Image half */}
        <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
          <Image src={imageUrl} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 50vw" unoptimized={imageUrl.startsWith('http') || imageUrl.startsWith('/uploads/')} onError={() => setImageUrl(FALLBACK_BY_ID[service.id] ?? FALLBACK_BY_INDEX[0])} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(6,8,14,0) 0%, rgba(6,8,14,0) 60%, rgba(6,8,14,0.95) 100%)' }} />
          <div className="lg:hidden absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,8,14,0.95) 0%, transparent 60%)' }} />

          {/* Animated corner ornaments */}
          <div className="absolute top-0 left-0 z-10">
            <div className="w-12 h-px transition-all duration-700 group-hover:w-24" style={{ background: GOLD }} />
            <div className="w-px h-12 transition-all duration-700 group-hover:h-24" style={{ background: GOLD }} />
          </div>
          <div className="absolute bottom-0 right-0 z-10 flex flex-col items-end">
            <div className="w-px h-12 transition-all duration-700 group-hover:h-24" style={{ background: GOLD }} />
            <div className="w-12 h-px transition-all duration-700 group-hover:w-24" style={{ background: GOLD }} />
          </div>

          {/* Giant watermark */}
          <span className="absolute -bottom-4 -left-2 font-playfair italic select-none pointer-events-none" style={{ fontSize: '12rem', lineHeight: 1, color: 'rgba(201,169,110,0.04)' }}>01</span>
        </div>

        {/* Content half */}
        <div className="relative flex flex-col justify-center p-8 lg:p-12" style={{ background: 'linear-gradient(135deg, rgba(10,13,26,1) 0%, rgba(5,7,13,1) 100%)' }}>
          {/* Featured badge */}
          <div className="inline-flex items-center gap-2 mb-6 self-start px-3 py-1.5" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
            <span className="font-lato text-[9px] tracking-[0.4em] uppercase" style={{ color: GOLD }}>Featured Service</span>
          </div>

          <h3 className="font-playfair text-3xl lg:text-4xl text-white mb-4 transition-colors duration-300 group-hover:text-luxury-gold" style={{ lineHeight: 1.2 }}>
            {service.title}
          </h3>

          <div className="flex items-center gap-4 mb-5">
            <div className="h-px transition-all duration-700 group-hover:flex-1" style={{ width: '3rem', background: 'rgba(201,169,110,0.5)' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
          </div>

          <p className="font-lato text-sm leading-relaxed mb-7" style={{ color: 'rgba(255,255,255,0.48)', lineHeight: '1.8', maxWidth: '460px' }}>
            {service.description}
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-2 mb-8">
            {service.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2.5 group/feat">
                <span className="flex-shrink-0 w-1.5 h-1.5 rotate-45 transition-transform duration-200 group-hover/feat:scale-125" style={{ background: 'rgba(201,169,110,0.5)' }} />
                <span className="font-lato text-xs leading-tight transition-colors duration-200 group-hover/feat:text-white/70" style={{ color: 'rgba(255,255,255,0.38)' }}>{feat}</span>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-4 self-start px-8 py-3.5 font-lato text-[11px] tracking-[0.32em] uppercase transition-all duration-300"
            style={{ background: GOLD, color: '#07090e' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Book This Experience
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main section export ────────────────────────────────────────── */
export default function ServicesGrid({ services }: { services: Service[] }) {
  if (services.length === 0) return null

  const [first, ...rest] = services

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #04060e 0%, #070922 40%, #040610 100%)' }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: '15%', left: '-5%', width: '45vw', height: '45vw', background: 'radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        <div className="absolute" style={{ bottom: '10%', right: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(ellipse, rgba(80,40,160,0.06) 0%, transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      {/* Dot-grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(201,169,110,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Canvas particle field */}
      <SectionParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-5 mb-5">
              <span className="block h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
              <p className="font-lato text-[10px] tracking-[0.42em] uppercase" style={{ color: GOLD_DIM }}>What We Offer</p>
              <span className="block h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
            </div>
            <h2 className="font-playfair leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'white' }}>
              Crafted for Your{' '}
              <span className="italic" style={{ color: GOLD }}>Comfort</span>
            </h2>
            <p className="font-lato text-sm mt-4 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Every service at Villa i is designed to make your stay seamless, memorable, and deeply relaxing.
            </p>
          </motion.div>
        </div>

        {/* ── Featured first card ── */}
        <HeroServiceCard service={first} />

        {/* ── 3-col 3-D tilt grid ── */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {rest.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i + 1} />
            ))}
          </div>
        )}

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {[
            { value: '4+', label: 'Room Types' },
            { value: '8+', label: 'Services' },
            { value: '4.9★', label: 'Guest Rating' },
            { value: '100%', label: 'Satisfaction' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="text-center py-7 group cursor-default"
              style={{ border: '1px solid rgba(201,169,110,0.10)', background: 'rgba(201,169,110,0.03)', transition: 'border-color 0.3s, background 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)'; e.currentTarget.style.background = 'rgba(201,169,110,0.07)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.10)'; e.currentTarget.style.background = 'rgba(201,169,110,0.03)' }}
            >
              <p className="font-playfair text-3xl md:text-4xl mb-1 transition-colors duration-300 group-hover:text-luxury-gold" style={{ color: GOLD }}>{value}</p>
              <p className="font-lato text-[10px] tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
