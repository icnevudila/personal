'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (lang: 'tr' | 'en') => {
    setLanguage(lang)
    // Force page reload to apply language changes
    window.location.reload()
  }

  return (
    <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1 backdrop-blur-sm border border-gray-700/30">
      <button
        onClick={() => handleLanguageChange('tr')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          language === 'tr'
            ? 'bg-[#F97316] text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        TR
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-[#F97316] text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        EN
      </button>
    </div>
  )
}

