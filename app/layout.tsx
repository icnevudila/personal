import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import StarRainBackground from '@/components/StarRainBackground'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { Favicon } from '@/components/Favicon'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'icnevudila — Yaratıcı Web Tasarım ve AI Odaklı Portföy',
    template: '%s | icnevudila'
  },
  description: 'Sade, zekice ve insana yakın tasarımlar. AI ve insan işbirliğiyle yaratılan modern dijital deneyimler.',
  keywords: ['web tasarım', 'UI/UX tasarım', 'yazılım destek', 'grafik tasarım', 'portföy', 'frontend developer', 'AI tasarım', 'yaratıcı stüdyo'],
  authors: [{ name: 'icnevudila' }],
  creator: 'icnevudila',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://icnevudila.xyz',
    title: 'icnevudila — Yaratıcı Web Tasarım ve AI Odaklı Portföy',
    description: 'Sade, zekice ve insana yakın tasarımlar. AI ve insan işbirliğiyle yaratılan modern dijital deneyimler.',
    siteName: 'icnevudila Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'icnevudila - Creative Web Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'icnevudila — Yaratıcı Web Tasarım ve AI Odaklı Portföy',
    description: 'Sade, zekice ve insana yakın tasarımlar.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Favicon />
        <AuthProvider>
          <LanguageProvider>
            <div className="min-h-screen bg-slate-900 relative">
            {/* Global Star Rain Background */}
            <StarRainBackground />
              
              <AdminWrapper>
                <Navbar />
                <main className="relative">
                  {children}
                </main>
                <Footer />
              </AdminWrapper>
            </div>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

// Wrapper to conditionally render Navbar and Footer
function AdminWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

