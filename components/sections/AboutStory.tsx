'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

const stats = [
  { value: '100m',  label: 'To the Ocean'  },
  { value: '2025',  label: 'Established'   },
  { value: '4.9★', label: 'Guest Rating'  },
]

const values = [
  {
    number: '01',
    title: 'Born from Hospitality',
    text: 'Founded by a local Sri Lankan family — every guest deserves to feel genuinely at home, not just accommodated.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'The Sea is Our Neighbour',
    text: 'Just 100 metres from the Indian Ocean — the rhythm of the sea shapes every morning and every memory made here.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M2 18c2-3 4-5 8-5s6 2 8 5" /><path d="M2 14c2-2 4-3 6-1s4 3 6 1 4-2 6 0" /><circle cx="12" cy="7" r="3" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Authentic Over Artificial',
    text: 'No scripted greetings or corporate templates. Our hospitality is personal and rooted in Sri Lankan warmth.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Luxury Within Reach',
    text: 'Comfort and quality should not cost the earth — offering a refined coastal experience at honest, fair prices.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

function ValueCard({ item, index }: { item: typeof values[0]; index: number }) {
  const tilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2)
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2)
    e.currentTarget.style.transform = `perspective(700px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(10px)`
    e.currentTarget.style.boxShadow = `${-x * 10}px ${y * 10}px 44px rgba(0,0,0,0.65), 0 0 0 1px rgba(176,141,87,0.32)`
  }
  const reset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.32)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onMouseMove={tilt}
      onMouseLeave={reset}
      className="relative overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(145deg, rgba(14,17,32,0.97) 0%, rgba(8,10,22,0.99) 100%)',
        border: '1px solid rgba(176,141,87,0.13)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.32)',
        transition: 'transform 0.08s ease, box-shadow 0.12s ease',
        padding: '28px 24px',
      }}
    >
      {/* Top shimmer */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, rgba(201,169,110,0.45), transparent 70%)' }} />

      {/* Number watermark */}
      <span className="font-playfair italic absolute top-3 right-4 leading-none select-none" style={{ color: 'rgba(176,141,87,0.07)', fontSize: '4rem', fontWeight: 700 }}>
        {item.number}
      </span>

      {/* Icon */}
      <div
        className="relative inline-flex items-center justify-center w-11 h-11 mb-5"
        style={{
          background: 'linear-gradient(145deg, rgba(176,141,87,0.1) 0%, rgba(176,141,87,0.04) 100%)',
          border: '1px solid rgba(176,141,87,0.22)',
          color: GOLD_DIM,
          boxShadow: '0 4px 16px rgba(0,0,0,0.28), inset 0 1px 0 rgba(201,169,110,0.1)',
        }}
      >
        {item.icon}
        <span style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, background: GOLD, clipPath: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)' }} />
      </div>

      <h3 className="font-playfair font-bold text-white text-lg mb-2.5 leading-snug">{item.title}</h3>
      <p className="font-lato text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>{item.text}</p>

      {/* Bottom accent */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '42%', height: 2, background: 'linear-gradient(to right, rgba(201,169,110,0.45), transparent)' }} />
    </motion.div>
  )
}

