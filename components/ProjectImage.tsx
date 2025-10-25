'use client'

import { motion } from 'framer-motion'

interface ProjectImageProps {
  title: string
  className?: string
}

export function ProjectImage({ title, className = '' }: ProjectImageProps) {
  const renderContent = () => {
    // 1. Nova Finance Dashboard - Fintech
    if (title.includes('Nova') || title.includes('Finance')) {
      return (
        <div className="bg-gray-50 h-full">
          {/* Top Bar */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center px-6">
            <div className="h-6 w-32 bg-gray-900 rounded"></div>
            <div className="ml-8 flex gap-4">
              {['Gösterge Paneli', 'Raporlar', 'Analitik', 'Ayarlar'].map((item, i) => (
                <div key={i} className="h-3 w-20 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="ml-auto h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
          
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-20 bg-white border-r border-gray-200 flex flex-col py-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                  <div className="h-6 w-6 bg-gray-300 rounded"></div>
                  <div className="h-2 w-16 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6 space-y-4">
              {/* Hero */}
              <div>
                <div className="h-8 w-96 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-80 bg-gray-200 rounded"></div>
              </div>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-3 gap-4">
                {['Gelir', 'Gider', 'Kullanıcı Sayısı'].map((item, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="h-2 w-24 bg-gray-300 rounded mb-2"></div>
                    <div className="h-8 w-32 bg-orange-500 rounded mb-1"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
                  <div className="h-32 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full border-8 border-orange-500 border-t-transparent"></div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
                  <div className="space-y-2">
                    {[60, 80, 45, 95, 70].map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-primary-500 rounded" style={{ width: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex gap-3">
                <div className="h-10 w-40 bg-orange-500 rounded"></div>
                <div className="h-10 w-44 bg-gray-200 rounded"></div>
              </div>
              
              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="h-2 w-80 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    // 2. Luma Studio Portfolio - Creative Agency
    if (title.includes('Luma') || title.includes('Studio')) {
      return (
        <div className="bg-white h-full">
          {/* Navbar */}
          <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 justify-between">
            <div className="h-7 w-36 bg-gray-900 rounded"></div>
            <div className="flex gap-6">
              {['Ana Sayfa', 'Hizmetler', 'Projeler', 'İletişim'].map((item, i) => (
                <div key={i} className="h-3 w-18 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
          
          {/* Hero */}
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="h-12 w-[600px] bg-gray-300 rounded mx-auto"></div>
              <div className="h-4 w-[500px] bg-gray-200 rounded mx-auto"></div>
              <div className="h-10 w-52 bg-orange-500 rounded mx-auto mt-4"></div>
            </div>
          </div>
          
          {/* Portfolio Grid */}
          <div className="px-6 py-8">
            <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-3 gap-4">
              {['Minimal UI', 'Kampanya Sitesi', 'Marka Tanıtımı'].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
                    <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-50 border-t border-gray-200 flex items-center justify-center gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-6 w-6 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      )
    }
    
    // 3. Orangedesk CRM
    if (title.includes('Orangedesk') || title.includes('CRM')) {
      return (
        <div className="bg-gray-50 h-full">
          {/* Top Bar */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center px-6">
            <div className="h-6 w-40 bg-gray-900 rounded"></div>
            <div className="ml-auto h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-48 bg-white border-r border-gray-200 flex flex-col py-4">
              {['Müşteriler', 'Aktiviteler', 'Satışlar', 'Analizler'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                  <div className="h-5 w-5 bg-gray-300 rounded"></div>
                  <div className="h-2 w-24 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6 space-y-4">
              {/* Notification */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-3">
                <div className="h-5 w-5 bg-orange-500 rounded-full"></div>
                <div className="h-2 w-40 bg-orange-300 rounded"></div>
              </div>
              
              {/* Headline */}
              <div className="h-6 w-80 bg-gray-300 rounded"></div>
              
              {/* Dashboard Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
                  <div className="h-32 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full border-8 border-orange-500 border-b-transparent"></div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
                  <div className="space-y-2">
                    {[70, 85, 60, 90].map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-8 h-2 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-orange-500 rounded" style={{ width: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-2 w-20 bg-gray-300 rounded"></div>
                  ))}
                </div>
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-12 border-b border-gray-100 flex items-center px-4 gap-4">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="h-2 w-32 bg-gray-300 rounded"></div>
                    <div className="h-2 w-24 bg-gray-200 rounded"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
              
              {/* CTA */}
              <div className="h-10 w-36 bg-orange-500 rounded"></div>
              
              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="h-2 w-72 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    // 4. HealLink Medical Portal
    if (title.includes('HealSync') || title.includes('Medical') || title.includes('HealLink')) {
      return (
        <div className="bg-gray-50 h-full">
          {/* Top Bar */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center px-6 gap-6">
            {['Randevularım', 'Doktorlar', 'Laboratuvar', 'Profilim'].map((item, i) => (
              <div key={i} className="h-3 w-24 bg-gray-300 rounded"></div>
            ))}
            <div className="ml-auto h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
          
          <div className="p-6 space-y-4">
            {/* Hero */}
            <div className="h-5 w-96 bg-gray-300 rounded"></div>
            
            {/* Calendar */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="h-4 w-40 bg-gray-300 rounded mb-3"></div>
              <div className="grid grid-cols-7 gap-2">
                {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, i) => (
                  <div key={i} className="h-10 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
                    <div className="h-2 w-8 bg-gray-300 rounded"></div>
                  </div>
                ))}
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
                    {i === 3 && <div className="h-2 w-2 bg-orange-500 rounded-full"></div>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Doctor Cards */}
            <div className="grid grid-cols-2 gap-4">
              {['Dr. Selin Kara - Kardiyoloji', 'Dr. Can Öztürk - Dahiliye'].map((name, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-3 w-36 bg-gray-300 rounded mb-1"></div>
                      <div className="h-2 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="h-10 w-full bg-orange-500 rounded"></div>
                </div>
              ))}
            </div>
            
            {/* Info Panels */}
            <div className="grid grid-cols-2 gap-4">
              {['Son Test Sonuçları', 'Reçetelerim'].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="h-3 w-32 bg-gray-300 rounded mb-3"></div>
                  <div className="space-y-2">
                    {[1,2,3].map(j => (
                      <div key={j} className="h-8 bg-gray-50 border border-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-white border-t border-gray-200 flex items-center justify-center">
              <div className="h-2 w-72 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      )
    }
    
    // 5. Mindfolio Blog
    if (title.includes('Promptly') || title.includes('Mindfolio') || title.includes('Blog')) {
      return (
        <div className="bg-white h-full">
          {/* Header */}
          <div className="h-14 bg-white border-b border-gray-200 flex items-center px-6 justify-between">
            <div className="h-6 w-52 bg-gray-900 rounded"></div>
            <div className="flex gap-6">
              {['Ana Sayfa', 'Kategoriler', 'Yapay Zeka', 'Tasarım', 'Hakkında'].map((item, i) => (
                <div key={i} className="h-3 w-16 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
          
          {/* Featured Article */}
          <div className="bg-white px-6 py-8">
            <div className="max-w-4xl">
              <div className="h-10 w-full bg-gray-300 rounded mb-3"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 w-40 bg-orange-500 rounded"></div>
            </div>
          </div>
          
          {/* Blog Posts Grid */}
          <div className="px-6 pb-8 grid grid-cols-3 gap-6">
            {['Tasarımda Sadelik Sanatı', 'Veri Görselleştirmenin Psikolojisi', 'Renkler ve Duygular'].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
                  <div className="h-2 w-3/4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 w-36 bg-orange-500 rounded"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Sidebar */}
          <div className="absolute right-6 top-20 w-64 bg-white border border-gray-200 rounded-lg p-4">
            <div className="h-4 w-40 bg-gray-300 rounded mb-3"></div>
            <div className="space-y-2 mb-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-2 w-full bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-12 w-full bg-orange-500 rounded"></div>
          </div>
          
          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-50 border-t border-gray-200 flex items-center justify-center">
            <div className="h-2 w-72 bg-gray-300 rounded"></div>
          </div>
        </div>
      )
    }
    
    // 6. Aurora Analytics - AI Dashboard
    if (title.includes('Cortex') || title.includes('Analytics') || title.includes('Aurora')) {
      return (
        <div className="bg-gray-950 h-full">
          {/* Header */}
          <div className="h-12 bg-gray-900 border-b border-gray-800 flex items-center px-6 justify-between">
            <div>
              <div className="h-5 w-48 bg-gray-700 rounded mb-1"></div>
              <div className="h-2 w-64 bg-gray-800 rounded"></div>
            </div>
            <div className="ml-auto h-8 w-8 bg-gray-800 rounded-full border border-orange-500"></div>
          </div>
          
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-48 bg-gray-900 border-r border-gray-800 flex flex-col py-4">
              {['Gösterge Paneli', 'Raporlama', 'Model İzleme'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800">
                  <div className="h-5 w-5 bg-gray-700 rounded"></div>
                  <div className="h-2 w-32 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6 space-y-4">
              {/* Metrics Cards */}
              <div className="grid grid-cols-3 gap-4">
                {['Veri Akışı', 'Tahmin Doğruluğu', 'Sistem Yükü'].map((item, i) => (
                  <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <div className="h-3 w-32 bg-gray-700 rounded mb-2"></div>
                    <div className="h-8 w-24 bg-orange-500 rounded"></div>
                  </div>
                ))}
              </div>
              
              {/* Neural Network Visualization */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="grid grid-cols-4 gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="space-y-2">
                      {[1,2,3].map(j => (
                        <div key={j} className="h-3 bg-orange-500 rounded"></div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-6 gap-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-3 bg-orange-500/50 rounded"></div>
                  ))}
                </div>
              </div>
              
              {/* Chart */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="flex items-end gap-2 h-32">
                  {[60, 75, 50, 85, 65, 80, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary-500 rounded-t"></div>
                  ))}
                </div>
              </div>
              
              {/* CTA */}
              <div className="h-10 w-40 bg-orange-500 rounded"></div>
              
              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-gray-800">
                <div className="h-2 w-96 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    // Default fallback
    return (
      <div className="bg-gray-50 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-64 bg-gray-300 rounded mx-auto mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-lg bg-white ${className}`}>
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg z-10"
        style={{
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,140,66,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
      
      {/* Browser frame */}
      <div className="h-8 bg-gray-800 flex items-center gap-2 px-3 relative z-10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 h-5 bg-gray-700 rounded px-2 flex items-center">
          <div className="w-2 h-2 border border-gray-500 rounded"></div>
          <div className="ml-2 h-2 w-3/4 bg-gray-600 rounded"></div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="h-full overflow-hidden relative z-10">
        {renderContent()}
      </div>
    </div>
  )
}
