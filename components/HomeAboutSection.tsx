'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

const stats = [
  { value: '10+',  label: 'Years of Hospitality' },
  { value: '1K+',  label: 'Happy Guests'          },
  { value: '4.9',  label: 'Guest Rating'           },
  { value: '100m', label: 'From the Beach'         },
]

const highlights = [
  'Authentic Sri Lankan home-cooked meals daily',
  'Full villa privacy with garden & beach access',
  'Personalised hospitality from a local family',
]

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

/* ─── Animated counter ─────────────────────────────────────────── */
function StatCounter({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState('0')
  const ref     = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      const raw = parseFloat(value.replace(/[^0-9.]/g, ''))
      const isFloat = value.includes('.')
      const steps = 55
      let current = 0
      const inc = raw / steps
      const timer = setInterval(() => {
        current += inc
        if (current >= raw) { setDisplay(value); clearInterval(timer) }
        else setDisplay(isFloat ? current.toFixed(1) : Math.floor(current).toString())
      }, 28)
    }, { threshold: 0.4 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="group relative flex flex-col gap-1.5 cursor-default">
      {/* Glow orb behind number */}
      <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,169,110,0.08) 0%,transparent 70%)' }} />
      <span className="font-playfair text-3xl md:text-4xl tabular-nums relative z-10 transition-colors duration-300 group-hover:text-luxury-gold" style={{ color: GOLD }}>
        {display}
      </span>
      <span className="font-lato text-[10px] tracking-[0.22em] uppercase relative z-10 transition-colors duration-300 group-hover:text-white/55" style={{ color: 'rgba(255,255,255,0.28)' }}>
        {label}
      </span>
    </div>
  )
}

