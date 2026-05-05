'use client'
import { useRef, useCallback, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Link from 'next/link'

// ── 3D Tilt Section Card ──────────────────────────────────────────
export function PolicySection({
  title,
  index,
  children,
}: {
  title: string
  index: number
  children: React.ReactNode
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  // ── Desktop: mouse tilt ──────────────────────────────────────────
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top)  / r.height
    const rx = (ny - 0.5) * -5
    const ry = (nx - 0.5) *  5
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`
    el.style.background = `radial-gradient(ellipse 70% 80% at ${nx * 100}% ${ny * 100}%, rgba(201,169,110,0.09) 0%, rgba(5,7,18,0.99) 65%)`
    el.style.borderColor = 'rgba(201,169,110,0.3)'
    el.style.boxShadow = `${(0.5 - nx) * 28}px ${(0.5 - ny) * 18}px 48px rgba(0,0,0,0.4), 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,169,110,0.07)`
  }, [])

  const onEnter = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transition = 'none'
    setHovered(true)
  }, [])

  const onLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transition = 'transform 0.9s cubic-bezier(0.21,0.47,0.32,0.98), background 0.5s, border-color 0.4s, box-shadow 0.5s'
    el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    el.style.background = 'rgba(5,7,18,0.99)'
    el.style.borderColor = 'rgba(201,169,110,0.07)'
    el.style.boxShadow = '0 2px 24px rgba(0,0,0,0.3)'
    setHovered(false)
    setTimeout(() => { if (cardRef.current) cardRef.current.style.transition = '' }, 900)
  }, [])

  // ── Mobile: touch tilt ───────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const touch = e.touches[0]
    const r = el.getBoundingClientRect()
    const nx = (touch.clientX - r.left) / r.width
    const ny = (touch.clientY - r.top)  / r.height
    const rx = (ny - 0.5) * -7
    const ry = (nx - 0.5) *  7
    el.style.transition = 'transform 0.12s ease, background 0.15s, border-color 0.15s, box-shadow 0.15s'
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(14px)`
    el.style.background = `radial-gradient(ellipse 70% 80% at ${nx * 100}% ${ny * 100}%, rgba(201,169,110,0.11) 0%, rgba(5,7,18,0.99) 65%)`
    el.style.borderColor = 'rgba(201,169,110,0.35)'
    el.style.boxShadow = `${(0.5 - nx) * 24}px ${(0.5 - ny) * 16}px 44px rgba(0,0,0,0.5), 0 22px 55px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,169,110,0.09)`
    setHovered(true)
  }, [])

  const onTouchEnd = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transition = 'transform 0.9s cubic-bezier(0.21,0.47,0.32,0.98), background 0.5s, border-color 0.4s, box-shadow 0.5s'
    el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    el.style.background = 'rgba(5,7,18,0.99)'
    el.style.borderColor = 'rgba(201,169,110,0.07)'
    el.style.boxShadow = '0 2px 24px rgba(0,0,0,0.3)'
    setHovered(false)
    setTimeout(() => { if (cardRef.current) cardRef.current.style.transition = '' }, 900)
  }, [])

  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ marginBottom: '1.25rem' }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative',
          padding: '2rem 2.25rem 1.75rem',
          background: 'rgba(5,7,18,0.99)',
          border: '1px solid rgba(201,169,110,0.07)',
          boxShadow: '0 2px 24px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* Left accent bar */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
          background: hovered
            ? 'linear-gradient(180deg, rgba(201,169,110,1) 0%, rgba(201,169,110,0.2) 100%)'
            : 'linear-gradient(180deg, rgba(201,169,110,0.45) 0%, transparent 100%)',
          transition: 'background 0.4s',
        }} />

        {/* Corner accents */}
        <div style={{ position: 'absolute', top: 0, left: 3, width: '14px', height: '14px', borderTop: `1px solid ${hovered ? 'rgba(201,169,110,0.55)' : 'rgba(201,169,110,0.15)'}`, borderLeft: `1px solid ${hovered ? 'rgba(201,169,110,0.55)' : 'rgba(201,169,110,0.15)'}`, transition: 'border-color 0.3s' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '14px', height: '14px', borderBottom: `1px solid ${hovered ? 'rgba(201,169,110,0.55)' : 'rgba(201,169,110,0.15)'}`, borderRight: `1px solid ${hovered ? 'rgba(201,169,110,0.55)' : 'rgba(201,169,110,0.15)'}`, transition: 'border-color 0.3s' }} />

        {/* Watermark number */}
        <div style={{
          position: 'absolute', right: '1rem', top: '-1rem',
          fontFamily: 'var(--font-playfair, serif)',
          fontSize: '9rem', fontWeight: '900', lineHeight: 1,
          color: hovered ? 'rgba(201,169,110,0.055)' : 'rgba(201,169,110,0.025)',
          pointerEvents: 'none', userSelect: 'none',
          transition: 'color 0.4s',
        }}>
          {num}
        </div>

        {/* Section tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={{
            fontFamily: 'var(--font-lato, sans-serif)',
            fontSize: '8px', fontWeight: '700', letterSpacing: '0.2em',
            color: hovered ? 'rgba(201,169,110,0.95)' : 'rgba(201,169,110,0.6)',
            background: hovered ? 'rgba(201,169,110,0.12)' : 'rgba(201,169,110,0.04)',
            border: `1px solid ${hovered ? 'rgba(201,169,110,0.4)' : 'rgba(201,169,110,0.14)'}`,
            padding: '2px 8px', transition: 'all 0.3s',
          }}>
            {num}
          </span>
          <div style={{
            height: '1px',
            width: hovered ? '40px' : '20px',
            background: hovered ? 'rgba(201,169,110,0.45)' : 'rgba(201,169,110,0.18)',
            transition: 'width 0.4s, background 0.3s',
          }} />
          <span style={{
            fontFamily: 'var(--font-lato, sans-serif)',
            fontSize: '7px', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(201,169,110,0.35)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}>
            Section
          </span>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-playfair, serif)',
          fontSize: '1.15rem', fontWeight: '600',
          color: hovered ? 'rgba(201,169,110,1)' : 'rgba(201,169,110,0.88)',
          marginBottom: '1.1rem', paddingBottom: '0.75rem',
          borderBottom: `1px solid ${hovered ? 'rgba(201,169,110,0.2)' : 'rgba(201,169,110,0.07)'}`,
          transition: 'color 0.3s, border-color 0.3s',
        }}>
          {title}
        </h2>

        {/* Content */}
        <div className="ps-content">{children}</div>

        {/* Mobile-only shimmer sweep — plays once on scroll-in */}
        <div
          aria-hidden
          className="ps-mob-shimmer"
          style={{ animationDelay: `${index * 0.1 + 0.15}s` }}
        />
      </div>
    </motion.div>
  )
}

