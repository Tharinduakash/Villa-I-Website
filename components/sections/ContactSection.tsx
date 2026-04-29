'use client'
import { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { FaWhatsapp, FaInstagram, FaFacebook, FaTripadvisor } from 'react-icons/fa'
import { SiBookingdotcom } from 'react-icons/si'
import { CalendarDays, ChevronDown, CheckCircle2, Minus, Plus, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────
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

const ROOM_TYPES = [
  { value: 'ac-room',     label: 'A/C Room'    },
  { value: 'non-ac-room', label: 'Non A/C'     },
  { value: 'family-room', label: 'Family Suite' },
  { value: 'full-villa',  label: 'Full Villa'  },
]

// ── Custom Agoda SVG (SiAgoda doesn't exist in react-icons) ───────────
function AgodaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3 21h4.5l1.8-4h5.4l1.8 4H21L12 2zm0 5.5 2 5h-4l2-5z" />
    </svg>
  )
}

// ── Date helpers (no external lib) ────────────────────────────────────
function fmtDisplay(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function fmtAPI(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
function parseLocal(iso: string) {
  // Parse as local noon to avoid timezone off-by-one
  return new Date(`${iso}T12:00:00`)
}

// ── Inline date-picker field ───────────────────────────────────────────
interface DateFieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  disabledBefore?: Date
}

function DatePickerField({ label, placeholder, value, onChange, error, disabledBefore }: DateFieldProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = value ? parseLocal(value) : undefined

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div ref={ref} className="relative">
      <Label>{label}</Label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full items-center justify-between bg-white/[0.03] border px-4 py-3 font-lato text-sm outline-none transition-all duration-300',
          open
            ? 'border-luxury-gold/50 ring-1 ring-luxury-gold/[0.15]'
            : 'border-luxury-gold/15 hover:border-luxury-gold/30',
          error && 'border-red-500/50'
        )}
      >
        <span className={cn('flex items-center gap-2.5', selected ? 'text-white' : 'text-white/25')}>
          <CalendarDays size={14} className="text-luxury-gold/50 shrink-0" />
          {selected ? fmtDisplay(selected) : placeholder}
        </span>
        <ChevronDown
          size={13}
          className={cn('text-white/20 transition-transform duration-200 shrink-0', open && 'rotate-180')}
        />
      </button>
      {error && <p className="font-lato text-xs mt-1.5 text-red-400/80">{error}</p>}

      {open && (
        <div
          className="absolute top-full left-0 z-50 mt-1.5 border border-luxury-gold/15 shadow-[0_20px_60px_rgba(0,0,0,0.75)]"
          style={{ background: '#090c1c' }}
        >
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => {
              onChange(date ? fmtAPI(date) : '')
              setOpen(false)
            }}
            disabled={disabledBefore ? { before: disabledBefore } : undefined}
            initialFocus
          />
        </div>
      )}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────
