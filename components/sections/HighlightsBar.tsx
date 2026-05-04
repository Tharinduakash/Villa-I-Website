'use client'
import { motion } from 'framer-motion'
import { highlights } from '@/lib/data'

const highlightIcons: Record<string, React.ReactNode> = {
  beach: (
    <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
      <path d="M4 22c2-4 5-7 10-7s8 3 10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 15V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 8C14 8 9 11 7 8c3-3 7-2 7 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 8C14 8 19 11 21 8c-3-3-7-2-7 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="14" cy="6" r="1.5" fill="currentColor"/>
    </svg>
  ),
  privacy: (
    <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
      <path d="M14 3L5 7v7c0 5.25 3.85 10.15 9 11.35C19.15 24.15 23 19.25 23 14V7L14 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 14l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  meals: (
    <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
      <path d="M9 4v6a4 4 0 004 4v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 4v4M11 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M19 4v20M19 4c0 0 4 2 4 7h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  climate: (
    <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
      <path d="M14 4v12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="14" cy="20" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 8h-3M8 12H6M23 8h-3M22 12h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

// Responsive dividers for 2-col mobile / 4-col desktop
const borderClasses = [
  'border-r border-b md:border-b-0',
  'border-b md:border-b-0 md:border-r',
  'border-r',
  '',
]

export default function HighlightsBar() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #06080f 0%, #0a0d1c 100%)' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative flex items-center gap-3 px-5 md:px-8 py-4 md:py-5 `}
            
            >
              {/* Left accent bar — appears on hover */}
              <span
                className="absolute left-0 top-3 bottom-3 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.55), transparent)' }}
              />

              {/* Icon circle */}
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(201,169,110,0.06)',
                  border: '1px solid rgba(201,169,110,0.18)',
                  color: 'rgba(201,169,110,0.65)',
                }}
              >
                <span className="group-hover:text-[rgba(201,169,110,1)] transition-colors duration-300">
                  {highlightIcons[item.icon]}
                </span>
              </div>

              {/* Label */}
              <span
                className="font-lato text-[9px] md:text-[10px] tracking-[0.18em] uppercase leading-snug transition-colors duration-300 group-hover:text-[rgba(201,169,110,0.85)]"
                style={{ color: 'rgba(255,255,255,0.48)' }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
