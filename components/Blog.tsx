'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { CalendarIcon, ClockIcon, ArrowRightIcon, PencilIcon, TrashIcon, PlusIcon, XMarkIcon, CheckIcon, PhotoIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'
import { uploadImageToSupabase } from '@/lib/supabase-storage'
import { getAllBlogPosts, saveBlogPost } from '@/lib/blog-database'

interface BlogPost {
  id?: number
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  category: string
  featured?: boolean
  content?: string
  image?: string
  published?: boolean
}

interface BlogProps {
  isHomePage?: boolean
}

export function Blog({ isHomePage = false }: BlogProps) {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<BlogPost>>({})
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(isHomePage ? 4 : 6)

  // Admin password from environment variable
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'icnevudila2024'

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

  // Generate 100 blog posts
  const generateBlogPosts = (): BlogPost[] => {
    const categories = ['Design', 'Development', 'AI', 'Performance', 'UX/UI', 'Technology', 'Tutorial', 'Case Study']
    const topics = [
      'Modern Web Tasarımı', 'React Best Practices', 'AI ve Yaratıcılık', 'Performance Optimization',
      'User Experience', 'Mobile First Design', 'CSS Grid', 'JavaScript ES6+', 'TypeScript',
      'Next.js', 'Tailwind CSS', 'Framer Motion', 'Responsive Design', 'Accessibility',
      'SEO Optimization', 'Web Security', 'API Design', 'Database Design', 'Cloud Computing',
      'DevOps', 'Git Workflow', 'Testing Strategies', 'Code Review', 'Agile Development',
      'Design Systems', 'Color Theory', 'Typography', 'Layout Design', 'Animation',
      'Micro-interactions', 'User Research', 'Prototyping', 'Wireframing', 'Information Architecture',
      'Content Strategy', 'Branding', 'Logo Design', 'Visual Hierarchy', 'White Space',
      'Contrast', 'Balance', 'Proximity', 'Alignment', 'Repetition', 'Consistency',
      'Scalability', 'Maintainability', 'Code Quality', 'Documentation', 'Version Control',
      'Deployment', 'Monitoring', 'Analytics', 'A/B Testing', 'Conversion Optimization',
      'Landing Pages', 'E-commerce', 'SaaS Design', 'Dashboard Design', 'Data Visualization',
      'Charts', 'Graphs', 'Infographics', 'Icons', 'Illustrations', 'Photography',
      'Video Content', 'Podcast Design', 'Social Media', 'Email Marketing', 'Content Marketing',
      'Growth Hacking', 'Startup', 'Freelancing', 'Remote Work', 'Productivity',
      'Time Management', 'Project Management', 'Client Relations', 'Pricing Strategies',
      'Portfolio Building', 'Networking', 'Career Development', 'Learning', 'Mentoring',
      'Community Building', 'Open Source', 'Contributing', 'Speaking', 'Writing',
      'Teaching', 'Consulting', 'Agency', 'Studio', 'Team Building', 'Leadership',
      'Innovation', 'Trends', 'Future', 'Predictions', 'Analysis', 'Reviews'
    ]

    const posts: BlogPost[] = []
    
    for (let i = 1; i <= 100; i++) {
      const topic = topics[Math.floor(Math.random() * topics.length)]
      const category = categories[Math.floor(Math.random() * categories.length)]
      
      // İlk 60 yazı: bugünden başlayarak geçmişe
      // Sonraki 40 yazı: gelecek 40 gün
      let date: Date
      const today = new Date()
      if (i <= 60) {
        date = new Date(today.getTime() - (i - 1) * 24 * 60 * 60 * 1000) // Bugünden başlayarak geçmişe
      } else {
        date = new Date(today.getTime() + (i - 60) * 24 * 60 * 60 * 1000) // Gelecek günler
      }
      
      const published = i <= 60 // İlk 60 yazı published
      
      posts.push({
        id: i,
        title: `${topic}: ${i}. Adımda Uzmanlaşma`,
        slug: `${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${i}`,
        excerpt: `${topic} konusunda ${i}. seviyeye ulaşmak için bilmeniz gereken temel prensipler ve uygulamalar. Bu kapsamlı rehber ile ${category} alanında uzmanlaşın.`,
        content: `# ${topic}: ${i}. Adımda Uzmanlaşma

Bu kapsamlı rehberde ${topic} konusunda ${i}. seviyeye ulaşmak için bilmeniz gereken tüm detayları bulacaksınız.

## Temel Kavramlar

${topic} alanında başarılı olmak için öncelikle temel kavramları anlamanız gerekiyor. Bu kavramlar:

- Temel prensipler ve teorik altyapı
- Best practices ve endüstri standartları
- Yaygın hatalar ve bunlardan kaçınma yolları
- Optimizasyon teknikleri ve performans iyileştirmeleri

## Pratik Uygulamalar

Teorik bilgiyi pratiğe dökmek için:

1. **Proje örnekleri**: Gerçek dünya senaryolarında ${topic} nasıl uygulanır
2. **Kod parçacıkları**: Kullanıma hazır kod örnekleri ve açıklamaları
3. **Gerçek dünya senaryoları**: Endüstri deneyimleri ve case study'ler
4. **Problem çözme yaklaşımları**: Karşılaşılan sorunlar ve çözüm yöntemleri

## Detaylı İçerik

${topic} konusunda derinlemesine bilgi sahibi olmak için:

### Alt Başlık 1: Temel Prensipler
${topic} alanında başarılı olmak için bilmeniz gereken temel prensipler şunlardır:

- **Prensip 1**: Detaylı açıklama ve örnekler
- **Prensip 2**: Uygulama alanları ve kullanım senaryoları
- **Prensip 3**: Avantajları ve dezavantajları

### Alt Başlık 2: İleri Seviye Teknikler
${i}. seviyeye ulaştıktan sonra öğrenebileceğiniz teknikler:

- **Teknik 1**: Gelişmiş optimizasyonlar ve performans iyileştirmeleri
- **Teknik 2**: Ölçeklenebilir çözümler ve mimari desenler
- **Teknik 3**: Gelecek trendleri ve teknoloji öngörüleri

### Alt Başlık 3: Pratik Örnekler
Gerçek projelerde ${topic} nasıl uygulanır:

\`\`\`javascript
// Örnek kod bloğu
function ${topic.toLowerCase().replace(/[^a-z0-9]/g, '')}Example() {
  // Detaylı kod açıklaması
  return "Başarılı sonuç";
}
\`\`\`

## Sonuç ve Öneriler

${topic} konusunda ${i}. seviyeye ulaşmak sabır ve pratik gerektirir. Bu rehberdeki adımları takip ederek başarıya ulaşabilirsiniz.

### Önemli Noktalar:
- Sürekli öğrenme ve güncel kalma
- Pratik yapma ve proje geliştirme
- Topluluk ile etkileşim ve deneyim paylaşımı
- Mentoring ve geri bildirim alma

### Gelecek Adımlar:
1. Bu rehberdeki bilgileri pratikte uygulayın
2. Daha ileri seviye kaynakları araştırın
3. Projelerinizde bu teknikleri kullanın
4. Deneyimlerinizi başkalarıyla paylaşın

Bu yolculukta başarılar dileriz! 🚀`,
        date: date.toISOString().split('T')[0],
        readTime: `${Math.floor(Math.random() * 10) + 3} dk okuma`,
        category: category,
        featured: i <= 6, // İlk 6 yazı featured
        image: i <= 6 ? `/portfolio/blog-${i}.jpg` : undefined,
        published: published
      })
    }
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Tarihe göre sırala
  }

  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>(generateBlogPosts())
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Load blog posts from JSON file
    const loadBlogPosts = async () => {
      try {
        const response = await fetch('/data/blog.json')
        const data = await response.json()
        const jsonPosts = data.posts || []
        
        setAllBlogPosts(jsonPosts)
        
        // Ana sayfada sadece featured yazıları göster, blog sayfasında hepsini göster
        if (isHomePage) {
          setBlogPosts(jsonPosts.filter((post: BlogPost) => post.featured).slice(0, 4))
        } else {
          setBlogPosts(jsonPosts)
        }
        
        console.log('JSON posts loaded:', jsonPosts.length)
        console.log('Featured posts:', jsonPosts.filter((post: BlogPost) => post.featured).length)
      } catch (error) {
        console.error('Error loading blog posts:', error)
        // Fallback to generated posts
        const generatedPosts = generateBlogPosts()
        setAllBlogPosts(generatedPosts)
        
        if (isHomePage) {
          setBlogPosts(generatedPosts.filter((post: BlogPost) => post.published !== false).slice(0, 4))
        } else {
          setBlogPosts(generatedPosts.filter((post: BlogPost) => post.published !== false))
        }
      }
    }
    
    loadBlogPosts()
  }, [isHomePage])

  const handleEdit = (post: BlogPost, index: number) => {
    setEditingId(index)
    setEditForm(post)
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    if (editingId !== null) {
      const updated = [...blogPosts]
      updated[editingId] = { ...updated[editingId], ...editForm } as BlogPost
      setBlogPosts(updated)
      localStorage.setItem('blogPosts', JSON.stringify(updated))
      setShowEditModal(false)
      setEditingId(null)
      setEditForm({})
      alert('Blog yazısı başarıyla güncellendi!')
    }
  }

  const handleDelete = (index: number) => {
    if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      const updated = blogPosts.filter((_, i) => i !== index)
      setBlogPosts(updated)
      localStorage.setItem('blogPosts', JSON.stringify(updated))
      alert('Blog yazısı silindi!')
    }
  }

  const handleTogglePublish = (index: number) => {
    const updatedPosts = [...allBlogPosts]
    updatedPosts[index].published = !updatedPosts[index].published
    setAllBlogPosts(updatedPosts)
    setBlogPosts(updatedPosts.filter((post: BlogPost) => post.published !== false))
    
    // Save to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
    
    // Save to Supabase if available
    if (updatedPosts[index].id) {
      saveBlogPost(updatedPosts[index])
    }
    
    alert(`Blog yazısı ${updatedPosts[index].published ? 'yayınlandı' : 'yayından kaldırıldı'}!`)
  }

  const handleAdd = () => {
    const newPost: BlogPost = {
      title: '',
      excerpt: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      slug: '',
      category: 'Design',
      featured: false,
      content: '',
    }
    setEditForm(newPost)
    setShowAddModal(true)
  }

  const handleSaveAdd = () => {
    if (editForm.title && editForm.slug) {
      const newPost = { ...editForm } as BlogPost
      const updated = [newPost, ...blogPosts]
      setBlogPosts(updated)
      localStorage.setItem('blogPosts', JSON.stringify(updated))
      setShowAddModal(false)
      setEditForm({})
      alert('Yeni blog yazısı eklendi!')
    } else {
      alert('Lütfen başlık ve slug girin!')
    }
  }

  const handleCancel = () => {
    setShowEditModal(false)
    setShowAddModal(false)
    setEditingId(null)
    setEditForm({})
  }


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const getCategoryColor = (category: string) => {
    const colors = {
      Development: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Design: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      Performance: 'bg-green-500/20 text-green-400 border-green-500/30',
      AI: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'UX/UI': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      Technology: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      Tutorial: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Case Study': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getCategoryGradient = (category: string) => {
    const gradients = {
      Development: 'rgba(59,130,246,0.3)',
      Design: 'rgba(147,51,234,0.3)',
      Performance: 'rgba(34,197,94,0.3)',
      AI: 'rgba(249,115,22,0.3)',
      'UX/UI': 'rgba(236,72,153,0.3)',
      Technology: 'rgba(6,182,212,0.3)',
      Tutorial: 'rgba(234,179,8,0.3)',
      'Case Study': 'rgba(99,102,241,0.3)',
    }
    return gradients[category as keyof typeof gradients] || 'rgba(107,114,128,0.3)'
  }

  const getCategoryImage = (category: string) => {
    const images = {
      Development: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=160&fit=crop&crop=center',
      Design: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=160&fit=crop&crop=center',
      Performance: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=160&fit=crop&crop=center',
      AI: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=160&fit=crop&crop=center',
      'UX/UI': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=160&fit=crop&crop=center',
      Technology: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=160&fit=crop&crop=center',
      Tutorial: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=160&fit=crop&crop=center',
      'Case Study': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=160&fit=crop&crop=center',
    }
    return images[category as keyof typeof images] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=160&fit=crop&crop=center'
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      Development: '💻',
      Design: '🎨',
      Performance: '⚡',
      AI: '🤖',
      'UX/UI': '✨',
      Technology: '🔧',
      Tutorial: '📚',
      'Case Study': '📊',
    }
    return icons[category as keyof typeof icons] || '📝'
  }

  // Pagination logic
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = blogPosts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="blog" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 md:mb-16 px-4">
            <div className="flex flex-col md:flex-row items-center justify-center mb-4 md:mb-6 gap-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center">
                <AnimatedText text={t.blog.title} />
            </h2>
              {isAdmin && (
                <div className="flex gap-2 md:gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors text-sm md:text-base"
                  >
                    <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">{t.blog.addPost}</span>
                    <span className="sm:hidden">Ekle</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsAdmin(false)
                      localStorage.setItem('adminMode', 'false')
                    }}
                    className="px-3 md:px-4 py-2 rounded-lg transition-colors bg-green-500 hover:bg-green-600 text-sm md:text-base"
                  >
                    <span className="hidden sm:inline">Admin Modu</span>
                    <span className="sm:hidden">Çıkış</span>
                  </button>
                </div>
              )}
            </div>
            <div className="w-24 h-1 bg-[#F97316] mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto leading-relaxed">
              {t.blog.subtitle}
            </p>
          </motion.div>

          {/* Blog Posts */}
          {isHomePage ? (
            <motion.div variants={itemVariants} className="mb-8 md:mb-16 px-4">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
                <AnimatedText text={t.blog.featured} />
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {blogPosts.filter((post: BlogPost) => post.featured).slice(0, 4).map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group cursor-pointer h-full"
                >
                  {/* Card Container */}
                  <div className="relative h-full bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-transparent rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_8px_24px_rgba(249,115,22,0.08)] flex flex-col">
                    
                    {/* Top Zone - Image Header */}
                    <div className="h-40 relative overflow-hidden bg-white dark:bg-gray-700">
                      <img 
                        src={post.image || getCategoryImage(post.category)}
                        alt={post.title}
                        className="w-full h-full object-cover bg-white dark:bg-gray-700"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = getCategoryImage(post.category)
                        }}
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20">
                          {getCategoryIcon(post.category)} {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Middle Zone - Text Block */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                        {post.title}
                      </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Read More */}
                    <Link href={`/blog/${post.slug}`} className="flex items-center text-primary-500 font-medium mt-auto">
                      <span>{t.blog.readMore}</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.article>
              ))}
            </div>
          </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="mb-8 md:mb-16 px-4">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
                <AnimatedText text={t.blog.allPosts} />
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {currentPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group cursor-pointer h-full"
                  >
                    {/* Card Container */}
                    <div className="relative h-full bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-transparent rounded-2xl overflow-hidden flex flex-col">
                      
                      {/* Top Zone - Image Header */}
                      <div className="h-40 relative overflow-hidden bg-white dark:bg-gray-700">
                        <img 
                          src={post.image || getCategoryImage(post.category)}
                          alt={post.title}
                          className="w-full h-full object-cover bg-white dark:bg-gray-700"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = getCategoryImage(post.category)
                          }}
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20">
                            {getCategoryIcon(post.category)} {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Middle Zone - Text Block */}
                      <div className="p-6 flex-1 flex flex-col">
                      <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      {/* Post Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ClockIcon className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Read More */}
                      <Link href={`/blog/${post.slug}`} className="flex items-center text-primary-500 font-medium group-hover:text-primary-400 transition-colors mt-auto">
                        <span>{t.blog.readMore}</span>
                        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="inline-flex -space-x-px rounded-md shadow-sm">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === i + 1 ? 'z-10 bg-primary-500 text-white border-primary-500' : ''}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </motion.div>
          )}

          {/* View All Posts Button - Only on Homepage */}
          {isHomePage && (
            <motion.div 
              variants={itemVariants}
              className="text-center mt-12"
            >
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Tüm Yazıları Gör
                </motion.button>
              </Link>
            </motion.div>
          )}

          {/* Back to Home Button - Only on Blog Page */}
          {!isHomePage && (
            <motion.div 
              variants={itemVariants}
              className="text-center mt-12"
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Ana Sayfaya Dön
                </motion.button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-4">Blog Yazısını Düzenle</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Özet</label>
                <textarea
                  value={editForm.excerpt || ''}
                  onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={editForm.slug || ''}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">İçerik</label>
                <textarea
                  value={editForm.content || ''}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={8}
                  placeholder="Blog yazısının tam içeriğini buraya yazın..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <select
                  value={editForm.category || ''}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Performance">Performance</option>
                  <option value="AI">AI</option>
                  <option value="UX/UI">UX/UI</option>
                  <option value="Technology">Technology</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Case Study">Case Study</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg"
                >
                  <CheckIcon className="w-5 h-5" />
                  Kaydet
                </button>
                <button
                  onClick={handleCancel}
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-4">Yeni Blog Yazısı</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholder="Blog yazısı başlığı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Özet</label>
                <textarea
                  value={editForm.excerpt || ''}
                  onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={3}
                  placeholder="Kısa açıklama"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={editForm.slug || ''}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholder="blog-yazisi-url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">İçerik</label>
                <textarea
                  value={editForm.content || ''}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={8}
                  placeholder="Blog yazısının tam içeriğini buraya yazın..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <select
                  value={editForm.category || ''}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Performance">Performance</option>
                  <option value="AI">AI</option>
                  <option value="UX/UI">UX/UI</option>
                  <option value="Technology">Technology</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Case Study">Case Study</option>
                </select>
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
                  onClick={handleCancel}
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