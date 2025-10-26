import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Favicon } from '@/components/Favicon'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'icnevudila — Portföy',
    template: '%s | icnevudila'
  },
  description: 'Sade, zekice ve insana yakın tasarımlar. Modern dijital deneyimler. UI/UX tasarım, web geliştirme ve yaratıcı çözümler.',
  keywords: ['web tasarım', 'UI/UX tasarım', 'yazılım destek', 'grafik tasarım', 'portföy', 'frontend developer', 'AI tasarım', 'yaratıcı stüdyo', 'modern web', 'responsive tasarım', 'Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'icnevudila', url: 'https://icnevudila.xyz' }],
  creator: 'icnevudila',
  publisher: 'icnevudila',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://icnevudila.xyz'),
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://icnevudila.xyz',
    title: 'icnevudila — Portföy',
    description: 'Sade, zekice ve insana yakın tasarımlar. Modern dijital deneyimler.',
    siteName: 'icnevudila Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'icnevudila - Creative Web Designer',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'icnevudila — Portföy',
    description: 'Sade, zekice ve insana yakın tasarımlar.',
    images: ['/og-image.jpg'],
    creator: '@icnevudila',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#151515" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        
        {/* Service Worker Registration */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Service worker disabled for development
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Favicon />
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>
              <div className="min-h-screen relative">
                <Navbar />
                <main className="relative">
                  {children}
                </main>
                <Footer />
              </div>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}