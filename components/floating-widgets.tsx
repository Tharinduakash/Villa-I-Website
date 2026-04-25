'use client'

import React, { useState } from 'react'
import { HelpCircle } from 'lucide-react'

export function FloatingWidgets() {
  const [showInquireModal, setShowInquireModal] = useState(false)

  const handleWhatsAppClick = () => {
    const phoneNumber = '+94716787530'
    const message = 'Hi! I would like to inquire about your travel gears.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleInquireClick = () => {
    setShowInquireModal(!showInquireModal)
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
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .floating-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .floating-btn:active {
          transform: scale(0.95);
        }

        .whatsapp-btn {
          background: linear-gradient(135deg, #25d366, #20ba5a);
          color: white;
        }

        .whatsapp-btn:hover {
          background: linear-gradient(135deg, #20ba5a, #1aad4a);
        }

        .inquire-float-btn {
          background: linear-gradient(135deg, #ff7a45, #ff6b2c);
          color: white;
        }

        .inquire-float-btn:hover {
          background: linear-gradient(135deg, #ff6b2c, #ff5213);
        }

        .floating-btn svg {
          width: 28px;
          height: 28px;
        }

        /* Pulse animation on inquire btn */
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0   rgba(255, 122, 69, 0.7); }
          70%  { box-shadow: 0 0 0 10px rgba(255, 122, 69, 0);   }
          100% { box-shadow: 0 0 0 0   rgba(255, 122, 69, 0);   }
        }
        .inquire-float-btn.pulse {
          animation: pulse-ring 2s infinite;
        }

        /* ── Hide the orange inquire FAB on mobile only ──
           WhatsApp (green) stays visible on all screen sizes */
        @media (max-width: 767px) {
          .inquire-float-btn {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .floating-widgets {
            bottom: 20px;
            right: 20px;
            gap: 12px;
          }
          .floating-btn {
            width: 56px;
            height: 56px;
          }
          .floating-btn svg {
            width: 24px;
            height: 24px;
          }
        }

        /* ── Inquiry Modal ── */
        .inquire-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          padding: 1rem;
        }

        .inquire-modal-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .inquire-modal {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          transform: scale(0.95);
          transition: transform 0.3s ease;
          position: relative;
        }

        .inquire-modal-overlay.open .inquire-modal {
          transform: scale(1);
        }

        .inquire-modal h2 {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .inquire-modal p {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .inquire-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .inquire-form input,
        .inquire-form textarea {
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s ease;
          width: 100%;
        }

        .inquire-form input:focus,
        .inquire-form textarea:focus {
          outline: none;
          border-color: #ff7a45;
          box-shadow: 0 0 0 3px rgba(255, 122, 69, 0.1);
        }

        .inquire-form textarea {
          resize: vertical;
          min-height: 110px;
        }

        .inquire-btn-submit {
          background: linear-gradient(135deg, #ff7a45, #ff6b2c);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .inquire-btn-submit:hover {
          background: linear-gradient(135deg, #ff6b2c, #ff5213);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 122, 69, 0.3);
        }

        .modal-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(0,0,0,0.06);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          color: #555;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, color 0.2s ease;
          line-height: 1;
        }

        .modal-close-btn:hover {
          background: rgba(0,0,0,0.12);
          color: #1a1a1a;
        }
      `}</style>

      {/* ── Floating buttons ── */}
      <div className="floating-widgets">

        {/* WhatsApp — always visible */}
        <button className="floating-btn whatsapp-btn" onClick={handleWhatsAppClick} aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 32 32" fill="white">
            <path d="M16.001 3.2c-7.067 0-12.8 5.733-12.8 12.8 0 2.255.588 4.47 1.706 6.427L3.2 28.8l6.573-1.673a12.75 12.75 0 006.228 1.673c7.067 0 12.8-5.733 12.8-12.8S23.068 3.2 16.001 3.2zm0 23.04c-2.06 0-4.08-.552-5.85-1.6l-.42-.248-3.904.992 1.04-3.808-.272-.44a10.24 10.24 0 1110.406 5.104zm5.76-7.36c-.32-.16-1.888-.928-2.176-1.04-.288-.112-.496-.16-.704.16-.208.32-.8 1.04-.984 1.248-.184.208-.368.232-.688.08-.32-.16-1.352-.496-2.576-1.584-.952-.848-1.6-1.888-1.784-2.208-.184-.32-.02-.496.14-.656.144-.144.32-.368.48-.552.16-.184.208-.32.32-.528.112-.208.056-.392-.028-.552-.08-.16-.704-1.696-.96-2.32-.248-.6-.5-.52-.704-.528l-.6-.008c-.208 0-.552.08-.84.392-.288.32-1.104 1.08-1.104 2.64 0 1.56 1.128 3.064 1.288 3.272.16.208 2.224 3.392 5.392 4.752.752.328 1.336.52 1.792.664.752.24 1.44.208 1.984.128.608-.088 1.888-.768 2.152-1.512.264-.744.264-1.384.184-1.512-.08-.128-.288-.208-.608-.368z"/>
          </svg>
        </button>

        {/* Inquire — hidden on mobile via CSS, visible on tablet/desktop */}
        <button
          className={`floating-btn inquire-float-btn ${!showInquireModal ? 'pulse' : ''}`}
          onClick={handleInquireClick}
          aria-label="Open inquiry form"
        >
          <HelpCircle />
        </button>
      </div>

      {/* ── Inquiry Modal ── */}
      <div
        className={`inquire-modal-overlay ${showInquireModal ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) handleInquireClick() }}
      >
        <div className="inquire-modal">
          <button className="modal-close-btn" onClick={handleInquireClick} aria-label="Close modal">✕</button>

          <h2>Send Your Inquiry</h2>
          <p>We&apos;d love to hear from you! Fill out the form below and we&apos;ll get back to you shortly.</p>

          <form className="inquire-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text"  placeholder="Your Name"    required aria-label="Name" />
            <input type="email" placeholder="Your Email"   required aria-label="Email" />
            <input type="text"  placeholder="Subject"      required aria-label="Subject" />
            <textarea placeholder="Tell us about your travel plans..." required aria-label="Message" />
            <button type="submit" className="inquire-btn-submit">Send Inquiry</button>
          </form>
        </div>
      </div>
    </>
  )
}