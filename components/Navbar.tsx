'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
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
        <div className="flex items-center justify-between h-20">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs font-lato tracking-[0.2em] uppercase transition-colors duration-300 group ${
                  pathname === link.href ? 'text-luxury-gold' : 'text-white/80 hover:text-luxury-gold'
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

          {/* Book Now CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="px-7 py-2.5 border border-luxury-gold text-luxury-gold text-xs tracking-[0.2em] uppercase font-lato hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white hover:text-luxury-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

     {/* Mobile Menu */}
<AnimatePresence>
  {mobileOpen && (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="md:hidden fixed inset-0 top-20 z-40 bg-luxury-black overflow-y-auto"
    >
      {/* Subtle gold top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />

      <div className="flex flex-col h-full px-8 pt-10 pb-16">
        {/* Nav Links */}
        <div className="flex flex-col gap-1 flex-1">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between py-5 border-b border-white/8 group ${
                  pathname === link.href ? 'text-luxury-gold' : 'text-white/80'
                }`}
              >
                <span className="font-lato text-sm tracking-[0.25em] uppercase group-hover:text-luxury-gold transition-colors duration-300">
                  {link.label}
                </span>
                {pathname === link.href && (
                  <span className="block w-1.5 h-1.5 rotate-45 bg-luxury-gold" />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-10 flex flex-col gap-4"
        >
          {/* Location tag */}
          <div className="flex items-center gap-3 mb-2">
            <span className="block h-px w-8 bg-luxury-gold/40" />
            <p className="font-lato text-[10px] tracking-[0.35em] uppercase text-white/30">
              Mount Lavinia, Sri Lanka
            </p>
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="w-full py-4 bg-luxury-gold text-luxury-black text-center text-xs tracking-[0.3em] uppercase font-lato hover:bg-luxury-gold-light transition-all duration-300"
          >
            Reserve Your Stay
          </Link>
          <Link
            href="/rooms"
            onClick={() => setMobileOpen(false)}
            className="w-full py-4 border border-white/15 text-white/70 text-center text-xs tracking-[0.3em] uppercase font-lato hover:border-luxury-gold/40 hover:text-luxury-gold transition-all duration-300"
          >
            Explore Rooms
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.nav>
  )
}