export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [guestCount, setGuestCount] = useState(2)
  const [roomType, setRoomType] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const checkInValue = watch('checkIn')
  const checkInDate  = checkInValue ? parseLocal(checkInValue) : undefined

  // ── Backend logic preserved ──────────────────────────────────────
  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        guests:   String(guestCount),
        roomType: roomType || 'Not specified',
      }),
    })
    if (!res.ok) {
      const json = await res.json()
      console.error('Booking error:', json.error)
    }
    setSubmitted(true)
    reset()
    setGuestCount(2)
    setRoomType('')
  }

  // ── Contact items ─────────────────────────────────────────────────
  const contactItems = [
    {
      icon: <MdLocationOn size={15} />,
      label: 'Address',
      value: '37/1/1 Sri,\nDharmapala Road,\nMount Lavinia.',
      href: '#map',
    },
    {
      icon: <MdPhone size={15} />,
      label: 'Telephone',
      value: '0112714701 / +94 77 786 3412 ',
      href: 'tel:0112714701',
    },
    {
      icon: <MdEmail size={15} />,
      label: 'Email',
      value: 'info@villaihotel.com',
      href: 'mailto:info@villaihotel.com',
    },
    {
      icon: <FaWhatsapp size={15} />,
      label: 'WhatsApp',
      value: 'Message Us Directly',
      href: 'https://wa.me/94777863412',
    },
  ]

  const socials = [
    { icon: <FaInstagram size={16} />,     href: '#', label: 'Instagram',   hover: 'hover:border-pink-500/40   hover:text-pink-400' },
    { icon: <FaFacebook size={16} />,      href: '#', label: 'Facebook',    hover: 'hover:border-blue-500/40   hover:text-blue-400' },
    { icon: <FaTripadvisor size={16} />,   href: '#', label: 'TripAdvisor', hover: 'hover:border-green-500/40  hover:text-green-400' },
    { icon: <SiBookingdotcom size={16} />, href: '#', label: 'Booking.com', hover: 'hover:border-blue-600/40   hover:text-blue-500' },
    { icon: <AgodaIcon size={16} />,       href: '#', label: 'Agoda',       hover: 'hover:border-red-500/40    hover:text-red-400' },
    { icon: <FaWhatsapp size={16} />,      href: 'https://wa.me/94777863412', label: 'WhatsApp', hover: 'hover:border-green-500/40 hover:text-green-400' },
  ]

  return (
    <section className="section-gradient-a">
      <div className="grid grid-cols-1 lg:grid-cols-5">

        {/* ══ LEFT PANEL ═══════════════════════════════════════════════ */}
        <div
          className="lg:col-span-2 px-8 sm:px-12 py-16 lg:py-24 border-r"
          style={{ background: '#090c1c', borderColor: 'rgba(201,169,110,0.08)' }}
        >
          <AnimatedSection direction="left">
            <div className="max-w-xs">

              {/* Brand header */}
              <div className="mb-12">
                <p className="font-lato text-[9px] tracking-[0.45em] uppercase mb-3"
                  style={{ color: 'rgba(201,169,110,0.45)' }}>
                  Villa i Hotel
                </p>
                <h2 className="font-playfair text-3xl text-white mb-4">
                  Let&apos;s{' '}
                  <span className="italic text-luxury-gold">Connect</span>
                </h2>
                <p className="font-lato text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Our team is ready to help you plan the perfect coastal escape. Reach out anytime.
                </p>
              </div>

              {/* Contact items */}
              <div className="space-y-1 mb-12">
                {contactItems.map(({ icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-start gap-4 p-3 transition-all duration-200 -mx-3"
                    style={{ borderRadius: 0 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(201,169,110,0.04)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <span
                      className="mt-0.5 w-8 h-8 flex items-center justify-center shrink-0 border transition-all duration-200 group-hover:border-luxury-gold/40"
                      style={{
                        borderColor: 'rgba(201,169,110,0.15)',
                        color: 'rgba(201,169,110,0.55)',
                      }}
                    >
                      {icon}
                    </span>
                    <div className="pt-1 min-w-0">
                      <p className="font-lato text-[9px] tracking-[0.2em] uppercase mb-1"
                        style={{ color: 'rgba(255,255,255,0.22)' }}>
                        {label}
                      </p>
                      <p className="font-lato text-sm whitespace-pre-line transition-colors duration-200 group-hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.50)' }}>
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px flex-1" style={{ background: 'rgba(201,169,110,0.10)' }} />
                <span className="w-1 h-1 rotate-45" style={{ background: 'rgba(201,169,110,0.30)' }} />
                <span className="h-px flex-1" style={{ background: 'rgba(201,169,110,0.10)' }} />
              </div>

              {/* Social links */}
              <div className="mb-10">
                <p className="font-lato text-[9px] tracking-[0.35em] uppercase mb-5"
                  style={{ color: 'rgba(255,255,255,0.20)' }}>
                  Follow &amp; Book
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {socials.map(({ icon, href, label, hover }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className={cn(
                        'w-9 h-9 flex items-center justify-center border transition-all duration-200',
                        'text-white/28 border-white/8',
                        hover
                      )}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Response guarantee */}
              <div
                className="flex items-center gap-3 px-4 py-3 border"
                style={{
                  border: '1px solid rgba(201,169,110,0.12)',
                  background: 'rgba(201,169,110,0.04)',
                }}
              >
                <CheckCircle2 size={14} className="text-luxury-gold shrink-0" />
                <p className="font-lato text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Typically respond within{' '}
                  <span className="text-luxury-gold">24 hours</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* ══ RIGHT PANEL (form) ════════════════════════════════════════ */}
        <div className="lg:col-span-3 px-8 sm:px-12 xl:px-16 py-16 lg:py-24" style={{ background: 'linear-gradient(135deg, #07090f 0%, #0a0d1c 100%)' }}>
          <AnimatedSection direction="right">
            {submitted ? (
              // ── Success state ──────────────────────────────────────
              <div className="max-w-md mx-auto text-center py-20 lg:py-28">
                <div
                  className="w-20 h-20 mx-auto mb-7 flex items-center justify-center border text-luxury-gold"
                  style={{ borderColor: 'rgba(201,169,110,0.30)' }}
                >
                  <CheckCircle2 size={38} />
                </div>
                <h3 className="font-playfair text-3xl text-white mb-3">Inquiry Received!</h3>
                <p className="font-lato text-sm leading-relaxed mb-10 max-w-xs mx-auto"
                  style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Thank you for reaching out. Our team will confirm your reservation within 24 hours.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              // ── Booking form ────────────────────────────────────────
              <div className="max-w-2xl">
                <div className="mb-10">
                  <p className="font-lato text-[9px] tracking-[0.4em] uppercase mb-3"
                    style={{ color: 'rgba(201,169,110,0.50)' }}>
                    Reservation Request
                  </p>
                  <h2 className="font-playfair text-4xl text-white mb-2">
                    Reserve Your{' '}
                    <span className="italic text-luxury-gold">Stay</span>
                  </h2>
                  <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.32)' }}>
                    Fill in your details and we&apos;ll confirm within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name *</Label>
                      <Input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Your name"
                        className={errors.name ? 'border-red-500/50' : ''}
                      />
                      {errors.name && (
                        <p className="font-lato text-xs mt-1.5 text-red-400/80">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>Email Address *</Label>
                      <Input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                        })}
                        type="email"
                        placeholder="your@email.com"
                        className={errors.email ? 'border-red-500/50' : ''}
                      />
                      {errors.email && (
                        <p className="font-lato text-xs mt-1.5 text-red-400/80">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Date pickers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                      name="checkIn"
                      control={control}
                      rules={{ required: 'Check-in date required' }}
                      render={({ field }) => (
                        <DatePickerField
                          label="Check-In Date *"
                          placeholder="Select date"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          error={errors.checkIn?.message}
                          disabledBefore={new Date()}
                        />
                      )}
                    />
                    <Controller
                      name="checkOut"
                      control={control}
                      rules={{ required: 'Check-out date required' }}
                      render={({ field }) => (
                        <DatePickerField
                          label="Check-Out Date *"
                          placeholder="Select date"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          error={errors.checkOut?.message}
                          disabledBefore={
                            checkInDate
                              ? new Date(checkInDate.getTime() + 86_400_000)
                              : new Date()
                          }
                        />
                      )}
                    />
                  </div>

                  {/* Row 3: Guest stepper + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Guest count stepper */}
                    <div>
                      <Label>Number of Guests</Label>
                      <div
                        className="flex items-center border transition-all duration-300"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          borderColor: 'rgba(201,169,110,0.15)',
                          height: '46px',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                          className="w-12 h-full flex items-center justify-center transition-all duration-200 border-r shrink-0"
                          style={{
                            color: 'rgba(255,255,255,0.35)',
                            borderColor: 'rgba(201,169,110,0.10)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                            e.currentTarget.style.color = 'white'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                          }}
                        >
                          <Minus size={13} />
                        </button>
                        <div className="flex-1 flex items-center justify-center gap-2 font-lato text-sm text-white">
                          <span style={{ color: 'rgba(201,169,110,0.55)', fontSize: 13 }}>⊛</span>
                          {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                        </div>
                        <button
                          type="button"
                          onClick={() => setGuestCount((c) => Math.min(12, c + 1))}
                          className="w-12 h-full flex items-center justify-center transition-all duration-200 border-l shrink-0"
                          style={{
                            color: 'rgba(255,255,255,0.35)',
                            borderColor: 'rgba(201,169,110,0.10)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                            e.currentTarget.style.color = 'white'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <Label>Phone / WhatsApp</Label>
                      <Input {...register('phone')} placeholder="+94 XX XXX XXXX" />
                    </div>
                  </div>

                  {/* Room type pills */}
                  <div>
                    <Label>Room Type</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {ROOM_TYPES.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => setRoomType(r.value === roomType ? '' : r.value)}
                          className={cn(
                            'py-2.5 px-3 font-lato text-xs tracking-wide border transition-all duration-200',
                            roomType === r.value
                              ? 'bg-luxury-gold/10 border-luxury-gold/55 text-luxury-gold'
                              : 'bg-white/[0.02] text-white/35 hover:text-white/65 hover:border-luxury-gold/25',
                          )}
                          style={{
                            borderColor: roomType === r.value
                              ? 'rgba(201,169,110,0.55)'
                              : 'rgba(255,255,255,0.08)',
                          }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label>Message / Special Requests</Label>
                    <Textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Any special requests, dietary needs, or questions…"
                    />
                  </div>

                  {/* Submit row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
                    <Button type="submit" size="lg" disabled={isSubmitting} className="sm:w-auto w-full">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2.5">
                          <span
                            className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                            style={{ borderColor: 'rgba(11,11,11,0.4)', borderTopColor: 'transparent' }}
                          />
                          Sending…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2.5">
                          Send Inquiry
                          <ArrowRight size={13} />
                        </span>
                      )}
                    </Button>
                    <p className="font-lato text-[10px] tracking-wide"
                      style={{ color: 'rgba(255,255,255,0.18)' }}>
                      No payment required · Response within 24h
                    </p>
                  </div>

                </form>
              </div>
            )}
          </AnimatedSection>
        </div>

      </div>
    </section>
  )
}
