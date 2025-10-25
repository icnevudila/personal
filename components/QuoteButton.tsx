'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { XMarkIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export function QuoteButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form gönderme logic'i buraya gelecek
    console.log('Form submitted:', formData)
    
    alert('Teşekkürler! En kısa sürede size dönüş yapacağım. 📧')
    setFormData({ name: '', email: '', project: '' })
    setIsOpen(false)
  }

  return (
    <>
      {/* Sticky Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#F97316] hover:bg-[#ea6707] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
        aria-label="Teklif Al"
      >
        <EnvelopeIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Teklif Al</span>
        <span className="sm:hidden">Fiyat</span>
      </motion.button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0f172a] rounded-xl p-6 max-w-md w-full border border-gray-700/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#E5E7EB]">Teklif Al</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Kapat"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Adınız
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                  placeholder="İsim"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Proje Açıklaması
                </label>
                <textarea
                  id="project"
                  required
                  rows={4}
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all resize-none"
                  placeholder="Projenizi kısaca anlatın..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F97316] hover:bg-[#ea6707] text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Gönder
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  )
}

