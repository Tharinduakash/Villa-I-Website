'use client'
import { ArrowUpRight } from 'lucide-react'

export default function ContactMap() {
  return (
    <section id="map" className="relative border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      {/* Map iframe */}
      <div className="h-[460px] relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9963743041087!2d79.86394847469938!3d6.836748793152745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b00ea75ab55%3A0x7b22fc5e3e6e1e33!2sMount%20Lavinia%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1714000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: 'grayscale(1) brightness(0.55) contrast(1.1) sepia(0.15)',
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Villa i Hotel — Mount Lavinia, Sri Lanka"
        />
        {/* Edge fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(11,11,11,0.35) 0%, transparent 20%, transparent 80%, rgba(11,11,11,0.35) 100%)',
          }}
        />
      </div>

      {/* Floating location card */}
      <div
        className="absolute top-8 left-8 sm:left-12 max-w-[220px] border"
        style={{
          background: 'rgba(11,11,11,0.94)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(201,169,110,0.20)',
        }}
      >
        {/* Gold top bar */}
        <div className="h-0.5 w-full bg-luxury-gold" />

        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
            <p className="font-playfair text-sm italic text-luxury-gold">Villa i Hotel</p>
          </div>
          <p className="font-lato text-xs leading-relaxed mb-5"
            style={{ color: 'rgba(255,255,255,0.45)' }}>
            Mount Lavinia Beach Road<br />
            Mount Lavinia, Colombo<br />
            Sri Lanka
          </p>
          <a
            href="https://maps.app.goo.gl/9KqLbALmuvyWWAFp6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-lato text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 group"
            style={{ color: 'rgba(201,169,110,0.65)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(201,169,110,0.65)')}
          >
            Get Directions
            <ArrowUpRight size={11} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
