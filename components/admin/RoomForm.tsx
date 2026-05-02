'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Plus, X, ArrowLeft, Upload, Image as ImageIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface RoomFormData {
  name: string
  shortName: string
  description: string
  pricePerNight: number
  priceLabel: string
  image: string
  capacity: string
  size: string
  available: boolean
}

interface Props {
  defaultValues?: Partial<RoomFormData & { features: string[]; images: string[] }>
  roomId?: string
}

const GOLD = '#C9A96E'

/* ── Reusable single-image uploader ─────────────────────────── */
function ImageUploader({
  value,
  onChange,
  label,
  required,
  folder = 'rooms',
}: {
  value: string
  onChange: (url: string) => void
  label: string
  required?: boolean
  folder?: string
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`/api/upload?folder=${folder}`, { method: 'POST', body: fd })
    const json = await res.json()
    if (res.ok) onChange(json.url)
    else setError(json.error ?? 'Upload failed')
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div>
      <label className="block font-lato text-xs tracking-[0.15em] uppercase mb-2"
        style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}{required && ' *'}
      </label>

      {/* Preview */}
      {value ? (
        <div className="relative mb-3 group" style={{ width: '100%', aspectRatio: '16/9', maxHeight: 200 }}>
          <div className="relative w-full h-full overflow-hidden"
            style={{ border: '1px solid rgba(201,169,110,0.2)' }}>
            <Image src={value} alt="Room image" fill className="object-cover" unoptimized />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(239,68,68,0.85)', color: '#fff' }}
              title="Remove image"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          className="flex flex-col items-center justify-center gap-2 mb-3 cursor-pointer transition-colors duration-200"
          style={{
            border: '1px dashed rgba(201,169,110,0.25)',
            background: 'rgba(201,169,110,0.03)',
            padding: '32px 16px',
          }}
          onClick={() => fileRef.current?.click()}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.25)')}
        >
          <ImageIcon size={28} style={{ color: 'rgba(201,169,110,0.4)' }} />
          <p className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Click to upload an image
          </p>
          <p className="font-lato text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            JPG, PNG, WebP · max 5 MB
          </p>
        </div>
      )}

      {/* Upload button */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste an image URL…"
          className="flex-1 px-4 py-2.5 font-lato text-sm text-white outline-none"
          style={{ background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFile}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-4 py-2.5 font-lato text-xs tracking-[0.15em] uppercase flex-shrink-0 disabled:opacity-50 transition-opacity"
          style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)', color: GOLD }}
        >
          {uploading
            ? <span className="w-3 h-3 border border-t-transparent rounded-full animate-spin"
                style={{ borderColor: GOLD, borderTopColor: 'transparent' }} />
            : <Upload size={13} />}
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      {error && <p className="font-lato text-xs mt-1 text-red-400">{error}</p>}
    </div>
  )
}

