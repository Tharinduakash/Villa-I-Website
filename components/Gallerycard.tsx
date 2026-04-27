'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { galleryImages } from '@/lib/data'

// Grid layout config per index
const gridClasses = [
  'col-span-2 row-span-2',  // 0 — large feature
  'col-span-1 row-span-1',  // 1
  'col-span-1 row-span-1',  // 2
  'col-span-1 row-span-1',  // 3
  'col-span-1 row-span-1',  // 4
  'col-span-1 row-span-1',  // 5
]

export default function Gallery() {
  return (
    <section className="py-24 bg-luxury-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-14"
        >
          {/* Decorative line + label */}
          <div className="flex items-center gap-5 mb-5">
            <span className="block h-px w-14" style={{ background: 'rgba(201,169,110,0.45)' }} />
            <p className="font-lato text-xs tracking-[0.35em] uppercase" style={{ color: '#C9A96E' }}>
              Visual Journey
            </p>
            <span className="block h-px w-14" style={{ background: 'rgba(201,169,110,0.45)' }} />
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Life at <Image
              src="/webp/villa_logo_transparent.png"
              alt="Villa i"
              width={220}
              height={80}
              className="object-contain inline-block w-36 md:w-48 lg:w-56"
              style={{ verticalAlign: 'middle' }}
            />
          </h2>

          <p className="font-lato text-sm leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.4)' }}>
            From sun-drenched mornings to candlelit evenings — every corner of Villa i tells a story.
          </p>

          {/* Divider ornament */}
          <div className="flex items-center gap-3 mt-5">
            <span className="block h-px w-10" style={{ background: 'rgba(201,169,110,0.3)' }} />
            <span className="block w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(201,169,110,0.5)' }} />
            <span className="block h-px w-10" style={{ background: 'rgba(201,169,110,0.3)' }} />
          </div>
        </motion.div>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-2.5"
          style={{ gridTemplateRows: 'repeat(3, 260px)' }}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.09 }}
              className={`group relative overflow-hidden ${gridClasses[i] ?? ''}`}
              style={{ border: '1px solid rgba(255,255,255,0.04)' }}
            >
              {/* Image */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Base dark vignette — always present, subtle */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,7,14,0.60) 0%, rgba(5,7,14,0.08) 50%, transparent 100%)',
                }}
              />

              {/* Hover overlay — gold-tinted gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,7,14,0.90) 0%, rgba(5,7,14,0.35) 50%, rgba(176,141,87,0.06) 100%)',
                }}
              />

              {/* Gold corner ornament top-left — reveals on hover */}
              <div className="absolute top-0 left-0 z-10 pointer-events-none">
                <div
                  className="absolute top-0 left-0 h-px transition-all duration-500 ease-out w-0 group-hover:w-10"
                  style={{ background: 'rgba(201,169,110,0.9)' }}
                />
                <div
                  className="absolute top-0 left-0 w-px transition-all duration-500 ease-out h-0 group-hover:h-10"
                  style={{ background: 'rgba(201,169,110,0.9)' }}
                />
              </div>

              {/* Gold corner ornament bottom-right — reveals on hover */}
              <div className="absolute bottom-0 right-0 z-10 pointer-events-none">
                <div
                  className="absolute bottom-0 right-0 h-px transition-all duration-500 ease-out w-0 group-hover:w-10"
                  style={{ background: 'rgba(201,169,110,0.9)' }}
                />
                <div
                  className="absolute bottom-0 right-0 w-px transition-all duration-500 ease-out h-0 group-hover:h-10"
                  style={{ background: 'rgba(201,169,110,0.9)' }}
                />
              </div>

              {/* Index number — decorative watermark, always subtle */}
              <span
                className="absolute top-4 right-5 font-playfair font-bold leading-none select-none z-10 transition-opacity duration-500 group-hover:opacity-0"
                style={{ color: 'rgba(255,255,255,0.06)', fontSize: i === 0 ? '5rem' : '3.5rem' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Caption — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                <div className="flex items-end justify-between">
                  <div>
                    <p
                      className="font-lato text-[10px] tracking-[0.3em] uppercase mb-1"
                      style={{ color: 'rgba(201,169,110,0.8)' }}
                    >
                      Villa i Hotel
                    </p>
                    <p className="font-playfair text-white leading-tight"
                      style={{ fontSize: i === 0 ? '1.2rem' : '1rem' }}>
                      {img.alt}
                    </p>
                  </div>
                  {/* Gold diamond accent */}
                  <span
                    className="flex-shrink-0 w-2 h-2 rotate-45 mb-1"
                    style={{ background: 'rgba(201,169,110,0.7)' }}
                  />
                </div>
              </div>

              {/* Left gold border — slides in on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-px transition-all duration-500 ease-out opacity-0 group-hover:opacity-100"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.7), transparent)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center justify-center mt-12 gap-5"
        >
          <span className="block h-px w-16" style={{ background: 'rgba(201,169,110,0.2)' }} />
          <p className="font-lato text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Mount Lavinia · Sri Lanka
          </p>
          <span className="block h-px w-16" style={{ background: 'rgba(201,169,110,0.2)' }} />
        </motion.div>

      </div>
    </section>
  )
}
