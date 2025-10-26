import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import StarRainBackground from '@/components/StarRainBackground'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Favicon } from '@/components/Favicon'
import { PerformanceMonitor } from '@/components/PerformanceMonitor'

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
  description: 'Sade, zekice ve insana yakın tasarımlar. AI ve insan işbirliğiyle yaratılan modern dijital deneyimler. UI/UX tasarım, web geliştirme ve yaratıcı çözümler.',
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
    title: 'icnevudila — Yaratıcı Web Tasarım ve AI Odaklı Portföy',
    description: 'Sade, zekice ve insana yakın tasarımlar. AI ve insan işbirliğiyle yaratılan modern dijital deneyimler.',
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
    title: 'icnevudila — Yaratıcı Web Tasarım ve AI Odaklı Portföy',
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
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body { 
              font-family: 'Inter', sans-serif; 
              font-display: swap;
              background: #151515;
              color: #94A3B8;
            }
            .loading { opacity: 0; }
            .loaded { opacity: 1; transition: opacity 0.3s ease; }
          `
        }} />
        
        {/* Service Worker Registration */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Favicon />
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>
              <div className="min-h-screen bg-[#151515] relative">
                {/* Global Star Rain Background */}
                <StarRainBackground />
                
                {/* <PerformanceMonitor /> */}
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