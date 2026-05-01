'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, CalendarCheck, X, Send } from 'lucide-react'

const PHONE = '+94765375285'
const WA_MSG = encodeURIComponent('Hi! I would like to inquire about your villa and hotel services.')

type Tab = 'none' | 'inquiry'

export default function MobileActionBar() {
  const [visible, setVisible] = useState(false)
  const [tab, setTab] = useState<Tab>('none')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Slide up after short delay
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  const closeSheet = () => {
    setTab('none')
    setStatus('idle')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); return }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (!visible) return null

  return (
    <>
      {/* ── Bottom Sheet overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {tab === 'inquiry' && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSheet}
            />

            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[70] md:hidden"
              style={{
                background: 'linear-gradient(180deg, #0d1020 0%, #080b18 100%)',
                borderTop: '1px solid rgba(201,169,110,0.25)',
                borderRadius: '20px 20px 0 0',
                paddingBottom: 'env(safe-area-inset-bottom)',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Sheet handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
              </div>

              {/* Sheet header */}
              <div className="flex items-center justify-between px-5 pt-2 pb-4" style={{ borderBottom: '1px solid rgba(201,169,110,0.08)' }}>
                <div>
                  <p className="font-lato text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.55)' }}>
                    Villa i Hotel
                  </p>
                  <h3 className="font-playfair text-lg text-white mt-0.5">Quick Inquiry</h3>
                </div>
                <button
                  onClick={closeSheet}
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <X size={14} className="text-white/50" />
                </button>
              </div>

              {/* Sheet body */}
              <div className="px-5 py-4 overflow-y-auto" style={{ maxHeight: '65vh' }}>
                {status === 'success' ? (
                  <div className="text-center py-8">
                    <div
                      className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)' }}
                    >
                      <span style={{ color: '#C9A96E', fontSize: 22 }}>✓</span>
                    </div>
                    <h4 className="font-playfair text-xl text-white mb-2">Sent!</h4>
                    <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      We&apos;ll reply within 24 hours.
                    </p>
                    <button
                      onClick={closeSheet}
                      className="mt-6 px-8 py-3 font-lato text-xs tracking-widest uppercase text-white/70"
                      style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {[
                      { key: 'name',    placeholder: 'Your Name',    type: 'text',  required: true },
                      { key: 'email',   placeholder: 'Email Address', type: 'email', required: true },
                      { key: 'subject', placeholder: 'Subject',      type: 'text',  required: true },
                    ].map(({ key, placeholder, type, required }) => (
                      <input
                        key={key}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        value={(form as any)[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-4 py-3 font-lato text-sm text-white outline-none"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 8,
                          WebkitAppearance: 'none',
                        }}
                      />
                    ))}
                    <textarea
                      placeholder="Your message..."
                      required
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 font-lato text-sm text-white outline-none resize-none"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8,
                      }}
                    />
                    {status === 'error' && (
                      <p className="font-lato text-xs" style={{ color: '#f87171' }}>Something went wrong. Try again.</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 font-lato text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #C9A96E, #b8904a)',
                        color: '#06080f',
                        borderRadius: 8,
                        opacity: status === 'loading' ? 0.7 : 1,
                      }}
                    >
                      {status === 'loading' ? 'Sending…' : <><Send size={14} /> Send Inquiry</>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Sticky bottom bar ─────────────────────────────────────── */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: 'rgba(6,8,15,0.97)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: '1px solid rgba(201,169,110,0.15)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.9 }}
      >
        <div className="grid grid-cols-3 h-16">

          {/* Call */}
          <a
            href={`tel:${PHONE}`}
            className="flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform duration-150"
            style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Phone size={18} style={{ color: 'rgba(255,255,255,0.55)' }} />
            <span className="font-lato text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Call
            </span>
          </a>

          {/* Book Now — highlighted center */}
          <Link
            href="/contact"
            className="flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform duration-150"
            style={{
              background: 'linear-gradient(135deg, rgba(201,169,110,0.18), rgba(201,169,110,0.10))',
              borderRight: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <CalendarCheck size={18} style={{ color: '#C9A96E' }} />
            <span className="font-lato text-[9px] tracking-widest uppercase font-bold" style={{ color: '#C9A96E' }}>
              Book Now
            </span>
          </Link>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${PHONE}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform duration-150"
          >
            <MessageCircle size={18} style={{ color: 'rgba(37,211,102,0.8)' }} />
            <span className="font-lato text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
              WhatsApp
            </span>
          </a>

        </div>
      </motion.div>

      {/* Push page content up on mobile so bar doesn't overlap */}
      <div className="h-16 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </>
  )
}
