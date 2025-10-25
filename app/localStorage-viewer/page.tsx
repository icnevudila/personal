'use client'

import { useState, useEffect } from 'react'

export default function LocalStorageViewer() {
  const [data, setData] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Load all localStorage data
    const allData: Record<string, string> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        allData[key] = localStorage.getItem(key) || ''
      }
    }
    setData(allData)
  }, [])

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(data, null, 2)
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearStorage = () => {
    if (confirm('Tüm localStorage verilerini silmek istediğinizden emin misiniz?')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">localStorage Viewer</h1>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white"
          >
            {copied ? '✅ Kopyalandı!' : '📋 Tümünü Kopyala'}
          </button>
          <button
            onClick={clearStorage}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white"
          >
            🗑️ Temizle
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
          >
            ← Ana Sayfa
          </a>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            localStorage Verileri ({Object.keys(data).length} item)
          </h2>
          
          {Object.keys(data).length === 0 ? (
            <p className="text-gray-400">localStorage boş</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="border border-gray-700 rounded p-4">
                  <h3 className="text-primary-500 font-semibold mb-2">{key}</h3>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    {value.length > 500 ? `${value.substring(0, 500)}... (toplam ${value.length} karakter)` : value}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-900/30 border border-blue-700 rounded-lg p-4">
          <h3 className="text-blue-400 font-semibold mb-2">Kullanım:</h3>
          <ol className="text-gray-300 space-y-2 text-sm">
            <li>1. "Tümünü Kopyala" butonuna tıklayın</li>
            <li>2. Başka bir tarayıcı/portta konsolu açın (F12)</li>
            <li>3. Şunu yapıştırın ve Enter'a basın:</li>
            <pre className="bg-gray-900 p-3 rounded mt-2 text-xs">
{`const data = [PASTE_YOUR_COPIED_DATA_HERE];
Object.keys(data).forEach(key => {
  localStorage.setItem(key, data[key]);
});
window.location.reload();`}
            </pre>
          </ol>
        </div>
      </div>
    </div>
  )
}

