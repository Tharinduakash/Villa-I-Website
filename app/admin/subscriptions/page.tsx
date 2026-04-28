'use client'
import { useEffect, useState } from 'react'
import { Mail, Trash2 } from 'lucide-react'

interface Subscription {
  id: string
  email: string
  createdAt: string
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/subscriptions')
      .then((r) => r.json())
      .then((data) => { setSubscriptions(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const remove = async (id: string) => {
    await fetch(`/api/subscriptions/${id}`, { method: 'DELETE' })
    setSubscriptions((prev) => prev.filter((s) => s.id !== id))
  }

  if (loading) return <PageLoader />

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-white mb-1">Subscriptions</h1>
        <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {subscriptions.length} newsletter subscriber{subscriptions.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="border" style={{ background: 'linear-gradient(160deg, rgba(11,14,26,1) 0%, rgba(7,9,17,1) 100%)', borderColor: 'rgba(201,169,110,0.12)' }}>
        {subscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Mail size={32} style={{ color: 'rgba(255,255,255,0.15)' }} className="mb-3" />
            <p className="font-lato text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No subscribers yet</p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div
              className="grid grid-cols-12 px-6 py-3 border-b"
              style={{ borderColor: 'rgba(201,169,110,0.10)' }}
            >
              <span className="col-span-1 font-lato text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>#</span>
              <span className="col-span-7 font-lato text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Email</span>
              <span className="col-span-3 font-lato text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Subscribed</span>
              <span className="col-span-1" />
            </div>

            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              {subscriptions.map((sub, i) => (
                <div key={sub.id} className="grid grid-cols-12 items-center px-6 py-3.5">
                  <span className="col-span-1 font-lato text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{i + 1}</span>
                  <div className="col-span-7 flex items-center gap-2 min-w-0">
                    <Mail size={13} style={{ color: '#C9A96E', flexShrink: 0 }} />
                    <span className="font-lato text-sm text-white truncate">{sub.email}</span>
                  </div>
                  <span className="col-span-3 font-lato text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {new Date(sub.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => remove(sub.id)}
                      className="p-1.5 transition-colors duration-150"
                      style={{ color: 'rgba(239,68,68,0.4)' }}
                      aria-label="Remove subscriber"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
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
