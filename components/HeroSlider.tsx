'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

const slides = [
  {
    image: '/webp/hotel.png',
    eyebrow: 'Mount Lavinia, Sri Lanka',
    title: 'Escape to',
    titleItalic: 'Villa i',
    titleEnd: 'by the Sea',
  
    cta: { label: 'Reserve Your Stay', href: '/contact' },
    ctaSecondary: { label: 'Explore Rooms', href: '/rooms' },
  },

  {
    image: '/webp/room1.jpg',
    eyebrow: 'Comfort for Every Stay',
    title: 'Relax in',
    titleItalic: 'A/C & Non A/C',
    titleEnd: 'Rooms',
   
    cta: { label: 'View Rooms', href: '/rooms' },
    ctaSecondary: { label: 'Book Now', href: '/contact' },
  },

  {
    image: '/webp/fruit juices.webp',
    eyebrow: 'Refreshing Moments',
    title: 'Enjoy Our',
    titleItalic: 'Drinks',
    titleEnd: 'Corner',
  
    cta: { label: 'View Services', href: '/services' },
    ctaSecondary: { label: 'Contact Us', href: '/contact' },
  },

  {
    image: '/webp/Accommodation One Bedroom.jpg',
    eyebrow: 'Private & Exclusive',
    title: 'Book the',
    titleItalic: 'Full Villa',
    titleEnd: 'Experience',
   
    cta: { label: 'Book Full Villa', href: '/rooms#full-villa' },
    ctaSecondary: { label: 'View All Rooms', href: '/rooms' },
  },

  {
    image: '/webp/Waves.png',
    eyebrow: '100m from the Beach',
    title: 'Wake Up to',
    titleItalic: 'Ocean',
    titleEnd: 'Breezes',
  
    cta: { label: 'Reserve Your Stay', href: '/contact' },
    ctaSecondary: { label: 'Explore Experience', href: '/about' },
  },
]

const SLIDE_DURATION = 6500
const TRANSITION_MS = 1000
const TOTAL = slides.length

