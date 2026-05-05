'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────
export interface GalleryPhoto {
  id: string
  title: string
  image: string
  guestName: string
  roomType?: string
  rating?: number
  review?: string
  year?: number
  span?: number
}

const H: Record<number, string> = { 1: '160px', 2: '240px', 3: '320px' }
const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

// ── Desktop masonry card ───────────────────────────────────────────
function PhotoCard({ photo, index }: { photo: GalleryPhoto; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: (index % 12) * 0.04 }}
      className="group cursor-pointer"
      style={{ breakInside: 'avoid', marginBottom: '8px', display: 'inline-block', width: '100%' }}
    >
      <div
        className="relative w-full overflow-hidden transition-all duration-350"
        style={{
          height: H[photo.span ?? 2],
          border: '1px solid rgba(176,141,87,0.10)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.35)',
        }}
      >
        <Image
          src={photo.image}
          alt={photo.title}
          fill
          quality={90}
          sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 20vw"
          className="object-cover object-center transition-transform duration-600 group-hover:scale-105"
        />

        {/* Base gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(5,7,14,0.90) 0%, rgba(5,7,14,0.08) 55%, transparent 100%)' }}
        />

        {/* Gold shimmer on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(176,141,87,0.18) 0%, transparent 55%)' }}
        />

        {/* Left gold accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to bottom, ${GOLD}, rgba(176,141,87,0.3))` }}
        />

        {/* Inner gold border glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(176,141,87,0.35)' }}
        />

        {/* Room type + year top row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {photo.roomType && (
            <span
              className="font-lato text-[8px] tracking-[0.25em] uppercase px-2 py-0.5"
              style={{
                background: 'rgba(5,7,14,0.82)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(176,141,87,0.25)',
                color: GOLD_DIM,
              }}
            >
              {photo.roomType}
            </span>
          )}
          {photo.year && (
            <span
              className="font-lato text-[8px] text-white/40 px-1.5 py-0.5"
              style={{ background: 'rgba(0,0,0,0.45)' }}
            >
              {photo.year}
            </span>
          )}
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-250">
          {/* Stars */}
          {photo.rating && (
            <div className="flex gap-0.5 mb-1">
              {Array.from({ length: photo.rating }).map((_, i) => (
                <span key={i} style={{ color: GOLD, fontSize: '8px' }}>★</span>
              ))}
            </div>
          )}

          <h3
            className="font-playfair text-white text-[11px] leading-tight mb-1 line-clamp-1"
          >
            {photo.title}
          </h3>

          {/* Review snippet */}
          {photo.review && (
            <p
              className="font-lato text-[9px] leading-relaxed line-clamp-1 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: 'rgba(255,255,255,0.55)', fontStyle: 'italic' }}
            >
              "{photo.review}"
            </p>
          )}

          {/* Guest row */}
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="w-4 h-4 flex items-center justify-center text-white flex-shrink-0 font-bold"
              style={{ background: GOLD, fontSize: '7px', color: '#0a0906' }}
            >
              {photo.guestName.charAt(0)}
            </div>
            <span className="font-lato text-[9px] text-white/65 truncate">{photo.guestName}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Mobile horizontal scroll card ─────────────────────────────────
