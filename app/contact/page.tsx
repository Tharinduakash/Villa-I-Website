'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MdEmail, MdPhone, MdLocationOn, MdCheckCircle } from 'react-icons/md'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import AnimatedSection from '@/components/AnimatedSection'

type FormData = {
  name: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  guests: string
  roomType: string
  message: string
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const json = await res.json()
      console.error('Booking submission error:', json.error)
    }
    setSubmitted(true)
    reset()
  }

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85"
          alt="Mount Lavinia Beach"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-luxury-black/20" />
        <div className="relative z-10 container-padding w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-luxury-gold font-lato text-xs tracking-[0.4em] uppercase mb-3">Get In Touch</p>
            <h1 className="font-playfair text-5xl md:text-7xl text-white">
              Contact <span className="italic text-luxury-gold">Us</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── MAIN SECTION ───────────────────────────────────────────── */}
      <section className="section-padding bg-luxury-black">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* ── Contact Info ─────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="left">
                <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">Reach Us</p>
                <h2 className="font-playfair text-3xl text-white mb-8">
                  We&apos;d Love to<br />
                  <span className="italic text-luxury-gold">Hear From You</span>
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center shrink-0">
                      <MdLocationOn className="text-luxury-gold" size={18} />
                    </div>
                    <div>
                      <p className="text-white/30 font-lato text-xs tracking-wider uppercase mb-1">Address</p>
                      <p className="text-white/70 font-lato text-sm leading-relaxed">
                        Villa i Hotel<br />
                        Mount Lavinia, Colombo<br />
                        Sri Lanka
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center shrink-0">
                      <MdPhone className="text-luxury-gold" size={18} />
                    </div>
                    <div>
                      <p className="text-white/30 font-lato text-xs tracking-wider uppercase mb-1">Phone</p>
                      <a href="tel:+94XXXXXXXXX" className="text-white/70 font-lato text-sm hover:text-luxury-gold transition-colors">
                        +94 XX XXX XXXX
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center shrink-0">
                      <MdEmail className="text-luxury-gold" size={18} />
                    </div>
                    <div>
                      <p className="text-white/30 font-lato text-xs tracking-wider uppercase mb-1">Email</p>
                      <a href="mailto:info@villaihotel.com" className="text-white/70 font-lato text-sm hover:text-luxury-gold transition-colors">
                        info@villaihotel.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center shrink-0">
                      <FaWhatsapp className="text-luxury-gold" size={18} />
                    </div>
                    <div>
                      <p className="text-white/30 font-lato text-xs tracking-wider uppercase mb-1">WhatsApp</p>
                      <a href="https://wa.me/94XXXXXXXXX" className="text-white/70 font-lato text-sm hover:text-luxury-gold transition-colors">
                        Message Us Directly
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-white/30 font-lato text-xs tracking-wider uppercase mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
                      <FaInstagram size={16} />
                    </a>
                    <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
                      <FaFacebook size={16} />
                    </a>
                    <a href="https://wa.me/94XXXXXXXXX" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
                      <FaWhatsapp size={16} />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* ── Booking Form ──────────────────────────────────────── */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <div className="border border-white/8 p-8 md:p-10 bg-luxury-dark">
                  <h3 className="font-playfair text-2xl text-white mb-8">
                    Reserve Your Stay
                  </h3>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <MdCheckCircle className="text-luxury-gold mx-auto mb-4" size={56} />
                      <h4 className="font-playfair text-2xl text-white mb-3">Inquiry Received!</h4>
                      <p className="text-white/50 font-lato text-sm leading-relaxed max-w-sm mx-auto mb-8">
                        Thank you for reaching out. Our team will respond within 24 hours to confirm your booking.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-8 py-3 border border-luxury-gold text-luxury-gold font-lato text-xs tracking-[0.2em] uppercase hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-white/40 font-lato text-xs tracking-[0.15em] uppercase mb-2">
                            Full Name *
                          </label>
                          <input
                            {...register('name', { required: 'Name is required' })}
                            className="w-full bg-luxury-black border border-white/10 focus:border-luxury-gold px-4 py-3 text-white font-lato text-sm outline-none transition-colors duration-300 placeholder:text-white/20"
                            placeholder="Your name"
                          />
                          {errors.name && <p className="text-red-400 font-lato text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-white/40 font-lato text-xs tracking-[0.15em] uppercase mb-2">
                            Email *
                          </label>
                          <input
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                            type="email"
                            className="w-full bg-luxury-black border border-white/10 focus:border-luxury-gold px-4 py-3 text-white font-lato text-sm outline-none transition-colors duration-300 placeholder:text-white/20"
                            placeholder="your@email.com"
                          />
                          {errors.email && <p className="text-red-400 font-lato text-xs mt-1">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-white/40 font-lato text-xs tracking-[0.15em] uppercase mb-2">
                            Phone / WhatsApp
                          </label>
                          <input
                            {...register('phone')}
                            className="w-full bg-luxury-black border border-white/10 focus:border-luxury-gold px-4 py-3 text-white font-lato text-sm outline-none transition-colors duration-300 placeholder:text-white/20"
                            placeholder="+94 XX XXX XXXX"
                          />
                        </div>
                        <div>
                          <label className="block text-white/40 font-lato text-xs tracking-[0.15em] uppercase mb-2">
                            Number of Guests
                          </label>
                          <select
                            {...register('guests')}
                            className="w-full bg-luxury-black border border-white/10 focus:border-luxury-gold px-4 py-3 text-white font-lato text-sm outline-none transition-colors duration-300"
                          >
                            <option value="">Select guests</option>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3-4">3–4 Guests</option>
                            <option value="5+">5+ Guests</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-white/40 font-lato text-xs tracking-[0.15em] uppercase mb-2">
                            Check-In Date *
                          </label>
                          <input
                            {...register('checkIn', { required: 'Check-in date is required' })}
                            type="date"
                            className="w-full bg-luxury-black border border-white/10 focus:border-luxury-gold px-4 py-3 text-white font-lato text-sm outline-none transition-colors duration-300"
                          />
                          {errors.checkIn && <p className="text-red-400 font-lato text-xs mt-1">{errors.checkIn.message}</p>}
                        </div>
                        <div>
                          <label className="block text-white/40 font-lato text-xs tracking-[0.15em] uppercase mb-2">
                            Check-Out Date *
                          </label>
                          <input
                            {...register('checkOut', { required: 'Check-out date is required' })}
                            type="date"
                            className="w-full bg-luxury-black border border-white/10 focus:border-luxury-gold px-4 py-3 text-white font-lato text-sm outline-none transition-colors duration-300"
                          />
                          {errors.checkOut && <p className="text-red-400 font-lato text-xs mt-1">{errors.checkOut.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/40 font-lato text-xs tracking-[0.15em] uppercase mb-2">
                          Room Type
                        </label>
                        <select
                          {...register('roomType')}
                          className="w-full bg-luxury-black border border-white/10 focus:border-luxury-gold px-4 py-3 text-white font-lato text-sm outline-none transition-colors duration-300"
                        >
                          <option value="">Select room type</option>
                          <option value="ac-room">A/C Room</option>
                          <option value="non-ac-room">Non A/C Room</option>
                          <option value="family-room">Family Suite</option>
                          <option value="full-villa">Full Villa Exclusive</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/40 font-lato text-xs tracking-[0.15em] uppercase mb-2">
                          Message / Special Requests
                        </label>
                        <textarea
                          {...register('message')}
                          rows={4}
                          className="w-full bg-luxury-black border border-white/10 focus:border-luxury-gold px-4 py-3 text-white font-lato text-sm outline-none transition-colors duration-300 resize-none placeholder:text-white/20"
                          placeholder="Any special requests or questions..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-luxury-gold text-luxury-black font-lato text-xs tracking-[0.3em] uppercase hover:bg-luxury-gold-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Booking Inquiry'}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GOOGLE MAP ─────────────────────────────────────────────── */}
      <section className="h-[420px] relative border-t border-white/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9963743041087!2d79.86394847469938!3d6.836748793152745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b00ea75ab55%3A0x7b22fc5e3e6e1e33!2sMount%20Lavinia%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1714000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.85)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Villa i Hotel — Mount Lavinia, Sri Lanka"
        />
        <div className="absolute top-6 left-6 bg-luxury-black/90 backdrop-blur-sm border border-luxury-gold/30 px-5 py-3">
          <p className="text-luxury-gold font-playfair text-sm italic">Villa i Hotel</p>
          <p className="text-white/50 font-lato text-xs mt-0.5">Mount Lavinia, Sri Lanka</p>
        </div>
      </section>
    </>
  )
}
