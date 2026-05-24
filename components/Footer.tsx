'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaWhatsapp, FaTripadvisor } from 'react-icons/fa'
import { SiBookingdotcom, SiAirbnb } from 'react-icons/si'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { HiArrowRight } from 'react-icons/hi'

// ── Data ───────────────────────────────────────────────────────────
const quickLinks = [
  { href: '/',          label: 'Home'      },
  { href: '/about',     label: 'About Us'  },
  { href: '/rooms',     label: 'Our Rooms' },
  { href: '/services',  label: 'Services'  },
  { href: '/contact',   label: 'Contact'   },
]

const roomLinks = [
  { href: '/rooms#ac-room',     label: 'A/C Rooms'           },
  { href: '/rooms#non-ac-room', label: 'Non A/C Rooms'   },
  { href: '/rooms#family-room', label: 'Half Board Villa'     },
  { href: '/rooms#full-villa',  label: 'Full Villa Exclusive' },
  { href: '/services',          label: 'Dining & Cuisine'    },
  { href: '/contact',           label: 'Book Direct'         },
]

const legalLinks = [
  { href: '/privacy-policy',      label: 'Privacy Policy'     },
  { href: '/terms-conditions',    label: 'Terms & Conditions'  },
  { href: '/cancellation-policy', label: 'Cancellation Policy' },
]

function AgodaIcon({ size = 17, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L3 21h4.5l1.8-4h5.4l1.8 4H21L12 2zm0 5.5 2 5h-4l2-5z" />
    </svg>
  )
}

const socials = [
  { Icon: FaInstagram,    href: 'https://www.instagram.com/villa_i_mount_lavinia/',                                             label: 'Instagram',   hoverColor: 'rgba(225,48,108,0.9)'  },
  { Icon: FaFacebook,     href: 'https://www.facebook.com/share/1DWX5zmzZ8/?mibextid=wwXIfr', label: 'Facebook',    hoverColor: 'rgba(24,119,242,0.9)'  },
  { Icon: FaWhatsapp,     href: 'https://wa.me/94777863412',                     label: 'WhatsApp',    hoverColor: 'rgba(37,211,102,0.9)'  },
  { Icon: FaTripadvisor,  href: 'https://www.tripadvisor.com/Profile/villiHotel2026', label: 'TripAdvisor', hoverColor: 'rgba(52,168,83,0.9)'   },
  { Icon: SiBookingdotcom,href: 'https://www.booking.com/hotel/lk/villa-i-dehiwala-mount-lavinia.en-gb.html',                                             label: 'Booking',     hoverColor: 'rgba(0,114,255,0.9)'   },
  { Icon: AgodaIcon,      href: 'https://www.agoda.com/en-gb/villa-i-hotel-mount-lavinia/hotel/mount-lavinia-lk.html',                                             label: 'Agoda',       hoverColor: 'rgba(230,0,100,0.9)'   },
  { Icon: SiAirbnb,       href: 'https://www.airbnb.com/rooms/1678920644530985002?guests=1&adults=1&s=67&unique_share_id=90cd0289-9340-49f4-b440-7fbca02913fa',                                             label: 'Airbnb',      hoverColor: 'rgba(255,90,95,0.9)'   },
]

const GOLD = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(201,169,110,0.55)'

// ── Sub-components ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-3 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="block w-4 h-px" style={{ background: GOLD_DIM }} />
        <p className="font-lato text-[9px] tracking-[0.35em] uppercase" style={{ color: GOLD_DIM }}>
          {children}
        </p>
      </div>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 font-lato text-sm py-2 transition-all duration-250 group"
      style={{ color: 'rgba(255,255,255,0.42)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = GOLD
        e.currentTarget.style.paddingLeft = '8px'
        e.currentTarget.style.borderBottomColor = 'rgba(201,169,110,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgba(255,255,255,0.42)'
        e.currentTarget.style.paddingLeft = '0px'
        e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.04)'
      }}
    >
      <HiArrowRight
        size={10}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-250"
        style={{ color: GOLD_DIM }}
      />
      {children}
    </Link>
  )
}

