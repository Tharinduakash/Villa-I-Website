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
    image: '/webp/room1.jpg',
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
    image: '/webp/resturant.webp',
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
    image: '/webp/beach-girl.jpg',
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
          font-family: var(--font-lato, sans-serif);
        }

        /* Dot texture */
        .exp-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(176,141,87,0.06) 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0.4;
        }

        /* Ambient glow */
        .exp-section::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 65% 40% at 50% 0%, rgba(176,141,87,0.07) 0%, transparent 70%);
        }

        /* ── Header ── */
        .exp-header {
          text-align: center;
          padding: 0 20px;
          margin-bottom: 40px;
          position: relative; z-index: 1;
        }
        .exp-eyebrow {
          display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 14px;
        }
        .exp-eyebrow-line {
          height: 1px; width: 32px;
          background: rgba(176,141,87,0.55);
        }
        .exp-eyebrow-text {
          font-size: 10px; font-weight: 600; letter-spacing: 0.38em; text-transform: uppercase;
          color: rgba(176,141,87,0.75);
        }
        .exp-title {
          font-family: var(--font-playfair, 'Georgia', serif);
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700; color: rgba(255,255,255,0.92); margin: 0 0 10px; line-height: 1.1;
        }
        .exp-title em {
          font-style: italic;
          color: rgba(201,169,110,1);
        }
        .exp-tagline {
          font-size: 14px; color: rgba(255,255,255,0.38);
          max-width: 420px; margin: 0 auto; line-height: 1.7;
        }

        /* ── Grid ── */
        .exp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative; z-index: 1;
        }
        @media (min-width: 768px) {
          .exp-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── Panel ── */
        .exp-panel {
          position: relative;
          overflow: hidden;
          display: block;
          text-decoration: none;
          cursor: pointer;
          aspect-ratio: 3 / 4;
          border-top: 1px solid rgba(176,141,87,0.08);
        }
        @media (min-width: 768px) {
          .exp-panel {
            aspect-ratio: unset;
            height: clamp(300px, 58vh, 480px);
          }
        }

        .exp-panel-img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .exp-panel:hover .exp-panel-img { transform: scale(1.08); }

        /* Dark base overlay */
        .exp-panel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(5,7,14,0.90) 0%, rgba(5,7,14,0.38) 50%, rgba(5,7,14,0.10) 100%);
          transition: background 0.4s ease;
        }
        .exp-panel:hover .exp-panel-overlay {
          background: linear-gradient(to top, rgba(5,7,14,0.96) 0%, rgba(5,7,14,0.55) 55%, rgba(5,7,14,0.20) 100%);
        }

        /* Gold shimmer on hover */
        .exp-panel-shimmer {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
          background: linear-gradient(135deg, rgba(176,141,87,0.10) 0%, transparent 55%);
          transition: opacity 0.4s ease;
        }
        .exp-panel:hover .exp-panel-shimmer { opacity: 1; }

        /* Gold bottom accent line */
        .exp-panel-tint {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .exp-panel:hover .exp-panel-tint { transform: scaleX(1); }

        /* Left gold accent bar */
        .exp-panel-bar {
          position: absolute; top: 0; left: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.6) 40%, rgba(201,169,110,0.6) 60%, transparent);
          opacity: 0; transition: opacity 0.35s ease;
        }
        .exp-panel:hover .exp-panel-bar { opacity: 1; }

        /* Inner border glow */
        .exp-panel-glow {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
          box-shadow: inset 0 0 0 1px rgba(176,141,87,0.35);
          transition: opacity 0.35s ease;
        }
        .exp-panel:hover .exp-panel-glow { opacity: 1; }

        /* Number */
        .exp-panel-num {
          position: absolute; top: 12px; right: 12px;
          font-family: var(--font-playfair, Georgia, serif);
          font-size: 11px; font-style: italic;
          color: rgba(255,255,255,0.25); transition: color 0.3s;
          z-index: 2;
        }
        .exp-panel:hover .exp-panel-num { color: rgba(201,169,110,0.7); }

        /* Tag chip */
        .exp-panel-tag {
          position: absolute; top: 12px; left: 12px;
          font-size: 8px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
          padding: 3px 9px;
          color: rgba(201,169,110,0.85);
          background: rgba(5,7,14,0.78);
          border: 1px solid rgba(176,141,87,0.25);
          backdrop-filter: blur(8px);
          transition: border-color 0.3s, color 0.3s;
          z-index: 2;
        }
        @media (min-width: 640px) { .exp-panel-tag { font-size: 9px; } }
        .exp-panel:hover .exp-panel-tag {
          border-color: rgba(176,141,87,0.55);
          color: rgba(201,169,110,1);
        }

        /* Content */
        .exp-panel-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 14px 12px;
          z-index: 2;
        }
        @media (min-width: 640px) { .exp-panel-content { padding: 20px 16px; } }
        @media (min-width: 1024px) { .exp-panel-content { padding: 26px 22px; } }

        .exp-panel-subtitle {
          font-size: 8px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(176,141,87,0.55); margin-bottom: 4px; transition: color 0.3s;
        }
        @media (min-width: 640px) { .exp-panel-subtitle { font-size: 9px; } }
        .exp-panel:hover .exp-panel-subtitle { color: rgba(201,169,110,0.85); }

        .exp-panel-title {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: clamp(0.9rem, 1.8vw, 1.35rem);
          font-weight: 700; color: rgba(255,255,255,0.92); margin: 0 0 8px; line-height: 1.2;
          transition: color 0.3s;
        }
        .exp-panel:hover .exp-panel-title { color: rgba(255,255,255,1); }

        /* Description — slides in on hover (desktop only) */
        .exp-panel-desc {
          font-size: 11px; color: rgba(255,255,255,0.55); line-height: 1.6;
          margin: 0; max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height 0.4s ease, opacity 0.35s ease, margin-bottom 0.35s ease;
        }
        @media (min-width: 768px) {
          .exp-panel:hover .exp-panel-desc { max-height: 60px; opacity: 1; margin-bottom: 10px; }
        }

        /* CTA button */
        .exp-panel-cta {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 13px;
          font-size: 9px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(201,169,110,0.85);
          border: 1px solid rgba(176,141,87,0.35);
          background: rgba(5,7,14,0.65);
          backdrop-filter: blur(8px);
          align-self: flex-start;
          transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.2s;
          white-space: nowrap;
        }
        @media (min-width: 640px) { .exp-panel-cta { font-size: 10px; padding: 7px 15px; } }
        @media (min-width: 1024px) { .exp-panel-cta { font-size: 11px; padding: 8px 18px; } }
        .exp-panel:hover .exp-panel-cta {
          background: rgba(201,169,110,1);
          border-color: rgba(201,169,110,1);
          color: #0a0906;
          transform: translateY(-2px);
        }
        .exp-panel-cta svg {
          width: 11px; height: 11px; flex-shrink: 0; transition: transform 0.25s ease;
        }
        .exp-panel:hover .exp-panel-cta svg { transform: translateX(3px); }

        /* Vertical dividers between panels */
        @media (min-width: 768px) {
          .exp-panel:not(:last-child)::after {
            content: '';
            position: absolute; top: 0; bottom: 0; right: 0; width: 1px;
            background: rgba(176,141,87,0.08); z-index: 5;
          }
        }
      `}</style>

      <section className="exp-section">

        {/* ── Header ── */}
        <div className="exp-header">
          <div className="exp-eyebrow">
            <span className="exp-eyebrow-line" />
            <span className="exp-eyebrow-text">Everything You Need</span>
            <span className="exp-eyebrow-line" />
          </div>
          <h2 className="exp-title">
            Explore Our <em>World</em>
          </h2>
          <p className="exp-tagline">
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
              <div className="exp-panel-tag">{panel.tag}</div>
              <div className="exp-panel-num">{panel.label}</div>
              <div className="exp-panel-content">
                <div className="exp-panel-subtitle">{panel.subtitle}</div>
                <h3 className="exp-panel-title">{panel.title}</h3>
                <p className="exp-panel-desc">{panel.description}</p>
                <div className="exp-panel-cta">
                  <span>{panel.cta}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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