function MobileCard({ photo, index }: { photo: GalleryPhoto; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="hg-mob-card flex-shrink-0"
    >
      <div className="hg-mob-img">
        <Image
          src={photo.image}
          alt={photo.title}
          fill
          quality={90}
          sizes="160px"
          className="object-cover object-center"
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(5,7,14,0.92) 0%, rgba(5,7,14,0.08) 55%, transparent 100%)',
          }}
        />
        {photo.roomType && (
          <span className="hg-mob-tag">{photo.roomType}</span>
        )}
        {photo.rating && (
          <div className="hg-mob-stars">
            {Array.from({ length: photo.rating }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        )}
        <div className="hg-mob-foot">
          <h3 className="hg-mob-title">{photo.title}</h3>
        </div>
      </div>

      {/* Guest info */}
      <div className="hg-mob-meta">
        <div className="hg-mob-avatar">{photo.guestName.charAt(0)}</div>
        <div className="hg-mob-metainfo">
          <span className="hg-mob-guest">{photo.guestName}</span>
          {photo.review && (
            <span className="hg-mob-review">"{photo.review.slice(0, 40)}…"</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Main section ───────────────────────────────────────────────────
export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])

  useEffect(() => {
    fetch('/api/gallery/reviews?approved=true')
      .then((r) => r.json())
      .then((data) => setPhotos(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  const preview = photos.slice(0, 12)

  return (
    <section
      id="gallery"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0d1c 0%, #06080f 60%, #080b18 100%)' }}
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(176,141,87,0.07) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      {/* Gold ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 40% at 50% 60%, rgba(176,141,87,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 px-6 lg:px-10"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block h-px w-8" style={{ background: GOLD_DIM }} />
              <p className="font-lato text-[10px] tracking-[0.4em] uppercase" style={{ color: GOLD_DIM }}>
                Guest Memories
              </p>
            </div>
            <h2
              className="font-playfair text-white leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              Life at{' '}
              <Image
                src="/webp/villa_logo_transparent.png"
                alt="Villa i"
                width={220}
                height={80}
                className="object-contain inline-block w-36 md:w-44 lg:w-50"
                style={{ verticalAlign: 'middle' }}
              />
            </h2>
            <div
              className="h-px w-14 mt-3"
              style={{ background: `linear-gradient(to right, ${GOLD}, rgba(176,141,87,0.2))` }}
            />
            <p
              className="font-lato text-sm mt-3 max-w-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              Real moments captured by our guests — from sunrise balconies to beach evenings.
            </p>
          </div>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:block shrink-0"
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 font-lato text-xs tracking-[0.25em] uppercase transition-all duration-300"
              style={{ color: GOLD }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = '16px')}
              onMouseLeave={(e) => (e.currentTarget.style.gap = '12px')}
            >
              View All Photos
              <span
                className="flex items-center justify-center w-9 h-9 transition-all duration-300 group-hover:bg-luxury-gold"
                style={{ border: `1px solid rgba(176,141,87,0.4)` }}
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Mobile: horizontal scroll ── */}
        <div className="hg-mob-wrap sm:hidden">
          <div className="hg-mob-fade-l" />
          <div className="hg-mob-fade-r" />
          <div className="hg-mob-track">
            {photos.map((photo, i) => (
              <MobileCard key={photo.id} photo={photo} index={i} />
            ))}
            {/* View all card */}
            <Link href="/gallery" className="hg-mob-viewall flex-shrink-0">
              <div className="hg-mob-viewall-inner">
                <div className="hg-mob-viewall-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="hg-mob-viewall-text">View<br />All</p>
                <p className="hg-mob-viewall-count">{photos.length}+ photos</p>
              </div>
            </Link>
          </div>
        </div>

        {/* ── Desktop: masonry ── */}
        <div
          className="hg-masonry hidden sm:block px-6 lg:px-10"
          style={{ columnGap: '8px' }}
        >
          {preview.map((photo: GalleryPhoto, i: number) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8 sm:hidden px-6"
        >
          <Link
            href="/gallery"
            className="group font-lato text-xs tracking-[0.25em] uppercase"
            style={{ color: GOLD }}
          >
            View All Photos
            <span
              className="block h-px w-0 mt-1.5 transition-all duration-300 group-hover:w-full"
              style={{ background: GOLD }}
            />
          </Link>
        </motion.div>

        <p
          className="font-lato text-center mt-8 px-6"
          style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}
        >
          Showing {preview.length} of {photos.length}+ guest moments
        </p>
      </div>

      <style>{`
        .hg-masonry { columns: 2; }
        @media (min-width: 640px)  { .hg-masonry { columns: 4; } }
        @media (min-width: 1024px) { .hg-masonry { columns: 5; } }
        @media (min-width: 1280px) { .hg-masonry { columns: 6; } }

        .hg-mob-wrap { position: relative; width: 100%; }
        .hg-mob-fade-l, .hg-mob-fade-r {
          position: absolute; top: 0; bottom: 0; width: 24px; z-index: 2; pointer-events: none;
        }
        .hg-mob-fade-l { left: 0;  background: linear-gradient(to right, #080b18, transparent); }
        .hg-mob-fade-r { right: 0; background: linear-gradient(to left, #080b18, transparent); }

        .hg-mob-track {
          display: flex; gap: 10px;
          overflow-x: auto; overflow-y: hidden;
          padding: 4px 20px 16px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .hg-mob-track::-webkit-scrollbar { display: none; }

        .hg-mob-card { scroll-snap-align: start; width: 148px; cursor: pointer; }

        .hg-mob-img {
          position: relative; width: 148px; height: 200px;
          overflow: hidden; background: #080a1c;
          border: 1px solid rgba(176,141,87,0.15);
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .hg-mob-tag {
          position: absolute; top: 8px; left: 8px;
          font-family: var(--font-lato, sans-serif);
          font-size: 7px; letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(201,169,110,0.75);
          background: rgba(5,7,14,0.85);
          padding: 2px 6px;
          border: 1px solid rgba(176,141,87,0.2);
          z-index: 2;
        }

        .hg-mob-stars {
          position: absolute; top: 8px; right: 8px;
          font-size: 8px; color: rgba(201,169,110,0.9);
          z-index: 2; letter-spacing: 1px;
        }

        .hg-mob-foot {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 8px 10px; z-index: 2;
        }
        .hg-mob-title {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: 11px; font-weight: 700; color: #fff; line-height: 1.3;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        .hg-mob-meta {
          display: flex; align-items: flex-start; gap: 7px;
          margin-top: 8px; padding: 0 2px;
        }
        .hg-mob-avatar {
          width: 22px; height: 22px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(201,169,110,1); color: #0a0906;
          font-size: 9px; font-weight: 700;
          font-family: var(--font-lato, sans-serif);
        }
        .hg-mob-metainfo { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .hg-mob-guest {
          font-family: var(--font-lato, sans-serif);
          font-size: 10px; font-weight: 600;
          color: rgba(255,255,255,0.65);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .hg-mob-review {
          font-family: var(--font-lato, sans-serif);
          font-size: 8px; color: rgba(255,255,255,0.28); font-style: italic;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .hg-mob-viewall {
          scroll-snap-align: start; width: 110px; height: 200px;
          border: 1px dashed rgba(176,141,87,0.30);
          background: rgba(8,10,22,0.9);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: border-color 0.2s, background 0.2s;
        }
        .hg-mob-viewall:active { background: rgba(176,141,87,0.08); border-color: rgba(176,141,87,0.6); }
        .hg-mob-viewall-inner { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .hg-mob-viewall-icon {
          width: 38px; height: 38px;
          border: 1px solid rgba(176,141,87,0.45);
          display: flex; align-items: center; justify-content: center;
          color: rgba(201,169,110,0.9);
        }
        .hg-mob-viewall-text {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: 13px; font-weight: 700;
          color: rgba(201,169,110,0.9); text-align: center; line-height: 1.2;
        }
        .hg-mob-viewall-count {
          font-family: var(--font-lato, sans-serif);
          font-size: 8px; color: rgba(255,255,255,0.25); text-align: center; letter-spacing: 0.05em;
        }
      `}</style>
    </section>
  )
}