// ── Main Footer ────────────────────────────────────────────────────
export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subError, setSubError] = useState('')
  const [subLoading, setSubLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const year = new Date().getFullYear()

  const handleSubscribe = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubLoading(true)
    setSubError('')
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setSubError(data.error || 'Something went wrong'); setSubLoading(false); return }
      setSubscribed(true)
      setEmail('')
    } catch {
      setSubError('Network error. Please try again.')
    } finally {
      setSubLoading(false)
    }
  }

  return (
    <footer className="relative overflow-hidden">

      {/* ── Background ─────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src="/webp/room2.jfif"
          alt="Mount Lavinia Beach"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark base overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(5,7,14,0.97)' }} />

      {/* Warm gold radial ambient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 80% 110%, rgba(201,169,110,0.10) 0%, transparent 55%)',
        }}
      />
      {/* Top ambient from center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(201,169,110,0.06) 0%, transparent 45%)',
        }}
      />

      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(201,169,110,0.06) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* ── Gold top border ─────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(201,169,110,0.5) 20%, rgba(201,169,110,1) 50%, rgba(201,169,110,0.5) 80%, transparent 100%)',
        }}
      />

      

      {/* ── Main Grid ──────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">

          {/* ── Col 1: Brand ─────────────────────────────────── */}
          <div>
            {/* Logo text */}
            <div className="mb-6">
              <Image
                          src="/webp/villa_logo_transparent.png"
                          alt="Villa i"
                          width={80}
                          height={50}
                          className="object-contain inline-block"
                          style={{ verticalAlign: 'middle' }}
                        />
              <div className="flex items-center gap-2 mt-1.5">
                <span className="block h-px w-4" style={{ background: GOLD_DIM }} />
                <p className="font-lato text-[9px] tracking-[0.3em] uppercase" style={{ color: GOLD_DIM }}>
                  Mount Lavinia · Sri Lanka
                </p>
              </div>
            </div>

            <p
              className="font-lato text-sm leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.38)', maxWidth: '210px', lineHeight: '1.8' }}
            >
              A hidden coastal retreat where luxury meets the Indian Ocean breeze.
            </p>

            {/* Contact block */}
            <SectionLabel>Contact Us</SectionLabel>
            <ul className="space-y-4">
              {[
                {
                  icon: <MdLocationOn size={14} />,
                  content: <span>Mount Lavinia, Colombo<br />Sri Lanka</span>,
                  href: undefined,
                },
                {
                  icon: <MdPhone size={14} />,
                  content: '+94 77 786 3412',
                  href: 'tel:+94777863412',
                },
                {
                  icon: <MdPhone size={14} />,
                  content: '+94 11 272 7147',
                  href: 'tel:+94112727147',
                },
                {
                  icon: <MdEmail size={14} />,
                  content: 'infovillaimountlavinia@gmail.com',
                  href: 'mailto:infovillaimountlavinia@gmail.com',
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <span className="mt-0.5 flex-shrink-0" style={{ color: GOLD_DIM }}>
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-lato text-sm transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                    >
                      {item.content}
                    </a>
                  ) : (
                    <span className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.7' }}>
                      {item.content}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 2: Quick Links ───────────────────────────── */}
          <div>
            <SectionLabel>Navigation</SectionLabel>
            <nav className="flex flex-col">
              {quickLinks.map((l) => (
                <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Rooms & Services ──────────────────────── */}
          <div>
            <SectionLabel>Rooms & Services</SectionLabel>
            <nav className="flex flex-col">
              {roomLinks.map((l) => (
                <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>
              ))}
            </nav>
          </div>

          {/* ── Col 4: Social + Newsletter ───────────────────── */}
          <div>
            <SectionLabel>Follow &amp; Book</SectionLabel>

            {/* Social grid */}
            <div className="grid grid-cols-4 gap-2 mb-10">
              {socials.map(({ Icon, href, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="group flex flex-col items-center gap-2 py-3 transition-all duration-300"
                  style={{
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = hoverColor.replace('0.9', '0.4')
                    e.currentTarget.style.background = hoverColor.replace('0.9', '0.08')
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  }}
                >
                  <Icon
                    size={17}
                    className="transition-colors duration-300"
                    style={{ color: 'rgba(255,255,255,0.40)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.40)')}
                  />
                  <span
                    className="font-lato text-[8px] tracking-wide"
                    style={{ color: 'rgba(255,255,255,0.22)' }}
                  >
                    {label}
                  </span>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <SectionLabel>Newsletter</SectionLabel>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 py-3"
              >
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0"
                  style={{ background: 'rgba(201,169,110,0.15)', color: GOLD }}
                >
                  ✓
                </span>
                <p className="font-lato text-sm" style={{ color: 'rgba(201,169,110,0.8)' }}>
                  You&apos;re subscribed — thank you!
                </p>
              </motion.div>
            ) : (
              <>
                <p
                  className="font-lato text-xs leading-relaxed mb-4"
                  style={{ color: 'rgba(255,255,255,0.30)' }}
                >
                  Exclusive offers and seasonal updates to your inbox.
                </p>
                <form onSubmit={handleSubscribe}>
                  <div
                    className="flex overflow-hidden transition-all duration-300"
                    style={{
                      border: `1px solid ${subError ? 'rgba(239,68,68,0.5)' : focused ? 'rgba(201,169,110,0.50)' : 'rgba(255,255,255,0.09)'}`,
                      boxShadow: focused ? '0 0 0 3px rgba(201,169,110,0.06)' : 'none',
                    }}
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setSubError('') }}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="your@email.com"
                      className="flex-1 min-w-0 px-3 py-3 font-lato text-xs text-white outline-none placeholder:text-white/20"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    />
                    <button
                      type="submit"
                      disabled={subLoading}
                      className="flex items-center justify-center w-11 flex-shrink-0 transition-colors duration-200 disabled:opacity-60"
                      style={{ background: GOLD }}
                      onMouseEnter={(e) => { if (!subLoading) e.currentTarget.style.background = '#e8d5b0' }}
                      onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
                    >
                      {subLoading
                        ? <span className="w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#0a0906', borderTopColor: 'transparent' }} />
                        : <HiArrowRight size={14} style={{ color: '#0a0906' }} />}
                    </button>
                  </div>
                  {subError && (
                    <p className="font-lato text-xs mt-2" style={{ color: 'rgba(239,68,68,0.85)' }}>{subError}</p>
                  )}
                </form>
              </>
            )}
          </div>

        </div>
      </div>

      {/* ── Divider ornament ───────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <span className="block w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: 'rgba(201,169,110,0.4)' }} />
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
          <p className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.20)' }}>
            © {year} Villa i Hotel · Mount Lavinia, Sri Lanka · All rights reserved
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            {legalLinks.map((l, i) => (
              <React.Fragment key={l.label}>
                {i > 0 && (
                  <span className="w-px h-3 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.10)' }} />
                )}
                <Link
                  href={l.href}
                  className="font-lato text-xs transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.22)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
                >
                  {l.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}