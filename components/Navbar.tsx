'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import Image from 'next/image'

const navLinks = [
  { href: '/',          label: 'Home'     },
  { href: '/about',     label: 'About'    },
  { href: '/rooms',     label: 'Rooms'    },
  { href: '/services',  label: 'Services' },
  { href: '/contact',   label: 'Contact'  },
]

// Mobile mega-menu columns — mirrors Travel Buddies structure
const megaColumns = [
  {
    title: 'Accommodation',
    links: [
      { href: '/rooms#ac-room',     label: 'A/C Rooms'            },
      { href: '/rooms#non-ac-room', label: 'Garden View Rooms'    },
      { href: '/rooms#family-room', label: 'Family Suites'        },
      { href: '/rooms#full-villa',  label: 'Full Villa Exclusive' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { href: '/services',  label: 'Dining & Cuisine' },
      { href: '/services',  label: 'Beach Access'     },
      { href: '/gallery',   label: 'Photo Gallery'    },
      { href: '/about',     label: 'Our Story'        },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { href: '/',        label: 'Home'    },
      { href: '/about',   label: 'About'   },
      { href: '/rooms',   label: 'Rooms'   },
      { href: '/contact', label: 'Contact' },
    ],
  },
]

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open — same as Travel Buddies
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <style>{`
        /* ── Mobile mega overlay — mirrors Travel Buddies .tb-mega-overlay ── */
        .vi-mega-overlay {
          position: fixed; inset: 0; z-index: 1000;
          display: flex; flex-direction: column; overflow: hidden;
          background: rgba(6,8,15,0.99);
          opacity: 0; visibility: hidden;
          transition: opacity 0.38s ease, visibility 0.38s;
        }
        .vi-mega-overlay.open { opacity: 1; visibility: visible; }

        /* Top bar — logo + close */
        .vi-mega-topbar {
          flex-shrink: 0; display: flex; align-items: center; justify-content: space-between;
          padding: 0 20px; height: 64px;
          background: rgba(6,8,15,1);
          border-bottom: 1px solid rgba(176,141,87,0.15);
        }

        /* Gold gradient top border on mega */
        .vi-mega-topborder {
          height: 2px; flex-shrink: 0;
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.7) 30%, rgba(201,169,110,1) 50%, rgba(201,169,110,0.7) 70%, transparent);
        }

        .vi-mega-close {
          flex-shrink: 0; width: 40px; height: 40px;
          border: 1px solid rgba(176,141,87,0.25);
          background: transparent; color: rgba(255,255,255,0.6);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
        }
        .vi-mega-close:hover {
          border-color: rgba(201,169,110,0.7);
          color: rgba(201,169,110,1);
          background: rgba(176,141,87,0.06);
        }

        /* Scrollable body */
        .vi-mega-body { flex: 1; overflow-y: auto; }
        .vi-mega-inner { max-width: 1300px; margin: 0 auto; padding: 32px 24px 80px; }

        /* 3-column grid — matches .tb-mega-grid */
        .vi-mega-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px 20px;
        }
        @media (min-width: 640px)  { .vi-mega-grid { grid-template-columns: repeat(3, 1fr); gap: 40px 28px; } }

        /* Column title — matches .tb-mega-col-title */
        .vi-mega-col-title {
          font-family: var(--font-lato, sans-serif);
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(201,169,110,0.75);
          padding-bottom: 12px; margin-bottom: 14px;
          border-bottom: 1px solid rgba(176,141,87,0.15);
          position: relative;
        }
        .vi-mega-col-title::after {
          content: ''; position: absolute; bottom: -1px; left: 0;
          width: 28px; height: 1px;
          background: rgba(201,169,110,0.9);
        }

        /* Column item — matches .tb-mega-col-item */
        .vi-mega-col-item {
          display: block;
          padding: 8px 0;
          font-family: var(--font-lato, sans-serif);
          font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,0.48);
          text-decoration: none; letter-spacing: 0.04em;
          border-bottom: 1px solid rgba(176,141,87,0.06);
          transition: all 0.18s ease;
          background: none; border-left: none; border-right: none; border-top: none;
          width: 100%; text-align: left; cursor: pointer;
        }
        .vi-mega-col-item:last-child { border-bottom: none; }
        .vi-mega-col-item:hover { color: rgba(201,169,110,1); padding-left: 6px; }

        /* Bottom CTA row */
        .vi-mega-cta {
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid rgba(176,141,87,0.10);
          display: flex; flex-direction: column; gap: 12px;
        }

        /* Location tag */
        .vi-mega-location {
          display: flex; align-items: center; gap: 10px; margin-bottom: 4px;
        }
        .vi-mega-location-line {
          display: block; height: 1px; width: 28px;
          background: rgba(176,141,87,0.4);
        }
        .vi-mega-location-text {
          font-family: var(--font-lato, sans-serif);
          font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(255,255,255,0.22);
        }

        .vi-mega-cta-primary {
          display: block; width: 100%; padding: 14px 0; text-align: center;
          background: rgba(201,169,110,1); color: #0a0906;
          font-family: var(--font-lato, sans-serif);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer;
          transition: background 0.25s ease;
        }
        .vi-mega-cta-primary:hover { background: #e8d5b0; }

        .vi-mega-cta-secondary {
          display: block; width: 100%; padding: 13px 0; text-align: center;
          background: transparent; color: rgba(255,255,255,0.55);
          font-family: var(--font-lato, sans-serif);
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.12);
          transition: all 0.25s ease;
        }
        .vi-mega-cta-secondary:hover {
          border-color: rgba(176,141,87,0.45);
          color: rgba(201,169,110,1);
        }
      `}</style>

      {/* ── Mobile Mega Overlay ── */}
      <div className={`vi-mega-overlay ${mobileOpen ? 'open' : ''}`}>

        {/* Gold top border */}
        <div className="vi-mega-topborder" />

        {/* Top bar */}
        <div className="vi-mega-topbar">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/webp/villa_logo_transparent.png"
              alt="Villa i"
              width={110}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          <button
            className="vi-mega-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="vi-mega-body">
          <div className="vi-mega-inner">

            {/* 3-column mega grid */}
            <div className="vi-mega-grid">
              {megaColumns.map((col, ci) => (
                <div key={col.title}>
                  <div className="vi-mega-col-title">{col.title}</div>
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="vi-mega-col-item"
                      onClick={() => setMobileOpen(false)}
                      style={pathname === link.href ? { color: 'rgba(201,169,110,1)' } : {}}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="vi-mega-cta">
              <div className="vi-mega-location">
                <span className="vi-mega-location-line" />
                <span className="vi-mega-location-text">Mount Lavinia, Sri Lanka</span>
              </div>

              <Link
                href="/contact"
                className="vi-mega-cta-primary"
                onClick={() => setMobileOpen(false)}
              >
                Reserve Your Stay
              </Link>
              <Link
                href="/rooms"
                className="vi-mega-cta-secondary"
                onClick={() => setMobileOpen(false)}
              >
                Explore Rooms
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── Desktop Navbar ── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-luxury-black/95 backdrop-blur-md border-b border-luxury-gold/20 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/webp/villa_logo_transparent.png"
                alt="Villa i"
                width={110}
                height={40}
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs font-lato tracking-[0.2em] uppercase transition-colors duration-300 group ${
                    pathname === link.href
                      ? 'text-luxury-gold'
                      : 'text-white/80 hover:text-luxury-gold'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-luxury-gold transition-all duration-300 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Book Now */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="px-7 py-2.5 border border-luxury-gold text-luxury-gold text-xs tracking-[0.2em] uppercase font-lato hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile burger — styled like Travel Buddies .tb-burger-btn */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 transition-all duration-250"
              style={{
                border: '1px solid rgba(255,255,255,0.32)',
                background: 'rgba(0,0,0,0.18)',
                color: 'rgba(255,255,255,0.88)',
              }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(176,141,87,0.55)'
                e.currentTarget.style.color = 'rgba(201,169,110,1)'
                e.currentTarget.style.background = 'rgba(176,141,87,0.10)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.88)'
                e.currentTarget.style.background = 'rgba(0,0,0,0.18)'
              }}
            >
              <HiMenu size={17} />
            </button>

          </div>
        </div>
      </motion.nav>
    </>
  )
}