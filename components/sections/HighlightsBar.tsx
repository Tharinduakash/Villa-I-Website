'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { highlights } from '@/lib/data'

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.5)'

const highlightIcons: Record<string, React.ReactNode> = {
  beach: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 22c2-4 5-7 10-7s8 3 10 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M14 15V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M14 8C14 8 9 11 7 8c3-3 7-2 7 0z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M14 8C14 8 19 11 21 8c-3-3-7-2-7 0z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="14" cy="6" r="1.5" fill="currentColor"/>
    </svg>
  ),
  privacy: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3L5 7v7c0 5.25 3.85 10.15 9 11.35C19.15 24.15 23 19.25 23 14V7L14 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M10 14l3 3 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  meals: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M9 4v6a4 4 0 004 4v10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M7 4v4M11 4v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M19 4v20M19 4c0 0 4 2 4 7h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  climate: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4v12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="14" cy="20" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 8h-3M8 12H6M23 8h-3M22 12h-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
}

const floatDelays = [0, 0.4, 0.8, 1.2]
const floatDurations = [3.4, 3.9, 3.2, 4.1]

function HighlightCard({
  item,
  index,
}: {
  item: { label: string; icon: string }
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(700px) rotateY(${x * 16}deg) rotateX(${-y * 12}deg) translateZ(8px) scale3d(1.03,1.03,1.03)`
    const glow = el.querySelector<HTMLDivElement>('.hl-glow')
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${50 + x * 80}% ${50 + y * 80}%, rgba(201,169,110,0.12) 0%, transparent 65%)`
      glow.style.opacity = '1'
    }
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform =
      'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale3d(1,1,1)'
    const glow = el.querySelector<HTMLDivElement>('.hl-glow')
    if (glow) glow.style.opacity = '0'
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.13,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center py-12 px-5 cursor-default group"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        borderLeft: index > 0 ? '1px solid rgba(176,141,87,0.07)' : 'none',
      }}
    >
      {/* Extruded back-face: appears behind the card on hover */}
      <div
        className="absolute inset-1.5 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          transform: 'translateZ(-6px)',
          background: 'linear-gradient(150deg, rgba(255,255,255,0.022) 0%, transparent 60%)',
          border: '1px solid rgba(201,169,110,0.07)',
        }}
      />

      {/* Bottom edge gleam */}
      <div
        className="absolute bottom-0 left-[12%] right-[12%] h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${GOLD_DIM}, transparent)`,
        }}
      />

      {/* Mouse-follow glow */}
      <div
        className="hl-glow absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      {/* Italic ordinal number */}
      <span
        className="absolute top-4 right-4 font-serif italic text-[11px] tracking-wide transition-colors duration-400"
        style={{ color: 'rgba(176,141,87,0.18)', fontFamily: 'Georgia, serif' }}
      >
        0{index + 1}
      </span>

      {/* Icon shell */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          repeat: Infinity,
          duration: floatDurations[index],
          ease: 'easeInOut',
          delay: floatDelays[index],
        }}
        className="relative flex items-center justify-center w-16 h-16 mb-7"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Outer ring — rotates on hover */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-700 group-hover:rotate-[135deg]"
          style={{ border: '1px solid rgba(176,141,87,0.18)' }}
        />

        {/* Inner glow ring */}
        <div
          className="absolute inset-[9px] rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"
          style={{
            border: '1px solid rgba(201,169,110,0.12)',
            background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Cardinal gem dots */}
        {['top-[-1px] left-1/2 -translate-x-1/2', 'bottom-[-1px] left-1/2 -translate-x-1/2',
          'right-[-1px] top-1/2 -translate-y-1/2', 'left-[-1px] top-1/2 -translate-y-1/2'].map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} w-[3px] h-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            style={{ background: GOLD }}
          />
        ))}

        {/* Icon */}
        <span
          className="relative z-10 transition-all duration-400 group-hover:-translate-y-0.5"
          style={{ color: 'rgba(255,255,255,0.28)', transition: 'color 0.4s, transform 0.4s' }}
        >
          <span className="group-hover:text-[rgba(201,169,110,0.9)] transition-colors duration-400">
            {highlightIcons[item.icon]}
          </span>
        </span>
      </motion.div>

      {/* Label + ruled line */}
      <div className="flex flex-col items-center gap-2.5">
        <span
          className="font-lato text-[10px] tracking-[0.22em] uppercase text-center leading-relaxed transition-colors duration-400 group-hover:text-[rgba(201,169,110,0.9)]"
          style={{ color: 'rgba(255,255,255,0.52)' }}
        >
          {item.label}
        </span>

        {/* Animated gold rule */}
        <motion.span
          className="block h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${GOLD_DIM}, transparent)`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.45 + index * 0.13 }}
        />
      </div>
    </motion.div>
  )
}

export default function HighlightsBar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useInView(sectionRef, { once: true })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0d1a 0%, #080b16 100%)',
        borderTop: '1px solid rgba(176,141,87,0.12)',
        borderBottom: '1px solid rgba(176,141,87,0.12)',
      }}
    >
      {/* Volumetric light cone from below */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 120% at 50% 100%, rgba(176,141,87,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 60%)
          `,
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,169,110,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.028) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

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