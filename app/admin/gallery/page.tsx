'use client'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Plus, Trash2, Check, X, Upload, Image as ImageIcon,
  CheckCircle, Clock, Eye, EyeOff, Star,
} from 'lucide-react'
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
  span: number
  year: number | null
  approved: boolean
  createdAt: string
}

type Tab = 'pending' | 'approved' | 'all'
type EntryForm = {
  guestName: string; email: string; title: string
  image: string; roomType: string; rating: string; review: string
  span: string; year: string
}

const ROOM_TYPES = ['A/C Room', 'Non A/C Room', 'Family Room', 'Full Villa']
const GOLD = '#C9A96E'

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: GOLD, borderTopColor: 'transparent' }} />
    </div>
  )
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12}
          fill={i < rating ? GOLD : 'none'}
          style={{ color: i < rating ? GOLD : 'rgba(255,255,255,0.15)' }} />
      ))}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-lato text-sm font-bold"
      style={{ background: 'rgba(201,169,110,0.15)', color: GOLD, border: '1px solid rgba(201,169,110,0.25)' }}>
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

/* ── Pending review card ─────────────────────────────────────── */
function PendingCard({ review, onApprove, onDelete }: {
  review: GalleryReview
  onApprove: () => void
  onDelete: () => void
}) {
  const [approving, setApproving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const approve = async () => { setApproving(true); await onApprove(); setApproving(false) }
  const remove = async () => { setDeleting(true); await onDelete(); setDeleting(false) }

  return (
    <div className="p-5 border transition-all duration-300 hover:border-luxury-gold/20"
      style={{
        background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)',
        borderColor: 'rgba(245,158,11,0.2)',
      }}>
      {/* Pending badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-1.5 px-2 py-1 font-lato text-[10px] tracking-widest uppercase"
          style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.25)' }}>
          <Clock size={9} /> Awaiting Approval
        </span>
        <span className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {new Date(review.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>

      <div className="flex gap-4">
        {/* Thumbnail */}
        {review.image ? (
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image src={review.image} alt={review.title} fill className="object-cover" unoptimized />
          </div>
        ) : (
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <ImageIcon size={20} style={{ color: 'rgba(255,255,255,0.15)' }} />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1">
            <Avatar name={review.guestName} />
            <div>
              <p className="font-lato text-sm font-semibold text-white">{review.guestName}</p>
              <p className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{review.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 my-2">
            <StarRow rating={review.rating} />
            <span className="font-lato text-xs px-2 py-0.5"
              style={{ background: 'rgba(201,169,110,0.08)', color: GOLD }}>
              {review.roomType}
            </span>
          </div>
          <p className="font-playfair text-sm text-white mb-1 italic">&ldquo;{review.title}&rdquo;</p>
          <p className="font-lato text-xs leading-relaxed line-clamp-2"
            style={{ color: 'rgba(255,255,255,0.45)' }}>
            {review.review}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button
          onClick={approve}
          disabled={approving}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 font-lato text-xs tracking-[0.2em] uppercase transition-all duration-200 disabled:opacity-60"
          style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(16,185,129,0.2)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(16,185,129,0.12)' }}
        >
          {approving
            ? <span className="w-3 h-3 border border-t-transparent rounded-full animate-spin" style={{ borderColor: '#10B981', borderTopColor: 'transparent' }} />
            : <CheckCircle size={13} />}
          Approve & Publish
        </button>
        <button
          onClick={remove}
          disabled={deleting}
          className="flex items-center justify-center gap-2 px-4 py-2.5 font-lato text-xs tracking-[0.2em] uppercase transition-all duration-200 disabled:opacity-60"
          style={{ background: 'rgba(239,68,68,0.08)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}
        >
          {deleting
            ? <span className="w-3 h-3 border border-t-transparent rounded-full animate-spin" style={{ borderColor: '#EF4444', borderTopColor: 'transparent' }} />
            : <Trash2 size={13} />}
          Delete
        </button>
      </div>
    </div>
  )
}

/* ── Main page ───────────────────────────────────────────────── */
export default function AdminGalleryPage() {
  const [reviews, setReviews] = useState<GalleryReview[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('pending')
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

  const pending  = reviews.filter((r) => !r.approved)
  const approved = reviews.filter((r) => r.approved)
  const filtered = tab === 'pending' ? pending : tab === 'approved' ? approved : reviews

  async function handleApprove(review: GalleryReview) {
    const res = await fetch(`/api/gallery/reviews/${review.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: !review.approved }),
    })
    if (res.ok)
      setReviews((prev) => prev.map((r) => r.id === review.id ? { ...r, approved: !r.approved } : r))
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/gallery/reviews/${id}`, { method: 'DELETE' })
    if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id))
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const json = await res.json()
    if (res.ok) setValue('image', json.url)
    else setServerError(json.error ?? 'Upload failed')
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const onSubmit = async (data: EntryForm) => {
    setServerError('')
    const ratingNum = parseInt(data.rating)
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) { setServerError('Rating must be between 1 and 5'); return }
    const spanNum = parseInt(data.span) || 1
    const yearNum = data.year ? parseInt(data.year) : new Date().getFullYear()
    const res = await fetch('/api/gallery/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, rating: ratingNum, span: spanNum, year: yearNum, approved: true }),
    })
    if (!res.ok) { const json = await res.json(); setServerError(json.error ?? 'Failed to create entry'); return }
    reset(); setShowForm(false); fetchReviews()
  }

  const inputClass = 'w-full px-4 py-2.5 font-lato text-sm text-white outline-none'
  const inputStyle = { background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }
  const labelClass = 'block font-lato text-xs tracking-[0.15em] uppercase mb-2'
  const labelStyle = { color: 'rgba(255,255,255,0.4)' }

  if (loading) return <PageLoader />

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="font-playfair text-3xl text-white mb-1">Gallery Reviews</h1>
          <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Approve customer submissions before they appear on the website
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setServerError(''); reset() }}
            className="flex items-center gap-2 px-5 py-2.5 font-lato text-xs tracking-[0.2em] uppercase flex-shrink-0"
            style={{ background: GOLD, color: '#0B0B0B' }}
          >
            <Plus size={15} /> Add Entry
          </button>
        )}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total Reviews', value: reviews.length, color: 'rgba(255,255,255,0.5)' },
          { label: 'Pending Approval', value: pending.length, color: '#F59E0B', alert: pending.length > 0 },
          { label: 'Published', value: approved.length, color: '#10B981' },
        ].map((s) => (
          <div key={s.label} className="px-4 py-3 border"
            style={{
              background: s.alert ? 'rgba(245,158,11,0.05)' : 'rgba(255,255,255,0.02)',
              borderColor: s.alert ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.06)',
            }}>
            <p className="font-playfair text-2xl" style={{ color: s.color }}>{s.value}</p>
            <p className="font-lato text-[10px] tracking-widest uppercase mt-0.5"
              style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <div className="mb-8 p-6 border"
          style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.22)' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-playfair text-xl text-white">New Gallery Entry</h2>
            <button onClick={() => { setShowForm(false); setServerError(''); reset() }} style={{ color: 'rgba(255,255,255,0.35)' }}>
              <X size={18} />
            </button>
          </div>
          {serverError && (
            <div className="mb-4 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 font-lato text-sm">{serverError}</div>
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
            <div>
              <label className={labelClass} style={labelStyle}>Image</label>
              <div className="flex gap-2">
                <input {...register('image')} className={inputClass} style={{ ...inputStyle, flex: 1 }} placeholder="https://... or /uploads/..." />
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileUpload} />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="flex items-center gap-1.5 px-4 py-2.5 font-lato text-xs tracking-[0.15em] uppercase flex-shrink-0 disabled:opacity-50"
                  style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)', color: GOLD }}>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Rating (1–5) *</label>
                <input {...register('rating', { required: 'Required' })} type="number" min="1" max="5"
                  className={inputClass} style={inputStyle} placeholder="5" />
                {errors.rating && <p className="font-lato text-xs mt-1 text-red-400">{errors.rating.message}</p>}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Card Size (1–3)</label>
                <select {...register('span')} className={inputClass} style={{ ...inputStyle, background: '#0B0B0B' }}>
                  <option value="1">1 — Small</option>
                  <option value="2">2 — Medium</option>
                  <option value="3">3 — Large</option>
                </select>
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Year</label>
                <input {...register('year')} type="number" min="2020" max="2099"
                  className={inputClass} style={inputStyle} placeholder={String(new Date().getFullYear())} />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Review / Caption *</label>
              <textarea {...register('review', { required: 'Required' })} rows={3}
                className={inputClass + ' resize-none'} style={inputStyle} placeholder="Guest review or photo caption..." />
              {errors.review && <p className="font-lato text-xs mt-1 text-red-400">{errors.review.message}</p>}
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 font-lato text-xs tracking-[0.2em] uppercase disabled:opacity-50"
                style={{ background: GOLD, color: '#0B0B0B' }}>
                <Check size={14} />
                {isSubmitting ? 'Publishing…' : 'Publish Entry'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setServerError(''); reset() }}
                className="px-6 py-2.5 font-lato text-xs tracking-[0.2em] uppercase"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 flex-wrap">
        {([
          { key: 'pending',  label: 'Pending',  count: pending.length,   alert: pending.length > 0 },
          { key: 'approved', label: 'Published', count: approved.length,  alert: false },
          { key: 'all',      label: 'All',       count: reviews.length,   alert: false },
        ] as const).map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="flex items-center gap-2 px-4 py-2 font-lato text-xs tracking-[0.15em] uppercase transition-all duration-200"
            style={tab === t.key
              ? { background: 'rgba(201,169,110,0.15)', color: GOLD, border: '1px solid rgba(201,169,110,0.35)' }
              : { color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {t.label}
            <span className="px-1.5 py-0.5 font-lato text-[9px] rounded-sm"
              style={{
                background: t.alert ? 'rgba(245,158,11,0.2)' : tab === t.key ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.06)',
                color: t.alert ? '#F59E0B' : tab === t.key ? GOLD : 'rgba(255,255,255,0.3)',
              }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Pending: card view ───────────────────────────────────── */}
      {tab === 'pending' && (
        filtered.length === 0 ? (
          <div className="border py-16 text-center"
            style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
            <CheckCircle size={32} className="mx-auto mb-3" style={{ color: '#10B981', opacity: 0.5 }} />
            <p className="font-playfair text-xl text-white mb-1">All caught up!</p>
            <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No pending reviews to approve.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((review) => (
              <PendingCard
                key={review.id}
                review={review}
                onApprove={() => handleApprove(review)}
                onDelete={() => handleDelete(review.id, review.title)}
              />
            ))}
          </div>
        )
      )}

      {/* ── Approved / All: table view ───────────────────────────── */}
      {(tab === 'approved' || tab === 'all') && (
        filtered.length === 0 ? (
          <div className="border py-16 text-center"
            style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
            <p className="font-playfair text-xl text-white mb-2">No entries yet</p>
            <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Add your first gallery entry using the button above.</p>
          </div>
        ) : (
          <div className="border"
            style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {['Photo', 'Guest', 'Room', 'Rating', 'Review', 'Date', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3.5 text-left font-lato text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: 'rgba(255,255,255,0.3)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((review) => (
                    <tr key={review.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-4">
                        {review.image ? (
                          <div className="relative w-14 h-10 overflow-hidden flex-shrink-0"
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                            <Image src={review.image} alt={review.title} fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <div className="w-14 h-10 flex items-center justify-center"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <ImageIcon size={14} style={{ color: 'rgba(255,255,255,0.18)' }} />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-lato text-sm text-white whitespace-nowrap">{review.guestName}</p>
                        <p className="font-lato text-xs mt-0.5 italic" style={{ color: 'rgba(201,169,110,0.7)' }}>{review.title}</p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="font-lato text-xs px-2 py-0.5"
                          style={{ background: 'rgba(201,169,110,0.08)', color: GOLD }}>{review.roomType}</span>
                      </td>
                      <td className="px-4 py-4"><StarRow rating={review.rating} /></td>
                      <td className="px-4 py-4 max-w-[180px]">
                        <p className="font-lato text-xs line-clamp-2 italic"
                          style={{ color: 'rgba(255,255,255,0.4)' }}>&ldquo;{review.review}&rdquo;</p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {new Date(review.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-lato text-xs px-2 py-0.5" style={{
                          background: review.approved ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                          color: review.approved ? '#10B981' : '#F59E0B',
                          border: `1px solid ${review.approved ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`,
                        }}>
                          {review.approved ? 'Published' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleApprove(review)}
                            title={review.approved ? 'Unpublish' : 'Publish'}
                            className="transition-colors duration-200"
                            style={{ color: review.approved ? 'rgba(255,255,255,0.3)' : '#10B981' }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                            {review.approved ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                          <button onClick={() => handleDelete(review.id, review.title)}
                            title="Delete" className="hover:text-red-400 transition-colors duration-200"
                            style={{ color: 'rgba(255,255,255,0.3)' }}>
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
        )
      )}
    </div>
  )
}
