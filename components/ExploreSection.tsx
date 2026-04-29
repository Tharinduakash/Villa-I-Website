'use client'

import Link from 'next/link'

const panels = [
  {
    id: 'rooms',
    label: '01',
    title: 'A/C & Non A/C Rooms',
    subtitle: 'Comfort your way',
    description:
      'Choose between cool air-conditioned rooms or naturally breezy spaces designed for a relaxing coastal stay.',
    href: '/rooms',
    image: '/webp/hotel.png',
    cta: 'View Rooms',
    accent: 'rgba(201,169,110,1)',
    tag: 'Flexible Comfort',
  },
  {
    id: 'villa',
    label: '02',
    title: 'Full Villa Booking',
    subtitle: 'Private & exclusive',
    description:
      'Book the entire villa for your family or group — perfect for gatherings, celebrations, and peaceful escapes.',
    href: '/rooms#full-villa',
    image: '/webp/Accommodation One Bedroom.jpg',
    cta: 'Book Villa',
    accent: 'rgba(176,141,87,1)',
    tag: 'Group Friendly',
  },
  {
    id: 'dining',
    label: '03',
    title: 'Dining & Refreshments',
    subtitle: 'Taste of Sri Lanka',
    description:
      'Enjoy home-cooked Sri Lankan meals, fresh fruit juices, and light refreshments in a cozy tropical setting.',
    href: '/services',
    image: '/webp/drinks8.jpg',
    cta: 'Explore Services',
    accent: 'rgba(201,169,110,0.85)',
    tag: 'Fresh & Local',
  },
  {
    id: 'beach',
    label: '04',
    title: 'Beach Experience',
    subtitle: 'Just steps away',
    description:
      'Only 100m from Mount Lavinia beach — wake up to ocean breezes and unwind by the sea any time of day.',
    href: '/about',
    image: '/webp/Anantara Tangalle - Dining By Design 4.jpg',
    cta: 'Discover More',
    accent: 'rgba(176,141,87,0.85)',
    tag: '100m to Ocean',
  },
]

