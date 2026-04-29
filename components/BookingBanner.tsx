'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

export default function BookingBanner() {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* ── Background image ─────────────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src="/webp/beach.avif"
          alt="Mount Lavinia Beach"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── Gradient overlays ────────────────────────────────────── */}
      {/* Main dark overlay — keeps text readable at low image opacity */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(5,7,14,0.96) 0%, rgba(5,7,14,0.88) 40%, rgba(5,7,14,0.78) 100%)',
        }}
      />
      {/* Warm gold tint from bottom-right corner */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 80% 110%, rgba(201,169,110,0.12) 0%, transparent 55%)',
        }}
      />
      {/* Top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,7,14,0.55) 0%, transparent 30%)',
        }}
      />

      {/* ── Gold top border ───────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(201,169,110,0.6) 30%, rgba(201,169,110,0.8) 50%, rgba(201,169,110,0.6) 70%, transparent 100%)',
        }}
      />

      {/* ── Gold bottom border ────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(201,169,110,0.4) 30%, rgba(201,169,110,0.6) 50%, rgba(201,169,110,0.4) 70%, transparent 100%)',
        }}
      />

      {/* ── Decorative vertical lines ─────────────────────────────── */}
      <div
        className="absolute left-12 top-0 bottom-0 w-px hidden lg:block"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(201,169,110,0.2) 25%, rgba(201,169,110,0.2) 75%, transparent)',
        }}
      />
      <div
        className="absolute right-12 top-0 bottom-0 w-px hidden lg:block"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(201,169,110,0.2) 25%, rgba(201,169,110,0.2) 75%, transparent)',
        }}
      />

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center gap-5 mb-6"
        >
          <span
            className="block h-px w-12"
            style={{ background: 'rgba(201,169,110,0.5)' }}
          />
          <p
            className="font-lato text-xs tracking-[0.4em] uppercase"
            style={{ color: '#C9A96E' }}
          >
            Your Escape Awaits
          </p>
          <span
            className="block h-px w-12"
            style={{ background: 'rgba(201,169,110,0.5)' }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-5"
        >
          Begin Your{' '}
          <span className="italic" style={{ color: '#C9A96E' }}>
            Coastal
          </span>
          <br />
          Journey Today
        </motion.h2>

        {/* Divider ornament */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ originX: 0.5 }}
          className="flex items-center justify-center gap-3 mb-7"
        >
          <span className="block h-px w-12" style={{ background: 'rgba(201,169,110,0.35)' }} />
          <span className="block w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(201,169,110,0.6)' }} />
          <span className="block h-px w-12" style={{ background: 'rgba(201,169,110,0.35)' }} />
        </motion.div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-lato text-base leading-relaxed max-w-xl mx-auto mb-12"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          Reserve your stay at Villa i Hotel and immerse yourself in the tranquil beauty of
          Mount Lavinia. Every detail crafted for your comfort.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary */}
          <Link
            href="/contact"
            className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 font-lato text-xs tracking-[0.3em] uppercase transition-colors duration-300"
            style={{ background: '#C9A96E', color: '#0B0B0B' }}
          >
            {/* Shimmer sweep */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
            />
            <span className="relative z-10">Book Your Stay</span>
            <HiArrowRight
              size={14}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* Secondary */}
          <Link
            href="/rooms"
            className="group flex items-center gap-3 px-10 py-4 font-lato text-xs tracking-[0.3em] uppercase transition-all duration-300"
            style={{
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.75)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.55)'
              e.currentTarget.style.color = '#C9A96E'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
            }}
          >
            View Rooms
            <HiArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-8 mt-14 pt-10"
          style={{ borderTop: '1px solid rgba(201,169,110,0.1)' }}
        >
          {[
            { value: '50m', label: 'To the Beach' },
            { value: '4.9★', label: 'Guest Rating' },
            { value: '24/7', label: 'Support' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p
                className="font-playfair text-xl mb-0.5"
                style={{ color: '#C9A96E' }}
              >
                {item.value}
              </p>
              <p
                className="font-lato text-[10px] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
