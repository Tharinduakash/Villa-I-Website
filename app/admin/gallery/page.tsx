'use client'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, Check, X, Eye, EyeOff, Upload, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface GalleryReview {
  id: string
  guestName: string
  email: string
  title: string
  image: string | null
  roomType: string
  rating: number
  review: string
  approved: boolean
  createdAt: string
}

type Tab = 'all' | 'pending' | 'approved'

type EntryForm = {
  guestName: string
  email: string
  title: string
  image: string
  roomType: string
  rating: string
  review: string
}

const ROOM_TYPES = ['A/C Room', 'Non A/C Room', 'Family Room', 'Full Villa']
const GOLD = '#C9A96E'

export default function AdminGalleryPage() {
  const [reviews, setReviews] = useState<GalleryReview[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('all')
  const [showForm, setShowForm] = useState(false)
  const [serverError, setServerError] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const {
    register, handleSubmit, reset, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm<EntryForm>()

  const watchedImage = watch('image')

  const fetchReviews = () =>
    fetch('/api/gallery/reviews', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => { setReviews(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))

  useEffect(() => { fetchReviews() }, [])

  const filtered = reviews.filter((r) => {
    if (tab === 'pending') return !r.approved
    if (tab === 'approved') return r.approved
    return true
  })

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => !r.approved).length,
    approved: reviews.filter((r) => r.approved).length,
  }

  async function handleToggleApprove(review: GalleryReview) {
    const res = await fetch(`/api/gallery/reviews/${review.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: !review.approved }),
    })
    if (res.ok) {
      setReviews((prev) =>
        prev.map((r) => (r.id === review.id ? { ...r, approved: !r.approved } : r)),
      )
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/gallery/reviews/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id))
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const json = await res.json()
    if (res.ok) {
      setValue('image', json.url)
    } else {
      setServerError(json.error ?? 'Upload failed')
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const onSubmit = async (data: EntryForm) => {
    setServerError('')
    const ratingNum = parseInt(data.rating)
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      setServerError('Rating must be between 1 and 5')
      return
    }
    const payload = { ...data, rating: ratingNum, approved: true }
    const res = await fetch('/api/gallery/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const json = await res.json()
      setServerError(json.error ?? 'Failed to create entry')
      return
    }
    reset()
    setShowForm(false)
    fetchReviews()
  }

  const inputClass = 'w-full px-4 py-2.5 font-lato text-sm text-white outline-none'
  const inputStyle = { background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }
  const labelClass = 'block font-lato text-xs tracking-[0.15em] uppercase mb-2'
  const labelStyle = { color: 'rgba(255,255,255,0.4)' }

  if (loading) return <PageLoader />

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair text-3xl text-white mb-1">Gallery Reviews</h1>
          <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Manage guest submissions and gallery entries
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setServerError(''); reset() }}
            className="flex items-center gap-2 px-5 py-2.5 font-lato text-xs tracking-[0.2em] uppercase"
            style={{ background: GOLD, color: '#0B0B0B' }}
          >
            <Plus size={15} /> Add Entry
          </button>
        )}
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <div
          className="mb-8 p-6 border"
          style={{
            background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)',
            borderColor: 'rgba(201,169,110,0.22)',
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-playfair text-xl text-white">New Gallery Entry</h2>
            <button onClick={() => { setShowForm(false); setServerError(''); reset() }} style={{ color: 'rgba(255,255,255,0.35)' }}>
              <X size={18} />
            </button>
          </div>

          {serverError && (
            <div className="mb-4 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 font-lato text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Guest Name *</label>
                <input {...register('guestName', { required: 'Required' })} className={inputClass} style={inputStyle} placeholder="Guest full name" />
                {errors.guestName && <p className="font-lato text-xs mt-1 text-red-400">{errors.guestName.message}</p>}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Email *</label>
                <input {...register('email', { required: 'Required' })} type="email" className={inputClass} style={inputStyle} placeholder="guest@email.com" />
                {errors.email && <p className="font-lato text-xs mt-1 text-red-400">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Photo Title *</label>
                <input {...register('title', { required: 'Required' })} className={inputClass} style={inputStyle} placeholder="Beautiful sunset view" />
                {errors.title && <p className="font-lato text-xs mt-1 text-red-400">{errors.title.message}</p>}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Room Type *</label>
                <select {...register('roomType', { required: 'Required' })} className={inputClass} style={{ ...inputStyle, background: '#0B0B0B' }}>
                  <option value="">Select room type</option>
                  {ROOM_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.roomType && <p className="font-lato text-xs mt-1 text-red-400">{errors.roomType.message}</p>}
              </div>
            </div>

            {/* Image */}
            <div>
              <label className={labelClass} style={labelStyle}>Image</label>
              <div className="flex gap-2">
                <input {...register('image')} className={inputClass} style={{ ...inputStyle, flex: 1 }} placeholder="https://... or /uploads/..." />
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleFileUpload} />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-1.5 px-4 py-2.5 font-lato text-xs tracking-[0.15em] uppercase flex-shrink-0 disabled:opacity-50"
                  style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)', color: GOLD }}
                >
                  {uploading ? <span className="w-3 h-3 border border-t-transparent rounded-full animate-spin" style={{ borderColor: GOLD, borderTopColor: 'transparent' }} /> : <Upload size={13} />}
                  {uploading ? 'Uploading…' : 'Upload'}
                </button>
              </div>
              {watchedImage && (
                <div className="mt-2 relative w-24 h-16 overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Image src={watchedImage} alt="Preview" fill className="object-cover" unoptimized />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Rating (1–5) *</label>
                <input
                  {...register('rating', { required: 'Required', min: { value: 1, message: 'Min 1' }, max: { value: 5, message: 'Max 5' } })}
                  type="number" min="1" max="5"
                  className={inputClass} style={inputStyle}
                  placeholder="5"
                />
                {errors.rating && <p className="font-lato text-xs mt-1 text-red-400">{errors.rating.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass} style={labelStyle}>Review / Caption *</label>
              <textarea {...register('review', { required: 'Required' })} rows={3} className={inputClass + ' resize-none'} style={inputStyle} placeholder="Guest review or photo caption..." />
              {errors.review && <p className="font-lato text-xs mt-1 text-red-400">{errors.review.message}</p>}
            </div>

            <div className="flex gap-3">
              <button
                type="submit" disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 font-lato text-xs tracking-[0.2em] uppercase disabled:opacity-50"
                style={{ background: GOLD, color: '#0B0B0B' }}
              >
                <Check size={14} />
                {isSubmitting ? 'Publishing…' : 'Publish Entry'}
              </button>
              <button
                type="button" onClick={() => { setShowForm(false); setServerError(''); reset() }}
                className="px-6 py-2.5 font-lato text-xs tracking-[0.2em] uppercase"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {(['all', 'pending', 'approved'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex items-center gap-2 px-4 py-2 font-lato text-xs tracking-[0.15em] uppercase transition-all duration-200"
            style={
              tab === t
                ? { background: 'rgba(201,169,110,0.15)', color: GOLD, border: '1px solid rgba(201,169,110,0.35)' }
                : { color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.07)' }
            }
          >
            {t}
            <span
              className="px-1.5 py-0.5 font-lato text-[9px] rounded-sm"
              style={{
                background: tab === t ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.06)',
                color: tab === t ? GOLD : 'rgba(255,255,255,0.3)',
              }}
            >
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div
          className="border py-16 text-center"
          style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}
        >
          <p className="font-playfair text-xl text-white mb-2">
            {tab === 'pending' ? 'No pending reviews' : tab === 'approved' ? 'No published entries' : 'No entries yet'}
          </p>
          <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {tab === 'pending' ? 'All customer submissions have been reviewed.' : 'Add your first gallery entry using the button above.'}
          </p>
        </div>
      ) : (
        <div
          className="border overflow-hidden"
          style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Photo', 'Guest', 'Room', 'Rating', 'Review', 'Date', 'Status', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3.5 text-left font-lato text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((review) => (
                  <tr
                    key={review.id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Photo */}
                    <td className="px-4 py-4">
                      {review.image ? (
                        <div
                          className="relative w-14 h-10 overflow-hidden flex-shrink-0"
                          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <Image src={review.image} alt={review.title} fill className="object-cover" unoptimized />
                        </div>
                      ) : (
                        <div
                          className="w-14 h-10 flex items-center justify-center"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          <ImageIcon size={14} style={{ color: 'rgba(255,255,255,0.18)' }} />
                        </div>
                      )}
                    </td>
                    {/* Guest */}
                    <td className="px-4 py-4">
                      <p className="font-lato text-sm text-white whitespace-nowrap">{review.guestName}</p>
                      <p className="font-lato text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{review.email}</p>
                      <p className="font-lato text-xs mt-0.5 italic" style={{ color: 'rgba(201,169,110,0.7)' }}>{review.title}</p>
                    </td>
                    {/* Room */}
                    <td className="px-4 py-4">
                      <span
                        className="font-lato text-xs px-2 py-0.5 whitespace-nowrap"
                        style={{ background: 'rgba(201,169,110,0.08)', color: GOLD }}
                      >
                        {review.roomType}
                      </span>
                    </td>
                    {/* Rating */}
                    <td className="px-4 py-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} style={{ color: i < review.rating ? GOLD : 'rgba(255,255,255,0.12)', fontSize: '12px' }}>★</span>
                        ))}
                      </div>
                    </td>
                    {/* Review */}
                    <td className="px-4 py-4 max-w-[200px]">
                      <p
                        className="font-lato text-xs line-clamp-2 italic"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                      >
                        &ldquo;{review.review}&rdquo;
                      </p>
                    </td>
                    {/* Date */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {new Date(review.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className="font-lato text-xs px-2 py-0.5"
                        style={{
                          background: review.approved ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                          color: review.approved ? '#10B981' : '#F59E0B',
                          border: `1px solid ${review.approved ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`,
                        }}
                      >
                        {review.approved ? 'Published' : 'Pending'}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleApprove(review)}
                          title={review.approved ? 'Unpublish' : 'Approve & Publish'}
                          className="transition-colors duration-200"
                          style={{ color: review.approved ? 'rgba(255,255,255,0.35)' : '#10B981' }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                        >
                          {review.approved ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <button
                          onClick={() => handleDelete(review.id, review.title)}
                          title="Delete"
                          className="hover:text-red-400 transition-colors duration-200"
                          style={{ color: 'rgba(255,255,255,0.35)' }}
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

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div
        className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }}
      />
    </div>
  )
}
