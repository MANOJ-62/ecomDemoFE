import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/Providers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Hangrow — Good Snacks. Good Moments.',
    template: '%s · Hangrow',
  },
  description: 'Discover curated favourites and delicious everyday snacks, delivered straight to your door.',
  openGraph: {
    title: 'Hangrow — Good Snacks. Good Moments.',
    description: 'Discover curated favourites and delicious everyday snacks, delivered straight to your door.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hangrow — Good Snacks. Good Moments.',
    description: 'Discover curated favourites and delicious everyday snacks, delivered straight to your door.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#4a2a22',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#fffcf7] text-[#2f1b16]">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
