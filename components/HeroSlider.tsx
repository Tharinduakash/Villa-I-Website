'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

export type SlideData = {
  desktopImage: string
  mobileImage: string
  accentColor: string
  accentGlow: string
  eyebrow: string
  title: string
  titleItalic: string
  titleEnd: string
  cta: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

const FALLBACK_SLIDES: SlideData[] = []

const SLIDE_DURATION = 6500
const TRANSITION_MS = 1000

/* ─── Hero particle canvas ─────────────────────────────────────── */
function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    interface P { x: number; y: number; vx: number; vy: number; r: number; alpha: number; pulse: number; speed: number }
    const COUNT = 60
    const pts: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3, alpha: Math.random() * 0.35 + 0.05,
      pulse: Math.random() * Math.PI * 2, speed: Math.random() * 0.018 + 0.008,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      pts.forEach(p => {
        p.pulse += p.speed
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse))
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,169,110,${a})`; ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      })
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(201,169,110,${0.06 * (1 - dist / 130)})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }} />
}

/* ─── Animated letter reveal ───────────────────────────────────── */
const letterVars = {
  hidden: { opacity: 0, y: 30, rotateX: -70, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, delay: 0.3 + i * 0.035, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSlider({ slides: propSlides }: { slides?: SlideData[] }) {
  const slides = propSlides?.length ? propSlides : FALLBACK_SLIDES
  const TOTAL  = slides.length

  const heroRef = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const currentRef = useRef(0)
  const transitioningRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const transRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '28%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0])
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.06])

  const goTo = useCallback((toIndex: number) => {
    if (transitioningRef.current) return
    const fromIndex = currentRef.current
    if (toIndex === fromIndex) return
    transitioningRef.current = true; setTransitioning(true); setPrev(fromIndex)
    currentRef.current = toIndex; setCurrent(toIndex)
    if (transRef.current) clearTimeout(transRef.current)
    transRef.current = setTimeout(() => { setPrev(null); setTransitioning(false); transitioningRef.current = false }, TRANSITION_MS)
  }, [])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => { goTo((currentRef.current + 1) % TOTAL) }, SLIDE_DURATION)
  }, [goTo, TOTAL])

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); if (transRef.current) clearTimeout(transRef.current) } }, [startTimer])

  const handleDot = useCallback((i: number) => { goTo(i); startTimer() }, [goTo, startTimer])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
    if (Math.abs(dx) > 50 && dy < 80) {
      if (dx < 0) goTo((currentRef.current + 1) % TOTAL)
      else goTo((currentRef.current - 1 + TOTAL) % TOTAL)
      startTimer()
    }
  }, [goTo, startTimer, TOTAL])

  const slide = slides[current]
  const padNum = (n: number) => String(n).padStart(2, '0')

  return (
    <>
      <style>{`
        .vs { position: absolute; inset: 0; }
        .vs.leaving { z-index: 1; animation: vsFadeOut ${TRANSITION_MS}ms ease forwards; }
        .vs.entering { z-index: 2; animation: vsFadeIn ${TRANSITION_MS}ms ease forwards; }
        .vs.idle { z-index: 2; }
        @keyframes vsFadeIn { from { opacity:0; transform:scale(1.06); } to { opacity:1; transform:scale(1); } }
        @keyframes vsFadeOut { from { opacity:1; } to { opacity:0; transform:scale(0.97); } }

        .vs-progress { position:absolute; bottom:0; left:0; height:2px; background:linear-gradient(to right,rgba(176,141,87,0.5),rgba(201,169,110,1)); z-index:20; animation:vsProgress ${SLIDE_DURATION}ms linear forwards; }
        @keyframes vsProgress { from{width:0%} to{width:100%} }

        .vs-dot { height:2px; border-radius:2px; border:none; cursor:pointer; padding:0; background:rgba(255,255,255,0.22); transition:width 0.4s cubic-bezier(.4,0,.2,1),background 0.3s; width:20px; }
        .vs-dot.active { width:44px; background:rgba(201,169,110,1); }
        .vs-dot:hover:not(.active) { background:rgba(255,255,255,0.5); }

        .vs-scroll-line { width:1px; height:36px; background:linear-gradient(180deg,rgba(201,169,110,0.9),transparent); animation:vsPulse 2.2s ease-in-out infinite; }
        @keyframes vsPulse { 0%,100%{opacity:0.3;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(0.55)} }

        .vs-btn-p { display:inline-flex; align-items:center; justify-content:center; padding:13px 32px; background:linear-gradient(135deg,#d4a84b 0%,#c9a96e 50%,#b8923a 100%); color:#0a0906; font-family:var(--font-lato,sans-serif); font-size:10px; letter-spacing:0.28em; text-transform:uppercase; text-decoration:none; white-space:nowrap; font-weight:700; transition:all 0.3s; flex-shrink:0; box-shadow:0 0 0 1px rgba(255,220,130,0.35),0 4px 20px rgba(201,169,110,0.65),0 8px 40px rgba(180,140,50,0.35),0 1px 8px rgba(0,0,0,0.8); }
        .vs-btn-p:hover { background:linear-gradient(135deg,#e8c06a 0%,#d4a84b 50%,#c9a96e 100%); transform:translateY(-2px); box-shadow:0 0 0 1px rgba(255,220,130,0.5),0 6px 28px rgba(201,169,110,0.8),0 12px 50px rgba(180,140,50,0.45),0 2px 12px rgba(0,0,0,0.9); }
        .vs-btn-s { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:13px 32px; border:1px solid rgba(201,169,110,0.65); color:rgba(201,169,110,0.95); background:rgba(5,7,14,0.55); backdrop-filter:blur(10px); font-family:var(--font-lato,sans-serif); font-size:10px; letter-spacing:0.28em; text-transform:uppercase; text-decoration:none; white-space:nowrap; transition:all 0.3s; flex-shrink:0; box-shadow:0 0 0 1px rgba(201,169,110,0.08) inset,0 2px 16px rgba(0,0,0,0.6); }
        .vs-btn-s:hover { border-color:rgba(201,169,110,0.9); color:rgba(201,169,110,1); background:rgba(201,169,110,0.12); transform:translateY(-2px); box-shadow:0 0 0 1px rgba(201,169,110,0.15) inset,0 4px 24px rgba(0,0,0,0.7),0 0 20px rgba(201,169,110,0.2); }
        .vs-btn-s .arrow { transition:transform 0.3s; flex-shrink:0; }
        .vs-btn-s:hover .arrow { transform:translateX(3px); }
        @media (max-width: 639px) { .vs-btn-p, .vs-btn-s { width:100%; } }

        .hero-orb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(70px); animation:orbFloat 8s ease-in-out infinite alternate; }
        @keyframes orbFloat { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(20px,-30px) scale(1.1)} }
      `}</style>

      <section
        ref={heroRef}
        className="relative h-screen min-h-[680px] overflow-hidden"
        style={{ background: '#06080f' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient orbs */}
        <div className="hero-orb" style={{ top: '-10%', left: '15%', width: '55vw', height: '55vw', background: 'radial-gradient(ellipse,rgba(201,169,110,0.09) 0%,transparent 65%)', animationDuration: '9s' }} />
        <div className="hero-orb" style={{ bottom: '-20%', right: '5%', width: '45vw', height: '45vw', background: 'radial-gradient(ellipse,rgba(100,60,200,0.07) 0%,transparent 65%)', animationDuration: '12s', animationDelay: '-4s' }} />
        <div className="hero-orb" style={{ top: '30%', right: '10%', width: '30vw', height: '30vw', background: 'radial-gradient(ellipse,rgba(201,169,110,0.06) 0%,transparent 65%)', animationDuration: '7s', animationDelay: '-2s' }} />

        {/* Particle canvas */}
        <HeroParticles />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(201,169,110,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.025) 1px,transparent 1px)', backgroundSize: '90px 90px', zIndex: 3 }} />

        {/* Outgoing slide */}
        {prev !== null && (
          <div className="vs leaving" key={`prev-${prev}`} style={{ zIndex: 1 }}>
            <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
              <Image src={slides[prev].desktopImage} alt={slides[prev].title} fill unoptimized className="object-cover object-center hidden md:block" sizes="100vw" />
              <Image src={slides[prev].mobileImage} alt={slides[prev].title} fill unoptimized className="object-cover object-center block md:hidden" sizes="100vw" />
            </motion.div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg,rgba(5,7,14,0.78) 0%,rgba(5,7,14,0.38) 38%,rgba(5,7,14,0.04) 65%,transparent 80%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(5,7,14,0.62) 0%,rgba(5,7,14,0.08) 22%,transparent 42%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(5,7,14,0.65) 0%,rgba(5,7,14,0.2) 18%,transparent 36%)', zIndex: 1 }} />
          </div>
        )}

        {/* Active slide */}
        <div className={`vs ${transitioning ? 'entering' : 'idle'}`} key={`curr-${current}`} style={{ zIndex: 2 }}>
          <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
            <Image src={slide.desktopImage} alt={slide.title} fill priority={current === 0} unoptimized className="object-cover object-center hidden md:block" sizes="100vw" />
            <Image src={slide.mobileImage} alt={slide.title} fill priority={current === 0} unoptimized className="object-cover object-center block md:hidden" sizes="100vw" />
          </motion.div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg,rgba(5,7,14,0.78) 0%,rgba(5,7,14,0.38) 38%,rgba(5,7,14,0.04) 65%,transparent 80%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(5,7,14,0.62) 0%,rgba(5,7,14,0.08) 22%,transparent 42%)' }} />
          {/* Top gradient — keeps navbar text readable on any photo */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(5,7,14,0.65) 0%,rgba(5,7,14,0.2) 18%,transparent 36%)', zIndex: 1 }} />
        </div>

        {/* Decorative vertical line */}
        <motion.div
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
          className="absolute left-10 top-0 h-full w-px hidden lg:block"
          style={{ originY: '0', background: 'linear-gradient(to bottom,transparent,rgba(176,141,87,0.3) 25%,rgba(176,141,87,0.3) 75%,transparent)', zIndex: 10 }}
        />

        {/* Hero Content */}
        <motion.div className="relative h-full flex flex-col justify-center" style={{ opacity: heroOpacity, zIndex: 10 }}>
          <div className="px-8 sm:px-12 md:px-16 lg:px-24" style={{ maxWidth: '720px' }}>
            <div key={`content-${current}`}>
              {/* Eyebrow */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`eyebrow-${current}`}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="block h-px w-10" style={{ background: 'linear-gradient(to right,transparent,rgba(176,141,87,0.8))' }} />
                  <p className="font-lato text-[10px] tracking-[0.42em] uppercase" style={{ color: 'rgba(201,169,110,0.9)' }}>{slide.eyebrow}</p>
                  <span className="block h-px w-5" style={{ background: 'rgba(176,141,87,0.3)' }} />
                </motion.div>
              </AnimatePresence>

              {/* 3D letter headline */}
              <div style={{ perspective: '900px', marginBottom: '1.25rem' }}>
                <div className="font-lato mb-1" style={{ fontSize: 'clamp(0.82rem,1.8vw,1.2rem)', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', lineHeight: 1.2, textShadow: '0 1px 10px rgba(0,0,0,0.9)' }}>
                  <AnimatePresence mode="wait">
                    <motion.span key={`t-${current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                      {slide.title}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="overflow-visible" style={{ lineHeight: 0.9, marginBottom: '0.15em' }}>
                  {slide.titleItalic.split('').map((ch, ci) => (
                    <motion.span
                      key={`${current}-italic-${ci}`}
                      custom={ci}
                      variants={letterVars}
                      initial="hidden"
                      animate="visible"
                      className="inline-block font-playfair"
                      style={{
                        fontSize: 'clamp(3.6rem,8.5vw,7rem)',
                        fontWeight: 800,
                        fontStyle: 'italic',
                        color: slide.accentColor,
                        letterSpacing: ch === ' ' ? '0.15em' : '-0.02em',
                        transformOrigin: 'top center',
                        textShadow: `0 0 40px ${slide.accentGlow}, 0 0 80px ${slide.accentGlow}, 0 2px 12px rgba(0,0,0,0.8)`,
                      }}
                    >
                      {ch === ' ' ? ' ' : ch}
                    </motion.span>
                  ))}
                </div>

                <div className="font-lato" style={{ fontSize: 'clamp(1rem,2.2vw,1.6rem)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.88)', lineHeight: 1.2, textShadow: '0 2px 14px rgba(0,0,0,0.95)' }}>
                  <AnimatePresence mode="wait">
                    <motion.span key={`te-${current}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                      {slide.titleEnd}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.85 }} style={{ originX: '0' }}
                className="flex items-center gap-3 mb-7"
              >
                <span className="block h-px w-16" style={{ background: 'rgba(176,141,87,0.45)' }} />
                <span className="block w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: 'rgba(176,141,87,0.7)' }} />
                <span className="block h-px w-6" style={{ background: 'rgba(176,141,87,0.22)' }} />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.05 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}
              >
                <a href={slide.cta.href} className="vs-btn-p">{slide.cta.label}</a>
                <a href={slide.ctaSecondary.href} className="vs-btn-s">
                  {slide.ctaSecondary.label}
                  <HiArrowRight size={11} className="arrow" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Top-right ornament */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }}
          className="absolute top-8 right-8 hidden lg:flex flex-col items-end gap-1.5"
          style={{ zIndex: 10 }}
        >
          <span className="block h-px w-16" style={{ background: 'rgba(176,141,87,0.2)' }} />
          <span className="block h-px w-8" style={{ background: 'rgba(176,141,87,0.12)' }} />
        </motion.div>

        {/* Bottom HUD */}
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: '0 2rem 2rem', zIndex: 20 }}>
          {/* Slide counter */}
          <div className="hidden sm:flex flex-col leading-none absolute" style={{ left: '2rem', bottom: '2rem' }}>
            <span className="font-playfair italic" style={{ fontSize: '1.4rem', color: 'rgba(201,169,110,0.85)' }}>{padNum(current + 1)}</span>
            <span className="font-lato mt-1" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.22)' }}>/ {padNum(TOTAL)}</span>
          </div>

          {/* Dots */}
          <div className="absolute flex items-center gap-2" style={{ left: '50%', bottom: '2.2rem', transform: 'translateX(-50%)' }}>
            {slides.map((_, i) => (
              <button key={i} className={`vs-dot ${i === current ? 'active' : ''}`} onClick={() => handleDot(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>

          {/* Scroll hint */}
          <div className="hidden md:flex flex-col items-center gap-2 absolute" style={{ right: '2rem', bottom: '2rem', opacity: 0.4 }}>
            <span className="font-lato" style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', writingMode: 'vertical-rl', color: 'rgba(255,255,255,0.6)' }}>Scroll</span>
            <div className="vs-scroll-line" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="vs-progress" key={`prog-${current}`} />
      </section>
    </>
  )
}
