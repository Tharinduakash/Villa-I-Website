'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import Image from 'next/image'

const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/about',    label: 'About'    },
  { href: '/rooms',    label: 'Rooms'    },
  { href: '/services', label: 'Services' },
  { href: '/contact',  label: 'Contact'  },
]

const megaColumns = [
  {
    title: 'Accommodation',
    links: [
      { href: '/rooms#ac-room',     label: 'A/C Rooms'            },
      { href: '/rooms#non-ac-room', label: 'Non A/C Rooms'        },
      { href: '/rooms#family-room', label: 'Half Board Villa'      },
      { href: '/rooms#full-villa',  label: 'Full Villa Exclusive'  },
    ],
  },
  {
    title: 'Explore',
    links: [
      { href: '/services', label: 'Dining & Cuisine' },
      { href: '/services', label: 'Beach Access'     },
      { href: '/gallery',  label: 'Photo Gallery'    },
      { href: '/about',    label: 'Our Story'        },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { href: '/',         label: 'Home'    },
      { href: '/about',    label: 'About'   },
      { href: '/rooms',    label: 'Rooms'   },
      { href: '/services', label: 'Services'},
      { href: '/contact',  label: 'Contact' },
    ],
  },
]

const GOLD = 'rgba(201,169,110,1)'

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [scrollY,    setScrollY]    = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 60); setScrollY(window.scrollY) }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // shimmer border intensity: 0 at top, 1 when scrolled
  const borderOpacity = Math.min(scrollY / 120, 1)

  return (
    <>
      <style>{`
        /* ── Mobile mega overlay ── */
        .vi-mega-overlay {
          position:fixed; inset:0; z-index:1000;
          display:flex; flex-direction:column; overflow:hidden;
          background:rgba(4,6,14,0.98);
          opacity:0; visibility:hidden;
          transform: translateY(-12px);
          transition:opacity 0.35s cubic-bezier(0.22,1,0.36,1),
                     visibility 0.35s,
                     transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .vi-mega-overlay.open {
          opacity:1; visibility:visible;
          transform: translateY(0);
        }
        .vi-mega-topbar {
          flex-shrink:0; display:flex; align-items:center; justify-content:space-between;
          padding:0 20px; height:64px;
          background:rgba(4,6,14,1);
          border-bottom:1px solid rgba(176,141,87,0.15);
        }
        .vi-mega-topborder {
          height:2px; flex-shrink:0;
          background:linear-gradient(to right,transparent,rgba(201,169,110,0.7) 30%,rgba(201,169,110,1) 50%,rgba(201,169,110,0.7) 70%,transparent);
        }
        .vi-mega-close {
          flex-shrink:0; width:40px; height:40px;
          border:1px solid rgba(176,141,87,0.25);
          background:transparent; color:rgba(255,255,255,0.6);
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          transition:all 0.25s ease;
        }
        .vi-mega-close:hover { border-color:rgba(201,169,110,0.7); color:rgba(201,169,110,1); background:rgba(176,141,87,0.06); }
        .vi-mega-body { flex:1; overflow-y:auto; }
        .vi-mega-inner { max-width:1300px; margin:0 auto; padding:32px 24px 80px; }
        .vi-mega-grid {
          display:grid; grid-template-columns:repeat(2,1fr); gap:32px 20px;
        }
        @media (min-width:640px) { .vi-mega-grid { grid-template-columns:repeat(3,1fr); gap:40px 28px; } }
        .vi-mega-col-title {
          font-family:var(--font-lato,sans-serif);
          font-size:9px; font-weight:700;
          letter-spacing:0.3em; text-transform:uppercase;
          color:rgba(201,169,110,0.75);
          padding-bottom:12px; margin-bottom:14px;
          border-bottom:1px solid rgba(176,141,87,0.15);
          position:relative;
        }
        .vi-mega-col-title::after {
          content:''; position:absolute; bottom:-1px; left:0;
          width:28px; height:1px;
          background:rgba(201,169,110,0.9);
        }
        .vi-mega-col-item {
          display:block; padding:10px 0;
          font-family:var(--font-lato,sans-serif);
          font-size:14px; font-weight:400;
          color:rgba(255,255,255,0.48); text-decoration:none; letter-spacing:0.04em;
          border-bottom:1px solid rgba(176,141,87,0.06);
          transition:color 0.2s ease, padding-left 0.2s ease, background 0.2s ease;
          background:none; border-left:none; border-right:none; border-top:none;
          width:100%; text-align:left; cursor:pointer;
          -webkit-tap-highlight-color:transparent;
          min-height:44px; display:flex; align-items:center;
        }
        .vi-mega-col-item:last-child { border-bottom:none; }
        .vi-mega-col-item:hover,
        .vi-mega-col-item:active { color:rgba(201,169,110,1); padding-left:6px; }
        .vi-mega-cta { margin-top:36px; padding-top:24px; border-top:1px solid rgba(176,141,87,0.10); display:flex; flex-direction:column; gap:12px; }
        .vi-mega-location { display:flex; align-items:center; gap:10px; margin-bottom:4px; }
        .vi-mega-location-line { display:block; height:1px; width:28px; background:rgba(176,141,87,0.4); }
        .vi-mega-location-text { font-family:var(--font-lato,sans-serif); font-size:9px; letter-spacing:0.35em; text-transform:uppercase; color:rgba(255,255,255,0.22); }
        .vi-mega-cta-primary {
          display:block; width:100%; padding:16px 0; text-align:center;
          background:rgba(201,169,110,1); color:#06080f;
          font-family:var(--font-lato,sans-serif); font-size:11px; font-weight:700;
          letter-spacing:0.3em; text-transform:uppercase; text-decoration:none;
          border:none; cursor:pointer;
          transition:background 0.25s ease, transform 0.15s ease;
          -webkit-tap-highlight-color:transparent;
          min-height:52px; display:flex; align-items:center; justify-content:center;
        }
        .vi-mega-cta-primary:active { transform:scale(0.98); background:#e8d5b0; }
        .vi-mega-cta-secondary {
          display:flex; align-items:center; justify-content:center;
          width:100%; padding:15px 0; text-align:center;
          background:transparent; color:rgba(255,255,255,0.55);
          font-family:var(--font-lato,sans-serif); font-size:10px; font-weight:600;
          letter-spacing:0.3em; text-transform:uppercase; text-decoration:none;
          border:1px solid rgba(255,255,255,0.12);
          transition:all 0.25s ease, transform 0.15s ease;
          -webkit-tap-highlight-color:transparent;
          min-height:52px;
        }
        .vi-mega-cta-secondary:hover { border-color:rgba(176,141,87,0.45); color:rgba(201,169,110,1); }
        .vi-mega-cta-secondary:active { transform:scale(0.98); }

        /* ── Nav link 3D hover ── */
        .vi-nav-link {
          position:relative; font-size:11px; font-family:var(--font-lato,sans-serif);
          letter-spacing:0.2em; text-transform:uppercase; text-decoration:none;
          transition:color 0.3s; padding:4px 0;
          transform-style:preserve-3d;
          text-shadow: 0 1px 8px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.75);
        }
        .vi-nav-link::after {
          content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px;
          background:linear-gradient(to right,rgba(201,169,110,0.8),rgba(201,169,110,0.3));
          transition:width 0.35s cubic-bezier(.4,0,.2,1);
        }
        .vi-nav-link.active::after,
        .vi-nav-link:hover::after { width:100%; }

        /* ── Shimmer top line on scrolled navbar ── */
        @keyframes navShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .nav-shimmer-line {
          position:absolute; bottom:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent 0%,rgba(201,169,110,0.6) 40%,rgba(201,169,110,1) 50%,rgba(201,169,110,0.6) 60%,transparent 100%);
          background-size:200% 100%;
          animation:navShimmer 3s linear infinite;
        }

        /* ── Book Now btn ── */
        .vi-book-btn {
          padding:9px 22px; font-family:var(--font-lato,sans-serif);
          font-size:10px; letter-spacing:0.22em; text-transform:uppercase;
          text-decoration:none; transition:color 0.3s ease, border-color 0.3s ease;
          white-space:nowrap; position:relative; overflow:hidden;
          color:rgba(201,169,110,1);
          border:1px solid rgba(201,169,110,0.55);
          filter: drop-shadow(0 1px 6px rgba(0,0,0,0.8));
        }
        .vi-book-btn::before {
          content:''; position:absolute; inset:0;
          background:rgba(201,169,110,1);
          transform:scaleX(0); transform-origin:left;
          transition:transform 0.35s cubic-bezier(0.22,1,0.36,1);
          z-index:0;
        }
        .vi-book-btn span {
          position:relative; z-index:1;
        }
        .vi-book-btn:hover::before { transform:scaleX(1); }
        .vi-book-btn:hover { color:#06080f; border-color:rgba(201,169,110,1); }
      `}</style>

      {/* Mobile Mega Overlay */}
      <div className={`vi-mega-overlay ${mobileOpen ? 'open' : ''}`}>
        <div className="vi-mega-topborder" />
        <div className="vi-mega-topbar">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image src="/webp/villa_logo_transparent.png" alt="Villa i" width={110} height={40} className="object-contain" priority />
          </Link>
          <button className="vi-mega-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <HiX size={18} />
          </button>
        </div>
        <div className="vi-mega-body">
          <div className="vi-mega-inner">
            <div className="vi-mega-grid">
              {megaColumns.map((col) => (
                <div key={col.title}>
                  <div className="vi-mega-col-title">{col.title}</div>
                  {col.links.map((link) => (
                    <Link key={link.label} href={link.href} className="vi-mega-col-item" onClick={() => setMobileOpen(false)} style={pathname === link.href ? { color: 'rgba(201,169,110,1)' } : {}}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="vi-mega-cta">
              <div className="vi-mega-location">
                <span className="vi-mega-location-line" />
                <span className="vi-mega-location-text">Mount Lavinia, Sri Lanka</span>
              </div>
              <Link href="/contact" className="vi-mega-cta-primary" onClick={() => setMobileOpen(false)}>Reserve Your Stay</Link>
              <Link href="/rooms" className="vi-mega-cta-secondary" onClick={() => setMobileOpen(false)}>Explore Rooms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <motion.nav
        ref={navRef as React.RefObject<HTMLElement>}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(4,6,14,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          boxShadow: scrolled
            ? `0 8px 32px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(201,169,110,${borderOpacity * 0.2})`
            : 'none',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Shimmer bottom border when scrolled */}
        {scrolled && <div className="nav-shimmer-line" style={{ opacity: Math.min(borderOpacity * 1.2, 0.6) }} />}

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center relative group">
              <Image src="/webp/villa_logo_transparent.png" alt="Villa i" width={110} height={40} className="object-contain transition-all duration-300 group-hover:brightness-110" priority />
              {/* Logo glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(201,169,110,0.12) 0%,transparent 70%)' }} />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`vi-nav-link ${pathname === link.href ? 'active' : ''}`}
                  style={{ color: pathname === link.href ? GOLD : hoveredLink === link.href ? GOLD : 'rgba(255,255,255,0.80)' }}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  {/* Hover glow dot */}
                  <AnimatePresence>
                    {hoveredLink === link.href && (
                      <motion.span
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: GOLD }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              ))}
            </div>

            {/* Book Now */}
            <div className="hidden md:block">
              <Link href="/contact" className="vi-book-btn">
                <span>Book Now</span>
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 transition-all duration-250"
              style={{ border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(0,0,0,0.2)', color: 'rgba(255,255,255,0.88)' }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(176,141,87,0.55)'; e.currentTarget.style.color = GOLD; e.currentTarget.style.background = 'rgba(176,141,87,0.10)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.color = 'rgba(255,255,255,0.88)'; e.currentTarget.style.background = 'rgba(0,0,0,0.2)' }}
            >
              <HiMenu size={17} />
            </button>

          </div>
        </div>
      </motion.nav>
    </>
  )
}