export default function HeroSlider() {
  const heroRef = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  const currentRef = useRef(0)
  const transitioningRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const transRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '28%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0])

  const goTo = useCallback((toIndex: number) => {
    if (transitioningRef.current) return
    const fromIndex = currentRef.current
    if (toIndex === fromIndex) return
    transitioningRef.current = true
    setTransitioning(true)
    setPrev(fromIndex)
    currentRef.current = toIndex
    setCurrent(toIndex)
    if (transRef.current) clearTimeout(transRef.current)
    transRef.current = setTimeout(() => {
      setPrev(null)
      setTransitioning(false)
      transitioningRef.current = false
    }, TRANSITION_MS)
  }, [])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % TOTAL)
    }, SLIDE_DURATION)
  }, [goTo])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (transRef.current) clearTimeout(transRef.current)
    }
  }, [startTimer])

  const handleDot = useCallback(
    (i: number) => { goTo(i); startTimer() },
    [goTo, startTimer]
  )

  const slide = slides[current]
  const padNum = (n: number) => String(n).padStart(2, '0')

  return (
    <>
      <style>{`
        .villa-slide { position: absolute; inset: 0; }
        .villa-slide.leaving {
          z-index: 1;
          animation: villaFadeOut ${TRANSITION_MS}ms ease forwards;
        }
        .villa-slide.entering {
          z-index: 2;
          animation: villaFadeIn ${TRANSITION_MS}ms ease forwards;
        }
        .villa-slide.idle { z-index: 2; }

        @keyframes villaFadeIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes villaFadeOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.97); }
        }

        .villa-progress {
          position: absolute; bottom: 0; left: 0; height: 2px;
          background: linear-gradient(to right, rgba(176,141,87,0.5), rgba(201,169,110,1));
          z-index: 20;
          animation: villaProgress ${SLIDE_DURATION}ms linear forwards;
        }
        @keyframes villaProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }

        .villa-content-in {
          animation: villaContentIn 1.1s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes villaContentIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .villa-dot {
          height: 2px; border-radius: 2px; border: none; cursor: pointer; padding: 0;
          background: rgba(255,255,255,0.25);
          transition: width 0.4s cubic-bezier(.4,0,.2,1), background 0.35s ease;
          width: 20px;
        }
        .villa-dot.active { width: 44px; background: rgba(201,169,110,1); }
        .villa-dot:hover:not(.active) { background: rgba(255,255,255,0.55); }

        .villa-scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(180deg, rgba(201,169,110,0.9), transparent);
          animation: villaScrollPulse 2.2s ease-in-out infinite;
        }
        @keyframes villaScrollPulse {
          0%,100% { opacity: 0.3; transform: scaleY(1); }
          50%      { opacity: 1;  transform: scaleY(0.55); }
        }

        /* ── Button hover states ── */
        .villa-btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 12px 28px;
          background: rgba(201,169,110,1);
          color: #0a0906;
          font-family: var(--font-lato, sans-serif);
          font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
          text-decoration: none; white-space: nowrap;
          transition: background 0.3s ease;
          flex-shrink: 0;
        }
        .villa-btn-primary:hover { background: #e8d5b0; }

        .villa-btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px 24px;
          border: 1px solid rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.78);
          font-family: var(--font-lato, sans-serif);
          font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
          text-decoration: none; white-space: nowrap;
          transition: border-color 0.3s ease, color 0.3s ease;
          flex-shrink: 0;
        }
        .villa-btn-secondary:hover {
          border-color: rgba(201,169,110,0.6);
          color: rgba(201,169,110,1);
        }
        .villa-btn-secondary .arrow {
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .villa-btn-secondary:hover .arrow { transform: translateX(3px); }
      `}</style>

      <section
        ref={heroRef}
        className="relative h-screen min-h-[680px] overflow-hidden"
        style={{ background: '#090806' }}
      >

        {/* ── Outgoing slide ── */}
        {prev !== null && (
          <div className="villa-slide leaving" key={`prev-${prev}`}>
            <motion.div className="absolute inset-0" style={{ y: heroY }}>
              <Image
                src={slides[prev].image}
                alt={slides[prev].title}
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(105deg, rgba(8,7,5,0.93) 0%, rgba(8,7,5,0.62) 45%, rgba(8,7,5,0.14) 100%)',
            }} />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, rgba(8,7,5,0.90) 0%, rgba(8,7,5,0.18) 30%, transparent 55%)',
            }} />
          </div>
        )}

        {/* ── Active slide ── */}
        <div
          className={`villa-slide ${transitioning ? 'entering' : 'idle'}`}
          key={`curr-${current}`}
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={current === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(105deg, rgba(8,7,5,0.93) 0%, rgba(8,7,5,0.62) 45%, rgba(8,7,5,0.12) 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(8,7,5,0.92) 0%, rgba(8,7,5,0.18) 30%, rgba(8,7,5,0.32) 100%)',
          }} />
        </div>

        {/* ── Decorative vertical line (desktop) ── */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="absolute left-10 top-0 h-full w-px hidden lg:block z-10"
          style={{
            originY: '0',
            background: 'linear-gradient(to bottom, transparent, rgba(176,141,87,0.35) 30%, rgba(176,141,87,0.35) 70%, transparent)',
          }}
        />

        {/* ── Hero Content ── */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-center"
          style={{ opacity: heroOpacity }}
        >
          {/* Content wrapper — constrained width, left aligned */}
          <div
            className="px-8 sm:px-12 md:px-16 lg:px-24"
            style={{ maxWidth: '680px' }}
          >
            <div
              key={`content-${current}`}
              className={transitioning ? 'villa-content-in' : ''}
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex items-center gap-3 mb-5"
              >
                <span
                  className="block h-px w-8"
                  style={{ background: 'rgba(176,141,87,0.75)', flexShrink: 0 }}
                />
                <p
                  className="font-lato text-[10px] tracking-[0.38em] uppercase"
                  style={{ color: 'rgba(201,169,110,0.95)' }}
                >
                  {slide.eyebrow}
                </p>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55 }}
                className="font-playfair leading-[1.08] mb-5"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}
              >
                <span className="text-white">{slide.title}</span>
                <br />
                <span style={{ color: 'rgba(201,169,110,1)', fontStyle: 'italic' }}>
                  {slide.titleItalic}
                </span>
                <br />
                <span style={{ color: 'rgba(255,255,255,0.88)' }}>{slide.titleEnd}</span>
              </motion.h1>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.8 }}
                style={{ originX: '0' }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="block h-px w-14" style={{ background: 'rgba(176,141,87,0.48)' }} />
                <span className="block w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(176,141,87,0.65)' }} />
                <span className="block h-px w-5" style={{ background: 'rgba(176,141,87,0.26)' }} />
              </motion.div>


              {/* ── CTA Buttons ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}
              >
                <a href={slide.cta.href} className="villa-btn-primary">
                  {slide.cta.label}
                </a>
                <a href={slide.ctaSecondary.href} className="villa-btn-secondary">
                  {slide.ctaSecondary.label}
                  <HiArrowRight size={11} className="arrow" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Top-right ornament (desktop) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute top-8 right-8 hidden lg:flex flex-col items-end gap-1.5 z-10"
        >
          <span className="block h-px w-14" style={{ background: 'rgba(176,141,87,0.22)' }} />
          <span className="block h-px w-7" style={{ background: 'rgba(176,141,87,0.13)' }} />
        </motion.div>

        {/* ── Bottom HUD ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20"
          style={{ padding: '0 2rem 2rem' }}
        >
          {/* Slide counter — left */}
          <div
            className="hidden sm:flex flex-col leading-none absolute"
            style={{ left: '2rem', bottom: '2rem' }}
          >
            <span
              className="font-playfair italic"
              style={{ fontSize: '1.4rem', color: 'rgba(201,169,110,0.85)' }}
            >
              {padNum(current + 1)}
            </span>
            <span
              className="font-lato mt-1"
              style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)' }}
            >
              / {padNum(TOTAL)}
            </span>
          </div>

          {/* Dots — centered */}
          <div
            className="absolute flex items-center gap-2"
            style={{
              left: '50%',
              bottom: '2.2rem',
              transform: 'translateX(-50%)',
            }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                className={`villa-dot ${i === current ? 'active' : ''}`}
                onClick={() => handleDot(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Scroll hint — right (desktop) */}
          <div
            className="hidden md:flex flex-col items-center gap-2 absolute"
            style={{ right: '2rem', bottom: '2rem', opacity: 0.45 }}
          >
            <span
              className="font-lato"
              style={{
                fontSize: '8px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                writingMode: 'vertical-rl',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Scroll
            </span>
            <div className="villa-scroll-line" />
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="villa-progress" key={`prog-${current}`} />
      </section>
    </>
  )
}