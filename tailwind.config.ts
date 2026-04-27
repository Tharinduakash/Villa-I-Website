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
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}
export default config
