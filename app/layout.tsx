import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mini Ecommerce - Premium Health Supplements',
  description: 'Discover our premium selection of health supplements and wellness products',
  generator: 'v0.app',
  openGraph: {
    title: 'Mini Ecommerce - Premium Health Supplements',
    description: 'Discover our premium selection of health supplements and wellness products',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#059669',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
