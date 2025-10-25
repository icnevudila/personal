'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, TrashIcon, CheckIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies?: string[]
  featured: boolean
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [localStorageCount, setLocalStorageCount] = useState(0)
  const [heroImage, setHeroImage] = useState<string>('')

  useEffect(() => {
    // Load projects from localStorage or fallback to default
    const saved = localStorage.getItem('projects')
    if (saved) {
      const parsed = JSON.parse(saved)
      setProjects(parsed)
      setLocalStorageCount(parsed.length)
    } else {
      // Fetch from data file on first load
      fetch('/data/projects.json')
        .then(res => res.json())
        .then(data => {
          setProjects(data.projects)
          setLocalStorageCount(data.projects.length)
          localStorage.setItem('projects', JSON.stringify(data.projects))
        })
    }
    
    // Load hero image
    const savedHeroImage = localStorage.getItem('heroImage')
    if (savedHeroImage) {
      setHeroImage(savedHeroImage)
    }
  }, [])

  const saveProjects = (newProjects: Project[]) => {
    console.log('Saving projects:', newProjects)
    localStorage.setItem('projects', JSON.stringify(newProjects))
    setProjects(newProjects)
    // Force re-render
    setTimeout(() => {
      console.log('Projects updated in state')
    }, 100)
  }

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setFormData(project)
  }

  const handleSave = () => {
    if (editingId) {
      const updated = projects.map(p => 
        p.id === editingId 
          ? { 
              ...p, 
              ...formData, 
              id: editingId,
              image: formData.image || p.image,
              technologies: formData.technologies || p.technologies || []
            } as Project 
          : p
      )
      saveProjects(updated)
      alert('Proje başarıyla güncellendi!')
    } else {
      const newProject = {
        ...formData,
        id: Date.now(),
        technologies: formData.technologies || []
      } as Project
      saveProjects([...projects, newProject])
      setShowAddForm(false)
      alert('Yeni proje eklendi!')
    }
    setEditingId(null)
    setFormData({})
  }

  const handleDelete = (id: number) => {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      saveProjects(projects.filter(p => p.id !== id))
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({})
    setShowAddForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
              <p className="text-gray-400">Portföy projelerini düzenleyin</p>
            </div>
            <a
              href="/"
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
            >
              ← Ana Sayfaya Dön
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-white">{projects.length || 0}</div>
              <div className="text-sm text-gray-400">Toplam Proje</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-primary-500">{projects.filter(p => p.featured).length || 0}</div>
              <div className="text-sm text-gray-400">Öne Çıkan</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-green-500">{projects.filter(p => p.image && p.image.startsWith('data:')).length || 0}</div>
              <div className="text-sm text-gray-400">Özel Görsel</div>
            </div>
          </div>
          
          {/* Debug Info */}
          <div className="mt-4 p-3 bg-gray-800 rounded-lg text-xs text-gray-400 space-y-1">
            <div>📊 LocalStorage'da {localStorageCount} proje var</div>
            <div>📋 State'de {projects.length} proje var</div>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <button
                onClick={() => {
                  console.log('LocalStorage projects:', localStorage.getItem('projects'))
                  console.log('Current state:', projects)
                }}
                className="text-primary-400 hover:text-primary-300"
              >
                🐛 Console'da Göster
              </button>
            </div>
          </div>
        </motion.div>

        {/* Hero Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 card"
        >
          <h2 className="text-2xl font-semibold mb-4">Hero Profil Görseli</h2>
          
          <div className="space-y-4">
            {/* Preview */}
            {heroImage && (
              <div className="relative w-32 h-32 bg-gray-800 rounded-full overflow-hidden border-4 border-gray-700 mx-auto">
                <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
              </div>
            )}
            
            {/* Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    const imageData = reader.result as string
                    setHeroImage(imageData)
                    localStorage.setItem('heroImage', imageData)
                    alert('Hero görseli başarıyla kaydedildi!')
                  }
                  reader.readAsDataURL(file)
                }
              }}
              className="hidden"
              id="hero-image-upload"
            />
            
            <label
              htmlFor="hero-image-upload"
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg cursor-pointer transition-colors text-white font-medium mx-auto w-fit"
            >
              <PhotoIcon className="w-5 h-5" />
              {heroImage ? 'Görseli Değiştir' : 'Hero Görseli Yükle'}
            </label>
            
            {heroImage && (
              <button
                onClick={() => {
                  setHeroImage('')
                  localStorage.removeItem('heroImage')
                  alert('Hero görseli silindi!')
                }}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Görseli Sil
              </button>
            )}
          </div>
        </motion.div>

        {/* Add Button */}
        {!showAddForm && !editingId && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowAddForm(true)}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Yeni Proje Ekle
          </motion.button>
        )}

        {/* Add/Edit Form */}
        {(showAddForm || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 card"
          >
            <h2 className="text-2xl font-semibold mb-4">
              {editingId ? 'Proje Düzenle' : 'Yeni Proje'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholder="Proje adı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={3}
                  placeholder="Proje açıklaması"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Görsel</label>
                <div className="space-y-2">
                  {/* Image Preview */}
                  {formData.image && (
                    <div className="relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                      {formData.image.startsWith('data:') ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-900">
                          <div className="text-center">
                            <PhotoIcon className="w-16 h-16 mx-auto mb-2" />
                            <div className="text-sm text-gray-400">CSS Görsel Kullanılıyor</div>
                            <div className="text-xs text-gray-500 mt-1">Yeni görsel yüklemek için "Görsel Yükle" butonuna tıklayın</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* File Upload */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setFormData({ ...formData, image: reader.result as string })
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  
                  <label
                    htmlFor="image-upload"
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg cursor-pointer transition-colors text-white font-medium"
                  >
                    <PhotoIcon className="w-5 h-5" />
                    {formData.image && formData.image.startsWith('data:') ? 'Görseli Değiştir' : 'Görsel Yükle'}
                  </label>
                  
                  {/* URL Input (Fallback) */}
                  <input
                    type="text"
                    value={formData.image && !formData.image.startsWith('data:') ? formData.image : ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    placeholder="veya URL girin: /portfolio/image.png"
                  />
                  
                  {formData.image && formData.image.startsWith('data:') && (
                    <button
                      type="button"
                      onClick={() => {
                        const currentProject = projects.find(p => p.id === editingId)
                        setFormData({ ...formData, image: currentProject?.image || '' })
                      }}
                      className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm"
                    >
                      CSS Görsele Geri Dön
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Teknolojiler (virgülle ayırın)</label>
                <input
                  type="text"
                  value={(formData.technologies || []).join(', ') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                  })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholder="React, Next.js, Tailwind"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm">Öne Çıkan Proje</label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
                >
                  <CheckIcon className="w-5 h-5" />
                  Kaydet
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                  İptal
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card flex items-start justify-between gap-4"
            >
              {/* Image Preview */}
              <div className="w-32 h-32 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700">
                {project.image ? (
                  project.image.startsWith('data:') ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-900 relative group">
                      <div className="text-center">
                        <PhotoIcon className="w-10 h-10 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">CSS Görsel</div>
                      </div>
                      <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs text-orange-400 font-medium">Değiştirmek için düzenle</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-900">
                    <PhotoIcon className="w-10 h-10" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs font-medium">
                      ⭐ Öne Çıkan
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || []).map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors text-sm font-medium"
                >
                  ✏️ Düzenle
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-sm flex items-center gap-1"
                >
                  <TrashIcon className="w-4 h-4" />
                  Sil
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 bg-gray-800/50 rounded-lg text-sm text-gray-400 space-y-2"
        >
          <div>💡 Not: Değişiklikler localStorage'a kaydedilir.</div>
          <div>🔄 Yüklediğiniz görseller değişiklikleri görmek için sayfayı yenileyin.</div>
          <div className="mt-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white text-sm font-medium"
            >
              Sayfayı Yenile
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

