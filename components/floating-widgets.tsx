'use client'

import { useState } from 'react'
import { HelpCircle } from 'lucide-react'

export function FloatingWidgets() {
  const [showInquireModal, setShowInquireModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleWhatsAppClick = () => {
    const phoneNumber = '+94765375285'
    const message = 'Hi! I would like to inquire about your villa and hotel services. Please provide more details.'
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleClose = () => {
    setShowInquireModal(false)
    setStatus('idle')
    setErrorMsg('')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setErrorMsg(data.error || 'Something went wrong'); setStatus('error'); return }
      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        .floating-widgets {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 40;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .floating-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          position: relative;
        }
        .floating-btn:hover  { transform: scale(1.1); box-shadow: 0 8px 24px rgba(0,0,0,0.35); }
        .floating-btn:active { transform: scale(0.95); }
        .whatsapp-btn       { background: linear-gradient(135deg,#25d366,#20ba5a); color: white; }
        .whatsapp-btn:hover { background: linear-gradient(135deg,#20ba5a,#1aad4a); }
        .inquire-float-btn       { background: linear-gradient(135deg,#C9A96E,#b8904a); color: white; }
        .inquire-float-btn:hover { background: linear-gradient(135deg,#b8904a,#a07840); }
        .floating-btn svg { width: 28px; height: 28px; }

        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0   rgba(201,169,110,0.7); }
          70%  { box-shadow: 0 0 0 10px rgba(201,169,110,0);   }
          100% { box-shadow: 0 0 0 0   rgba(201,169,110,0);   }
        }
        .inquire-float-btn.pulse { animation: pulse-ring 2s infinite; }

        @media (max-width: 767px) { .inquire-float-btn { display: none !important; } }
        @media (max-width: 768px) {
          .floating-widgets { bottom: 20px; right: 20px; gap: 12px; }
          .floating-btn { width: 56px; height: 56px; }
          .floating-btn svg { width: 24px; height: 24px; }
        }

        /* Modal */
        .inquire-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.65);
          display: flex; align-items: center; justify-content: center;
          z-index: 50; opacity: 0; pointer-events: none;
          transition: opacity 0.3s ease; padding: 1rem;
        }
        .inquire-modal-overlay.open { opacity: 1; pointer-events: auto; }

        .inquire-modal {
          background: #0f0f0f;
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 16px;
          padding: 36px 32px 32px;
          max-width: 480px; width: 100%;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.08);
          transform: scale(0.95);
          transition: transform 0.3s ease;
          position: relative;
        }
        .inquire-modal-overlay.open .inquire-modal { transform: scale(1); }

        .inquire-modal-label {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(201,169,110,0.6); margin-bottom: 6px; display: block;
        }
        .inquire-modal h2 {
          font-size: 22px; font-weight: 700;
          color: #ffffff; margin-bottom: 8px;
        }
        .inquire-modal p {
          font-size: 13px; color: rgba(255,255,255,0.4);
          margin-bottom: 24px; line-height: 1.7;
        }
        .inquire-gold-line {
          height: 1px; background: rgba(201,169,110,0.15);
          margin-bottom: 24px;
        }
        .inquire-form { display: flex; flex-direction: column; gap: 12px; }
        .inquire-form input,
        .inquire-form textarea {
          padding: 11px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          font-size: 13px; color: #fff;
          font-family: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          width: 100%;
        }
        .inquire-form input::placeholder,
        .inquire-form textarea::placeholder { color: rgba(255,255,255,0.25); }
        .inquire-form input:focus,
        .inquire-form textarea:focus {
          outline: none;
          border-color: rgba(201,169,110,0.5);
          box-shadow: 0 0 0 3px rgba(201,169,110,0.08);
        }
        .inquire-form textarea { resize: vertical; min-height: 100px; }

        .inquire-btn-submit {
          background: linear-gradient(135deg,#C9A96E,#b8904a);
          color: #0a0806; padding: 12px 24px; border: none; border-radius: 6px;
          font-weight: 700; font-size: 13px; letter-spacing: 0.05em;
          cursor: pointer; transition: all 0.3s ease; width: 100%;
        }
        .inquire-btn-submit:hover {
          background: linear-gradient(135deg,#dbbf8a,#C9A96E);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(201,169,110,0.25);
        }
        .inquire-btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .modal-close-btn {
          position: absolute; top: 14px; right: 14px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
          width: 30px; height: 30px; border-radius: 50%;
          font-size: 16px; cursor: pointer; color: rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease; line-height: 1;
        }
        .modal-close-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

        .inquire-error { color: #f87171; font-size: 12px; margin-top: -4px; }
      `}</style>

      <div className="floating-widgets">
        <button className="floating-btn whatsapp-btn" onClick={handleWhatsAppClick} aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 32 32" fill="white">
            <path d="M16.001 3.2c-7.067 0-12.8 5.733-12.8 12.8 0 2.255.588 4.47 1.706 6.427L3.2 28.8l6.573-1.673a12.75 12.75 0 006.228 1.673c7.067 0 12.8-5.733 12.8-12.8S23.068 3.2 16.001 3.2zm0 23.04c-2.06 0-4.08-.552-5.85-1.6l-.42-.248-3.904.992 1.04-3.808-.272-.44a10.24 10.24 0 1110.406 5.104zm5.76-7.36c-.32-.16-1.888-.928-2.176-1.04-.288-.112-.496-.16-.704.16-.208.32-.8 1.04-.984 1.248-.184.208-.368.232-.688.08-.32-.16-1.352-.496-2.576-1.584-.952-.848-1.6-1.888-1.784-2.208-.184-.32-.02-.496.14-.656.144-.144.32-.368.48-.552.16-.184.208-.32.32-.528.112-.208.056-.392-.028-.552-.08-.16-.704-1.696-.96-2.32-.248-.6-.5-.52-.704-.528l-.6-.008c-.208 0-.552.08-.84.392-.288.32-1.104 1.08-1.104 2.64 0 1.56 1.128 3.064 1.288 3.272.16.208 2.224 3.392 5.392 4.752.752.328 1.336.52 1.792.664.752.24 1.44.208 1.984.128.608-.088 1.888-.768 2.152-1.512.264-.744.264-1.384.184-1.512-.08-.128-.288-.208-.608-.368z"/>
          </svg>
        </button>

        <button
          className={`floating-btn inquire-float-btn ${!showInquireModal ? 'pulse' : ''}`}
          onClick={() => setShowInquireModal(true)}
          aria-label="Open inquiry form"
        >
          <HelpCircle />
        </button>
      </div>

      {/* Modal */}
      <div
        className={`inquire-modal-overlay ${showInquireModal ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      >
        <div className="inquire-modal">
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close">✕</button>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px', fontSize: 22
              }}>✓</div>
              <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Inquiry Sent!</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                Thank you. We&apos;ll get back to you shortly.
              </p>
              <button
                onClick={handleClose}
                className="inquire-btn-submit"
                style={{ marginTop: 24, width: 'auto', padding: '10px 32px' }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <span className="inquire-modal-label">Villa i Hotel</span>
              <h2>Send Your Inquiry</h2>
              <p>We&apos;d love to hear from you. Fill in the form and we&apos;ll respond within 24 hours.</p>
              <div className="inquire-gold-line" />

              <form className="inquire-form" onSubmit={handleSubmit}>
                <input
                  type="text" placeholder="Your Name" required
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email" placeholder="Your Email" required
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  type="text" placeholder="Subject" required
                  value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
                <textarea
                  placeholder="Tell us about your plans..." required
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {status === 'error' && <p className="inquire-error">{errorMsg}</p>}
                <button type="submit" className="inquire-btn-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
