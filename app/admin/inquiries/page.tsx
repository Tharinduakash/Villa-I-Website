'use client'
import { useEffect, useState } from 'react'
import { MessageSquare, Trash2, MailOpen, Mail } from 'lucide-react'

interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Inquiry | null>(null)

  useEffect(() => {
    fetch('/api/inquiries')
      .then((r) => r.json())
      .then((data) => { setInquiries(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    })
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, read } : i)))
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, read } : prev)
  }

  const remove = async (id: string) => {
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE' })
    setInquiries((prev) => prev.filter((i) => i.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const openInquiry = (inquiry: Inquiry) => {
    setSelected(inquiry)
    if (!inquiry.read) markRead(inquiry.id, true)
  }

  const unread = inquiries.filter((i) => !i.read).length

  if (loading) return <PageLoader />

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl text-white mb-1">Inquiries</h1>
          <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {unread > 0 ? `${unread} unread` : 'All caught up'} · {inquiries.length} total
          </p>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
          <MessageSquare size={32} style={{ color: 'rgba(255,255,255,0.15)' }} className="mb-3" />
          <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No inquiries yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* List */}
          <div className="lg:col-span-2 border divide-y divide-white/[0.04]" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                onClick={() => openInquiry(inq)}
                className="px-5 py-4 cursor-pointer transition-colors duration-150 flex items-start gap-3"
                style={{
                  background: selected?.id === inq.id ? 'rgba(201,169,110,0.06)' : 'transparent',
                  borderLeft: selected?.id === inq.id ? '2px solid #C9A96E' : '2px solid transparent',
                }}
              >
                <div className="mt-0.5 flex-shrink-0" style={{ color: inq.read ? 'rgba(255,255,255,0.2)' : '#C9A96E' }}>
                  {inq.read ? <MailOpen size={15} /> : <Mail size={15} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-lato text-sm truncate" style={{ color: inq.read ? 'rgba(255,255,255,0.5)' : '#fff', fontWeight: inq.read ? 400 : 600 }}>
                      {inq.name}
                    </p>
                    <span className="font-lato text-[10px] flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {new Date(inq.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="font-lato text-xs truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{inq.subject}</p>
                  <p className="font-lato text-xs truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.22)' }}>{inq.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3 border" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
            {selected ? (
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-playfair text-xl text-white mb-1">{selected.subject}</h2>
                    <p className="font-lato text-sm" style={{ color: '#C9A96E' }}>{selected.name}</p>
                    <p className="font-lato text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{selected.email}</p>
                    <p className="font-lato text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {new Date(selected.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => markRead(selected.id, !selected.read)}
                      className="flex items-center gap-1.5 px-3 py-1.5 font-lato text-xs border transition-colors duration-150"
                      style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                    >
                      {selected.read ? <Mail size={12} /> : <MailOpen size={12} />}
                      {selected.read ? 'Mark unread' : 'Mark read'}
                    </button>
                    <button
                      onClick={() => remove(selected.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 font-lato text-xs border transition-colors duration-150"
                      style={{ borderColor: 'rgba(239,68,68,0.2)', color: 'rgba(239,68,68,0.6)' }}
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
                <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.05)' }} />
                <p className="font-lato text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {selected.message}
                </p>
                <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 font-lato text-xs font-semibold transition-all duration-150"
                    style={{ background: 'rgba(201,169,110,0.1)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.2)' }}
                  >
                    <Mail size={12} /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                <MessageSquare size={28} style={{ color: 'rgba(255,255,255,0.1)' }} className="mb-3" />
                <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>Select an inquiry to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
    </div>
  )
}
