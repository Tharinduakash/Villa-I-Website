'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const GOLD = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

/* ─── Particle canvas ───────────────────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = canvas.offsetHeight)

    interface P {
      x: number; y: number; vx: number; vy: number
      r: number; alpha: number; pulse: number; speed: number
    }

    const COUNT = 80
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.pulse += p.speed
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,169,110,${a})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
      })

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(201,169,110,${0.07 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ─── Hero ──────────────────────────────────────────────────────── */
const WORDS = ['Our', 'Services']
const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.7, delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ServicesHero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '72vh',
        background: 'linear-gradient(160deg, #070921 0%, #04060e 50%, #0a0520 100%)',
      }}
    >
      {/* Radial glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: '-10%', left: '20%', width: '50vw', height: '50vw', background: 'radial-gradient(ellipse, rgba(201,169,110,0.12) 0%, transparent 60%)', filter: 'blur(40px)' }} />
        <div className="absolute" style={{ bottom: '-15%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(ellipse, rgba(120,80,200,0.08) 0%, transparent 60%)', filter: 'blur(60px)' }} />
        <div className="absolute" style={{ top: '30%', right: '5%', width: '30vw', height: '30vw', background: 'radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 65%)', filter: 'blur(30px)' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Particle field */}
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="block h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.7))' }} />
          <p className="font-lato text-[10px] tracking-[0.5em] uppercase" style={{ color: GOLD_DIM }}>Villa i Hotel</p>
          <span className="block h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.7))' }} />
        </motion.div>

        {/* 3D letter-reveal headline */}
        <div className="overflow-hidden" style={{ perspective: '800px' }}>
          <div className="font-playfair leading-none mb-4" style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}>
            {WORDS.map((word, wi) => (
              <span key={wi} className="inline-block mr-5 last:mr-0" style={{ display: 'inline-block' }}>
                {word.split('').map((ch, ci) => (
                  <motion.span
                    key={ci}
                    custom={wi * 10 + ci}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                    style={{
                      color: wi === 1 ? GOLD : 'white',
                      fontStyle: wi === 1 ? 'italic' : 'normal',
                      transformOrigin: 'top center',
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: 'easeOut' }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px flex-1 max-w-28" style={{ background: `linear-gradient(to right, transparent, ${GOLD_DIM})` }} />
          <div className="w-2 h-2 rotate-45 flex-shrink-0" style={{ background: GOLD }} />
          <div className="h-px flex-1 max-w-28" style={{ background: `linear-gradient(to left, transparent, ${GOLD_DIM})` }} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="font-lato text-base leading-relaxed max-w-lg mx-auto"
          style={{ color: 'rgba(255,255,255,0.42)' }}
        >
          Every experience at Villa i is crafted to immerse you in comfort, beauty, and the spirit of Sri Lanka.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-lato text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{ background: `linear-gradient(to bottom, ${GOLD_DIM}, transparent)` }}
          />
        </motion.div>
      </div>
    </section>
  )
}
