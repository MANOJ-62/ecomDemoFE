import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/Providers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Divaksha — Big Crunch. Zero Boring.',
    template: '%s · Divaksha',
  },
  description: 'Iconic chips, global flavours and cult-favourite snacks delivered straight to your door.',
  openGraph: {
    title: 'Divaksha — Big Crunch. Zero Boring.',
    description: 'Iconic chips, global flavours and cult-favourite snacks delivered straight to your door.',
    type: 'website',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'Divaksha — Big Crunch. Zero Boring.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divaksha — Big Crunch. Zero Boring.',
    description: 'Iconic chips, global flavours and cult-favourite snacks delivered straight to your door.',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ff4d00',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#fff8eb] text-[#16130f]">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
