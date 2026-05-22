'use client'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Plus, Pencil, Trash2, X, Check, Upload, Image as ImageIcon,
  ChevronUp, ChevronDown, Eye, EyeOff,
} from 'lucide-react'
import Image from 'next/image'

interface HeroSlide {
  id: string
  desktopImage: string
  mobileImage: string
  eyebrow: string
  title: string
  titleItalic: string
  titleEnd: string
  accentColor: string
  accentGlow: string
  ctaLabel: string
  ctaHref: string
  ctaSecondaryLabel: string
  ctaSecondaryHref: string
  order: number
  active: boolean
}

type SlideForm = {
  desktopImage: string
  mobileImage: string
  eyebrow: string
  title: string
  titleItalic: string
  titleEnd: string
  accent: 'gold' | 'white'
  ctaLabel: string
  ctaHref: string
  ctaSecondaryLabel: string
  ctaSecondaryHref: string
  active: boolean
}

const ACCENT_MAP = {
  gold:  { accentColor: 'rgba(201,169,110,1)',    accentGlow: 'rgba(201,169,110,0.4)' },
  white: { accentColor: 'rgba(255,255,255,0.95)', accentGlow: 'rgba(255,255,255,0.25)' },
}

function detectAccent(accentColor: string): 'gold' | 'white' {
  return accentColor.includes('201,169') ? 'gold' : 'white'
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
    </div>
  )
}

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [serverError, setServerError] = useState('')
  const [uploadingDesktop, setUploadingDesktop] = useState(false)
  const [uploadingMobile, setUploadingMobile] = useState(false)
  const desktopFileRef = useRef<HTMLInputElement>(null)
  const mobileFileRef = useRef<HTMLInputElement>(null)

  const {
    register, handleSubmit, reset, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm<SlideForm>({
    defaultValues: { active: true, accent: 'gold', ctaHref: '/contact', ctaSecondaryHref: '/rooms' },
  })

  const watchedDesktop = watch('desktopImage')
  const watchedMobile  = watch('mobileImage')

  const fetchSlides = async () => {
    try {
      const res  = await fetch('/api/hero-slides', { cache: 'no-store' })
      const data = await res.json()
      setSlides(Array.isArray(data) ? data : [])
    } catch {
      setSlides([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSlides() }, [])

  async function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'desktopImage' | 'mobileImage',
  ) {
    const file = e.target.files?.[0]
    if (!file) return
    const setUploading = field === 'desktopImage' ? setUploadingDesktop : setUploadingMobile
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res  = await fetch('/api/upload?folder=hero', { method: 'POST', body: fd })
    const json = await res.json()
    if (res.ok) setValue(field, json.url)
    else setServerError(json.error ?? 'Upload failed')
    setUploading(false)
    if (e.target) e.target.value = ''
  }

  function startEdit(s: HeroSlide) {
    setEditingId(s.id)
    setShowForm(true)
    setValue('desktopImage',      s.desktopImage)
    setValue('mobileImage',       s.mobileImage ?? '')
    setValue('eyebrow',           s.eyebrow)
    setValue('title',             s.title)
    setValue('titleItalic',       s.titleItalic)
    setValue('titleEnd',          s.titleEnd)
    setValue('accent',            detectAccent(s.accentColor))
    setValue('ctaLabel',          s.ctaLabel)
    setValue('ctaHref',           s.ctaHref)
    setValue('ctaSecondaryLabel', s.ctaSecondaryLabel)
    setValue('ctaSecondaryHref',  s.ctaSecondaryHref)
    setValue('active',            s.active)
  }

  function cancelForm() {
    setEditingId(null)
    setShowForm(false)
    setServerError('')
    reset({ active: true, accent: 'gold', ctaHref: '/contact', ctaSecondaryHref: '/rooms' })
  }

  const onSubmit = async (data: SlideForm) => {
    setServerError('')
    const { accent, ...rest } = data
    const accentValues = ACCENT_MAP[accent]
    const nextOrder = editingId
      ? (slides.find(s => s.id === editingId)?.order ?? 0)
      : (slides.length === 0 ? 0 : Math.max(...slides.map(s => s.order)) + 1)

    const payload = { ...rest, ...accentValues, order: nextOrder }
    const url    = editingId ? `/api/hero-slides/${editingId}` : '/api/hero-slides'
    const method = editingId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const json = await res.json()
      setServerError(json.error ?? 'Failed to save')
      return
    }

    cancelForm()
    fetchSlides()
  }

  async function handleDelete(id: string, label: string) {
    if (!confirm(`Delete slide "${label}"?`)) return
    await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' })
    setSlides(prev => prev.filter(s => s.id !== id))
  }

  async function toggleActive(slide: HeroSlide) {
    const newActive = !slide.active
    setSlides(prev => prev.map(s => s.id === slide.id ? { ...s, active: newActive } : s))
    await fetch(`/api/hero-slides/${slide.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: newActive }),
    })
  }

  async function moveSlide(id: string, direction: 'up' | 'down') {
    const idx      = slides.findIndex(s => s.id === id)
    const otherIdx = direction === 'up' ? idx - 1 : idx + 1
    if (otherIdx < 0 || otherIdx >= slides.length) return

    const newSlides = [...slides]
    ;[newSlides[idx], newSlides[otherIdx]] = [newSlides[otherIdx], newSlides[idx]]
    const withOrders = newSlides.map((s, i) => ({ ...s, order: i }))
    setSlides(withOrders)

    await Promise.all([idx, otherIdx].map(i =>
      fetch(`/api/hero-slides/${withOrders[i].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: withOrders[i].order }),
      })
    ))
  }

  const inputClass = 'w-full px-4 py-2.5 font-lato text-sm text-white outline-none'
  const inputStyle = { background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }
  const labelClass = 'block font-lato text-xs tracking-[0.15em] uppercase mb-2'
  const labelStyle = { color: 'rgba(255,255,255,0.4)' }

  if (loading) return <PageLoader />

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl text-white mb-1">Hero Slides</h1>
          <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {slides.length} slide{slides.length !== 1 ? 's' : ''} &mdash; shown on the homepage hero section
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingId(null); reset({ active: true, accent: 'gold', ctaHref: '/contact', ctaSecondaryHref: '/rooms' }) }}
            className="flex items-center gap-2 px-5 py-2.5 font-lato text-xs tracking-[0.2em] uppercase"
            style={{ background: '#C9A96E', color: '#0B0B0B' }}
          >
            <Plus size={15} /> Add Slide
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 p-6 border" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.22)' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-playfair text-xl text-white">{editingId ? 'Edit Slide' : 'New Slide'}</h2>
            <button onClick={cancelForm} style={{ color: 'rgba(255,255,255,0.35)' }}><X size={18} /></button>
          </div>

          {serverError && (
            <div className="mb-4 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 font-lato text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Desktop Image */}
            <div>
              <label className={labelClass} style={labelStyle}>Desktop Image *</label>
              <div className="flex gap-2">
                <input
                  {...register('desktopImage', { required: 'Required' })}
                  className={inputClass} style={{ ...inputStyle, flex: 1 }}
                  placeholder="/uploads/hero/slide.webp"
                />
                <input
                  ref={desktopFileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={e => handleFileUpload(e, 'desktopImage')}
                />
                <button
                  type="button"
                  onClick={() => desktopFileRef.current?.click()}
                  disabled={uploadingDesktop}
                  className="flex items-center gap-1.5 px-4 py-2.5 font-lato text-xs tracking-[0.15em] uppercase flex-shrink-0 disabled:opacity-50 transition-opacity"
                  style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)', color: '#C9A96E' }}
                >
                  {uploadingDesktop
                    ? <span className="w-3 h-3 border border-t-transparent rounded-full animate-spin" style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
                    : <Upload size={13} />}
                  {uploadingDesktop ? 'Uploading…' : 'Upload'}
                </button>
              </div>
              {errors.desktopImage && <p className="font-lato text-xs mt-1 text-red-400">{errors.desktopImage.message}</p>}
              {watchedDesktop && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="relative w-28 h-16 overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
                    <Image src={watchedDesktop} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                  <button type="button" onClick={() => setValue('desktopImage', '')} className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Remove</button>
                </div>
              )}
            </div>

            {/* Mobile Image */}
            <div>
              <label className={labelClass} style={labelStyle}>
                Mobile Image{' '}
                <span style={{ color: 'rgba(255,255,255,0.22)', textTransform: 'none', letterSpacing: 0 }}>
                  (optional — uses desktop image if empty)
                </span>
              </label>
              <div className="flex gap-2">
                <input
                  {...register('mobileImage')}
                  className={inputClass} style={{ ...inputStyle, flex: 1 }}
                  placeholder="/uploads/hero/slide-mobile.webp"
                />
                <input
                  ref={mobileFileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={e => handleFileUpload(e, 'mobileImage')}
                />
                <button
                  type="button"
                  onClick={() => mobileFileRef.current?.click()}
                  disabled={uploadingMobile}
                  className="flex items-center gap-1.5 px-4 py-2.5 font-lato text-xs tracking-[0.15em] uppercase flex-shrink-0 disabled:opacity-50 transition-opacity"
                  style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)', color: '#C9A96E' }}
                >
                  {uploadingMobile
                    ? <span className="w-3 h-3 border border-t-transparent rounded-full animate-spin" style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
                    : <Upload size={13} />}
                  {uploadingMobile ? 'Uploading…' : 'Upload'}
                </button>
              </div>
              {watchedMobile && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="relative w-28 h-16 overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
                    <Image src={watchedMobile} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                  <button type="button" onClick={() => setValue('mobileImage', '')} className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Remove</button>
                </div>
              )}
            </div>

            {/* Eyebrow + Accent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Eyebrow Text</label>
                <input
                  {...register('eyebrow')}
                  className={inputClass} style={inputStyle}
                  placeholder="Mount Lavinia, Sri Lanka"
                />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Accent Color</label>
                <select {...register('accent')} className={inputClass} style={inputStyle}>
                  <option value="gold">Gold</option>
                  <option value="white">White</option>
                </select>
              </div>
            </div>

            {/* Title fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Title Line 1</label>
                <input
                  {...register('title')}
                  className={inputClass} style={inputStyle}
                  placeholder="Ocean Meets"
                />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Title Italic (large) *</label>
                <input
                  {...register('titleItalic', { required: 'Required' })}
                  className={inputClass} style={inputStyle}
                  placeholder="Paradise"
                />
                {errors.titleItalic && <p className="font-lato text-xs mt-1 text-red-400">{errors.titleItalic.message}</p>}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Title Line 3</label>
                <input
                  {...register('titleEnd')}
                  className={inputClass} style={inputStyle}
                  placeholder="Luxury Living"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Primary Button Label *</label>
                <input
                  {...register('ctaLabel', { required: 'Required' })}
                  className={inputClass} style={inputStyle}
                  placeholder="Reserve Your Stay"
                />
                {errors.ctaLabel && <p className="font-lato text-xs mt-1 text-red-400">{errors.ctaLabel.message}</p>}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Primary Button URL</label>
                <input {...register('ctaHref')} className={inputClass} style={inputStyle} placeholder="/contact" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Secondary Button Label *</label>
                <input
                  {...register('ctaSecondaryLabel', { required: 'Required' })}
                  className={inputClass} style={inputStyle}
                  placeholder="Explore Rooms"
                />
                {errors.ctaSecondaryLabel && <p className="font-lato text-xs mt-1 text-red-400">{errors.ctaSecondaryLabel.message}</p>}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Secondary Button URL</label>
                <input {...register('ctaSecondaryHref')} className={inputClass} style={inputStyle} placeholder="/rooms" />
              </div>
            </div>

            {/* Active toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                {...register('active')}
                type="checkbox"
                className="w-4 h-4"
                style={{ accentColor: '#C9A96E' }}
              />
              <span className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Show on homepage
              </span>
            </label>

            <div className="flex gap-3 pt-1">
              <button
                type="submit" disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 font-lato text-xs tracking-[0.2em] uppercase disabled:opacity-50"
                style={{ background: '#C9A96E', color: '#0B0B0B' }}
              >
                <Check size={14} />
                {isSubmitting ? 'Saving…' : editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button" onClick={cancelForm}
                className="px-6 py-2.5 font-lato text-xs tracking-[0.2em] uppercase"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slides list */}
      {slides.length === 0 ? (
        <div className="border py-16 text-center" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
          <p className="font-playfair text-xl text-white mb-2">No slides yet</p>
          <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Add your first slide — the homepage will use it instead of the default images.
          </p>
        </div>
      ) : (
        <div className="border" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Order', 'Image', 'Slide Content', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left font-lato text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.3)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slides.map((s, idx) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    className="hover:bg-white/[0.02] transition-colors">

                    {/* Order controls */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => moveSlide(s.id, 'up')}
                          disabled={idx === 0}
                          className="disabled:opacity-20 transition-colors hover:text-white"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                        >
                          <ChevronUp size={15} />
                        </button>
                        <span className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                          {idx + 1}
                        </span>
                        <button
                          onClick={() => moveSlide(s.id, 'down')}
                          disabled={idx === slides.length - 1}
                          className="disabled:opacity-20 transition-colors hover:text-white"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                        >
                          <ChevronDown size={15} />
                        </button>
                      </div>
                    </td>

                    {/* Thumbnail */}
                    <td className="px-5 py-4">
                      {s.desktopImage ? (
                        <div className="relative w-20 h-12 overflow-hidden flex-shrink-0"
                          style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                          <Image src={s.desktopImage} alt={s.titleItalic} fill className="object-cover" unoptimized />
                        </div>
                      ) : (
                        <div className="w-20 h-12 flex items-center justify-center"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <ImageIcon size={14} style={{ color: 'rgba(255,255,255,0.18)' }} />
                        </div>
                      )}
                    </td>

                    {/* Content preview */}
                    <td className="px-5 py-4 max-w-[220px]">
                      {s.eyebrow && (
                        <p className="font-lato text-xs mb-0.5 truncate" style={{ color: 'rgba(201,169,110,0.7)' }}>
                          {s.eyebrow}
                        </p>
                      )}
                      <p className="font-playfair italic text-white truncate">{s.titleItalic}</p>
                      {s.titleEnd && (
                        <p className="font-lato text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {s.titleEnd}
                        </p>
                      )}
                    </td>

                    {/* Active toggle */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleActive(s)}
                        className="flex items-center gap-1.5 px-2.5 py-1 font-lato text-xs transition-all"
                        style={s.active
                          ? { background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.35)', color: '#C9A96E' }
                          : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
                      >
                        {s.active ? <><Eye size={11} /> Live</> : <><EyeOff size={11} /> Hidden</>}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => startEdit(s)}
                          className="transition-colors hover:text-white"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.titleItalic)}
                          className="transition-colors hover:text-red-400"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
