'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, TrashIcon, CheckIcon, XMarkIcon, PhotoIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { AuthGuard } from './AuthGuard'
import { useAuth } from '@/contexts/AuthContext'
import { uploadImageToCloudinary } from '@/lib/cloudinary-storage'
import { saveBlogPost } from '@/lib/blog-database'
import { 
  getBlogPosts, 
  getAllBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  getYouTubeChannel,
  getYouTubeVideos,
  updateYouTubeChannel,
  createYouTubeVideo,
  updateYouTubeVideo,
  deleteYouTubeVideo,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSiteSettings,
  updateSiteSetting,
  type BlogPost as SupabaseBlogPost,
  type YouTubeChannel as SupabaseYouTubeChannel,
  type YouTubeVideo as SupabaseYouTubeVideo,
  type Project as SupabaseProject
} from '@/lib/supabase-cms'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies?: string[]
  featured: boolean
}

interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  category: string
  featured?: boolean
  content?: string
  image?: string
}

function AdminPanel() {
  const { user, signOut } = useAuth()
  const [projects, setProjects] = useState<SupabaseProject[]>([])
  const [blogPosts, setBlogPosts] = useState<SupabaseBlogPost[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<SupabaseProject>>({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [localStorageCount, setLocalStorageCount] = useState(0)
  const [heroImage, setHeroImage] = useState<string>('')
  const [aboutImage, setAboutImage] = useState<string>('')
  const [siteLogo, setSiteLogo] = useState<string>('')
  const [siteFavicon, setSiteFavicon] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'projects' | 'blog' | 'youtube' | 'settings'>('projects')
  
  // YouTube Management States
  const [youtubeChannel, setYoutubeChannel] = useState<SupabaseYouTubeChannel | null>(null)
  const [youtubeVideos, setYoutubeVideos] = useState<SupabaseYouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Load projects from Supabase
        const projectsData = await getProjects()
        setProjects(projectsData)
        setLocalStorageCount(projectsData.length)
        
        // Load blog posts from Supabase
        const blogPostsData = await getAllBlogPosts()
        setBlogPosts(blogPostsData)
        
        // Load YouTube channel from Supabase
        const youtubeChannelData = await getYouTubeChannel()
        setYoutubeChannel(youtubeChannelData)
        
        if (youtubeChannelData) {
          const videosData = await getYouTubeVideos(youtubeChannelData.id)
          setYoutubeVideos(videosData)
        }
        
        // Load site settings from Supabase
        const siteSettings = await getSiteSettings()
        setSiteLogo(siteSettings.site_logo || '')
        setSiteFavicon(siteSettings.site_favicon || '')
        setHeroImage(siteSettings.hero_image || '')
        setAboutImage(siteSettings.about_image || '')
        
        console.log('📊 Loaded data from Supabase:', {
          projects: projectsData.length,
          blogPosts: blogPostsData.length,
          youtubeChannel: youtubeChannelData?.channel_name,
          videos: youtubeChannelData ? await getYouTubeVideos(youtubeChannelData.id) : []
        })
        
      } catch (error) {
        console.error('Error loading data:', error)
        // Fallback to localStorage if Supabase fails
    const saved = localStorage.getItem('projects')
    if (saved) {
      const parsed = JSON.parse(saved)
      setProjects(parsed)
      setLocalStorageCount(parsed.length)
        }
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  const saveProjects = async (newProjects: SupabaseProject[]) => {
    console.log('Saving projects:', newProjects)
    setProjects(newProjects)
    setLocalStorageCount(newProjects.length)
  }

  const saveYoutubeChannel = async (newChannel: SupabaseYouTubeChannel) => {
    console.log('Saving YouTube channel:', newChannel)
    if (newChannel.id) {
      const updated = await updateYouTubeChannel(newChannel.id, newChannel)
      if (updated) {
        setYoutubeChannel(updated)
      }
    }
  }

  const addYoutubeVideo = async () => {
    if (!youtubeChannel) return
    
    const newVideo = {
      channel_id: youtubeChannel.id,
      title: 'Yeni Video',
      duration: '00:00',
      thumbnail: '',
      url: ''
    }
    
    const created = await createYouTubeVideo(newVideo)
    if (created) {
      const updatedVideos = [...youtubeVideos, created]
      setYoutubeVideos(updatedVideos)
    }
  }

  const updateYoutubeVideo = async (id: string, field: string, value: string) => {
    const updated = await updateYouTubeVideo(id, { [field]: value })
    if (updated) {
      const updatedVideos = youtubeVideos.map(video =>
        video.id === id ? updated : video
      )
      setYoutubeVideos(updatedVideos)
    }
  }

  const deleteYoutubeVideo = async (id: string) => {
    const success = await deleteYouTubeVideo(id)
    if (success) {
      const updatedVideos = youtubeVideos.filter(video => video.id !== id)
      setYoutubeVideos(updatedVideos)
    }
  }

  const handleEdit = (project: SupabaseProject) => {
    setEditingId(project.id)
    setFormData(project)
  }

  const handleSave = async () => {
    if (editingId) {
      const updated = await updateProject(editingId, formData)
      if (updated) {
        const updatedProjects = projects.map(p => 
          p.id === editingId ? updated : p
        )
        setProjects(updatedProjects)
        setEditingId(null)
        setFormData({})
        alert('Proje güncellendi!')
      }
    } else if (showAddForm) {
      const newProject = await createProject({
        title: formData.title || '',
        description: formData.description || '',
        image: formData.image || '',
        technologies: formData.technologies || [],
        featured: formData.featured || false
      })
      
      if (newProject) {
        setProjects([...projects, newProject])
      setShowAddForm(false)
        setFormData({})
      alert('Yeni proje eklendi!')
    }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      const success = await deleteProject(id)
      if (success) {
        setProjects(projects.filter(p => p.id !== id))
        alert('Proje silindi!')
      }
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
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Veriler yükleniyor...</p>
            </div>
          </div>
        ) : (
          <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
              <p className="text-gray-400">Portföy ve blog içeriklerini yönetin</p>
              {user && (
                <p className="text-sm text-gray-500 mt-1">
                  Giriş yapan: {user.email}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
              >
                ← Ana Sayfaya Dön
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem('adminMode')
                  localStorage.removeItem('adminEmail')
                  signOut()
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Çıkış Yap
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'projects'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              📁 Projeler ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'blog'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              📝 Blog ({blogPosts.length})
            </button>
            <button
              onClick={() => setActiveTab('youtube')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'youtube'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              📺 YouTube ({youtubeVideos.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'settings'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              ⚙️ Logo & Images
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-white">
                {activeTab === 'projects' ? projects.length : 
                 activeTab === 'blog' ? blogPosts.length :
                 activeTab === 'youtube' ? youtubeVideos.length : 0}
              </div>
              <div className="text-sm text-gray-400">
                {activeTab === 'projects' ? 'Toplam Proje' : 
                 activeTab === 'blog' ? 'Toplam Blog' :
                 activeTab === 'youtube' ? 'Toplam Video' : 'Ayarlar'}
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-primary-500">
                {activeTab === 'projects' 
                  ? projects.filter(p => p.featured).length 
                  : blogPosts.filter(p => p.featured).length}
              </div>
              <div className="text-sm text-gray-400">Öne Çıkan</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-green-500">
                {activeTab === 'projects'
                  ? projects.filter(p => p.image && p.image.startsWith('data:')).length
                  : blogPosts.filter(p => p.image && p.image.startsWith('data:')).length}
              </div>
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

        {/* Content based on active tab */}
        {activeTab === 'youtube' ? (
          <>
            {/* YouTube Channel Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 card"
            >
              <h2 className="text-2xl font-semibold mb-4">YouTube Kanalı Yönetimi</h2>
              
              <div className="space-y-6">
                {/* Channel Info */}
                {youtubeChannel ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Kanal Adı</label>
                      <input
                        type="text"
                        value={youtubeChannel.channel_name}
                        onChange={(e) => saveYoutubeChannel({...youtubeChannel, channel_name: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Kanal URL</label>
                      <input
                        type="url"
                        value={youtubeChannel.channel_url}
                        onChange={(e) => saveYoutubeChannel({...youtubeChannel, channel_url: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Abone Sayısı</label>
                      <input
                        type="text"
                        value={youtubeChannel.subscriber_count}
                        onChange={(e) => saveYoutubeChannel({...youtubeChannel, subscriber_count: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        placeholder="örn: 1.2K"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={youtubeChannel.is_active}
                          onChange={(e) => saveYoutubeChannel({...youtubeChannel, is_active: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm">Kanal Aktif</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">YouTube kanalı yükleniyor...</p>
                  </div>
                )}

                {/* Videos Management */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Videolar</h3>
                    <button
                      onClick={addYoutubeVideo}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
                    >
                      <PlusIcon className="w-5 h-5" />
                      Video Ekle
                    </button>
                  </div>

                  <div className="space-y-4">
                    {youtubeVideos.map((video) => (
                      <div key={video.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Video Başlığı</label>
                            <input
                              type="text"
                              value={video.title}
                              onChange={(e) => updateYoutubeVideo(video.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Süre</label>
                            <input
                              type="text"
                              value={video.duration}
                              onChange={(e) => updateYoutubeVideo(video.id, 'duration', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                              placeholder="15:30"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Video URL</label>
                            <input
                              type="url"
                              value={video.url || ''}
                              onChange={(e) => updateYoutubeVideo(video.id, 'url', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                              placeholder="https://youtube.com/watch?v=..."
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => deleteYoutubeVideo(video.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-sm"
                          >
                            <TrashIcon className="w-4 h-4" />
                            Sil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : activeTab === 'settings' ? (
          <>
            {/* Site Logo Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 card"
            >
              <h2 className="text-2xl font-semibold mb-4">Site Logosu</h2>
              
              <p className="text-sm text-gray-400 mb-4">
                Bu logo navbar'da görünür
              </p>
          
              <div className="space-y-4">
                {/* Preview */}
                {siteLogo && (
                  <div className="relative w-32 h-32 bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-700 mx-auto flex items-center justify-center">
                    <img src={siteLogo} alt="Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                
                {/* Upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = async () => {
                        const imageData = reader.result as string
                        
                        // Upload to Cloudinary
                        const result = await uploadImageToCloudinary(
                          imageData,
                          'logo',
                          `site-logo-${Date.now()}`
                        )
                        
                        if (result.success && result.url) {
                          setSiteLogo(result.url)
                          localStorage.setItem('siteLogo', result.url)
                          alert('Logo Cloudinary\'e yüklendi ve herkese görünecek!')
                        } else {
                          // Fallback to localStorage
                          setSiteLogo(imageData)
                          localStorage.setItem('siteLogo', imageData)
                          alert('Logo kaydedildi (sadece sizde görünecek)')
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="hidden"
                  id="logo-upload"
                />
                
                <label
                  htmlFor="logo-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg cursor-pointer transition-colors text-white font-medium mx-auto w-fit"
                >
                  <PhotoIcon className="w-5 h-5" />
                  {siteLogo ? 'Logoyu Değiştir' : 'Logo Yükle'}
                </label>
                
                {siteLogo && (
                  <button
                    onClick={() => {
                      setSiteLogo('')
                      localStorage.removeItem('siteLogo')
                      alert('Logo silindi!')
                    }}
                    className="text-red-400 hover:text-red-300 text-sm mx-auto block"
                  >
                    Logoyu Sil
                  </button>
                )}
              </div>
            </motion.div>

            {/* Site Favicon Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 card"
            >
              <h2 className="text-2xl font-semibold mb-4">Site Favicon</h2>
              
              <p className="text-sm text-gray-400 mb-4">
                Bu favicon tarayıcı sekmesinde görünür (32x32 px önerilir)
              </p>
          
              <div className="space-y-4">
                {/* Preview */}
                {siteFavicon && (
                  <div className="relative w-16 h-16 bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-700 mx-auto flex items-center justify-center">
                    <img src={siteFavicon} alt="Favicon" className="w-full h-full object-contain" />
                  </div>
                )}
                
                {/* Upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = async () => {
                        const imageData = reader.result as string
                        
                        // Upload to Cloudinary
                        const result = await uploadImageToCloudinary(
                          imageData,
                          'logo',
                          `site-favicon-${Date.now()}`
                        )
                        
                        if (result.success && result.url) {
                          setSiteFavicon(result.url)
                          localStorage.setItem('siteFavicon', result.url)
                          alert('Favicon Cloudinary\'e yüklendi ve herkese görünecek!')
                        } else {
                          // Fallback to localStorage
                          setSiteFavicon(imageData)
                          localStorage.setItem('siteFavicon', imageData)
                          alert('Favicon kaydedildi (sadece sizde görünecek)')
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="hidden"
                  id="favicon-upload"
                />
                
                <label
                  htmlFor="favicon-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg cursor-pointer transition-colors text-white font-medium mx-auto w-fit"
                >
                  <PhotoIcon className="w-5 h-5" />
                  {siteFavicon ? 'Favicon\'u Değiştir' : 'Favicon Yükle'}
                </label>
                
                {siteFavicon && (
                  <button
                    onClick={() => {
                      setSiteFavicon('')
                      localStorage.removeItem('siteFavicon')
                      alert('Favicon silindi!')
                    }}
                    className="text-red-400 hover:text-red-300 text-sm mx-auto block"
                  >
                    Favicon'u Sil
                  </button>
                )}
              </div>
            </motion.div>

            {/* Hero Image Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 card"
            >
              <h2 className="text-2xl font-semibold mb-4">Hero Profil Görseli</h2>
              
              <p className="text-sm text-gray-400 mb-4">
                Bu görsel Hero bölümünde görünür
              </p>
          
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
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = async () => {
                    const imageData = reader.result as string
                    
                    // Upload to Cloudinary
                    const result = await uploadImageToCloudinary(
                      imageData,
                      'hero',
                      `hero-profile-${Date.now()}`
                    )
                    
                    if (result.success && result.url) {
                      setHeroImage(result.url)
                      localStorage.setItem('heroImage', result.url)
                      alert('Hero görseli Cloudinary\'e yüklendi ve herkese görünecek!')
                    } else {
                      // Fallback to localStorage
                      setHeroImage(imageData)
                      localStorage.setItem('heroImage', imageData)
                      alert('Hero görseli kaydedildi (sadece sizde görünecek)')
                    }
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

        {/* About Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 card"
        >
          <h2 className="text-2xl font-semibold mb-4">About Profil Görseli</h2>
          
          <p className="text-sm text-gray-400 mb-4">
            Bu görsel About bölümünde görünür
          </p>
      
          <div className="space-y-4">
            {/* Preview */}
            {aboutImage && (
              <div className="relative w-full max-w-md mx-auto bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-700">
                <img src={aboutImage} alt="About" className="w-full h-auto object-cover" />
              </div>
            )}
            
            {/* Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = async () => {
                    const imageData = reader.result as string
                    
                    console.log('📤 Uploading about image to Cloudinary...')
                    const result = await uploadImageToCloudinary(
                      imageData,
                      'hero',
                      `about-profile-${Date.now()}`
                    )
                    
                    console.log('📥 Upload result:', result)
                    
                    if (result.success && result.url) {
                      setAboutImage(result.url)
                      localStorage.setItem('aboutImage', result.url)
                      alert('About görseli Cloudinary\'e yüklendi ve herkese görünecek!')
                    } else {
                      console.error('❌ Upload failed:', result.error)
                      setAboutImage(imageData)
                      localStorage.setItem('aboutImage', imageData)
                      alert('About görseli kaydedildi (sadece sizde görünecek)')
                    }
                  }
                  reader.readAsDataURL(file)
                }
              }}
              className="hidden"
              id="about-image-upload"
            />
            
            <label
              htmlFor="about-image-upload"
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg cursor-pointer transition-colors text-white font-medium mx-auto w-fit"
            >
              <PhotoIcon className="w-5 h-5" />
              {aboutImage ? 'Görseli Değiştir' : 'About Görseli Yükle'}
            </label>
            
            {aboutImage && (
              <button
                onClick={() => {
                  setAboutImage('')
                  localStorage.removeItem('aboutImage')
                  alert('About görseli silindi!')
                }}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Görseli Sil
              </button>
            )}
          </div>
        </motion.div>
          </>
        ) : activeTab === 'projects' ? (
          <>
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
              <div className="w-32 h-32 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700 relative group">
                {project.image ? (
                  (project.image.startsWith('data:') || project.image.startsWith('http')) ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-900">
                      <div className="text-center">
                        <PhotoIcon className="w-10 h-10 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">CSS Görsel</div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-900">
                    <PhotoIcon className="w-10 h-10" />
                  </div>
                )}
                
                {/* Upload Button */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = async () => {
                            const base64String = reader.result as string
                            
                            // Upload to Cloudinary
                            const result = await uploadImageToCloudinary(
                              base64String,
                              'projects',
                              `project-${project.id}-${Date.now()}`
                            )
                            
                            if (result.success && result.url) {
                              const updatedProjects = projects.map(p => 
                                p.id === project.id ? { ...p, image: result.url! } : p
                              )
                              saveProjects(updatedProjects)
                              alert('Görsel Cloudinary\'e yüklendi ve herkese görünecek!')
                            } else {
                              // Fallback to localStorage
                              const updatedProjects = projects.map(p => 
                                p.id === project.id ? { ...p, image: base64String } : p
                              )
                              saveProjects(updatedProjects)
                              alert('Görsel kaydedildi (sadece sizde görünecek)')
                            }
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="hidden"
                    />
                    <div className="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 rounded text-xs text-white font-medium">
                      {project.image ? 'Değiştir' : 'Yükle'}
                    </div>
                  </label>
                </div>
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
          </>
        ) : (
          <>
            {/* Blog Posts */}
            <div className="space-y-4">
              {blogPosts.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-gray-400">Henüz blog yazısı yok</p>
                </div>
              ) : (
                blogPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card flex items-start gap-4"
                  >
                    {/* Image Preview */}
                    <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700 relative group">
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <PhotoIcon className="w-8 h-8" />
                        </div>
                      )}
                      
                      {/* Upload Button */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onloadend = async () => {
                                  const base64String = reader.result as string
                                  
                                  // Upload to Cloudinary
                                  console.log('📤 Uploading blog image to Cloudinary...')
                                  const result = await uploadImageToCloudinary(
                                    base64String,
                                    'blog',
                                    `blog-${post.slug}-${Date.now()}`
                                  )
                                  
                                  console.log('📥 Upload result:', result)
                                  
                                  if (result.success && result.url) {
                                    const updatedPosts = [...blogPosts]
                                    updatedPosts[index].image = result.url
                                    setBlogPosts(updatedPosts)
                                    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
                                    
                                    // Save to Supabase Database (everyone can see)
                                    await updateBlogPost(updatedPosts[index].id, {
                                      image: result.url
                                    })
                                    
                                    alert('Görsel Cloudinary\'e yüklendi ve herkese görünecek!')
                                  } else {
                                    console.error('❌ Upload failed:', result.error)
                                    // Fallback to localStorage
                                    const updatedPosts = [...blogPosts]
                                    updatedPosts[index].image = base64String
                                    setBlogPosts(updatedPosts)
                                    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
                                    alert('Görsel kaydedildi (sadece sizde görünecek)')
                                  }
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                            className="hidden"
                          />
                          <div className="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 rounded text-xs text-white font-medium">
                            {post.image ? 'Değiştir' : 'Yükle'}
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        {post.featured && (
                          <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs font-medium">
                            ⭐ Öne Çıkan
                          </span>
                        )}
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                          {post.category}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminPanel />
    </AuthGuard>
  )
}

