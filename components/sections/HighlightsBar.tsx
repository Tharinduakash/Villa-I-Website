'use client'
import { motion } from 'framer-motion'
import { highlights } from '@/lib/data'

const highlightIcons: Record<string, React.ReactNode> = {
  beach: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 22c2-4 5-7 10-7s8 3 10 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 15V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 8C14 8 9 11 7 8c3-3 7-2 7 0z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M14 8C14 8 19 11 21 8c-3-3-7-2-7 0z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <circle cx="14" cy="6" r="1.5" fill="currentColor" />
    </svg>
  ),
  privacy: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3L5 7v7c0 5.25 3.85 10.15 9 11.35C19.15 24.15 23 19.25 23 14V7L14 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 14l3 3 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  meals: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 4v6a4 4 0 004 4v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 4v4M11 4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M19 4v20M19 4c0 0 4 2 4 7h-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  climate: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4v12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="14" cy="20" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 8h-3M8 12H6M23 8h-3M22 12h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
}

export default function HighlightsBar() {
  return (
    <section className="section-gradient-b border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col items-center gap-4 py-10 px-6 text-center cursor-default"
            >
              {i > 0 && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-white/8 hidden md:block" />
              )}
              <div className="relative flex items-center justify-center w-14 h-14">
                <div className="absolute inset-0 rounded-full border border-luxury-gold/15 group-hover:border-luxury-gold/40 transition-all duration-500" />
                <div className="absolute inset-0 rounded-full bg-luxury-gold/0 group-hover:bg-luxury-gold/5 transition-all duration-500" />
                <span className="relative text-white/40 group-hover:text-luxury-gold transition-colors duration-300">
                  {highlightIcons[item.icon]}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/80 font-lato text-xs tracking-[0.2em] uppercase group-hover:text-luxury-gold transition-colors duration-300">
                  {item.label}
                </span>
                <span className="block h-px w-0 group-hover:w-full bg-luxury-gold/50 mx-auto transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
