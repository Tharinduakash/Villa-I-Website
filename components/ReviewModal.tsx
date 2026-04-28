'use client'

import { useRef, useState } from 'react'
import { X, Upload, Image as ImageIcon, Loader } from 'lucide-react'

const ROOM_TYPES = ['A/C Room', 'Non A/C Room', 'Family Room', 'Full Villa']
const GOLD = 'rgba(201,169,110,1)'
const GOLD_DIM = 'rgba(176,141,87,0.55)'

interface Props {
  onClose: () => void
}

export default function ReviewModal({ onClose }: Props) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    guestName: '',
    email: '',
    title: '',
    image: '',
    roomType: '',
    review: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'image') setImagePreview(value)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)

    try {
      const res = await fetch('/api/gallery/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (res.ok) {
        setForm((prev) => ({ ...prev, image: json.url }))
        setImagePreview(json.url)
      } else {
        setError(json.error ?? 'Upload failed. Please try again.')
      }
    } catch {
      setError('Network error during upload. Please try again.')
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  function clearImage() {
    setForm((prev) => ({ ...prev, image: '' }))
    setImagePreview('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!rating) { setError('Please select a rating'); return }
    if (!form.roomType) { setError('Please select a room type'); return }
    if (!form.guestName.trim()) { setError('Please enter your name'); return }
    if (!form.review.trim()) { setError('Please write your review'); return }

    setSubmitting(true)
    try {
      const res = await fetch('/api/gallery/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
      })
      if (res.ok) {
        setStep('success')
      } else {
        const json = await res.json()
        setError(json.error ?? 'Failed to submit review. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    }
    setSubmitting(false)
  }

  const inputBase = 'w-full px-4 py-2.5 font-lato text-sm text-white outline-none bg-transparent'
  const inputWrap = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,169,110,0.18)' }
  const labelClass = 'block font-lato text-[10px] tracking-[0.22em] uppercase mb-2'
  const labelStyle = { color: 'rgba(255,255,255,0.4)' }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.84)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto"
        style={{
          background: 'linear-gradient(160deg, #090c1b 0%, #06080f 100%)',
          border: '1px solid rgba(201,169,110,0.28)',
          boxShadow: '0 32px 100px rgba(0,0,0,0.75)',
        }}
      >
        {/* Top gold line */}
        <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="block h-px w-6" style={{ background: GOLD_DIM }} />
              <p className="font-lato text-[9px] tracking-[0.4em] uppercase" style={{ color: GOLD_DIM }}>Guest Memories</p>
            </div>
            <h2 className="font-playfair text-2xl text-white">Share Your Experience</h2>
          </div>
          <button onClick={onClose} className="mt-1 hover:opacity-60 transition-opacity" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pb-6">
          {step === 'success' ? (
            <div className="py-14 text-center">
              <div className="mb-4 font-playfair text-4xl" style={{ color: GOLD }}>✦</div>
              <h3 className="font-playfair text-2xl text-white mb-3">Thank You!</h3>
              <p className="font-lato text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Your review has been submitted and will appear on the gallery once approved by our team.
              </p>
              <button
                onClick={onClose}
                className="font-lato text-xs tracking-[0.28em] uppercase px-10 py-3 transition-all duration-200"
                style={{ border: `1px solid rgba(201,169,110,0.40)`, color: GOLD }}
                onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = '#0a0906' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GOLD }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="px-4 py-3 font-lato text-sm text-red-400" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.22)' }}>
                  {error}
                </div>
              )}

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} style={labelStyle}>Your Name *</label>
                  <div style={inputWrap}>
                    <input name="guestName" value={form.guestName} onChange={handleChange} required className={inputBase} placeholder="Full name" />
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Email *</label>
                  <div style={inputWrap}>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputBase} placeholder="your@email.com" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className={labelClass} style={labelStyle}>Photo / Post Title *</label>
                <div style={inputWrap}>
                  <input name="title" value={form.title} onChange={handleChange} required className={inputBase} placeholder="e.g. Beautiful sunset from our balcony" />
                </div>
              </div>

              {/* Photo Upload Section */}
              <div>
                <label className={labelClass} style={labelStyle}>Your Photo <span style={{ color: 'rgba(255,255,255,0.22)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>

                {imagePreview ? (
                  /* Preview */
                  <div className="relative" style={{ border: '1px solid rgba(201,169,110,0.25)' }}>
                    <div className="relative w-full h-44 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" onError={() => { setError('Could not load image from that URL. Please try another.'); clearImage() }} />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(9,12,27,0.6) 0%, transparent 50%)' }} />
                    </div>
                    <div className="flex items-center justify-between px-3 py-2" style={{ background: 'rgba(9,12,27,0.9)' }}>
                      <span className="font-lato text-xs truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {form.image.startsWith('/uploads/') ? 'Uploaded from your device' : form.image}
                      </span>
                      <button type="button" onClick={clearImage} className="ml-3 flex-shrink-0 hover:opacity-70 transition-opacity" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Upload zone */
                  <div className="space-y-3">
                    {/* Device upload button */}
                    <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleFileUpload} />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="w-full flex flex-col items-center justify-center gap-2 py-8 font-lato text-sm transition-all duration-200 disabled:opacity-50"
                      style={{
                        border: '2px dashed rgba(201,169,110,0.30)',
                        background: 'rgba(201,169,110,0.03)',
                        color: 'rgba(255,255,255,0.45)',
                      }}
                      onMouseEnter={(e) => {
                        if (!uploading) {
                          e.currentTarget.style.borderColor = 'rgba(201,169,110,0.60)'
                          e.currentTarget.style.background = 'rgba(201,169,110,0.07)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(201,169,110,0.30)'
                        e.currentTarget.style.background = 'rgba(201,169,110,0.03)'
                      }}
                    >
                      {uploading ? (
                        <>
                          <Loader size={22} className="animate-spin" style={{ color: GOLD }} />
                          <span className="font-lato text-xs tracking-wide" style={{ color: GOLD }}>Uploading photo…</span>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: 'rgba(201,169,110,0.10)' }}>
                            <Upload size={20} style={{ color: GOLD }} />
                          </div>
                          <div className="text-center">
                            <p className="font-lato text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Click to upload from your device</p>
                            <p className="font-lato text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>JPG, PNG, WebP, GIF · Max 8 MB</p>
                          </div>
                        </>
                      )}
                    </button>

                    {/* OR paste URL */}
                    <div className="flex items-center gap-3">
                      <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
                      <span className="font-lato text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>or paste a link</span>
                      <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
                    </div>

                    <div style={inputWrap} className="flex items-center">
                      <ImageIcon size={14} className="ml-3 flex-shrink-0" style={{ color: 'rgba(201,169,110,0.5)' }} />
                      <input
                        name="image"
                        type="url"
                        value={form.image}
                        onChange={handleChange}
                        className={inputBase + ' flex-1'}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Room Type + Rating row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} style={labelStyle}>Room Type *</label>
                  <div style={inputWrap}>
                    <select name="roomType" value={form.roomType} onChange={handleChange} required className={inputBase} style={{ background: 'transparent' }}>
                      <option value="" style={{ background: '#090c1b' }}>Select room type</option>
                      {ROOM_TYPES.map((r) => <option key={r} value={r} style={{ background: '#090c1b' }}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Your Rating *</label>
                  <div className="flex gap-1.5 items-center h-[42px]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-3xl leading-none transition-all duration-100"
                        style={{
                          color: star <= (hoverRating || rating) ? GOLD : 'rgba(255,255,255,0.12)',
                          transform: star <= (hoverRating || rating) ? 'scale(1.15)' : 'scale(1)',
                        }}
                      >★</button>
                    ))}
                    {rating > 0 && (
                      <span className="font-lato text-[10px] ml-1" style={{ color: GOLD_DIM }}>
                        {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Review */}
              <div>
                <label className={labelClass} style={labelStyle}>Your Review *</label>
                <div style={inputWrap}>
                  <textarea name="review" value={form.review} onChange={handleChange} required rows={4} className={inputBase + ' resize-none'} placeholder="Share your experience staying at Villa i Hotel…" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="flex-1 sm:flex-none px-8 py-3 font-lato text-xs tracking-[0.28em] uppercase transition-all duration-200 disabled:opacity-50"
                  style={{ background: GOLD, color: '#0a0906' }}
                >
                  {submitting ? 'Submitting…' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 font-lato text-xs tracking-[0.28em] uppercase transition-colors duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.38)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
