'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { CalendarIcon, ClockIcon, ArrowRightIcon, PencilIcon, TrashIcon, PlusIcon, XMarkIcon, CheckIcon, PhotoIcon, VideoCameraIcon, BellIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'
import { uploadImageToSupabase } from '@/lib/supabase-storage'
import { getAllBlogPosts, saveBlogPost } from '@/lib/blog-database'
import { 
  getBlogPosts, 
  getYouTubeChannel, 
  getYouTubeVideos,
  type BlogPost as SupabaseBlogPost,
  type YouTubeChannel as SupabaseYouTubeChannel,
  type YouTubeVideo as SupabaseYouTubeVideo
} from '@/lib/supabase-cms'

interface BlogPost {
  id?: string
  title: string
  excerpt: string
  date: string
  read_time: string
  slug: string
  category: string
  featured?: boolean
  content?: string
  image?: string
  published?: boolean
  created_at?: string
  updated_at?: string
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

  // Generate category-specific images using Unsplash API
  const getCategoryImage = (category: string, index: number): string => {
    const categoryImages = {
      Development: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80'
      ],
      Design: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&q=80'
      ],
      AI: [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&q=80'
      ],
      Performance: [
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&q=80'
      ],
      'UX/UI': [
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&q=80'
      ],
      Technology: [
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80'
      ],
      Tutorial: [
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80'
      ],
      'Case Study': [
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80'
      ],
    }
    
    const images = categoryImages[category as keyof typeof categoryImages] || categoryImages.Tutorial
    return images[index % images.length]
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
    const today = new Date()
    
    for (let i = 1; i <= 60; i++) {
      const topic = topics[Math.floor(Math.random() * topics.length)]
      const category = categories[Math.floor(Math.random() * categories.length)]
      
      // Bugünden başlayarak geçmişe, 1 gün arayla
      const date = new Date(today.getTime() - (i - 1) * 24 * 60 * 60 * 1000)
      
      const published = true // Tüm yazılar published
      
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
        image: getCategoryImage(category, i),
        published: published
      })
    }
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Tarihe göre sırala
  }

  const [allBlogPosts, setAllBlogPosts] = useState<SupabaseBlogPost[]>([])
  const [blogPosts, setBlogPosts] = useState<SupabaseBlogPost[]>([])
  const [youtubeChannel, setYoutubeChannel] = useState<SupabaseYouTubeChannel | null>(null)
  const [youtubeVideos, setYoutubeVideos] = useState<SupabaseYouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Load blog posts from Supabase
        const postsData = await getBlogPosts()
        setAllBlogPosts(postsData)
        setBlogPosts(postsData)
        
        // Load YouTube channel from Supabase
        const youtubeChannelData = await getYouTubeChannel()
        setYoutubeChannel(youtubeChannelData)
        
        if (youtubeChannelData) {
          const videosData = await getYouTubeVideos(youtubeChannelData.id)
          setYoutubeVideos(videosData)
        }
        
        console.log('📊 Loaded data from Supabase:', {
          blogPosts: postsData.length,
          youtubeChannel: youtubeChannelData?.channel_name,
          videos: youtubeChannelData ? await getYouTubeVideos(youtubeChannelData.id) : []
        })
        
      } catch (error) {
        console.error('Error loading data from Supabase:', error)
        // Fallback to localStorage if Supabase fails
        const savedBlogPosts = localStorage.getItem('blogPosts')
        if (savedBlogPosts) {
          try {
            const parsed = JSON.parse(savedBlogPosts)
            setAllBlogPosts(parsed)
            setBlogPosts(parsed.filter((post: any) => post.published !== false))
          } catch (e) {
            console.error('Error parsing blog posts:', e)
          }
        }
        
        // Fallback YouTube data
        const savedYoutubeChannel = localStorage.getItem('youtubeChannel')
        if (savedYoutubeChannel) {
          try {
            const parsed = JSON.parse(savedYoutubeChannel)
            setYoutubeChannel(parsed)
          } catch (e) {
            console.error('Error parsing YouTube channel:', e)
          }
        }
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

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
    setBlogPosts(updatedPosts.filter(post => post.published !== false))
    
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

  // Filter posts based on homepage or blog page
  const displayPosts = isHomePage 
    ? blogPosts.filter(post => post.featured).slice(0, 4)
    : blogPosts // Show all 60 posts on blog page

  return (
    <section id="blog" className="section-padding bg-gray-800/30">
      <div className="container-custom">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-400">İçerikler yükleniyor...</p>
            </div>
          </div>
        ) : (
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
              {isAdmin && !isHomePage && (
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
                    <span className="hidden sm:inline">{t.blog.adminModeOn}</span>
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

          {/* Featured Posts */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-16 px-4">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
              <AnimatedText text={t.blog.featured} />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {displayPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                  className="card card-hover group cursor-pointer h-full"
                >
                  {/* Post Image */}
                  <div className="relative overflow-hidden rounded-lg mb-3 group-hover:scale-105 transition-transform">
                    <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                      {/* Uploaded Image */}
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            console.log('❌ Image failed to load:', post.image)
                            e.currentTarget.style.display = 'none'
                          }}
                          onLoad={() => console.log('✅ Image loaded successfully:', post.image)}
                        />
                      ) : (
                        <>
                          {/* Estetik tasarım */}
                          <div className="absolute inset-0 opacity-30">
                            <div className="w-full h-full" style={{
                              backgroundImage: `linear-gradient(135deg, ${getCategoryGradient(post.category)} 0%, transparent 50%), linear-gradient(-135deg, ${getCategoryGradient(post.category)} 0%, transparent 50%)`,
                              backgroundSize: '100% 100%'
                            }} />
                          </div>
                          <div className="absolute inset-0 opacity-15">
                            <div className="w-full h-full" style={{
                              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, ${getCategoryGradient(post.category)} 35px, ${getCategoryGradient(post.category)} 36px)`,
                            }} />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center z-10">
                              <div className="mb-4">
                                <span className="text-white font-bold text-6xl drop-shadow-lg">{getCategoryIcon(post.category)}</span>
                              </div>
                              <span className="text-gray-200 text-lg font-semibold">{post.category}</span>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {/* Image Upload Button - Admin Only */}
                      {isAdmin && !isHomePage && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
                                    
                                    console.log('📤 Uploading blog image to Supabase...')
                                    const result = await uploadImageToSupabase(
                                      base64String,
                                      'blog',
                                      `blog-${post.slug}-${Date.now()}`
                                    )
                                    
                                    console.log('📥 Upload result:', result)
                                    
                                    if (result.success && result.url) {
                                      const updatedPosts = [...blogPosts]
                                      updatedPosts[blogPosts.indexOf(post)].image = result.url
                                      setBlogPosts(updatedPosts)
                                      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
                                      alert('Görsel Supabase\'e yüklendi ve herkese görünecek!')
                                    } else {
                                      console.error('❌ Upload failed:', result.error)
                                      const updatedPosts = [...blogPosts]
                                      updatedPosts[blogPosts.indexOf(post)].image = base64String
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
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                              <PhotoIcon className="w-5 h-5 text-white" />
                              <span className="text-white font-medium">
                                {post.image ? 'Değiştir' : 'Görsel Yükle'}
                              </span>
                            </div>
                          </label>
                        </div>
                      )}
                      
                      {/* Edit/Delete Buttons - Admin Only */}
                      {isAdmin && !isHomePage && (
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(post, allBlogPosts.indexOf(post))
                            }}
                            className="p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              const idx = blogPosts.indexOf(post)
                              if (idx !== -1) handleDelete(idx)
                            }}
                            className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-3 flex flex-col flex-grow">
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    {/* Post Meta */}
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{post.read_time}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <Link href={`/blog/${post.slug}`} className="flex items-center justify-center text-primary-500 font-medium group-hover:text-primary-400 transition-colors text-sm mt-auto pt-2 border-t border-gray-700">
                      <span>{t.blog.readMore}</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

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

      {/* YouTube Channel Section - Only on Homepage */}
      {isHomePage && (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl mb-6"
          >
            <VideoCameraIcon className="w-10 h-10 text-red-500" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-white">
            {youtubeChannel?.is_active ? `${youtubeChannel.channel_name} YouTube` : t.services.youtubeSection.title}
          </h2>
          <p className="text-lg text-[#F97316] mb-2 font-semibold">
            {youtubeChannel?.is_active ? `${youtubeChannel.subscriber_count} Abone` : t.services.youtubeSection.subtitle}
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {youtubeChannel?.is_active ? 'En son videolarımı izleyin ve kanalıma abone olun!' : t.services.youtubeSection.description}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border-2 border-dashed border-gray-700 relative overflow-hidden"
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 animate-pulse"></div>
            
            <div className="relative z-10">
              {/* YouTube Placeholder */}
              <div className="aspect-video bg-gray-900 rounded-2xl mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-center"
                  >
                    <VideoCameraIcon className="w-24 h-24 text-red-500 mx-auto mb-4" />
                    <div className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold text-lg">
                      {t.services.youtubeSection.comingSoon}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Video Grid Preview */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {youtubeChannel?.is_active && youtubeVideos.length > 0 ? (
                  youtubeVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 cursor-pointer group relative"
                    >
                      {/* Thumbnail Placeholder */}
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                          {video.duration}
                        </div>
                        <VideoCameraIcon className="w-12 h-12 text-gray-600" />
                      </div>
                      
                      {/* Video Info */}
                      <div className="p-3">
                        <h4 className="text-sm font-semibold text-white mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">
                          {video.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  t.services.youtubeSection.videos.map((video: any, index: number) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 cursor-pointer group relative"
                    >
                      {/* Thumbnail Placeholder */}
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                          {video.duration}
                        </div>
                        <VideoCameraIcon className="w-12 h-12 text-gray-600" />
                      </div>
                      
                      {/* Video Info */}
                      <div className="p-3">
                        <h4 className="text-sm font-semibold text-white mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">
                          {video.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                  onClick={() => window.open(youtubeChannel?.is_active ? youtubeChannel.channel_url : 'https://youtube.com/@icnevudila', '_blank')}
                >
                  <VideoCameraIcon className="w-5 h-5" />
                  {youtubeChannel?.is_active ? `${youtubeChannel.channel_name} Kanalına Git` : t.services.youtubeSection.subscribeButton}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold border border-gray-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => window.open(youtubeChannel?.is_active ? youtubeChannel.channel_url : 'https://youtube.com/@icnevudila', '_blank')}
                >
                  <BellIcon className="w-5 h-5" />
                  {youtubeChannel?.is_active ? 'Abone Ol' : t.services.youtubeSection.notifyButton}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      )}
    </section>
  )
}