export function ExploreSection() {
  return (
    <>
      <style>{`
        .exp-section {
          background: linear-gradient(160deg, #0a0d1c 0%, #06080f 60%, #080b18 100%);
          padding: 72px 0 0;
          position: relative;
          overflow: hidden;
        }
        .exp-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(176,141,87,0.06) 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0.4;
        }
        .exp-section::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 65% 40% at 50% 0%, rgba(176,141,87,0.07) 0%, transparent 70%);
        }

        /* Grid */
        .exp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative; z-index: 1;
        }
        @media (min-width: 768px) {
          .exp-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* Panel */
        .exp-panel {
          position: relative; overflow: hidden; display: block;
          text-decoration: none; cursor: pointer;
          aspect-ratio: 3 / 4;
          border-top: 1px solid rgba(176,141,87,0.08);
        }
        @media (min-width: 768px) {
          .exp-panel { aspect-ratio: unset; height: clamp(300px, 58vh, 480px); }
        }

        .exp-panel-img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .exp-panel:hover .exp-panel-img { transform: scale(1.08); }

        .exp-panel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(5,7,14,0.90) 0%, rgba(5,7,14,0.38) 50%, rgba(5,7,14,0.10) 100%);
          transition: background 0.4s ease;
        }
        .exp-panel:hover .exp-panel-overlay {
          background: linear-gradient(to top, rgba(5,7,14,0.96) 0%, rgba(5,7,14,0.55) 55%, rgba(5,7,14,0.20) 100%);
        }

        .exp-panel-shimmer {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
          background: linear-gradient(135deg, rgba(176,141,87,0.10) 0%, transparent 55%);
          transition: opacity 0.4s ease;
        }
        .exp-panel:hover .exp-panel-shimmer { opacity: 1; }

        .exp-panel-tint {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .exp-panel:hover .exp-panel-tint { transform: scaleX(1); }

        .exp-panel-bar {
          position: absolute; top: 0; left: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.6) 40%, rgba(201,169,110,0.6) 60%, transparent);
          opacity: 0; transition: opacity 0.35s ease;
        }
        .exp-panel:hover .exp-panel-bar { opacity: 1; }

        .exp-panel-glow {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
          box-shadow: inset 0 0 0 1px rgba(176,141,87,0.35);
          transition: opacity 0.35s ease;
        }
        .exp-panel:hover .exp-panel-glow { opacity: 1; }

        /* Description slide-in on hover (desktop only) */
        .exp-panel-desc {
          max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height 0.4s ease, opacity 0.35s ease, margin-bottom 0.35s ease;
        }
        @media (min-width: 768px) {
          .exp-panel:hover .exp-panel-desc { max-height: 72px; opacity: 1; margin-bottom: 10px; }
        }

        /* CTA arrow nudge on hover */
        .exp-panel:hover .exp-cta-arrow { transform: translateX(3px); }
        .exp-cta-arrow { transition: transform 0.25s ease; }

        /* Vertical dividers */
        @media (min-width: 768px) {
          .exp-panel:not(:last-child)::after {
            content: '';
            position: absolute; top: 0; bottom: 0; right: 0; width: 1px;
            background: rgba(176,141,87,0.08); z-index: 5;
          }
        }

        /* Colour transitions driven by parent hover */
        .exp-panel:hover .exp-subtitle   { color: rgba(201,169,110,0.85); }
        .exp-panel:hover .exp-panel-num  { color: rgba(201,169,110,0.7); }
        .exp-panel:hover .exp-tag        { border-color: rgba(176,141,87,0.55); color: rgba(201,169,110,1); }
        .exp-panel:hover .exp-cta-btn    { background: rgba(201,169,110,1); border-color: rgba(201,169,110,1); color: #0a0906; transform: translateY(-2px); }
      `}</style>

      <section className="exp-section">

        {/* ── Header ── */}
        <div className="relative z-10 text-center px-5 mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block h-px w-8" style={{ background: 'rgba(176,141,87,0.55)' }} />
            <p className="font-lato text-[10px] font-bold tracking-[0.38em] uppercase" style={{ color: 'rgba(176,141,87,0.75)' }}>
              Everything You Need
            </p>
            <span className="block h-px w-8" style={{ background: 'rgba(176,141,87,0.55)' }} />
          </div>

          <h2 className="font-playfair text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.1] text-white/90 mb-3">
            Explore Our <em className="italic" style={{ color: 'rgba(201,169,110,1)' }}>World</em>
          </h2>

          <p className="font-lato text-sm leading-relaxed text-white/40 max-w-md mx-auto">
            From private villa exclusives to beachfront mornings — discover every experience Villa i has to offer.
          </p>
        </div>

        {/* ── Panels grid ── */}
        <div className="exp-grid">
          {panels.map((panel) => (
            <Link key={panel.id} href={panel.href} className="exp-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="exp-panel-img" src={panel.image} alt={panel.title} />
              <div className="exp-panel-overlay" />
              <div className="exp-panel-shimmer" />
              <div className="exp-panel-bar" />
              <div className="exp-panel-glow" />
              <div className="exp-panel-tint" style={{ background: panel.accent }} />

              {/* Tag */}
              <div
                className="exp-tag font-lato absolute top-3 left-3 z-10 text-[10px] font-700 tracking-[0.22em] uppercase px-2.5 py-1 backdrop-blur-sm"
                style={{
                  color: 'rgba(201,169,110,0.85)',
                  background: 'rgba(5,7,14,0.78)',
                  border: '1px solid rgba(176,141,87,0.25)',
                  transition: 'border-color 0.3s, color 0.3s',
                }}
              >
                {panel.tag}
              </div>

              {/* Index number */}
              <div
                className="exp-panel-num font-playfair italic absolute top-3 right-3 z-10 text-xs"
                style={{ color: 'rgba(255,255,255,0.25)', transition: 'color 0.3s' }}
              >
                {panel.label}
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-3 sm:p-5 lg:p-6">
                <p
                  className="exp-subtitle font-lato text-[10px] sm:text-xs font-700 tracking-[0.28em] uppercase mb-1.5"
                  style={{ color: 'rgba(176,141,87,0.55)', transition: 'color 0.3s' }}
                >
                  {panel.subtitle}
                </p>

                <h3
                  className="font-playfair font-bold leading-snug text-white/92 mb-2"
                  style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.3rem)', transition: 'color 0.3s' }}
                >
                  {panel.title}
                </h3>

                <p className="exp-panel-desc font-lato text-[11px] sm:text-xs leading-relaxed text-white/55">
                  {panel.description}
                </p>

                <div
                  className="exp-cta-btn font-lato inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm"
                  style={{
                    color: 'rgba(201,169,110,0.85)',
                    border: '1px solid rgba(176,141,87,0.35)',
                    background: 'rgba(5,7,14,0.65)',
                    transition: 'background 0.3s, border-color 0.3s, color 0.3s, transform 0.2s',
                  }}
                >
                  <span>{panel.cta}</span>
                  <svg
                    className="exp-cta-arrow w-2.5 h-2.5 flex-shrink-0"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </>
  )
}
