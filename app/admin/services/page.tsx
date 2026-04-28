'use client'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Pencil, Trash2, X, Check, Upload, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  image: string
  features: string[]
}

type ServiceForm = {
  title: string
  description: string
  icon: string
  image: string
  features: string
}

export default function AdminServicesPage() {
  const [services,    setServices]    = useState<Service[]>([])
  const [loading,     setLoading]     = useState(true)
  const [editingId,   setEditingId]   = useState<string | null>(null)
  const [showForm,    setShowForm]    = useState(false)
  const [serverError, setServerError] = useState('')
  const [uploading,   setUploading]   = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const {
    register, handleSubmit, reset, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm<ServiceForm>()

  const watchedImage = watch('image')

  const fetchServices = () =>
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => { setServices(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))

  useEffect(() => { fetchServices() }, [])

  function startEdit(s: Service) {
    setEditingId(s.id)
    setShowForm(true)
    setValue('title',       s.title)
    setValue('description', s.description)
    setValue('icon',        s.icon)
    setValue('image',       s.image)
    setValue('features',    s.features.join(', '))
  }

  function cancelForm() {
    setEditingId(null)
    setShowForm(false)
    setServerError('')
    reset()
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

  const onSubmit = async (data: ServiceForm) => {
    setServerError('')
    const features = data.features.split(',').map((f) => f.trim()).filter(Boolean)
    const payload = { ...data, features }
    const url    = editingId ? `/api/services/${editingId}` : '/api/services'
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
    fetchServices()
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  const inputClass = 'w-full px-4 py-2.5 font-lato text-sm text-white outline-none'
  const inputStyle = { background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }
  const labelClass = 'block font-lato text-xs tracking-[0.15em] uppercase mb-2'
  const labelStyle = { color: 'rgba(255,255,255,0.4)' }

  if (loading) return <PageLoader />

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl text-white mb-1">Services</h1>
          <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {services.length} service{services.length !== 1 ? 's' : ''}
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingId(null); reset() }}
            className="flex items-center gap-2 px-5 py-2.5 font-lato text-xs tracking-[0.2em] uppercase"
            style={{ background: '#C9A96E', color: '#0B0B0B' }}
          >
            <Plus size={15} /> Add Service
          </button>
        )}
      </div>

      {/* ── Form ── */}
      {showForm && (
        <div className="mb-8 p-6 border" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.22)' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-playfair text-xl text-white">{editingId ? 'Edit Service' : 'New Service'}</h2>
            <button onClick={cancelForm} style={{ color: 'rgba(255,255,255,0.35)' }}><X size={18} /></button>
          </div>

          {serverError && (
            <div className="mb-4 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 font-lato text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Row 1: Title + Icon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Title *</label>
                <input
                  {...register('title', { required: 'Required' })}
                  className={inputClass} style={inputStyle}
                  placeholder="Luxury Accommodation"
                />
                {errors.title && <p className="font-lato text-xs mt-1 text-red-400">{errors.title.message}</p>}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Icon (emoji) *</label>
                <input
                  {...register('icon', { required: 'Required' })}
                  className={inputClass} style={inputStyle}
                  placeholder="🏨"
                />
              </div>
            </div>

            {/* Row 2: Description */}
            <div>
              <label className={labelClass} style={labelStyle}>Description *</label>
              <textarea
                {...register('description', { required: 'Required' })}
                rows={2} className={inputClass + ' resize-none'} style={inputStyle}
                placeholder="Describe this service..."
              />
            </div>

            {/* Row 3: Image URL + upload */}
            <div>
              <label className={labelClass} style={labelStyle}>Image</label>
              <div className="flex gap-2">
                <input
                  {...register('image')}
                  className={inputClass} style={{ ...inputStyle, flex: 1 }}
                  placeholder="/webp/resturant.webp  or  https://images.unsplash.com/..."
                />
                {/* Hidden file input */}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-1.5 px-4 py-2.5 font-lato text-xs tracking-[0.15em] uppercase flex-shrink-0 disabled:opacity-50 transition-opacity"
                  style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)', color: '#C9A96E' }}
                >
                  {uploading ? (
                    <span className="w-3 h-3 border border-t-transparent rounded-full animate-spin" style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
                  ) : (
                    <Upload size={13} />
                  )}
                  {uploading ? 'Uploading…' : 'Upload'}
                </button>
              </div>
              <p className="font-lato text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.22)' }}>
                Paste a URL or click Upload to choose a file from your device (JPG, PNG, WebP · max 5 MB)
              </p>
              {/* Thumbnail preview */}
              {watchedImage && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="relative w-24 h-16 overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
                    <Image src={watchedImage} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                  <button
                    type="button"
                    onClick={() => setValue('image', '')}
                    className="font-lato text-xs"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Row 4: Features */}
            <div>
              <label className={labelClass} style={labelStyle}>Features (comma-separated)</label>
              <input
                {...register('features')}
                className={inputClass} style={inputStyle}
                placeholder="A/C & Non A/C options, Family suites available"
              />
            </div>

            <div className="flex gap-3">
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

      {/* ── Table ── */}
      {services.length === 0 ? (
        <div className="border py-16 text-center" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
          <p className="font-playfair text-xl text-white mb-2">No services yet</p>
        </div>
      ) : (
        <div className="border overflow-hidden" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {['Image', 'Icon', 'Title', 'Features', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left font-lato text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  className="hover:bg-white/[0.02] transition-colors">
                  {/* Thumbnail */}
                  <td className="px-5 py-4">
                    {s.image ? (
                      <div className="relative w-14 h-10 overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                        <Image src={s.image} alt={s.title} fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="w-14 h-10 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <ImageIcon size={14} style={{ color: 'rgba(255,255,255,0.18)' }} />
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-2xl">{s.icon}</td>
                  <td className="px-5 py-4">
                    <p className="font-lato text-sm text-white">{s.title}</p>
                    <p className="font-lato text-xs mt-0.5 line-clamp-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {s.features.slice(0, 3).map((f) => (
                        <span key={f} className="px-2 py-0.5 font-lato text-xs"
                          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)' }}>
                          {f}
                        </span>
                      ))}
                      {s.features.length > 3 && (
                        <span className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>+{s.features.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => startEdit(s)}
                        className="hover:text-luxury-gold transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(s.id, s.title)}
                        className="hover:text-red-400 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
    </div>
  )
}
