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
    <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => handleLanguageChange('tr')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'tr'
            ? 'bg-primary-500 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        TR
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-primary-500 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  )
}

