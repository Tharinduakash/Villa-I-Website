'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Plus, X, ArrowLeft } from 'lucide-react'
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

export default function RoomForm({ defaultValues, roomId }: Props) {
  const router = useRouter()
  const [features, setFeatures] = useState<string[]>(defaultValues?.features ?? [])
  const [featureInput, setFeatureInput] = useState('')
  const [images, setImages] = useState<string[]>(defaultValues?.images ?? [])
  const [imageInput, setImageInput] = useState('')
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
    if (val && !features.includes(val)) {
      setFeatures((prev) => [...prev, val])
    }
    setFeatureInput('')
  }

  function removeFeature(f: string) {
    setFeatures((prev) => prev.filter((x) => x !== f))
  }

  function addImage() {
    const val = imageInput.trim()
    if (val && !images.includes(val)) {
      setImages((prev) => [...prev, val])
    }
    setImageInput('')
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((x) => x !== url))
  }

  const onSubmit = async (data: RoomFormData) => {
    setServerError('')
    const payload = { ...data, features, images }
    const url = roomId ? `/api/rooms/${roomId}` : '/api/rooms'
    const method = roomId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const json = await res.json()
      setServerError(json.error ?? 'Failed to save room')
      return
    }

    router.push('/admin/rooms')
    router.refresh()
  }

  const inputClass = "w-full px-4 py-2.5 font-lato text-sm text-white outline-none transition-colors duration-200"
  const inputStyle = { background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }
  const labelClass = "block font-lato text-xs tracking-[0.15em] uppercase mb-2"
  const labelStyle = { color: 'rgba(255,255,255,0.4)' }

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
        <div className="p-6 border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.05)' }}>
          <h2 className="font-playfair text-lg text-white mb-5">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} style={labelStyle}>Room Name *</label>
              <input {...register('name', { required: 'Required' })}
                className={inputClass} style={{ ...inputStyle, borderColor: errors.name ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)' }}
                placeholder="Air Conditioned Room" />
              {errors.name && <p className="font-lato text-xs mt-1 text-red-400">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Short Name *</label>
              <input {...register('shortName', { required: 'Required' })}
                className={inputClass} style={inputStyle}
                placeholder="A/C Room" />
            </div>
          </div>
          <div className="mt-5">
            <label className={labelClass} style={labelStyle}>Description *</label>
            <textarea {...register('description', { required: 'Required' })}
              rows={3}
              className={inputClass + ' resize-none'} style={inputStyle}
              placeholder="A serene retreat with modern amenities..." />
          </div>
        </div>

        <div className="p-6 border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.05)' }}>
          <h2 className="font-playfair text-lg text-white mb-5">Pricing & Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} style={labelStyle}>Price Per Night (USD) *</label>
              <input {...register('pricePerNight', { required: 'Required', min: { value: 0, message: 'Must be positive' }, valueAsNumber: true })}
                type="number" step="0.01" min="0"
                className={inputClass} style={inputStyle}
                placeholder="45" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Price Label</label>
              <input {...register('priceLabel')}
                className={inputClass} style={inputStyle}
                placeholder="From $45/night" />
              <p className="font-lato text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Displayed on the website</p>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Capacity *</label>
              <input {...register('capacity', { required: 'Required' })}
                className={inputClass} style={inputStyle}
                placeholder="2 Guests" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Room Size *</label>
              <input {...register('size', { required: 'Required' })}
                className={inputClass} style={inputStyle}
                placeholder="25 sqm" />
            </div>
          </div>
          <div className="mt-5">
            <label className={labelClass} style={labelStyle}>Main Image URL *</label>
            <input {...register('image', { required: 'Required' })}
              className={inputClass} style={inputStyle}
              placeholder="https://images.unsplash.com/..." />
          </div>
          <div className="mt-5">
            <label className={labelClass} style={labelStyle}>Additional Images (Gallery)</label>
            <div className="flex gap-2 mb-3">
              <input
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImage() } }}
                className={inputClass + ' flex-1'} style={inputStyle}
                placeholder="https://images.unsplash.com/..."
              />
              <button type="button" onClick={addImage}
                className="flex items-center gap-1.5 px-4 py-2.5 font-lato text-xs tracking-wider uppercase flex-shrink-0"
                style={{ background: 'rgba(201,169,110,0.15)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.2)' }}>
                <Plus size={13} /> Add
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {images.map((url, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 font-lato text-xs"
                  style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.12)' }}>
                  <span className="flex-1 truncate" style={{ color: '#C9A96E' }}>{url}</span>
                  <button type="button" onClick={() => removeImage(url)} className="hover:opacity-70 flex-shrink-0" style={{ color: '#C9A96E' }}>
                    <X size={11} />
                  </button>
                </div>
              ))}
              {images.length === 0 && (
                <p className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>No additional images added yet</p>
              )}
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <input {...register('available')} type="checkbox" id="available"
              className="w-4 h-4 accent-luxury-gold" />
            <label htmlFor="available" className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Room is available for booking
            </label>
          </div>
        </div>

        <div className="p-6 border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.05)' }}>
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
              style={{ background: 'rgba(201,169,110,0.15)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.2)' }}>
              <Plus size={13} /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((f) => (
              <span key={f} className="flex items-center gap-1.5 px-3 py-1 font-lato text-xs"
                style={{ background: 'rgba(201,169,110,0.08)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.15)' }}>
                {f}
                <button type="button" onClick={() => removeFeature(f)} className="hover:opacity-70">
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 font-lato text-xs tracking-[0.25em] uppercase transition-colors duration-200 disabled:opacity-50"
            style={{ background: '#C9A96E', color: '#0B0B0B' }}
          >
            {isSubmitting ? 'Saving...' : roomId ? 'Update Room' : 'Create Room'}
          </button>
          <Link href="/admin/rooms"
            className="px-8 py-3 font-lato text-xs tracking-[0.25em] uppercase transition-colors duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