/* ── Gallery images uploader ─────────────────────────────────── */
function GalleryUploader({
  images,
  onChange,
}: {
  images: string[]
  onChange: (imgs: string[]) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState('')

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    setError('')
    const urls: string[] = []
    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload?folder=rooms', { method: 'POST', body: fd })
      const json = await res.json()
      if (res.ok) urls.push(json.url)
      else { setError(json.error ?? 'Upload failed'); break }
    }
    onChange([...images, ...urls])
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  function addUrl() {
    const val = urlInput.trim()
    if (val && !images.includes(val)) onChange([...images, val])
    setUrlInput('')
  }

  function remove(url: string) {
    onChange(images.filter((x) => x !== url))
  }

  return (
    <div>
      <label className="block font-lato text-xs tracking-[0.15em] uppercase mb-2"
        style={{ color: 'rgba(255,255,255,0.4)' }}>
        Additional Images (Gallery)
      </label>

      {/* Upload multiple button */}
      <div className="flex gap-2 mb-3">
        <input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addUrl() } }}
          placeholder="Paste image URL and press Enter…"
          className="flex-1 px-4 py-2.5 font-lato text-sm text-white outline-none"
          style={{ background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        <button type="button" onClick={addUrl}
          className="flex items-center gap-1.5 px-4 py-2.5 font-lato text-xs tracking-wider uppercase flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Plus size={13} /> Add URL
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-4 py-2.5 font-lato text-xs tracking-[0.15em] uppercase flex-shrink-0 disabled:opacity-50"
          style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)', color: GOLD }}
        >
          {uploading
            ? <span className="w-3 h-3 border border-t-transparent rounded-full animate-spin"
                style={{ borderColor: GOLD, borderTopColor: 'transparent' }} />
            : <Upload size={13} />}
          {uploading ? 'Uploading…' : 'Upload Photos'}
        </button>
      </div>
      {error && <p className="font-lato text-xs mb-2 text-red-400">{error}</p>}

      {/* Thumbnail grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {images.map((url, i) => (
            <div key={i} className="relative group" style={{ aspectRatio: '4/3' }}>
              <div className="relative w-full h-full overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <Image src={url} alt={`Gallery ${i + 1}`} fill className="object-cover" unoptimized />
              </div>
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute top-1 right-1 flex items-center justify-center w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(239,68,68,0.85)', color: '#fff' }}
              >
                <Trash2 size={10} />
              </button>
              <span className="absolute bottom-1 left-1 font-lato text-[8px] px-1"
                style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.6)' }}>
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
          No gallery images yet — upload photos or paste URLs above
        </p>
      )}
    </div>
  )
}

/* ── Main form ───────────────────────────────────────────────── */
export default function RoomForm({ defaultValues, roomId }: Props) {
  const router = useRouter()
  const [features, setFeatures] = useState<string[]>(defaultValues?.features ?? [])
  const [featureInput, setFeatureInput] = useState('')
  const [mainImage, setMainImage] = useState(defaultValues?.image ?? '')
  const [images, setImages] = useState<string[]>(defaultValues?.images ?? [])
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RoomFormData>({
    defaultValues: {
      name: defaultValues?.name ?? '',
      shortName: defaultValues?.shortName ?? '',
      description: defaultValues?.description ?? '',
      pricePerNight: defaultValues?.pricePerNight ?? 0,
      priceLabel: defaultValues?.priceLabel ?? '',
      image: defaultValues?.image ?? '',
      capacity: defaultValues?.capacity ?? '',
      size: defaultValues?.size ?? '',
      available: defaultValues?.available ?? true,
    },
  })

  function addFeature() {
    const val = featureInput.trim()
    if (val && !features.includes(val)) setFeatures((prev) => [...prev, val])
    setFeatureInput('')
  }

  const onSubmit = async (data: RoomFormData) => {
    setServerError('')
    const payload = { ...data, image: mainImage || data.image, features, images }
    const url = roomId ? `/api/rooms/${roomId}` : '/api/rooms'
    const res = await fetch(url, {
      method: roomId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const json = await res.json()
      setServerError(json.error ?? 'Failed to save room')
      return
    }
    router.push('/admin/rooms')
  }

  const inputClass = 'w-full px-4 py-2.5 font-lato text-sm text-white outline-none transition-colors duration-200'
  const inputStyle = { background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }
  const labelClass = 'block font-lato text-xs tracking-[0.15em] uppercase mb-2'
  const labelStyle = { color: 'rgba(255,255,255,0.4)' }
  const cardStyle = {
    background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)',
    borderColor: 'rgba(201,169,110,0.14)',
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/rooms"
          className="inline-flex items-center gap-2 font-lato text-xs tracking-wider uppercase mb-5 transition-colors"
          style={{ color: 'rgba(255,255,255,0.35)' }}>
          <ArrowLeft size={13} /> Back to Rooms
        </Link>
        <h1 className="font-playfair text-3xl text-white">
          {roomId ? 'Edit Room' : 'Add New Room'}
        </h1>
      </div>

      {serverError && (
        <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 font-lato text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Basic Info */}
        <div className="p-6 border" style={cardStyle}>
          <h2 className="font-playfair text-lg text-white mb-5">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} style={labelStyle}>Room Name *</label>
              <input {...register('name', { required: 'Required' })}
                className={inputClass}
                style={{ ...inputStyle, borderColor: errors.name ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)' }}
                placeholder="Air Conditioned Room" />
              {errors.name && <p className="font-lato text-xs mt-1 text-red-400">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Short Name *</label>
              <input {...register('shortName', { required: 'Required' })}
                className={inputClass} style={inputStyle} placeholder="A/C Room" />
            </div>
          </div>
          <div className="mt-5">
            <label className={labelClass} style={labelStyle}>Description *</label>
            <textarea {...register('description', { required: 'Required' })}
              rows={3} className={inputClass + ' resize-none'} style={inputStyle}
              placeholder="A serene retreat with modern amenities…" />
          </div>
        </div>

        {/* Pricing & Details */}
        <div className="p-6 border" style={cardStyle}>
          <h2 className="font-playfair text-lg text-white mb-5">Pricing & Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} style={labelStyle}>Price Per Night (USD) *</label>
              <input {...register('pricePerNight', { required: 'Required', min: 0, valueAsNumber: true })}
                type="number" step="0.01" min="0"
                className={inputClass} style={inputStyle} placeholder="45" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Price Label</label>
              <input {...register('priceLabel')}
                className={inputClass} style={inputStyle} placeholder="From $45/night" />
              <p className="font-lato text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Shown on the website</p>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Capacity *</label>
              <input {...register('capacity', { required: 'Required' })}
                className={inputClass} style={inputStyle} placeholder="2 Guests" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Room Size *</label>
              <input {...register('size', { required: 'Required' })}
                className={inputClass} style={inputStyle} placeholder="25 sqm" />
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <input {...register('available')} type="checkbox" id="available" className="w-4 h-4 accent-luxury-gold" />
            <label htmlFor="available" className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Room is available for booking
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="p-6 border space-y-6" style={cardStyle}>
          <h2 className="font-playfair text-lg text-white">Room Images</h2>

          {/* Main image */}
          <ImageUploader
            label="Main Cover Image"
            required
            value={mainImage}
            onChange={setMainImage}
            folder="rooms"
          />

          <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

          {/* Gallery */}
          <GalleryUploader images={images} onChange={setImages} />
        </div>

        {/* Features */}
        <div className="p-6 border" style={cardStyle}>
          <h2 className="font-playfair text-lg text-white mb-5">Features / Amenities</h2>
          <div className="flex gap-2 mb-4">
            <input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature() } }}
              className={inputClass + ' flex-1'} style={inputStyle}
              placeholder="e.g. Air Conditioning"
            />
            <button type="button" onClick={addFeature}
              className="flex items-center gap-1.5 px-4 py-2.5 font-lato text-xs tracking-wider uppercase flex-shrink-0"
              style={{ background: 'rgba(201,169,110,0.15)', color: GOLD, border: '1px solid rgba(201,169,110,0.2)' }}>
              <Plus size={13} /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((f) => (
              <span key={f} className="flex items-center gap-1.5 px-3 py-1 font-lato text-xs"
                style={{ background: 'rgba(201,169,110,0.08)', color: GOLD, border: '1px solid rgba(201,169,110,0.15)' }}>
                {f}
                <button type="button" onClick={() => setFeatures((p) => p.filter((x) => x !== f))} className="hover:opacity-70">
                  <X size={11} />
                </button>
              </span>
            ))}
            {features.length === 0 && (
              <p className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>No features added yet</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={isSubmitting}
            className="px-8 py-3 font-lato text-xs tracking-[0.25em] uppercase transition-colors duration-200 disabled:opacity-50"
            style={{ background: GOLD, color: '#0B0B0B' }}>
            {isSubmitting ? 'Saving…' : roomId ? 'Update Room' : 'Create Room'}
          </button>
          <Link href="/admin/rooms"
            className="px-8 py-3 font-lato text-xs tracking-[0.25em] uppercase"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
