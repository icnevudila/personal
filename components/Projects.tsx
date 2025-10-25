'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, PencilIcon, XMarkIcon, CheckIcon, PhotoIcon, PlusIcon } from '@heroicons/react/24/outline'
import { ProjectImage } from './ProjectImage'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies?: string[]
  featured: boolean
}

export function Projects() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [projects, setProjects] = useState<Project[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Project>>({})
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')

  // Admin password - you can change this or move to environment variable
  const ADMIN_PASSWORD = 'icnevudila2024'

  useEffect(() => {
    const checkAdminMode = () => {
      const adminMode = localStorage.getItem('adminMode')
      setIsAdmin(adminMode === 'true')
    }
    
    checkAdminMode()
    
    // Check every second for admin mode changes
    const interval = setInterval(checkAdminMode, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      localStorage.setItem('adminMode', 'true')
      setShowPasswordModal(false)
      setPassword('')
    } else {
      alert('Yanlış şifre!')
      setPassword('')
    }
  }

  useEffect(() => {
    // Load projects from localStorage or fallback to default
    const saved = localStorage.getItem('projects')
    console.log('Loading projects from localStorage:', saved)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        console.log('Parsed projects:', parsed)
        setProjects(parsed)
      } catch (e) {
        console.error('Error parsing projects:', e)
        // Fetch from data file on error
        fetch('/data/projects.json')
          .then(res => res.json())
          .then(data => {
            setProjects(data.projects)
            localStorage.setItem('projects', JSON.stringify(data.projects))
          })
      }
    } else {
      // Fetch from data file on first load
      fetch('/data/projects.json')
        .then(res => res.json())
        .then(data => {
          setProjects(data.projects)
          localStorage.setItem('projects', JSON.stringify(data.projects))
        })
    }
  }, [])

  // Default projects fallback
  const defaultProjects = [
    {
      id: 1,
      title: 'Nova Finance Dashboard',
      description: 'Kullanıcı deneyimi ve veri görselleştirmeye odaklanan temiz bir fintech dashboard UI tasarımı. Net hiyerarşi ile minimalist yaklaşım.',
      image: '/api/placeholder/600/400',
      technologies: ['UI/UX Design', 'Figma', 'Prototyping', 'Design System'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Luma Studio Portfolio',
      description: 'Cesur görseller ve akıcı animasyonlarla yaratıcı ajans landing sayfası. Şık ve modern estetikle portföy çalışmalarını sergiliyor.',
      image: '/api/placeholder/600/400',
      technologies: ['Web Design', 'Next.js', 'Framer Motion', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'Orangedesk CRM',
      description: 'Sezgisel iş akışı tasarımı ile startup\'lar için zarif CRM dashboard. Verimliliği ve kullanım kolaylığını vurgulayan temiz arayüz.',
      image: '/api/placeholder/600/400',
      technologies: ['UI Design', 'Figma', 'User Research', 'Wireframing'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'HealLink Medical Portal',
      description: 'Kullanıcı dostu arayüzle modern sağlık randevu sistemi. Erişilebilirlik ve sağlık iş akışlarında verimlilik için tasarlandı.',
      image: '/api/placeholder/600/400',
      technologies: ['UX Design', 'Prototyping', 'Healthcare UI', 'Figma'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 5,
      title: 'Mindfolio Blog',
      description: 'Temiz tipografi ve okuma deneyimi ile AI destekli içerik platformu. İçerik üreticileri ve tüketicileri için tasarlandı.',
      image: '/api/placeholder/600/400',
      technologies: ['Web Design', 'Content Strategy', 'Typography', 'Next.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 6,
      title: 'Pixen E-Commerce Concept',
      description: 'Ürün vitrinine odaklanan minimal online mağaza tasarımı. Alışveriş deneyimini artıran temiz düzenler.',
      image: '/api/placeholder/600/400',
      technologies: ['E-Commerce Design', 'UI/UX', 'Mobile-First', 'Figma'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
  ]

  // Use localStorage projects if available, otherwise use default
  const displayProjects = projects.length > 0 ? projects : defaultProjects as Project[]

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setEditForm(project)
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    if (editingId) {
      const updated = projects.map(p => 
        p.id === editingId 
          ? { ...p, ...editForm, technologies: editForm.technologies || p.technologies || [] } as Project 
          : p
      )
      setProjects(updated)
      localStorage.setItem('projects', JSON.stringify(updated))
      setShowEditModal(false)
      setEditingId(null)
      setEditForm({})
      alert('Proje başarıyla güncellendi!')
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      const updated = projects.filter(p => p.id !== id)
      setProjects(updated)
      localStorage.setItem('projects', JSON.stringify(updated))
      alert('Proje silindi!')
    }
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setShowAddModal(false)
    setEditingId(null)
    setEditForm({})
  }

  const handleAdd = () => {
    setShowAddModal(true)
    setEditForm({ title: '', description: '', image: '', technologies: [], featured: false })
  }

  const handleSaveAdd = () => {
    if (editForm.title && editForm.description) {
      const newProject: Project = {
        id: Date.now(),
        title: editForm.title,
        description: editForm.description,
        image: editForm.image || '',
        technologies: editForm.technologies || [],
        featured: editForm.featured || false,
      }
      const updated = [...projects, newProject]
      setProjects(updated)
      localStorage.setItem('projects', JSON.stringify(updated))
      setShowAddModal(false)
      setEditForm({})
      alert('Yeni proje eklendi!')
    } else {
      alert('Lütfen başlık ve açıklama girin!')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-16 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6 gap-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center md:text-left">
                <AnimatedText text={t.projects.title} />
              </h2>
              {isAdmin && (
                <div className="flex gap-2 md:gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors text-sm md:text-base"
                  >
                    <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">{t.projects.addProject}</span>
                    <span className="sm:hidden">Ekle</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsAdmin(false)
                      localStorage.setItem('adminMode', 'false')
                    }}
                    className="px-3 md:px-4 py-2 rounded-lg transition-colors bg-green-500 hover:bg-green-600 text-sm md:text-base"
                  >
                    <span className="hidden sm:inline">{t.projects.adminModeOn}</span>
                    <span className="sm:hidden">Çıkış</span>
                  </button>
                </div>
              )}
            </div>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto text-center leading-relaxed">
              {t.projects.subtitle}
            </p>
          </motion.div>

          {/* Featured Projects */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-16 px-4">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-center">
              <AnimatedText text={t.projects.featured} />
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {displayProjects.filter(project => project.featured).map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                  className="card card-hover group"
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-lg mb-6 group/image-card">
                    {project.image && (project.image.startsWith('data:') || project.image.startsWith('/')) ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="project-placeholder">
                        <ProjectImage title={project.title} className="h-64" />
                      </div>
                    )}
                    
                    {/* Image Upload Button - Admin Only */}
                    {isAdmin && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image-card:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                        <label className="cursor-pointer z-40">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                  const base64String = reader.result as string
                                  const currentProjects = projects.length > 0 ? projects : defaultProjects as Project[]
                                  const updatedProjects = [...currentProjects]
                                  const projectIndex = updatedProjects.findIndex(p => p.title === project.title)
                                  if (projectIndex !== -1) {
                                    updatedProjects[projectIndex].image = base64String
                                    setProjects(updatedProjects)
                                    localStorage.setItem('projects', JSON.stringify(updatedProjects))
                                  }
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                            className="hidden"
                          />
                          <div className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                            <PhotoIcon className="w-5 h-5 text-white" />
                            <span className="text-white font-medium">
                              {project.image && project.image.startsWith('data:') ? 'Değiştir' : 'Görsel Yükle'}
                            </span>
                          </div>
                        </label>
                      </div>
                    )}
                    
                    {/* No links - removed */}
                    
                    {/* Edit/Delete Buttons - Admin Only */}
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover/image-card:opacity-100 transition-opacity z-40">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
                        >
                          <PencilIcon className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => project.id && handleDelete(project.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                        >
                          <XMarkIcon className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.technologies || []).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links removed */}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-4">{t.projects.addProject}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholder="Proje başlığı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={4}
                  placeholder="Proje açıklaması"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Öne Çıkan</label>
                <input
                  type="checkbox"
                  checked={editForm.featured || false}
                  onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-500 bg-gray-800 border-gray-600 rounded"
                />
                <span className="ml-2 text-gray-300">Ana projeler bölümünde göster</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveAdd}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg"
                >
                  <CheckIcon className="w-5 h-5" />
                  Ekle
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                  İptal
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Admin Girişi</h3>
            <p className="text-gray-400 mb-4">Lütfen admin şifresini girin:</p>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Şifre"
              autoFocus
            />
            
            <div className="flex gap-2">
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white transition-colors"
              >
                Giriş Yap
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setPassword('')
                }}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
              >
                İptal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
