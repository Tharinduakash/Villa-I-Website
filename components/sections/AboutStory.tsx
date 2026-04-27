'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'

const GOLD     = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

const values = [
  {
    number: '01',
    title: 'Born from Hospitality',
    text: 'Villa i was founded by a local Sri Lankan family with one simple belief — every guest deserves to feel genuinely at home. Not just accommodated, but welcomed.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'The Sea is Our Neighbour',
    text: 'We chose Mount Lavinia deliberately. Just 100 metres from the Indian Ocean, the rhythm of the sea shapes every morning, every meal, and every memory made here.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M2 18c2-3 4-5 8-5s6 2 8 5" />
        <path d="M12 13V7" />
        <path d="M12 7c0 0-4 3-6 0 2-3 6-2 6 0z" />
        <path d="M12 7c0 0 4 3 6 0-2-3-6-2-6 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Authentic Over Artificial',
    text: 'No scripted greetings or corporate templates. Our hospitality is personal, unscripted, and rooted in the warmth that Sri Lanka is known for around the world.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Luxury Within Reach',
    text: 'We believe comfort and quality should not cost the earth. Villa i offers a refined coastal experience at honest prices — because great hospitality is for everyone.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

export default function AboutStory() {
  return (
    <section className="section-padding section-gradient-b overflow-hidden">
      <div className="container-padding">

        {/* ── Header ── */}
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block h-px w-10" style={{ background: GOLD_DIM }} />
            <p className="font-lato text-xs tracking-[0.4em] uppercase" style={{ color: GOLD_DIM }}>
              Who We Are
            </p>
            <span className="block h-px w-10" style={{ background: GOLD_DIM }} />
          </div>
          <div className="font-playfair text-4xl md:text-5xl text-white">
            <Image
                        src="/webp/villa_logo_transparent.png"
                        alt="Villa i"
                        width={90}
                        height={70}
                        className="object-contain inline-block"
                        style={{ verticalAlign: 'middle' }}
                      />
            <span className="italic" style={{ color: GOLD }}>Story</span>
          </div>
          <p
            className="font-lato text-sm leading-relaxed mt-4 mx-auto"
            style={{ color: 'rgba(255,255,255,0.38)', maxWidth: '28rem' }}
          >
            A new chapter in coastal hospitality — rooted in local warmth, shaped by the sea.
          </p>
        </AnimatedSection>

        {/* ── Opening statement ── */}
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-20" delay={0.1}>
          <div
            className="relative p-8 md:p-10"
            style={{
              background: 'linear-gradient(145deg, rgba(15,18,34,1) 0%, rgba(8,10,22,1) 100%)',
              border: '1px solid rgba(176,141,87,0.18)',
            }}
          >
            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 pointer-events-none">
              <div className="w-6 h-px" style={{ background: GOLD }} />
              <div className="w-px h-6" style={{ background: GOLD }} />
            </div>
            <div className="absolute bottom-0 right-0 pointer-events-none flex flex-col items-end">
              <div className="w-px h-6" style={{ background: GOLD }} />
              <div className="w-6 h-px" style={{ background: GOLD }} />
            </div>

            <span
              className="font-playfair italic text-6xl leading-none block mb-4"
              style={{ color: 'rgba(176,141,87,0.15)' }}
            >
              "
            </span>
            <p
              className="font-playfair text-xl md:text-2xl text-white leading-relaxed"
            >
              We didn't set out to build a hotel.
              <br />
              We set out to share a{' '}
              <span className="italic" style={{ color: GOLD }}>home by the sea.</span>
            </p>
            <div
              className="flex items-center justify-center gap-3 mt-6"
            >
              <span className="block h-px w-8" style={{ background: GOLD_DIM }} />
              <span
                className="font-lato text-[10px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(255,255,255,0.30)' }}
              >
                Villa i, Founded 2025
              </span>
              <span className="block h-px w-8" style={{ background: GOLD_DIM }} />
            </div>
          </div>
        </AnimatedSection>

        {/* ── Values grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative flex gap-5 p-6 cursor-default"
              style={{
                background: 'linear-gradient(145deg, rgba(12,15,28,1) 0%, rgba(7,9,20,1) 100%)',
                border: '1px solid rgba(176,141,87,0.10)',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(176,141,87,0.38)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(176,141,87,0.10)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Corner ornament */}
              <div className="absolute top-0 left-0 pointer-events-none">
                <div
                  className="w-4 h-px transition-all duration-400 group-hover:w-7"
                  style={{ background: GOLD }}
                />
                <div
                  className="w-px h-4 transition-all duration-400 group-hover:h-7"
                  style={{ background: GOLD }}
                />
              </div>

              {/* Number watermark */}
              <span
                className="absolute top-3 right-4 font-playfair italic text-3xl leading-none select-none"
                style={{ color: 'rgba(176,141,87,0.08)' }}
              >
                {item.number}
              </span>

              {/* Icon */}
              <div
                className="flex-shrink-0 flex items-center justify-center w-11 h-11 transition-all duration-300 group-hover:bg-luxury-gold/10"
                style={{
                  border: '1px solid rgba(176,141,87,0.22)',
                  color: GOLD_DIM,
                }}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <h3
                  className="font-playfair text-lg text-white mb-2 transition-colors duration-300 group-hover:text-luxury-gold"
                >
                  {item.title}
                </h3>
                <p
                  className="font-lato text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.40)' }}
                >
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}