import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black':      '#06080f',  // deep midnight navy
        'luxury-dark':       '#0a0d1c',  // mid navy
        'luxury-deep':       '#0f1228',  // elevated card surface
        'luxury-midnight':   '#040608',  // absolute dark
        'luxury-gold':       '#C9A96E',
        'luxury-gold-light': '#E8D5B0',
        'luxury-gold-dark':  '#A67C52',
        'luxury-cream':      '#FAF7F2',
        'luxury-beige':      '#F5F0E8',
        'luxury-gray':       '#6B6B6B',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        lato: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,169,110,0)' },
          '50%':       { boxShadow: '0 0 28px 4px rgba(201,169,110,0.22)' },
        },
        'reveal-up': {
          'from': { clipPath: 'inset(0 0 100% 0)', opacity: '0' },
          'to':   { clipPath: 'inset(0 0 0% 0)',   opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to':   { opacity: '1' },
        },
      },
      animation: {
        shimmer:      'shimmer 2s infinite',
        float:        'float 4s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2.5s ease-in-out infinite',
        'reveal-up':  'reveal-up 0.75s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':    'fade-in 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}
export default config