/* ─── 3D tilt image frame ─────────────────────────────────────── */
function TiltFrame({ src, alt, caption, sub, delay = 0 }: { src: string; alt: string; caption: string; sub: string; delay?: number }) {
  const frameRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale3d(1.02,1.02,1.02)`
  }
  const handleLeave = () => { if (frameRef.current) frameRef.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)' }

  return (
    <motion.div
      ref={frameRef}
      initial={{ opacity: 0, x: delay > 0 ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.35s ease', position: 'relative', aspectRatio: '3/4', border: '1px solid rgba(176,141,87,0.15)' }}
      className="relative overflow-hidden"
    >
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 hover:scale-105" />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(5,7,14,0.04) 0%,rgba(5,7,14,0.75) 100%)' }} />
      {/* Shimmer edge on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(135deg,rgba(201,169,110,0.08) 0%,transparent 50%)' }} />
      {/* Caption */}
      <div className="absolute bottom-5 left-5 right-5 px-4 py-3" style={{ background: 'rgba(5,7,14,0.88)', backdropFilter: 'blur(14px)', border: '1px solid rgba(176,141,87,0.18)' }}>
        <p className="font-lato text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: GOLD_DIM }}>{caption}</p>
        <p className="font-playfair text-sm text-white">{sub}</p>
      </div>
    </motion.div>
  )
}

/* ─── Main component ───────────────────────────────────────────── */
export default function HomeAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const leftY  = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rightY = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#0c0f22 0%,#06080f 60%,#090c1c 100%)' }}
    >
      {/* Parallax dot grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, backgroundImage: 'radial-gradient(circle,rgba(176,141,87,0.06) 1px,transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute pointer-events-none" style={{ top: '10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(ellipse,rgba(176,141,87,0.07) 0%,transparent 65%)', filter: 'blur(60px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '5%', right: '-5%', width: '35vw', height: '35vw', background: 'radial-gradient(ellipse,rgba(100,60,200,0.05) 0%,transparent 65%)', filter: 'blur(80px)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10" style={{ zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          className="flex flex-col items-center text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="flex items-center gap-4 mb-5">
            <motion.span className="block h-px w-12" style={{ background: GOLD_DIM }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
            <p className="font-lato text-xs tracking-[0.42em] uppercase" style={{ color: GOLD_DIM }}>Our Story</p>
            <motion.span className="block h-px w-12" style={{ background: GOLD_DIM }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} />
          </div>
          <h2 className="font-playfair text-white leading-tight" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', textShadow: '0 0 80px rgba(201,169,110,0.1)' }}>
            More Than a Hotel —
            <br />
            <motion.span
              className="italic"
              style={{ color: GOLD }}
              animate={{ textShadow: ['0 0 20px rgba(201,169,110,0.3)', '0 0 40px rgba(201,169,110,0.6)', '0 0 20px rgba(201,169,110,0.3)'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              A Home by the Sea
            </motion.span>
          </h2>
        </motion.div>

        {/* Desktop 3-col layout */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-center">
          {/* Left image — parallax up */}
          <motion.div className="col-span-4" style={{ y: leftY }}>
            <TiltFrame
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=85"
              alt="Villa i Hotel Garden"
              caption="Established"
              sub="Mount Lavinia, Sri Lanka"
            />
          </motion.div>

          {/* Center — text card */}
          <motion.div
            className="col-span-4 flex flex-col justify-center"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="p-8 md:p-10 relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg,rgba(15,18,34,1) 0%,rgba(8,10,22,1) 100%)', border: '1px solid rgba(176,141,87,0.15)', boxShadow: '0 8px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(176,141,87,0.04)' }}
            >
              {/* Subtle interior glow */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(201,169,110,0.04) 0%,transparent 60%)' }} />

              {/* Corner ornament */}
              <div className="relative mb-7">
                <div className="absolute top-0 left-0 w-7 h-px" style={{ background: GOLD }} />
                <div className="absolute top-0 left-0 w-px h-7" style={{ background: GOLD }} />
                <div className="absolute top-0 right-0 w-7 h-px" style={{ background: GOLD }} />
                <div className="absolute top-0 right-0 w-px h-7" style={{ background: GOLD }} />
                <h3 className="font-playfair text-xl md:text-2xl text-white leading-snug pt-4 pl-3">
                  A family-run retreat where every guest feels at home…
                </h3>
              </div>

              <div className="space-y-3 font-lato text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.44)' }}>
                <p>Villa i Hotel was born from a passion for Sri Lankan hospitality and a love of the sea. What began as a family home steps from the beach in Mount Lavinia has grown into a cherished coastal retreat for guests from around the world.</p>
                <p>We believe luxury isn't about grandeur — it's about the warmth of a welcome, the taste of a home-cooked meal, and waking up to the sound of the Indian Ocean.</p>
              </div>

              <ul className="space-y-3 mb-8">
                {highlights.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 flex-shrink-0 w-4 h-4 flex items-center justify-center" style={{ border: '1px solid rgba(176,141,87,0.5)' }}>
                      <span className="block w-1 h-1 rotate-45" style={{ background: GOLD }} />
                    </span>
                    <span className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex items-center gap-5">
                <Link href="/about" className="group flex items-center gap-3 font-lato text-xs tracking-[0.25em] uppercase transition-all duration-300" style={{ color: GOLD }}>
                  Our Story
                  <span className="flex items-center justify-center w-8 h-8 transition-all duration-300 group-hover:bg-luxury-gold" style={{ border: '1px solid rgba(176,141,87,0.4)' }}>
                    <HiArrowRight size={12} className="group-hover:text-luxury-black group-hover:translate-x-0.5 transition-all duration-300" />
                  </span>
                </Link>
                <span className="block w-px h-5" style={{ background: 'rgba(176,141,87,0.2)' }} />
                <Link href="/contact" className="font-lato text-xs tracking-[0.25em] uppercase transition-colors duration-300 hover:text-luxury-gold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Book Direct
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right image — parallax down */}
          <motion.div className="col-span-4" style={{ y: rightY }}>
            <TiltFrame
              src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=85"
              alt="Mount Lavinia Beach"
              caption="Location"
              sub="100m from the Indian Ocean"
              delay={0.1}
            />
          </motion.div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          <motion.div className="grid grid-cols-2 gap-3 mb-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {[
              { src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=85', label: 'Our Gardens', sub: 'Tropical Oasis' },
              { src: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=85', label: 'Location',    sub: '100m from Beach' },
            ].map((img) => (
              <div key={img.label} className="relative overflow-hidden" style={{ aspectRatio: '3/4', border: '1px solid rgba(176,141,87,0.12)' }}>
                <Image src={img.src} alt={img.sub} fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(5,7,14,0.88) 0%,transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 right-0 px-3 py-3" style={{ background: 'rgba(5,7,14,0.72)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(176,141,87,0.15)' }}>
                  <p className="font-lato text-[9px] tracking-[0.25em] uppercase mb-0.5" style={{ color: GOLD_DIM }}>{img.label}</p>
                  <p className="font-playfair text-xs text-white">{img.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div className="p-6 sm:p-8 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(145deg,rgba(15,18,34,1) 0%,rgba(8,10,22,1) 100%)', border: '1px solid rgba(176,141,87,0.15)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="font-playfair text-xl text-white leading-snug mb-4">A family-run retreat where every guest feels at home…</h3>
            <div className="space-y-3 font-lato text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <p>Villa i Hotel was born from a passion for Sri Lankan hospitality. What began as a family home steps from the beach has grown into a cherished coastal retreat for guests worldwide.</p>
              <p>We believe luxury is about warmth — a home-cooked meal, a genuine welcome, and waking to the Indian Ocean.</p>
            </div>
            <ul className="space-y-3 mb-6">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-4 h-4 flex items-center justify-center" style={{ border: '1px solid rgba(176,141,87,0.5)' }}>
                    <span className="block w-1 h-1 rotate-45" style={{ background: GOLD }} />
                  </span>
                  <span className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/about" className="group flex items-center gap-3 font-lato text-xs tracking-[0.25em] uppercase" style={{ color: GOLD }}>
                Our Story
                <span className="flex items-center justify-center w-7 h-7 transition-all duration-300 group-hover:bg-luxury-gold" style={{ border: '1px solid rgba(176,141,87,0.4)' }}>
                  <HiArrowRight size={11} className="group-hover:text-luxury-black" />
                </span>
              </Link>
              <span className="block w-px h-4" style={{ background: 'rgba(176,141,87,0.2)' }} />
              <Link href="/contact" className="font-lato text-xs tracking-[0.25em] uppercase hover:text-luxury-gold transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.35)' }}>Book Direct</Link>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-10"
          style={{ borderTop: '1px solid rgba(176,141,87,0.10)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <StatCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