// ── Related policy footer card ────────────────────────────────────
function PolicyFooterCard({
  href, label, desc, index,
}: {
  href: string; label: string; desc: string; index: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  // ── Desktop: mouse tilt ──────────────────────────────────────────
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top)  / r.height
    el.style.transform = `perspective(800px) rotateX(${(ny - 0.5) * -8}deg) rotateY(${(nx - 0.5) * 8}deg) translateZ(8px)`
    el.style.borderColor = 'rgba(201,169,110,0.35)'
    el.style.background = `radial-gradient(ellipse at ${nx * 100}% ${ny * 100}%, rgba(201,169,110,0.1) 0%, rgba(5,7,18,0.98) 65%)`
  }, [])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'all 0.7s cubic-bezier(0.21,0.47,0.32,0.98)'
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    el.style.borderColor = 'rgba(201,169,110,0.07)'
    el.style.background = 'rgba(5,7,18,0.6)'
    setTimeout(() => { if (ref.current) ref.current.style.transition = '' }, 700)
  }, [])

  // ── Mobile: touch tilt ───────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const el = ref.current
    if (!el) return
    const touch = e.touches[0]
    const r = el.getBoundingClientRect()
    const nx = (touch.clientX - r.left) / r.width
    const ny = (touch.clientY - r.top)  / r.height
    el.style.transition = 'transform 0.12s ease, background 0.15s, border-color 0.15s, box-shadow 0.15s'
    el.style.transform = `perspective(800px) rotateX(${(ny - 0.5) * -9}deg) rotateY(${(nx - 0.5) * 9}deg) translateZ(10px)`
    el.style.borderColor = 'rgba(201,169,110,0.40)'
    el.style.background = `radial-gradient(ellipse at ${nx * 100}% ${ny * 100}%, rgba(201,169,110,0.12) 0%, rgba(5,7,18,0.98) 65%)`
    el.style.boxShadow = `${(0.5 - nx) * 18}px ${(0.5 - ny) * 12}px 32px rgba(0,0,0,0.5), 0 12px 36px rgba(0,0,0,0.45)`
  }, [])

  const onTouchEnd = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'all 0.8s cubic-bezier(0.21,0.47,0.32,0.98)'
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    el.style.borderColor = 'rgba(201,169,110,0.07)'
    el.style.background = 'rgba(5,7,18,0.6)'
    el.style.boxShadow = 'none'
    setTimeout(() => { if (ref.current) ref.current.style.transition = '' }, 800)
  }, [])

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="pf-card"
      style={{
        display: 'block',
        padding: '1.25rem 1.5rem',
        background: 'rgba(5,7,18,0.6)',
        border: '1px solid rgba(201,169,110,0.07)',
        textDecoration: 'none',
        willChange: 'transform',
        position: 'relative',
        overflow: 'hidden',
        animationDelay: `${index * 0.55}s`,
      }}
    >
      {/* Top-left corner */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: '1px solid rgba(201,169,110,0.25)', borderLeft: '1px solid rgba(201,169,110,0.25)' }} />
      <p style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', marginBottom: '0.3rem' }}>
        {label}
      </p>
      <p style={{ fontFamily: 'var(--font-lato, sans-serif)', fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
        {desc}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-lato, sans-serif)', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.65)' }}>
        Read <span style={{ fontSize: '11px' }}>→</span>
      </div>
    </Link>
  )
}

