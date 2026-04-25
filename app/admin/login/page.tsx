'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Lock } from 'lucide-react'

type LoginForm = { email: string; password: string }

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    setServerError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) {
      setServerError(json.error ?? 'Login failed')
      return
    }
    router.push('/admin/dashboard')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0B0B0B 0%, #111111 100%)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-playfair text-4xl font-bold text-white tracking-wider">
            VILLA <span className="italic font-light" style={{ color: '#C9A96E' }}>i</span>
          </span>
          <p className="font-lato text-xs tracking-[0.3em] uppercase mt-2" style={{ color: 'rgba(201,169,110,0.6)' }}>
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div
          className="p-8 border"
          style={{
            background: '#111111',
            borderColor: 'rgba(201,169,110,0.15)',
          }}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full border mb-6 mx-auto"
            style={{ borderColor: 'rgba(201,169,110,0.3)', color: '#C9A96E' }}>
            <Lock size={20} />
          </div>
          <h1 className="font-playfair text-2xl text-white text-center mb-1">Welcome back</h1>
          <p className="font-lato text-xs text-center mb-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Sign in to your admin account
          </p>

          {serverError && (
            <div className="mb-5 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 font-lato text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block font-lato text-xs tracking-[0.15em] uppercase mb-2"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                Email
              </label>
              <input
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                type="email"
                autoComplete="email"
                className="w-full px-4 py-3 font-lato text-sm text-white outline-none transition-colors duration-200"
                style={{
                  background: '#0B0B0B',
                  border: `1px solid ${errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
                }}
                placeholder="admin@villaihotel.com"
              />
              {errors.email && <p className="font-lato text-xs mt-1 text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-lato text-xs tracking-[0.15em] uppercase mb-2"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-11 font-lato text-sm text-white outline-none transition-colors duration-200"
                  style={{
                    background: '#0B0B0B',
                    border: `1px solid ${errors.password ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="font-lato text-xs mt-1 text-red-400">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 font-lato text-xs tracking-[0.3em] uppercase transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#C9A96E', color: '#0B0B0B' }}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center font-lato text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Villa i Hotel · Admin System
        </p>
      </div>
    </div>
  )
}
