'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react'
import Link from 'next/link'

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(201,169,110,0.55)'

const STATS = [
  { value: '50m',  label: 'To the Beach'  },
  { value: '4+',    label: 'Room Types'    },
  { value: '6+',    label: 'Services'      },
  { value: '4.9★',  label: 'Guest Rating'  },
]

const FEATURES = [
  'Beachside luxury just 50m from shore',
  'Private spa & wellness treatments',
  'Authentic Sri Lankan cuisine',
  'Full villa exclusive bookings',
]

export default function VideoShowcase() {
  const videoRef   = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-30px' })

  const [playing,  setPlaying]  = useState(false)
  const [muted,    setMuted]    = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [current,  setCurrent]  = useState(0)
  const [hovered,  setHovered]  = useState(false)
  const [mobileFs, setMobileFs] = useState(false)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid || !isInView) return
    vid.muted = true
    vid.play().then(() => setPlaying(true)).catch(() => {})
  }, [isInView])

  const togglePlay = useCallback(() => {
    const vid = videoRef.current
    if (!vid) return
    if (vid.paused) { vid.play(); setPlaying(true) }
    else            { vid.pause(); setPlaying(false) }
  }, [])

  const toggleMute = useCallback(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = !vid.muted
    setMuted(vid.muted)
  }, [])

  const handleTimeUpdate = useCallback(() => {
    const vid = videoRef.current
    if (!vid) return
    setCurrent(vid.currentTime)
    setProgress(vid.duration ? (vid.currentTime / vid.duration) * 100 : 0)
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) setDuration(videoRef.current.duration)
  }, [])

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const vid = videoRef.current
    if (!vid) return
    const rect = e.currentTarget.getBoundingClientRect()
    vid.currentTime = ((e.clientX - rect.left) / rect.width) * vid.duration
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  const handleFullscreen = async () => {
    const vid = videoRef.current
    if (!vid) return
    // Mobile: CSS-rotation fullscreen (works on iOS + Android, no API dependency)
    if (window.matchMedia('(max-width: 767px)').matches) {
      setMobileFs(true)
      return
    }
    // Desktop: native browser fullscreen
    try { await vid.requestFullscreen() } catch {}
  }

  const exitMobileFs = useCallback(() => setMobileFs(false), [])

  // Lock body scroll and handle Escape key while mobile fullscreen is open
  useEffect(() => {
    if (!mobileFs) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') exitMobileFs() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileFs, exitMobileFs])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    // Prevent the browser from also firing a synthetic click (which would double-toggle)
    e.preventDefault()
    togglePlay()
    // Clear any stuck hover state from touch — so the icon hides correctly after playing resumes
    setHovered(false)
  }, [togglePlay])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #090c1c 0%, #080b18 50%, #06080f 100%)' }}
    >
      {/* Top bleed — fades in from the section above */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #090c1c, transparent)' }} />

      {/* Bottom bleed — fades out into the section below */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #06080f, transparent)' }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[50vw]"
          style={{ background: 'radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 65%)', filter: 'blur(70px)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ══ LEFT — Text content (hidden on mobile) ═══════════════ */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="block h-px w-8" style={{ background: GOLD_DIM }} />
              <p className="font-lato text-[9px] tracking-[0.45em] uppercase" style={{ color: GOLD_DIM }}>
                Villa i in Motion
              </p>
            </div>

            {/* Headline */}
            <h2
              className="font-playfair text-white mb-5"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', lineHeight: 1.15 }}
            >
              Experience the{' '}
              <span className="italic" style={{ color: GOLD }}>Spirit</span>
              <br />of Villa i Hotel
            </h2>

            {/* Divider ornament */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: 'rgba(201,169,110,0.35)' }} />
              <div className="w-1 h-1 rotate-45" style={{ background: GOLD_DIM }} />
            </div>

           
            

            {/* Stats — 2×2 grid */}
            <div className="grid grid-cols-2 gap-2 mb-10">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col py-4 px-4 transition-all duration-300 group cursor-default"
                  style={{ border: '1px solid rgba(201,169,110,0.10)', background: 'rgba(201,169,110,0.03)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)'; e.currentTarget.style.background = 'rgba(201,169,110,0.07)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.10)'; e.currentTarget.style.background = 'rgba(201,169,110,0.03)' }}
                >
                  <p className="font-playfair text-2xl mb-0.5 group-hover:text-luxury-gold transition-colors duration-300" style={{ color: GOLD }}>
                    {value}
                  </p>
                  <p className="font-lato text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>


            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/rooms"
                className="px-7 py-3 font-lato text-[10px] tracking-[0.3em] uppercase transition-all duration-300 hover:opacity-85"
                style={{ background: GOLD, color: '#06080f' }}
              >
                Explore Rooms
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3 font-lato text-[10px] tracking-[0.3em] uppercase transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.50)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.50)' }}
              >
                Book Your Stay
              </Link>
            </div>
          </motion.div>

          {/* ══ RIGHT — Video ════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* ── Mobile fullscreen: black backdrop ── */}
            {mobileFs && (
              <div
                className="fixed inset-0 bg-black md:hidden"
                style={{ zIndex: 9998 }}
                onClick={exitMobileFs}
              />
            )}

            {/* ── Mobile fullscreen: close button (outside rotated container so it stays upright) ── */}
            {mobileFs && (
              <button
                className="fixed md:hidden flex items-center justify-center w-10 h-10 rounded-full"
                style={{ top: 16, right: 16, zIndex: 10001, background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
                onClick={exitMobileFs}
                onTouchEnd={(e) => { e.stopPropagation(); exitMobileFs() }}
              >
                <X size={18} />
              </button>
            )}

            {/* Video card */}
            <div
              className="relative overflow-hidden cursor-pointer"
              style={mobileFs ? {
                // CSS-rotation fullscreen: phone stays portrait, video rotates 90° to fill landscape
                position: 'fixed',
                top: '50%',
                left: '50%',
                // swap dimensions: width=100vh fills phone height, height=100vw fills phone width
                width: '100vh',
                height: '100vw',
                transform: 'translate(-50%, -50%) rotate(90deg)',
                zIndex: 9999,
                border: 'none',
                borderRadius: 0,
              } : {
                aspectRatio: '16 / 10',
                border: '1px solid rgba(201,169,110,0.18)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,169,110,0.06)',
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={togglePlay}
              onTouchEnd={handleTouchEnd}
            >
              {/* muted must be a static HTML attribute (not bound to state) for browsers
                  to allow autoplay. Mute toggling is handled via videoRef.current.muted */}
              <video
                ref={videoRef}
                src="/webp/IMG_3234.mp4"
                poster="/webp/hotel1.png"
                loop
                playsInline
                muted
                autoPlay
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(180deg, rgba(4,6,14,0.20) 0%, rgba(4,6,14,0.05) 40%, rgba(4,6,14,0.60) 100%)',
                  opacity: playing && !hovered ? 0.5 : 1,
                }}
              />

              {/* Status badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-2.5 py-1.5"
                style={{ background: 'rgba(4,6,14,0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,169,110,0.20)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: playing ? '#22c55e' : GOLD, transition: 'background 0.4s' }} />
                <span className="font-lato text-[8px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>
                  {playing ? 'Playing' : 'Villa i Hotel'}
                </span>
              </div>

              {/* Center play/pause */}
              <AnimatePresence>
                {(!playing || hovered) && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full pointer-events-auto"
                      style={{
                        width: 60, height: 60,
                        background: 'rgba(201,169,110,0.15)',
                        backdropFilter: 'blur(14px)',
                        border: '1.5px solid rgba(201,169,110,0.55)',
                        boxShadow: '0 0 0 10px rgba(201,169,110,0.06)',
                      }}
                    >
                      {playing
                        ? <Pause size={20} style={{ color: GOLD }} />
                        : <Play  size={20} style={{ color: GOLD, marginLeft: 2 }} />
                      }
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom controls */}
              <div
                className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-3 pt-8 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(to top, rgba(4,6,14,0.90) 0%, transparent 100%)',
                  opacity: hovered || !playing ? 1 : 0,
                }}
                onClick={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
              >
                {/* Progress bar */}
                <div
                  className="w-full h-0.5 mb-2.5 cursor-pointer relative group/bar"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                  onClick={handleSeek}
                >
                  <div className="h-full" style={{ width: `${progress}%`, background: GOLD }} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={togglePlay}
                      className="flex items-center justify-center w-7 h-7 rounded-full"
                      style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)' }}
                    >
                      {playing
                        ? <Pause size={11} style={{ color: GOLD }} />
                        : <Play  size={11} style={{ color: GOLD, marginLeft: 1 }} />
                      }
                    </button>
                    {duration > 0 && (
                      <span className="font-lato text-[9px]" style={{ color: 'rgba(255,255,255,0.40)' }}>
                        {fmt(current)} / {fmt(duration)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={toggleMute} className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/10 transition-colors">
                      {muted ? <VolumeX size={11} style={{ color: 'rgba(255,255,255,0.40)' }} /> : <Volume2 size={11} style={{ color: GOLD }} />}
                    </button>
                    <button
                      onClick={mobileFs ? exitMobileFs : handleFullscreen}
                      className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/10 transition-colors"
                    >
                      {mobileFs
                        ? <X size={10} style={{ color: GOLD }} />
                        : <Maximize2 size={10} style={{ color: 'rgba(255,255,255,0.40)' }} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 pointer-events-none z-10">
                <div className="w-10 h-px" style={{ background: GOLD, opacity: 0.7 }} />
                <div className="w-px h-10" style={{ background: GOLD, opacity: 0.7 }} />
              </div>
              <div className="absolute bottom-0 right-0 pointer-events-none z-10 flex flex-col items-end">
                <div className="w-px h-10" style={{ background: GOLD, opacity: 0.7 }} />
                <div className="w-10 h-px" style={{ background: GOLD, opacity: 0.7 }} />
              </div>
            </div>

            {/* Decorative offset border behind the video */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full pointer-events-none -z-10"
              style={{ border: '1px solid rgba(201,169,110,0.08)' }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