// ── Page Layout ───────────────────────────────────────────────────
const POLICY_LINKS = [
  { href: '/privacy-policy',      label: 'Privacy Policy',     desc: 'Data collection & usage'      },
  { href: '/terms-conditions',    label: 'Terms & Conditions',  desc: 'Booking rules & liability'    },
  { href: '/cancellation-policy', label: 'Cancellation Policy', desc: 'Refund & cancellation terms'  },
]

interface Props {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export default function PolicyPage({ title, lastUpdated, children }: Props) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const words = title.split(' ')
  const lastWord = words.pop()
  const restWords = words.join(' ')

  return (
    <>
      <style>{`
        /* Progress bar */
        .pp-progress {
          position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 9999;
          background: linear-gradient(to right, rgba(201,169,110,0.6), rgba(201,169,110,1));
          transform-origin: 0%;
        }

        /* Section content */
        .ps-content p {
          font-family: var(--font-lato, sans-serif);
          font-size: 0.875rem;
          color: rgba(255,255,255,0.52);
          line-height: 1.88;
          margin-bottom: 0.9rem;
        }
        .ps-content ul { list-style: none; padding: 0; margin: 0 0 0.5rem; }
        .ps-content ul li {
          font-family: var(--font-lato, sans-serif);
          font-size: 0.875rem;
          color: rgba(255,255,255,0.52);
          line-height: 1.85;
          padding: 0.55rem 0 0.55rem 1.6rem;
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          transition: color 0.2s;
        }
        .ps-content ul li:last-child { border-bottom: none; }
        .ps-content ul li:hover { color: rgba(255,255,255,0.7); }
        .ps-content ul li::before {
          content: '';
          position: absolute; left: 0.35rem; top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 5px; height: 5px;
          background: rgba(201,169,110,0.55);
          transition: background 0.2s;
        }
        .ps-content ul li:hover::before { background: rgba(201,169,110,0.9); }
        .ps-content strong { color: rgba(255,255,255,0.82); font-weight: 600; }
        .policy-link { color: rgba(201,169,110,0.85); text-decoration: none; transition: color 0.2s; border-bottom: 1px solid rgba(201,169,110,0.25); }
        .policy-link:hover { color: rgba(201,169,110,1); border-bottom-color: rgba(201,169,110,0.7); }

        /* Animated orbs */
        @keyframes ppOrb1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,-50px) scale(1.08)} }
        @keyframes ppOrb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,35px) scale(0.94)} }
        @keyframes ppOrb3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,22px)} }

        /* Header grid decoration */
        @keyframes ppScan { 0%{opacity:0;transform:translateY(-100%)} 100%{opacity:0.5;transform:translateY(200%)} }

        /* ── Mobile-only shimmer div (inside each section card) ──── */
        .ps-mob-shimmer {
          display: none;
          position: absolute; inset: 0; pointer-events: none; z-index: 10;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(201,169,110,0.13) 48%,
            rgba(255,235,180,0.08) 52%,
            transparent 70%
          );
          transform: translateX(-160%);
        }

        /* ── Mobile footer cards: float animation ─────────────────── */
        @keyframes ppFloat {
          0%, 100% { transform: perspective(800px) rotateX(0deg) translateY(0px); }
          50%       { transform: perspective(800px) rotateX(1.8deg) translateY(-5px); }
        }

        /* ── Mobile shimmer sweep keyframe ─────────────────────────── */
        @keyframes ppMobShimmer {
          0%   { transform: translateX(-160%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(160%); opacity: 0; }
        }

        /* Apply animations only on touch screens ─────────────────── */
        @media (hover: none) and (pointer: coarse) {
          /* Show & animate shimmer on section cards */
          .ps-mob-shimmer {
            display: block;
            animation: ppMobShimmer 1.6s ease-out both;
          }

          /* Floating depth animation on footer policy cards */
          .pf-card {
            animation: ppFloat 5s ease-in-out infinite;
          }
        }
      `}</style>

      {/* Reading progress */}
      <motion.div className="pp-progress" style={{ scaleX }} />

      <main
        className="relative min-h-screen"
        style={{ background: 'linear-gradient(155deg, #060812 0%, #040608 55%, #060a12 100%)' }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-50"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(201,169,110,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{ position: 'absolute', top: '-8%', right: '-4%', width: '640px', height: '640px', background: 'radial-gradient(circle, rgba(201,169,110,0.09) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(70px)', animation: 'ppOrb1 14s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '5%', left: '-8%', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(20,40,120,0.18) 0%, transparent 55%)', borderRadius: '50%', filter: 'blur(90px)', animation: 'ppOrb2 18s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', top: '45%', right: '22%', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(55px)', animation: 'ppOrb3 11s ease-in-out infinite' }} />
        </div>

        {/* ── HEADER ── */}
        <div className="relative" style={{ borderBottom: '1px solid rgba(201,169,110,0.07)' }}>
          {/* Gold radial glow at top */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 75% 120% at 50% 0%, rgba(201,169,110,0.08) 0%, transparent 65%)',
          }} />

