'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { GALLERY_PHOTOS, GalleryPhoto } from '@/components/Gallery'

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

const ROOM_TYPES = ['All', 'A/C Room', 'Non A/C Room', 'Family Room', 'Full Villa']
const YEARS      = ['All', '2025', '2024']
const PAGE_SIZE  = 12

const H: Record<number, string> = { 1: '160px', 2: '240px', 3: '320px' }

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="font-lato text-[9px] tracking-[0.2em] uppercase px-3.5 py-2 transition-all duration-250 whitespace-nowrap"
      style={
        active
          ? { background: GOLD, color: '#0a0906', border: `1px solid ${GOLD}` }
          : { background: 'transparent', color: 'rgba(255,255,255,0.38)', border: '1px solid rgba(176,141,87,0.20)' }
      }
      onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = 'rgba(176,141,87,0.55)'; e.currentTarget.style.color = 'rgba(201,169,110,0.8)' } }}
      onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = 'rgba(176,141,87,0.20)'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)' } }}
    >
      {label}
    </button>
  )
}

function PhotoCard({ photo, index }: { photo: GalleryPhoto; index: number }) {
  return (
    <div
      className="group cursor-pointer"
      style={{
        breakInside: 'avoid', marginBottom: '8px',
        display: 'inline-block', width: '100%',
        animationDelay: `${(index % PAGE_SIZE) * 40}ms`,
        animation: 'hgFadeUp 0.45s ease both',
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: H[photo.span ?? 2],
          border: '1px solid rgba(176,141,87,0.10)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(176,141,87,0.45)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(0,0,0,0.65)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(176,141,87,0.10)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)' }}
      >
        <Image
          src={photo.image} alt={photo.title} fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 17vw"
          className="object-cover object-center transition-transform duration-600 group-hover:scale-105"
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(5,7,14,0.92) 0%, rgba(5,7,14,0.08) 55%, transparent 100%)' }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(176,141,87,0.16) 0%, transparent 55%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to bottom, ${GOLD}, rgba(176,141,87,0.25))` }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(176,141,87,0.30)' }} />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          {photo.roomType && (
            <span className="font-lato text-[8px] tracking-[0.22em] uppercase px-2 py-0.5" style={{ background: 'rgba(5,7,14,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(176,141,87,0.22)', color: GOLD_DIM }}>
              {photo.roomType}
            </span>
          )}
          {photo.year && (
            <span className="font-lato text-[8px] text-white/35 px-1.5 py-0.5 flex-shrink-0" style={{ background: 'rgba(0,0,0,0.50)' }}>
              {photo.year}
            </span>
          )}
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-250">
          {photo.rating && (
            <div className="flex gap-0.5 mb-1">
              {Array.from({ length: photo.rating }).map((_, i) => (
                <span key={i} style={{ color: GOLD, fontSize: '8px' }}>★</span>
              ))}
            </div>
          )}
          <h3 className="font-playfair text-white text-[11px] leading-snug mb-1 line-clamp-1">{photo.title}</h3>
          {photo.review && (
            <p className="font-lato text-[9px] leading-relaxed italic line-clamp-1 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'rgba(255,255,255,0.50)' }}>
              "{photo.review}"
            </p>
          )}
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-4 h-4 flex items-center justify-center font-bold flex-shrink-0" style={{ background: GOLD, color: '#0a0906', fontSize: '7px' }}>
              {photo.guestName.charAt(0)}
            </div>
            <span className="font-lato text-[9px] text-white/60 truncate">{photo.guestName}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [roomType, setRoomType] = useState('All')
  const [year,     setYear]     = useState('All')
  const [search,   setSearch]   = useState('')
  const [page,     setPage]     = useState(1)
  const [focused,  setFocused]  = useState(false)

  const filtered = useMemo(() =>
    GALLERY_PHOTOS.filter((p) => {
      const rOk = roomType === 'All' || p.roomType === roomType
      const yOk = year     === 'All' || String(p.year) === year
      const sOk = !search  ||
        p.title.toLowerCase().includes(search.toLowerCase())     ||
        p.guestName.toLowerCase().includes(search.toLowerCase()) ||
        (p.roomType ?? '').toLowerCase().includes(search.toLowerCase())
      return rOk && yOk && sOk
    }), [roomType, year, search])

  const paginated  = filtered.slice(0, page * PAGE_SIZE)
  const hasMore    = paginated.length < filtered.length
  const isFiltered = roomType !== 'All' || year !== 'All' || search !== ''
  const reset      = () => { setRoomType('All'); setYear('All'); setSearch(''); setPage(1) }

  return (
    <>
      <style>{`
        @keyframes hgFadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        .hgp-masonry { columns: 3; column-gap: 8px; }
        @media (min-width:640px)  { .hgp-masonry { columns: 4; } }
        @media (min-width:1024px) { .hgp-masonry { columns: 5; } }
        @media (min-width:1280px) { .hgp-masonry { columns: 6; } }
        .hgp-noscroll::-webkit-scrollbar { display: none; }
        .hgp-noscroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0a0d1c 0%, #06080f 60%, #080b18 100%)' }}>

        {/* Dot texture */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-25"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(176,141,87,0.07) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        {/* ── Hero ── */}
        <div className="relative z-10 pt-32 pb-14 px-6 lg:px-10 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(176,141,87,0.09) 0%, transparent 70%)' }} />

          <div className="relative max-w-7xl mx-auto">
            <Link href="/"
              className="inline-flex items-center gap-2 font-lato text-xs tracking-[0.2em] uppercase mb-10 transition-colors duration-200 group"
              style={{ color: 'rgba(255,255,255,0.28)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
              Back to Home
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="block h-px w-8" style={{ background: GOLD_DIM }} />
                  <p className="font-lato text-[10px] tracking-[0.4em] uppercase" style={{ color: GOLD_DIM }}>Guest Memories</p>
                </div>
                <h1 className="font-playfair text-white leading-none" style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5rem)' }}>
                  VILLA i,
                  <br />
                  <span className="italic" style={{ color: GOLD }}>Your Moments.</span>
                </h1>
                <div className="h-px w-14 mt-4" style={{ background: `linear-gradient(to right, ${GOLD}, rgba(176,141,87,0.2))` }} />
                <p className="font-lato text-sm mt-4 max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Real photos shared by our guests — capturing the warmth, beauty, and charm of Villa i Hotel.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-10 shrink-0">
                {[
                  { n: `${GALLERY_PHOTOS.length}+`, l: 'Photos' },
                  { n: '4', l: 'Room Types' },
                  { n: '4.9★', l: 'Avg Rating' },
                ].map(({ n, l }) => (
                  <div key={l} className="group flex flex-col gap-1 cursor-default">
                    <span className="font-playfair text-2xl md:text-3xl group-hover:text-luxury-gold transition-colors duration-300" style={{ color: GOLD }}>{n}</span>
                    <span className="font-lato text-[9px] tracking-[0.22em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky filters ── */}
        <div className="sticky top-0 z-30 border-b"
          style={{ background: 'rgba(6,8,15,0.94)', backdropFilter: 'blur(20px)', borderColor: 'rgba(176,141,87,0.12)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex flex-col sm:flex-row gap-3 sm:items-center">
            {/* Search */}
            <div className="relative flex-shrink-0 sm:w-56">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: GOLD_DIM }}>⌕</span>
              <input
                type="text" placeholder="Search guest or room…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full pl-8 pr-4 py-2 font-lato text-xs text-white placeholder-white/20 outline-none transition-all duration-250"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${focused ? 'rgba(176,141,87,0.50)' : 'rgba(176,141,87,0.15)'}`,
                  boxShadow: focused ? '0 0 0 3px rgba(176,141,87,0.06)' : 'none',
                }}
              />
            </div>
            {/* Room type filters */}
            <div className="flex gap-2 hgp-noscroll overflow-x-auto shrink-0">
              {ROOM_TYPES.map((r) => (
                <Pill key={r} label={r} active={roomType === r} onClick={() => { setRoomType(r); setPage(1) }} />
              ))}
            </div>
            {/* Year filters */}
            <div className="flex gap-2 hgp-noscroll overflow-x-auto shrink-0 sm:ml-auto">
              {YEARS.map((y) => (
                <Pill key={y} label={y} active={year === y} onClick={() => { setYear(y); setPage(1) }} />
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-5 pb-2 flex items-center justify-between">
          <p className="font-lato" style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase' }}>
            Showing {Math.min(paginated.length, filtered.length)} of {filtered.length} photos
          </p>
          {isFiltered && (
            <button onClick={reset} className="font-lato transition-colors duration-200"
              style={{ fontSize: '9px', letterSpacing: '0.3em', color: GOLD_DIM, textTransform: 'uppercase' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = GOLD_DIM)}
            >
              CLEAR ×
            </button>
          )}
        </div>

        {/* ── Masonry ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-playfair text-3xl mb-4" style={{ color: 'rgba(176,141,87,0.3)' }}>No photos found</p>
              <p className="font-lato text-sm mb-6" style={{ color: 'rgba(255,255,255,0.25)' }}>Try adjusting your filters</p>
              <button onClick={reset} className="font-lato text-xs tracking-[0.2em] uppercase" style={{ color: GOLD }}>Clear Filters</button>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${roomType}-${year}-${search}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                  className="hgp-masonry"
                >
                  {paginated.map((photo, i) => <PhotoCard key={photo.id} photo={photo} index={i} />)}
                </motion.div>
              </AnimatePresence>

              {hasMore && (
                <div className="mt-12 flex flex-col items-center gap-3">
                  <p className="font-lato" style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.20)', textTransform: 'uppercase' }}>
                    {filtered.length - paginated.length} more photos
                  </p>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="group font-lato text-xs tracking-[0.25em] uppercase px-10 py-3.5 transition-all duration-300"
                    style={{ border: '1px solid rgba(176,141,87,0.35)', color: GOLD }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = '#0a0906' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GOLD }}
                  >
                    Load More <span className="group-hover:rotate-90 inline-block transition-transform duration-300 ml-1">+</span>
                  </button>
                </div>
              )}

              {!hasMore && filtered.length > 0 && (
                <p className="text-center mt-12 font-lato"
                  style={{ fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>
                  ✦ All {filtered.length} photos loaded ✦
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}