import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Site Haritası',
  description: 'icnevudila web sitesinin tüm sayfaları ve bölümleri.',
}

export default function SitemapPage() {
  const pages = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımda', href: '/#about' },
    { name: 'Yetenekler', href: '/#skills' },
    { name: 'Portfolyo', href: '/#portfolio' },
    { name: 'Blog', href: '/#blog' },
    { name: 'İletişim', href: '/#contact' },
    { name: 'Gizlilik Politikası', href: '/privacy' },
    { name: 'Kullanım Şartları', href: '/terms' },
  ]

  const sections = [
    'Ana Sayfa - Hero',
    'Hakkımda - Deneyim ve Hikayem',
    'Yetenekler - Teknik Yeteneklerim',
    'Portfolyo - Çalışmalarım',
    'Blog - Yazılarım',
    'İletişim - Benimle İletişime Geçin',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#1e293b]">
      <div className="container-custom py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-[#F97316]">Site Haritası</h1>
          <p className="text-gray-400 mb-12">
            Web sitemizin tüm sayfaları ve bölümleri burada listelenmiştir.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-[#F97316]">Sayfalar</h2>
              <ul className="space-y-3">
                {pages.map((page) => (
                  <li key={page.href}>
                    <Link 
                      href={page.href}
                      className="text-gray-300 hover:text-[#F97316] transition-colors underline"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-[#F97316]">Bölümler</h2>
              <ul className="space-y-2 text-gray-300">
                {sections.map((section, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    {section}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-[#F97316]">İletişim</h2>
              <ul className="space-y-2 text-gray-300">
                <li>E-posta: icnevudila@gmail.com</li>
                <li>Telegram: @icnevudila</li>
                <li>GitHub: github.com/icnevudila</li>
                <li>LinkedIn: linkedin.com/in/ali-düvenci</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-[#F97316]">XML Sitemap</h2>
              <p className="text-gray-300 mb-4">
                SEO için XML site haritası:
              </p>
              <Link 
                href="/sitemap.xml"
                className="text-[#F97316] hover:underline"
                target="_blank"
              >
                /sitemap.xml
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

