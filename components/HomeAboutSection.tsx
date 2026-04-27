'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

// ── Data ───────────────────────────────────────────────────────────
const stats = [
  { value: '10+', label: 'Years of Hospitality' },
  { value: '1K+', label: 'Happy Guests'         },
  { value: '4.9',  label: 'Guest Rating'         },
  { value: '100m', label: 'From the Beach'       },
]

const highlights = [
  'Authentic Sri Lankan home-cooked meals daily',
  'Full villa privacy with garden & beach access',
  'Personalised hospitality from a local family',
]

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

// ── Animated stat counter ──────────────────────────────────────────
function StatCounter({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState('0')
  const ref     = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const raw    = parseFloat(value.replace(/[^0-9.]/g, ''))
        const isFloat = value.includes('.')
        const steps   = 55
        let current   = 0
        const inc     = raw / steps

        const timer = setInterval(() => {
          current += inc
          if (current >= raw) {
            setDisplay(value)
            clearInterval(timer)
          } else {
            setDisplay(
              isFloat
                ? current.toFixed(1)
                : Math.floor(current).toString()
            )
          }
        }, 28)
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="group flex flex-col gap-1 cursor-default">
      <span
        className="font-playfair text-3xl md:text-4xl transition-colors duration-300 group-hover:text-luxury-gold tabular-nums"
        style={{ color: GOLD }}
      >
        {display}
      </span>
      <span
        className="font-lato text-[10px] tracking-[0.22em] uppercase transition-colors duration-300 group-hover:text-white/55"
        style={{ color: 'rgba(255,255,255,0.30)' }}
      >
        {label}
      </span>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────
export default function HomeAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const leftY  = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rightY = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0c0f22 0%, #06080f 60%, #090c1c 100%)' }}
    >
      {/* ── Background texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(176,141,87,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Gold ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(176,141,87,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <motion.div
          className="flex flex-col items-center text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="block h-px w-10" style={{ background: GOLD_DIM }} />
            <p className="font-lato text-xs tracking-[0.4em] uppercase" style={{ color: GOLD_DIM }}>
              Our Story
            </p>
            <span className="block h-px w-10" style={{ background: GOLD_DIM }} />
          </div>
          <h2
            className="font-playfair text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            More Than a Hotel —
            <br />
            <span className="italic" style={{ color: GOLD }}>
              A Home by the Sea
            </span>
          </h2>
        </motion.div>

        {/* ── Desktop: 3-column layout ── */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-center">

          {/* Left image — parallax up */}
          <motion.div
            className="col-span-4"
            style={{ y: leftY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: '0px', aspectRatio: '3/4', border: '1px solid rgba(176,141,87,0.15)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=85"
                alt="Villa i Hotel Garden"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(5,7,14,0.05) 0%, rgba(5,7,14,0.75) 100%)',
                }}
              />
              {/* Caption chip */}
              <div
                className="absolute bottom-5 left-5 right-5 px-4 py-3"
                style={{
                  background: 'rgba(5,7,14,0.88)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(176,141,87,0.20)',
                }}
              >
                <p className="font-lato text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: GOLD_DIM }}>
                  Established
                </p>
                <p className="font-playfair text-sm text-white">Mount Lavinia, Sri Lanka</p>
              </div>
            </div>
          </motion.div>

          {/* Center — text card */}
          <motion.div
            className="col-span-4 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="p-8 md:p-10"
              style={{
                background: 'linear-gradient(145deg, rgba(15,18,34,1) 0%, rgba(8,10,22,1) 100%)',
                border: '1px solid rgba(176,141,87,0.15)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Corner ornament */}
              <div className="relative mb-7">
                <div className="absolute top-0 left-0 w-6 h-px" style={{ background: GOLD }} />
                <div className="absolute top-0 left-0 w-px h-6" style={{ background: GOLD }} />
                <h3
                  className="font-playfair text-xl md:text-2xl text-white leading-snug pt-4 pl-3"
                >
                  A family-run retreat where every guest feels at home…
                </h3>
              </div>

              <div
                className="space-y-3 font-lato text-sm leading-relaxed mb-8"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                <p>
                  Villa i Hotel was born from a passion for Sri Lankan hospitality and a love of the sea. What began as a family home steps from the beach in Mount Lavinia has grown into a cherished coastal retreat for guests from around the world.
                </p>
                <p>
                  We believe luxury isn't about grandeur — it's about the warmth of a welcome, the taste of a home-cooked meal, and waking up to the sound of the Indian Ocean.
                </p>
              </div>

              {/* Highlights list */}
              <ul className="space-y-3 mb-8">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex-shrink-0 w-4 h-4 flex items-center justify-center"
                      style={{ border: '1px solid rgba(176,141,87,0.5)' }}
                    >
                      <span className="block w-1 h-1 rotate-45" style={{ background: GOLD }} />
                    </span>
                    <span className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex items-center gap-5">
                <Link
                  href="/about"
                  className="group flex items-center gap-3 font-lato text-xs tracking-[0.25em] uppercase transition-all duration-300"
                  style={{ color: GOLD }}
                >
                  Our Story
                  <span
                    className="flex items-center justify-center w-8 h-8 transition-all duration-300 group-hover:bg-luxury-gold"
                    style={{ border: '1px solid rgba(176,141,87,0.4)' }}
                  >
                    <HiArrowRight
                      size={12}
                      className="group-hover:text-luxury-black group-hover:translate-x-0.5 transition-all duration-300"
                    />
                  </span>
                </Link>
                <span className="block w-px h-5" style={{ background: 'rgba(176,141,87,0.2)' }} />
                <Link
                  href="/contact"
                  className="font-lato text-xs tracking-[0.25em] uppercase transition-colors duration-300 hover:text-luxury-gold"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  Book Direct
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right image — parallax down */}
          <motion.div
            className="col-span-4"
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: '0px', aspectRatio: '3/4', border: '1px solid rgba(176,141,87,0.15)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=85"
                alt="Mount Lavinia Beach"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(5,7,14,0.05) 0%, rgba(5,7,14,0.75) 100%)',
                }}
              />
              <div
                className="absolute bottom-5 left-5 right-5 px-4 py-3"
                style={{
                  background: 'rgba(5,7,14,0.88)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(176,141,87,0.20)',
                }}
              >
                <p className="font-lato text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: GOLD_DIM }}>
                  Location
                </p>
                <p className="font-playfair text-sm text-white">100m from the Indian Ocean</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Mobile / Tablet layout ── */}
        <div className="lg:hidden">

          {/* Side-by-side images */}
          <motion.div
            className="grid grid-cols-2 gap-3 mb-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=85',
                label: 'Our Gardens',
                sub: 'Tropical Oasis',
              },
              {
                src: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=85',
                label: 'Location',
                sub: '100m from Beach',
              },
            ].map((img) => (
              <div
                key={img.label}
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/4', border: '1px solid rgba(176,141,87,0.12)' }}
              >
                <Image src={img.src} alt={img.sub} fill className="object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(5,7,14,0.88) 0%, transparent 55%)' }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-3"
                  style={{
                    background: 'rgba(5,7,14,0.72)',
                    backdropFilter: 'blur(8px)',
                    borderTop: '1px solid rgba(176,141,87,0.15)',
                  }}
                >
                  <p className="font-lato text-[9px] tracking-[0.25em] uppercase mb-0.5" style={{ color: GOLD_DIM }}>
                    {img.label}
                  </p>
                  <p className="font-playfair text-xs text-white">{img.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Text card */}
          <motion.div
            className="p-6 sm:p-8 mb-8"
            style={{
              background: 'linear-gradient(145deg, rgba(15,18,34,1) 0%, rgba(8,10,22,1) 100%)',
              border: '1px solid rgba(176,141,87,0.15)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-playfair text-xl text-white leading-snug mb-4">
              A family-run retreat where every guest feels at home…
            </h3>
            <div className="space-y-3 font-lato text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <p>
                Villa i Hotel was born from a passion for Sri Lankan hospitality. What began as a family home steps from the beach has grown into a cherished coastal retreat for guests worldwide.
              </p>
              <p>
                We believe luxury is about warmth — a home-cooked meal, a genuine welcome, and waking to the Indian Ocean.
              </p>
            </div>
            <ul className="space-y-3 mb-6">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1 flex-shrink-0 w-4 h-4 flex items-center justify-center"
                    style={{ border: '1px solid rgba(176,141,87,0.5)' }}
                  >
                    <span className="block w-1 h-1 rotate-45" style={{ background: GOLD }} />
                  </span>
                  <span className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/about"
                className="group flex items-center gap-3 font-lato text-xs tracking-[0.25em] uppercase"
                style={{ color: GOLD }}
              >
                Our Story
                <span
                  className="flex items-center justify-center w-7 h-7 transition-all duration-300 group-hover:bg-luxury-gold"
                  style={{ border: '1px solid rgba(176,141,87,0.4)' }}
                >
                  <HiArrowRight size={11} className="group-hover:text-luxury-black" />
                </span>
              </Link>
              <span className="block w-px h-4" style={{ background: 'rgba(176,141,87,0.2)' }} />
              <Link
                href="/contact"
                className="font-lato text-xs tracking-[0.25em] uppercase hover:text-luxury-gold transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Book Direct
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Stats row — shared desktop + mobile ── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-10"
          style={{ borderTop: '1px solid rgba(176,141,87,0.10)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <StatCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}