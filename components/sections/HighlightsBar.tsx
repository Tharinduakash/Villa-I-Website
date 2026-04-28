'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { highlights } from '@/lib/data'

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

const highlightIcons: Record<string, React.ReactNode> = {
  beach: (
    <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
      <path d="M4 22c2-4 5-7 10-7s8 3 10 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M14 15V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M14 8C14 8 9 11 7 8c3-3 7-2 7 0z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
      <path d="M14 8C14 8 19 11 21 8c-3-3-7-2-7 0z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
      <circle cx="14" cy="6" r="1.5" fill="currentColor"/>
    </svg>
  ),
  privacy: (
    <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
      <path d="M14 3L5 7v7c0 5.25 3.85 10.15 9 11.35C19.15 24.15 23 19.25 23 14V7L14 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M10 14l3 3 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  meals: (
    <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
      <path d="M9 4v6a4 4 0 004 4v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M7 4v4M11 4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M19 4v20M19 4c0 0 4 2 4 7h-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  climate: (
    <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
      <path d="M14 4v12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="14" cy="20" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 8h-3M8 12H6M23 8h-3M22 12h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
}

function HighlightCard({ item, index }: { item: { label: string; icon: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale3d(1.04,1.04,1.04)`
    const glow = el.querySelector<HTMLDivElement>('.hl-glow')
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${50 + x * 80}% ${50 + y * 80}%, rgba(201,169,110,0.18) 0%, transparent 60%)`
      glow.style.opacity = '1'
    }
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    const glow = el.querySelector<HTMLDivElement>('.hl-glow')
    if (glow) glow.style.opacity = '0'
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center gap-5 py-12 px-6 text-center cursor-default group"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease',
        background: 'rgba(255,255,255,0.01)',
        borderLeft: index > 0 ? '1px solid rgba(176,141,87,0.08)' : 'none',
      }}
    >
      {/* Mouse-follow glow */}
      <div className="hl-glow absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ opacity: 0 }} />

      {/* Floating icon */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3 + index * 0.5, ease: 'easeInOut', delay: index * 0.3 }}
        className="relative flex items-center justify-center w-16 h-16"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Outer ring — spins on hover */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-700 group-hover:rotate-180"
          style={{
            border: '1px solid rgba(176,141,87,0.2)',
            background: 'transparent',
          }}
        />
        {/* Inner glow ring */}
        <div
          className="absolute inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle,rgba(201,169,110,0.12) 0%,transparent 70%)' }}
        />
        {/* Corner accent dots */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: GOLD }} />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: GOLD }} />

        <span
          className="relative z-10 transition-colors duration-300 group-hover:text-luxury-gold"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          {highlightIcons[item.icon]}
        </span>
      </motion.div>

      {/* Label */}
      <div className="flex flex-col items-center gap-1.5">
        <span
          className="font-lato text-xs tracking-[0.22em] uppercase transition-colors duration-300 group-hover:text-luxury-gold"
          style={{ color: 'rgba(255,255,255,0.72)' }}
        >
          {item.label}
        </span>
        {/* Underline that expands */}
        <motion.span
          className="block h-px"
          style={{ background: `linear-gradient(to right,transparent,${GOLD_DIM},transparent)` }}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.12 }}
        />
      </div>
    </motion.div>
  )
}

export default function HighlightsBar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg,rgba(8,10,22,1) 0%,rgba(5,7,14,1) 100%)',
        borderTop: '1px solid rgba(176,141,87,0.08)',
        borderBottom: '1px solid rgba(176,141,87,0.08)',
      }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(201,169,110,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.025) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Central glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(176,141,87,0.04) 0%,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {highlights.map((item, i) => (
            <HighlightCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
