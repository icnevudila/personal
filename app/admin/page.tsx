'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  getAllBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSiteSettings,
  updateSiteSetting,
  BlogPost,
  Project,
  SiteSetting
} from '@/lib/supabase-cms'

export default function AdminPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('blog')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Data states
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([])

  // Form states
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    slug: '',
    category: 'Development',
    image: '',
    read_time: '5 min',
    featured: false,
    published: true
  })
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [] as string[],
    featured: false
  })

  useEffect(() => {
    // Check if already authenticated
    const adminMode = localStorage.getItem('adminMode')
    if (adminMode === 'true') {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [posts, projs, settings] = await Promise.all([
        getAllBlogPosts(),
        getProjects(),
        getSiteSettings()
      ])
      setBlogPosts(posts)
      setProjects(projs)
      setSiteSettings(settings)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'icnevudila2024'
    
    if (password === adminPassword) {
      setIsAuthenticated(true)
      localStorage.setItem('adminMode', 'true')
      setError('')
      loadData()
    } else {
      setError('Yanlış şifre!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.setItem('adminMode', 'false')
    router.push('/')
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  // Blog Post Functions
  const handleCreateBlogPost = async () => {
    if (!newBlogPost.title || !newBlogPost.excerpt || !newBlogPost.content) {
      setError('Lütfen tüm gerekli alanları doldurun')
      return
    }

    setLoading(true)
    try {
      const slug = newBlogPost.slug || newBlogPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const post = await createBlogPost({
        ...newBlogPost,
        slug,
        date: new Date().toISOString()
      })
      
      if (post) {
        setBlogPosts([post, ...blogPosts])
        setNewBlogPost({
          title: '',
          excerpt: '',
          content: '',
          slug: '',
          category: 'Development',
          image: '',
          read_time: '5 min',
          featured: false,
          published: true
        })
        showSuccess('Blog yazısı başarıyla oluşturuldu!')
      }
    } catch (error) {
      setError('Blog yazısı oluşturulurken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBlogPost = async (post: BlogPost) => {
    setLoading(true)
    try {
      const updatedPost = await updateBlogPost(post.id, post)
      if (updatedPost) {
        setBlogPosts(blogPosts.map(p => p.id === post.id ? updatedPost : p))
        setEditingBlogPost(null)
        showSuccess('Blog yazısı başarıyla güncellendi!')
      }
    } catch (error) {
      setError('Blog yazısı güncellenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBlogPost = async (id: string) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return
    
    setLoading(true)
    try {
      const success = await deleteBlogPost(id)
      if (success) {
        setBlogPosts(blogPosts.filter(p => p.id !== id))
        showSuccess('Blog yazısı başarıyla silindi!')
      }
    } catch (error) {
      setError('Blog yazısı silinirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  // Project Functions
  const handleCreateProject = async () => {
    if (!newProject.title || !newProject.description) {
      setError('Lütfen tüm gerekli alanları doldurun')
      return
    }

    setLoading(true)
    try {
      const project = await createProject(newProject)
      if (project) {
        setProjects([project, ...projects])
        setNewProject({
          title: '',
          description: '',
          image: '',
          technologies: [],
          featured: false
        })
        showSuccess('Proje başarıyla oluşturuldu!')
      }
    } catch (error) {
      setError('Proje oluşturulurken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProject = async (project: Project) => {
    setLoading(true)
    try {
      const updatedProject = await updateProject(project.id, project)
      if (updatedProject) {
        setProjects(projects.map(p => p.id === project.id ? updatedProject : p))
        setEditingProject(null)
        showSuccess('Proje başarıyla güncellendi!')
      }
    } catch (error) {
      setError('Proje güncellenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return
    
    setLoading(true)
    try {
      const success = await deleteProject(id)
      if (success) {
        setProjects(projects.filter(p => p.id !== id))
        showSuccess('Proje başarıyla silindi!')
      }
    } catch (error) {
      setError('Proje silinirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  // Site Settings Functions
  const handleUpdateSiteSetting = async (key: string, value: string) => {
    setLoading(true)
    try {
      const success = await updateSiteSetting(key, value)
      if (success) {
        setSiteSettings(siteSettings.map(s => s.key === key ? { ...s, value } : s))
        showSuccess('Site ayarı başarıyla güncellendi!')
      }
    } catch (error) {
      setError('Site ayarı güncellenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-lg p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              Admin Girişi
            </h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="Şifrenizi girin"
                />
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
              >
                Giriş Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Tüm içerikleri tek yerden yönetin</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Çıkış Yap
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-lg">
            <p className="text-green-400">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={() => setError('')}
              className="mt-2 text-red-300 hover:text-red-200"
            >
              ✕
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Blog Yazıları</h3>
              <span className="text-2xl font-bold text-orange-500">{blogPosts.length}</span>
            </div>
            <p className="text-gray-400 text-sm">Toplam yazı sayısı</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Projeler</h3>
              <span className="text-2xl font-bold text-blue-500">{projects.length}</span>
            </div>
            <p className="text-gray-400 text-sm">Portföy projeleri</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Yayınlanan</h3>
              <span className="text-2xl font-bold text-green-500">{blogPosts.filter(p => p.published).length}</span>
            </div>
            <p className="text-gray-400 text-sm">Aktif blog yazıları</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Öne Çıkan</h3>
              <span className="text-2xl font-bold text-purple-500">{blogPosts.filter(p => p.featured).length}</span>
            </div>
            <p className="text-gray-400 text-sm">Featured içerikler</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'blog' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              📝 Blog Yazıları
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'projects' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              🚀 Projeler
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              ⚙️ Site Ayarları
            </button>
          </div>

          {/* Blog Posts Tab */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              {/* Create New Blog Post */}
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Yeni Blog Yazısı Ekle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Başlık</label>
                    <input
                      type="text"
                      value={newBlogPost.title}
                      onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                      placeholder="Blog yazısı başlığı"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                    <input
                      type="text"
                      value={newBlogPost.slug}
                      onChange={(e) => setNewBlogPost({...newBlogPost, slug: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                      placeholder="url-slug"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Özet</label>
                    <textarea
                      value={newBlogPost.excerpt}
                      onChange={(e) => setNewBlogPost({...newBlogPost, excerpt: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                      rows={3}
                      placeholder="Blog yazısı özeti"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">İçerik (Markdown)</label>
                    <textarea
                      value={newBlogPost.content}
                      onChange={(e) => setNewBlogPost({...newBlogPost, content: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                      rows={8}
                      placeholder="Blog yazısı içeriği (Markdown formatında)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Kategori</label>
                    <select
                      value={newBlogPost.category}
                      onChange={(e) => setNewBlogPost({...newBlogPost, category: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                    >
                      <option value="Development">Development</option>
                      <option value="Design">Design</option>
                      <option value="UX/UI">UX/UI</option>
                      <option value="AI">AI</option>
                      <option value="Performance">Performance</option>
                      <option value="Tutorial">Tutorial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Resim URL</label>
                    <input
                      type="text"
                      value={newBlogPost.image}
                      onChange={(e) => setNewBlogPost({...newBlogPost, image: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newBlogPost.featured}
                        onChange={(e) => setNewBlogPost({...newBlogPost, featured: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-gray-300">Öne Çıkan</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newBlogPost.published}
                        onChange={(e) => setNewBlogPost({...newBlogPost, published: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-gray-300">Yayınlanmış</span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleCreateBlogPost}
                  disabled={loading}
                  className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Oluşturuluyor...' : 'Blog Yazısı Oluştur'}
                </button>
              </div>

              {/* Blog Posts List */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Mevcut Blog Yazıları</h3>
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{post.title}</h4>
                        <p className="text-gray-400 text-sm">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            post.published ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                          }`}>
                            {post.published ? 'Yayınlanmış' : 'Taslak'}
                          </span>
                          {post.featured && (
                            <span className="px-2 py-1 bg-purple-900 text-purple-300 rounded text-xs">
                              Öne Çıkan
                            </span>
                          )}
                          <span className="text-gray-500 text-xs">{post.category}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingBlogPost(post)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDeleteBlogPost(post.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Create New Project */}
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Yeni Proje Ekle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Proje Adı</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                      placeholder="Proje adı"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Resim URL</label>
                    <input
                      type="text"
                      value={newProject.image}
                      onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Açıklama</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                      rows={4}
                      placeholder="Proje açıklaması"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Teknolojiler (virgülle ayırın)</label>
                    <input
                      type="text"
                      value={newProject.technologies.join(', ')}
                      onChange={(e) => setNewProject({...newProject, technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newProject.featured}
                        onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-gray-300">Öne Çıkan Proje</span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleCreateProject}
                  disabled={loading}
                  className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Oluşturuluyor...' : 'Proje Oluştur'}
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Mevcut Projeler</h3>
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                        <p className="text-gray-400 text-sm">{project.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          {project.technologies?.map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                          {project.featured && (
                            <span className="px-2 py-1 bg-purple-900 text-purple-300 rounded text-xs">
                              Öne Çıkan
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Site Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Site Ayarları</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteSettings.map((setting) => (
                  <div key={setting.key} className="bg-gray-700 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {setting.key.replace(/_/g, ' ').toUpperCase()}
                    </label>
                    <input
                      type="text"
                      value={setting.value}
                      onChange={(e) => {
                        const newSettings = siteSettings.map(s => 
                          s.key === setting.key ? { ...s, value: e.target.value } : s
                        )
                        setSiteSettings(newSettings)
                      }}
                      onBlur={() => handleUpdateSiteSetting(setting.key, setting.value)}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Blog Post Edit Modal */}
        {editingBlogPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white">Blog Yazısını Düzenle</h3>
                <button
                  onClick={() => setEditingBlogPost(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Başlık</label>
                  <input
                    type="text"
                    value={editingBlogPost.title}
                    onChange={(e) => setEditingBlogPost({...editingBlogPost, title: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                  <input
                    type="text"
                    value={editingBlogPost.slug}
                    onChange={(e) => setEditingBlogPost({...editingBlogPost, slug: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Özet</label>
                  <textarea
                    value={editingBlogPost.excerpt}
                    onChange={(e) => setEditingBlogPost({...editingBlogPost, excerpt: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">İçerik (Markdown)</label>
                  <textarea
                    value={editingBlogPost.content || ''}
                    onChange={(e) => setEditingBlogPost({...editingBlogPost, content: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                    rows={10}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Kategori</label>
                  <select
                    value={editingBlogPost.category}
                    onChange={(e) => setEditingBlogPost({...editingBlogPost, category: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="UX/UI">UX/UI</option>
                    <option value="AI">AI</option>
                    <option value="Performance">Performance</option>
                    <option value="Tutorial">Tutorial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Resim URL</label>
                  <input
                    type="text"
                    value={editingBlogPost.image || ''}
                    onChange={(e) => setEditingBlogPost({...editingBlogPost, image: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingBlogPost.featured}
                      onChange={(e) => setEditingBlogPost({...editingBlogPost, featured: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Öne Çıkan</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingBlogPost.published}
                      onChange={(e) => setEditingBlogPost({...editingBlogPost, published: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Yayınlanmış</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setEditingBlogPost(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => handleUpdateBlogPost(editingBlogPost)}
                  disabled={loading}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Güncelleniyor...' : 'Güncelle'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Edit Modal */}
        {editingProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white">Projeyi Düzenle</h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Proje Adı</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Resim URL</label>
                  <input
                    type="text"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Açıklama</label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Teknolojiler (virgülle ayırın)</label>
                  <input
                    type="text"
                    value={editingProject.technologies?.join(', ') || ''}
                    onChange={(e) => setEditingProject({...editingProject, technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingProject.featured}
                      onChange={(e) => setEditingProject({...editingProject, featured: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Öne Çıkan Proje</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => handleUpdateProject(editingProject)}
                  disabled={loading}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Güncelleniyor...' : 'Güncelle'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}