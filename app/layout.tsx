import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Villa i Hotel | Luxury Beach Retreat — Mount Lavinia, Sri Lanka',
  description:
    'Experience luxury by the sea at Villa i Hotel, Mount Lavinia, Sri Lanka. A private coastal retreat just 100m from the beach, offering A/C rooms, family suites, full villa bookings, and authentic Sri Lankan hospitality.',
  keywords: 'Villa i Hotel, Mount Lavinia, Sri Lanka, luxury hotel, beach hotel, accommodation, family rooms, villa booking',
  openGraph: {
    title: 'Villa i Hotel | Luxury Beach Retreat',
    description: 'A private coastal retreat in Mount Lavinia, Sri Lanka.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`} data-scroll-behavior="smooth">
      <body className="bg-luxury-black text-white font-lato antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