export default function AboutStory() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0d1c 0%, #06080f 60%, #080b18 100%)', padding: '96px 0 104px' }}
    >
      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(176,141,87,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 25% 45%, rgba(176,141,87,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block h-px w-10" style={{ background: GOLD_DIM }} />
            <p className="font-lato font-bold text-[10px] tracking-[0.4em] uppercase" style={{ color: GOLD_DIM }}>Who We Are</p>
            <span className="block h-px w-10" style={{ background: GOLD_DIM }} />
          </div>
          <h2 className="font-playfair font-bold text-white leading-tight" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
            The{' '}
            <Image src="/webp/villa_logo_transparent.png" alt="Villa i" width={220} height={80} className="object-contain inline-block w-32 md:w-44" style={{ verticalAlign: 'middle' }} />
            {' '}<em className="italic" style={{ color: GOLD }}>Story</em>
          </h2>
          <p className="font-lato text-sm leading-relaxed mt-3 mx-auto" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '26rem' }}>
            A new chapter in coastal hospitality — rooted in local warmth, shaped by the sea.
          </p>
        </motion.div>

        {/* ── Two-column: image cluster + story ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-14 xl:gap-20 mb-16 lg:items-center">

          {/* Left: 3D image cluster */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="relative"
            style={{ isolation: 'isolate' }}
          >
            {/* Gold ambient glow behind */}
            <div style={{ position: 'absolute', top: '8%', left: '8%', right: '8%', bottom: '8%', background: 'radial-gradient(ellipse, rgba(176,141,87,0.14) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: -1 }} />

            {/* Main image with 3D CSS perspective */}
            <div className="about-img-wrap">
              <div
                className="about-img-inner"
                style={{
                  position: 'relative',
                  height: 'clamp(360px, 52vh, 540px)',
                  boxShadow: '24px 24px 80px rgba(0,0,0,0.88), -6px -6px 28px rgba(176,141,87,0.06)',
                  border: '1px solid rgba(176,141,87,0.2)',
                }}
              >
                <Image src="/webp/about-hero.webp" alt="Villa i Hotel" fill quality={90} sizes="(max-width:1024px) 90vw, 42vw" className="object-cover" />
                {/* Colour grade overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(201,169,110,0.05) 0%, transparent 40%, rgba(5,7,14,0.5) 100%)' }} />
                {/* TL frame */}
                <div style={{ position: 'absolute', top: -1, left: -1 }}>
                  <div style={{ width: 44, height: 2, background: GOLD }} />
                  <div style={{ width: 2, height: 44, background: GOLD }} />
                </div>
                {/* BR frame */}
                <div style={{ position: 'absolute', bottom: -1, right: -1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ width: 2, height: 44, background: GOLD }} />
                  <div style={{ width: 44, height: 2, background: GOLD }} />
                </div>
              </div>
            </div>

            {/* Secondary floating image */}
            <motion.div
              initial={{ opacity: 0, x: 16, y: 16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.3 }}
              style={{
                position: 'absolute', bottom: -28, right: -16,
                width: '44%', height: 158, overflow: 'hidden', zIndex: 10,
                boxShadow: '0 28px 64px rgba(0,0,0,0.9), 0 0 0 1px rgba(176,141,87,0.22)',
                transform: 'perspective(700px) rotateY(5deg) rotateX(-2deg)',
              }}
            >
              <Image src="/webp/room8.jpg" alt="Superior Room" fill quality={90} sizes="30vw" className="object-cover" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,7,14,0.8) 0%, transparent 55%)' }} />
              <span className="font-lato absolute bottom-2.5 left-3" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                Superior Room
              </span>
            </motion.div>

            {/* Floating badge: 100m */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{
                position: 'absolute', top: '22%', left: -20, zIndex: 20,
                background: 'rgba(8,10,22,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(176,141,87,0.32)',
                boxShadow: '0 20px 48px rgba(0,0,0,0.75), inset 0 1px 0 rgba(201,169,110,0.08)',
                padding: '14px 18px',
              }}
            >
              <div className="font-playfair font-bold" style={{ color: GOLD, fontSize: '1.65rem', lineHeight: 1 }}>100m</div>
              <div className="font-lato" style={{ color: 'rgba(255,255,255,0.38)', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 5 }}>To the Ocean</div>
            </motion.div>

            {/* Floating badge: Est */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              style={{
                position: 'absolute', top: -14, right: 28, zIndex: 20,
                background: GOLD,
                boxShadow: '0 12px 32px rgba(176,141,87,0.42)',
                padding: '10px 16px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span className="font-lato font-bold" style={{ color: '#0a0906', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Est. 2025</span>
              <span style={{ display: 'inline-block', width: 4, height: 4, background: 'rgba(10,9,6,0.35)', transform: 'rotate(45deg)' }} />
              <span className="font-lato font-bold" style={{ color: '#0a0906', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Mt. Lavinia</span>
            </motion.div>

          </motion.div>

          {/* Right: story + stats */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 2, height: 42, background: `linear-gradient(to bottom, ${GOLD}, rgba(176,141,87,0.12))` }} />
              <p className="font-lato font-bold text-xs tracking-[0.36em] uppercase" style={{ color: GOLD_DIM }}>Our Story</p>
            </div>

            <h3 className="font-playfair font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}>
              A Home Away<br />
              <em className="italic" style={{ color: GOLD }}>From Home</em>
            </h3>

            <div className="space-y-4 mb-8">
              <p className="font-lato text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
                Villa i was born from a simple desire — to share the beauty of coastal Sri Lanka with the world. Nestled in Mount Lavinia, our family-run villa offers a rare blend of local warmth and refined comfort, just steps from the Indian Ocean.
              </p>
              <p className="font-lato text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                From hand-crafted interiors to home-cooked meals, we pour our heritage into every detail so your stay feels less like a hotel and more like a homecoming.
              </p>
            </div>

            {/* Gold divider */}
            <div className="flex items-center gap-3 mb-8">
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(176,141,87,0.35), transparent)' }} />
              <span style={{ display: 'inline-block', width: 5, height: 5, background: GOLD_DIM, transform: 'rotate(45deg)' }} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} style={{ padding: '14px 0 14px 16px', borderLeft: '2px solid rgba(176,141,87,0.25)' }}>
                  <div className="font-playfair font-bold" style={{ color: GOLD, fontSize: '1.45rem', lineHeight: 1, marginBottom: 5 }}>{s.value}</div>
                  <div className="font-lato" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Quote banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative text-center px-8 md:px-16 py-10 mb-16"
          style={{
            background: 'linear-gradient(135deg, rgba(14,17,32,0.82) 0%, rgba(8,10,22,0.93) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(176,141,87,0.15)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.52), inset 0 1px 0 rgba(201,169,110,0.07)',
          }}
        >
          {/* Horizontal glow lines */}
          <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.42), transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: '8%', right: '8%', height: 1, background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.42), transparent)' }} />
          {/* TL corner */}
          <div style={{ position: 'absolute', top: -1, left: -1 }}>
            <div style={{ width: 28, height: 2, background: GOLD }} />
            <div style={{ width: 2, height: 28, background: GOLD }} />
          </div>
          {/* BR corner */}
          <div style={{ position: 'absolute', bottom: -1, right: -1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ width: 2, height: 28, background: GOLD }} />
            <div style={{ width: 28, height: 2, background: GOLD }} />
          </div>

          <span className="font-playfair italic block mb-1 select-none leading-none" style={{ color: 'rgba(201,169,110,0.14)', fontSize: '5rem' }}>"</span>
          <p className="font-playfair italic text-white leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}>
            We didn't set out to build a hotel.{' '}
            <br className="hidden sm:block" />
            We set out to share a{' '}
            <span style={{ color: GOLD }}>home by the sea.</span>
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span style={{ display: 'block', height: 1, width: 28, background: GOLD_DIM }} />
            <span className="font-lato text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Villa i · Founded 2025</span>
            <span style={{ display: 'block', height: 1, width: 28, background: GOLD_DIM }} />
          </div>
        </motion.div>

        {/* ── Values grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((item, i) => (
            <ValueCard key={item.number} item={item} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        .about-img-inner {
          transform: perspective(1200px) rotateY(-8deg) rotateX(2.5deg);
          transition: transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .about-img-wrap:hover .about-img-inner {
          transform: perspective(1200px) rotateY(-2deg) rotateX(0.5deg) scale(1.015);
        }
      `}</style>
    </section>
  )
}
