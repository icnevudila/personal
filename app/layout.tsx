import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import StarRainBackground from '@/components/StarRainBackground'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'icnevudila - Creative Web Designer',
    template: '%s | icnevudila'
  },
  description: 'Designing calm, minimal, modern digital experiences. Specializing in web design, UI/UX, and creative workflows.',
  keywords: ['web designer', 'UI/UX designer', 'business analyst', 'software support', 'graphic design', 'portfolio', 'frontend developer'],
  authors: [{ name: 'icnevudila' }],
  creator: 'icnevudila',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://icnevudila.com',
    title: 'icnevudila - Creative Web Designer',
    description: 'Designing calm, minimal, modern digital experiences. Specializing in web design, UI/UX, and creative workflows.',
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
    title: 'icnevudila - Creative Web Designer',
    description: 'Designing calm, minimal, modern digital experiences. Specializing in web design, UI/UX, and creative workflows.',
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

