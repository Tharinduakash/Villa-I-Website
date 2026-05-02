'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'
import RoomCard from '@/components/RoomCard'
import AnimatedSection from '@/components/AnimatedSection'

interface Room {
  id: string
  name: string
  shortName: string
  description: string
  features: string[]
  priceUSD: number
  price: string
  image: string
  capacity: string
  size: string
}

export default function RoomsPreview({ rooms }: { rooms: Room[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Hide swipe hint after first interaction
  useEffect(() => {
    if (!isMobile) return
    const el = scrollRef.current
    if (!el) return
    const hide = () => setShowHint(false)
    el.addEventListener('scroll', hide, { once: true })
    el.addEventListener('touchstart', hide, { once: true })
    return () => { el.removeEventListener('scroll', hide); el.removeEventListener('touchstart', hide) }
  }, [isMobile])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cardW = el.clientWidth * 0.82 + 16
    setActiveIdx(Math.round(el.scrollLeft / cardW))
  }

  const scrollTo = (i: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardW = el.clientWidth * 0.82 + 16
    el.scrollTo({ left: i * cardW, behavior: 'smooth' })
    setActiveIdx(i)
  }

  return (
    <section className="section-padding section-gradient-a">
      <div className="container-padding">
        <AnimatedSection className="text-center mb-14">
          <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">Accommodation</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Our <span className="italic text-luxury-gold">Rooms</span>
          </h2>
          <p className="text-white/50 font-lato text-base max-w-xl mx-auto">
            From intimate rooms to full villa exclusives. Every space crafted for your perfect stay.
          </p>
        </AnimatedSection>

        {/* ── Mobile: horizontal snap carousel ─────────────────────── */}
        <div className="relative sm:hidden">
          {/* Swipe hint — fades out after first touch */}
          {showHint && (
            <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none flex items-center justify-end pr-2"
              style={{ background: 'linear-gradient(to right, transparent, rgba(6,8,15,0.85))' }}>
              <div className="swipe-hint flex flex-col items-center gap-1">
                <span style={{ color: 'rgba(201,169,110,0.7)', fontSize: 18 }}>›</span>
                <span className="font-lato text-[8px] tracking-widest uppercase" style={{ color: 'rgba(201,169,110,0.5)', writingMode: 'vertical-rl' }}>swipe</span>
              </div>
            </div>
          )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch' as never,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              margin: '0 -24px',
              padding: '0 24px',
            }}
          >
            {rooms.map((room, i) => (
              <div
                key={room.id}
                style={{
                  flex: '0 0 82vw',
                  scrollSnapAlign: 'center',
                }}
              >
                <RoomCard room={room} index={i} />
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {rooms.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Room ${i + 1}`}
                style={{
                  width: i === activeIdx ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === activeIdx ? 'rgba(201,169,110,1)' : 'rgba(255,255,255,0.18)',
                  border: 'none',
                  padding: 0,
                  transition: 'width 0.35s cubic-bezier(.4,0,.2,1), background 0.3s',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Tablet / Desktop: standard grid ─────────────────────── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>

        <AnimatedSection className="text-center mt-12" delay={0.3}>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 border border-luxury-gold/40 text-luxury-gold px-8 py-3 font-lato text-xs tracking-[0.2em] uppercase hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
          >
            View All Rooms <HiArrowRight />
          </Link>
        </AnimatedSection>
      </div>

      <style>{`
        .swipe-hint { animation: swipeHint 1.6s ease-in-out infinite; }
        @keyframes swipeHint {
          0%, 100% { transform: translateX(0); opacity: 0.7; }
          50%       { transform: translateX(5px); opacity: 1; }
        }
        div[style*="scrollbarWidth"]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
