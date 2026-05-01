'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdPeople, MdSquareFoot, MdCheckCircle, MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface Room {
  id: string
  name: string
  shortName: string
  description: string
  features: string[]
  priceUSD: number
  price: string
  image: string
  images: string[]
  capacity: string
  size: string
}

function RoomGallery({ image, images, price, priceUSD }: { image: string; images: string[]; price: string; priceUSD: number }) {
  const allImages = images && images.length > 0 ? images : [image]
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + allImages.length) % allImages.length)
  const next = () => setCurrent((c) => (c + 1) % allImages.length)

  return (
    // h-full fills the grid row height on desktop; min-h-[380px] ensures a floor on mobile
    <div className="relative h-[380px] lg:h-full min-h-[380px] overflow-hidden group">
      {allImages.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}`}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      ))}

      {/* Price badge */}
      <div className="absolute top-5 right-5 z-10 bg-luxury-black/80 backdrop-blur-sm border border-luxury-gold/40 px-4 py-2 flex flex-col items-end gap-0.5">
        <span className="text-luxury-gold font-lato text-sm tracking-wide">${priceUSD.toLocaleString()} <span className="text-xs opacity-70">USD</span></span>
        <span className="text-white/60 font-lato text-xs tracking-wide">{price}</span>
      </div>

      {allImages.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-luxury-black/70 backdrop-blur-sm border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-luxury-gold/50 hover:text-luxury-gold"
          >
            <MdChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-luxury-black/70 backdrop-blur-sm border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-luxury-gold/50 hover:text-luxury-gold"
          >
            <MdChevronRight size={22} />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-5 h-1.5 bg-luxury-gold' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-4 right-4 z-10 bg-luxury-black/60 backdrop-blur-sm px-2 py-0.5">
            <span className="font-lato text-xs text-white/50">{current + 1} / {allImages.length}</span>
          </div>
        </>
      )}
    </div>
  )
}

export default function RoomsList({ rooms }: { rooms: Room[] }) {
  return (
    <section className="section-padding section-gradient-b">
      <div className="container-padding space-y-24">
        {rooms.map((room, i) => {
          const reversed = i % 2 !== 0
          return (
            <motion.div
              key={room.id}
              id={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9 }}
              // Always grid — no flex switching so abs-positioned images never collapse
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5 overflow-hidden"
            >
              {/* Gallery — pushed to column 2 on reversed rows via lg:order-last */}
              <div className={reversed ? 'lg:order-last' : ''}>
                <RoomGallery image={room.image} images={room.images} price={room.price} priceUSD={room.priceUSD} />
              </div>

              {/* Content — pulled to column 1 on reversed rows via lg:order-first */}
              <div className={`bg-luxury-dark p-10 lg:p-14 flex flex-col justify-center ${reversed ? 'lg:order-first' : ''}`}>
                <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">{room.shortName}</p>
                <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4">{room.name}</h2>
                <p className="text-white/55 font-lato text-sm leading-relaxed mb-6">{room.description}</p>

                <div className="flex gap-6 mb-7">
                  <div className="flex items-center gap-2 text-white/40">
                    <MdPeople size={18} className="text-luxury-gold" />
                    <span className="font-lato text-sm">{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <MdSquareFoot size={18} className="text-luxury-gold" />
                    <span className="font-lato text-sm">{room.size}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-8">
                  {room.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-white/50 font-lato text-xs">
                      <MdCheckCircle className="text-luxury-gold shrink-0" size={14} />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="px-8 py-3.5 bg-luxury-gold text-luxury-black font-lato text-xs tracking-[0.3em] uppercase hover:bg-luxury-gold-light transition-colors duration-300 text-center"
                  >
                    Book Now
                  </Link>
                  <Link
                    href="/contact"
                    className="px-8 py-3.5 border border-white/20 text-white font-lato text-xs tracking-[0.3em] uppercase hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 text-center"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
