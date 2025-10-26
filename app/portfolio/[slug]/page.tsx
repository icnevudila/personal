'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface PortfolioSite {
  id: string
  title: string
  description: string | { tr: string; en: string }
  category: string
  image: string
  url: string
  tags: string[] | { tr: string[]; en: string[] }
  featured: boolean
}

export default function PortfolioViewPage() {
  const params = useParams()
  const router = useRouter()
  const [site, setSite] = useState<PortfolioSite | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSite = async () => {
      try {
        console.log('Loading site with ID:', params.slug)
        const response = await fetch('/portfolio-sites.json')
        const data = await response.json()
        console.log('Loaded data:', data)
        const foundSite = data.find((s: PortfolioSite) => s.id === params.slug)
        console.log('Found site:', foundSite)
        setSite(foundSite || null)
      } catch (error) {
        console.error('Site yüklenirken hata:', error)
        setSite(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug) {
      loadSite()
    }
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center">
        <div className="animate-pulse text-white">Yükleniyor...</div>
      </div>
    )
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Site Bulunamadı</h1>
          <p className="mb-4">ID: {params.slug}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#F97316] text-white rounded-lg hover:bg-[#ea6707] transition-colors"
          >
            Geri Dön
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-gray-700 text-[#94A3B8] hover:text-white transition-colors"
              aria-label="Geri Dön"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">{site.title}</h1>
              <p className="text-sm text-[#94A3B8]">
                {typeof site.description === 'string' 
                  ? site.description 
                  : site.description.tr
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full">
              {site.category}
            </span>
            <button
              onClick={() => router.push('/portfolio')}
              className="p-2 rounded-full hover:bg-gray-700 text-[#94A3B8] hover:text-white transition-colors"
              aria-label="Kapat"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-80px)]">
        <iframe
          src={site.url}
          title={site.title}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  )
}