          {/* Subtle scan line */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', left: 0, right: 0, height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.15), transparent)',
              animation: 'ppScan 8s linear infinite',
            }} />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 pt-14 pb-16">

            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-lato text-xs tracking-[0.2em] uppercase mb-10 group"
              style={{ color: 'rgba(255,255,255,0.28)', transition: 'color 0.25s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(201,169,110,0.85)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
            >
              <span className="inline-block group-hover:-translate-x-1 transition-transform duration-200">←</span>
              Back to Home
            </Link>

            {/* Brand label */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-3 mb-6"
            >
              <span style={{ display: 'block', height: '1px', width: '32px', background: 'rgba(201,169,110,0.55)' }} />
              <p className="font-lato text-[9px] tracking-[0.42em] uppercase" style={{ color: 'rgba(201,169,110,0.6)' }}>
                Villa i Hotel · Legal
              </p>
            </motion.div>

            {/* Title */}
            <div style={{ overflow: 'hidden', marginBottom: '1.25rem' }}>
              <motion.h1
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="font-playfair text-white"
                style={{ fontSize: 'clamp(2.4rem, 6.5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}
              >
                {restWords && <span>{restWords} </span>}
                <em style={{ fontStyle: 'italic', color: 'rgba(201,169,110,0.95)' }}>{lastWord}</em>
              </motion.h1>
            </div>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              style={{
                height: '1px', marginBottom: '1.25rem',
                background: 'linear-gradient(to right, rgba(201,169,110,0.55) 0%, rgba(201,169,110,0.15) 40%, transparent 100%)',
                transformOrigin: '0%',
              }}
            />

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <p className="font-lato text-[11px]" style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em' }}>
                Last updated: {lastUpdated}
              </p>
              <span style={{
                fontFamily: 'var(--font-lato, sans-serif)', fontSize: '8px',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(201,169,110,0.55)',
                background: 'rgba(201,169,110,0.05)',
                border: '1px solid rgba(201,169,110,0.14)',
                padding: '3px 10px',
              }}>
                Official Document
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-10 md:pt-16 md:pb-14">
          {children}

          {/* Related policies */}
          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span style={{ display: 'block', height: '1px', width: '24px', background: 'rgba(201,169,110,0.4)' }} />
                <p className="font-lato text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.5)' }}>
                  Other Policies
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {POLICY_LINKS.map((l, i) => (
                  <PolicyFooterCard key={l.href} href={l.href} label={l.label} desc={l.desc} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
